import axios from 'axios';

/**
 * Axios interceptor that automatically attaches the JWT token
 * to every outgoing request header.
 *
 * This means we don't need to manually add Authorization header
 * in every API call — it's handled globally here.
 */
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Axios interceptor that handles 401 Unauthorized responses.
 * If the server returns 401, the token has expired or is invalid.
 * Clear auth data and redirect to login automatically.
 */
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axios;