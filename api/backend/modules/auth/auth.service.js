import jwt from 'jsonwebtoken';
import { config } from '../../config/env.js';
import { ApiError } from '../../utils/ApiError.js';
import * as userRepository from '../user/user.repository.js';

export const authenticateAdmin = async (usernameOrEmail, password) => {
  if (!usernameOrEmail || !password) {
    throw new ApiError(400, 'Username/Email and password are required');
  }

  let user = null;
  try {
    user = await userRepository.findUserByEmail(usernameOrEmail.toLowerCase().trim());
  } catch (dbError) {
    console.warn('[AUTH FALLBACK] Database lookup failed, checking offline credentials:', dbError.message);
  }
  
  if (user) {
    // Verify the hashed password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new ApiError(401, 'Invalid admin email or password');
    }
  } else {
    // Check local mockup fallback admin credentials
    const defaultEmail = 'admin@kvantumtechsolutions.com';
    const defaultPass = 'Chikki!@#1998';
    
    if (
      usernameOrEmail.toLowerCase().trim() === defaultEmail &&
      password === defaultPass
    ) {
      user = {
        id: 'offline_admin_id',
        email: defaultEmail,
        role: 'admin'
      };
    } else {
      throw new ApiError(401, 'Invalid admin email or password');
    }
  }

  // Generate JWT token containing payload context
  const token = jwt.sign(
    { 
      id: user.id, 
      email: user.email, 
      role: user.role 
    },
    config.jwt.secret,
    { expiresIn: config.jwt.expiry }
  );

  return token;
};
