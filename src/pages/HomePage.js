import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Stack, Alert, Collapse, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import logo from '../assets/logo.png';
import { keyframes } from '@mui/system';

// Enhanced professional animation definitions
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideUp = keyframes`
  0% { transform: translateY(25px); opacity: 0; filter: blur(3px); }
  100% { transform: translateY(0); opacity: 1; filter: blur(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); filter: brightness(1) contrast(1); }
  50% { transform: scale(1.02); filter: brightness(1.05) contrast(1.03); }
  100% { transform: scale(1); filter: brightness(1) contrast(1); }
`;

const float = keyframes`
  0% { transform: translateY(0px) translateX(0px); }
  25% { transform: translateY(-6px) translateX(3px); }
  50% { transform: translateY(0px) translateX(5px); }
  75% { transform: translateY(4px) translateX(2px); }
  100% { transform: translateY(0px) translateX(0px); }
`;

const shimmer = keyframes`
  0% { background-position: -100% 0; }
  100% { background-position: 200% 0; }
`;

const glow = keyframes`
  0% { box-shadow: 0 0 5px rgba(84, 121, 255, 0.4); }
  50% { box-shadow: 0 0 15px rgba(84, 121, 255, 0.6), 0 0 30px rgba(84, 121, 255, 0.2); }
  100% { box-shadow: 0 0 5px rgba(84, 121, 255, 0.4); }
`;

const rotateGlow = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Refined text reveal animation for more professional look
const textReveal = keyframes`
  0% { opacity: 0; transform: translateY(15px); letter-spacing: -0.5px; }
  60% { letter-spacing: 0.8px; }
  100% { opacity: 1; transform: translateY(0); letter-spacing: 0.5px; }
`;

// More subtle, professional animation variants
const softFloat = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-4px); }
  100% { transform: translateY(0px); }
`;

const buttonHover = keyframes`
  0% { transform: translateY(0); }
  100% { transform: translateY(-3px); }
`;

// Add missing wave animation
const wave = keyframes`
  0% { transform: rotateX(1deg); }
  50% { transform: rotateX(-1deg); }
  100% { transform: rotateX(1deg); }
`;

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
    console.log("Login successful, redirecting to dashboard");
    window.location.href = '/dashboard';
  };

  const handleOpenRegister = () => {
    setShowRegisterForm(true);
    console.log("Register button clicked, showRegisterForm:", true);
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
      background: 'linear-gradient(-45deg, #e6f7ff 0%, #f6f0ff 33%, #f0f8ff 66%, #f5f0ff 100%)',
      backgroundSize: '400% 400%',
      animation: `${rotateGlow} 30s ease infinite`,
      overflow: 'hidden',
      position: 'relative',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 70%)',
        pointerEvents: 'none'
      },
      '&::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.4,
        backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%232196f3\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
        pointerEvents: 'none',
        animation: `${pulse} 15s ease-in-out infinite`
      },
    }}>
      {/* Logout Alert with enhanced animation */}
      <Collapse in={logoutAlert.show} sx={{ 
        position: 'absolute', 
        top: 20, 
        width: '90%', 
        maxWidth: 600, 
        zIndex: 10,
        animation: `${fadeIn} 0.5s ease-out`,
      }}>
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
            boxShadow: '0 12px 30px rgba(0,0,0,0.18)',
            borderRadius: 4,
            backdropFilter: 'blur(12px)',
            background: 'rgba(76, 175, 80, 0.85)',
            color: 'white',
            '& .MuiAlert-message': { 
              fontWeight: 600,
              fontSize: '1.05rem',
              letterSpacing: '0.3px',
              textShadow: '0 1px 2px rgba(0,0,0,0.15)'
            },
            transition: 'all 0.3s ease',
            overflow: 'hidden',
            '&::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '200%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
              animation: `${shimmer} 2.5s infinite linear`,
              pointerEvents: 'none',
            }
          }}
        >
          {logoutAlert.message}
        </Alert>
      </Collapse>

      {/* Enhanced logo animation */}
      <Box sx={{ 
        mb: 7, 
        mt: 5,
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        maxWidth: '800px',
        animation: `${fadeIn} 1s ease-out, ${softFloat} 8s ease-in-out infinite`,
        position: 'relative',
        perspective: '1200px',
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: '-25px',
          left: '50%',
          transform: 'translateX(-50%) scale(0.9)',
          width: '60%',
          height: '15px',
          background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0) 70%)',
          borderRadius: '50%',
          zIndex: -1,
          filter: 'blur(7px)',
          animation: `${pulse} 8s ease-in-out infinite`,
        }
      }}>
        <Box sx={{
          transform: 'perspective(1000px) rotateX(1deg)',
          transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
          animation: `${wave} 12s ease-in-out infinite`,
          '&:hover': {
            transform: 'perspective(1000px) rotateX(-1deg) rotateY(2deg) scale(1.02)',
          }
        }}>
          <img 
            src={logo} 
            alt="SafeTrack Logo" 
            style={{ 
              width: '550px',
              height: 'auto', 
              maxWidth: '100%',
              filter: 'drop-shadow(0px 10px 20px rgba(0, 0, 0, 0.20))',
              transition: 'all 0.5s ease'
            }} 
          />
        </Box>
      </Box>
      
      {/* Professional tagline with refined animation */}
      <Typography variant="body1" sx={{ 
        mb: 7, 
        maxWidth: 700, 
        textAlign: 'center', 
        fontSize: { xs: '22px', sm: '24px', md: '28px' },
        fontWeight: 600,
        position: 'relative',
        overflow: 'hidden',
        '& span': {
          display: 'inline-block',
          background: 'linear-gradient(135deg, #1e3c72, #2a5298, #3a7bd5, #2a5298)',
          backgroundSize: '300% 300%',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          animation: `${rotateGlow} 8s infinite ease-in-out, ${textReveal} 0.9s forwards cubic-bezier(0.22, 1, 0.36, 1)`,
          lineHeight: 1.4,
          padding: '0 10px',
          textShadow: '0 2px 5px rgba(0,0,0,0.03)',
          '&::before': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, #1e3c72, transparent)',
            transform: 'scaleX(0)',
            transformOrigin: 'center',
            transition: 'transform 0.8s cubic-bezier(0.19, 1, 0.22, 1) 0.5s',
            opacity: 0.7,
          }
        },
        '&:hover span::before': {
          transform: 'scaleX(0.7)',
        }
      }}>
        <span>Ensuring Safe Food Practices with Smart Inspections</span>
      </Typography>
      
      {/* Professionally enhanced buttons */}
      <Stack spacing={4} sx={{ width: '320px' }}> 
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleOpenLogin}
          sx={{ 
            height: 64, 
            fontSize: '1.35rem', 
            fontWeight: 600,
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #3a7bd5, #4b98ec)',
            boxShadow: '0px 8px 20px rgba(58, 123, 213, 0.25), 0px 2px 4px rgba(0, 0, 0, 0.1)',
            opacity: 0,
            animation: `${slideUp} 0.7s ease-out forwards`,
            animationDelay: '0.3s',
            transition: 'all 0.4s cubic-bezier(0.33, 1, 0.68, 1)',
            overflow: 'hidden',
            position: 'relative',
            textTransform: 'none',
            letterSpacing: '0.2px',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: '-100%',
              width: '100%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
              transition: 'all 0.7s ease',
              zIndex: 1,
            },
            '&:hover': {
              transform: 'translateY(-3px)',
              boxShadow: '0px 12px 25px rgba(58, 123, 213, 0.35), 0px 3px 6px rgba(0, 0, 0, 0.1)',
              background: 'linear-gradient(135deg, #3a7bd5, #00d2ff)',
              '&::before': {
                left: '100%'
              }
            },
            '&:active': {
              transform: 'translateY(1px)',
              boxShadow: '0px 5px 15px rgba(58, 123, 213, 0.2)',
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
            height: 64, 
            fontSize: '1.35rem', 
            fontWeight: 600,
            borderRadius: '12px',
            border: '2px solid',
            borderColor: '#3a7bd5',
            color: '#3a7bd5',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            boxShadow: '0px 8px 20px rgba(58, 123, 213, 0.15), 0px 2px 4px rgba(0, 0, 0, 0.05)',
            opacity: 0,
            animation: `${slideUp} 0.7s ease-out forwards`,
            animationDelay: '0.5s',
            transition: 'all 0.4s cubic-bezier(0.33, 1, 0.68, 1)',
            position: 'relative',
            overflow: 'hidden',
            textTransform: 'none',
            letterSpacing: '0.2px',
            '&::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'linear-gradient(135deg, #3a7bd5, #4b98ec)',
              opacity: 0,
              zIndex: -1,
              transition: 'opacity 0.4s ease'
            },
            '&:hover': {
              transform: 'translateY(-3px)',
              borderColor: 'transparent',
              color: 'white',
              boxShadow: '0px 12px 25px rgba(58, 123, 213, 0.25), 0px 3px 6px rgba(0, 0, 0, 0.1)',
              '&::after': {
                opacity: 1
              }
            },
            '&:active': {
              transform: 'translateY(1px)',
              boxShadow: '0px 5px 15px rgba(58, 123, 213, 0.15)',
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
      
      {/* Register Form Modal */}
      <RegisterForm 
        open={showRegisterForm} 
        onClose={handleCloseRegister} 
      />
    </Box>
  );
};

export default HomePage;