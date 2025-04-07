import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
  Modal,
  Link,
  CircularProgress,
  Stack,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import logo from '../assets/logo.png';
import { login } from '../services/authService';

// Simple Eye Icons since we can't import from MUI icons
const VisibilityIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5ZM12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17ZM12 9C10.34 9 9 10.34 9 12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9Z" 
      fill="rgba(84, 121, 255, 1)"/>
  </svg>
);

const VisibilityOffIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 6.5C15.79 6.5 19.17 8.63 20.82 12C20.23 13.42 19.29 14.65 18.11 15.59L19.77 17.25C21.44 15.94 22.76 14.17 23.52 12C21.77 7.61 17.21 4.5 12 4.5C10.49 4.5 9.04 4.78 7.7 5.28L9.62 7.2C10.37 6.75 11.16 6.5 12 6.5ZM2 3.27L4.28 5.55L4.74 6.01C2.97 7.29 1.57 9.13 0.79 11.31C2.54 15.7 7.1 18.81 12.31 18.81C13.93 18.81 15.47 18.5 16.89 17.93L17.25 18.29L19.73 20.77L21 19.5L3.27 1.77L2 3.27ZM7.53 7.8L9.08 9.35C9.03 9.56 9 9.78 9 10C9 11.66 10.34 13 12 13C12.22 13 12.44 12.97 12.65 12.92L14.2 14.47C13.53 14.8 12.79 15 12 15C9.24 15 7 12.76 7 10C7 9.21 7.2 8.47 7.53 7.8ZM11.84 8.02L14.99 11.17L15.01 11.01C15.01 9.35 13.67 8.01 12.01 8.01L11.84 8.02Z" 
      fill="rgba(84, 121, 255, 1)"/>
  </svg>
);

const LoginForm = ({ open, onClose, onLoginSuccess }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberDevice, setRememberDevice] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (open) {
      document.getElementById("username-input")?.focus();
      // Reset form when opened
      setFormError('');
      setIsLoading(false);
    }
  }, [open]);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleRememberDeviceChange = () => {
    setRememberDevice((prev) => !prev);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    if (formError) setFormError('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (formError) setFormError('');
  };

  const handleLogin = async () => {
    try {
      // Validate inputs
      if (!username || !password) {
        setFormError('Please enter both username and password');
        return;
      }
      
      setIsLoading(true);
      
      // Call the login API
      const response = await login(username, password);
      
      if (!response || !response.token) {
        throw new Error('Invalid response from server');
      }
      
      // Verify token is stored
      const storedToken = localStorage.getItem('authToken');
      if (!storedToken) {
        throw new Error('Failed to store authentication token');
      }
      
      // Close login form
      onClose();
      
      // Notify parent component of successful login or redirect
      if (onLoginSuccess) {
        onLoginSuccess();
      } else {
        window.location.href = '/dashboard';
      }
      
    } catch (error) {
      console.error('Login failed:', error);
      setFormError(typeof error === 'string' ? error : 'Authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    handleLogin();
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="login-modal"
      aria-describedby="login-form-modal"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backdropFilter: "blur(8px)", // Increased blur for better contrast
        backgroundColor: 'rgba(0, 0, 0, 0.3)', // Darker background for better contrast
      }}
    >
      <Box 
        display="flex" 
        justifyContent="center" 
        bgcolor="transparent"
        onClick={handleModalClick}
        sx={{ 
          width: { xs: '95%', sm: '680px' }, 
          maxWidth: '100%',
          transform: 'translateY(0)',
          animation: open ? 'fadeIn 0.3s ease-out' : 'none',
          '@keyframes fadeIn': {
            '0%': {
              opacity: 0,
              transform: 'translateY(20px)',
            },
            '100%': {
              opacity: 1,
              transform: 'translateY(0)',
            },
          },
          // Custom scrollbar styling for consistency
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'rgba(84, 121, 255, 0.5)',
            borderRadius: '4px',
          },
        }}
      >
        <Paper
          elevation={5}
          sx={{
            width: "100%",
            borderRadius: "25px",
            position: "relative",
            padding: { xs: 5, sm: 6 }, // Increased padding
            paddingBottom: { xs: 7, sm: 8 }, // Extra bottom padding
            background: 'white',
            boxShadow: '0 15px 35px rgba(0,0,0,0.15)',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '6px', // Thicker top border
              background: 'linear-gradient(90deg, #5479FF 0%, #7891FF 100%)',
            }
          }}
        >
          <IconButton
            sx={{
              position: "absolute",
              top: 25, // Adjusted position
              right: 25, // Adjusted position
              width: 45, // Larger button
              height: 45, // Larger button
              p: 0,
              backgroundColor: 'rgba(84, 121, 255, 0.15)', // More visible
              transition: 'all 0.2s ease',
              '&:hover': {
                backgroundColor: 'rgba(84, 121, 255, 0.25)',
                transform: 'scale(1.05)',
              }
            }}
            onClick={onClose}
            aria-label="close"
          >
            <span style={{ fontSize: '26px', color: 'rgba(84, 121, 255, 1)' }}>×</span>
          </IconButton>

          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            mb: 5, // Increased margin
            mt: 6, // Increased margin
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: '-15px', // Lower position
              width: '120px', // Wider line
              height: '4px', // Thicker line
              background: 'rgba(84, 121, 255, 0.3)',
              borderRadius: '3px'
            }
          }}>
            <img 
              src={logo} 
              alt="SafeTrack Logo" 
              style={{ 
                width: '250px', // Larger logo
                height: 'auto',
                maxWidth: '100%',
                filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.15))' // Enhanced shadow
              }} 
            />
          </Box>

          <Box
            sx={{
              width: { xs: '95%', sm: '450px' }, // Wider container
              textAlign: "center",
              mx: "auto",
              mb: 5, // Increased margin
            }}
          >
            <Typography 
              variant="h1" 
              sx={{ 
                fontSize: { xs: '34px', sm: '40px' }, // Larger text
                fontWeight: 700,
                color: '#000000',
                mb: 1, // Bottom margin
              }}
            >
              Welcome Back
            </Typography>
            <Typography variant="body1" sx={{ 
              mt: 1, 
              opacity: 0.7, 
              fontSize: '18px',
              px: 2, // Side padding
            }}>
              Enter Your Credentials to Continue
            </Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            <Box sx={{ 
              width: { xs: '95%', sm: '85%' }, 
              mx: 'auto', 
              mb: 3 
            }}>
              {formError && (
                <Box 
                  sx={{ 
                    p: 3, // More padding
                    mb: 4, // More margin
                    backgroundColor: 'rgba(211, 47, 47, 0.12)', 
                    borderRadius: '12px',
                    color: '#d32f2f',
                    fontSize: '1rem', // Larger font
                    textAlign: 'center',
                    fontWeight: 500, // Slightly bolder
                    border: '1px solid rgba(211, 47, 47, 0.2)', // Subtle border
                  }}
                >
                  {formError}
                </Box>
              )}
              
              {/* Login Information Section */}
              <Box sx={{ mb: 2 }}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    mb: 3, 
                    color: 'rgba(0, 0, 0, 0.8)',
                    fontWeight: 600,
                    borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
                    pb: 1,
                  }}
                >
                  Login Information
                </Typography>
                
                <Stack spacing={4}> {/* Increased spacing */}
                  <TextField
                    id="username-input"
                    fullWidth
                    label="Username or Email"
                    placeholder="Enter your username or email"
                    variant="outlined"
                    value={username}
                    onChange={handleUsernameChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    sx={inputStyle}
                  />

                  <TextField
                    fullWidth
                    type={showPassword ? "text" : "password"}
                    label="Password"
                    placeholder="Enter your password"
                    variant="outlined"
                    value={password}
                    onChange={handlePasswordChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    sx={inputStyle}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Button
                            onClick={handleTogglePasswordVisibility}
                            variant="text"
                            sx={{ 
                              minWidth: 'auto',
                              color: 'primary.main',
                              p: '5px 10px',
                              mr: '5px',
                              borderRadius: '8px',
                              fontSize: '0.85rem',
                              textTransform: 'none',
                              border: '1px solid rgba(84, 121, 255, 0.3)',
                              '&:hover': {
                                backgroundColor: 'rgba(84, 121, 255, 0.1)',
                                border: '1px solid rgba(84, 121, 255, 0.5)',
                              }
                            }}
                          >
                            {showPassword ? "Hide" : "Show"}
                          </Button>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Stack>
              </Box>

              {/* Options Section */}
              <Box sx={{ 
                display: 'flex', 
                flexDirection: { xs: 'column', sm: 'row' },
                justifyContent: 'space-between',
                alignItems: { xs: 'flex-start', sm: 'center' },
                mb: 5, // More margin
                mt: 2, // Added margin
              }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={rememberDevice}
                      onChange={handleRememberDeviceChange}
                      color="primary"
                      sx={{ 
                        '&.Mui-checked': { color: 'primary.main' },
                        padding: '4px'
                      }}
                    />
                  }
                  label="Remember This Device"
                  sx={{
                    marginLeft: '-4px',
                    '& .MuiTypography-root': {
                      fontSize: '0.95rem',
                      fontWeight: 400
                    }
                  }}
                />

                <Link
                  component="button"
                  type="button" // Prevent form submission
                  variant="body2"
                  onClick={() => console.log("Forgot password clicked")}
                  sx={{ 
                    textDecoration: 'none', 
                    fontWeight: 500,
                    fontSize: '0.95rem',
                    color: 'primary.main',
                    transition: 'all 0.2s ease',
                    mt: { xs: 1, sm: 0 }, // Mobile margin
                    '&:hover': {
                      color: '#7891FF',
                      textDecoration: 'underline'
                    }
                  }}
                >
                  Forgot Password?
                </Link>
              </Box>

              {/* Login Button */}
              <Box 
                sx={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  mt: 5, // More top margin
                  mb: 3, // Adequate bottom margin
                  position: 'relative', // For effect
                }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isLoading}
                  sx={{ 
                    width: '100%',
                    maxWidth: '350px', // Wider button
                    height: 58, // Taller button
                    boxShadow: '0px 6px 20px rgba(84, 121, 255, 0.3)', // More visible shadow
                    borderRadius: '15px', // Rounder corners
                    fontSize: '1.25rem', // Larger font
                    fontWeight: 600,
                    letterSpacing: '0.5px',
                    textTransform: 'none',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    background: 'linear-gradient(90deg, #5479FF 0%, #7891FF 100%)',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: '-100%',
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                      transition: 'all 0.6s ease',
                    },
                    '&:hover': {
                      boxShadow: '0px 8px 25px rgba(84, 121, 255, 0.4)',
                      transform: 'translateY(-3px)',
                      '&::before': {
                        left: '100%',
                      }
                    },
                    // Add pulsing effect to draw attention
                    animation: 'pulse 2s infinite',
                    '@keyframes pulse': {
                      '0%': {
                        boxShadow: '0 0 0 0 rgba(84, 121, 255, 0.4)',
                      },
                      '70%': {
                        boxShadow: '0 0 0 10px rgba(84, 121, 255, 0)',
                      },
                      '100%': {
                        boxShadow: '0 0 0 0 rgba(84, 121, 255, 0)',
                      },
                    },
                  }}
                >
                  {isLoading ? (
                    <CircularProgress size={28} color="inherit" />
                  ) : (
                    'Login Now'
                  )}
                </Button>
              </Box>
            </Box>
          </form>
        </Paper>
      </Box>
    </Modal>
  );
};

// Add consistent input styling
const inputStyle = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    height: '58px', // Taller fields
    transition: 'all 0.2s ease',
    backgroundColor: 'rgba(247, 250, 255, 0.9)', // Slightly more opaque
    border: '1px solid rgba(0, 0, 0, 0.2)', // More visible border
    '&:hover': {
      backgroundColor: 'rgba(247, 250, 255, 1)',
      borderColor: 'rgba(84, 121, 255, 0.5)',
      border: '1px solid rgba(84, 121, 255, 0.5)',
    },
    '&.Mui-focused': {
      backgroundColor: 'white',
      borderColor: 'rgba(84, 121, 255, 1)',
      border: '1px solid rgba(84, 121, 255, 1)',
      boxShadow: '0 0 0 3px rgba(84, 121, 255, 0.15)' // More visible focus state
    },
    '&.Mui-error': {
      border: '1px solid #d32f2f',
      backgroundColor: 'rgba(255, 235, 235, 0.2)', // Light red background for error
    }
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(0, 0, 0, 0.7)', // Darker for better visibility
    fontWeight: 500,
    transition: 'all 0.2s ease',
    fontSize: '0.95rem', // Larger label
    marginTop: '-8px', // Position adjustment
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: 'rgba(84, 121, 255, 1)'
  },
  '& .MuiInputBase-input': {
    fontSize: '1rem', // Larger text
    padding: '14px 14px', // More padding
  },
  '& .MuiInputBase-input::placeholder': {
    opacity: 0.65, // More visible placeholder
    fontSize: '0.95rem', // Larger placeholder
    fontWeight: 400,
  },
  '& .MuiFormHelperText-root': {
    marginLeft: '12px', // Better positioning
    fontSize: '0.8rem' // Larger helper text
  }
};

export default LoginForm;
