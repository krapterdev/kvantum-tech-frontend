import { asyncHandler } from '../../utils/asyncHandler.js';
import * as userService from './user.service.js';
import { ApiError } from '../../utils/ApiError.js';

export const handleRegisterUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;
  
  if (!name || !email || !password) {
    throw new ApiError(400, 'Missing user parameters (name, email, password)');
  }

  const newUser = await userService.registerUser({ name, email, password, role });
  
  const userResponse = {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    role: newUser.role,
    createdAt: newUser.createdAt
  };
  res.status(201).json(userResponse);
});

export const handleGetUsersList = asyncHandler(async (req, res) => {
  const users = await userService.fetchUsersList();
  res.status(200).json(users);
});

export const handleDeleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  await userService.removeUser(id);
  res.status(200).json({ success: true, message: 'User deleted successfully' });
});
