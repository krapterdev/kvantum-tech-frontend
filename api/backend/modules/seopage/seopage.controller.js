import { asyncHandler } from '../../utils/asyncHandler.js';
import * as seoPageService from './seopage.service.js';
import { ApiError } from '../../utils/ApiError.js';
import { db } from '../../config/db.js';

export const handleGetSeoPages = asyncHandler(async (req, res) => {
  const pages = await seoPageService.fetchSeoPages();
  res.status(200).json(pages);
});

export const handleCreateSeoPage = asyncHandler(async (req, res) => {
  const newPage = await seoPageService.addSeoPage(req.body);
  res.status(201).json(newPage);
});

export const handleCreateBulkSeoPages = asyncHandler(async (req, res) => {
  const pages = await seoPageService.addBulkSeoPages(req.body.pages);
  res.status(200).json({ success: true, count: pages.length, pages });
});

export const handleUpdateSeoPage = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const updatedPage = await seoPageService.editSeoPage(slug, req.body);
  res.status(200).json(updatedPage);
});

export const handleDeleteSeoPage = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  await seoPageService.removeSeoPage(slug);
  res.status(200).json({ success: true });
});

const defaultSeoSettings = [
  { key: 'home', title: 'IT Solutions Company in Delhi NCR | Kvantum Tech Solutions', description: 'Kvantum Tech Solutions offers reliable IT services, software development, cloud solutions, web development, and digital transformation services across Delhi NCR.', keywords: 'it solutions, web dev, app development', schema: '{"@context": "https://schema.org", "@type": "ITPrivateTeam", "name": "Kvantum Tech Solutions", "url": "https://kvantumtechsolutions.com/"}', other: '<meta property="og:title" content="IT Solutions Company in Delhi NCR | Kvantum Tech Solutions" />\n<meta property="og:description" content="Kvantum Tech Solutions offers reliable IT services, software development, cloud solutions, web development, and digital transformation services across Delhi NCR." />\n<meta property="og:type" content="website" />\n<meta property="og:url" content="https://kvantumtechsolutions.com/" />\n<meta property="og:site_name" content="Kvantum Tech Solutions" />', content: '' },
  { key: 'about', title: 'About Kvantum Tech Solutions | IT & AI Innovation Experts', description: 'Learn about Kvantum Tech Solutions, a trusted IT company delivering AI-powered solutions, web development, digital marketing, and enterprise technology services.', keywords: 'about kvantum, software development company noida, developer team', schema: '', other: '<link rel="canonical" href="https://kvantumtechsolutions.com/about" />\n<meta property="og:title" content="About Kvantum Tech Solutions | IT & AI Innovation Experts" />\n<meta property="og:description" content="Discover Kvantum Tech Solutions, delivering innovative AI, web development, digital marketing, and enterprise IT solutions for business growth." />\n<meta property="og:type" content="website" />\n<meta property="og:url" content="https://kvantumtechsolutions.com/about" />\n<meta property="og:site_name" content="Kvantum Tech Solutions" />', content: '' },
  { key: 'services', title: 'IT Services | Web Development, SEO & AI Solutions | Kvantum Tech Solutions', description: 'Explore Kvantum Tech Solutions\' expert IT services, including web development, SEO, digital marketing, AI chatbots, app development, UI/UX design, and scalable business solutions.', keywords: 'software development, mobile app development, web design services, seo agency', schema: '', other: '<link rel="canonical" href="https://kvantumtechsolutions.com/services" />\n<meta property="og:title" content="IT Services | Web Development, SEO & AI Solutions | Kvantum Tech Solutions" />\n<meta property="og:description" content="Discover enterprise-grade IT services from Kvantum Tech Solutions, including web development, SEO, AI chatbots, digital marketing, app development, and UI/UX design." />\n<meta property="og:type" content="website" />\n<meta property="og:url" content="https://kvantumtechsolutions.com/services" />\n<meta property="og:site_name" content="Kvantum Tech Solutions" />', content: '' },
  { key: 'projects', title: 'Featured Projects | Studio Kvantum', description: 'Explore web products, apps, and custom platforms built for our clients.', keywords: 'case studies, portfolio', schema: '', other: '', content: '' },
  { key: 'blog', title: 'Tech Blog | AI, SEO, Web Development & Digital Marketing | Kvantum Tech Solutions', description: 'Explore the Kvantum Tech Solutions blog for expert insights on AI, SEO, web development, digital marketing, software solutions, and the latest technology trends to grow your business.', keywords: 'tech blog, web development articles, software engineering insights', schema: '', other: '<link rel="canonical" href="https://kvantumtechsolutions.com/blog" />\n<meta property="og:title" content="Tech Blog | AI, SEO, Web Development & Digital Marketing | Kvantum Tech Solutions" />\n<meta property="og:description" content="Read the latest articles from Kvantum Tech Solutions covering AI, SEO, web development, digital marketing, software innovation, and business technology ." />\n<meta property="og:type" content="website" />\n<meta property="og:url" content="https://kvantumtechsolutions.com/blog" />\n<meta property="og:site_name" content="Kvantum Tech Solutions" />', content: '' },
  { key: 'contact', title: 'Contact Kvantum Tech Solutions | Let\'s Build Your Digital Future', description: 'Get in touch with Kvantum Tech Solutions for web development, AI solutions, SEO, digital marketing, mobile apps, and enterprise IT services. Contact our experts today.', keywords: 'contact kvantum, hire developers, start custom software project', schema: '', other: '<link rel="canonical" href="https://kvantumtechsolutions.com/contact" />\n<meta property="og:title" content="Contact Kvantum Tech Solutions | Let\'s Build Your Digital Future" />\n<meta property="og:description" content="Contact Kvantum Tech Solutions to discuss your next digital project. Our experts deliver innovative web, AI, SEO, app development, and digital marketing solutions." />\n<meta property="og:type" content="website" />\n<meta property="og:url" content="https://kvantumtechsolutions.com/contact" />\n<meta property="og:site_name" content="Kvantum Tech Solutions" />', content: '' },
  { key: 'robots', title: '', description: '', keywords: '', schema: '', other: '', content: 'User-agent: *\nAllow: /\nSitemap: https://kvantumtechsolutions.com/sitemap.xml' },
  { key: 'sitemap', title: '', description: '', keywords: '', schema: '', other: '', content: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://kvantumtechsolutions.com/</loc>
    <lastmod>2026-07-22</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://kvantumtechsolutions.com/about</loc>
    <lastmod>2026-07-22</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://kvantumtechsolutions.com/services</loc>
    <lastmod>2026-07-22</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://kvantumtechsolutions.com/services/web-development</loc>
    <lastmod>2026-07-22</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://kvantumtechsolutions.com/services/mobile-apps</loc>
    <lastmod>2026-07-22</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://kvantumtechsolutions.com/services/ui-ux</loc>
    <lastmod>2026-07-22</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://kvantumtechsolutions.com/projects</loc>
    <lastmod>2026-07-22</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://kvantumtechsolutions.com/blog</loc>
    <lastmod>2026-07-22</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://kvantumtechsolutions.com/contact</loc>
    <lastmod>2026-07-22</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>` }
];

// GET /api/seopages/settings
export const handleGetSeoSettings = asyncHandler(async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM seo_settings');
    if (result.rows.length === 0) {
      return res.status(200).json(defaultSeoSettings);
    }
    const list = result.rows.map(row => ({
      key: row.key,
      title: row.title || '',
      description: row.description || '',
      keywords: row.keywords || '',
      schema: row.schema || '',
      other: row.other || '',
      content: row.content || ''
    }));
    res.status(200).json(list);
  } catch (err) {
    console.warn('[OFFLINE FALLBACK] SEO settings fetch failed. Returning default values:', err.message);
    res.status(200).json(defaultSeoSettings);
  }
});

// GET /api/seopages/settings/:key
export const handleGetSeoSettingByKey = asyncHandler(async (req, res) => {
  const { key } = req.params;
  try {
    const result = await db.query('SELECT * FROM seo_settings WHERE "key" = $1', [key]);
    if (result.rows.length === 0) {
      const fallback = defaultSeoSettings.find(s => s.key === key) || { key, title: '', description: '', keywords: '', schema: '', other: '', content: '' };
      return res.status(200).json(fallback);
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    const fallback = defaultSeoSettings.find(s => s.key === key) || { key, title: '', description: '', keywords: '', schema: '', other: '', content: '' };
    res.status(200).json(fallback);
  }
});

// PUT /api/seopages/settings/:key
export const handleUpdateSeoSetting = asyncHandler(async (req, res) => {
  const { key } = req.params;
  const { content, title, description, keywords, schema, other } = req.body;
  
  try {
    await db.query(
      `INSERT INTO seo_settings ("key", "title", "description", "keywords", "schema", "other", "content")
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       ON CONFLICT ("key") DO UPDATE
       SET "title" = EXCLUDED."title",
           "description" = EXCLUDED."description",
           "keywords" = EXCLUDED."keywords",
           "schema" = EXCLUDED."schema",
           "other" = EXCLUDED."other",
           "content" = EXCLUDED."content",
           "updated_at" = CURRENT_TIMESTAMP`,
      [key, title || '', description || '', keywords || '', schema || '', other || '', content || '']
    );
    res.status(200).json({ key, content, title, description, keywords, schema, other });
  } catch (err) {
    console.warn('[OFFLINE FALLBACK] SEO setting update failed:', err.message);
    res.status(200).json({ key, content, title, description, keywords, schema, other });
  }
});
