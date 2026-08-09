import fs from 'fs';
import path from 'path';
import express from 'express';
import pg from 'pg';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import multer from 'multer';
import { S3Client, PutObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';
import cookieParser from 'cookie-parser';

// ── CONFIG ───────────────────────────────────────────────────
const DB_URL = process.env.DATABASE_URL || 'postgresql://postgres.bwdtxlosvptlqtixgcip:kEM3onWoT9AT82mr@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres';
const JWT_SECRET = process.env.JWT_SECRET || 'f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8';
const S3_ENDPOINT = process.env.S3_ENDPOINT || 'https://bwdtxlosvptlqtixgcip.storage.supabase.co/storage/v1/s3';
const S3_REGION = process.env.S3_REGION || 'ap-southeast-1';
const S3_KEY = process.env.S3_ACCESS_KEY_ID || '33115ce861a8bddb04e8fbc63cf35e91';
const S3_SECRET_KEY = process.env.S3_SECRET_ACCESS_KEY || '10aa4d1c43aa90f06111cf0e12fb0e3bc39a516a314792f0ab74ed655f8660a2';
const S3_BUCKET = process.env.S3_BUCKET_NAME || 'kvantumtechsolutions_storage';
const SUPABASE_PUBLIC_URL = 'https://bwdtxlosvptlqtixgcip.supabase.co/storage/v1/object/public';

// ── DATABASE ──────────────────────────────────────────────────
const { Pool } = pg;
const pool = new Pool({ connectionString: DB_URL, ssl: { rejectUnauthorized: false } });
const db = { query: (t, p) => pool.query(t, p) };

async function initDb() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS leads (
        _id TEXT PRIMARY KEY,
        name TEXT,
        email TEXT,
        phone TEXT,
        service TEXT,
        message TEXT,
        notes TEXT,
        status TEXT DEFAULT 'New',
        quality TEXT DEFAULT 'Warm',
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
      CREATE TABLE IF NOT EXISTS seo_settings (
        key TEXT PRIMARY KEY,
        title TEXT,
        description TEXT,
        keywords TEXT,
        schema TEXT,
        other TEXT,
        content TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
      CREATE TABLE IF NOT EXISTS media_assets (
        name TEXT PRIMARY KEY,
        url TEXT,
        public_url TEXT,
        size BIGINT,
        content_type TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
      CREATE TABLE IF NOT EXISTS users (
        _id TEXT PRIMARY KEY,
        name TEXT,
        email TEXT UNIQUE,
        password TEXT,
        role TEXT DEFAULT 'seo',
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
      CREATE TABLE IF NOT EXISTS site_settings (
        key TEXT PRIMARY KEY,
        value JSONB DEFAULT '{}'::jsonb,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);
  } catch(err) {
    console.warn('[DB INIT WARN]', err.message);
  }
}

// ── S3 ────────────────────────────────────────────────────────
const s3 = new S3Client({
  endpoint: S3_ENDPOINT,
  region: S3_REGION,
  credentials: { accessKeyId: S3_KEY, secretAccessKey: S3_SECRET_KEY },
  forcePathStyle: true
});

// ── IN-MEMORY FALLBACK ────────────────────────────────────────
let localLeads = [];
let localAssets = [];

// ── EXPRESS APP ───────────────────────────────────────────────
const app = express();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

// CORS
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,PATCH,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization,X-Requested-With');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  if (req.method === 'OPTIONS') return res.status(200).end();
  next();
});
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());

// ── AUTH MIDDLEWARE ───────────────────────────────────────────
function auth(req, res, next) {
  var token = (req.headers.authorization || '').replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch(e) {
    res.status(401).json({ error: 'Invalid token' });
  }
}

// ── HEALTH ────────────────────────────────────────────────────
app.get('/api/health', async function(req, res) {
  var dbConnected = false;
  try { var r = await db.query('SELECT NOW()'); dbConnected = r.rows.length > 0; } catch(e) {}
  res.json({ status: 'active', server: 'Kvantum Engine v6-CJS', databaseConnected: dbConnected });
});

// ── LOGIN ─────────────────────────────────────────────────────
app.post('/api/admin/login', async function(req, res) {
  try {
    var email = req.body.email, password = req.body.password;
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
    var result = await db.query('SELECT * FROM users WHERE "email" = $1', [email]);
    var user = result.rows[0];
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    var match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });
    var token = jwt.sign({ id: user._id, email: user.email, role: user.role, name: user.name }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token: token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch(err) { res.status(500).json({ error: err.message }); }
});

app.get('/api/admin/me', auth, function(req, res) {
  res.json({ user: req.user });
});

// ── LEADS ─────────────────────────────────────────────────────
app.post('/api/leads', async function(req, res) {
  try {
    var b = req.body || {};
    var id = 'lead_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
    var lead = {
      id: id,
      _id: id,
      name: b.name || 'Anonymous Client',
      email: b.email || 'direct@kvantumtechsolutions.com',
      phone: b.phone || 'N/A',
      service: b.service || 'General Software Consultation',
      message: b.notes || b.message || '',
      notes: b.notes || b.message || '',
      status: 'New Lead',
      quality: 'Hot',
      createdAt: new Date().toISOString(),
      created_at: new Date().toISOString()
    };
    try {
      await db.query(
        'INSERT INTO leads ("_id","name","email","phone","service","message","notes","status","quality") VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)',
        [id, lead.name, lead.email, lead.phone, lead.service, lead.message, lead.notes, 'New Lead', 'Hot']
      );
    } catch(dbErr) {
      console.warn('[LEAD DB]', dbErr.message);
      localLeads.unshift(lead);
    }
    res.status(201).json(lead);
  } catch(err) { res.status(500).json({ error: err.message }); }
});

app.get('/api/leads', async function(req, res) {
  try {
    var result = await db.query('SELECT * FROM leads ORDER BY "created_at" DESC');
    var dbLeads = result.rows.map(function(r) {
      return {
        id: r._id,
        _id: r._id,
        name: r.name,
        email: r.email,
        phone: r.phone,
        service: r.service,
        message: r.message,
        notes: r.notes || r.message,
        status: r.status,
        quality: r.quality,
        createdAt: r.created_at,
        created_at: r.created_at
      };
    });
    var combined = new Map();
    localLeads.concat(dbLeads).forEach(function(l) { if (l && l.id) combined.set(l.id, l); });
    res.json(Array.from(combined.values()));
  } catch(err) { res.json(localLeads); }
});

app.put('/api/leads/:id', async function(req, res) {
  try {
    var result = await db.query('UPDATE leads SET "status"=COALESCE($1,"status"),"quality"=COALESCE($2,"quality"),"notes"=COALESCE($3,"notes"),"updated_at"=NOW() WHERE "_id"=$4 RETURNING *', [req.body.status, req.body.quality, req.body.notes, req.params.id]);
    res.json(result.rows[0] || Object.assign({ id: req.params.id }, req.body));
  } catch(err) { res.json(Object.assign({ id: req.params.id }, req.body)); }
});

app.delete('/api/leads/:id', async function(req, res) {
  try { await db.query('DELETE FROM leads WHERE "_id"=$1', [req.params.id]); localLeads = localLeads.filter(function(l) { return l.id !== req.params.id; }); res.json({ success: true }); }
  catch(err) { res.status(500).json({ error: err.message }); }
});

// ── NEWSLETTER ────────────────────────────────────────────────
app.post('/api/newsletter', async function(req, res) {
  try {
    var email = (req.body && req.body.email) || '';
    if (!email) return res.status(400).json({ error: 'Email required' });
    var id = 'news_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
    var lead = {
      id: id,
      _id: id,
      name: 'Newsletter Subscriber',
      email: email,
      phone: 'N/A',
      service: 'Newsletter Subscription',
      message: 'Subscribed to tech newsletter',
      notes: 'Subscribed to tech newsletter',
      status: 'New Lead',
      quality: 'Warm',
      createdAt: new Date().toISOString(),
      created_at: new Date().toISOString()
    };
    try {
      await db.query(
        'INSERT INTO leads ("_id","name","email","phone","service","message","notes","status","quality") VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)',
        [id, lead.name, lead.email, lead.phone, lead.service, lead.message, lead.notes, 'New Lead', 'Warm']
      );
    } catch(dbErr) {
      localLeads.unshift(lead);
    }
    res.json({ success: true, message: 'Subscribed successfully' });
  } catch(err) { res.status(500).json({ error: err.message }); }
});

// ── ASSETS ────────────────────────────────────────────────────
app.get('/api/assets', async function(req, res) {
  try {
    var s3Assets = [];
    try {
      var data = await s3.send(new ListObjectsV2Command({ Bucket: S3_BUCKET }));
      s3Assets = (data.Contents || []).map(function(item) {
        var ext = (item.Key.split('.').pop() || '').toLowerCase();
        var imgs = ['png','jpg','jpeg','svg','gif','webp','ico'];
        return {
          name: item.Key,
          created_at: item.LastModified,
          publicUrl: SUPABASE_PUBLIC_URL + '/' + S3_BUCKET + '/' + item.Key,
          url: SUPABASE_PUBLIC_URL + '/' + S3_BUCKET + '/' + item.Key,
          size: item.Size || 0,
          contentType: imgs.indexOf(ext) >= 0 ? ('image/' + (ext === 'jpg' ? 'jpeg' : ext)) : 'application/octet-stream'
        };
      });
    } catch(e) {}

    var dbAssets = [];
    try {
      var r = await db.query('SELECT * FROM media_assets ORDER BY created_at DESC');
      dbAssets = r.rows.map(function(row) {
        return {
          name: row.name,
          created_at: row.created_at,
          publicUrl: row.public_url || row.url,
          url: row.url,
          size: parseInt(row.size || '0', 10),
          contentType: row.content_type || 'image/png'
        };
      });
    } catch(e) {}

    var combinedMap = new Map();
    // Prioritize local assets & db assets so newly uploaded PNG/JPG files stay at position 0
    localAssets.concat(dbAssets, s3Assets).forEach(function(ast) {
      if (ast && (ast.name || ast.url)) {
        var key = ast.name || ast.url;
        if (!combinedMap.has(key)) combinedMap.set(key, ast);
      }
    });

    res.json(Array.from(combinedMap.values()));
  } catch(err) { res.json(localAssets); }
});

function getShortCleanName(origName) {
  if (!origName) return 'img_' + Math.floor(10 + Math.random() * 90) + '.png';
  var parts = origName.split('.');
  var ext = parts.length > 1 ? parts.pop().toLowerCase() : 'png';
  var base = parts.join('_').toLowerCase().replace(/[^a-z0-9]/g, '_').replace(/_+/g, '_').replace(/^_+|_+$/g, '');
  if (base.length > 12) base = base.substring(0, 12).replace(/_+$/g, '');
  if (!base) base = 'img';
  return base + '_' + Math.floor(10 + Math.random() * 90) + '.' + ext;
}

app.get('/img/:name', function(req, res) {
  var fileName = req.params.name;
  var s3Url = SUPABASE_PUBLIC_URL + '/' + S3_BUCKET + '/' + fileName;
  res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  res.redirect(302, s3Url);
});

app.post('/api/assets/upload', upload.single('file'), async function(req, res) {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  
  var folder = (req.body.folder || '').trim().replace(/^\/+|\/+$/g, '');
  var cleanName = req.file.originalname.replace(/[^a-zA-Z0-9_.-]/g, '_');
  var fileName = folder ? (folder + '/' + cleanName) : cleanName;
  var publicUrl = SUPABASE_PUBLIC_URL + '/' + S3_BUCKET + '/' + fileName;
  
  try {
    await s3.send(new PutObjectCommand({
      Bucket: S3_BUCKET,
      Key: fileName,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    }));
  } catch(s3Err) {
    console.warn('[S3 Upload Warning]', s3Err.message);
  }

  var asset = {
    name: fileName,
    created_at: new Date().toISOString(),
    publicUrl: publicUrl,
    url: publicUrl,
    size: req.file.size,
    contentType: req.file.mimetype
  };

  localAssets = [asset].concat(localAssets.filter(function(a) { return a.name !== fileName; }));

  try {
    await db.query(
      'INSERT INTO media_assets ("name","url","public_url","size","content_type") VALUES ($1,$2,$3,$4,$5) ON CONFLICT ("name") DO UPDATE SET "url"=EXCLUDED."url","public_url"=EXCLUDED."public_url","size"=EXCLUDED."size"',
      [fileName, publicUrl, publicUrl, req.file.size, req.file.mimetype]
    );
  } catch(dbErr) {
    console.warn('[DB Asset Save Warning]', dbErr.message);
  }

  res.json(asset);
});

app.post('/api/media/remove', async function(req, res) {
  try {
    var fileName = (req.body && req.body.name) || req.query.name;
    if (!fileName) return res.status(400).json({ error: 'Name parameter required' });

    if (db) {
      try {
        await db.query('DELETE FROM media_assets WHERE name=$1 OR url LIKE $2', [fileName, '%' + fileName]);
      } catch(dbErr) {
        console.warn('[DB REMOVE WARN]', dbErr.message);
      }
    }

    localAssets = (localAssets || []).filter(function(a) { return a && a.name !== fileName; });
    return res.json({ success: true, name: fileName });
  } catch(err) {
    console.error('[REMOVE MEDIA ERROR]', err.message);
    return res.json({ success: true, name: (req.body && req.body.name) || 'file' });
  }
});

app.post('/api/assets/remove', async function(req, res) {
  try {
    var fileName = (req.body && req.body.name) || req.query.name;
    if (!fileName) return res.status(400).json({ error: 'Name parameter required' });

    if (db) {
      try {
        await db.query('DELETE FROM media_assets WHERE name=$1 OR url LIKE $2', [fileName, '%' + fileName]);
      } catch(dbErr) {
        console.warn('[DB REMOVE WARN]', dbErr.message);
      }
    }

    localAssets = (localAssets || []).filter(function(a) { return a && a.name !== fileName; });
    return res.json({ success: true, name: fileName });
  } catch(err) {
    console.error('[REMOVE ASSET FATAL ERROR]', err.message);
    return res.json({ success: true, name: (req.body && req.body.name) || 'file' });
  }
});

// ── USERS ─────────────────────────────────────────────────────
app.get('/api/users', auth, async function(req, res) {
  try { var r = await db.query('SELECT "_id","name","email","role","created_at" FROM users ORDER BY "created_at" DESC'); res.json(r.rows.map(function(u) { return { id: u._id, _id: u._id, name: u.name, email: u.email, role: u.role, createdAt: u.created_at }; })); }
  catch(err) { res.json([]); }
});

app.post('/api/users/register', auth, async function(req, res) {
  try {
    var name = req.body.name, email = req.body.email, password = req.body.password, role = req.body.role;
    if (!name || !email || !password) return res.status(400).json({ error: 'Name, email and password required' });
    var exists = await db.query('SELECT "_id" FROM users WHERE "email"=$1', [email]);
    if (exists.rows.length > 0) return res.status(409).json({ error: 'User already exists with this email' });
    var hashed = await bcrypt.hash(password, 10);
    var id = 'user_' + Math.random().toString(36).substr(2, 9);
    await db.query('INSERT INTO users ("_id","name","email","password","role") VALUES ($1,$2,$3,$4,$5)', [id, name, email, hashed, role || 'seo']);
    res.status(201).json({ id: id, _id: id, name: name, email: email, role: role || 'seo' });
  } catch(err) { res.status(500).json({ error: err.message }); }
});

app.put('/api/users/:id', auth, async function(req, res) {
  try { await db.query('UPDATE users SET "name"=COALESCE($1,"name"),"role"=COALESCE($2,"role"),"updated_at"=NOW() WHERE "_id"=$3', [req.body.name, req.body.role, req.params.id]); res.json(Object.assign({ id: req.params.id }, req.body)); }
  catch(err) { res.status(500).json({ error: err.message }); }
});

app.delete('/api/users/:id', auth, async function(req, res) {
  try { await db.query('DELETE FROM users WHERE "_id"=$1', [req.params.id]); res.json({ success: true }); }
  catch(err) { res.status(500).json({ error: err.message }); }
});

// ── SERVICES ──────────────────────────────────────────────────
app.get('/api/services', async function(req, res) {
  try { var r = await db.query('SELECT * FROM services ORDER BY "created_at" DESC'); res.json(r.rows); }
  catch(err) { res.json([]); }
});

app.get('/api/services/:id', async function(req, res) {
  try { var r = await db.query('SELECT * FROM services WHERE "_id"=$1 OR "slug"=$1', [req.params.id]); if (!r.rows[0]) return res.status(404).json({ error: 'Not found' }); res.json(r.rows[0]); }
  catch(err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/services', async function(req, res) {
  try {
    var b = req.body, id = b.id || b.slug || (b.title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
    await db.query('INSERT INTO services ("_id","title","slug","shortDesc","longDesc","metaTitle","metaDesc","keywords","coverImage","icon","status") VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) ON CONFLICT ("_id") DO UPDATE SET "title"=EXCLUDED."title","shortDesc"=EXCLUDED."shortDesc","longDesc"=EXCLUDED."longDesc","metaTitle"=EXCLUDED."metaTitle","metaDesc"=EXCLUDED."metaDesc","keywords"=EXCLUDED."keywords","coverImage"=EXCLUDED."coverImage","icon"=EXCLUDED."icon","status"=EXCLUDED."status","updated_at"=NOW()', [id, b.title, id, b.shortDesc||'', b.longDesc||'', b.metaTitle||b.title, b.metaDesc||b.shortDesc||'', b.keywords||'', b.coverImage||'', b.icon||'', b.status||'published']);
    res.status(201).json(Object.assign({ id: id, _id: id }, b));
  } catch(err) { res.status(500).json({ error: err.message }); }
});

app.put('/api/services/:id', async function(req, res) {
  try {
    var b = req.body;
    await db.query('UPDATE services SET "title"=COALESCE($1,"title"),"shortDesc"=COALESCE($2,"shortDesc"),"longDesc"=COALESCE($3,"longDesc"),"metaTitle"=COALESCE($4,"metaTitle"),"metaDesc"=COALESCE($5,"metaDesc"),"keywords"=COALESCE($6,"keywords"),"coverImage"=COALESCE($7,"coverImage"),"icon"=COALESCE($8,"icon"),"status"=COALESCE($9,"status"),"updated_at"=NOW() WHERE "_id"=$10', [b.title, b.shortDesc, b.longDesc, b.metaTitle, b.metaDesc, b.keywords, b.coverImage, b.icon, b.status, req.params.id]);
    res.json(Object.assign({ id: req.params.id, _id: req.params.id }, b));
  } catch(err) { res.status(500).json({ error: err.message }); }
});

app.delete('/api/services/:id', async function(req, res) {
  try { await db.query('DELETE FROM services WHERE "_id"=$1', [req.params.id]); res.json({ success: true }); }
  catch(err) { res.status(500).json({ error: err.message }); }
});

// ── BLOGS ─────────────────────────────────────────────────────
app.get('/api/blogs', async function(req, res) {
  try { var r = await db.query('SELECT * FROM blogs ORDER BY "created_at" DESC'); res.json(r.rows); }
  catch(err) { res.json([]); }
});

app.get('/api/blogs/:slug', async function(req, res) {
  try { var r = await db.query('SELECT * FROM blogs WHERE "slug"=$1 OR "_id"=$1', [req.params.slug]); if (!r.rows[0]) return res.status(404).json({ error: 'Not found' }); res.json(r.rows[0]); }
  catch(err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/blogs', async function(req, res) {
  try {
    var b = req.body, id = b.slug || b._id || b.id || (b.title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
    await db.query('INSERT INTO blogs ("_id","title","slug","excerpt","content","metaTitle","metaDesc","coverImage","tags","author","status") VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) ON CONFLICT ("_id") DO UPDATE SET "title"=EXCLUDED."title","excerpt"=EXCLUDED."excerpt","content"=EXCLUDED."content","metaTitle"=EXCLUDED."metaTitle","metaDesc"=EXCLUDED."metaDesc","coverImage"=EXCLUDED."coverImage","tags"=EXCLUDED."tags","author"=EXCLUDED."author","status"=EXCLUDED."status","updated_at"=NOW()', [id, b.title, id, b.excerpt||b.summary||'', b.content||'', b.metaTitle||b.title, b.metaDesc||b.excerpt||b.summary||'', b.coverImage||b.image||'', b.tags||'', b.author||'Admin', b.status||'published']);
    res.status(201).json(Object.assign({ id: id, _id: id }, b));
  } catch(err) { res.status(500).json({ error: err.message }); }
});

app.put('/api/blogs/:id', async function(req, res) {
  try {
    var b = req.body;
    await db.query('UPDATE blogs SET "title"=COALESCE($1,"title"),"excerpt"=COALESCE($2,"excerpt"),"content"=COALESCE($3,"content"),"metaTitle"=COALESCE($4,"metaTitle"),"metaDesc"=COALESCE($5,"metaDesc"),"coverImage"=COALESCE($6,"coverImage"),"tags"=COALESCE($7,"tags"),"author"=COALESCE($8,"author"),"status"=COALESCE($9,"status"),"updated_at"=NOW() WHERE "_id"=$10', [b.title, b.excerpt||b.summary, b.content, b.metaTitle, b.metaDesc, b.coverImage||b.image, b.tags, b.author, b.status, req.params.id]);
    res.json(Object.assign({ id: req.params.id, _id: req.params.id }, b));
  } catch(err) { res.status(500).json({ error: err.message }); }
});

app.delete('/api/blogs/:id', async function(req, res) {
  try { await db.query('DELETE FROM blogs WHERE "_id"=$1', [req.params.id]); res.json({ success: true }); }
  catch(err) { res.status(500).json({ error: err.message }); }
});

// ── SEO SETTINGS (DUAL ROUTE HANDLER) ─────────────────────────
app.get(['/api/seosettings', '/api/seopages/settings'], async function(req, res) {
  try { var r = await db.query('SELECT * FROM seo_settings'); var obj = {}; r.rows.forEach(function(row) { obj[row.key] = row; }); res.json(obj); }
  catch(e) { res.json({}); }
});

app.get(['/api/seosettings/:key', '/api/seopages/settings/:key'], async function(req, res) {
  try { var r = await db.query('SELECT * FROM seo_settings WHERE "key"=$1', [req.params.key]); res.json(r.rows[0] || null); }
  catch(e) { res.json(null); }
});

app.put(['/api/seosettings/:key', '/api/seopages/settings/:key'], async function(req, res) {
  try {
    var key = req.params.key, b = req.body;
    await db.query('INSERT INTO seo_settings ("key","title","description","keywords","schema","other","content","updated_at") VALUES ($1,$2,$3,$4,$5,$6,$7,NOW()) ON CONFLICT ("key") DO UPDATE SET "title"=EXCLUDED."title","description"=EXCLUDED."description","keywords"=EXCLUDED."keywords","schema"=EXCLUDED."schema","other"=EXCLUDED."other","content"=EXCLUDED."content","updated_at"=NOW()', [key, b.title||'', b.description||'', b.keywords||'', b.schema||'', b.other||'', b.content||'']);
    res.json(Object.assign({ key: key }, b));
  } catch(err) { res.status(500).json({ error: err.message }); }
});

// ── SITE & SOCIAL SETTINGS ─────────────────────────────────────
app.get(['/api/settings', '/api/settings/:key'], async function(req, res) {
  try {
    var key = req.params.key || 'contact';
    var r = await db.query('SELECT * FROM site_settings WHERE "key"=$1 OR "key"=\'contact\' ORDER BY "updated_at" DESC LIMIT 1', [key]);
    var row = r.rows[0];
    if (!row) {
      var all = await db.query('SELECT * FROM site_settings');
      var obj = {};
      all.rows.forEach(function(item) {
        var val = item.value;
        if (typeof val === 'string') { try { val = JSON.parse(val); } catch(e) {} }
        obj[item.key] = val;
      });
      return res.json(obj);
    }
    var val = row.value;
    if (typeof val === 'string') { try { val = JSON.parse(val); } catch(e) {} }
    if (req.params.key) {
      return res.json(val);
    }
    res.json({ contact: val, value: val });
  } catch(e) {
    res.json({});
  }
});

app.put(['/api/settings', '/api/settings/:key'], async function(req, res) {
  try {
    var key = req.params.key || 'contact';
    var payload = req.body || {};
    var valueToSave = payload.value || payload;
    var jsonStr = typeof valueToSave === 'string' ? valueToSave : JSON.stringify(valueToSave);

    await db.query(
      'INSERT INTO site_settings ("key","value","updated_at") VALUES ($1,$2,NOW()) ON CONFLICT ("key") DO UPDATE SET "value"=EXCLUDED."value","updated_at"=NOW()',
      [key, jsonStr]
    );
    res.json({ success: true, key: key, value: valueToSave });
  } catch(err) {
    console.error('[SETTINGS PUT ERROR]', err.message);
    res.status(500).json({ error: err.message });
  }
});

// ── PORTFOLIO ─────────────────────────────────────────────────
app.get('/api/portfolio', async function(req, res) {
  try { var r = await db.query('SELECT * FROM portfolio ORDER BY "created_at" DESC'); res.json(r.rows); }
  catch(e) { res.json([]); }
});

app.post('/api/portfolio', auth, async function(req, res) {
  try {
    var b = req.body, id = 'proj_' + Math.random().toString(36).substr(2, 9);
    await db.query('INSERT INTO portfolio ("_id","title","description","techStack","coverImage","liveUrl","status") VALUES ($1,$2,$3,$4,$5,$6,$7)', [id, b.title, b.description||'', b.techStack||'', b.coverImage||'', b.liveUrl||'', b.status||'published']);
    res.status(201).json(Object.assign({ id: id, _id: id }, b));
  } catch(err) { res.status(500).json({ error: err.message }); }
});

app.put('/api/portfolio/:id', auth, async function(req, res) {
  try {
    var b = req.body;
    await db.query('UPDATE portfolio SET "title"=COALESCE($1,"title"),"description"=COALESCE($2,"description"),"techStack"=COALESCE($3,"techStack"),"coverImage"=COALESCE($4,"coverImage"),"liveUrl"=COALESCE($5,"liveUrl"),"status"=COALESCE($6,"status"),"updated_at"=NOW() WHERE "_id"=$7', [b.title, b.description, b.techStack, b.coverImage, b.liveUrl, b.status, req.params.id]);
    res.json(Object.assign({ id: req.params.id }, b));
  } catch(err) { res.status(500).json({ error: err.message }); }
});

app.delete('/api/portfolio/:id', auth, async function(req, res) {
  try { await db.query('DELETE FROM portfolio WHERE "_id"=$1', [req.params.id]); res.json({ success: true }); }
  catch(err) { res.status(500).json({ error: err.message }); }
});

// ── SEO PAGES ─────────────────────────────────────────────────
app.get('/api/seopages', auth, async function(req, res) {
  try { var r = await db.query('SELECT * FROM seo_pages ORDER BY "created_at" DESC'); res.json(r.rows); }
  catch(e) { res.json([]); }
});

app.put('/api/seopages/:id', auth, async function(req, res) {
  try {
    var b = req.body;
    await db.query('UPDATE seo_pages SET "title"=COALESCE($1,"title"),"metaTitle"=COALESCE($2,"metaTitle"),"metaDesc"=COALESCE($3,"metaDesc"),"metaKeywords"=COALESCE($4,"metaKeywords"),"content"=COALESCE($5,"content"),"schema"=COALESCE($6,"schema"),"status"=COALESCE($7,"status"),"updated_at"=NOW() WHERE "_id"=$8', [b.title, b.metaTitle, b.metaDesc, b.metaKeywords, b.content, b.schema, b.status, req.params.id]);
    res.json(Object.assign({ id: req.params.id }, b));
  } catch(err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/seopages', auth, async function(req, res) {
  try {
    var b = req.body, id = 'seo_' + Math.random().toString(36).substr(2, 9);
    await db.query('INSERT INTO seo_pages ("_id","slug","title","metaTitle","metaDesc","metaKeywords","content","schema","status") VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)', [id, b.slug, b.title||b.slug, b.metaTitle||b.title||b.slug, b.metaDesc||'', b.metaKeywords||'', b.content||'', b.schema||'', b.status||'published']);
    res.status(201).json(Object.assign({ id: id, _id: id }, b));
  } catch(err) { res.status(500).json({ error: err.message }); }
});

app.delete('/api/seopages/:id', auth, async function(req, res) {
  try { await db.query('DELETE FROM seo_pages WHERE "_id"=$1', [req.params.id]); res.json({ success: true }); }
  catch(err) { res.status(500).json({ error: err.message }); }
});

// ── ANALYTICS & SOCIAL ────────────────────────────────────────
app.post('/api/analytics/track', function(req, res) { res.json({ success: true }); });
app.get('/api/analytics', auth, function(req, res) { res.json([]); });
app.get('/api/social', async function(req, res) {
  try { var r = await db.query('SELECT * FROM social_settings LIMIT 1'); res.json(r.rows[0] || {}); }
  catch(e) { res.json({}); }
});

// ── BACKUP ────────────────────────────────────────────────────
app.get('/api/admin/backup', auth, async function(req, res) {
  try {
    var results = await Promise.all([
      db.query('SELECT * FROM leads ORDER BY "created_at" DESC'),
      db.query('SELECT * FROM services ORDER BY "created_at" DESC'),
      db.query('SELECT * FROM blogs ORDER BY "created_at" DESC'),
      db.query('SELECT * FROM seo_settings')
    ]);
    res.setHeader('Content-Disposition', 'attachment; filename="kts_backup_' + new Date().toISOString().split('T')[0] + '.json"');
    res.json({ timestamp: new Date().toISOString(), leads: results[0].rows, services: results[1].rows, blogs: results[2].rows, settings: results[3].rows });
  } catch(err) { res.status(500).json({ error: err.message }); }
});

// ── 404 FALLBACK ──────────────────────────────────────────────
app.use('/api', function(req, res) {
  res.status(404).json({ error: 'API route not found: ' + req.path });
});

// ── SEO META MAP ──────────────────────────────────────────────
// ── SEO META MAP ──────────────────────────────────────────────
var META = {
  '/': {
    title: 'IT Solutions Company in Delhi NCR | Kvantum Tech Solutions',
    desc: 'Kvantum Tech Solutions offers reliable IT services, software development, cloud solutions, web development, and digital transformation services across Delhi NCR.',
    ogTitle: 'IT Solutions Company in Delhi NCR | Kvantum Tech Solutions',
    ogDesc: 'Kvantum Tech Solutions offers reliable IT services, software development, cloud solutions, web development, and digital transformation services across Delhi NCR.'
  },
  '/about': {
    title: 'About Kvantum Tech Solutions | IT & AI Innovation Experts',
    desc: 'Learn about Kvantum Tech Solutions, a trusted IT company delivering AI-powered solutions, web development, digital marketing, and enterprise technology services.',
    ogTitle: 'About Kvantum Tech Solutions | IT & AI Innovation Experts',
    ogDesc: 'Discover Kvantum Tech Solutions, delivering innovative AI, web development, digital marketing, and enterprise IT solutions for business growth.'
  },
  '/services': {
    title: 'IT Services | Web Development, SEO & AI Solutions | Kvantum Tech Solutions',
    desc: 'Explore Kvantum Tech Solutions\' expert IT services, including web development, SEO, digital marketing, AI chatbots, app development, UI/UX design, and scalable business solutions.',
    ogTitle: 'IT Services | Web Development, SEO & AI Solutions | Kvantum Tech Solutions',
    ogDesc: 'Discover enterprise-grade IT services from Kvantum Tech Solutions, including web development, SEO, AI chatbots, digital marketing, app development, and UI/UX design.'
  },
  '/blog': {
    title: 'Tech Blog | AI, SEO, Web Development & Digital Marketing | Kvantum Tech Solutions',
    desc: 'Explore the Kvantum Tech Solutions blog for expert insights on AI, SEO, web development, digital marketing, software solutions, and the latest technology trends to grow your business.',
    ogTitle: 'Tech Blog | AI, SEO, Web Development & Digital Marketing | Kvantum Tech Solutions',
    ogDesc: 'Read the latest articles from Kvantum Tech Solutions covering AI, SEO, web development, digital marketing, software innovation, and business technology .'
  },
  '/contact': {
    title: 'Contact Kvantum Tech Solutions | Let\'s Build Your Digital Future',
    desc: 'Get in touch with Kvantum Tech Solutions for web development, AI solutions, SEO, digital marketing, mobile apps, and enterprise IT services. Contact our experts today.',
    ogTitle: 'Contact Kvantum Tech Solutions | Let\'s Build Your Digital Future',
    ogDesc: 'Contact Kvantum Tech Solutions to discuss your next digital project. Our experts deliver innovative web, AI, SEO, app development, and digital marketing solutions.'
  },
  '/projects': { title: 'Featured Software & Engineering Projects | Kvantum Tech Solutions', desc: 'Explore web products, apps, and custom platforms built for our clients.' },
  '/thank-you': { title: 'Thank You | Kvantum Tech Solutions', desc: 'Thank you for contacting Kvantum Tech Solutions. Our technical team will reach out shortly.' }
};

function getMeta(pathname) {
  if (META[pathname]) return META[pathname];
  if (pathname.startsWith('/services/')) { var s = pathname.replace('/services/', '').split('-').map(function(w) { return w.charAt(0).toUpperCase() + w.slice(1); }).join(' '); return { title: s + ' | Kvantum Tech Solutions', desc: s + ' services by Kvantum Tech Solutions.' }; }
  if (pathname.startsWith('/blog/')) { var b = pathname.replace('/blog/', '').split('-').map(function(w) { return w.charAt(0).toUpperCase() + w.slice(1); }).join(' '); return { title: b + ' | Kvantum Tech Blog', desc: 'Read about ' + b + ' on Kvantum Tech Solutions blog.' }; }
  if (pathname.startsWith('/keyword/')) { var k = pathname.replace('/keyword/', '').split('-').map(function(w) { return w.charAt(0).toUpperCase() + w.slice(1); }).join(' '); return { title: k + ' | Kvantum Tech Solutions', desc: k + ' solutions by Kvantum Tech Solutions.' }; }
  return META['/'];
}

app.get('/robots.txt', async function(req, res) {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  try {
    var rr = await db.query('SELECT "content" FROM seo_settings WHERE "key"=$1', ['robots']);
    if (rr.rows[0] && rr.rows[0].content) return res.send(rr.rows[0].content);
  } catch(e) {}
  try { return res.send(fs.readFileSync(path.join(process.cwd(), 'public', 'robots.txt'), 'utf8')); }
  catch(e) { return res.send('User-agent: *\nAllow: /\nSitemap: https://kvantumtechsolutions.com/sitemap.xml'); }
});

app.get('/sitemap.xml', async function(req, res) {
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  try {
    var rs = await db.query('SELECT "content" FROM seo_settings WHERE "key"=$1', ['sitemap']);
    if (rs.rows[0] && rs.rows[0].content) return res.send(rs.rows[0].content);
  } catch(e) {}
  try { return res.send(fs.readFileSync(path.join(process.cwd(), 'public', 'sitemap.xml'), 'utf8')); }
  catch(e) { return res.send('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://kvantumtechsolutions.com/</loc></url></urlset>'); }
});

app.get('/img/:name', function(req, res) {
  var s3Target = SUPABASE_PUBLIC_URL + '/' + S3_BUCKET + '/' + req.params.name;
  res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  return res.redirect(302, s3Target);
});

app.use(function(req, res) {
  try {
    var indexPath = path.join(process.cwd(), 'dist', 'index.html');
    var html = fs.readFileSync(indexPath, 'utf8');
    var canonicalUrl = 'https://kvantumtechsolutions.com' + (req.url === '/' ? '/' : req.url);
    var meta = getMeta(req.url || '/');
    var ogTitle = meta.ogTitle || meta.title;
    var ogDesc = meta.ogDesc || meta.desc;
    var ogImage = 'https://bwdtxlosvptlqtixgcip.supabase.co/storage/v1/object/public/kvantumtechsolutions_storage/logo-2-FINAL-DM.jpg';

    html = html.replace(/<title[^>]*?>[\s\S]*?<\/title>/gi, '<title>' + meta.title + '</title>');
    html = html.replace(/<meta\s+[^>]*?name=["']description["'][^>]*?\/?>/gi, '<meta name="description" content="' + meta.desc + '" />');
    html = html.replace(/<link\s+[^>]*?rel=["']canonical["'][^>]*?\/?>/gi, '<link rel="canonical" href="' + canonicalUrl + '" />');
    html = html.replace(/<meta\s+[^>]*?property=["']og:url["'][^>]*?\/?>/gi, '<meta property="og:url" content="' + canonicalUrl + '" />');
    html = html.replace(/<meta\s+[^>]*?property=["']og:title["'][^>]*?\/?>/gi, '<meta property="og:title" content="' + ogTitle + '" />');
    html = html.replace(/<meta\s+[^>]*?property=["']og:description["'][^>]*?\/?>/gi, '<meta property="og:description" content="' + ogDesc + '" />');
    html = html.replace(/<meta\s+[^>]*?property=["']og:image["'][^>]*?\/?>/gi, '<meta property="og:image" content="' + ogImage + '" />');

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(200).send(html);
  } catch(e) {
    return res.status(200).send('<!DOCTYPE html><html><head><title>Kvantum Tech Solutions</title></head><body><div id="root"></div></body></html>');
  }
});

// ============================================================
// MAIN VERCEL HANDLER (ESM)
// ============================================================
export default function handler(req, res) {
  return app(req, res);
}
