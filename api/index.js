import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';

// ============================================================
// SELF-CONTAINED VERCEL SERVERLESS HANDLER
// No external backend imports — everything in one file
// ============================================================

// Lazy-load Express and dependencies at runtime
let _app = null;

async function getApp() {
  if (_app) return _app;

  const express = (await import('express')).default;
  const pg = (await import('pg')).default;
  const jwt = (await import('jsonwebtoken')).default;
  const bcrypt = (await import('bcryptjs')).default;
  const multer = (await import('multer')).default;
  const { S3Client, PutObjectCommand, ListObjectsV2Command, DeleteObjectCommand } = await import('@aws-sdk/client-s3');
  const cookieParser = (await import('cookie-parser')).default;

  // ── CONFIG ──────────────────────────────────────────────
  const DB_URL = process.env.DATABASE_URL || 'postgresql://postgres.bwdtxlosvptlqtixgcip:kEM3onWoT9AT82mr@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres';
  const JWT_SECRET = process.env.JWT_SECRET || 'f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8';
  const S3_ENDPOINT = process.env.S3_ENDPOINT || 'https://bwdtxlosvptlqtixgcip.storage.supabase.co/storage/v1/s3';
  const S3_REGION = process.env.S3_REGION || 'ap-southeast-1';
  const S3_KEY = process.env.S3_ACCESS_KEY_ID || '33115ce861a8bddb04e8fbc63cf35e91';
  const S3_SECRET = process.env.S3_SECRET_ACCESS_KEY || '10aa4d1c43aa90f06111cf0e12fb0e3bc39a516a314792f0ab74ed655f8660a2';
  const S3_BUCKET = process.env.S3_BUCKET_NAME || 'kvantumtechsolutions_storage';
  const SUPABASE_URL = 'https://bwdtxlosvptlqtixgcip.supabase.co/storage/v1/object/public';

  // ── DATABASE ─────────────────────────────────────────────
  const { Pool } = pg;
  const pool = new Pool({ connectionString: DB_URL, ssl: { rejectUnauthorized: false } });
  const db = { query: (t, p) => pool.query(t, p) };

  // ── S3 CLIENT ────────────────────────────────────────────
  const s3 = new S3Client({
    endpoint: S3_ENDPOINT,
    region: S3_REGION,
    credentials: { accessKeyId: S3_KEY, secretAccessKey: S3_SECRET },
    forcePathStyle: true
  });

  // ── IN-MEMORY STORES (fallback) ──────────────────────────
  let localLeads = [];
  let localAssets = [];

  // ── EXPRESS APP ──────────────────────────────────────────
  const app = express();
  const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

  // CORS
  app.use((req, res, next) => {
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

  // ── AUTH MIDDLEWARE ──────────────────────────────────────
  const auth = (req, res, next) => {
    const token = (req.headers.authorization || '').replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: 'Unauthorized' });
    try {
      req.user = jwt.verify(token, JWT_SECRET);
      next();
    } catch {
      res.status(401).json({ error: 'Invalid token' });
    }
  };

  // ── HEALTH ───────────────────────────────────────────────
  app.get('/api/health', async (req, res) => {
    let dbConnected = false;
    try { const r = await db.query('SELECT NOW()'); dbConnected = r.rows.length > 0; } catch {}
    res.json({ status: 'active', server: 'Kvantum Engine v3', databaseConnected: dbConnected });
  });

  // ── AUTH ROUTES ──────────────────────────────────────────
  app.post('/api/admin/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
      const result = await db.query('SELECT * FROM users WHERE "email" = $1', [email]);
      const user = result.rows[0];
      if (!user) return res.status(401).json({ error: 'Invalid credentials' });
      const match = await bcrypt.compare(password, user.password);
      if (!match) return res.status(401).json({ error: 'Invalid credentials' });
      const token = jwt.sign({ id: user._id, email: user.email, role: user.role, name: user.name }, JWT_SECRET, { expiresIn: '7d' });
      res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // ── LEADS ROUTES ─────────────────────────────────────────
  app.post('/api/leads', async (req, res) => {
    try {
      const { name, email, phone, service, message, notes, company } = req.body;
      const id = 'lead_' + Math.random().toString(36).substr(2, 9);
      const msg = message || notes || 'Inquiry';
      const lead = { id, _id: id, name, email, phone: phone || '', service: service || 'Inquiry', message: msg, notes: notes || msg, status: 'New', quality: 'Warm', createdAt: new Date(), created_at: new Date() };
      try {
        await db.query(
          `INSERT INTO leads ("_id","name","email","phone","service","message") VALUES ($1,$2,$3,$4,$5,$6)`,
          [id, name, email, phone || '', service || 'Inquiry', msg]
        );
      } catch (dbErr) {
        console.warn('[LEAD DB]', dbErr.message);
        localLeads.unshift(lead);
      }
      res.status(201).json(lead);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get('/api/leads', auth, async (req, res) => {
    try {
      const result = await db.query('SELECT * FROM leads ORDER BY "created_at" DESC');
      const dbLeads = result.rows.map(r => ({ id: r._id, _id: r._id, name: r.name, email: r.email, phone: r.phone, service: r.service, message: r.message, notes: r.notes, status: r.status, quality: r.quality, createdAt: r.created_at, created_at: r.created_at }));
      const combined = new Map();
      [...localLeads, ...dbLeads].forEach(l => { if (l && l.id) combined.set(l.id, l); });
      res.json(Array.from(combined.values()));
    } catch (err) {
      res.json(localLeads);
    }
  });

  app.put('/api/leads/:id', auth, async (req, res) => {
    try {
      const { id } = req.params;
      const { status, quality, notes } = req.body;
      const result = await db.query(
        `UPDATE leads SET "status"=COALESCE($1,"status"),"quality"=COALESCE($2,"quality"),"notes"=COALESCE($3,"notes"),"updated_at"=NOW() WHERE "_id"=$4 RETURNING *`,
        [status, quality, notes, id]
      );
      res.json(result.rows[0] || { id, status, quality, notes });
    } catch (err) {
      res.json({ id: req.params.id, ...req.body });
    }
  });

  // ── ASSETS ROUTES ────────────────────────────────────────
  app.get('/api/assets', auth, async (req, res) => {
    try {
      const cmd = new ListObjectsV2Command({ Bucket: S3_BUCKET });
      const data = await s3.send(cmd);
      const assets = (data.Contents || []).map(item => {
        const ext = item.Key.split('.').pop().toLowerCase();
        const imgs = ['png','jpg','jpeg','svg','gif','webp'];
        return { name: item.Key, created_at: item.LastModified, publicUrl: `${SUPABASE_URL}/${S3_BUCKET}/${item.Key}`, url: `${SUPABASE_URL}/${S3_BUCKET}/${item.Key}`, size: item.Size || 0, contentType: imgs.includes(ext) ? `image/${ext === 'jpg' ? 'jpeg' : ext}` : 'application/octet-stream' };
      });
      res.json([...localAssets, ...assets]);
    } catch (err) {
      res.json(localAssets);
    }
  });

  app.post('/api/assets/upload', auth, upload.single('file'), async (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    const ts = Date.now();
    const safeName = req.file.originalname.replace(/[^a-zA-Z0-9_.-]/g, '_');
    const fileName = `${ts}_${safeName}`;
    const asset = { name: fileName, created_at: new Date().toISOString(), publicUrl: `${SUPABASE_URL}/${S3_BUCKET}/${fileName}`, url: `${SUPABASE_URL}/${S3_BUCKET}/${fileName}`, size: req.file.size, contentType: req.file.mimetype };
    try {
      await s3.send(new PutObjectCommand({ Bucket: S3_BUCKET, Key: fileName, Body: req.file.buffer, ContentType: req.file.mimetype }));
    } catch (err) {
      console.warn('[S3 UPLOAD]', err.message);
      asset.publicUrl = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
      asset.url = asset.publicUrl;
      localAssets.unshift(asset);
    }
    res.json(asset);
  });

  app.delete('/api/assets/:name', auth, async (req, res) => {
    try {
      await s3.send(new DeleteObjectCommand({ Bucket: S3_BUCKET, Key: req.params.name }));
    } catch {}
    localAssets = localAssets.filter(a => a.name !== req.params.name);
    res.json({ success: true, name: req.params.name });
  });

  // ── USERS ROUTES ─────────────────────────────────────────
  app.get('/api/users', auth, async (req, res) => {
    try {
      const result = await db.query('SELECT "_id","name","email","role","created_at" FROM users ORDER BY "created_at" DESC');
      res.json(result.rows.map(r => ({ id: r._id, _id: r._id, name: r.name, email: r.email, role: r.role, createdAt: r.created_at })));
    } catch (err) { res.json([]); }
  });

  app.post('/api/users/register', auth, async (req, res) => {
    try {
      const { name, email, password, role } = req.body;
      if (!name || !email || !password) return res.status(400).json({ error: 'Name, email and password required' });
      const exists = await db.query('SELECT "_id" FROM users WHERE "email"=$1', [email]);
      if (exists.rows.length > 0) return res.status(409).json({ error: 'User already exists' });
      const hashed = await bcrypt.hash(password, 10);
      const id = 'user_' + Math.random().toString(36).substr(2, 9);
      await db.query(`INSERT INTO users ("_id","name","email","password","role") VALUES ($1,$2,$3,$4,$5)`, [id, name, email, hashed, role || 'seo']);
      res.status(201).json({ id, name, email, role: role || 'seo' });
    } catch (err) { res.status(500).json({ error: err.message }); }
  });

  app.delete('/api/users/:id', auth, async (req, res) => {
    try {
      await db.query('DELETE FROM users WHERE "_id"=$1', [req.params.id]);
      res.json({ success: true });
    } catch (err) { res.status(500).json({ error: err.message }); }
  });

  // ── SERVICES ROUTES ──────────────────────────────────────
  app.get('/api/services', async (req, res) => {
    try {
      const result = await db.query('SELECT * FROM services ORDER BY "order" ASC, "created_at" DESC');
      res.json(result.rows);
    } catch (err) { res.json([]); }
  });

  app.post('/api/services', auth, async (req, res) => {
    try {
      const { title, slug, shortDesc, longDesc, metaTitle, metaDesc, keywords, coverImage, icon, status } = req.body;
      const id = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      await db.query(
        `INSERT INTO services ("_id","title","slug","shortDesc","longDesc","metaTitle","metaDesc","keywords","coverImage","icon","status") VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) ON CONFLICT ("_id") DO UPDATE SET "title"=EXCLUDED."title","shortDesc"=EXCLUDED."shortDesc","longDesc"=EXCLUDED."longDesc","metaTitle"=EXCLUDED."metaTitle","metaDesc"=EXCLUDED."metaDesc","keywords"=EXCLUDED."keywords","coverImage"=EXCLUDED."coverImage","icon"=EXCLUDED."icon","status"=EXCLUDED."status","updated_at"=NOW()`,
        [id, title, id, shortDesc||'', longDesc||'', metaTitle||title, metaDesc||shortDesc||'', keywords||'', coverImage||'', icon||'', status||'published']
      );
      res.status(201).json({ id, _id: id, ...req.body });
    } catch (err) { res.status(500).json({ error: err.message }); }
  });

  app.put('/api/services/:id', auth, async (req, res) => {
    try {
      const { id } = req.params;
      const { title, shortDesc, longDesc, metaTitle, metaDesc, keywords, coverImage, icon, status } = req.body;
      await db.query(
        `UPDATE services SET "title"=COALESCE($1,"title"),"shortDesc"=COALESCE($2,"shortDesc"),"longDesc"=COALESCE($3,"longDesc"),"metaTitle"=COALESCE($4,"metaTitle"),"metaDesc"=COALESCE($5,"metaDesc"),"keywords"=COALESCE($6,"keywords"),"coverImage"=COALESCE($7,"coverImage"),"icon"=COALESCE($8,"icon"),"status"=COALESCE($9,"status"),"updated_at"=NOW() WHERE "_id"=$10`,
        [title, shortDesc, longDesc, metaTitle, metaDesc, keywords, coverImage, icon, status, id]
      );
      res.json({ id, _id: id, ...req.body });
    } catch (err) { res.status(500).json({ error: err.message }); }
  });

  app.delete('/api/services/:id', auth, async (req, res) => {
    try { await db.query('DELETE FROM services WHERE "_id"=$1', [req.params.id]); res.json({ success: true }); }
    catch (err) { res.status(500).json({ error: err.message }); }
  });

  // ── BLOGS ROUTES ─────────────────────────────────────────
  app.get('/api/blogs', async (req, res) => {
    try {
      const result = await db.query('SELECT * FROM blogs ORDER BY "created_at" DESC');
      res.json(result.rows);
    } catch (err) { res.json([]); }
  });

  app.get('/api/blogs/:slug', async (req, res) => {
    try {
      const result = await db.query('SELECT * FROM blogs WHERE "slug"=$1 OR "_id"=$1', [req.params.slug]);
      if (!result.rows[0]) return res.status(404).json({ error: 'Not found' });
      res.json(result.rows[0]);
    } catch (err) { res.status(500).json({ error: err.message }); }
  });

  app.post('/api/blogs', auth, async (req, res) => {
    try {
      const { title, slug, excerpt, content, metaTitle, metaDesc, coverImage, tags, author, status } = req.body;
      const id = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      await db.query(
        `INSERT INTO blogs ("_id","title","slug","excerpt","content","metaTitle","metaDesc","coverImage","tags","author","status") VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) ON CONFLICT ("_id") DO UPDATE SET "title"=EXCLUDED."title","excerpt"=EXCLUDED."excerpt","content"=EXCLUDED."content","metaTitle"=EXCLUDED."metaTitle","metaDesc"=EXCLUDED."metaDesc","coverImage"=EXCLUDED."coverImage","tags"=EXCLUDED."tags","author"=EXCLUDED."author","status"=EXCLUDED."status","updated_at"=NOW()`,
        [id, title, id, excerpt||'', content||'', metaTitle||title, metaDesc||excerpt||'', coverImage||'', tags||'', author||'Admin', status||'published']
      );
      res.status(201).json({ id, _id: id, ...req.body });
    } catch (err) { res.status(500).json({ error: err.message }); }
  });

  app.put('/api/blogs/:id', auth, async (req, res) => {
    try {
      const { id } = req.params;
      const { title, excerpt, content, metaTitle, metaDesc, coverImage, tags, author, status } = req.body;
      await db.query(
        `UPDATE blogs SET "title"=COALESCE($1,"title"),"excerpt"=COALESCE($2,"excerpt"),"content"=COALESCE($3,"content"),"metaTitle"=COALESCE($4,"metaTitle"),"metaDesc"=COALESCE($5,"metaDesc"),"coverImage"=COALESCE($6,"coverImage"),"tags"=COALESCE($7,"tags"),"author"=COALESCE($8,"author"),"status"=COALESCE($9,"status"),"updated_at"=NOW() WHERE "_id"=$10`,
        [title, excerpt, content, metaTitle, metaDesc, coverImage, tags, author, status, id]
      );
      res.json({ id, _id: id, ...req.body });
    } catch (err) { res.status(500).json({ error: err.message }); }
  });

  app.delete('/api/blogs/:id', auth, async (req, res) => {
    try { await db.query('DELETE FROM blogs WHERE "_id"=$1', [req.params.id]); res.json({ success: true }); }
    catch (err) { res.status(500).json({ error: err.message }); }
  });

  // ── PORTFOLIO ROUTES ─────────────────────────────────────
  app.get('/api/portfolio', async (req, res) => {
    try { const r = await db.query('SELECT * FROM portfolio ORDER BY "created_at" DESC'); res.json(r.rows); }
    catch { res.json([]); }
  });

  app.post('/api/portfolio', auth, async (req, res) => {
    try {
      const id = 'proj_' + Math.random().toString(36).substr(2, 9);
      const { title, description, techStack, coverImage, liveUrl, status } = req.body;
      await db.query(`INSERT INTO portfolio ("_id","title","description","techStack","coverImage","liveUrl","status") VALUES ($1,$2,$3,$4,$5,$6,$7)`, [id, title, description||'', techStack||'', coverImage||'', liveUrl||'', status||'published']);
      res.status(201).json({ id, _id: id, ...req.body });
    } catch (err) { res.status(500).json({ error: err.message }); }
  });

  app.put('/api/portfolio/:id', auth, async (req, res) => {
    try {
      const { title, description, techStack, coverImage, liveUrl, status } = req.body;
      await db.query(`UPDATE portfolio SET "title"=COALESCE($1,"title"),"description"=COALESCE($2,"description"),"techStack"=COALESCE($3,"techStack"),"coverImage"=COALESCE($4,"coverImage"),"liveUrl"=COALESCE($5,"liveUrl"),"status"=COALESCE($6,"status"),"updated_at"=NOW() WHERE "_id"=$7`, [title, description, techStack, coverImage, liveUrl, status, req.params.id]);
      res.json({ id: req.params.id, ...req.body });
    } catch (err) { res.status(500).json({ error: err.message }); }
  });

  app.delete('/api/portfolio/:id', auth, async (req, res) => {
    try { await db.query('DELETE FROM portfolio WHERE "_id"=$1', [req.params.id]); res.json({ success: true }); }
    catch (err) { res.status(500).json({ error: err.message }); }
  });

  // ── SEO PAGES ROUTES ─────────────────────────────────────
  app.get('/api/seopages', auth, async (req, res) => {
    try { const r = await db.query('SELECT * FROM seo_pages ORDER BY "created_at" DESC'); res.json(r.rows); }
    catch { res.json([]); }
  });

  app.get('/api/seopages/:slug', async (req, res) => {
    try { const r = await db.query('SELECT * FROM seo_pages WHERE "slug"=$1', [req.params.slug]); res.json(r.rows[0] || null); }
    catch { res.json(null); }
  });

  app.post('/api/seopages', auth, async (req, res) => {
    try {
      const id = 'seo_' + Math.random().toString(36).substr(2, 9);
      const { slug, title, metaTitle, metaDesc, metaKeywords, content, schema, status } = req.body;
      await db.query(`INSERT INTO seo_pages ("_id","slug","title","metaTitle","metaDesc","metaKeywords","content","schema","status") VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`, [id, slug, title||slug, metaTitle||title||slug, metaDesc||'', metaKeywords||'', content||'', schema||'', status||'published']);
      res.status(201).json({ id, _id: id, ...req.body });
    } catch (err) { res.status(500).json({ error: err.message }); }
  });

  app.put('/api/seopages/:id', auth, async (req, res) => {
    try {
      const { title, metaTitle, metaDesc, metaKeywords, content, schema, status } = req.body;
      await db.query(`UPDATE seo_pages SET "title"=COALESCE($1,"title"),"metaTitle"=COALESCE($2,"metaTitle"),"metaDesc"=COALESCE($3,"metaDesc"),"metaKeywords"=COALESCE($4,"metaKeywords"),"content"=COALESCE($5,"content"),"schema"=COALESCE($6,"schema"),"status"=COALESCE($7,"status"),"updated_at"=NOW() WHERE "_id"=$8`, [title, metaTitle, metaDesc, metaKeywords, content, schema, status, req.params.id]);
      res.json({ id: req.params.id, ...req.body });
    } catch (err) { res.status(500).json({ error: err.message }); }
  });

  app.delete('/api/seopages/:id', auth, async (req, res) => {
    try { await db.query('DELETE FROM seo_pages WHERE "_id"=$1', [req.params.id]); res.json({ success: true }); }
    catch (err) { res.status(500).json({ error: err.message }); }
  });

  // ── SEO SETTINGS (sitemap, robots, page metas) ───────────
  app.get('/api/seosettings', auth, async (req, res) => {
    try { const r = await db.query('SELECT * FROM seo_settings'); const obj = {}; r.rows.forEach(row => { obj[row.key] = row; }); res.json(obj); }
    catch { res.json({}); }
  });

  app.get('/api/seosettings/:key', async (req, res) => {
    try { const r = await db.query('SELECT * FROM seo_settings WHERE "key"=$1', [req.params.key]); res.json(r.rows[0] || null); }
    catch { res.json(null); }
  });

  app.put('/api/seosettings/:key', auth, async (req, res) => {
    try {
      const { key } = req.params;
      const { content, title, description, keywords, schema, other } = req.body;
      await db.query(
        `INSERT INTO seo_settings ("key","title","description","keywords","schema","other","content") VALUES ($1,$2,$3,$4,$5,$6,$7) ON CONFLICT ("key") DO UPDATE SET "title"=EXCLUDED."title","description"=EXCLUDED."description","keywords"=EXCLUDED."keywords","schema"=EXCLUDED."schema","other"=EXCLUDED."other","content"=EXCLUDED."content","updated_at"=NOW()`,
        [key, title||'', description||'', keywords||'', schema||'', other||'', content||'']
      );
      res.json({ key, content, title, description, keywords, schema, other });
    } catch (err) { res.status(500).json({ error: err.message }); }
  });

  // ── SITE SETTINGS ROUTES ─────────────────────────────────
  app.get('/api/settings', async (req, res) => {
    try { const r = await db.query('SELECT * FROM site_settings ORDER BY "updated_at" DESC LIMIT 1'); res.json(r.rows[0] || {}); }
    catch { res.json({}); }
  });

  app.put('/api/settings', auth, async (req, res) => {
    try {
      const fields = req.body;
      const existing = await db.query('SELECT "_id" FROM site_settings LIMIT 1');
      if (existing.rows.length > 0) {
        const sets = Object.keys(fields).map((k, i) => `"${k}"=$${i + 2}`).join(',');
        await db.query(`UPDATE site_settings SET ${sets},"updated_at"=NOW() WHERE "_id"=$1`, [existing.rows[0]._id, ...Object.values(fields)]);
      } else {
        const id = 'settings_1';
        const cols = ['"_id"', ...Object.keys(fields).map(k => `"${k}"`)].join(',');
        const vals = ['$1', ...Object.keys(fields).map((_, i) => `$${i + 2}`)].join(',');
        await db.query(`INSERT INTO site_settings (${cols}) VALUES (${vals})`, [id, ...Object.values(fields)]);
      }
      res.json({ success: true, ...fields });
    } catch (err) { res.status(500).json({ error: err.message }); }
  });

  // ── TRAFFIC ANALYTICS ────────────────────────────────────
  app.post('/api/analytics/track', async (req, res) => { res.json({ success: true }); });
  app.get('/api/analytics', auth, async (req, res) => { res.json([]); });

  // ── SOCIAL MEDIA ─────────────────────────────────────────
  app.get('/api/social', async (req, res) => {
    try { const r = await db.query('SELECT * FROM social_settings LIMIT 1'); res.json(r.rows[0] || {}); }
    catch { res.json({}); }
  });

  app.put('/api/social', auth, async (req, res) => {
    try {
      const fields = req.body;
      const existing = await db.query('SELECT "_id" FROM social_settings LIMIT 1');
      if (existing.rows.length > 0) {
        const sets = Object.keys(fields).map((k, i) => `"${k}"=$${i + 2}`).join(',');
        await db.query(`UPDATE social_settings SET ${sets},"updated_at"=NOW() WHERE "_id"=$1`, [existing.rows[0]._id, ...Object.values(fields)]);
      } else {
        const id = 'social_1';
        const cols = ['"_id"', ...Object.keys(fields).map(k => `"${k}"`)].join(',');
        const vals = ['$1', ...Object.keys(fields).map((_, i) => `$${i + 2}`)].join(',');
        await db.query(`INSERT INTO social_settings (${cols}) VALUES (${vals})`, [id, ...Object.values(fields)]);
      }
      res.json({ success: true, ...fields });
    } catch (err) { res.status(500).json({ error: err.message }); }
  });

  // ── DB BACKUP ────────────────────────────────────────────
  app.get('/api/admin/backup', auth, async (req, res) => {
    try {
      const [leads, services, blogs, seoPages, settings] = await Promise.all([
        db.query('SELECT * FROM leads ORDER BY "created_at" DESC'),
        db.query('SELECT * FROM services ORDER BY "created_at" DESC'),
        db.query('SELECT * FROM blogs ORDER BY "created_at" DESC'),
        db.query('SELECT * FROM seo_pages ORDER BY "created_at" DESC'),
        db.query('SELECT * FROM seo_settings')
      ]);
      const backup = { timestamp: new Date().toISOString(), leads: leads.rows, services: services.rows, blogs: blogs.rows, seoPages: seoPages.rows, settings: settings.rows };
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Content-Disposition', `attachment; filename="kts_backup_${new Date().toISOString().split('T')[0]}.json"`);
      res.json(backup);
    } catch (err) { res.status(500).json({ error: err.message }); }
  });

  // ── SERVICES REORDER ─────────────────────────────────────
  app.put('/api/services/reorder', auth, async (req, res) => {
    try {
      const { orderedIds } = req.body;
      for (let i = 0; i < orderedIds.length; i++) {
        await db.query('UPDATE services SET "order"=$1 WHERE "_id"=$2', [i + 1, orderedIds[i]]);
      }
      res.json({ success: true });
    } catch (err) { res.status(500).json({ error: err.message }); }
  });

  _app = app;
  return app;
}

// ============================================================
// MAIN VERCEL HANDLER
// ============================================================
export default async function handler(req, res) {
  try {
    const reqUrl = req.url || '/';
    const parsedUrl = new URL(reqUrl, 'https://kvantumtechsolutions.com');
    const pathname = parsedUrl.pathname;

    // ── API Routes → Express ──────────────────────────────
    if (pathname.startsWith('/api')) {
      const app = await getApp();
      return app(req, res);
    }

    // ── robots.txt → DB then fallback to public file ──────
    if (pathname === '/robots.txt') {
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      try {
        const pg = (await import('pg')).default;
        const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL || 'postgresql://postgres.bwdtxlosvptlqtixgcip:kEM3onWoT9AT82mr@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres', ssl: { rejectUnauthorized: false } });
        const r = await pool.query('SELECT "content" FROM seo_settings WHERE "key"=$1', ['robots']);
        await pool.end();
        const content = r.rows[0]?.content;
        if (content) return res.status(200).send(content);
      } catch {}
      try {
        const staticRobots = fs.readFileSync(path.join(process.cwd(), 'public', 'robots.txt'), 'utf8');
        return res.status(200).send(staticRobots);
      } catch {
        return res.status(200).send('User-agent: *\nAllow: /\nSitemap: https://kvantumtechsolutions.com/sitemap.xml');
      }
    }

    // ── sitemap.xml → DB then fallback to public file ─────
    if (pathname === '/sitemap.xml') {
      res.setHeader('Content-Type', 'application/xml; charset=utf-8');
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      try {
        const pg = (await import('pg')).default;
        const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL || 'postgresql://postgres.bwdtxlosvptlqtixgcip:kEM3onWoT9AT82mr@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres', ssl: { rejectUnauthorized: false } });
        const r = await pool.query('SELECT "content" FROM seo_settings WHERE "key"=$1', ['sitemap']);
        await pool.end();
        const content = r.rows[0]?.content;
        if (content) return res.status(200).send(content);
      } catch {}
      try {
        const staticSitemap = fs.readFileSync(path.join(process.cwd(), 'public', 'sitemap.xml'), 'utf8');
        return res.status(200).send(staticSitemap);
      } catch {
        return res.status(200).send('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://kvantumtechsolutions.com/</loc></url></urlset>');
      }
    }

    // ── HTML Pages → SSR Meta Injection ──────────────────
    const indexPath = path.join(process.cwd(), 'dist', 'index.html');
    let html = fs.readFileSync(indexPath, 'utf8');

    const siteUrl = 'https://kvantumtechsolutions.com';
    const canonicalUrl = `${siteUrl}${pathname === '/' ? '/' : pathname}`;

    const metaMap = {
      '/': { title: 'Custom Software Development Company | Kvantum Tech Solutions', desc: 'Kvantum Tech Solutions is a custom software development company building scalable business software, CRM, HRMS, ERP, web and mobile apps, and automation solutions.' },
      '/about': { title: 'About Kvantum Tech Solutions | IT & Digital Engineering Experts', desc: 'Learn about Kvantum Tech Solutions, a trusted digital engineering agency delivering custom software, web applications, CRM engines, and business automation.' },
      '/services': { title: 'Enterprise IT & Automation Services | Kvantum Tech Solutions', desc: 'Explore custom software development, CRM systems, HRMS payroll, ERP platforms, WhatsApp API automation, and scalable web apps built by Kvantum Tech Solutions.' },
      '/projects': { title: 'Featured Software & Engineering Projects | Kvantum Tech Solutions', desc: 'Explore enterprise case studies, custom CRM systems, HRMS platforms, and web applications engineered by Kvantum Tech Solutions.' },
      '/blog': { title: 'Tech Blog | AI, SEO, Web Development & Automation | Kvantum Tech Solutions', desc: 'Read expert articles, technical guides, system architecture blueprints, and SEO strategies published weekly by Kvantum Tech Solutions.' },
      '/contact': { title: 'Contact Kvantum Tech Solutions | Direct Technical Contact', desc: 'Get in touch with Kvantum Tech Solutions for custom software, CRM, HRMS, ERP, web apps, and business automation.' },
      '/thank-you': { title: 'Thank You | Kvantum Tech Solutions', desc: 'Thank you for contacting Kvantum Tech Solutions. Our technical team will reach out to you shortly.' },
      '/privacy': { title: 'Privacy Policy | Kvantum Tech Solutions', desc: 'Privacy Policy for Kvantum Tech Solutions.' },
      '/terms': { title: 'Terms & Conditions | Kvantum Tech Solutions', desc: 'Terms and Conditions for Kvantum Tech Solutions.' },
    };

    let { title, desc } = metaMap[pathname] || (() => {
      if (pathname.startsWith('/services/')) {
        const slug = pathname.replace('/services/', '');
        const label = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        return { title: `${label} | Kvantum Tech Solutions`, desc: `${label} services by Kvantum Tech Solutions.` };
      }
      if (pathname.startsWith('/blog/')) {
        const slug = pathname.replace('/blog/', '');
        const label = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        return { title: `${label} | Kvantum Tech Blog`, desc: `Read about ${label} on Kvantum Tech Solutions blog.` };
      }
      if (pathname.startsWith('/keyword/')) {
        const slug = pathname.replace('/keyword/', '');
        const label = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        return { title: `${label} | Kvantum Tech Solutions`, desc: `${label} solutions by Kvantum Tech Solutions.` };
      }
      return metaMap['/'];
    })();

    const ogImage = `${siteUrl}/assets/og-image.jpg`;

    html = html.replace(/<title[^>]*?>[\s\S]*?<\/title>/gi, `<title>${title}</title>`);
    html = html.replace(/<meta\s+[^>]*?name=["']description["'][^>]*?\/?>/gi, `<meta name="description" content="${desc}" />`);
    html = html.replace(/<link\s+[^>]*?rel=["']canonical["'][^>]*?\/?>/gi, `<link rel="canonical" href="${canonicalUrl}" />`);
    html = html.replace(/<meta\s+[^>]*?property=["']og:url["'][^>]*?\/?>/gi, `<meta property="og:url" content="${canonicalUrl}" />`);
    html = html.replace(/<meta\s+[^>]*?property=["']og:title["'][^>]*?\/?>/gi, `<meta property="og:title" content="${title}" />`);
    html = html.replace(/<meta\s+[^>]*?property=["']og:description["'][^>]*?\/?>/gi, `<meta property="og:description" content="${desc}" />`);
    html = html.replace(/<meta\s+[^>]*?property=["']og:image["'][^>]*?\/?>/gi, `<meta property="og:image" content="${ogImage}" />`);
    html = html.replace(/<meta\s+[^>]*?property=["']og:image:secure_url["'][^>]*?\/?>/gi, `<meta property="og:image:secure_url" content="${ogImage}" />`);
    html = html.replace(/<meta\s+[^>]*?name=["']twitter:title["'][^>]*?\/?>/gi, `<meta name="twitter:title" content="${title}" />`);
    html = html.replace(/<meta\s+[^>]*?name=["']twitter:description["'][^>]*?\/?>/gi, `<meta name="twitter:description" content="${desc}" />`);
    html = html.replace(/<meta\s+[^>]*?name=["']twitter:image["'][^>]*?\/?>/gi, `<meta name="twitter:image" content="${ogImage}" />`);

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
    return res.status(200).send(html);

  } catch (err) {
    console.error('[HANDLER ERROR]', err);
    try {
      const html = fs.readFileSync(path.join(process.cwd(), 'dist', 'index.html'), 'utf8');
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      return res.status(200).send(html);
    } catch {
      return res.status(500).send('Server Error');
    }
  }
}
