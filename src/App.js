import React, { useEffect } from 'react';
import { Box, CssBaseline } from '@mui/material';
import Dashboard from './components/Dashboard/Dashboard';
import Calendar from './components/Dashboard/Calendar';
import InspectionLog from './components/InspectionLog/InspectionLog';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PlaceholderPage from './components/common/PlaceholderPage';
import InspectionForm from './components/Inspection/InspectionForm';
import InspectionDetailsPanel from './components/Inspection/InspectionDetailsPanel';
import ShopManagement from './components/Shop/ShopManagement';
import Analytics from './components/Analytics/Analytics';
import TotalInspections from './components/Analytics/TotalInspections';
import HighRiskShops from './components/Analytics/HighRiskShops';
import CategoryAnalytics from './components/Analytics/CategoryAnalytics';
import Profile from './components/Profile/Profile';
import Settings from './components/Settings/Settings';
import { AppSettingsProvider } from './contexts/AppSettingsContext';
import { redirectToHomeIfNotAuthenticated, redirectToDashboardIfAuthenticated } from './utils/authUtils';
import HomePage from './pages/HomePage';
import ChatbotPage from './pages/ChatbotPage';

// Create a theme instance
const theme = createTheme({
  palette: {
    primary: {
      main: 'rgba(84, 121, 255, 1)', // #5479FF
      light: 'rgba(132, 159, 255, 1)',
      dark: 'rgba(59, 85, 179, 1)',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: 'rgba(241, 245, 254, 1)', // #F1F5FE
    },
    error: {
      main: 'rgba(211, 47, 47, 1)', // #D32F2F
      light: 'rgba(229, 115, 115, 1)',
    },
    warning: {
      main: 'rgba(255, 152, 0, 1)', // #FF9800
      light: 'rgba(255, 183, 77, 1)',
    },
    success: {
      main: 'rgba(46, 125, 50, 1)', // #2E7D32
      light: 'rgba(129, 199, 132, 1)',
    },
    info: {
      main: 'rgba(2, 136, 209, 1)', // #0288D1
      light: 'rgba(79, 195, 247, 1)',
    },
    text: {
      primary: 'rgba(33, 33, 33, 1)', // #212121
      secondary: 'rgba(117, 117, 117, 1)', // #757575
    },
    background: {
      default: '#F5F5F5',
      paper: '#FFFFFF',
    },
    divider: 'rgba(0, 0, 0, 0.12)',
  },
  typography: {
    fontFamily: "'Poppins', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
  },
});

function App() {
  useEffect(() => {
    // Debug environment variables
    console.log("Environment variables check:");
    console.log("REACT_APP_OPENAI_API_KEY exists:", !!process.env.REACT_APP_OPENAI_API_KEY);
    if (process.env.REACT_APP_OPENAI_API_KEY) {
      console.log("API key length:", process.env.REACT_APP_OPENAI_API_KEY.length);
    }

    // Prevent infinite redirection loops
    const pageLoads = parseInt(sessionStorage.getItem('pageLoadCount') || '0') + 1;
    sessionStorage.setItem('pageLoadCount', pageLoads.toString());
    
    // If more than 3 loads in quick succession, disable redirects temporarily
    if (pageLoads > 3) {
      console.warn('Too many redirects detected. Disabling auth redirects temporarily.');
      sessionStorage.setItem('disableAuthRedirects', 'true');
      
      // Reset counter after 5 seconds
      setTimeout(() => {
        sessionStorage.setItem('pageLoadCount', '0');
        sessionStorage.removeItem('disableAuthRedirects');
      }, 5000);
    }
    
    // Reset counter after 10 seconds of normal operation
    const resetTimer = setTimeout(() => {
      sessionStorage.setItem('pageLoadCount', '0');
    }, 10000);
    
    return () => clearTimeout(resetTimer);
  }, []);

  useEffect(() => {
    // Check the URL parameters - if we have a logout parameter, clear everything
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('t') || window.location.pathname === '/') {
      sessionStorage.clear();
    }
    
    // Check if we need to redirect based on auth status
    if (window.location.pathname !== '/' && 
        !window.location.pathname.includes('/login') && 
        !window.location.pathname.includes('/register')) {
      redirectToHomeIfNotAuthenticated();
    }
    
    // Prevent accessing login page when already authenticated
    if (window.location.pathname === '/') {
      // No need to redirect away from home page
    }
  }, []);

  // Simple function to check if we should verify auth
  const shouldCheckAuth = () => {
    return sessionStorage.getItem('disableAuthRedirects') !== 'true';
  };

  return (
    <AppSettingsProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/" element={<ChatbotPage />} />
            <Route path="/ai-assistant" element={<ChatbotPage />} />
            <Route 
              path="/dashboard" 
              element={
                localStorage.getItem('authToken') ? <Dashboard /> : <Navigate to="/" replace />
              } 
            />
            <Route 
              path="/calendar" 
              element={
                localStorage.getItem('authToken') ? <Calendar /> : <Navigate to="/" replace />
              }
            />
            <Route 
              path="/inspection-log" 
              element={
                localStorage.getItem('authToken') ? <InspectionLog /> : <Navigate to="/" replace />
              }
            />
            <Route 
              path="/shop-management" 
              element={
                localStorage.getItem('authToken') ? <ShopManagement /> : <Navigate to="/" replace />
              }
            />
            <Route 
              path="/analytics" 
              element={
                localStorage.getItem('authToken') ? <Analytics /> : <Navigate to="/" replace />
              }
            />
            <Route 
              path="/profile" 
              element={
                localStorage.getItem('authToken') ? <Profile /> : <Navigate to="/" replace />
              }
            />
            <Route 
              path="/settings" 
              element={
                localStorage.getItem('authToken') ? <Settings /> : <Navigate to="/" replace />
              }
            />
            <Route 
              path="/inspection-form" 
              element={
                localStorage.getItem('authToken') ? <InspectionForm /> : <Navigate to="/" replace />
              }
            />
            <Route 
              path="/inspection-details/:id" 
              element={
                localStorage.getItem('authToken') ? <InspectionDetailsPanel /> : <Navigate to="/" replace />
              }
            />
          </Routes>
        </Router>
      </ThemeProvider>
    </AppSettingsProvider>
  );
}

export default App;
