import { ApiError } from '../../utils/ApiError.js';

export const validateService = (req, res, next) => {
  const { id, title, shortDesc, longDesc } = req.body;

  if (req.method === 'POST' && !id) {
    throw new ApiError(400, 'Service unique identifier slug (id) is required for creation');
  }

  if (!title || !shortDesc || !longDesc) {
    throw new ApiError(400, 'Missing service fields (title, shortDesc, longDesc)');
  }

  next();
};
