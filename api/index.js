/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';

const fs = require('fs');
const path = require('path');
const express = require('express');
const pg = require('pg');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const { S3Client, PutObjectCommand, ListObjectsV2Command, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const cookieParser = require('cookie-parser');

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
  res.json({ status: 'active', server: 'Kvantum Engine v5-CJS', databaseConnected: dbConnected });
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
    var body = req.body;
    var id = 'lead_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
    var msg = body.message || body.notes || 'Inquiry';
    var lead = { id: id, _id: id, name: body.name || 'Client', email: body.email || '', phone: body.phone || '', service: body.service || 'Inquiry', message: msg, notes: msg, status: 'New', quality: 'Warm', createdAt: new Date().toISOString(), created_at: new Date().toISOString() };
    try {
      await db.query('INSERT INTO leads ("_id","name","email","phone","service","message","notes","status","quality") VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)', [id, lead.name, lead.email, lead.phone, lead.service, msg, msg, 'New', 'Warm']);
    } catch(dbErr) {
      console.warn('[LEAD DB]', dbErr.message);
      localLeads.unshift(lead);
    }
    res.status(201).json(lead);
  } catch(err) { res.status(500).json({ error: err.message }); }
});

app.get('/api/leads', auth, async function(req, res) {
  try {
    var result = await db.query('SELECT * FROM leads ORDER BY "created_at" DESC');
    var dbLeads = result.rows.map(function(r) { return { id: r._id, _id: r._id, name: r.name, email: r.email, phone: r.phone, service: r.service, message: r.message, notes: r.notes || r.message, status: r.status, quality: r.quality, createdAt: r.created_at, created_at: r.created_at }; });
    var combined = new Map();
    localLeads.concat(dbLeads).forEach(function(l) { if (l && l.id) combined.set(l.id, l); });
    res.json(Array.from(combined.values()));
  } catch(err) { res.json(localLeads); }
});

app.put('/api/leads/:id', auth, async function(req, res) {
  try {
    var result = await db.query('UPDATE leads SET "status"=COALESCE($1,"status"),"quality"=COALESCE($2,"quality"),"notes"=COALESCE($3,"notes"),"updated_at"=NOW() WHERE "_id"=$4 RETURNING *', [req.body.status, req.body.quality, req.body.notes, req.params.id]);
    res.json(result.rows[0] || Object.assign({ id: req.params.id }, req.body));
  } catch(err) { res.json(Object.assign({ id: req.params.id }, req.body)); }
});

app.delete('/api/leads/:id', auth, async function(req, res) {
  try { await db.query('DELETE FROM leads WHERE "_id"=$1', [req.params.id]); localLeads = localLeads.filter(function(l) { return l.id !== req.params.id; }); res.json({ success: true }); }
  catch(err) { res.status(500).json({ error: err.message }); }
});

// ── ASSETS ────────────────────────────────────────────────────
app.get('/api/assets', auth, async function(req, res) {
  try {
    var data = await s3.send(new ListObjectsV2Command({ Bucket: S3_BUCKET }));
    var assets = (data.Contents || []).map(function(item) {
      var ext = (item.Key.split('.').pop() || '').toLowerCase();
      var imgs = ['png','jpg','jpeg','svg','gif','webp'];
      return { name: item.Key, created_at: item.LastModified, publicUrl: SUPABASE_PUBLIC_URL + '/' + S3_BUCKET + '/' + item.Key, url: SUPABASE_PUBLIC_URL + '/' + S3_BUCKET + '/' + item.Key, size: item.Size || 0, contentType: imgs.indexOf(ext) >= 0 ? ('image/' + (ext === 'jpg' ? 'jpeg' : ext)) : 'application/octet-stream' };
    });
    res.json(localAssets.concat(assets));
  } catch(err) { res.json(localAssets); }
});

app.post('/api/assets/upload', auth, upload.single('file'), async function(req, res) {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  var ts = Date.now();
  var safeName = req.file.originalname.replace(/[^a-zA-Z0-9_.-]/g, '_');
  var fileName = ts + '_' + safeName;
  var asset = { name: fileName, created_at: new Date().toISOString(), publicUrl: SUPABASE_PUBLIC_URL + '/' + S3_BUCKET + '/' + fileName, url: SUPABASE_PUBLIC_URL + '/' + S3_BUCKET + '/' + fileName, size: req.file.size, contentType: req.file.mimetype };
  try { await s3.send(new PutObjectCommand({ Bucket: S3_BUCKET, Key: fileName, Body: req.file.buffer, ContentType: req.file.mimetype })); }
  catch(err) { console.warn('[S3]', err.message); localAssets.unshift(asset); }
  res.json(asset);
});

app.delete('/api/assets/:name', auth, async function(req, res) {
  try { await s3.send(new DeleteObjectCommand({ Bucket: S3_BUCKET, Key: req.params.name })); } catch(e) {}
  localAssets = localAssets.filter(function(a) { return a.name !== req.params.name; });
  res.json({ success: true, name: req.params.name });
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
  try { var r = await db.query('SELECT * FROM services ORDER BY "order" ASC, "created_at" DESC'); res.json(r.rows); }
  catch(err) { res.json([]); }
});

app.post('/api/services', auth, async function(req, res) {
  try {
    var b = req.body, id = b.slug || (b.title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
    await db.query('INSERT INTO services ("_id","title","slug","shortDesc","longDesc","metaTitle","metaDesc","keywords","coverImage","icon","status") VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) ON CONFLICT ("_id") DO UPDATE SET "title"=EXCLUDED."title","shortDesc"=EXCLUDED."shortDesc","longDesc"=EXCLUDED."longDesc","metaTitle"=EXCLUDED."metaTitle","metaDesc"=EXCLUDED."metaDesc","keywords"=EXCLUDED."keywords","coverImage"=EXCLUDED."coverImage","icon"=EXCLUDED."icon","status"=EXCLUDED."status","updated_at"=NOW()', [id, b.title, id, b.shortDesc||'', b.longDesc||'', b.metaTitle||b.title, b.metaDesc||b.shortDesc||'', b.keywords||'', b.coverImage||'', b.icon||'', b.status||'published']);
    res.status(201).json(Object.assign({ id: id, _id: id }, b));
  } catch(err) { res.status(500).json({ error: err.message }); }
});

app.put('/api/services/:id', auth, async function(req, res) {
  try {
    var b = req.body;
    await db.query('UPDATE services SET "title"=COALESCE($1,"title"),"shortDesc"=COALESCE($2,"shortDesc"),"longDesc"=COALESCE($3,"longDesc"),"metaTitle"=COALESCE($4,"metaTitle"),"metaDesc"=COALESCE($5,"metaDesc"),"keywords"=COALESCE($6,"keywords"),"coverImage"=COALESCE($7,"coverImage"),"icon"=COALESCE($8,"icon"),"status"=COALESCE($9,"status"),"updated_at"=NOW() WHERE "_id"=$10', [b.title, b.shortDesc, b.longDesc, b.metaTitle, b.metaDesc, b.keywords, b.coverImage, b.icon, b.status, req.params.id]);
    res.json(Object.assign({ id: req.params.id, _id: req.params.id }, b));
  } catch(err) { res.status(500).json({ error: err.message }); }
});

app.delete('/api/services/:id', auth, async function(req, res) {
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

app.post('/api/blogs', auth, async function(req, res) {
  try {
    var b = req.body, id = b.slug || (b.title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
    await db.query('INSERT INTO blogs ("_id","title","slug","excerpt","content","metaTitle","metaDesc","coverImage","tags","author","status") VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) ON CONFLICT ("_id") DO UPDATE SET "title"=EXCLUDED."title","excerpt"=EXCLUDED."excerpt","content"=EXCLUDED."content","metaTitle"=EXCLUDED."metaTitle","metaDesc"=EXCLUDED."metaDesc","coverImage"=EXCLUDED."coverImage","tags"=EXCLUDED."tags","author"=EXCLUDED."author","status"=EXCLUDED."status","updated_at"=NOW()', [id, b.title, id, b.excerpt||'', b.content||'', b.metaTitle||b.title, b.metaDesc||b.excerpt||'', b.coverImage||'', b.tags||'', b.author||'Admin', b.status||'published']);
    res.status(201).json(Object.assign({ id: id, _id: id }, b));
  } catch(err) { res.status(500).json({ error: err.message }); }
});

app.put('/api/blogs/:id', auth, async function(req, res) {
  try {
    var b = req.body;
    await db.query('UPDATE blogs SET "title"=COALESCE($1,"title"),"excerpt"=COALESCE($2,"excerpt"),"content"=COALESCE($3,"content"),"metaTitle"=COALESCE($4,"metaTitle"),"metaDesc"=COALESCE($5,"metaDesc"),"coverImage"=COALESCE($6,"coverImage"),"tags"=COALESCE($7,"tags"),"author"=COALESCE($8,"author"),"status"=COALESCE($9,"status"),"updated_at"=NOW() WHERE "_id"=$10', [b.title, b.excerpt, b.content, b.metaTitle, b.metaDesc, b.coverImage, b.tags, b.author, b.status, req.params.id]);
    res.json(Object.assign({ id: req.params.id, _id: req.params.id }, b));
  } catch(err) { res.status(500).json({ error: err.message }); }
});

app.delete('/api/blogs/:id', auth, async function(req, res) {
  try { await db.query('DELETE FROM blogs WHERE "_id"=$1', [req.params.id]); res.json({ success: true }); }
  catch(err) { res.status(500).json({ error: err.message }); }
});

// ── SEO SETTINGS ──────────────────────────────────────────────
app.get('/api/seosettings', auth, async function(req, res) {
  try { var r = await db.query('SELECT * FROM seo_settings'); var obj = {}; r.rows.forEach(function(row) { obj[row.key] = row; }); res.json(obj); }
  catch(e) { res.json({}); }
});

app.get('/api/seosettings/:key', async function(req, res) {
  try { var r = await db.query('SELECT * FROM seo_settings WHERE "key"=$1', [req.params.key]); res.json(r.rows[0] || null); }
  catch(e) { res.json(null); }
});

app.put('/api/seosettings/:key', auth, async function(req, res) {
  try {
    var key = req.params.key, b = req.body;
    await db.query('INSERT INTO seo_settings ("key","title","description","keywords","schema","other","content","updated_at") VALUES ($1,$2,$3,$4,$5,$6,$7,NOW()) ON CONFLICT ("key") DO UPDATE SET "title"=EXCLUDED."title","description"=EXCLUDED."description","keywords"=EXCLUDED."keywords","schema"=EXCLUDED."schema","other"=EXCLUDED."other","content"=EXCLUDED."content","updated_at"=NOW()', [key, b.title||'', b.description||'', b.keywords||'', b.schema||'', b.other||'', b.content||'']);
    res.json(Object.assign({ key: key }, b));
  } catch(err) { res.status(500).json({ error: err.message }); }
});

// ── SITE SETTINGS ─────────────────────────────────────────────
app.get('/api/settings', async function(req, res) {
  try { var r = await db.query('SELECT * FROM site_settings ORDER BY "updated_at" DESC LIMIT 1'); res.json(r.rows[0] || {}); }
  catch(e) { res.json({}); }
});

app.put('/api/settings', auth, async function(req, res) {
  try {
    var fields = req.body;
    var existing = await db.query('SELECT "_id" FROM site_settings LIMIT 1');
    if (existing.rows.length > 0) {
      var keys = Object.keys(fields);
      var sets = keys.map(function(k, i) { return '"' + k + '"=$' + (i + 2); }).join(',');
      await db.query('UPDATE site_settings SET ' + sets + ',"updated_at"=NOW() WHERE "_id"=$1', [existing.rows[0]._id].concat(Object.values(fields)));
    } else {
      var id = 'settings_1';
      var cols = ['"_id"'].concat(Object.keys(fields).map(function(k) { return '"' + k + '"'; })).join(',');
      var vals = ['$1'].concat(Object.keys(fields).map(function(_, i) { return '$' + (i + 2); })).join(',');
      await db.query('INSERT INTO site_settings (' + cols + ') VALUES (' + vals + ')', [id].concat(Object.values(fields)));
    }
    res.json(Object.assign({ success: true }, fields));
  } catch(err) { res.status(500).json({ error: err.message }); }
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
var META = {
  '/': { title: 'Custom Software Development Company | Kvantum Tech Solutions', desc: 'Kvantum Tech Solutions is a custom software development company building scalable business software, CRM, HRMS, ERP, web and mobile apps, and automation solutions.' },
  '/about': { title: 'About Kvantum Tech Solutions | IT & Digital Engineering Experts', desc: 'Learn about Kvantum Tech Solutions, a trusted digital engineering agency delivering custom software, web applications, CRM engines, and business automation.' },
  '/services': { title: 'Enterprise IT & Automation Services | Kvantum Tech Solutions', desc: 'Explore custom software development, CRM systems, HRMS payroll, ERP platforms, WhatsApp API automation, and scalable web apps built by Kvantum Tech Solutions.' },
  '/projects': { title: 'Featured Software & Engineering Projects | Kvantum Tech Solutions', desc: 'Explore enterprise case studies, custom CRM systems, HRMS platforms, and web applications engineered by Kvantum Tech Solutions.' },
  '/blog': { title: 'Tech Blog | AI, SEO, Web Development & Automation | Kvantum Tech Solutions', desc: 'Read expert articles, technical guides, system architecture blueprints, and SEO strategies published weekly by Kvantum Tech Solutions.' },
  '/contact': { title: 'Contact Kvantum Tech Solutions | Direct Technical Contact', desc: 'Get in touch with Kvantum Tech Solutions for custom software, CRM, HRMS, ERP, web apps, and business automation.' },
  '/thank-you': { title: 'Thank You | Kvantum Tech Solutions', desc: 'Thank you for contacting Kvantum Tech Solutions. Our technical team will reach out shortly.' }
};

function getMeta(pathname) {
  if (META[pathname]) return META[pathname];
  if (pathname.startsWith('/services/')) { var s = pathname.replace('/services/', '').split('-').map(function(w) { return w.charAt(0).toUpperCase() + w.slice(1); }).join(' '); return { title: s + ' | Kvantum Tech Solutions', desc: s + ' services by Kvantum Tech Solutions.' }; }
  if (pathname.startsWith('/blog/')) { var b = pathname.replace('/blog/', '').split('-').map(function(w) { return w.charAt(0).toUpperCase() + w.slice(1); }).join(' '); return { title: b + ' | Kvantum Tech Blog', desc: 'Read about ' + b + ' on Kvantum Tech Solutions blog.' }; }
  if (pathname.startsWith('/keyword/')) { var k = pathname.replace('/keyword/', '').split('-').map(function(w) { return w.charAt(0).toUpperCase() + w.slice(1); }).join(' '); return { title: k + ' | Kvantum Tech Solutions', desc: k + ' solutions by Kvantum Tech Solutions.' }; }
  return META['/'];
}

// ============================================================
// MAIN VERCEL HANDLER (CommonJS)
// ============================================================
module.exports = async function handler(req, res) {
  try {
    var reqUrl = req.url || '/';
    var parsedUrl = new URL(reqUrl, 'https://kvantumtechsolutions.com');
    var pathname = parsedUrl.pathname;

    // ── API → Express ────────────────────────────────────────
    if (pathname.startsWith('/api')) {
      return app(req, res);
    }

    // ── robots.txt ───────────────────────────────────────────
    if (pathname === '/robots.txt') {
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      try {
        var rr = await db.query('SELECT "content" FROM seo_settings WHERE "key"=$1', ['robots']);
        if (rr.rows[0] && rr.rows[0].content) return res.status(200).send(rr.rows[0].content);
      } catch(e) {}
      try { return res.status(200).send(fs.readFileSync(path.join(process.cwd(), 'public', 'robots.txt'), 'utf8')); }
      catch(e) { return res.status(200).send('User-agent: *\nAllow: /\nSitemap: https://kvantumtechsolutions.com/sitemap.xml'); }
    }

    // ── sitemap.xml ──────────────────────────────────────────
    if (pathname === '/sitemap.xml') {
      res.setHeader('Content-Type', 'application/xml; charset=utf-8');
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      try {
        var rs = await db.query('SELECT "content" FROM seo_settings WHERE "key"=$1', ['sitemap']);
        if (rs.rows[0] && rs.rows[0].content) return res.status(200).send(rs.rows[0].content);
      } catch(e) {}
      try { return res.status(200).send(fs.readFileSync(path.join(process.cwd(), 'public', 'sitemap.xml'), 'utf8')); }
      catch(e) { return res.status(200).send('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://kvantumtechsolutions.com/</loc></url></urlset>'); }
    }

    // ── HTML (SSR Meta) ──────────────────────────────────────
    var indexPath = path.join(process.cwd(), 'dist', 'index.html');
    var html = fs.readFileSync(indexPath, 'utf8');
    var siteUrl = 'https://kvantumtechsolutions.com';
    var canonicalUrl = siteUrl + pathname;
    var meta = getMeta(pathname);
    var ogImage = siteUrl + '/assets/og-image.jpg';

    html = html.replace(/<title[^>]*?>[\s\S]*?<\/title>/gi, '<title>' + meta.title + '</title>');
    html = html.replace(/<meta\s+[^>]*?name=["']description["'][^>]*?\/?>/gi, '<meta name="description" content="' + meta.desc + '" />');
    html = html.replace(/<link\s+[^>]*?rel=["']canonical["'][^>]*?\/?>/gi, '<link rel="canonical" href="' + canonicalUrl + '" />');
    html = html.replace(/<meta\s+[^>]*?property=["']og:url["'][^>]*?\/?>/gi, '<meta property="og:url" content="' + canonicalUrl + '" />');
    html = html.replace(/<meta\s+[^>]*?property=["']og:title["'][^>]*?\/?>/gi, '<meta property="og:title" content="' + meta.title + '" />');
    html = html.replace(/<meta\s+[^>]*?property=["']og:description["'][^>]*?\/?>/gi, '<meta property="og:description" content="' + meta.desc + '" />');
    html = html.replace(/<meta\s+[^>]*?property=["']og:image["'][^>]*?\/?>/gi, '<meta property="og:image" content="' + ogImage + '" />');
    html = html.replace(/<meta\s+[^>]*?property=["']og:image:secure_url["'][^>]*?\/?>/gi, '<meta property="og:image:secure_url" content="' + ogImage + '" />');
    html = html.replace(/<meta\s+[^>]*?name=["']twitter:title["'][^>]*?\/?>/gi, '<meta name="twitter:title" content="' + meta.title + '" />');
    html = html.replace(/<meta\s+[^>]*?name=["']twitter:description["'][^>]*?\/?>/gi, '<meta name="twitter:description" content="' + meta.desc + '" />');
    html = html.replace(/<meta\s+[^>]*?name=["']twitter:image["'][^>]*?\/?>/gi, '<meta name="twitter:image" content="' + ogImage + '" />');

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
    return res.status(200).send(html);

  } catch(err) {
    console.error('[HANDLER ERROR]', err);
    try {
      var html = fs.readFileSync(path.join(process.cwd(), 'dist', 'index.html'), 'utf8');
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      return res.status(200).send(html);
    } catch(e) {
      return res.status(500).send('Server Error: ' + err.message);
    }
  }
};
