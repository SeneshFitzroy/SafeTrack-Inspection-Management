import React, { useState } from 'react';
import { 
  Box, 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  ListItemButton,
  Divider, 
  Typography, 
  IconButton,
  Avatar,
  Collapse,
  Tooltip,
  useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import StorefrontIcon from '@mui/icons-material/Storefront';
import BarChartIcon from '@mui/icons-material/BarChart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ListIcon from '@mui/icons-material/List';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import logo from '../../assets/logo.png'; // Make sure to have your logo in this path

export const Sidebar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [open, setOpen] = useState(!isMobile);
  const [openSubMenu, setOpenSubMenu] = useState({
    inspections: false,
    shops: false
  });

  const [activePath, setActivePath] = useState('/dashboard');

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleSubMenuToggle = (menu) => {
    setOpenSubMenu({
      ...openSubMenu,
      [menu]: !openSubMenu[menu]
    });
  };

  const handleNavigation = (path) => {
    setActivePath(path);
    if (isMobile) {
      setOpen(false);
    }
  };

  const drawerWidth = open ? 260 : 70;

  const menuItems = [
    { 
      text: 'Dashboard', 
      icon: <DashboardIcon />, 
      path: '/dashboard',
      onClick: () => handleNavigation('/dashboard')
    },
    { 
      text: 'Inspections', 
      icon: <AssignmentIcon />, 
      hasSubMenu: true,
      open: openSubMenu.inspections,
      onClick: () => handleSubMenuToggle('inspections'),
      subItems: [
        { 
          text: 'New Inspection', 
          icon: <AddCircleOutlineIcon />, 
          path: '/inspections/new',
          onClick: () => handleNavigation('/inspections/new')
        },
        { 
          text: 'Inspection Log', 
          icon: <ListIcon />, 
          path: '/inspections/log',
          onClick: () => handleNavigation('/inspections/log')
        },
        { 
          text: 'Pending', 
          icon: <AccessTimeIcon />, 
          path: '/inspections/pending',
          onClick: () => handleNavigation('/inspections/pending')
        }
      ]
    },
    { 
      text: 'Shop Management', 
      icon: <StorefrontIcon />, 
      hasSubMenu: true,
      open: openSubMenu.shops,
      onClick: () => handleSubMenuToggle('shops'),
      subItems: [
        { 
          text: 'All Shops', 
          icon: <ListIcon />, 
          path: '/shops/all',
          onClick: () => handleNavigation('/shops/all')
        },
        { 
          text: 'Add Shop', 
          icon: <AddCircleOutlineIcon />, 
          path: '/shops/add',
          onClick: () => handleNavigation('/shops/add')
        }
      ]
    },
    { 
      text: 'Analytics', 
      icon: <BarChartIcon />, 
      path: '/analytics',
      onClick: () => handleNavigation('/analytics')
    },
    { 
      text: 'Profile', 
      icon: <AccountCircleIcon />, 
      path: '/profile',
      onClick: () => handleNavigation('/profile')
    },
    { 
      text: 'Settings', 
      icon: <SettingsIcon />, 
      path: '/settings',
      onClick: () => handleNavigation('/settings')
    }
  ];

  const drawer = (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: open ? 'space-between' : 'center',
          padding: open ? theme.spacing(2) : theme.spacing(1),
          minHeight: 64
        }}
      >
        {open ? (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img src={logo} alt="SafeTrack Logo" style={{ height: 40, marginRight: 8 }} />
            <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 'bold' }}>
              SafeTrack
            </Typography>
          </Box>
        ) : (
          <img src={logo} alt="SafeTrack Logo" style={{ height: 30 }} />
        )}
        <IconButton onClick={handleDrawerToggle} sx={{ display: { sm: 'none', xs: 'block' } }}>
          <MenuIcon />
        </IconButton>
      </Box>
      <Divider />
      
      {/* User Info Section */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: open ? 'row' : 'column',
          alignItems: 'center',
          padding: theme.spacing(2),
          gap: 1
        }}
      >
        <Avatar 
          alt="User Photo" 
          src="/static/images/avatar/1.jpg" 
          sx={{ 
            width: open ? 40 : 36, 
            height: open ? 40 : 36,
            border: `2px solid ${theme.palette.primary.main}`
          }} 
        />
        {open && (
          <Box sx={{ ml: 1 }}>
            <Typography variant="subtitle2" noWrap>Leo Perera</Typography>
            <Typography variant="caption" color="textSecondary">PHI Officer</Typography>
          </Box>
        )}
      </Box>
      <Divider />
      
      {/* Menu Items */}
      <List component="nav" sx={{ pt: 1 }}>
        {menuItems.map((item, index) => (
          <Box key={item.text}>
            <ListItemButton
              selected={activePath === item.path}
              onClick={item.onClick}
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
                borderRadius: open ? '10px' : '50%',
                mx: open ? 1 : 'auto',
                my: 0.5,
                '&.Mui-selected': {
                  backgroundColor: 'rgba(84, 121, 255, 0.1)',
                  color: 'primary.main',
                  '&:hover': {
                    backgroundColor: 'rgba(84, 121, 255, 0.2)',
                  },
                  '& .MuiListItemIcon-root': {
                    color: 'primary.main',
                  }
                }
              }}
            >
              <Tooltip title={open ? '' : item.text} placement="right">
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 2 : 'auto',
                    justifyContent: 'center',
                    color: activePath === item.path ? 'primary.main' : 'inherit'
                  }}
                >
                  {item.icon}
                </ListItemIcon>
              </Tooltip>
              {open && (
                <>
                  <ListItemText 
                    primary={item.text}
                    primaryTypographyProps={{
                      fontWeight: activePath === item.path ? 600 : 400
                    }} 
                  />
                  {item.hasSubMenu && (openSubMenu[item.text.toLowerCase().split(' ')[0]] ? <ExpandLess /> : <ExpandMore />)}
                </>
              )}
            </ListItemButton>
            
            {item.hasSubMenu && open && (
              <Collapse in={item.open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.subItems.map((subItem) => (
                    <ListItemButton
                      key={subItem.text}
                      selected={activePath === subItem.path}
                      onClick={subItem.onClick}
                      sx={{
                        minHeight: 40,
                        pl: 4,
                        borderRadius: '10px',
                        mx: 1,
                        '&.Mui-selected': {
                          backgroundColor: 'rgba(84, 121, 255, 0.1)',
                          color: 'primary.main',
                          '& .MuiListItemIcon-root': {
                            color: 'primary.main',
                          }
                        }
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: 2,
                          fontSize: '1.2rem',
                          color: activePath === subItem.path ? 'primary.main' : 'inherit'
                        }}
                      >
                        {subItem.icon}
                      </ListItemIcon>
                      <ListItemText 
                        primary={subItem.text}
                        primaryTypographyProps={{
                          fontWeight: activePath === subItem.path ? 600 : 400,
                          fontSize: '0.9rem'
                        }} 
                      />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            )}
          </Box>
        ))}
      </List>
      
      <Box sx={{ flexGrow: 1 }} />
      
      {/* Logout Section */}
      <Box sx={{ p: open ? 2 : 1 }}>
        <Divider sx={{ mb: 1 }} />
        <ListItemButton
          sx={{
            minHeight: 48,
            justifyContent: open ? 'initial' : 'center',
            px: 2.5,
            borderRadius: open ? '10px' : '50%',
            mx: open ? 1 : 'auto',
            '&:hover': {
              backgroundColor: 'rgba(211, 47, 47, 0.1)',
            },
          }}
        >
          <Tooltip title={open ? '' : 'Logout'} placement="right">
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 2 : 'auto',
                justifyContent: 'center',
                color: 'error.main'
              }}
            >
              <LogoutIcon />
            </ListItemIcon>
          </Tooltip>
          {open && (
            <ListItemText primary="Logout" sx={{ color: 'error.main' }} />
          )}
        </ListItemButton>
      </Box>
    </>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={isMobile ? open : false}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better mobile performance
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { 
            width: 260,
            boxSizing: 'border-box',
            borderRight: `1px solid ${theme.palette.divider}`,
            backgroundColor: theme.palette.background.paper,
          },
        }}
      >
        {drawer}
      </Drawer>
      
      {/* Desktop drawer */}
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { 
            width: drawerWidth,
            boxSizing: 'border-box',
            borderRight: `1px solid ${theme.palette.divider}`,
            backgroundColor: theme.palette.background.paper,
            overflowX: 'hidden',
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          },
        }}
      >
        {drawer}
      </Drawer>
      
      {/* Toggle button for desktop */}
      {!isMobile && (
        <IconButton
          onClick={handleDrawerToggle}
          sx={{
            position: 'fixed',
            bottom: 20,
            left: open ? drawerWidth - 14 : drawerWidth - 14,
            zIndex: theme.zIndex.drawer + 1,
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white,
            width: 28,
            height: 28,
            boxShadow: '0 3px 5px 2px rgba(0, 0, 0, 0.1)',
            transition: theme.transitions.create(['left'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
            '&:hover': {
              backgroundColor: theme.palette.primary.dark,
            },
          }}
        >
          {open ? <MenuIcon fontSize="small" /> : <MenuIcon fontSize="small" />}
        </IconButton>
      )}
    </Box>
  );
};
