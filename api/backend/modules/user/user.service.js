import * as userRepository from './user.repository.js';
import { ApiError } from '../../utils/ApiError.js';

export const registerUser = async (userData) => {
  const existingUser = await userRepository.findUserByEmail(userData.email);
  if (existingUser) {
    throw new ApiError(400, 'User with this email already registered');
  }
  return await userRepository.createUser(userData);
};

export const fetchUsersList = async () => {
  return await userRepository.listAllUsers();
};

export const fetchUserDetails = async (id) => {
  const user = await userRepository.findUserById(id);
  if (!user) {
    throw new ApiError(404, 'User not located');
  }
  return user;
};

export const removeUser = async (id) => {
  const deletedUser = await userRepository.deleteUserById(id);
  if (!deletedUser) {
    throw new ApiError(404, 'User not located');
  }
  return deletedUser;
};
