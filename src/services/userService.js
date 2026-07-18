import api from './api';

// Admin/Staff login connection
export const loginAdmin = async (email, password) => {
  const response = await api.post('/admin/login', { email, password });
  if (response.data && response.data.token) {
    localStorage.setItem('kts_admin_token', response.data.token);
    localStorage.setItem('kts_admin_user', JSON.stringify(response.data.user));
  }
  return response.data;
};

// Admin/Staff session termination
export const logoutAdmin = () => {
  localStorage.removeItem('kts_admin_token');
  localStorage.removeItem('kts_admin_user');
};

// Local storage session accessor
export const getCurrentUser = () => {
  const user = localStorage.getItem('kts_admin_user');
  return user ? JSON.parse(user) : null;
};

// List all staff members (admin only)
export const listUsers = async () => {
  const response = await api.get('/users');
  return response.data;
};

// Register a new worker role (admin only)
export const createUser = async (userData) => {
  const response = await api.post('/users', userData);
  return response.data;
};

// Delete a staff member account (admin only)
export const deleteUser = async (id) => {
  const response = await api.delete(`/users/${id}`);
  return response.data;
};
