import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { corsMiddleware } from './config/cors.js';
import { rateLimiter } from './middlewares/rateLimit.middleware.js';
import { errorHandler } from './middlewares/error.middleware.js';
import globalRouter from './routes/index.js';
import { ApiError } from './utils/ApiError.js';
import { db } from './config/db.js';

const app = express();

// 1. Mount CORS Middleware FIRST to process preflight OPTIONS requests cleanly
app.use(corsMiddleware);
app.options('*', corsMiddleware);

// Guaranteed Custom CORS Fallback Headers Middleware
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else {
    res.setHeader('Access-Control-Allow-Origin', '*');
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

// 2. Security & Utility Middleware
app.use(helmet({
  crossOriginResourcePolicy: false
}));
app.use(morgan('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());

// Base Health Check Endpoint (Public)
app.get('/api/health', async (req, res) => {
  let dbConnected = false;
  try {
    const dbRes = await db.query('SELECT NOW()');
    dbConnected = dbRes.rows.length > 0;
  } catch (err) {
    dbConnected = false;
  }
  
  res.json({
    status: 'active',
    server: 'Kvantum Tech Solutions Engine',
    databaseConnected: dbConnected
  });
});

// Base Server Ping (Public)
app.get('/', async (req, res) => {
  if (process.env.NODE_ENV === 'production' || req.hostname === 'api.kvantumtechsolutions.com') {
    return res.status(404).send('Not Found');
  }

  let dbConnected = false;
  try {
    const dbRes = await db.query('SELECT NOW()');
    dbConnected = dbRes.rows.length > 0;
  } catch (err) {
    dbConnected = false;
  }
  
  res.json({
    status: 'active',
    server: 'Kvantum Tech Solutions Modular PostgreSQL Engine',
    databaseConnected: dbConnected
  });
});

// 301 Permanent Redirects for legacy URLs (Google Search Central guidelines)
app.get('/services/web-development', (req, res) => {
  res.redirect(301, 'https://kvantumtechsolutions.com/services/web-mobile-app-development');
});

// Dynamic robots.txt route served at the root of the server
app.get('/robots.txt', async (req, res) => {
  try {
    const resSetting = await db.query('SELECT "content" FROM seo_settings WHERE "key" = $1', ['robots']);
    const setting = resSetting.rows[0];
    const content = setting ? setting.content : `User-agent: *\nAllow: /\nDisallow: /admin\nSitemap: https://kvantumtechsolutions.com/sitemap.xml`;
    res.type('text/plain');
    res.send(content);
  } catch (err) {
    res.type('text/plain');
    res.send(`User-agent: *\nAllow: /\nDisallow: /admin\nSitemap: https://kvantumtechsolutions.com/sitemap.xml`);
  }
});

// Dynamic sitemap.xml route served at the root of the server
app.get('/sitemap.xml', async (req, res) => {
  try {
    const resSetting = await db.query('SELECT "content" FROM seo_settings WHERE "key" = $1', ['sitemap']);
    const setting = resSetting.rows[0];
    const defaultXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

    <url>
        <loc>https://kvantumtechsolutions.com/</loc>
        <lastmod>2026-07-15</lastmod>
    </url>

    <url>
        <loc>https://kvantumtechsolutions.com/about</loc>
        <lastmod>2026-07-19</lastmod>
    </url>

    <url>
        <loc>https://kvantumtechsolutions.com/services/custom-software-development</loc>
        <lastmod>2026-07-20</lastmod>
    </url>

    <url>
        <loc>https://kvantumtechsolutions.com/services/crm-software-development</loc>
        <lastmod>2026-07-20</lastmod>
    </url>

    <url>
        <loc>https://kvantumtechsolutions.com/services/business-automation</loc>
        <lastmod>2026-07-20</lastmod>
    </url>

    <url>
        <loc>https://kvantumtechsolutions.com/services/hrms-software</loc>
        <lastmod>2026-07-20</lastmod>
    </url>

    <url>
        <loc>https://kvantumtechsolutions.com/services/whatsapp-automation</loc>
        <lastmod>2026-07-20</lastmod>
    </url>

    <url>
        <loc>https://kvantumtechsolutions.com/services/web-mobile-app-development</loc>
        <lastmod>2026-07-20</lastmod>
    </url>

    <url>
        <loc>https://kvantumtechsolutions.com/projects</loc>
        <lastmod>2026-07-15</lastmod>
    </url>

    <url>
        <loc>https://kvantumtechsolutions.com/blog</loc>
        <lastmod>2026-08-01</lastmod>
    </url>

    <url>
        <loc>https://kvantumtechsolutions.com/contact</loc>
        <lastmod>2026-07-15</lastmod>
    </url>

    <url>
        <loc>https://kvantumtechsolutions.com/terms</loc>
        <lastmod>2026-07-15</lastmod>
    </url>

    <url>
        <loc>https://kvantumtechsolutions.com/privacy</loc>
        <lastmod>2026-07-15</lastmod>
    </url>

    <url>
        <loc>https://kvantumtechsolutions.com/blog/why-kvantum-tech-solutions-is-the-best-it-solutions-company-in-delhi-ncr</loc>
        <lastmod>2026-08-01</lastmod>
    </url>

</urlset>`;
    const content = setting && setting.content ? setting.content : defaultXml;
    res.type('application/xml');
    res.send(content);
  } catch (err) {
    res.type('application/xml');
    res.send(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>https://kvantumtechsolutions.com/</loc>\n  </url>\n</urlset>`);
  }
});

// Mount global routers under /api with rate limiting protection
app.use('/api', rateLimiter, globalRouter);

// Catch-all route not found middleware
app.use((req, res, next) => {
  next(new ApiError(404, `Route ${req.baseUrl || req.originalUrl || req.url} not found`));
});

// Mount global error handler
app.use(errorHandler);

export { app };
export default app;
