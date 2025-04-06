import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Stack } from '@mui/material';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import logo from '../assets/logo.png';

const HomePage = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  // Simplified useEffect that won't cause reload loops
  useEffect(() => {
    // Only clean URL parameters - no reloading
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('logout')) {
      console.log("Logout detected via URL parameter");
      // Just clean the URL, don't reload or clear storage
      const cleanUrl = window.location.pathname;
      window.history.replaceState({}, document.title, cleanUrl);
    }
  }, []);

  const handleOpenLogin = () => {
    setShowLoginForm(true);
    console.log("Login button clicked, showLoginForm:", true);
  };

  const handleCloseLogin = () => {
    setShowLoginForm(false);
    console.log("Closing login form, showLoginForm:", false);
  };

  const handleLoginSuccess = () => {
    // Navigate to dashboard
    window.location.href = '/dashboard';
  };

  const handleOpenRegister = () => {
    setShowRegisterForm(true);
    console.log("PHI Register button clicked, showRegisterForm:", true);
  };

  const handleCloseRegister = () => {
    setShowRegisterForm(false);
    console.log("Closing register form, showRegisterForm:", false);
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center',
      minHeight: '100vh',
      padding: 3,
      background: 'linear-gradient(135deg, #e0f7fa 0%, #f8bbd0 100%)',
    }}>
      {/* Logo - Using the PNG logo from assets with significantly increased size */}
      <Box sx={{ 
        mb: 6, 
        mt: 5,
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        maxWidth: '800px' // Container constraint for extra large screens
      }}>
        <img 
          src={logo} 
          alt="SafeTrack Logo" 
          style={{ 
            width: '550px',  // Substantially increased from 400px to 550px
            height: 'auto', 
            maxWidth: '100%',
            filter: 'drop-shadow(0px 6px 12px rgba(0, 0, 0, 0.2))' // Enhanced shadow for better visibility
          }} 
        />
      </Box>

      <Typography variant="h1" sx={{ 
        fontWeight: 700, 
        mb: 3, 
        fontSize: { xs: '36px', sm: '40px', md: '48px' }
      }}>
        Welcome to SafeTrack
      </Typography>
      
      <Typography variant="body1" sx={{ 
        mb: 6, 
        maxWidth: 700, 
        textAlign: 'center', 
        fontSize: { xs: '20px', sm: '22px', md: '24px' }, // Further increased font size
        opacity: 0.8,
        lineHeight: 1.4 // Improved line height for better readability
      }}>
        Ensuring Safe Food Practices with Smart Inspections
      </Typography>
      
      {/* Stack of buttons with improved spacing */}
      <Stack spacing={4} sx={{ width: '280px' }}> {/* Increased spacing between buttons */}
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleOpenLogin}
          sx={{ 
            height: 55, 
            fontSize: '1.2rem', 
            fontWeight: 500,
            boxShadow: '0px 4px 10px rgba(84, 121, 255, 0.25)',
            '&:hover': {
              boxShadow: '0px 6px 15px rgba(84, 121, 255, 0.35)',
            }
          }}
        >
          Login
        </Button>
        
        <Button 
          variant="outlined" 
          color="primary"
          onClick={handleOpenRegister}
          sx={{ 
            height: 55, 
            fontSize: '1.2rem', 
            fontWeight: 500,
            border: '2px solid',
            '&:hover': {
              border: '2px solid',
              backgroundColor: 'rgba(84, 121, 255, 0.05)'
            }
          }}
        >
          PHI Register
        </Button>
      </Stack>

      {/* Login Form Modal */}
      <LoginForm 
        open={showLoginForm} 
        onClose={handleCloseLogin}
        onLoginSuccess={handleLoginSuccess}
      />
      
      {/* Register Form Modal - Always render it but control visibility with open prop */}
      <RegisterForm 
        open={showRegisterForm} 
        onClose={handleCloseRegister} 
      />
    </Box>
  );
};

export default HomePage;