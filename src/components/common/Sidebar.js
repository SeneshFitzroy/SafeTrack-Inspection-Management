import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Divider, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  useTheme,
  Drawer,
  ListItemButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AssignmentIcon from '@mui/icons-material/Assignment';
import StorefrontIcon from '@mui/icons-material/Storefront';
import BarChartIcon from '@mui/icons-material/BarChart';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { alpha } from '@mui/material/styles';
import logoImage from '../../assets/logo.png';
import Logo from '../../assets/Logo';

const Sidebar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const handleLogout = () => {
    // First clear all authentication data
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('user');
    
    // Set the logged out flag
    sessionStorage.setItem('loggedOut', 'true');
    
    // Use direct window location change to force a complete page reload
    // This is more reliable than navigate() for logout scenarios
    window.location.href = '/';
  };

  const handleLogoutClick = (e) => {
    e.preventDefault();
    setLogoutDialogOpen(true);
  };

  useEffect(() => {
    // Add the fade-out animation CSS
    const style = document.createElement('style');
    style.textContent = `
      .fade-out {
        opacity: 0;
        transition: opacity 0.3s ease-out;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  // Determine active route for highlighting
  const getActiveRoute = () => {
    const path = location.pathname;
    if (path.includes('/dashboard')) return 'dashboard';
    if (path.includes('/calendar')) return 'calendar';
    if (path.includes('/inspection-log')) return 'inspection-log';
    if (path.includes('/shop-management')) return 'shop-management';
    if (path.includes('/analytics')) return 'analytics';
    if (path.includes('/profile')) return 'profile';
    if (path.includes('/settings')) return 'settings';
    if (path.includes('/ai-assistant')) return 'ai-assistant';
    return 'dashboard';
  };
  
  const activeRoute = getActiveRoute();
  
  // Navigation items
  const navItems = [
    { 
      text: 'Dashboard', 
      icon: <DashboardIcon />, 
      path: '/dashboard', 
      id: 'dashboard' 
    },
    { 
      text: 'Calendar', 
      icon: <CalendarMonthIcon />, 
      path: '/calendar', 
      id: 'calendar' 
    },
    { 
      text: 'Inspection Log', 
      icon: <AssignmentIcon />, 
      path: '/inspection-log', 
      id: 'inspection-log' 
    },
    { 
      text: 'Shop Management', 
      icon: <StorefrontIcon />, 
      path: '/shop-management', 
      id: 'shop-management' 
    },
    { 
      text: 'Analytics', 
      icon: <BarChartIcon />, 
      path: '/analytics', 
      id: 'analytics' 
    },
    { 
      text: 'AI Assistant', 
      icon: <SmartToyIcon />, 
      path: '/ai-assistant', 
      id: 'ai-assistant' 
    },
  ];
  
  // Account related items
  const accountItems = [
    { 
      text: 'Profile', 
      icon: <PersonIcon />, 
      path: '/profile', 
      id: 'profile' 
    },
    { 
      text: 'Settings', 
      icon: <SettingsIcon />, 
      path: '/settings', 
      id: 'settings' 
    },
  ];
  
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 250,
        height: '100%',
        boxShadow: '0 0 15px rgba(0, 0, 0, 0.05)',
        backgroundColor: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
      }}
    >
      {/* Logo Section */}
      <Box 
        sx={{ 
          p: 2.5, 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center' 
        }}
      >
        <Box
          component="img"
          src={logoImage}
          alt="SafeTrack Logo"
          sx={{ 
            height: 45,
            objectFit: 'contain'
          }}
        />
      </Box>
      
      <Divider />
      
      {/* Main Navigation */}
      <List sx={{ px: 1, py: 2 }}>
        {navItems.map((item) => (
          <ListItem
            button
            key={item.id}
            onClick={() => handleNavigation(item.path)}
            sx={{
              borderRadius: 1,
              mb: 0.5,
              backgroundColor: activeRoute === item.id ? 'primary.main' : 'transparent',
              color: activeRoute === item.id ? 'white' : 'text.primary',
              '&:hover': {
                backgroundColor: activeRoute === item.id ? 'primary.dark' : 'rgba(0, 0, 0, 0.04)',
              },
              py: 0.75,
            }}
          >
            <ListItemIcon 
              sx={{ 
                minWidth: 40, 
                color: activeRoute === item.id ? 'white' : 'text.secondary' 
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.text} 
              primaryTypographyProps={{ 
                fontWeight: activeRoute === item.id ? 600 : 400,
                fontSize: '0.9rem'
              }}
            />
          </ListItem>
        ))}
      </List>
      
      <Divider sx={{ mt: 'auto' }} />
      
      {/* Account Section */}
      <List sx={{ px: 1, py: 2 }}>
        {accountItems.map((item) => (
          <ListItem
            button
            key={item.id}
            onClick={() => handleNavigation(item.path)}
            sx={{
              borderRadius: 1,
              mb: 0.5,
              backgroundColor: activeRoute === item.id ? 'primary.main' : 'transparent',
              color: activeRoute === item.id ? 'white' : 'text.primary',
              '&:hover': {
                backgroundColor: activeRoute === item.id ? 'primary.dark' : 'rgba(0, 0, 0, 0.04)',
              },
              py: 0.75,
            }}
          >
            <ListItemIcon 
              sx={{ 
                minWidth: 40, 
                color: activeRoute === item.id ? 'white' : 'text.secondary' 
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.text} 
              primaryTypographyProps={{ 
                fontWeight: activeRoute === item.id ? 600 : 400,
                fontSize: '0.9rem'
              }}
            />
          </ListItem>
        ))}
      </List>

      <Box sx={{ flexGrow: 1 }} />
      <Divider sx={{ my: 1 }} />
      
      <ListItem 
        disablePadding 
        sx={{ 
          mt: 'auto',
          mb: 2
        }}
      >
        <ListItemButton
          onClick={handleLogoutClick}
          sx={{
            py: 1.2,
            color: 'error.main',
            '&:hover': {
              bgcolor: 'rgba(211, 47, 47, 0.04)',
            }
          }}
        >
          <ListItemIcon sx={{ minWidth: 40, color: 'error.main' }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText 
            primary="Logout" 
            primaryTypographyProps={{ 
              fontWeight: 500,
              color: 'error.main'
            }} 
          />
        </ListItemButton>
      </ListItem>

      <Dialog
        open={logoutDialogOpen}
        onClose={() => setLogoutDialogOpen(false)}
        aria-labelledby="logout-dialog-title"
      >
        <DialogTitle id="logout-dialog-title">
          Confirm Logout
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 2 }}>
            <Logo width={60} height={60} />
            <DialogContentText sx={{ mt: 2, textAlign: 'center' }}>
              Are you sure you want to log out of SafeTrack?
            </DialogContentText>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLogoutDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleLogout} color="error" variant="contained" autoFocus>
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </Drawer>
  );
};

export default Sidebar;
