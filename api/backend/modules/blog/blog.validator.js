import { ApiError } from '../../utils/ApiError.js';

export const validateBlog = (req, res, next) => {
  const { id, title, summary, content } = req.body;

  if (req.method === 'POST' && !id) {
    throw new ApiError(400, 'Blog unique identifier slug (id) is required for creation');
  }

  if (!title || !summary || !content) {
    throw new ApiError(400, 'Missing blog fields (title, summary, content)');
  }

  next();
};
