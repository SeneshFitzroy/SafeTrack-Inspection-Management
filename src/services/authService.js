import api from './api';

/**
 * Login user with email and password
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise} - Response with token and user data
 */
export const login = async (email, password) => {
  try {
    console.log('Login request initiated for:', email);
    
    const response = await api.post('/api/users/login', { email, password });
    console.log('Login API response status:', response.status);
    
    // Check if we have a token
    if (response.data && response.data.token) {
      // Store token in localStorage
      localStorage.setItem('authToken', response.data.token);
      console.log('Token stored in localStorage');
      
      // Store user data in sessionStorage
      if (response.data.user) {
        sessionStorage.setItem('user', JSON.stringify(response.data.user));
        console.log('User data stored in sessionStorage');
      }
      
      return response.data;
    } else {
      throw new Error('No token received from server');
    }
  } catch (error) {
    console.error('Login error:', error);
    
    let errorMessage = 'An error occurred during login';
    
    // Extract error message from response if available
    if (error.response && error.response.data && error.response.data.message) {
      errorMessage = error.response.data.message;
    }
    
    throw errorMessage;
  }
};

/**
 * Register a new user
 * @param {Object} userData - User registration data
 * @returns {Promise} - Response with token and user data
 */
export const register = async (userData) => {
  try {
    console.log('Registration request initiated for:', userData.email);
    
    const response = await api.post('/api/users/register', userData);
    console.log('Registration API response status:', response.status);
    
    // Check if we have a token
    if (response.data && response.data.token) {
      // Store token in localStorage
      localStorage.setItem('authToken', response.data.token);
      console.log('Token stored in localStorage');
      
      // Store user data in sessionStorage
      if (response.data.user) {
        sessionStorage.setItem('user', JSON.stringify(response.data.user));
        console.log('User data stored in sessionStorage');
      }
      
      return response.data;
    } else {
      throw new Error('No token received from server');
    }
  } catch (error) {
    console.error('Registration error:', error);
    
    let errorMessage = 'An error occurred during registration';
    
    // Extract error message from response if available
    if (error.response && error.response.data && error.response.data.message) {
      errorMessage = error.response.data.message;
    }
    
    throw errorMessage;
  }
};

/**
 * Logout user and clean up storage
 */
export const logout = () => {
  // Clear storage
  localStorage.removeItem('authToken');
  sessionStorage.removeItem('user');
  
  // Set flag for showing message on homepage
  sessionStorage.setItem('loggedOut', 'true');
  sessionStorage.setItem('logoutTime', new Date().toISOString());
  
  console.log('User logged out, storage cleared');
  return true;
};

/**
 * Get current user from sessionStorage
 * @returns {Object|null} - User data or null if not logged in
 */
export const getCurrentUser = () => {
  try {
    const userStr = sessionStorage.getItem('user');
    
    if (!userStr) {
      console.log('No user found in sessionStorage');
      return null;
    }
    
    return JSON.parse(userStr);
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

/**
 * Check if user is authenticated
 * @returns {boolean} - True if authenticated
 */
export const isAuthenticated = () => {
  return localStorage.getItem('authToken') !== null;
};

/**
 * Update user profile
 * @param {Object} profileData - Updated profile data
 * @returns {Promise} - Response with updated user data
 */
export const updateProfile = async (profileData) => {
  try {
    console.log('Profile update initiated');
    
    const response = await api.put('/api/users/profile', profileData);
    
    // Update user in sessionStorage
    if (response.data && response.data.user) {
      const currentUser = getCurrentUser();
      const updatedUser = { ...currentUser, ...response.data.user };
      sessionStorage.setItem('user', JSON.stringify(updatedUser));
      console.log('User data updated in sessionStorage');
    }
    
    return response.data;
  } catch (error) {
    console.error('Profile update error:', error);
    
    let errorMessage = 'An error occurred updating profile';
    
    if (error.response && error.response.data && error.response.data.message) {
      errorMessage = error.response.data.message;
    }
    
    throw errorMessage;
  }
};

/**
 * Change user password
 * @param {Object} passwordData - Current and new password
 * @returns {Promise} - Response with success message
 */
export const changePassword = async (passwordData) => {
  try {
    console.log('Password change initiated');
    
    const response = await api.put('/api/users/password', passwordData);
    return response.data;
  } catch (error) {
    console.error('Password change error:', error);
    
    let errorMessage = 'An error occurred changing password';
    
    if (error.response && error.response.data && error.response.data.message) {
      errorMessage = error.response.data.message;
    }
    
    throw errorMessage;
  }
};
