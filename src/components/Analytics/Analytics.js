import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Tabs, 
  Tab, 
  Paper,
  Container,
  Divider
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AnalyticsIcon from '@mui/icons-material/BarChart';
import AssessmentIcon from '@mui/icons-material/Assessment';
import WarningIcon from '@mui/icons-material/Warning';
import CategoryIcon from '@mui/icons-material/Category';
import Header from '../common/Header';
import Sidebar from '../common/Sidebar';
import TotalInspections from './TotalInspections';
import HighRiskShops from './HighRiskShops';
import CategoryAnalytics from './CategoryAnalytics';

const Analytics = () => {
  const theme = useTheme();
  const [currentTab, setCurrentTab] = useState(0);
  
  // Keep the month and year state for passing to child components
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#F5F8FF' }}>
      <Sidebar />
      
      <Box sx={{ flexGrow: 1, overflow: 'auto', p: 0 }}>
        <Header pageTitle="Analytics Overview" />
        
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
          <Paper 
            elevation={2}
            sx={{ 
              p: 0, 
              borderRadius: 3, 
              mb: 3,
              overflow: 'hidden',
              boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
            }}
          >
            {/* Dashboard Header */}
            <Box 
              sx={{ 
                p: 3, 
                background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                display: 'flex', 
                alignItems: 'center',
              }}
            >
              <AnalyticsIcon sx={{ color: 'white', fontSize: 28, mr: 2 }} />
              <Typography variant="h5" fontWeight="bold" color="white">
                Analytics Dashboard
              </Typography>
            </Box>
            
            <Divider />
            
            {/* Enhanced Tabs */}
            <Tabs 
              value={currentTab} 
              onChange={handleTabChange}
              variant="fullWidth"
              sx={{ 
                '& .MuiTab-root': {
                  fontWeight: 500,
                  fontSize: '1rem',
                  py: 2.5,
                  textTransform: 'none',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    bgcolor: 'rgba(0, 0, 0, 0.02)'
                  }
                },
                '& .Mui-selected': {
                  fontWeight: 700,
                }
              }}
              TabIndicatorProps={{
                sx: { height: 3, borderTopLeftRadius: 3, borderTopRightRadius: 3 }
              }}
            >
              <Tab 
                label="Total Inspections" 
                icon={<AssessmentIcon />} 
                iconPosition="start"
              />
              <Tab 
                label="High-Risk Level Shops" 
                icon={<WarningIcon />} 
                iconPosition="start"
              />
              <Tab 
                label="Category Analytics" 
                icon={<CategoryIcon />} 
                iconPosition="start"
              />
            </Tabs>
          </Paper>
          
          <Box sx={{ px: 0.5 }}>
            {currentTab === 0 && (
              <TotalInspections month={month} year={year} monthName={months[month]} />
            )}
            {currentTab === 1 && (
              <HighRiskShops month={month} year={year} monthName={months[month]} />
            )}
            {currentTab === 2 && (
              <CategoryAnalytics month={month} year={year} monthName={months[month]} />
            )}
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Analytics;
