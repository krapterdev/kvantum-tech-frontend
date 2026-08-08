import { db } from '../../config/db.js';

const mapBlog = (row) => {
  if (!row) return null;
  let parsedFaqs = [];
  try {
    if (typeof row.faqs === 'string') {
      parsedFaqs = JSON.parse(row.faqs);
    } else if (Array.isArray(row.faqs)) {
      parsedFaqs = row.faqs;
    }
  } catch (e) {
    parsedFaqs = [];
  }

  return {
    id: row._id || row.id,
    _id: row._id || row.id,
    title: row.title || '',
    category: row.category || 'Web & App Dev',
    date: row.date || '',
    readTime: row.readTime || '5 min read',
    author: row.author || 'Kvantum Tech Team',
    image: row.image || row.coverImage || row.ogImage || '',
    imageAlt: row.imageAlt || row.image_alt || '',
    imageTitle: row.imageTitle || row.image_title || '',
    summary: row.summary || '',
    content: row.content || '',
    keywords: row.keywords || '',
    canonical: row.canonical || '',
    metaTitle: row.metaTitle || '',
    metaDesc: row.metaDesc || '',
    ogTitle: row.ogTitle || '',
    ogDesc: row.ogDesc || '',
    ogImage: row.ogImage || row.image || '',
    ogType: row.ogType || 'article',
    twitterTitle: row.twitterTitle || '',
    twitterDesc: row.twitterDesc || '',
    twitterCard: row.twitterCard || 'summary_large_image',
    schemaMarkup: row.schemaMarkup || row.schema_markup || '',
    otherSeoTags: row.otherSeoTags || row.other_seo_tags || '',
    faqs: parsedFaqs,
    createdAt: row.created_at || row.createdAt || new Date(),
    updatedAt: row.updated_at || row.updatedAt || new Date()
  };
};

let localBlogs = [];

export const createBlog = async (blogData) => {
  const targetId = blogData._id || blogData.id || ('blog_' + Math.random().toString(36).substr(2, 9));
  const createdAtVal = blogData.createdAt || blogData.created_at || new Date();
  
  const mapped = mapBlog({
    ...blogData,
    _id: targetId,
    id: targetId,
    created_at: createdAtVal,
    updated_at: new Date()
  });

  const faqsJson = JSON.stringify(mapped.faqs || []);

  try {
    const result = await db.query(
      `INSERT INTO blogs ("_id", "title", "category", "date", "readTime", "author", "image", "imageAlt", "imageTitle", "summary", "content", "keywords", "canonical", "metaTitle", "metaDesc", "ogTitle", "ogDesc", "ogImage", "ogType", "twitterTitle", "twitterDesc", "twitterCard", "schemaMarkup", "otherSeoTags", "faqs", "created_at")
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25::jsonb, $26) RETURNING *`,
      [
        targetId, 
        mapped.title, 
        mapped.category, 
        mapped.date, 
        mapped.readTime,
        mapped.author,
        mapped.image,
        mapped.imageAlt,
        mapped.imageTitle,
        mapped.summary, 
        mapped.content,
        mapped.keywords,
        mapped.canonical,
        mapped.metaTitle, 
        mapped.metaDesc,
        mapped.ogTitle,
        mapped.ogDesc,
        mapped.ogImage,
        mapped.ogType,
        mapped.twitterTitle,
        mapped.twitterDesc,
        mapped.twitterCard,
        mapped.schemaMarkup,
        mapped.otherSeoTags,
        faqsJson,
        createdAtVal
      ]
    );
    const blog = mapBlog({ ...result.rows[0], ...mapped });
    localBlogs = localBlogs.filter(b => b._id !== targetId);
    localBlogs.unshift(blog);
    return blog;
  } catch (err) {
    console.warn('[OFFLINE FALLBACK] Blog creation DB query failed. Storing in local memory:', err.message);
    localBlogs = localBlogs.filter(b => b._id !== targetId);
    localBlogs.unshift(mapped);
    return mapped;
  }
};

export const getAllBlogs = async () => {
  try {
    const result = await db.query('SELECT * FROM blogs ORDER BY "created_at" DESC');
    if (result && result.rows) {
      const dbBlogs = result.rows.map(mapBlog);
      localBlogs = dbBlogs;
      return localBlogs;
    }
    return localBlogs;
  } catch (err) {
    console.warn('[OFFLINE FALLBACK] Blog list fetch DB query failed. Returning in-memory array.');
    return localBlogs;
  }
};

export const updateBlogById = async (id, blogData) => {
  const targetId = id || blogData._id || blogData.id;
  const createdAtVal = blogData.createdAt || blogData.created_at || null;
  const mapped = mapBlog({ ...blogData, _id: targetId, id: targetId });
  const faqsJson = JSON.stringify(mapped.faqs || []);

  try {
    const result = await db.query(
      `UPDATE blogs 
       SET "title" = COALESCE($1, "title"),
           "category" = COALESCE($2, "category"),
           "date" = COALESCE($3, "date"),
           "readTime" = COALESCE($4, "readTime"),
           "author" = COALESCE($5, "author"),
           "image" = COALESCE($6, "image"),
           "imageAlt" = COALESCE($7, "imageAlt"),
           "imageTitle" = COALESCE($8, "imageTitle"),
           "summary" = COALESCE($9, "summary"),
           "content" = COALESCE($10, "content"),
           "keywords" = COALESCE($11, "keywords"),
           "canonical" = COALESCE($12, "canonical"),
           "metaTitle" = COALESCE($13, "metaTitle"),
           "metaDesc" = COALESCE($14, "metaDesc"),
           "ogTitle" = COALESCE($15, "ogTitle"),
           "ogDesc" = COALESCE($16, "ogDesc"),
           "ogImage" = COALESCE($17, "ogImage"),
           "ogType" = COALESCE($18, "ogType"),
           "twitterTitle" = COALESCE($19, "twitterTitle"),
           "twitterDesc" = COALESCE($20, "twitterDesc"),
           "twitterCard" = COALESCE($21, "twitterCard"),
           "schemaMarkup" = COALESCE($22, "schemaMarkup"),
           "otherSeoTags" = COALESCE($23, "otherSeoTags"),
           "faqs" = $24::jsonb,
           "created_at" = COALESCE($25, "created_at"),
           "updated_at" = CURRENT_TIMESTAMP
       WHERE "_id" = $26 RETURNING *`,
      [
        mapped.title, mapped.category, mapped.date, mapped.readTime,
        mapped.author, mapped.image, mapped.imageAlt, mapped.imageTitle,
        mapped.summary, mapped.content, mapped.keywords, mapped.canonical,
        mapped.metaTitle, mapped.metaDesc, mapped.ogTitle, mapped.ogDesc,
        mapped.ogImage, mapped.ogType, mapped.twitterTitle, mapped.twitterDesc,
        mapped.twitterCard, mapped.schemaMarkup, mapped.otherSeoTags,
        faqsJson, createdAtVal, targetId
      ]
    );
    if (result && result.rows && result.rows.length > 0) {
      const blog = mapBlog({ ...result.rows[0], ...mapped });
      localBlogs = localBlogs.map(b => (b._id === targetId || b.id === targetId) ? blog : b);
      return blog;
    }
  } catch (err) {
    console.warn('[OFFLINE FALLBACK] Blog update DB query failed. Updating in local memory:', err.message);
  }

  // Local update fallback
  let found = false;
  localBlogs = localBlogs.map(b => {
    if (b._id === targetId || b.id === targetId) {
      found = true;
      return { ...b, ...mapped, updatedAt: new Date() };
    }
    return b;
  });
  if (!found) {
    localBlogs.unshift(mapped);
  }
  return localBlogs.find(b => b._id === targetId || b.id === targetId);
};

export const deleteBlogById = async (id) => {
  if (!id) return null;
  const targetId = id;

  try {
    await db.query('DELETE FROM blogs WHERE "_id" = $1', [targetId]);
  } catch (err) {
    console.warn('[OFFLINE FALLBACK] Blog delete DB query failed:', err.message);
  }

  localBlogs = localBlogs.filter(b => (b._id !== targetId && b.id !== targetId));
  return true;
};
