import { ApiError } from '../utils/ApiError.js';
import { logger } from '../utils/logger.js';

export const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  if (process.env.NODE_ENV === 'production' && statusCode === 500) {
    message = 'Internal Server Error';
  }

  if (!(err instanceof ApiError)) {
    err = new ApiError(statusCode, message, err.errors || [], err.stack);
  }

  logger.error(`[ERROR] ${statusCode} - ${message}`);
  if (statusCode === 500) {
    logger.error(err.stack || '');
  }

  // Compatible with frontend which checks for "errData.error"
  res.status(statusCode).json({
    success: false,
    error: message,
    errors: err.errors || []
  });
};
