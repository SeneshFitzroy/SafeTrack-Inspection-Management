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

        <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center' }}>
          {/* Only keep the NotificationPopover - remove the duplicate notification button */}
          <NotificationPopover />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
