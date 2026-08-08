import { db } from '../../config/db.js';

let localSettings = {
  hero: {
    title: 'IT Solutions Company in Delhi NCR',
    subtitle: 'Kvantum Tech Solutions delivers next-generation web products, custom software, and search optimizations.',
    ctaText: "Let's Talk"
  },
  about: {
    description: 'We are a creative digital engineering agency focused on building fast, secure, and responsive web platforms. No page builders, just pure clean code.',
    experience: '8+ Years'
  },
  stats: [
    { value: '99%', label: 'Client Satisfaction' },
    { value: '150%', label: 'Projects Completed' },
    { value: '24/7', label: 'Support Available' }
  ],
  testimonials: [
    { name: 'Aman Verma', role: 'CEO, FinTech India', content: 'Kvantum redesigned our core operations portal. The speed increase was instantly noticeable, and their postgres integration is solid.', rating: 5 },
    { name: 'Neha Sharma', role: 'Founder, AgriGrow', content: 'Their team delivered our mobile apps within 45 days. High emphasis on code cleanliness and support.', rating: 5 }
  ],
  contact: {
    phone: '+91 9811661828, +91 9811663433',
    email: 'info@kvantumtechsolutions.com',
    address: 'A33, 64, Tahirpur Rd, Priyadarshini Vihar, Taharpur Village, Dilshad Garden, Delhi, 110095',
    linkedin: 'https://linkedin.com/company/kvantumtechsolutions',
    twitter: 'https://twitter.com/kvantumtech'
  },
  custom_scripts: []
};

let localSeoSettings = {
  home: { title: 'IT Solutions Company in Delhi NCR | Kvantum Tech Solutions', description: 'Kvantum Tech Solutions offers reliable IT services, software development, cloud solutions, web development, and digital transformation services across Delhi NCR.', keywords: 'it solutions, web dev, app development', schema: '', other: '', content: '' },
  about: { title: 'About Kvantum Tech Solutions | IT & AI Innovation Experts', description: 'Learn about Kvantum Tech Solutions, a trusted IT company delivering AI-powered solutions, web development, digital marketing, and enterprise technology services.', keywords: 'noida agency, about kvantum', schema: '', other: '', content: '' },
  services: { title: 'IT Services | Web Development, SEO & AI Solutions | Kvantum Tech Solutions', description: 'Explore Kvantum Tech Solutions\' expert IT services, including web development, SEO, digital marketing, AI chatbots, app development, UI/UX design, and scalable business solutions.', keywords: 'react, app development, brand design', schema: '', other: '', content: '' },
  projects: { title: 'Featured Projects | Studio Kvantum', description: 'Explore web products, apps, and custom platforms built for our clients.', keywords: 'case studies, portfolio', schema: '', other: '', content: '' },
  blog: { title: 'Tech Blog | AI, SEO, Web Development & Digital Marketing | Kvantum Tech Solutions', description: 'Explore the Kvantum Tech Solutions blog for expert insights on AI, SEO, web development, digital marketing, software solutions, and the latest technology trends to grow your business.', keywords: 'tech blog, seo, digital marketing', schema: '', other: '', content: '' },
  contact: { title: 'Contact Kvantum Tech Solutions | Let\'s Build Your Digital Future', description: 'Get in touch with Kvantum Tech Solutions for web development, AI solutions, SEO, digital marketing, mobile apps, and enterprise IT services. Contact our experts today.', keywords: 'contact details, phone', schema: '', other: '', content: '' },
  robots: { title: '', description: '', keywords: '', schema: '', other: '', content: 'User-agent: *\nAllow: /\nSitemap: https://kvantumtechsolutions.com/sitemap.xml' },
  sitemap: { title: '', description: '', keywords: '', schema: '', other: '', content: '' }
};

export const getSettings = async () => {
  try {
    const result = await db.query('SELECT * FROM site_settings');
    const settingsMap = {};
    result.rows.forEach(row => {
      settingsMap[row.key] = typeof row.value === 'string' ? JSON.parse(row.value) : row.value;
    });
    if (Object.keys(settingsMap).length > 0) {
      localSettings = { ...localSettings, ...settingsMap };
    }
    return localSettings;
  } catch (err) {
    console.warn('[OFFLINE FALLBACK] Site settings SQL fetch failed. Returning local cache.');
    return localSettings;
  }
};

export const updateSettingByKey = async (key, value) => {
  try {
    const valString = typeof value === 'object' ? JSON.stringify(value) : value;
    await db.query(
      `INSERT INTO site_settings ("key", "value") 
       VALUES ($1, $2) 
       ON CONFLICT ("key") 
       DO UPDATE SET "value" = EXCLUDED."value", "updated_at" = CURRENT_TIMESTAMP`,
      [key, valString]
    );
    localSettings[key] = value;
    return value;
  } catch (err) {
    console.warn('[OFFLINE FALLBACK] Site settings SQL update failed. Updating local cache.', err.message);
    localSettings[key] = value;
    return value;
  }
};

export const getSeoSettings = async () => {
  try {
    const result = await db.query('SELECT * FROM seo_settings');
    const seoMap = {};
    result.rows.forEach(row => {
      seoMap[row.key] = {
        title: row.title || '',
        description: row.description || '',
        keywords: row.keywords || '',
        schema: row.schema || '',
        other: row.other || '',
        content: row.content || ''
      };
    });
    if (Object.keys(seoMap).length > 0) {
      localSeoSettings = { ...localSeoSettings, ...seoMap };
    }
    return localSeoSettings;
  } catch (err) {
    console.warn('[OFFLINE FALLBACK] SEO settings SQL fetch failed. Returning local cache.');
    return localSeoSettings;
  }
};

export const updateSeoSettingByKey = async (key, data) => {
  const { title, description, keywords, schema, other, content } = data;
  try {
    await db.query(
      `INSERT INTO seo_settings ("key", "title", "description", "keywords", "schema", "other", "content") 
       VALUES ($1, $2, $3, $4, $5, $6, $7) 
       ON CONFLICT ("key") 
       DO UPDATE SET 
         "title" = COALESCE(EXCLUDED."title", seo_settings."title"),
         "description" = COALESCE(EXCLUDED."description", seo_settings."description"),
         "keywords" = COALESCE(EXCLUDED."keywords", seo_settings."keywords"),
         "schema" = COALESCE(EXCLUDED."schema", seo_settings."schema"),
         "other" = COALESCE(EXCLUDED."other", seo_settings."other"),
         "content" = COALESCE(EXCLUDED."content", seo_settings."content"),
         "updated_at" = CURRENT_TIMESTAMP`,
      [key, title || '', description || '', keywords || '', schema || '', other || '', content || '']
    );
    localSeoSettings[key] = { title, description, keywords, schema, other, content };
    return localSeoSettings[key];
  } catch (err) {
    console.warn('[OFFLINE FALLBACK] SEO settings SQL update failed. Updating local cache.', err.message);
    localSeoSettings[key] = { title, description, keywords, schema, other, content };
    return localSeoSettings[key];
  }
};
