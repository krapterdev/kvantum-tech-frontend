import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const authenticateToken = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    throw new ApiError(401, 'Access token required');
  }

  try {
    const decoded = jwt.verify(token, config.jwt.secret);
    req.user = decoded; // Attach the decoded payload context containing role and email
    next();
  } catch (error) {
    throw new ApiError(403, 'Invalid or expired session token');
  }
});

// Middleware to restrict route access based on role groups (RBAC)
export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      throw new ApiError(401, 'Unauthorized: Access credentials missing');
    }

    if (!allowedRoles.includes(req.user.role)) {
      throw new ApiError(403, `Forbidden: Role '${req.user.role}' does not have permission to access this route`);
    }

    next();
  };
};
