import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Stack, Alert, Collapse, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import logo from '../assets/logo.png';

const HomePage = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [logoutAlert, setLogoutAlert] = useState({
    show: false,
    message: ''
  });
  const navigate = useNavigate();

  // Check if user is already logged in or just logged out
  useEffect(() => {
    if (localStorage.getItem('authToken')) {
      navigate('/dashboard');
    }
    
    // Enhanced logout message with timestamp
    if (sessionStorage.getItem('loggedOut') === 'true') {
      // Get logout time if available
      const logoutTime = sessionStorage.getItem('logoutTime');
      let message = "You have been successfully logged out.";
      
      if (logoutTime) {
        try {
          const logoutDate = new Date(logoutTime);
          const now = new Date();
          const timeDiff = Math.floor((now - logoutDate) / 1000 / 60); // minutes
          
          if (timeDiff < 1) {
            message = "You have been successfully logged out just now.";
          } else if (timeDiff === 1) {
            message = "You have been successfully logged out 1 minute ago.";
          } else if (timeDiff < 60) {
            message = `You have been successfully logged out ${timeDiff} minutes ago.`;
          } else {
            const hours = Math.floor(timeDiff / 60);
            if (hours === 1) {
              message = "You have been successfully logged out 1 hour ago.";
            } else {
              message = `You have been successfully logged out ${hours} hours ago.`;
            }
          }
        } catch (e) {
          console.error("Error calculating logout time:", e);
        }
      }
      
      setLogoutAlert({
        show: true,
        message: message
      });
      
      // Clear the logout flags
      sessionStorage.removeItem('loggedOut');
      sessionStorage.removeItem('logoutTime');
    }
  }, [navigate]);

  const handleOpenLogin = () => {
    setShowLoginForm(true);
    console.log("Login button clicked, showLoginForm:", true);
  };

  const handleCloseLogin = () => {
    setShowLoginForm(false);
    console.log("Closing login form, showLoginForm:", false);
  };

  const handleLoginSuccess = () => {
    // Navigate to dashboard using window.location for a reliable redirect
    console.log("Login successful, redirecting to dashboard");
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
      {/* Logout Alert */}
      <Collapse in={logoutAlert.show} sx={{ position: 'absolute', top: 20, width: '90%', maxWidth: 600, zIndex: 10 }}>
        <Alert 
          severity="success"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => setLogoutAlert({...logoutAlert, show: false})}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ 
            mb: 2, 
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)', 
            borderRadius: 2,
            '& .MuiAlert-message': { fontWeight: 500 }
          }}
        >
          {logoutAlert.message}
        </Alert>
      </Collapse>

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