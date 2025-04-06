import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('authToken') !== null;
  
  // If not authenticated, redirect to the homepage
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  // If authenticated, render the protected content
  return children;
};

export default ProtectedRoute;
