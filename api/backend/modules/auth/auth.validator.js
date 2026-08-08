import { ApiError } from '../../utils/ApiError.js';

export const validateLogin = (req, res, next) => {
  const { username, email, password } = req.body;

  if ((!username && !email) || !password) {
    throw new ApiError(400, 'Email/Username and password are required');
  }

  next();
};
