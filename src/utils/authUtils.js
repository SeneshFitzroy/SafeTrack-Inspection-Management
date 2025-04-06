/**
 * Authentication utilities for SafeTrack
 */

// Check if user is authenticated - adding debounce to prevent continuous checks
let lastAuthCheck = 0;
export const isAuthenticated = () => {
  // Prevent excessive checks within short timeframes
  const now = Date.now();
  if (now - lastAuthCheck < 500) {
    // Return the last known auth state if checked too frequently
    return window._lastAuthState || false;
  }
  
  lastAuthCheck = now;
  const authState = localStorage.getItem('authToken') !== null;
  window._lastAuthState = authState;
  return authState;
};

// Log the user out and redirect to home
export const logout = () => {
  // Static path to the homepage (not dashboard)
  const homePath = '/';
  
  // Clear all auth data
  localStorage.removeItem('authToken');
  localStorage.removeItem('userData');
  localStorage.removeItem('user');
  localStorage.removeItem('isAuthenticated');
  sessionStorage.clear();
  
  // Set flag to indicate we're coming from logout
  sessionStorage.setItem('loggedOut', 'true');
  
  // Most basic redirect to homepage
  window.location.href = homePath;
};

// Fixed version that won't cause reload loops
export const redirectToHomeIfNotAuthenticated = () => {
  // Prevent redirect loops with a session flag
  if (sessionStorage.getItem('redirectingAuth')) {
    return false;
  }
  
  if (!isAuthenticated()) {
    try {
      sessionStorage.setItem('redirectingAuth', 'true');
      setTimeout(() => {
        sessionStorage.removeItem('redirectingAuth');
      }, 2000);
      window.location = '/';
      return true;
    } catch (e) {
      console.error('Redirect error:', e);
      return false;
    }
  }
  return false;
};

// Fixed version that won't cause reload loops
export const redirectToDashboardIfAuthenticated = () => {
  // Prevent redirect loops with a session flag
  if (sessionStorage.getItem('redirectingAuth')) {
    return false;
  }
  
  if (isAuthenticated()) {
    try {
      sessionStorage.setItem('redirectingAuth', 'true');
      setTimeout(() => {
        sessionStorage.removeItem('redirectingAuth');
      }, 2000);
      window.location = '/dashboard';
      return true;
    } catch (e) {
      console.error('Redirect error:', e);
      return false;
    }
  }
  return false;
};
