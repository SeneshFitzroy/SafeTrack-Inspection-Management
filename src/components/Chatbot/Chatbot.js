import React, { useState, useRef, useEffect } from "react";
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Paper, 
  CircularProgress,
  IconButton,
  InputAdornment,
  Divider,
  Card,
  Avatar,
  Chip
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';
import axiosInstance from "../../axios";

const Chatbot = () => {
  const [apiKey, setApiKey] = useState("");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiKeyError, setApiKeyError] = useState("");
  const [isApiKeyValid, setIsApiKeyValid] = useState(false);
  
  const messagesEndRef = useRef(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  // Check if we have an API key in environment variables - improved implementation
  useEffect(() => {
    console.log("Checking for API key in .env file");
    const envApiKey = process.env.REACT_APP_OPENAI_API_KEY;
    
    if (envApiKey && envApiKey.trim() !== "") {
      console.log("API key found in .env, length:", envApiKey.length);
      setApiKey(envApiKey);
      
      // Let the component render before validating
      setTimeout(() => {
        validateApiKey();
      }, 1000);
    } else {
      console.log("No API key found in .env file");
    }
  }, []);
  
  const validateApiKey = async () => {
    if (!apiKey.trim()) {
      setApiKeyError("API key is required");
      setIsApiKeyValid(false);
      return;
    }
    
    setLoading(true);
    try {
      console.log("Validating API key:", apiKey.substring(0, 5) + "...");
      
      const response = await axiosInstance.post("", 
        {
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: "Hello" },
          ],
          max_tokens: 50
        },
        {
          headers: {
            "Authorization": `Bearer ${apiKey}`
          }
        }
      );
      
      console.log("Validation response:", response.status);
      
      if (response.status === 200) {
        setIsApiKeyValid(true);
        setApiKeyError("");
        setMessages([
          {
            role: "assistant",
            content: "Hello! I'm your SafeTrack AI assistant. How can I help you today with food safety inspections?"
          }
        ]);
      }
    } catch (error) {
      console.error("API key validation error:", error);
      setApiKeyError(`Invalid API key or API error: ${error.message}`);
      setIsApiKeyValid(false);
    } finally {
      setLoading(false);
    }
  };
  
  const handleSendMessage = async () => {
    if (!input.trim() || !isApiKeyValid) return;
    
    const userMessage = input.trim();
    console.log("Sending message:", userMessage);
    setInput("");
    
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    
    setLoading(true);
    try {
      console.log("Making API request with key:", apiKey.substring(0, 5) + "...");
      const allMessages = [
        { 
          role: "system", 
          content: "You are a helpful assistant for SafeTrack, a food safety inspection application. Provide concise and relevant answers about food safety, regulations, inspection procedures, and best practices." 
        },
        ...messages.map(msg => ({ role: msg.role, content: msg.content })),
        { role: "user", content: userMessage }
      ];
      
      console.log("Messages being sent:", allMessages);
      
      const response = await axiosInstance.post("",
        {
          model: "gpt-3.5-turbo",
          messages: allMessages
        },
        {
          headers: {
            "Authorization": `Bearer ${apiKey}`
          }
        }
      );
      
      console.log("Response received:", response.data);
      
      const assistantResponse = response.data.choices[0].message.content;
      setMessages(prev => [
        ...prev, 
        { 
          role: "assistant", 
          content: assistantResponse 
        }
      ]);
    } catch (error) {
      console.error("Error in sending message:", error);
      setMessages(prev => [
        ...prev, 
        { 
          role: "assistant", 
          content: "Sorry, I encountered an error processing your request. Please try again later." 
        }
      ]);
    } finally {
      setLoading(false);
    }
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const renderMessages = () => {
    return messages.map((message, index) => (
      <Box 
        key={index} 
        sx={{ 
          display: 'flex', 
          justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start',
          mb: 2 
        }}
      >
        {message.role === 'assistant' && (
          <Avatar 
            sx={{ 
              bgcolor: 'primary.main', 
              width: 36, 
              height: 36, 
              mr: 1,
              mt: 0.5
            }}
          >
            <SmartToyIcon fontSize="small" />
          </Avatar>
        )}
        
        <Paper 
          elevation={1} 
          sx={{
            p: 2,
            maxWidth: '70%',
            borderRadius: 2,
            bgcolor: message.role === 'user' ? 'primary.main' : 'background.paper',
            color: message.role === 'user' ? 'white' : 'text.primary',
            position: 'relative',
            '&::after': message.role === 'user' ? {
              content: '""',
              position: 'absolute',
              right: 0,
              top: 10,
              width: 0,
              height: 0,
              border: '8px solid transparent',
              borderLeftColor: 'primary.main',
              borderRight: 0,
              marginRight: -8
            } : {}
          }}
        >
          <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
            {message.content}
          </Typography>
        </Paper>
        
        {message.role === 'user' && (
          <Avatar 
            sx={{ 
              bgcolor: 'grey.300', 
              width: 36, 
              height: 36, 
              ml: 1,
              mt: 0.5
            }}
          >
            <PersonIcon fontSize="small" />
          </Avatar>
        )}
      </Box>
    ));
  };
  
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        height: '100%',
        maxWidth: '1000px',
        mx: 'auto',
        p: 3
      }}
    >
      <Typography 
        variant="h4" 
        sx={{ mb: 4, fontWeight: 'bold', textAlign: 'center' }}
      >
        SafeTrack AI Assistant
      </Typography>
      
      {!isApiKeyValid ? (
        <Card sx={{ p: 4, maxWidth: '500px', mx: 'auto' }}>
          <Typography variant="h6" sx={{ mb: 3 }}>Enter your OpenAI API Key</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Your API key is stored locally in your browser session and is never sent to our servers.
          </Typography>
          
          <TextField
            fullWidth
            variant="outlined"
            label="OpenAI API Key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            error={!!apiKeyError}
            helperText={apiKeyError}
            sx={{ mb: 3 }}
            type="password"
          />
          
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={validateApiKey}
            disabled={loading}
            sx={{ py: 1.5 }}
          >
            {loading ? <CircularProgress size={24} /> : "Connect"}
          </Button>
          
          <Divider sx={{ my: 3 }} />
          
          <Typography variant="body2" color="text.secondary">
            Don't have an API key? <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer">Get one from OpenAI</a>
          </Typography>
        </Card>
      ) : (
        <>
          <Box 
            sx={{ 
              flex: 1, 
              overflowY: 'auto', 
              bgcolor: 'background.default', 
              p: 2, 
              borderRadius: 2,
              mb: 2,
              minHeight: '500px',
              maxHeight: '500px',
              boxShadow: 'inset 0 0 10px rgba(0,0,0,0.05)'
            }}
          >
            {renderMessages()}
            <div ref={messagesEndRef} />
            
            {loading && (
              <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
                <CircularProgress size={30} />
              </Box>
            )}
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              multiline
              maxRows={3}
              disabled={loading}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton 
                      onClick={handleSendMessage} 
                      disabled={!input.trim() || loading}
                      color="primary"
                    >
                      <SendIcon />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Chip 
              label="Connected to OpenAI" 
              color="success" 
              size="small" 
              icon={<SmartToyIcon fontSize="small" />} 
            />
          </Box>
        </>
      )}
    </Box>
  );
};

export default Chatbot;
