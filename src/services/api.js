import axios from 'axios';

// Get API URL from environment or use default
const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
console.log('API Service initialized with baseURL:', baseURL);

// Create axios instance with default config
const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 15000 // 15 seconds timeout
});

// Add a request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem('authToken');
    
    // If token exists, add to headers
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle token expiration
    if (error.response && error.response.status === 401) {
      console.log('Unauthorized access detected, clearing auth data');
      
      // Clear auth data
      localStorage.removeItem('authToken');
      sessionStorage.removeItem('user');
      
      // Set session expired flag for showing message on login page
      sessionStorage.setItem('sessionExpired', 'true');
      
      // Redirect to login page
      window.location.href = '/';
    }
    
    // Handle network or server errors
    if (!error.response) {
      console.error('Network or server error:', error);
    }
    
    return Promise.reject(error);
  }
);

export default api;
