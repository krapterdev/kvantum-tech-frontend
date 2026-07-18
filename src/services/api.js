import axios from 'axios';

// Resolve VITE_API_URL from environment variables, fallback to local node development address
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Request interceptor to automatically attach authorization tokens if stored in localStorage
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('kts_admin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
