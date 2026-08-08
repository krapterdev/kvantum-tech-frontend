import { db } from '../../config/db.js';

const mapService = (row) => {
  if (!row) return null;
  return {
    id: row._id,
    _id: row._id,
    slug: row.slug || row._id,
    iconName: row.iconName,
    title: row.title,
    shortDesc: row.shortDesc,
    longDesc: row.longDesc,
    color: row.color,
    techStack: row.techStack || '',
    metrics: row.metrics || '',
    coverImage: row.coverImage || '',
    imageAlt: row.imageAlt || '',
    imageTitle: row.imageTitle || '',
    keywords: row.keywords || '',
    canonical: row.canonical || '',
    metaTitle: row.metaTitle || '',
    metaDesc: row.metaDesc || '',
    ogTitle: row.ogTitle || '',
    ogDesc: row.ogDesc || '',
    ogImage: row.ogImage || '',
    showInHome: row.showInHome === undefined || row.showInHome === null ? true : (row.showInHome === 1 || row.showInHome === true || row.showInHome === '1' || row.showInHome === 'true'),
    sortOrder: row.sortOrder !== undefined && row.sortOrder !== null ? parseInt(row.sortOrder, 10) : 0,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
};

let localServices = [
  {
    id: 'custom-software-development',
    _id: 'custom-software-development',
    iconName: 'Settings',
    title: 'Custom Software Development',
    shortDesc: 'Build secure, scalable, and fully customized software solutions designed specifically for your business processes.',
    longDesc: 'From custom enterprise resource portals to automated databases, our team designs custom software architectures that integrate with your tools and optimize operations.',
    color: 'var(--accent-cyan)',
    techStack: 'Node.js, Python, PostgreSQL, AWS, REST APIs',
    metrics: '100% tailor-made efficiency',
    metaTitle: 'Custom Software Development Services | Kvantum Tech Solutions',
    metaDesc: 'Upgrade your business operations with tailor-made enterprise software and database solutions.',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'crm-software-development',
    _id: 'crm-software-development',
    iconName: 'Users',
    title: 'CRM Software Development',
    shortDesc: 'Manage leads, customers, sales pipelines, follow-ups, invoices, and team performance from one centralized CRM platform.',
    longDesc: 'Streamline your sales cycle and customer communication. Our custom CRM solutions empower sales teams to capture leads, track customer journeys, generate invoices, and log team productivity.',
    color: 'var(--accent-purple)',
    techStack: 'React, Express.js, MongoDB, Redis',
    metrics: 'Boost team productivity by 40%',
    metaTitle: 'Custom CRM Software Development | Kvantum Tech Solutions',
    metaDesc: 'Manage leads, pipeline tracking, invoicing, and team operations with a custom CRM.',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'business-automation',
    _id: 'business-automation',
    iconName: 'Cpu',
    title: 'Business Automation',
    shortDesc: 'Automate repetitive tasks, approvals, notifications, workflows, reporting, and daily operations to improve efficiency.',
    longDesc: 'Stop doing manual work. We integrate multi-department notifications, custom triggers, automated invoice dispatches, lead assignment flows, and business reports into one cohesive automated system.',
    color: 'var(--accent-cyan)',
    techStack: 'Zapier, Make, Custom webhook API engines, Python cron servers',
    metrics: 'Eliminate 95% of manual paper processes',
    metaTitle: 'Business Process & Workflow Automation | Kvantum Tech Solutions',
    metaDesc: 'Eliminate repetitive manual tasks with custom webhook integration and notifications.',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'hrms-software',
    _id: 'hrms-software',
    iconName: 'Layers',
    title: 'HRMS Software',
    shortDesc: 'Simplify employee attendance, payroll, leave management, recruitment, performance tracking, and HR operations.',
    longDesc: 'Manage employee workflows end-to-end. Our HRMS platforms integrate attendance tracking, biometric logs, salary calculations, automated payslip delivery, and tracking HR operations.',
    color: 'var(--accent-purple)',
    techStack: 'React, Node.js, PostgreSQL, Docker',
    metrics: 'Halve monthly payroll processing overhead',
    metaTitle: 'HRMS Software & Payroll Systems | Kvantum Tech Solutions',
    metaDesc: 'Track employee attendance, leaves, biometric sync, and payroll calculations.',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'whatsapp-automation',
    _id: 'whatsapp-automation',
    iconName: 'MessageSquare',
    title: 'WhatsApp Automation',
    shortDesc: 'Automate customer support, lead nurturing, reminders, marketing campaigns, and instant communication through WhatsApp.',
    longDesc: 'Integrate the official WhatsApp Business API to run automated support bots, instant campaign notifications, customer follow-up alerts, and pipeline reminders directly inside the world\'s most popular messaging app.',
    color: 'var(--accent-cyan)',
    techStack: 'WhatsApp Business API, Twilio, Node.js, Meta Webhooks',
    metrics: '98% instant message open rate',
    metaTitle: 'WhatsApp Business API & Automation Solutions | Kvantum Tech Solutions',
    metaDesc: 'Send automated campaigns, notifications, alerts, and support bots on WhatsApp.',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'web-mobile-app-development',
    _id: 'web-mobile-app-development',
    iconName: 'Smartphone',
    title: 'Web & Mobile App Development',
    shortDesc: 'Develop high-performance websites and mobile applications that deliver exceptional user experiences across every device.',
    longDesc: 'High-fidelity cross-platform apps and lightning-fast web pages. Optimized for mobile responsiveness, hardware-accelerated layouts, smooth animations, and top-tier user experiences.',
    color: 'var(--accent-purple)',
    techStack: 'React, Next.js, Flutter, React Native, TailwindCSS',
    metrics: '60fps fluid visual animations',
    metaTitle: 'Web & Mobile Application Development | Kvantum Tech Solutions',
    metaDesc: 'Engineered cross-platform mobile apps and Next.js sites optimized for Google PageSpeed.',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export const createService = async (serviceData) => {
  const { id, _id, slug, iconName, title, shortDesc, longDesc, color, techStack, metrics, coverImage, imageAlt, imageTitle, keywords, canonical, metaTitle, metaDesc, ogTitle, ogDesc, ogImage, showInHome } = serviceData;
  const targetId = _id || id || slug || 'service_' + Math.random().toString(36).substr(2, 9);
  const targetSlug = slug || targetId;
  const showInHomeVal = showInHome === false || showInHome === 0 || showInHome === '0' || showInHome === 'false' ? 0 : 1;

  const mapped = {
    id: targetId,
    _id: targetId,
    slug: targetSlug,
    iconName: iconName || 'Code',
    title,
    shortDesc,
    longDesc,
    color: color || 'var(--accent-cyan)',
    techStack: techStack || '',
    metrics: metrics || '',
    coverImage: coverImage || '',
    imageAlt: imageAlt || '',
    imageTitle: imageTitle || '',
    keywords: keywords || '',
    canonical: canonical || '',
    metaTitle: metaTitle || '',
    metaDesc: metaDesc || '',
    ogTitle: ogTitle || '',
    ogDesc: ogDesc || '',
    ogImage: ogImage || '',
    showInHome: showInHomeVal === 1,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  try {
    const result = await db.query(
      `INSERT INTO services ("_id", "slug", "iconName", "title", "shortDesc", "longDesc", "color", "techStack", "metrics", "coverImage", "imageAlt", "imageTitle", "keywords", "canonical", "metaTitle", "metaDesc", "ogTitle", "ogDesc", "ogImage", "showInHome")
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20) RETURNING *`,
      [
        targetId, 
        targetSlug,
        iconName || 'Code', 
        title, 
        shortDesc, 
        longDesc, 
        color || 'var(--accent-cyan)', 
        techStack || '', 
        metrics || '', 
        coverImage || '',
        imageAlt || '',
        imageTitle || '',
        keywords || '',
        canonical || '',
        metaTitle || '', 
        metaDesc || '',
        ogTitle || '',
        ogDesc || '',
        ogImage || '',
        showInHomeVal
      ]
    );
    const service = mapService(result.rows[0]);
    localServices.push(service);
    return service;
  } catch (err) {
    console.warn('[OFFLINE FALLBACK] Service creation failed. Storing in local memory:', err.message);
    localServices.push(mapped);
    return mapped;
  }
};

export const getAllServices = async () => {
  try {
    const result = await db.query('SELECT * FROM services ORDER BY "sortOrder" ASC, "created_at" ASC');
    const dbServices = result.rows.map(mapService);
    if (dbServices.length > 0) {
      localServices = dbServices;
    }
    return localServices;
  } catch (err) {
    console.warn('[OFFLINE FALLBACK] Service list fetch failed. Returning local in-memory array.');
    return localServices;
  }
};

export const reorderServices = async (orderedIds = []) => {
  if (!Array.isArray(orderedIds)) return localServices;
  for (let i = 0; i < orderedIds.length; i++) {
    const targetId = orderedIds[i];
    try {
      await db.query('UPDATE services SET "sortOrder" = $1 WHERE "_id" = $2 OR "slug" = $2', [i, targetId]);
    } catch (e) {}
    localServices = localServices.map(s => (s._id === targetId || s.id === targetId || s.slug === targetId) ? { ...s, sortOrder: i } : s);
  }
  localServices.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
  return localServices;
};

export const updateServiceById = async (id, serviceData) => {
  const { id: newId, slug, iconName, title, shortDesc, longDesc, color, techStack, metrics, coverImage, imageAlt, imageTitle, keywords, canonical, metaTitle, metaDesc, ogTitle, ogDesc, ogImage, showInHome, sortOrder } = serviceData;
  const targetId = newId || id;
  const targetSlug = slug || targetId;
  const showInHomeVal = showInHome === false || showInHome === 0 || showInHome === '0' || showInHome === 'false' ? 0 : 1;
  
  try {
    const result = await db.query(
      `UPDATE services 
       SET "_id" = COALESCE($1, "_id"),
           "slug" = COALESCE($2, "slug"),
           "iconName" = COALESCE($3, "iconName"),
           "title" = COALESCE($4, "title"),
           "shortDesc" = COALESCE($5, "shortDesc"),
           "longDesc" = COALESCE($6, "longDesc"),
           "color" = COALESCE($7, "color"),
           "techStack" = COALESCE($8, "techStack"),
           "metrics" = COALESCE($9, "metrics"),
           "coverImage" = COALESCE($10, "coverImage"),
           "imageAlt" = COALESCE($11, "imageAlt"),
           "imageTitle" = COALESCE($12, "imageTitle"),
           "keywords" = COALESCE($13, "keywords"),
           "canonical" = COALESCE($14, "canonical"),
           "metaTitle" = COALESCE($15, "metaTitle"),
           "metaDesc" = COALESCE($16, "metaDesc"),
           "ogTitle" = COALESCE($17, "ogTitle"),
           "ogDesc" = COALESCE($18, "ogDesc"),
           "ogImage" = COALESCE($19, "ogImage"),
           "showInHome" = $20,
           "sortOrder" = COALESCE($21, "sortOrder"),
           "updated_at" = CURRENT_TIMESTAMP
       WHERE "_id" = $22 OR "slug" = $22 RETURNING *`,
      [targetId, targetSlug, iconName, title, shortDesc, longDesc, color, techStack, metrics, coverImage, imageAlt, imageTitle, keywords, canonical, metaTitle, metaDesc, ogTitle, ogDesc, ogImage, showInHomeVal, sortOrder !== undefined ? parseInt(sortOrder, 10) : null, id]
    );
    const service = mapService(result.rows[0]);
    if (service) {
      localServices = localServices.map(s => s._id === id ? service : s);
      return service;
    }
  } catch (err) {
    console.warn('[OFFLINE FALLBACK] Service update failed. Updating in local memory:', err.message);
  }

  // Local fallback updates
  localServices = localServices.map(s => {
    if (s._id === id) {
      return {
        ...s,
        _id: targetId,
        id: targetId,
        slug: targetSlug,
        iconName: iconName !== undefined ? iconName : s.iconName,
        title: title !== undefined ? title : s.title,
        shortDesc: shortDesc !== undefined ? shortDesc : s.shortDesc,
        longDesc: longDesc !== undefined ? longDesc : s.longDesc,
        color: color !== undefined ? color : s.color,
        techStack: techStack !== undefined ? techStack : s.techStack,
        metrics: metrics !== undefined ? metrics : s.metrics,
        coverImage: coverImage !== undefined ? coverImage : s.coverImage,
        imageAlt: imageAlt !== undefined ? imageAlt : s.imageAlt,
        imageTitle: imageTitle !== undefined ? imageTitle : s.imageTitle,
        keywords: keywords !== undefined ? keywords : s.keywords,
        canonical: canonical !== undefined ? canonical : s.canonical,
        metaTitle: metaTitle !== undefined ? metaTitle : s.metaTitle,
        metaDesc: metaDesc !== undefined ? metaDesc : s.metaDesc,
        ogTitle: ogTitle !== undefined ? ogTitle : s.ogTitle,
        ogDesc: ogDesc !== undefined ? ogDesc : s.ogDesc,
        ogImage: ogImage !== undefined ? ogImage : s.ogImage,
        updatedAt: new Date()
      };
    }
    return s;
  });
  return localServices.find(s => s._id === targetId);
};

export const deleteServiceById = async (id) => {
  try {
    const result = await db.query('DELETE FROM services WHERE "_id" = $1 RETURNING *', [id]);
    const service = mapService(result.rows[0]);
    if (service) {
      localServices = localServices.filter(s => s._id !== id);
      return service;
    }
  } catch (err) {
    console.warn('[OFFLINE FALLBACK] Service delete failed. Deleting from local memory:', err.message);
  }

  const deleted = localServices.find(s => s._id === id);
  localServices = localServices.filter(s => s._id !== id);
  return deleted;
};
