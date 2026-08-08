import pg from 'pg';
import bcrypt from 'bcryptjs';
import { config } from './env.js';
import { logger } from '../utils/logger.js';

const { Pool } = pg;

// Initialize PostgreSQL Connection Pool using active session pooler URL
export const pool = new Pool({
  connectionString: config.databaseUrl,
  ssl: {
    rejectUnauthorized: false
  }
});

// Helper database query wrapper
export const db = {
  query: (text, params) => pool.query(text, params)
};

export const seedDefaultAdmin = async () => {
  try {
    const adminEmail = 'admin@kvantumtechsolutions.com';
    const result = await db.query('SELECT * FROM users WHERE "email" = $1', [adminEmail]);
    
    if (result.rows.length === 0) {
      logger.info('[SEED] Seeding default admin user record in PostgreSQL...');
      const hashedPassword = await bcrypt.hash('Chikki!@#1998', 10);
      
      await db.query(
        `INSERT INTO users ("_id", "name", "email", "password", "role") VALUES ($1, $2, $3, $4, $5)`,
        ['admin_seeder_id', 'Kvantum Admin', adminEmail, hashedPassword, 'admin']
      );
      logger.info('[SEED] Default admin user record seeded successfully.');
    } else {
      logger.info('[SEED] Default admin user record already exists.');
    }
  } catch (error) {
    logger.error('[SEED ERROR] Failed to seed default admin user:', error);
  }
};

export const seedDefaultSeoSettings = async () => {
  try {
    // 1. Rename legacy prefixed page keys to simplified keys
    const legacyKeys = {
      'page_home': 'home',
      'page_about': 'about',
      'page_services': 'services',
      'page_blog': 'blog',
      'page_contact': 'contact'
    };
    for (const [oldKey, newKey] of Object.entries(legacyKeys)) {
      await db.query(
        `UPDATE seo_settings SET "key" = $1 WHERE "key" = $2 AND NOT EXISTS (SELECT 1 FROM seo_settings WHERE "key" = $1)`,
        [newKey, oldKey]
      );
      await db.query(`DELETE FROM seo_settings WHERE "key" = $1`, [oldKey]);
    }

    const defaultSettings = [
      {
        key: 'robots',
        title: '',
        description: '',
        keywords: '',
        schema: '',
        other: '',
        content: `User-agent: *\nAllow: /\nSitemap: https://kvantumtechsolutions.com/sitemap.xml`
      },
      {
        key: 'sitemap',
        title: '',
        description: '',
        keywords: '',
        schema: '',
        other: '',
        content: `<?xml version="1.0" encoding="UTF-8"?>
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
</urlset>`
      },
      {
        key: 'home',
        title: 'IT Solutions Company in Delhi NCR | Kvantum Tech Solutions',
        description: 'Kvantum Tech Solutions offers reliable IT services, software development, cloud solutions, web development, and digital transformation services across Delhi NCR.',
        keywords: 'it company, software development, cloud solutions, web development, delhi ncr, noida',
        schema: `{"@context": "https://schema.org", "@type": "ITPrivateTeam", "name": "Kvantum Tech Solutions", "url": "https://kvantumtechsolutions.com/"}`,
        other: `<meta property="og:title" content="IT Solutions Company in Delhi NCR | Kvantum Tech Solutions" />\n<meta property="og:description" content="Kvantum Tech Solutions offers reliable IT services, software development, cloud solutions, web development, and digital transformation services across Delhi NCR." />\n<meta property="og:type" content="website" />\n<meta property="og:url" content="https://kvantumtechsolutions.com/" />\n<meta property="og:site_name" content="Kvantum Tech Solutions" />`,
        content: ''
      },
      {
        key: 'about',
        title: 'About Kvantum Tech Solutions | IT & AI Innovation Experts',
        description: 'Learn about Kvantum Tech Solutions, a trusted IT company delivering AI-powered solutions, web development, digital marketing, and enterprise technology services.',
        keywords: 'about kvantum, software development company noida, developer team',
        schema: '',
        other: `<link rel="canonical" href="https://kvantumtechsolutions.com/about" />\n<meta property="og:title" content="About Kvantum Tech Solutions | IT & AI Innovation Experts" />\n<meta property="og:description" content="Discover Kvantum Tech Solutions, delivering innovative AI, web development, digital marketing, and enterprise IT solutions for business growth." />\n<meta property="og:type" content="website" />\n<meta property="og:url" content="https://kvantumtechsolutions.com/about" />\n<meta property="og:site_name" content="Kvantum Tech Solutions" />`,
        content: ''
      },
      {
        key: 'services',
        title: 'IT Services | Web Development, SEO & AI Solutions | Kvantum Tech Solutions',
        description: 'Explore Kvantum Tech Solutions\' expert IT services, including web development, SEO, digital marketing, AI chatbots, app development, UI/UX design, and scalable business solutions.',
        keywords: 'software development, mobile app development, web design services, seo agency',
        schema: '',
        other: `<link rel="canonical" href="https://kvantumtechsolutions.com/services" />\n<meta property="og:title" content="IT Services | Web Development, SEO & AI Solutions | Kvantum Tech Solutions" />\n<meta property="og:description" content="Discover enterprise-grade IT services from Kvantum Tech Solutions, including web development, SEO, AI chatbots, digital marketing, app development, and UI/UX design." />\n<meta property="og:type" content="website" />\n<meta property="og:url" content="https://kvantumtechsolutions.com/services" />\n<meta property="og:site_name" content="Kvantum Tech Solutions" />`,
        content: ''
      },
      {
        key: 'blog',
        title: 'Tech Blog | AI, SEO, Web Development & Digital Marketing | Kvantum Tech Solutions',
        description: 'Explore the Kvantum Tech Solutions blog for expert insights on AI, SEO, web development, digital marketing, software solutions, and the latest technology trends to grow your business.',
        keywords: 'tech blog, web development articles, software engineering insights',
        schema: '',
        other: `<link rel="canonical" href="https://kvantumtechsolutions.com/blog" />\n<meta property="og:title" content="Tech Blog | AI, SEO, Web Development & Digital Marketing | Kvantum Tech Solutions" />\n<meta property="og:description" content="Read the latest articles from Kvantum Tech Solutions covering AI, SEO, web development, digital marketing, software innovation, and business technology ." />\n<meta property="og:type" content="website" />\n<meta property="og:url" content="https://kvantumtechsolutions.com/blog" />\n<meta property="og:site_name" content="Kvantum Tech Solutions" />`,
        content: ''
      },
      {
        key: 'contact',
        title: 'Contact Kvantum Tech Solutions | Let\'s Build Your Digital Future',
        description: 'Get in touch with Kvantum Tech Solutions for web development, AI solutions, SEO, digital marketing, mobile apps, and enterprise IT services. Contact our experts today.',
        keywords: 'contact kvantum, hire developers, start custom software project',
        schema: '',
        other: `<link rel="canonical" href="https://kvantumtechsolutions.com/contact" />\n<meta property="og:title" content="Contact Kvantum Tech Solutions | Let's Build Your Digital Future" />\n<meta property="og:description" content="Contact Kvantum Tech Solutions to discuss your next digital project. Our experts deliver innovative web, AI, SEO, app development, and digital marketing solutions." />\n<meta property="og:type" content="website" />\n<meta property="og:url" content="https://kvantumtechsolutions.com/contact" />\n<meta property="og:site_name" content="Kvantum Tech Solutions" />`,
        content: ''
      }
    ];

    for (const setting of defaultSettings) {
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
        [setting.key, setting.title, setting.description, setting.keywords, setting.schema, setting.other, setting.content]
      );
      logger.info(`[SEED] Upserted default SEO setting: ${setting.key}`);
    }
  } catch (error) {
    logger.error('[SEED ERROR] Failed to seed default SEO settings:', error);
  }
};

export const seedDefaultSiteSettings = async () => {
  try {
    const defaultSiteSettings = [
      {
        key: 'hero',
        value: {
          title: 'IT Solutions Company in Delhi NCR',
          subtitle: 'Kvantum Tech Solutions delivers next-generation web products, custom software, and search optimizations.',
          ctaText: "Let's Talk"
        }
      },
      {
        key: 'about',
        value: {
          description: 'We are a creative digital engineering agency focused on building fast, secure, and responsive web platforms. No page builders, just pure clean code.',
          experience: '8+ Years'
        }
      },
      {
        key: 'stats',
        value: [
          { value: '99%', label: 'Client Satisfaction' },
          { value: '150%', label: 'Projects Completed' },
          { value: '24/7', label: 'Support Available' }
        ]
      },
      {
        key: 'testimonials',
        value: [
          { name: 'Aman Verma', role: 'CEO, FinTech India', content: 'Kvantum redesigned our core operations portal. The speed increase was instantly noticeable, and their postgres integration is solid.', rating: 5 },
          { name: 'Neha Sharma', role: 'Founder, AgriGrow', content: 'Their team delivered our mobile apps within 45 days. High emphasis on code cleanliness and support.', rating: 5 }
        ]
      },
      {
        key: 'contact',
        value: {
          phone: '+91 9811661828, +91 9811663433',
          email: 'info@kvantumtechsolutions.com',
          address: 'A33, 64, Tahirpur Rd, Priyadarshini Vihar, Taharpur Village, Dilshad Garden, Delhi, 110095',
          linkedin: 'https://linkedin.com/company/kvantumtechsolutions',
          twitter: 'https://twitter.com/kvantumtech'
        }
      }
    ];

    for (const setting of defaultSiteSettings) {
      const res = await db.query('SELECT * FROM site_settings WHERE "key" = $1', [setting.key]);
      if (res.rows.length === 0) {
        await db.query(
          `INSERT INTO site_settings ("key", "value") VALUES ($1, $2)`,
          [setting.key, JSON.stringify(setting.value)]
        );
        logger.info(`[SEED] Seeded default site setting: ${setting.key}`);
      }
    }
  } catch (error) {
    logger.error('[SEED ERROR] Failed to seed default site settings:', error);
  }
};

export const seedDefaultPortfolios = async () => {
  try {
    const defaultPortfolios = [
      {
        id: 'finova-pay',
        title: 'Finova Pay Gateway',
        category: 'Fintech',
        desc: 'Designed and built a custom payment gateway handling thousands of secure API calls per minute under sub-second load times.',
        tags: 'Node.js, PostgreSQL, Docker'
      },
      {
        id: 'novastore',
        title: 'NovaStore Headless Shop',
        category: 'E-Commerce',
        desc: 'Created a modern headless e-commerce store with dynamic catalog filtering, resulting in a 35% increase in purchase conversions.',
        tags: 'React, Vite, Stripe API'
      },
      {
        id: 'dexai',
        title: 'DexAI Support Assistant',
        category: 'AI Integration',
        desc: 'Developed a context-aware customer support chatbot that uses retrieval-augmented generation to handle client queries in real-time.',
        tags: 'LLM Agents, RAG, Websockets'
      },
      {
        id: 'apex-logistics',
        title: 'Apex Logistics Platform',
        category: 'Custom Systems',
        desc: 'Built a real-time tracking interface displaying shipment analytics with low-latency updates.',
        tags: 'React, Websockets, Tailwind CSS'
      },
      {
        id: 'secure-gate',
        title: 'Secure Gate Auth',
        category: 'Custom Systems',
        desc: 'Created a tokenized session verification service executing secure validations for enterprise user authentication.',
        tags: 'JWT, Redis, Node.js'
      }
    ];

    for (const port of defaultPortfolios) {
      const res = await db.query('SELECT * FROM portfolios WHERE "_id" = $1', [port.id]);
      if (res.rows.length === 0) {
        await db.query(
          `INSERT INTO portfolios ("_id", "title", "category", "desc", "tags") VALUES ($1, $2, $3, $4, $5)`,
          [port.id, port.title, port.category, port.desc, port.tags]
        );
        logger.info(`[SEED] Seeded default portfolio: ${port.title}`);
      }
    }
  } catch (error) {
    logger.error('[SEED ERROR] Failed to seed default portfolios:', error);
  }
};

export const seedDefaultServices = async () => {
  try {
    await db.query('TRUNCATE TABLE services CASCADE');

    const defaultServices = [
      {
        _id: 'custom-software-development',
        iconName: 'Settings',
        title: 'Custom Software Development',
        shortDesc: 'Build secure, scalable, and fully customized software solutions designed specifically for your business processes.',
        longDesc: 'From custom enterprise resource portals to automated databases, our team designs custom software architectures that integrate with your tools and optimize operations.',
        color: 'var(--accent-cyan)',
        techStack: 'Node.js, Python, PostgreSQL, AWS, REST APIs',
        metrics: '100% tailor-made efficiency',
        metaTitle: 'Custom Software Development Services | Kvantum Tech Solutions',
        metaDesc: 'Upgrade your business operations with tailor-made enterprise software and database solutions.'
      },
      {
        _id: 'crm-software-development',
        iconName: 'Users',
        title: 'CRM Software Development',
        shortDesc: 'Manage leads, customers, sales pipelines, follow-ups, invoices, and team performance from one centralized CRM platform.',
        longDesc: 'Streamline your sales cycle and customer communication. Our custom CRM solutions empower sales teams to capture leads, track customer journeys, generate invoices, and log team productivity.',
        color: 'var(--accent-purple)',
        techStack: 'React, Express.js, MongoDB, Redis',
        metrics: 'Boost team productivity by 40%',
        metaTitle: 'Custom CRM Software Development | Kvantum Tech Solutions',
        metaDesc: 'Manage leads, pipeline tracking, invoicing, and team operations with a custom CRM.'
      },
      {
        _id: 'business-automation',
        iconName: 'Cpu',
        title: 'Business Automation',
        shortDesc: 'Automate repetitive tasks, approvals, notifications, workflows, reporting, and daily operations to improve efficiency.',
        longDesc: 'Stop doing manual work. We integrate multi-department notifications, custom triggers, automated invoice dispatches, lead assignment flows, and business reports into one cohesive automated system.',
        color: 'var(--accent-cyan)',
        techStack: 'Zapier, Make, Custom webhook API engines, Python cron servers',
        metrics: 'Eliminate 95% of manual paper processes',
        metaTitle: 'Business Process & Workflow Automation | Kvantum Tech Solutions',
        metaDesc: 'Eliminate repetitive manual tasks with custom webhook integration and notifications.'
      },
      {
        _id: 'hrms-software',
        iconName: 'Layers',
        title: 'HRMS Software',
        shortDesc: 'Simplify employee attendance, payroll, leave management, recruitment, performance tracking, and HR operations.',
        longDesc: 'Manage employee workflows end-to-end. Our HRMS platforms integrate attendance tracking, biometric logs, salary calculations, automated payslip delivery, and tracking HR operations.',
        color: 'var(--accent-purple)',
        techStack: 'React, Node.js, PostgreSQL, Docker',
        metrics: 'Halve monthly payroll processing overhead',
        metaTitle: 'HRMS Software & Payroll Systems | Kvantum Tech Solutions',
        metaDesc: 'Track employee attendance, leaves, biometric sync, and payroll calculations.'
      },
      {
        _id: 'whatsapp-automation',
        iconName: 'MessageSquare',
        title: 'WhatsApp Automation',
        shortDesc: 'Automate customer support, lead nurturing, reminders, marketing campaigns, and instant communication through WhatsApp.',
        longDesc: 'Integrate the official WhatsApp Business API to run automated support bots, instant campaign notifications, customer follow-up alerts, and pipeline reminders directly inside the world\'s most popular messaging app.',
        color: 'var(--accent-cyan)',
        techStack: 'WhatsApp Business API, Twilio, Node.js, Meta Webhooks',
        metrics: '98% instant message open rate',
        metaTitle: 'WhatsApp Business API & Automation Solutions | Kvantum Tech Solutions',
        metaDesc: 'Send automated campaigns, notifications, alerts, and support bots on WhatsApp.'
      },
      {
        _id: 'web-mobile-app-development',
        iconName: 'Smartphone',
        title: 'Web & Mobile App Development',
        shortDesc: 'Develop high-performance websites and mobile applications that deliver exceptional user experiences across every device.',
        longDesc: 'High-fidelity cross-platform apps and lightning-fast web pages. Optimized for mobile responsiveness, hardware-accelerated layouts, smooth animations, and top-tier user experiences.',
        color: 'var(--accent-purple)',
        techStack: 'React, Next.js, Flutter, React Native, TailwindCSS',
        metrics: '60fps fluid visual animations',
        metaTitle: 'Web & Mobile Application Development | Kvantum Tech Solutions',
        metaDesc: 'Engineered cross-platform mobile apps and Next.js sites optimized for Google PageSpeed.'
      }
    ];

    for (const s of defaultServices) {
      await db.query(
        `INSERT INTO services ("id", "icon_name", "title", "short_desc", "long_desc", "color", "tech_stack", "metrics", "meta_title", "meta_desc")
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
        [s._id, s.iconName, s.title, s.shortDesc, s.longDesc, s.color, s.techStack, s.metrics, s.metaTitle, s.metaDesc]
      );
    }
    logger.info('[SEED] Services table re-seeded successfully.');
  } catch (error) {
    logger.error('[SEED ERROR] Failed to seed services table:', error);
  }
};

export const connectDB = async () => {
  try {
    if (!config.databaseUrl) {
      logger.error('DATABASE_URL is not defined in the environment variables.');
      return;
    }
    
    // Test database connection
    const client = await pool.connect();
    logger.info('PostgreSQL Connected successfully via connection pool.');
    client.release();

    // 1. Create Users Table
    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        "_id" VARCHAR(255) PRIMARY KEY,
        "name" VARCHAR(255) NOT NULL,
        "email" VARCHAR(255) UNIQUE NOT NULL,
        "password" VARCHAR(255) NOT NULL,
        "role" VARCHAR(50) DEFAULT 'sales',
        "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 2. Create Leads Table
    await db.query(`
      CREATE TABLE IF NOT EXISTS leads (
        "_id" VARCHAR(255) PRIMARY KEY,
        "name" VARCHAR(255) NOT NULL,
        "email" VARCHAR(255) NOT NULL,
        "phone" VARCHAR(50) DEFAULT '',
        "service" VARCHAR(255) NOT NULL,
        "message" TEXT NOT NULL,
        "status" VARCHAR(50) DEFAULT 'New',
        "quality" VARCHAR(50) DEFAULT 'Warm',
        "notes" TEXT DEFAULT '',
        "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 3. Create Services Table
    await db.query(`
      CREATE TABLE IF NOT EXISTS services (
        "_id" VARCHAR(255) PRIMARY KEY,
        "slug" VARCHAR(255) DEFAULT '',
        "iconName" VARCHAR(255) DEFAULT 'Code',
        "title" VARCHAR(255) NOT NULL,
        "shortDesc" TEXT NOT NULL,
        "longDesc" TEXT NOT NULL,
        "color" VARCHAR(255) DEFAULT 'var(--accent-cyan)',
        "techStack" TEXT DEFAULT '',
        "metrics" TEXT DEFAULT '',
        "coverImage" TEXT DEFAULT '',
        "imageAlt" VARCHAR(255) DEFAULT '',
        "imageTitle" VARCHAR(255) DEFAULT '',
        "keywords" TEXT DEFAULT '',
        "canonical" TEXT DEFAULT '',
        "metaTitle" VARCHAR(255) DEFAULT '',
        "metaDesc" TEXT DEFAULT '',
        "ogTitle" VARCHAR(255) DEFAULT '',
        "ogDesc" TEXT DEFAULT '',
        "ogImage" TEXT DEFAULT '',
        "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `);
    await db.query(`ALTER TABLE services ADD COLUMN IF NOT EXISTS "slug" VARCHAR(255) DEFAULT '';`);
    await db.query(`ALTER TABLE services ADD COLUMN IF NOT EXISTS "coverImage" TEXT DEFAULT '';`);
    await db.query(`ALTER TABLE services ADD COLUMN IF NOT EXISTS "imageAlt" VARCHAR(255) DEFAULT '';`);
    await db.query(`ALTER TABLE services ADD COLUMN IF NOT EXISTS "imageTitle" VARCHAR(255) DEFAULT '';`);
    await db.query(`ALTER TABLE services ADD COLUMN IF NOT EXISTS "keywords" TEXT DEFAULT '';`);
    await db.query(`ALTER TABLE services ADD COLUMN IF NOT EXISTS "canonical" TEXT DEFAULT '';`);
    await db.query(`ALTER TABLE services ADD COLUMN IF NOT EXISTS "ogTitle" VARCHAR(255) DEFAULT '';`);
    await db.query(`ALTER TABLE services ADD COLUMN IF NOT EXISTS "ogDesc" TEXT DEFAULT '';`);
    await db.query(`ALTER TABLE services ADD COLUMN IF NOT EXISTS "ogImage" TEXT DEFAULT '';`);
    await db.query(`ALTER TABLE services ADD COLUMN IF NOT EXISTS "showInHome" INTEGER DEFAULT 1;`);
    await db.query(`ALTER TABLE services ADD COLUMN IF NOT EXISTS "sortOrder" INTEGER DEFAULT 0;`);

    // 4. Create Blogs Table
    await db.query(`
      CREATE TABLE IF NOT EXISTS blogs (
        "_id" VARCHAR(255) PRIMARY KEY,
        "title" VARCHAR(255) NOT NULL,
        "category" VARCHAR(255) DEFAULT 'Web & App Dev',
        "date" VARCHAR(255) DEFAULT '',
        "readTime" VARCHAR(50) DEFAULT '5 min read',
        "author" VARCHAR(255) DEFAULT 'Kvantum Tech Team',
        "image" TEXT DEFAULT '',
        "summary" TEXT NOT NULL,
        "content" TEXT NOT NULL,
        "keywords" TEXT DEFAULT '',
        "canonical" TEXT DEFAULT '',
        "metaTitle" VARCHAR(255) DEFAULT '',
        "metaDesc" TEXT DEFAULT '',
        "ogTitle" VARCHAR(255) DEFAULT '',
        "ogDesc" TEXT DEFAULT '',
        "ogImage" TEXT DEFAULT '',
        "ogType" VARCHAR(50) DEFAULT 'article',
        "twitterTitle" VARCHAR(255) DEFAULT '',
        "twitterDesc" TEXT DEFAULT '',
        "twitterCard" VARCHAR(50) DEFAULT 'summary_large_image',
        "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Ensure columns exist on existing table
    await db.query(`ALTER TABLE blogs ADD COLUMN IF NOT EXISTS "author" VARCHAR(255) DEFAULT 'Kvantum Tech Team'`);
    await db.query(`ALTER TABLE blogs ADD COLUMN IF NOT EXISTS "image" TEXT DEFAULT ''`);
    await db.query(`ALTER TABLE blogs ADD COLUMN IF NOT EXISTS "keywords" TEXT DEFAULT ''`);
    await db.query(`ALTER TABLE blogs ADD COLUMN IF NOT EXISTS "canonical" TEXT DEFAULT ''`);
    await db.query(`ALTER TABLE blogs ADD COLUMN IF NOT EXISTS "ogTitle" VARCHAR(255) DEFAULT ''`);
    await db.query(`ALTER TABLE blogs ADD COLUMN IF NOT EXISTS "ogDesc" TEXT DEFAULT ''`);
    await db.query(`ALTER TABLE blogs ADD COLUMN IF NOT EXISTS "ogImage" TEXT DEFAULT ''`);
    await db.query(`ALTER TABLE blogs ADD COLUMN IF NOT EXISTS "ogType" VARCHAR(50) DEFAULT 'article'`);
    await db.query(`ALTER TABLE blogs ADD COLUMN IF NOT EXISTS "twitterTitle" VARCHAR(255) DEFAULT ''`);
    await db.query(`ALTER TABLE blogs ADD COLUMN IF NOT EXISTS "twitterDesc" TEXT DEFAULT ''`);
    await db.query(`ALTER TABLE blogs ADD COLUMN IF NOT EXISTS "twitterCard" VARCHAR(50) DEFAULT 'summary_large_image'`);
    await db.query(`ALTER TABLE blogs ADD COLUMN IF NOT EXISTS "faqs" JSONB DEFAULT '[]'::jsonb`);
    await db.query(`ALTER TABLE blogs ADD COLUMN IF NOT EXISTS "imageAlt" TEXT DEFAULT ''`);
    await db.query(`ALTER TABLE blogs ADD COLUMN IF NOT EXISTS "imageTitle" TEXT DEFAULT ''`);
    await db.query(`ALTER TABLE blogs ADD COLUMN IF NOT EXISTS "schemaMarkup" TEXT DEFAULT ''`);
    await db.query(`ALTER TABLE blogs ADD COLUMN IF NOT EXISTS "otherSeoTags" TEXT DEFAULT ''`);

    // 5. Create SEO Pages Table
    await db.query(`
      CREATE TABLE IF NOT EXISTS seo_pages (
        "_id" VARCHAR(255) PRIMARY KEY,
        "title" VARCHAR(255) NOT NULL,
        "content" TEXT NOT NULL,
        "metaTitle" VARCHAR(255) NOT NULL,
        "metaDesc" TEXT NOT NULL,
        "metaKeywords" TEXT DEFAULT '',
        "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 6. Create SEO Settings Table
    await db.query(`
      CREATE TABLE IF NOT EXISTS seo_settings (
        "key" VARCHAR(255) PRIMARY KEY,
        "title" VARCHAR(255) DEFAULT '',
        "description" TEXT DEFAULT '',
        "keywords" TEXT DEFAULT '',
        "schema" TEXT DEFAULT '',
        "other" TEXT DEFAULT '',
        "content" TEXT DEFAULT '',
        "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 7. Create Site Settings Table
    await db.query(`
      CREATE TABLE IF NOT EXISTS site_settings (
        "key" VARCHAR(255) PRIMARY KEY,
        "value" JSONB NOT NULL,
        "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 8. Create Portfolios Table
    await db.query(`
      CREATE TABLE IF NOT EXISTS portfolios (
        "_id" VARCHAR(255) PRIMARY KEY,
        "title" VARCHAR(255) NOT NULL,
        "category" VARCHAR(255) NOT NULL,
        "desc" TEXT NOT NULL,
        "tags" TEXT DEFAULT '',
        "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Seed default records
    await seedDefaultAdmin();
    await seedDefaultSeoSettings();
    await seedDefaultSiteSettings();
    await seedDefaultPortfolios();
    await seedDefaultServices();

  } catch (error) {
    logger.error(`PostgreSQL Connection/Bootstrap Error: ${error.message}`);
  }
};
