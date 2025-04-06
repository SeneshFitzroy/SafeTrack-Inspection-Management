import React, { useState } from 'react';
import { Box, Typography, Paper, Button, Dialog, DialogTitle, DialogContent, 
  DialogActions, CircularProgress, Backdrop, Fade, DialogContentText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Header from './common/Header';
import Sidebar from './common/Sidebar';
import LogoutIcon from '@mui/icons-material/Logout';

const PlaceholderPage = ({ title }) => {
  const navigate = useNavigate();
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  
  const openLogoutDialog = () => {
    setLogoutDialogOpen(true);
  };
  
  const closeLogoutDialog = () => {
    setLogoutDialogOpen(false);
  };
  
  const handleLogout = () => {
    setLoggingOut(true);
    
    // Create a more professional logout experience with a short delay
    setTimeout(() => {
      // Clear authentication data
      localStorage.removeItem('authToken');
      sessionStorage.removeItem('user');
      sessionStorage.setItem('loggedOut', 'true');
      
      // Save logout timestamp for showing "you've been logged out for X minutes" on login screen
      sessionStorage.setItem('logoutTime', new Date().toISOString());
      
      // Redirect to home page
      window.location.href = '/';
    }, 1000); // Short delay for visual feedback
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', bgcolor: '#F5F8FF' }}>
      <Sidebar onLogout={openLogoutDialog} />
      
      <Box sx={{ 
        flex: 1, 
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <Header pageTitle={title} onLogout={openLogoutDialog} />
        
        <Box sx={{ p: 3, flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Paper 
            elevation={3} 
            sx={{ 
              p: 4, 
              maxWidth: 600, 
              textAlign: 'center',
              borderRadius: 2,
              bgcolor: 'white',
              border: '1px solid rgba(0,0,0,0.05)'
            }}
          >
            <Typography variant="h4" component="h1" sx={{ mb: 2, color: 'primary.main', fontWeight: 600 }}>
              {title} Page
            </Typography>
            
            <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
              This page is currently under development. Please check back later for updates.
            </Typography>
            
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
              <Button 
                variant="contained" 
                onClick={() => navigate('/dashboard')}
                sx={{ borderRadius: 2 }}
              >
                Go to Dashboard
              </Button>
              
              <Button 
                variant="outlined" 
                onClick={() => navigate('/ai-assistant')}
                sx={{ borderRadius: 2 }}
              >
                Ask AI Assistant
              </Button>
            </Box>
          </Paper>
        </Box>
      </Box>
      
      {/* Enhanced Logout Confirmation Dialog */}
      <Dialog 
        open={logoutDialogOpen} 
        onClose={closeLogoutDialog}
        TransitionComponent={Fade}
        transitionDuration={300}
        PaperProps={{ 
          sx: { 
            borderRadius: 3,
            boxShadow: '0 12px 28px rgba(0,0,0,0.15), 0 6px 12px rgba(0,0,0,0.12)',
            maxWidth: '450px',
            overflow: 'hidden'
          } 
        }}
      >
        <Box sx={{
          p: 0.5,
          background: 'linear-gradient(90deg, #d32f2f, #f44336)',
          mb: -1
        }}/>
        
        <DialogTitle sx={{ 
          py: 2.5,
          px: 3, 
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          borderBottom: '1px solid rgba(0,0,0,0.08)',
          fontSize: '1.3rem'
        }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            bgcolor: 'rgba(211, 47, 47, 0.1)', 
            p: 1,
            borderRadius: '50%'
          }}>
            <LogoutIcon color="error" fontSize="medium" />
          </Box>
          Log Out of SafeTrack
        </DialogTitle>
        
        <DialogContent sx={{ mt: 2, pt: 1, px: 3 }}>
          <DialogContentText sx={{ mb: 1, color: 'text.primary', fontWeight: 500 }}>
            Are you sure you want to log out?
          </DialogContentText>
          <DialogContentText sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
            Your session will be ended and you'll need to log in again to access the system. Any unsaved changes may be lost.
          </DialogContentText>
        </DialogContent>
        
        <DialogActions sx={{ px: 3, py: 3, borderTop: '1px solid rgba(0,0,0,0.05)', mt: 1 }}>
          <Button 
            onClick={closeLogoutDialog} 
            variant="outlined"
            size="large"
            sx={{ 
              borderRadius: 2, 
              px: 3,
              py: 1.2,
              borderWidth: 1.5,
              fontWeight: 500,
              textTransform: 'none',
              '&:hover': {
                borderWidth: 1.5
              }
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleLogout} 
            variant="contained" 
            color="error"
            startIcon={loggingOut ? null : <LogoutIcon />}
            endIcon={loggingOut ? <CircularProgress size={16} color="inherit" /> : null}
            disabled={loggingOut}
            size="large"
            sx={{ 
              borderRadius: 2, 
              px: 3,
              py: 1.2,
              ml: 1.5,
              boxShadow: '0 4px 10px rgba(211, 47, 47, 0.2)',
              fontWeight: 500,
              textTransform: 'none',
              '&:hover': {
                boxShadow: '0 6px 15px rgba(211, 47, 47, 0.25)'
              }
            }}
          >
            {loggingOut ? 'Logging Out...' : 'Log Out'}
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Enhanced Logout Progress Backdrop */}
      <Backdrop
        sx={{ 
          zIndex: (theme) => theme.zIndex.drawer + 1,
          color: '#fff',
          flexDirection: 'column',
          gap: 3,
          backdropFilter: 'blur(3px)',
          background: 'rgba(0,0,0,0.7)'
        }}
        open={loggingOut}
        transitionDuration={400}
      >
        <CircularProgress color="inherit" size={60} thickness={4} />
        <Typography variant="h6" sx={{ 
          fontWeight: 500,
          textShadow: '0 2px 4px rgba(0,0,0,0.3)',
          letterSpacing: 0.5
        }}>
          Logging you out...
        </Typography>
      </Backdrop>
    </Box>
  );
};

export default PlaceholderPage;
