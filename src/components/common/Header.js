import React from 'react';
import { 
  Box, 
  Typography, 
  IconButton, 
  Badge,
  Tooltip,
  useTheme
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';

const Header = ({ pageTitle }) => {
  const theme = useTheme();

  return (
    <Box 
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        p: 2,
        borderBottom: `1px solid ${theme.palette.divider}`,
        backgroundColor: 'white',
      }}
    >
      {/* Page Title */}
      <Typography variant="h5" fontWeight={600}>
        {pageTitle}
      </Typography>

      {/* Notifications Only - Removed profile icon */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Tooltip title="Notifications">
          <IconButton
            size="medium"
            sx={{ 
              ml: 1,
              color: theme.palette.text.secondary,
              '&:hover': { color: theme.palette.primary.main }
            }}
          >
            <Badge badgeContent={3} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default Header;
