import { ApiError } from '../../utils/ApiError.js';

export const validateSeoPage = (req, res, next) => {
  const { slug, title, content, metaTitle, metaDesc } = req.body;

  if (req.method === 'POST' && req.path !== '/bulk' && !slug) {
    throw new ApiError(400, 'SEO page unique slug (slug) is required for creation');
  }

  if (!title || !content || !metaTitle || !metaDesc) {
    throw new ApiError(400, 'Missing SEO page fields (title, content, metaTitle, metaDesc)');
  }

  next();
};

export const validateBulkSeoPages = (req, res, next) => {
  const { pages } = req.body;

  if (!pages || !Array.isArray(pages)) {
    throw new ApiError(400, 'Pages parameter must be a JSON array');
  }

  // Verify parameters inside each bulk item
  for (const page of pages) {
    const { slug, title, content, metaTitle, metaDesc } = page;
    if (!slug || !title || !content || !metaTitle || !metaDesc) {
      throw new ApiError(400, `Incomplete parameters inside bulk items. Check: ${slug || 'unknown'}`);
    }
  }

  next();
};
