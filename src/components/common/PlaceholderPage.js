import React from 'react';
import { 
  Box, 
  Typography, 
  Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ConstructionIcon from '@mui/icons-material/Construction';
import Header from './Header';
import Sidebar from './Sidebar';

const PlaceholderPage = ({ title }) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex', height: '100vh', bgcolor: '#F5F8FF' }}>
      {/* Shared Sidebar Component */}
      <Sidebar />
      
      {/* Main Content */}
      <Box sx={{ 
        flex: 1, 
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Header */}
        <Header pageTitle={title} />
        
        {/* Placeholder Content */}
        <Box sx={{ 
          p: 4, 
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <ConstructionIcon sx={{ fontSize: 80, color: 'text.disabled', mb: 3 }} />
          <Typography variant="h4" color="text.secondary" gutterBottom>
            {title} Page
          </Typography>
          <Typography variant="body1" color="text.secondary" align="center" sx={{ maxWidth: 500, mb: 4 }}>
            This page is under construction. The functionality for {title} will be implemented in a future update.
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => navigate('/dashboard')}
          >
            Return to Dashboard
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default PlaceholderPage;
