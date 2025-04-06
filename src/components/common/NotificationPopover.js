import React, { useState } from 'react';
import {
  Popover,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Button,
  Badge,
  IconButton,
  Tabs,
  Tab,
  Chip,
  Tooltip,
  alpha
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import ScheduleIcon from '@mui/icons-material/Schedule';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AssignmentIcon from '@mui/icons-material/Assignment';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { useNavigate } from 'react-router-dom';

// Styled components
const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -2,
    top: 2,
    backgroundColor: theme.palette.error.main,
    padding: '0 4px',
    fontSize: '0.65rem',
    fontWeight: 'bold',
    minWidth: '18px',
    height: '18px',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    animation: 'pulse 2s infinite',
    '@keyframes pulse': {
      '0%': {
        boxShadow: `0 0 0 0 ${alpha(theme.palette.error.main, 0.7)}`,
      },
      '70%': {
        boxShadow: `0 0 0 6px ${alpha(theme.palette.error.main, 0)}`,
      },
      '100%': {
        boxShadow: `0 0 0 0 ${alpha(theme.palette.error.main, 0)}`,
      },
    },
  },
}));

const NotificationCard = styled(Box)(({ theme, severity }) => {
  const bgColors = {
    success: alpha(theme.palette.success.main, 0.1),
    warning: alpha(theme.palette.warning.main, 0.1),
    error: alpha(theme.palette.error.main, 0.1),
    info: alpha(theme.palette.info.main, 0.1),
  };
  
  const borderColors = {
    success: alpha(theme.palette.success.main, 0.4),
    warning: alpha(theme.palette.warning.main, 0.4),
    error: alpha(theme.palette.error.main, 0.4),
    info: alpha(theme.palette.info.main, 0.4),
  };
  
  return {
    backgroundColor: bgColors[severity] || bgColors.info,
    borderLeft: `4px solid ${borderColors[severity] || borderColors.info}`,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1.5),
    marginBottom: theme.spacing(1),
    transition: 'all 0.2s ease',
    cursor: 'pointer',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    }
  };
});

const EmptyStateBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(4),
  color: theme.palette.text.secondary,
  textAlign: 'center',
}));

// Sample notification data
const mockNotifications = [
  {
    id: 1,
    title: 'Upcoming Inspection',
    message: 'You have a scheduled inspection at Fresh Market Groceries tomorrow at 10:00 AM.',
    time: '2 hours ago',
    severity: 'info',
    type: 'schedule',
    read: false,
    relatedTo: {
      type: 'inspection',
      id: 13250
    }
  },
  {
    id: 2,
    title: 'High Risk Alert',
    message: 'Easy Tech Store has been marked as high risk after recent inspection.',
    time: '5 hours ago',
    severity: 'error',
    type: 'alert',
    read: false,
    relatedTo: {
      type: 'shop',
      id: 155
    }
  },
  {
    id: 3,
    title: 'Inspection Completed',
    message: 'Inspection #13245 at Family Pharmacy has been successfully completed.',
    time: '1 day ago',
    severity: 'success',
    type: 'success',
    read: true,
    relatedTo: {
      type: 'inspection',
      id: 13245
    }
  },
  {
    id: 4,
    title: 'Follow-up Required',
    message: 'A follow-up inspection is required for Tech Haven Electronics within 14 days.',
    time: '2 days ago',
    severity: 'warning',
    type: 'alert',
    read: true,
    relatedTo: {
      type: 'shop',
      id: 132
    }
  },
  {
    id: 5,
    title: 'System Update',
    message: 'SafeTrack has been updated to version 2.5. Check out the new features!',
    time: '3 days ago',
    severity: 'info',
    type: 'system',
    read: true,
    relatedTo: {
      type: 'system',
      id: null
    }
  }
];

const NotificationPopover = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState(mockNotifications);
  const [tabValue, setTabValue] = useState(0);

  const unreadCount = notifications.filter(n => !n.read).length;
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  const handleMarkAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };
  
  const handleClearAll = () => {
    setNotifications([]);
  };
  
  const handleNotificationClick = (notification) => {
    // Mark as read
    setNotifications(prev => 
      prev.map(n => n.id === notification.id ? { ...n, read: true } : n)
    );
    
    // Navigate based on notification type
    if (notification.relatedTo.type === 'inspection') {
      navigate(`/inspection-details/${notification.relatedTo.id}`);
    } else if (notification.relatedTo.type === 'shop') {
      navigate(`/shop-management?id=${notification.relatedTo.id}`);
    }
    
    handleClose();
  };
  
  const getSeverityIcon = (severity, size = 'medium') => {
    switch (severity) {
      case 'success':
        return <CheckCircleIcon fontSize={size} color="success" />;
      case 'warning':
        return <WarningIcon fontSize={size} color="warning" />;
      case 'error':
        return <ErrorIcon fontSize={size} color="error" />;
      default:
        return <InfoIcon fontSize={size} color="info" />;
    }
  };
  
  const getTypeIcon = (type) => {
    switch (type) {
      case 'schedule':
        return <CalendarTodayIcon color="primary" />;
      case 'alert':
        return <NotificationsIcon sx={{ color: theme.palette.warning.main }} />;
      case 'success':
        return <AssignmentIcon color="success" />;
      case 'system':
        return <InfoIcon color="info" />;
      default:
        return <StorefrontIcon color="primary" />;
    }
  };
  
  const filteredNotifications = tabValue === 0 
    ? notifications 
    : tabValue === 1 
      ? notifications.filter(n => !n.read) 
      : notifications.filter(n => n.read);

  const open = Boolean(anchorEl);
  const id = open ? 'notifications-popover' : undefined;

  return (
    <>
      <IconButton 
        color="inherit" 
        onClick={handleClick}
        aria-describedby={id}
        sx={{ 
          ml: 'auto', // Push to right
          color: theme.palette.primary.main,
          transition: 'transform 0.2s',
          '&:hover': { 
            color: theme.palette.primary.dark,
            transform: 'scale(1.05)',
            backgroundColor: alpha(theme.palette.primary.main, 0.08)
          },
          p: 1.2 // Slightly larger padding for better touch target
        }}
      >
        <StyledBadge badgeContent={unreadCount} color="error">
          <NotificationsIcon sx={{ fontSize: '1.5rem' }} /> {/* Slightly larger icon */}
        </StyledBadge>
      </IconButton>
      
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          sx: {
            width: 360,
            maxHeight: 500,
            boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
            borderRadius: 2,
            overflow: 'hidden',
            mt: 0.5
          }
        }}
      >
        {/* Header */}
        <Box sx={{ 
          borderBottom: `1px solid ${theme.palette.divider}`,
          backgroundColor: alpha(theme.palette.primary.main, 0.08),
          p: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Notifications
            {unreadCount > 0 && (
              <Chip 
                label={unreadCount} 
                size="small" 
                color="error" 
                sx={{ ml: 1, height: 20, fontSize: '0.75rem', fontWeight: 'bold' }}
              />
            )}
          </Typography>
          <Box>
            <Tooltip title="Mark all as read">
              <IconButton size="small" onClick={handleMarkAllAsRead} sx={{ mr: 0.5 }}>
                <DoneAllIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Clear all">
              <IconButton size="small" onClick={handleClearAll}>
                <DeleteOutlineIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
        
        {/* Tabs */}
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{ 
            borderBottom: 1, 
            borderColor: 'divider',
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 500,
              fontSize: '0.9rem',
              minHeight: 48,
            }
          }}
        >
          <Tab label="All" />
          <Tab 
            label="Unread" 
            icon={unreadCount > 0 ? <Badge color="error" badgeContent={unreadCount} sx={{ ml: 1 }} /> : null}
            iconPosition="end"
          />
          <Tab label="Read" />
        </Tabs>
        
        {/* Notification List */}
        <Box sx={{ maxHeight: 320, overflow: 'auto' }}>
          {filteredNotifications.length > 0 ? (
            <List sx={{ p: 0 }}>
              {filteredNotifications.map((notification) => (
                <React.Fragment key={notification.id}>
                  <ListItem 
                    alignItems="flex-start" 
                    sx={{ 
                      px: 2, 
                      py: 1.5,
                      backgroundColor: notification.read ? 'transparent' : alpha(theme.palette.primary.light, 0.05),
                      transition: 'background-color 0.2s ease',
                      '&:hover': {
                        backgroundColor: alpha(theme.palette.primary.light, 0.1),
                      }
                    }}
                    onClick={() => handleNotificationClick(notification)}
                    button
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ 
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        color: theme.palette.primary.main
                      }}>
                        {getTypeIcon(notification.type)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography 
                            variant="subtitle2" 
                            sx={{ 
                              fontWeight: notification.read ? 500 : 700,
                              color: notification.read ? 'text.primary' : 'primary.main'
                            }}
                          >
                            {notification.title}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {notification.time}
                          </Typography>
                        </Box>
                      }
                      secondary={
                        <>
                          <Typography
                            variant="body2"
                            color="text.primary"
                            sx={{ mt: 0.5, mb: 0.5, fontSize: '0.85rem' }}
                          >
                            {notification.message}
                          </Typography>
                          <Chip 
                            icon={getSeverityIcon(notification.severity, 'small')}
                            label={notification.severity.charAt(0).toUpperCase() + notification.severity.slice(1)}
                            size="small"
                            sx={{ 
                              mt: 0.5, 
                              height: 22,
                              fontSize: '0.7rem',
                              fontWeight: 'bold',
                              backgroundColor: alpha(theme.palette[notification.severity].light, 0.2),
                              color: theme.palette[notification.severity].dark,
                              '& .MuiChip-icon': {
                                fontSize: '0.85rem',
                                marginLeft: '4px'
                              }
                            }}
                          />
                        </>
                      }
                    />
                    {!notification.read && (
                      <Box 
                        sx={{ 
                          width: 8, 
                          height: 8, 
                          borderRadius: '50%', 
                          bgcolor: 'error.main',
                          mt: 1.5
                        }}
                      />
                    )}
                  </ListItem>
                  <Divider component="li" />
                </React.Fragment>
              ))}
            </List>
          ) : (
            <EmptyStateBox>
              <ScheduleIcon sx={{ fontSize: 48, mb: 2, opacity: 0.7 }} />
              <Typography variant="h6" gutterBottom>No notifications</Typography>
              <Typography variant="body2" color="text.secondary">
                You're all caught up! Check back later for updates.
              </Typography>
            </EmptyStateBox>
          )}
        </Box>
      </Popover>
    </>
  );
};

export default NotificationPopover;
