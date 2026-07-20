import axios from 'axios';

// Production API Endpoint
const API_URL = 'https://api.kvantumtechsolutions.com/api';
// Local Testing (Uncomment to run local dev server)
// const API_URL = 'http://localhost:5001/api';

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
