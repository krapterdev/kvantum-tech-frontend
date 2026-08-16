import axios from 'axios';

// Cross-compatible Next.js + Vite API URL resolution
const API_URL = (typeof process !== 'undefined' && process.env && process.env.NEXT_PUBLIC_API_URL) 
  || (typeof import.meta !== 'undefined' && import.meta?.env?.VITE_API_URL) 
  || '/api';

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
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('kts_admin_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
