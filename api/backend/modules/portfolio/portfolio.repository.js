import { db } from '../../config/db.js';

let localPortfolios = [
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

const mapPortfolio = (row) => {
  if (!row) return null;
  return {
    _id: row._id,
    id: row._id,
    title: row.title,
    category: row.category,
    desc: row.desc,
    tags: row.tags
  };
};

export const getPortfolios = async () => {
  try {
    const result = await db.query('SELECT * FROM portfolios ORDER BY created_at DESC');
    const list = result.rows.map(mapPortfolio);
    if (list.length > 0) {
      localPortfolios = list;
    }
    return localPortfolios;
  } catch (err) {
    console.warn('[OFFLINE FALLBACK] Portfolios SQL select failed. Returning local cache.');
    return localPortfolios;
  }
};

export const createPortfolio = async (data) => {
  const { id, title, category, desc, tags } = data;
  const payloadId = id || 'project_' + Math.random().toString(36).substr(2, 9);
  
  try {
    const result = await db.query(
      `INSERT INTO portfolios ("_id", "title", "category", "desc", "tags") 
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [payloadId, title, category, desc, tags]
    );
    const port = mapPortfolio(result.rows[0]);
    if (port) {
      localPortfolios.unshift(port);
      return port;
    }
  } catch (err) {
    console.warn('[OFFLINE FALLBACK] Portfolios insert failed. Adding to local cache:', err.message);
  }

  const localItem = { _id: payloadId, id: payloadId, title, category, desc, tags };
  localPortfolios.unshift(localItem);
  return localItem;
};

export const updatePortfolioById = async (id, data) => {
  const { id: newId, title, category, desc, tags } = data;
  
  try {
    const result = await db.query(
      `UPDATE portfolios 
       SET "_id" = COALESCE($1, "_id"),
           "title" = COALESCE($2, "title"),
           "category" = COALESCE($3, "category"),
           "desc" = COALESCE($4, "desc"),
           "tags" = COALESCE($5, "tags"),
           "updated_at" = CURRENT_TIMESTAMP
       WHERE "_id" = $6 RETURNING *`,
      [newId || id, title, category, desc, tags, id]
    );
    const port = mapPortfolio(result.rows[0]);
    if (port) {
      localPortfolios = localPortfolios.map(p => p.id === id ? port : p);
      return port;
    }
  } catch (err) {
    console.warn('[OFFLINE FALLBACK] Portfolios update failed. Updating local cache:', err.message);
  }

  localPortfolios = localPortfolios.map(p => {
    if (p.id === id) {
      return {
        ...p,
        _id: newId || id,
        id: newId || id,
        title: title !== undefined ? title : p.title,
        category: category !== undefined ? category : p.category,
        desc: desc !== undefined ? desc : p.desc,
        tags: tags !== undefined ? tags : p.tags
      };
    }
    return p;
  });
  return localPortfolios.find(p => p.id === (newId || id));
};

export const deletePortfolioById = async (id) => {
  try {
    await db.query('DELETE FROM portfolios WHERE "_id" = $1', [id]);
    localPortfolios = localPortfolios.filter(p => p.id !== id);
    return true;
  } catch (err) {
    console.warn('[OFFLINE FALLBACK] Portfolios delete failed. Deleting from local cache:', err.message);
    localPortfolios = localPortfolios.filter(p => p.id !== id);
    return true;
  }
};
