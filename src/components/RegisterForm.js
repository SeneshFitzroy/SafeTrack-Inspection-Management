import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
  FormHelperText,
  Snackbar,
  Alert,
  Stepper,
  Step,
  StepLabel,
  useMediaQuery,
  useTheme,
  Modal,
} from "@mui/material";
import logo from '../assets/logo.png';
import { register } from '../services/authService';

// Custom Eye Icons for password visibility
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

// Arrow icon for back button and dropdowns
const ArrowBackIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z" fill="rgba(84, 121, 255, 1)"/>
  </svg>
);

const KeyboardArrowDownIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.41 8.59L12 13.17L16.59 8.59L18 10L12 16L6 10L7.41 8.59Z" fill="rgba(84, 121, 255, 1)"/>
  </svg>
);

const RegisterForm = ({ open, onClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    phiId: '',
    nic: '',
    address: '',
    email: '',
    phone: '',
    officeLocation: '',
    district: '',
    divisions: '',
    password: '',
    confirmPassword: '',
  });
  
  // Step state (for multi-step form)
  const [activeStep, setActiveStep] = useState(0);
  const steps = ['Personal Details', 'Work Information', 'Security Setup'];
  
  // UI states
  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear errors when user types
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: '',
      });
    }
    
    if (formError) setFormError('');
  };

  // Password visibility toggles
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Form navigation
  const handleNext = () => {
    const isStepValid = validateStep(activeStep);
    if (isStepValid) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  // Validation functions
  const validateStep = (step) => {
    const errors = {};
    
    switch (step) {
      case 0: // Personal Details
        if (!formData.name.trim()) errors.name = 'Full name is required';
        if (!formData.phiId.trim()) errors.phiId = 'PHI ID is required';
        if (!formData.nic.trim()) errors.nic = 'NIC number is required';
        if (!formData.address.trim()) errors.address = 'Address is required';
        break;
        
      case 1: // Work Information
        if (!formData.email.trim()) {
          errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          errors.email = 'Email is invalid';
        }
        
        if (!formData.phone.trim()) {
          errors.phone = 'Phone number is required';
        }
        
        if (!formData.officeLocation.trim()) errors.officeLocation = 'Office location is required';
        if (!formData.district) errors.district = 'District is required';
        if (!formData.divisions.trim()) errors.divisions = 'Divisions are required';
        break;
        
      case 2: // Security Setup
        if (!formData.password) {
          errors.password = 'Password is required';
        } else if (formData.password.length < 8) {
          errors.password = 'Password must be at least 8 characters';
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
          errors.password = 'Password must include uppercase, lowercase, and numbers';
        }
        
        if (!formData.confirmPassword) {
          errors.confirmPassword = 'Please confirm your password';
        } else if (formData.confirmPassword !== formData.password) {
          errors.confirmPassword = 'Passwords do not match';
        }
        break;
        
      default:
        break;
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const validateAllFields = () => {
    const allErrors = {};
    
    // Personal Details
    if (!formData.name.trim()) allErrors.name = 'Full name is required';
    if (!formData.phiId.trim()) allErrors.phiId = 'PHI ID is required';
    if (!formData.nic.trim()) allErrors.nic = 'NIC number is required';
    if (!formData.address.trim()) allErrors.address = 'Address is required';
    
    // Work Information
    if (!formData.email.trim()) {
      allErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      allErrors.email = 'Email is invalid';
    }
    
    if (!formData.phone.trim()) {
      allErrors.phone = 'Phone number is required';
    }
    
    if (!formData.officeLocation.trim()) allErrors.officeLocation = 'Office location is required';
    if (!formData.district) allErrors.district = 'District is required';
    if (!formData.divisions.trim()) allErrors.divisions = 'Divisions are required';
    
    // Security Setup
    if (!formData.password) {
      allErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      allErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      allErrors.password = 'Password must include uppercase, lowercase, and numbers';
    }
    
    if (!formData.confirmPassword) {
      allErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.confirmPassword !== formData.password) {
      allErrors.confirmPassword = 'Passwords do not match';
    }
    
    setFormErrors(allErrors);
    return allErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // If not the last step, move to next step
    if (activeStep < steps.length - 1) {
      const validationErrors = validateStep(activeStep);
      if (Object.keys(validationErrors).length === 0) {
        setActiveStep(activeStep + 1);
      }
      return;
    }
    
    // Validate all fields on final submission
    const allErrors = validateAllFields();
    
    if (Object.keys(allErrors).length === 0) {
      try {
        setIsLoading(true);
        
        // Register user via API
        await register(formData);
        
        // Success message
        setSnackbar({
          open: true,
          message: 'Registration successful! You can now log in.',
          severity: 'success'
        });
        
        // Reset form
        setFormData({
          name: '',
          phiId: '',
          nic: '',
          address: '',
          email: '',
          phone: '',
          officeLocation: '',
          district: '',
          divisions: '',
          password: '',
          confirmPassword: '',
        });
        setActiveStep(0);
        
        // Close the registration form after a delay
        setTimeout(() => {
          onClose();
        }, 2000);
        
      } catch (error) {
        console.error('Registration error:', error);
        setFormError(typeof error === 'string' ? error : 'Registration failed. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Available districts
  const districts = [
    "Colombo", "Gampaha", "Kalutara", "Kandy", "Matale", "Nuwara Eliya", 
    "Galle", "Matara", "Hambantota", "Jaffna", "Kilinochchi", "Mannar", 
    "Vavuniya", "Mullaitivu", "Batticaloa", "Ampara", "Trincomalee", 
    "Kurunegala", "Puttalam", "Anuradhapura", "Polonnaruwa", "Badulla", 
    "Monaragala", "Ratnapura", "Kegalle"
  ];

  // Content for each step
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Stack spacing={3.5}>
            <TextField
              id="name-input"
              fullWidth
              name="name"
              label="Full Name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              error={!!formErrors.name}
              helperText={formErrors.name}
              InputLabelProps={{ shrink: true }}
              sx={inputStyle}
            />
            
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3.5}>
              <TextField
                name="phiId"
                label="PHI ID Number"
                placeholder="Enter PHI ID Number"
                value={formData.phiId}
                onChange={handleChange}
                error={!!formErrors.phiId}
                helperText={formErrors.phiId}
                InputLabelProps={{ shrink: true }}
                sx={{ ...inputStyle, flex: 1 }}
              />
              <TextField
                name="nic"
                label="NIC Number"
                placeholder="Enter NIC Number"
                value={formData.nic}
                onChange={handleChange}
                error={!!formErrors.nic}
                helperText={formErrors.nic}
                InputLabelProps={{ shrink: true }}
                sx={{ ...inputStyle, flex: 1 }}
              />
            </Stack>
            
            <TextField
              fullWidth
              name="address"
              label="Residential Address"
              placeholder="Enter your complete address"
              value={formData.address}
              onChange={handleChange}
              error={!!formErrors.address}
              helperText={formErrors.address}
              multiline
              rows={2}
              InputLabelProps={{ shrink: true }}
              sx={{
                ...inputStyle,
                '& .MuiOutlinedInput-root': {
                  ...inputStyle['& .MuiOutlinedInput-root'],
                  height: 'auto',
                  minHeight: '70px',
                }
              }}
            />
          </Stack>
        );
        
      case 1:
        return (
          <Stack spacing={3.5}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3.5}>
              <TextField
                name="email"
                label="Email Address"
                placeholder="Enter your official email address"
                value={formData.email}
                onChange={handleChange}
                error={!!formErrors.email}
                helperText={formErrors.email}
                InputLabelProps={{ shrink: true }}
                sx={{ ...inputStyle, flex: 1 }}
              />
              <TextField
                name="phone"
                label="Phone Number"
                placeholder="Ex: +94 71 234 5678"
                value={formData.phone}
                onChange={handleChange}
                error={!!formErrors.phone}
                helperText={formErrors.phone}
                InputLabelProps={{ shrink: true }}
                sx={{ ...inputStyle, flex: 1 }}
              />
            </Stack>
            
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3.5}>
              <TextField
                name="officeLocation"
                label="Office Location"
                placeholder="Enter your office location"
                value={formData.officeLocation}
                onChange={handleChange}
                error={!!formErrors.officeLocation}
                helperText={formErrors.officeLocation}
                InputLabelProps={{ shrink: true }}
                sx={{ ...inputStyle, flex: 1 }}
              />
              <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <Typography
                  variant="body2"
                  sx={{
                    mb: 0.5,
                    ml: 1.5,
                    color: formErrors.district ? '#d32f2f' : 'rgba(0, 0, 0, 0.6)',
                    fontWeight: 500,
                  }}
                >
                  District
                </Typography>
                <Select
                  name="district"
                  displayEmpty
                  value={formData.district}
                  onChange={handleChange}
                  error={!!formErrors.district}
                  renderValue={selected => selected || "Select a district"}
                  IconComponent={KeyboardArrowDownIcon}
                  sx={{
                    ...inputStyle,
                    height: '58px',
                    '& .MuiSelect-select': {
                      fontFamily: "'Poppins', Helvetica",
                      fontWeight: 400,
                      fontSize: "16px",
                      opacity: formData.district ? 1 : 0.7,
                      paddingLeft: "14px",
                      display: 'flex',
                      alignItems: 'center',
                    },
                    backgroundColor: 'rgba(241, 245, 254, 1)',
                    '&:hover': {
                      backgroundColor: 'rgba(235, 240, 250, 1)',
                    },
                    border: formErrors.district ? 
                      '1px solid #d32f2f' : 
                      '1px solid rgba(0, 0, 0, 0.2)',
                  }}
                >
                  <MenuItem value="">
                    <em>Select a District</em>
                  </MenuItem>
                  {districts.map((district) => (
                    <MenuItem key={district} value={district}>{district}</MenuItem>
                  ))}
                </Select>
                {formErrors.district && (
                  <FormHelperText error sx={{ ml: 1.5 }}>{formErrors.district}</FormHelperText>
                )}
              </Box>
            </Stack>
            
            <TextField
              fullWidth
              name="divisions"
              label="Assigned Grama Niladhari Divisions"
              placeholder="Enter the Grama Niladhari divisions you are assigned to"
              value={formData.divisions}
              onChange={handleChange}
              error={!!formErrors.divisions}
              helperText={formErrors.divisions}
              multiline
              rows={2}
              InputLabelProps={{ shrink: true }}
              sx={{
                ...inputStyle,
                '& .MuiOutlinedInput-root': {
                  ...inputStyle['& .MuiOutlinedInput-root'],
                  height: 'auto',
                  minHeight: '70px',
                }
              }}
            />
          </Stack>
        );
        
      case 2:
        return (
          <Stack spacing={3.5}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" sx={{ 
                mb: 2, 
                color: 'rgba(0, 0, 0, 0.7)', 
                fontSize: '0.9rem',
                p: 2, 
                bgcolor: 'rgba(84, 121, 255, 0.08)', 
                borderRadius: '10px' 
              }}>
                <strong>Password requirements:</strong>
                <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
                  <li>At least 8 characters long</li>
                  <li>Must include uppercase and lowercase letters</li>
                  <li>Must include at least one number</li>
                </ul>
              </Typography>
            </Box>
            
            <TextField
              fullWidth
              name="password"
              label="Create Password"
              placeholder="Create a strong password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              error={!!formErrors.password}
              helperText={formErrors.password}
              InputLabelProps={{ shrink: true }}
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
            
            <TextField
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              placeholder="Re-enter your password"
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handleChange}
              error={!!formErrors.confirmPassword}
              helperText={formErrors.confirmPassword}
              InputLabelProps={{ shrink: true }}
              sx={inputStyle}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Button
                      onClick={handleToggleConfirmPasswordVisibility}
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
                      {showConfirmPassword ? "Hide" : "Show"}
                    </Button>
                  </InputAdornment>
                ),
              }}
            />
            
            <Box sx={{ mt: 4, mb: 1, textAlign: 'center' }}>
              <Typography variant="body2" sx={{ color: 'rgba(0, 0, 0, 0.6)' }}>
                By clicking "Register", you agree to our Terms and Conditions
                and Privacy Policy.
              </Typography>
            </Box>
          </Stack>
        );
        
      default:
        return 'Unknown step';
    }
  };

  const handleBackClick = () => {
    if (onClose) {
      onClose();
    } else {
      window.history.back();
    }
  };

  return (
    <Modal
      open={open || false} // Ensure it's a boolean, default to false
      onClose={onClose}
      aria-labelledby="register-modal"
      aria-describedby="register-form-modal"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backdropFilter: "blur(8px)",
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
      }}
    >
      <Box 
        display="flex" 
        justifyContent="center" 
        bgcolor="transparent"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the form
        sx={{ py: 5 }}
      >
        <Paper
          sx={{
            width: { xs: '95%', sm: '90%', md: '850px' },
            borderRadius: "25px",
            boxShadow: '0 15px 35px rgba(0, 0, 0, 0.15)',
            position: "relative",
            padding: { xs: 3, sm: 5, md: 6 },
            paddingBottom: { xs: 5, sm: 6, md: 7 },
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '6px',
              background: 'linear-gradient(90deg, #5479FF 0%, #7891FF 100%)',
            }
          }}
        >
          <IconButton
            sx={{
              position: "absolute",
              top: 20,
              left: 20,
              width: 42,
              height: 42,
              p: 0,
              backgroundColor: 'rgba(84, 121, 255, 0.15)',
              transition: 'all 0.2s ease',
              '&:hover': {
                backgroundColor: 'rgba(84, 121, 255, 0.25)',
                transform: 'scale(1.05)',
              }
            }}
            onClick={handleBackClick}
            aria-label="back"
          >
            <ArrowBackIcon />
          </IconButton>

          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            mb: 5, 
            mt: 5,
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: '-15px',
              width: '120px',
              height: '4px',
              background: 'rgba(84, 121, 255, 0.3)',
              borderRadius: '4px'
            }
          }}>
            <img 
              src={logo} 
              alt="SafeTrack Logo" 
              style={{ 
                width: '280px',
                height: 'auto',
                maxWidth: '100%',
                filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.15))' 
              }} 
            />
          </Box>

          <Box
            sx={{
              width: { xs: '100%', sm: '90%', md: '80%' },
              textAlign: "center",
              mx: "auto",
              mb: 5,
            }}
          >
            <Typography 
              variant="h1" 
              sx={{ 
                fontSize: { xs: '32px', sm: '38px' }, 
                fontWeight: 700,
                color: '#000000',
                mb: 1,
              }}
            >
              Create Your Account
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                mt: 1, 
                opacity: 0.7, 
                fontSize: '18px',
                px: 2,
              }}
            >
              Join SafeTrack to manage inspection processes efficiently
            </Typography>
          </Box>

          {/* Stepper for multi-step form */}
          <Box sx={{ width: '100%', mb: 5 }}>
            <Stepper 
              activeStep={activeStep} 
              alternativeLabel={!isMobile}
              orientation={isMobile ? 'vertical' : 'horizontal'}
              sx={{ 
                '& .MuiStepLabel-label': { 
                  mt: 1,
                  fontSize: { xs: '0.85rem', sm: '0.9rem' } 
                },
                '& .MuiStepIcon-root': {
                  color: 'rgba(84, 121, 255, 0.3)',
                  '&.Mui-active, &.Mui-completed': {
                    color: 'rgba(84, 121, 255, 1)'
                  }
                }
              }}
            >
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>

          {/* Form error message (if any) */}
          {formError && (
            <Box 
              sx={{ 
                p: 3, 
                mb: 4, 
                width: { xs: '100%', sm: '90%', md: '80%' },
                mx: 'auto',
                backgroundColor: 'rgba(211, 47, 47, 0.12)', 
                borderRadius: '12px',
                color: '#d32f2f',
                fontSize: '1rem',
                textAlign: 'center',
                fontWeight: 500,
                border: '1px solid rgba(211, 47, 47, 0.2)',
              }}
            >
              {formError}
            </Box>
          )}

          {/* Form content based on current step */}
          <form onSubmit={handleSubmit}>
            <Box sx={{ 
              width: { xs: '100%', sm: '90%', md: '80%' }, 
              mx: 'auto', 
              mb: 4 
            }}>
              {getStepContent(activeStep)}

              {/* Navigation buttons */}
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                pt: 4 
              }}>
                <Button
                  disabled={activeStep === 0 || isLoading}
                  onClick={handleBack}
                  variant="outlined"
                  sx={{
                    height: 50,
                    px: 4, 
                    borderRadius: '12px',
                    border: '2px solid rgba(84, 121, 255, 0.5)',
                    color: 'rgba(84, 121, 255, 1)',
                    fontSize: '1rem',
                    textTransform: 'none',
                    fontWeight: 600,
                    '&:hover': {
                      border: '2px solid rgba(84, 121, 255, 0.8)',
                      backgroundColor: 'rgba(84, 121, 255, 0.05)'
                    }
                  }}
                >
                  Back
                </Button>
                
                {activeStep === steps.length - 1 ? (
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isLoading}
                    sx={{ 
                      height: 50,
                      px: 4,
                      boxShadow: '0px 6px 20px rgba(84, 121, 255, 0.3)',
                      borderRadius: '12px',
                      fontSize: '1rem',
                      fontWeight: 600,
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
                        transform: 'translateY(-2px)',
                        '&::before': {
                          left: '100%',
                        }
                      }
                    }}
                  >
                    {isLoading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      'Register'
                    )}
                  </Button>
                ) : (
                  <Button
                    onClick={handleNext}
                    variant="contained"
                    sx={{ 
                      height: 50,
                      px: 4,
                      boxShadow: '0px 4px 15px rgba(84, 121, 255, 0.25)',
                      borderRadius: '12px',
                      fontSize: '1rem',
                      fontWeight: 600,
                      textTransform: 'none',
                      position: 'relative',
                      overflow: 'hidden',
                      transition: 'all 0.3s ease',
                      background: 'linear-gradient(90deg, #5479FF 0%, #7891FF 100%)',
                      '&:hover': {
                        boxShadow: '0px 6px 20px rgba(84, 121, 255, 0.4)',
                        transform: 'translateY(-2px)',
                      }
                    }}
                  >
                    Next
                  </Button>
                )}
              </Box>
            </Box>
          </form>
        </Paper>
        
        {/* Success snackbar */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar({...snackbar, open: false})}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert 
            onClose={() => setSnackbar({...snackbar, open: false})} 
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </Modal>
  );
};

const inputStyle = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    height: '58px',
    transition: 'all 0.2s ease',
    backgroundColor: 'rgba(247, 250, 255, 0.9)',
    border: '1px solid rgba(0, 0, 0, 0.2)',
    '&:hover': {
      backgroundColor: 'rgba(247, 250, 255, 1)',
      borderColor: 'rgba(84, 121, 255, 0.5)',
      border: '1px solid rgba(84, 121, 255, 0.5)',
    },
    '&.Mui-focused': {
      backgroundColor: 'white',
      borderColor: 'rgba(84, 121, 255, 1)',
      border: '1px solid rgba(84, 121, 255, 1)',
      boxShadow: '0 0 0 3px rgba(84, 121, 255, 0.15)'
    },
    '&.Mui-error': {
      border: '1px solid #d32f2f',
      backgroundColor: 'rgba(255, 235, 235, 0.2)',
    }
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(0, 0, 0, 0.7)',
    fontWeight: 500,
    transition: 'all 0.2s ease',
    fontSize: '0.95rem',
    marginTop: '-8px',
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: 'rgba(84, 121, 255, 1)'
  },
  '& .MuiInputBase-input': {
    fontSize: '1rem',
    padding: '14px 14px',
  },
  '& .MuiInputBase-input::placeholder': {
    opacity: 0.65,
    fontSize: '0.95rem',
    fontWeight: 400,
  },
  '& .MuiFormHelperText-root': {
    marginLeft: '12px',
    fontSize: '0.8rem'
  }
};

export default RegisterForm;
