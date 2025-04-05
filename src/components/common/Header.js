import React from 'react';
import { Box, Typography, IconButton, Badge, Avatar } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useLocation } from 'react-router-dom';

const Header = ({ pageTitle }) => {
  const location = useLocation();
  
  // Dynamically determine page title based on current route if not provided
  const getPageTitle = () => {
    if (pageTitle) return pageTitle;
    
    const path = location.pathname;
    if (path.includes('dashboard')) return 'Dashboard';
    if (path.includes('calendar')) return 'Calendar';
    if (path.includes('inspection-log')) return 'Inspection Log';
    if (path.includes('shop-management')) return 'Shop Management';
    if (path.includes('analytics')) return 'Analytics';
    if (path.includes('profile')) return 'Profile';
    if (path.includes('settings')) return 'Settings';
    return 'SafeTrack';
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        p: 2,
        borderBottom: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper',
      }}
    >
      <Typography variant="h6" fontWeight={600}>
        {getPageTitle()}
      </Typography>
      
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <IconButton>
          <Badge badgeContent={4} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        
        <Avatar sx={{ width: 40, height: 40, bgcolor: 'primary.main' }}>
          JD
        </Avatar>
      </Box>
    </Box>
  );
};

export default Header;
