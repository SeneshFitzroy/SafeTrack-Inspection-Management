import React, { useState, useEffect, useContext } from 'react';
import {
  Box, 
  Container,
  Typography,
  Paper,
  Switch,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  MenuItem,
  Select,
  InputLabel,
  Grid,
  Button,
  Divider,
  IconButton,
  OutlinedInput,
  Slider,
  Chip,
  Stack,
  alpha,
  Avatar,
  Tooltip,
  Snackbar,
  Alert,
  Checkbox
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import {
  NotificationsActive as AlertsIcon,
  Language as LanguageIcon,
  FormatSize as FormatSizeIcon,
  Palette as ThemeIcon,
  Email as EmailIcon,
  Message as SmsIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
  Brightness6 as ContrastIcon,
  Refresh as ResetIcon,
  Save as SaveIcon,
  Done as DoneIcon,
  MobileScreenShare as MobileIcon,
  Bolt as PerformanceIcon,
  Info as InfoIcon
} from '@mui/icons-material';
import Header from '../common/Header';
import Sidebar from '../common/Sidebar';
import { AppSettingsContext } from '../../contexts/AppSettingsContext';

// Styled components
const SettingsHeader = styled(Typography)(({ theme }) => ({
  position: 'relative',
  fontWeight: 700,
  fontSize: '1.5rem',
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(4),
  paddingBottom: theme.spacing(1.5),
  '&:after': {
    content: '""',
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: 80,
    height: 4,
    borderRadius: 2,
    backgroundColor: theme.palette.primary.main,
  }
}));

const SettingsCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: 12,
  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.04)',
  height: '100%',
  transition: 'transform 0.15s ease, box-shadow 0.15s ease',
  '&:hover': {
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.08)',
    transform: 'translateY(-2px)',
  }
}));

const SettingSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
}));

const SectionTitle = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
}));

const TitleIcon = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: alpha(theme.palette.primary.main, 0.1),
  color: theme.palette.primary.main,
  borderRadius: 8,
  padding: theme.spacing(1),
  marginRight: theme.spacing(1.5),
}));

const FormSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: 8,
  backgroundColor: alpha(theme.palette.primary.main, 0.03),
  marginBottom: theme.spacing(2),
}));

const ActionButton = styled(Button)(({ theme }) => ({
  fontWeight: 600,
  padding: '8px 24px',
  boxShadow: 'none',
  textTransform: 'none',
  borderRadius: 8,
  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  '&:hover': {
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.12)',
  }
}));

const DataDensityOption = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isSelected'
})(({ isSelected, theme }) => ({
  padding: '8px 12px',
  borderRadius: 8,
  cursor: 'pointer',
  backgroundColor: isSelected ? alpha(theme.palette.primary.main, 0.1) : alpha(theme.palette.background.paper, 0.5),
  border: `1px solid ${isSelected ? theme.palette.primary.main : theme.palette.divider}`,
  transition: 'all 0.2s ease',
  display: 'flex',
  alignItems: 'center',
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, isSelected ? 0.15 : 0.05),
    transform: 'translateY(-2px)',
    boxShadow: '0 3px 8px rgba(0,0,0,0.08)'
  }
}));

const AccessibilitySlider = styled(Slider)(({ theme }) => ({
  width: '100%',
  color: theme.palette.primary.main,
  '& .MuiSlider-valueLabel': {
    backgroundColor: theme.palette.primary.main,
  }
}));

const FutureFeatureOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: alpha(theme.palette.background.paper, theme.palette.mode === 'dark' ? 0.85 : 0.7),
  backdropFilter: 'blur(4px)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 10,
  borderRadius: 12,
  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
  transition: 'all 0.3s ease',
}));

const TestBadge = styled(Box)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  backgroundColor: alpha(theme.palette.warning.main, 0.15),
  color: theme.palette.warning.dark,
  borderRadius: 12,
  padding: '2px 8px',
  fontSize: '0.65rem',
  fontWeight: 'bold',
  textTransform: 'uppercase',
  marginLeft: 8,
  height: 20,
  border: `1px solid ${alpha(theme.palette.warning.main, 0.3)}`,
}));

// Helper to adjust color opacity
const adjustColorOpacity = (hex, opacity) => {
  try {
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  } catch (error) {
    console.error("Error in adjustColorOpacity:", error);
    return hex;
  }
};

// Helper function to adjust color brightness
const adjustBrightness = (color, percent) => {
  try {
    const num = parseInt(color.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return '#' + (
      0x1000000 + 
      (R < 255 ? (R < 0 ? 0 : R) : 255) * 0x10000 + 
      (G < 255 ? (G < 0 ? 0 : G) : 255) * 0x100 + 
      (B < 255 ? (B < 0 ? 0 : B) : 255)
    ).toString(16).slice(1);
  } catch (error) {
    console.error("Error in adjustBrightness:", error);
    return color;
  }
};

const Settings = () => {
  const theme = useTheme();
  const { 
    settings, 
    updateSettings, 
    resetSettings, 
    applyThemeMode, 
    applyColorScheme, 
    applyFontSize, 
    applyLanguage, 
    applyContrast,
    getAvailableColorSchemes,
    getAvailableFontSizes,
    getAvailableLanguages 
  } = useContext(AppSettingsContext);

  const [saveSuccess, setSaveSuccess] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  
  const [pendingSettings, setPendingSettings] = useState({});
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const [dataDensity, setDataDensity] = useState(localStorage.getItem('dataDensity') || 'medium');
  const [textSpacing, setTextSpacing] = useState(parseInt(localStorage.getItem('textSpacing') || '100'));
  const [motionReduced, setMotionReduced] = useState(localStorage.getItem('motionReduced') === 'true');

  const handleChange = (name) => (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setPendingSettings(prev => ({
      ...prev,
      [name]: value
    }));
    setHasUnsavedChanges(true);
    switch(name) {
      case 'themeMode':
        applyThemeMode(value);
        break;
      case 'colorScheme':
        applyColorScheme(value);
        break;
      case 'fontSize':
        applyFontSize(value);
        break;
      case 'language':
        applyLanguage(value);
        break;
      default:
        break;
    }
  };

  const handleDataDensityChange = (density) => {
    setDataDensity(density);
    setHasUnsavedChanges(true);
    applyDataDensity(density);
  };
  
  const applyDataDensity = (density) => {
    document.body.className = document.body.className.replace(/data-density-\w+/g, '');
    document.body.classList.add(`data-density-${density}`);
    
    const styleElement = document.getElementById('data-density-styles') || document.createElement('style');
    styleElement.id = 'data-density-styles';
    
    let densityCSS = '';
    switch(density) {
      case 'compact':
        densityCSS = `
          .MuiTableCell-root { padding: 6px 8px; }
          .MuiListItem-root { padding-top: 4px; padding-bottom: 4px; }
          .MuiCardContent-root { padding: 12px; }
          .MuiToolbar-root { min-height: 56px; }
        `;
        break;
      case 'medium':
        densityCSS = `
          .MuiTableCell-root { padding: 12px 16px; }
          .MuiListItem-root { padding-top: 8px; padding-bottom: 8px; }
          .MuiCardContent-root { padding: 16px; }
          .MuiToolbar-root { min-height: 64px; }
        `;
        break;
      case 'comfortable':
        densityCSS = `
          .MuiTableCell-root { padding: 16px 24px; }
          .MuiListItem-root { padding-top: 12px; padding-bottom: 12px; }
          .MuiCardContent-root { padding: 24px; }
          .MuiToolbar-root { min-height: 72px; }
        `;
        break;
    }
    
    styleElement.textContent = densityCSS;
    if (!styleElement.parentNode) {
      document.head.appendChild(styleElement);
    }
  };
  
  const handleTextSpacingChange = (event, newValue) => {
    setTextSpacing(newValue);
    setHasUnsavedChanges(true);
    applyTextSpacing(newValue);
  };
  
  const applyTextSpacing = (spacing) => {
    const styleElement = document.getElementById('text-spacing-styles') || document.createElement('style');
    styleElement.id = 'text-spacing-styles';
    styleElement.textContent = `
      body {
        letter-spacing: ${(spacing - 100) * 0.01}em;
        line-height: ${1 + (spacing - 100) * 0.005};
      }
    `;
    
    if (!styleElement.parentNode) {
      document.head.appendChild(styleElement);
    }
  };
  
  const handleMotionReducedChange = (event) => {
    const newValue = event.target.checked;
    setMotionReduced(newValue);
    setHasUnsavedChanges(true);
    applyMotionReduction(newValue);
  };
  
  const applyMotionReduction = (reduced) => {
    const styleElement = document.getElementById('reduced-motion-styles') || document.createElement('style');
    styleElement.id = 'reduced-motion-styles';
    
    if (reduced) {
      styleElement.textContent = `
        *, *::before, *::after {
          animation-duration: 0.001s !important;
          transition-duration: 0.001s !important;
        }
      `;
    } else {
      styleElement.textContent = '';
    }
    
    if (!styleElement.parentNode) {
      document.head.appendChild(styleElement);
    }
  };

  const handleSave = () => {
    updateSettings({
      ...pendingSettings
    });
    localStorage.setItem('dataDensity', dataDensity);
    localStorage.setItem('textSpacing', textSpacing.toString());
    localStorage.setItem('motionReduced', motionReduced.toString());
    try {
      const safetrackSettings = JSON.parse(localStorage.getItem('safetrackSettings') || '{}');
      const updatedSettings = {
        ...safetrackSettings,
        dataDensity,
        textSpacing,
        motionReduced,
        ...pendingSettings
      };
      localStorage.setItem('safetrackSettings', JSON.stringify(updatedSettings));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
    setPendingSettings({});
    setHasUnsavedChanges(false);
    setSaveSuccess(true);
  };

  const handleReset = () => {
    resetSettings();
    setDataDensity('medium');
    setTextSpacing(100);
    setMotionReduced(false);
    applyDataDensity('medium');
    applyTextSpacing(100);
    applyMotionReduction(false);
    localStorage.removeItem('dataDensity');
    localStorage.removeItem('textSpacing');
    localStorage.removeItem('motionReduced');
    setPendingSettings({});
    setHasUnsavedChanges(false);
    setTimeout(() => {
      applyThemeMode('light');
      const defaultColorScheme = getAvailableColorSchemes().find(scheme => scheme.id === 'blue');
      if (defaultColorScheme) {
        applyColorScheme('blue');
      }
      setResetSuccess(true);
    }, 50);
  };

  useEffect(() => {
    applyDataDensity(dataDensity);
    applyTextSpacing(textSpacing);
    applyMotionReduction(motionReduced);
    const savedTheme = localStorage.getItem('preferredTheme');
    const savedColorScheme = localStorage.getItem('preferredColorScheme');
    const themeToApply = savedTheme || settings.themeMode;
    const colorSchemeToApply = savedColorScheme || settings.colorScheme;
    document.documentElement.classList.add(`${themeToApply}-mode`);
    document.body.dataset.theme = themeToApply;

    return () => {
      const densityStyles = document.getElementById('data-density-styles');
      if (densityStyles) densityStyles.parentNode.removeChild(densityStyles);
      const spacingStyles = document.getElementById('text-spacing-styles');
      if (spacingStyles) spacingStyles.parentNode.removeChild(spacingStyles);
      const motionStyles = document.getElementById('reduced-motion-styles');
      if (motionStyles) motionStyles.parentNode.removeChild(motionStyles);
    };
  }, []);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
        <Header pageTitle="Settings" />
        <Container maxWidth="xl" sx={{ py: 3 }}>
          <SettingsHeader>System Settings</SettingsHeader>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <SettingsCard elevation={0}>
                <SectionTitle>
                  <TitleIcon>
                    <AlertsIcon />
                  </TitleIcon>
                  <Typography variant="h6" fontWeight={600}>
                    Notification Preferences
                  </Typography>
                </SectionTitle>
                <Divider sx={{ mb: 3 }} />
                <SettingSection>
                  <Typography variant="subtitle2" fontWeight="medium" sx={{ mb: 1 }}>
                    Notification Method
                  </Typography>
                  <FormSection>
                    <RadioGroup 
                      row
                      name="notificationMethod" 
                      value={settings.notificationMethod}
                      onChange={handleChange('notificationMethod')}
                    >
                      <FormControlLabel 
                        value="email" 
                        control={<Radio color="primary" size="small" />} 
                        label={
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <EmailIcon fontSize="small" sx={{ mr: 0.5 }} />
                            <Typography variant="body2">Email</Typography>
                          </Box>
                        }
                        sx={{ mr: 3 }}
                      />
                      <FormControlLabel 
                        value="sms" 
                        control={<Radio color="primary" size="small" />} 
                        label={
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <SmsIcon fontSize="small" sx={{ mr: 0.5 }} />
                            <Typography variant="body2">SMS</Typography>
                          </Box>
                        }
                      />
                    </RadioGroup>
                  </FormSection>
                </SettingSection>
                <SettingSection>
                  <Typography variant="subtitle2" fontWeight="medium" sx={{ mb: 1 }}>
                    Alert Types
                  </Typography>
                  <FormSection>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <FormControlLabel 
                        control={
                          <Switch 
                            checked={settings.followUpAlerts}
                            onChange={handleChange('followUpAlerts')}
                            color="primary"
                            size="small"
                          />
                        }
                        label={
                          <Typography variant="body2">
                            Follow-up alerts (24h before deadline)
                          </Typography>
                        }
                      />
                      <FormControlLabel 
                        control={
                          <Switch 
                            checked={settings.violationAlerts}
                            onChange={handleChange('violationAlerts')}
                            color="primary"
                            size="small"
                          />
                        }
                        label={
                          <Typography variant="body2">
                            Critical violation alerts
                          </Typography>
                        }
                      />
                      <FormControlLabel 
                        control={
                          <Switch 
                            checked={settings.upcomingInspections}
                            onChange={handleChange('upcomingInspections')}
                            color="primary"
                            size="small"
                          />
                        }
                        label={
                          <Typography variant="body2">
                            Upcoming inspection reminders
                          </Typography>
                        }
                      />
                    </Box>
                  </FormSection>
                </SettingSection> 
              </SettingsCard>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <SettingsCard elevation={0}>
                <SectionTitle>
                  <TitleIcon className="color-scheme-sensitive color-primary">
                    <ThemeIcon />
                  </TitleIcon>
                  <Typography variant="h6" fontWeight={600}>
                    Display Settings
                  </Typography>
                </SectionTitle>
                <Divider sx={{ mb: 3 }} />
                <SettingSection>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="subtitle2" fontWeight="medium" sx={{ mb: 1 }}>
                      Theme Mode
                    </Typography>
                    <TestBadge>Beta</TestBadge>
                  </Box>
                  <FormSection>
                    <RadioGroup 
                      row
                      name="themeMode"  
                      value={settings.themeMode}
                      onChange={handleChange('themeMode')}
                    >
                      <FormControlLabel 
                        value="light" 
                        control={
                          <Radio 
                            color="primary" 
                            size="small"
                            onClick={() => {
                              if (settings.themeMode !== 'light') {
                                document.body.style.backgroundColor = '#f5f8fb';
                              }
                            }}
                          />
                        }
                        label={
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <LightModeIcon 
                              fontSize="small" 
                              sx={{ 
                                mr: 0.5, 
                                color: settings.themeMode === 'light' ? 'primary.main' : 'inherit',
                                transition: 'color 0.3s ease'
                              }} 
                              className="color-scheme-sensitive color-primary"
                            />
                            <Typography variant="body2">Light</Typography>
                          </Box>
                        }
                        sx={{ mr: 3 }}
                      />
                      <FormControlLabel 
                        value="dark" 
                        control={
                          <Radio 
                            color="primary" 
                            size="small"
                            onClick={() => {
                              if (settings.themeMode !== 'dark') {
                                document.body.style.backgroundColor = '#121212';
                              }
                            }}
                          />
                        }
                        label={
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <DarkModeIcon 
                              fontSize="small" 
                              sx={{ 
                                mr: 0.5, 
                                color: settings.themeMode === 'dark' ? 'primary.main' : 'inherit',
                                transition: 'color 0.3s ease'
                              }} 
                              className="color-scheme-sensitive color-primary"
                            />
                            <Typography variant="body2">Dark</Typography>
                          </Box>
                        }
                      />
                    </RadioGroup>
                    <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', bgcolor: alpha(theme.palette.warning.light, 0.1), p: 1, borderRadius: 1 }}>
                      <InfoIcon fontSize="small" sx={{ color: 'warning.main', mr: 0.5 }} />
                      <Typography variant="caption" color="text.secondary">
                        Dark mode is in testing phase. Some UI elements may not display correctly.
                      </Typography>
                    </Box>
                  </FormSection>
                </SettingSection>
                <SettingSection>
                  <Typography variant="subtitle2" fontWeight="medium" sx={{ mb: 1 }}>
                    Data Display Density
                  </Typography>
                  <FormSection>
                    <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: 'block' }}>
                      Control how compact or spacious content appears throughout the application
                    </Typography>
                    
                    <Box sx={{ display: 'flex', gap: 1.5, mb: 2 }}>
                      <DataDensityOption 
                        isSelected={dataDensity === 'compact'}
                        onClick={() => handleDataDensityChange('compact')}
                        sx={{ flex: 1 }}
                      >
                        <Box sx={{ mr: 1, fontSize: 18 }}>🔍</Box>
                        <Box>
                          <Typography variant="body2" fontWeight="medium">Compact</Typography>
                          <Typography variant="caption" color="text.secondary">Fit more content</Typography>
                        </Box>
                      </DataDensityOption>
                      
                      <DataDensityOption 
                        isSelected={dataDensity === 'medium'}
                        onClick={() => handleDataDensityChange('medium')}
                        sx={{ flex: 1 }}
                      >
                        <Box sx={{ mr: 1, fontSize: 18 }}>📊</Box>
                        <Box>
                          <Typography variant="body2" fontWeight="medium">Medium</Typography>
                          <Typography variant="caption" color="text.secondary">Balanced view</Typography>
                        </Box>
                      </DataDensityOption>
                      
                      <DataDensityOption 
                        isSelected={dataDensity === 'comfortable'}
                        onClick={() => handleDataDensityChange('comfortable')}
                        sx={{ flex: 1 }}
                      >
                        <Box sx={{ mr: 1, fontSize: 18 }}>👁️</Box>
                        <Box>
                          <Typography variant="body2" fontWeight="medium">Comfortable</Typography>
                          <Typography variant="caption" color="text.secondary">More spacing</Typography>
                        </Box>
                      </DataDensityOption>
                    </Box>
                    
                    <Divider sx={{ my: 2 }} />
                    
                    <Typography variant="subtitle2" fontWeight="medium" sx={{ mb: 1, mt: 2 }}>
                      Accessibility Options
                    </Typography>
                    
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="body2" sx={{ mb: 1 }}>Text Spacing</Typography>
                      <Box sx={{ px: 1 }}>
                        <AccessibilitySlider
                          value={textSpacing}
                          onChange={handleTextSpacingChange}
                          min={90}
                          max={150}
                          step={5}
                          valueLabelDisplay="auto"
                          valueLabelFormat={(value) => `${value}%`}
                          marks={[
                            { value: 90, label: 'Tighter' },
                            { value: 100, label: 'Default' },
                            { value: 150, label: 'Wider' }
                          ]}
                        />
                      </Box>
                    </Box>
                    
                    <FormControlLabel
                      control={
                        <Switch 
                          checked={motionReduced}
                          onChange={handleMotionReducedChange}
                          color="primary"
                        />
                      }
                      label={
                        <Box>
                          <Typography variant="body2">Reduce Motion</Typography>
                          <Typography variant="caption" color="text.secondary" display="block">
                            Minimize animations and transitions
                          </Typography>
                        </Box>
                      }
                    />
                    
                    <Box sx={{ 
                      mt: 2,
                      p: 1.5, 
                      borderRadius: 1.5, 
                      backgroundColor: alpha(theme.palette.info.main, 0.08),
                      display: 'flex',
                      alignItems: 'flex-start'
                    }}>
                      <InfoIcon fontSize="small" sx={{ color: 'info.main', mr: 1, mt: 0.5 }} />
                      <Typography variant="caption" color="text.secondary">
                        These settings help improve your experience by adapting the interface to your preferences. 
                        Changes apply immediately across all pages.
                      </Typography>
                    </Box>
                  </FormSection>
                </SettingSection>
              </SettingsCard>
            </Grid>
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4, gap: 2 }}>
            <ActionButton 
              variant="outlined" 
              color="secondary" 
              startIcon={<ResetIcon />}
              onClick={handleReset}
              className="color-scheme-sensitive"
            >
              Reset to Default
            </ActionButton>
            <ActionButton 
              variant="contained" 
              color="primary" 
              startIcon={<SaveIcon />}
              onClick={handleSave}
              disabled={!hasUnsavedChanges}
              className="color-scheme-sensitive bg-primary"
            >
              Save Changes
            </ActionButton>
          </Box>
        </Container>
        <Snackbar 
          open={saveSuccess} 
          autoHideDuration={3000} 
          onClose={() => setSaveSuccess(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={() => setSaveSuccess(false)} severity="success" sx={{ width: '100%' }}>
            Settings saved successfully!
          </Alert>
        </Snackbar>
        <Snackbar 
          open={resetSuccess} 
          autoHideDuration={3000} 
          onClose={() => setResetSuccess(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={() => setResetSuccess(false)} severity="info" sx={{ width: '100%' }}>
            Settings reset to default values
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default Settings;