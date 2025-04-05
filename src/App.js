import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import Dashboard from './components/Dashboard/Dashboard';
import Calendar from './components/Dashboard/Calendar';
import InspectionLog from './components/InspectionLog/InspectionLog';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PlaceholderPage from './components/common/PlaceholderPage';

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
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/inspection-log" element={<InspectionLog />} />
          <Route path="/shop-management" element={<PlaceholderPage title="Shop Management" />} />
          <Route path="/analytics" element={<PlaceholderPage title="Analytics" />} />
          <Route path="/profile" element={<PlaceholderPage title="Profile" />} />
          <Route path="/settings" element={<PlaceholderPage title="Settings" />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
