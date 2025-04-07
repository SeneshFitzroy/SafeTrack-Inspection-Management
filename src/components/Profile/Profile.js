import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Avatar, 
  IconButton, 
  Button, 
  Divider, 
  Container, 
  Grid,
  Chip,
  Card,
  CardContent,
  alpha,
  Snackbar,
  Alert
} from '@mui/material';
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';
import BadgeIcon from '@mui/icons-material/Badge';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BusinessIcon from '@mui/icons-material/Business';
import MapIcon from '@mui/icons-material/Map';
import LockIcon from '@mui/icons-material/Lock';
import Header from '../common/Header';
import Sidebar from '../common/Sidebar';
import EditPersonalInfo from './EditPersonalInfo';
import EditWorkInfo from './EditWorkInfo';
import ChangePassword from './ChangePassword';
import { getCurrentUser, updateProfile, changePassword } from '../../services/authService';

// Styled components
const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  marginBottom: theme.spacing(2),
  color: theme.palette.primary.main,
  display: 'flex',
  alignItems: 'center',
  '& svg': {
    marginRight: theme.spacing(1),
  }
}));

const ProfileCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  borderRadius: 10,
  position: 'relative',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
  transition: 'box-shadow 0.2s ease',
  overflow: 'hidden',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  '&:hover': {
    boxShadow: '0 3px 12px rgba(0, 0, 0, 0.08)',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '3px',
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
  }
}));

const EditButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: 16,
  right: 16,
  backgroundColor: alpha(theme.palette.primary.main, 0.1),
  color: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.2),
  }
}));

const InfoItem = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  display: 'flex',
  alignItems: 'flex-start',
  padding: theme.spacing(0.75),
  borderRadius: 6,
  transition: 'background-color 0.2s',
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.04),
  }
}));

const InfoIcon = styled(Box)(({ theme }) => ({
  marginRight: theme.spacing(2),
  color: theme.palette.primary.main,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: 24,
}));

const InfoContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
}));

const InfoLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '0.75rem',
  fontWeight: 500,
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  marginBottom: theme.spacing(0.5),
}));

const InfoValue = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  color: theme.palette.text.primary,
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 90,
  height: 90,
  boxShadow: '0 3px 10px rgba(0, 0, 0, 0.15)',
  border: `3px solid ${theme.palette.background.paper}`,
  margin: theme.spacing(1),
  fontSize: '2rem',
  fontWeight: 'bold',
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
}));

const ActionButton = styled(Button)(({ theme }) => ({
  borderRadius: 8,
  padding: '10px 16px',
  textTransform: 'none',
  fontWeight: 600,
  boxShadow: 'none',
  '&:hover': {
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  }
}));

const Profile = () => {
  // Sample user data
  const [userData, setUserData] = useState({
    personalInfo: {
      phID: '',
      fullName: '',
      nic: '',
      role: '',
      phoneNumber: '',
      email: '',
      address: '',
    },
    workInfo: {
      district: '',
      officeLocation: '',
      gramaNiladhari: [],
    },
  });

  // Snackbar state
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  // Modal states
  const [openPersonalEdit, setOpenPersonalEdit] = useState(false);
  const [openWorkEdit, setOpenWorkEdit] = useState(false);
  const [openPasswordChange, setOpenPasswordChange] = useState(false);

  // Fetch user data on component mount
  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      // Map backend user data to frontend format
      setUserData({
        personalInfo: {
          phID: user.phiId || '',
          fullName: user.name || '',
          nic: user.nic || '',
          role: user.role || 'PHI',
          phoneNumber: user.phone || '',
          email: user.email || '',
          address: user.address || '',
        },
        workInfo: {
          district: user.district || '',
          officeLocation: user.officeLocation || '',
          gramaNiladhari: user.divisions ? user.divisions.split(',').map(d => d.trim()) : [],
        },
      });
    }
  }, []);

  // Handle snackbar close
  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Personal info edit handlers
  const handlePersonalEditOpen = () => setOpenPersonalEdit(true);
  const handlePersonalEditClose = () => setOpenPersonalEdit(false);
  const handlePersonalInfoUpdate = async (updatedInfo) => {
    try {
      await updateProfile(updatedInfo);
      // Update local state
      setUserData(prev => ({
        ...prev,
        personalInfo: {
          ...prev.personalInfo,
          ...updatedInfo
        }
      }));
      
      // Show success message
      setSnackbar({
        open: true,
        message: 'Personal information updated successfully',
        severity: 'success'
      });
    } catch (error) {
      console.error('Error updating personal info:', error);
      setSnackbar({
        open: true,
        message: typeof error === 'string' ? error : 'Failed to update personal information',
        severity: 'error'
      });
    } finally {
      handlePersonalEditClose();
    }
  };

  // Work info edit handlers
  const handleWorkEditOpen = () => setOpenWorkEdit(true);
  const handleWorkEditClose = () => setOpenWorkEdit(false);
  const handleWorkInfoUpdate = async (updatedInfo) => {
    try {
      await updateProfile(updatedInfo);
      // Update local state
      setUserData(prev => ({
        ...prev,
        workInfo: {
          ...prev.workInfo,
          ...updatedInfo
        }
      }));
      
      // Show success message
      setSnackbar({
        open: true,
        message: 'Work information updated successfully',
        severity: 'success'
      });
    } catch (error) {
      console.error('Error updating work info:', error);
      setSnackbar({
        open: true,
        message: typeof error === 'string' ? error : 'Failed to update work information',
        severity: 'error'
      });
    } finally {
      handleWorkEditClose();
    }
  };

  // Password change handlers
  const handlePasswordChangeOpen = () => setOpenPasswordChange(true);
  const handlePasswordChangeClose = () => setOpenPasswordChange(false);
  const handlePasswordChange = async (passwordData) => {
    try {
      await changePassword(passwordData);
      
      // Show success message
      setSnackbar({
        open: true,
        message: 'Password changed successfully',
        severity: 'success'
      });
      
      return { success: true };
    } catch (error) {
      console.error('Error changing password:', error);
      setSnackbar({
        open: true,
        message: typeof error === 'string' ? error : 'Failed to change password',
        severity: 'error'
      });
      
      return {
        success: false,
        message: typeof error === 'string' ? error : 'Failed to change password'
      };
    }
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', bgcolor: '#f5f8fb' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
        <Header pageTitle="My Profile" />
        
        <Container maxWidth="xl" sx={{ mt: 2, mb: 2, height: 'calc(100vh - 80px)', overflow: 'auto' }}>
          <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* First row - Profile and Personal Info */}
            <Grid container spacing={2} sx={{ mb: 2, flexGrow: 0 }}>
              {/* Profile Card - Now more compact */}
              <Grid item xs={12} md={4} lg={3}>
                <ProfileCard elevation={1}>
                  <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    position: 'relative',
                    pb: 1,
                    pt: 5,
                  }}>
                    <Box 
                      sx={{ 
                        position: 'absolute', 
                        top: 0, 
                        left: 0, 
                        right: 0, 
                        height: 50,
                        bgcolor: 'primary.main',
                        borderTopLeftRadius: 10, 
                        borderTopRightRadius: 10,
                      }} 
                    />
                    <StyledAvatar>
                      {userData.personalInfo.fullName.charAt(0)}
                    </StyledAvatar>
                    <Box sx={{ 
                      textAlign: 'center', 
                      width: '100%',
                      mt: 0.5, 
                      px: 1,
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'center' 
                    }}>
                      <Typography variant="h6" fontWeight="bold">
                        {userData.personalInfo.fullName}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                      >
                        {userData.personalInfo.role} • PHI ID: {userData.personalInfo.phID}
                      </Typography>
                    </Box>
                    
                    <Divider sx={{ width: '100%', my: 1 }} />
                    
                    <ActionButton
                      variant="contained"
                      color="primary"
                      size="small"
                      fullWidth
                      startIcon={<LockIcon />}
                      onClick={handlePasswordChangeOpen}
                      sx={{ py: 0.75, mt: 'auto' }}
                    >
                      Change Password
                    </ActionButton>
                  </Box>
                </ProfileCard>
              </Grid>
              
              {/* Personal Information - Combined in first row */}
              <Grid item xs={12} md={8} lg={9}>
                <ProfileCard>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <SectionTitle variant="h6" sx={{ mb: 0 }}>
                      <PersonIcon fontSize="small" /> Personal Information
                    </SectionTitle>
                    <IconButton 
                      size="small" 
                      onClick={handlePersonalEditOpen}
                      sx={{ 
                        bgcolor: theme => alpha(theme.palette.primary.main, 0.1),
                        '&:hover': { bgcolor: theme => alpha(theme.palette.primary.main, 0.2) }
                      }}
                    >
                      <EditIcon fontSize="small" color="primary" />
                    </IconButton>
                  </Box>
                  <Divider sx={{ mb: 1.5 }} />
                  
                  <Grid container spacing={1.5}>
                    <Grid item xs={12} sm={6} md={4}>
                      <InfoItem>
                        <InfoIcon><BadgeIcon fontSize="small" /></InfoIcon>
                        <InfoContent>
                          <InfoLabel>Full Name</InfoLabel>
                          <InfoValue>{userData.personalInfo.fullName}</InfoValue>
                        </InfoContent>
                      </InfoItem>
                    </Grid>
                    
                    <Grid item xs={12} sm={6} md={4}>
                      <InfoItem>
                        <InfoIcon><BadgeIcon fontSize="small" /></InfoIcon>
                        <InfoContent>
                          <InfoLabel>NIC</InfoLabel>
                          <InfoValue>{userData.personalInfo.nic}</InfoValue>
                        </InfoContent>
                      </InfoItem>
                    </Grid>
                    
                    <Grid item xs={12} sm={6} md={4}>
                      <InfoItem>
                        <InfoIcon><PhoneIcon fontSize="small" /></InfoIcon>
                        <InfoContent>
                          <InfoLabel>Phone Number</InfoLabel>
                          <InfoValue>{userData.personalInfo.phoneNumber}</InfoValue>
                        </InfoContent>
                      </InfoItem>
                    </Grid>
                    
                    <Grid item xs={12} sm={6} md={4}>
                      <InfoItem>
                        <InfoIcon><EmailIcon fontSize="small" /></InfoIcon>
                        <InfoContent>
                          <InfoLabel>Email</InfoLabel>
                          <InfoValue>{userData.personalInfo.email}</InfoValue>
                        </InfoContent>
                      </InfoItem>
                    </Grid>
                    
                    <Grid item xs={12} sm={12} md={8}>
                      <InfoItem>
                        <InfoIcon><HomeIcon fontSize="small" /></InfoIcon>
                        <InfoContent>
                          <InfoLabel>Address</InfoLabel>
                          <InfoValue>{userData.personalInfo.address}</InfoValue>
                        </InfoContent>
                      </InfoItem>
                    </Grid>
                  </Grid>
                </ProfileCard>
              </Grid>
            </Grid>
            
            {/* Second row - Work Details */}
            <Grid container spacing={2} sx={{ flexGrow: 1 }}>
              {/* Work Summary */}
              <Grid item xs={12} md={4} lg={3}>
                <ProfileCard elevation={1}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <SectionTitle variant="h6" sx={{ mb: 0 }}>
                      <WorkIcon fontSize="small" /> Work Summary
                    </SectionTitle>
                  </Box>
                  <Divider sx={{ mb: 1.5 }} />
                  
                  <InfoItem>
                    <InfoIcon><BusinessIcon fontSize="small" /></InfoIcon>
                    <InfoContent>
                      <InfoLabel>District</InfoLabel>
                      <InfoValue>{userData.workInfo.district}</InfoValue>
                    </InfoContent>
                  </InfoItem>
                  
                  <InfoItem>
                    <InfoIcon><LocationOnIcon fontSize="small" /></InfoIcon>
                    <InfoContent>
                      <InfoLabel>Office Location</InfoLabel>
                      <InfoValue>{userData.workInfo.officeLocation}</InfoValue>
                    </InfoContent>
                  </InfoItem>
                </ProfileCard>
              </Grid>
              
              {/* Grama Niladhari Divisions */}
              <Grid item xs={12} md={8} lg={9}>
                <ProfileCard>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <SectionTitle variant="h6" sx={{ mb: 0 }}>
                      <MapIcon fontSize="small" /> Grama Niladhari Divisions
                    </SectionTitle>
                    <IconButton 
                      size="small" 
                      onClick={handleWorkEditOpen}
                      sx={{ 
                        bgcolor: theme => alpha(theme.palette.primary.main, 0.1),
                        '&:hover': { bgcolor: theme => alpha(theme.palette.primary.main, 0.2) }
                      }}
                    >
                      <EditIcon fontSize="small" color="primary" />
                    </IconButton>
                  </Box>
                  <Divider sx={{ mb: 1 }} />
                  
                  <Box sx={{ p: 0.5 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontSize: '0.85rem' }}>
                      The following Grama Niladhari divisions are currently assigned to you:
                    </Typography>
                    
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
                      {userData.workInfo.gramaNiladhari.map((division, index) => (
                        <Chip 
                          key={index} 
                          label={division} 
                          size="small"
                          sx={{ 
                            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                            color: 'primary.main',
                            fontWeight: 'medium',
                            height: 24,
                            fontSize: '0.75rem',
                            '&:hover': {
                              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.2),
                            }
                          }} 
                        />
                      ))}
                    </Box>
                  </Box>
                </ProfileCard>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
      
      {/* Edit Modals */}
      <EditPersonalInfo 
        open={openPersonalEdit} 
        handleClose={handlePersonalEditClose} 
        data={userData.personalInfo}
        onUpdate={handlePersonalInfoUpdate}
      />
      
      <EditWorkInfo 
        open={openWorkEdit} 
        handleClose={handleWorkEditClose} 
        data={userData.workInfo}
        onUpdate={handleWorkInfoUpdate}
      />
      
      <ChangePassword
        open={openPasswordChange}
        handleClose={handlePasswordChangeClose}
        onChangePassword={handlePasswordChange}
      />
      
      {/* Snackbar for notifications */}
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity={snackbar.severity} 
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Profile;
