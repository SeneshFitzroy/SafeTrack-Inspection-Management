import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  IconButton, 
  Badge, 
  Menu, 
  MenuItem, 
  Divider, 
  ListItemIcon, 
  ListItemText,
  Avatar,
  Paper,
  InputBase,
  Tooltip,
  Button,
  Breadcrumbs,
  Link,
  Popover,
  List,
  ListItem
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';

export const Header = ({ pageTitle = "Dashboard" }) => {
  const theme = useTheme();
  
  // State management for menus
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElNotifications, setAnchorElNotifications] = useState(null);
  
  // Demo notifications
  const notifications = [
    { id: 1, text: 'New inspection scheduled for Golden Restaurant', time: '15 mins ago', read: false },
    { id: 2, text: 'Critical risk alert: City Supermarket', time: '2 hours ago', read: false },
    { id: 3, text: 'Inspection report #INS-2023-085 is ready', time: '1 day ago', read: true },
    { id: 4, text: 'System update scheduled for tomorrow', time: '2 days ago', read: true }
  ];

  // Mock breadcrumbs based on page title
  const breadcrumbItems = () => {
    switch(pageTitle.toLowerCase()) {
      case 'dashboard':
        return [
          <Link underline="hover" key="1" color="inherit" href="/">
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Home
          </Link>,
          <Typography key="2" color="text.primary">Dashboard</Typography>
        ];
      case 'inspection log':
        return [
          <Link underline="hover" key="1" color="inherit" href="/">
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Home
          </Link>,
          <Link underline="hover" key="2" color="inherit" href="/inspections">
            Inspections
          </Link>,
          <Typography key="3" color="text.primary">Log</Typography>
        ];
      default:
        return [
          <Link underline="hover" key="1" color="inherit" href="/">
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Home
          </Link>,
          <Typography key="2" color="text.primary">{pageTitle}</Typography>
        ];
    }
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenNotificationsMenu = (event) => {
    setAnchorElNotifications(event.currentTarget);
  };

  const handleCloseNotificationsMenu = () => {
    setAnchorElNotifications(null);
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Paper
        elevation={0}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 2,
          mb: 2,
          borderRadius: 2,
          background: 'transparent',
        }}
      >
        {/* Page Title and Breadcrumbs */}
        <Box>
          <Breadcrumbs 
            separator={<NavigateNextIcon fontSize="small" />} 
            aria-label="breadcrumb"
            sx={{ mb: 1 }}
          >
            {breadcrumbItems()}
          </Breadcrumbs>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            {pageTitle}
          </Typography>
        </Box>

        {/* Right side controls */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* Search Bar */}
          <Paper
            component="form"
            sx={{
              p: '2px 4px',
              display: 'flex',
              alignItems: 'center',
              width: 300,
              height: 40,
              borderRadius: 20,
              border: `1px solid ${theme.palette.divider}`,
              mr: 1
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search..."
              inputProps={{ 'aria-label': 'search' }}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>

          {/* Create Button */}
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              boxShadow: 'none',
              height: 40,
              fontWeight: 500
            }}
          >
            New Inspection
          </Button>

          {/* Notifications */}
          <Tooltip title="Notifications">
            <IconButton 
              onClick={handleOpenNotificationsMenu}
              size="large" 
              sx={{ 
                bgcolor: 'background.paper',
                boxShadow: `0 2px 10px 0 ${theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.1)'}`,
                '&:hover': {
                  bgcolor: 'background.paper',
                }
              }}
            >
              <Badge badgeContent={notifications.filter(n => !n.read).length} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>
          
          {/* User Menu */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleOpenUserMenu}
                size="small"
                sx={{ ml: 1 }}
              >
                <Avatar 
                  alt="Leo Perera"
                  src="/static/images/avatar/1.jpg" 
                  sx={{ width: 40, height: 40 }}
                />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Paper>

      {/* User Menu Dropdown */}
      <Menu
        anchorEl={anchorElUser}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
        PaperProps={{
          elevation: 2,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.1))',
            mt: 1.5,
            minWidth: 200,
            borderRadius: 2,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Leo Perera</Typography>
          <Typography variant="body2" color="textSecondary">PHI Officer</Typography>
        </Box>
        <Divider />
        <MenuItem onClick={handleCloseUserMenu}>
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>My Profile</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleCloseUserMenu}>
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Settings</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleCloseUserMenu} sx={{ color: 'error.main' }}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>

      {/* Notifications Dropdown */}
      <Popover
        open={Boolean(anchorElNotifications)}
        anchorEl={anchorElNotifications}
        onClose={handleCloseNotificationsMenu}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          elevation: 2,
          sx: {
            width: 360,
            borderRadius: 2,
            mt: 1,
            overflow: 'hidden',
          },
        }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: 'primary.main', color: 'primary.contrastText' }}>
          <Typography variant="h6">Notifications</Typography>
          <Button size="small" sx={{ color: 'inherit' }}>Mark all as read</Button>
        </Box>
        <List sx={{ py: 0, maxHeight: 350, overflowY: 'auto' }}>
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <React.Fragment key={notification.id}>
                <ListItem 
                  button 
                  alignItems="flex-start"
                  sx={{ 
                    py: 2,
                    backgroundColor: notification.read ? 'inherit' : 'rgba(84, 121, 255, 0.05)',
                    borderLeft: notification.read ? 'none' : `3px solid ${theme.palette.primary.main}`,
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.04)',
                    }
                  }}
                >
                  <Box sx={{ mr: 2 }}>
                    <Avatar sx={{ bgcolor: notification.read ? theme.palette.grey[300] : theme.palette.primary.main }}>
                      <NotificationsIcon />
                    </Avatar>
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body1">{notification.text}</Typography>
                    <Typography variant="caption" color="textSecondary">{notification.time}</Typography>
                  </Box>
                </ListItem>
                <Divider component="li" />
              </React.Fragment>
            ))
          ) : (
            <ListItem>
              <ListItemText primary="No notifications" />
            </ListItem>
          )}
        </List>
        <Box sx={{ p: 1, display: 'flex', justifyContent: 'center' }}>
          <Button color="primary" size="small">View All</Button>
        </Box>
      </Popover>
    </Box>
  );
};
