import React from 'react';
import { Box } from '@mui/material';
import Chatbot from '../components/Chatbot/Chatbot';
import Header from '../components/common/Header';
import Sidebar from '../components/common/Sidebar';

const ChatbotPage = () => {
  return (
    <Box sx={{ display: 'flex', height: '100vh', bgcolor: '#F5F8FF' }}>
      <Sidebar />
      
      <Box sx={{ 
        flex: 1, 
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <Header pageTitle="AI Assistant" />
        
        <Box sx={{ p: 3, flexGrow: 1 }}>
          <Chatbot />
        </Box>
      </Box>
    </Box>
  );
};

export default ChatbotPage;
