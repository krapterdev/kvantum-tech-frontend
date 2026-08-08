import { db } from '../../config/db.js';

const mapSeoPage = (row) => {
  if (!row) return null;
  return {
    slug: row._id,
    _id: row._id, // Mongoose compatibility
    title: row.title,
    content: row.content,
    metaTitle: row.metaTitle,
    metaDesc: row.metaDesc,
    metaKeywords: row.metaKeywords || '',
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
};

let localSeoPages = [
  {
    slug: 'custom-web-development-noida',
    _id: 'custom-web-development-noida',
    title: 'Custom Web Design & Development Agency Noida | Kvantum',
    content: '<h2>Build High-Performance Applications In Noida</h2><p>Our custom React and Next.js applications guarantee fluid UX and top SEO index ratings...</p>',
    metaTitle: 'Custom Web Development Noida | Kvantum Tech Solutions',
    metaDesc: 'Looking for a reliable web development company in Noida? Connect with Kvantum Tech Solutions for custom site designs.',
    metaKeywords: 'web dev, noida agency, kvantum tech solutions',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export const createSeoPage = async (pageData) => {
  const { slug, _id, title, content, metaTitle, metaDesc, metaKeywords } = pageData;
  const targetId = _id || slug;
  
  const mapped = {
    slug: targetId,
    _id: targetId,
    title,
    content,
    metaTitle,
    metaDesc,
    metaKeywords: metaKeywords || '',
    createdAt: new Date(),
    updatedAt: new Date()
  };

  try {
    const result = await db.query(
      `INSERT INTO seo_pages ("_id", "title", "content", "metaTitle", "metaDesc", "metaKeywords")
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [targetId, title, content, metaTitle, metaDesc, metaKeywords || '']
    );
    const page = mapSeoPage(result.rows[0]);
    localSeoPages.push(page);
    return page;
  } catch (err) {
    console.warn('[OFFLINE FALLBACK] SEO Page creation failed. Storing in local memory:', err.message);
    localSeoPages.push(mapped);
    return mapped;
  }
};

export const createBulkSeoPages = async (pages) => {
  const upserted = [];
  
  for (const page of pages) {
    const { slug, _id, title, content, metaTitle, metaDesc, metaKeywords } = page;
    const targetId = _id || slug;
    
    const mapped = {
      slug: targetId,
      _id: targetId,
      title,
      content,
      metaTitle,
      metaDesc,
      metaKeywords: metaKeywords || '',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    try {
      const result = await db.query(
        `INSERT INTO seo_pages ("_id", "title", "content", "metaTitle", "metaDesc", "metaKeywords")
         VALUES ($1, $2, $3, $4, $5, $6)
         ON CONFLICT ("_id") DO UPDATE
         SET "title" = EXCLUDED."title",
             "content" = EXCLUDED."content",
             "metaTitle" = EXCLUDED."metaTitle",
             "metaDesc" = EXCLUDED."metaDesc",
             "metaKeywords" = EXCLUDED."metaKeywords",
             "updated_at" = CURRENT_TIMESTAMP
         RETURNING *`,
        [targetId, title, content, metaTitle, metaDesc, metaKeywords || '']
      );
      const resPage = mapSeoPage(result.rows[0]);
      localSeoPages = localSeoPages.filter(p => p._id !== targetId);
      localSeoPages.push(resPage);
      upserted.push(resPage);
    } catch (err) {
      console.warn('[OFFLINE FALLBACK] Bulk upsert failed for slug:', targetId, '. Storing in local memory.');
      localSeoPages = localSeoPages.filter(p => p._id !== targetId);
      localSeoPages.push(mapped);
      upserted.push(mapped);
    }
  }
  
  return upserted;
};

export const getAllSeoPages = async () => {
  try {
    const result = await db.query('SELECT * FROM seo_pages ORDER BY "created_at" DESC');
    const dbPages = result.rows.map(mapSeoPage);
    if (dbPages.length > 0) {
      localSeoPages = dbPages;
    }
    return localSeoPages;
  } catch (err) {
    console.warn('[OFFLINE FALLBACK] SEO Pages list fetch failed. Returning local in-memory array.');
    return localSeoPages;
  }
};

export const updateSeoPageBySlug = async (slug, pageData) => {
  const { title, content, metaTitle, metaDesc, metaKeywords } = pageData;
  
  try {
    const result = await db.query(
      `UPDATE seo_pages 
       SET "title" = COALESCE($1, "title"),
           "content" = COALESCE($2, "content"),
           "metaTitle" = COALESCE($3, "metaTitle"),
           "metaDesc" = COALESCE($4, "metaDesc"),
           "metaKeywords" = COALESCE($5, "metaKeywords"),
           "updated_at" = CURRENT_TIMESTAMP
       WHERE "_id" = $6 RETURNING *`,
      [title, content, metaTitle, metaDesc, metaKeywords, slug]
    );
    const page = mapSeoPage(result.rows[0]);
    if (page) {
      localSeoPages = localSeoPages.map(p => p._id === slug ? page : p);
      return page;
    }
  } catch (err) {
    console.warn('[OFFLINE FALLBACK] SEO Page update failed. Updating in local memory:', err.message);
  }

  // Local update fallback
  localSeoPages = localSeoPages.map(p => {
    if (p._id === slug) {
      return {
        ...p,
        title: title !== undefined ? title : p.title,
        content: content !== undefined ? content : p.content,
        metaTitle: metaTitle !== undefined ? metaTitle : p.metaTitle,
        metaDesc: metaDesc !== undefined ? metaDesc : p.metaDesc,
        metaKeywords: metaKeywords !== undefined ? metaKeywords : p.metaKeywords,
        updatedAt: new Date()
      };
    }
    return p;
  });
  return localSeoPages.find(p => p._id === slug);
};

export const deleteSeoPageBySlug = async (slug) => {
  try {
    const result = await db.query('DELETE FROM seo_pages WHERE "_id" = $1 RETURNING *', [slug]);
    const page = mapSeoPage(result.rows[0]);
    if (page) {
      localSeoPages = localSeoPages.filter(p => p._id !== slug);
      return page;
    }
  } catch (err) {
    console.warn('[OFFLINE FALLBACK] SEO Page delete failed. Deleting from local memory:', err.message);
  }

  const deleted = localSeoPages.find(p => p._id === slug);
  localSeoPages = localSeoPages.filter(p => p._id !== slug);
  return deleted;
};
