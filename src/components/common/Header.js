import React from 'react';
import { 
  Box, 
  Typography, 
  useTheme,
  AppBar,
  Toolbar
} from '@mui/material';
import NotificationPopover from './NotificationPopover';

const Header = ({ pageTitle }) => {
  const theme = useTheme();

  return (
    <AppBar 
      position="static"
      sx={{
        borderBottom: `1px solid ${theme.palette.divider}`,
        backgroundColor: 'white',
      }}
    >
      <Toolbar>
        {/* Page Title */}
        <Typography variant="h5" fontWeight={600}>
          {pageTitle}
        </Typography>

        {/* Position the notification icon to the far right */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'flex-end', // Ensure right alignment
          flexGrow: 1, // Take up all available space
          pr: 1 // Add a bit of padding on the right
        }}>
          <NotificationPopover />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
