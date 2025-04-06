import React, { createContext, useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Default settings - set themeMode to 'light' by default
const defaultSettings = {
  notificationMethod: 'email',
  emailNotifications: true,
  smsNotifications: false,
  followUpAlerts: true,
  violationAlerts: true,
  upcomingInspections: true,
  fontSize: 'medium',
  language: 'english',
  themeMode: 'light', // Ensure this is 'light'
  colorScheme: 'blue',
  contrastLevel: 2,
  dataUsage: 'balanced',
  autoSync: true
};

// Create context
export const AppSettingsContext = createContext();

// Color schemes mapping - enhanced with additional properties for better UI integration
const colorSchemes = {
  blue: {
    main: '#1976d2',
    light: '#42a5f5',
    dark: '#1565c0',
    contrastText: '#ffffff',
    name: 'Blue'
  },
  teal: {
    main: '#009688',
    light: '#4db6ac',
    dark: '#00796b',
    contrastText: '#ffffff',
    name: 'Teal'
  },
  indigo: {
    main: '#3f51b5',
    light: '#7986cb',
    dark: '#303f9f',
    contrastText: '#ffffff',
    name: 'Indigo'
  },
  purple: {
    main: '#9c27b0',
    light: '#ba68c8',
    dark: '#7b1fa2',
    contrastText: '#ffffff',
    name: 'Purple'
  },
  green: {
    main: '#4caf50',
    light: '#81c784',
    dark: '#388e3c',
    contrastText: '#ffffff',
    name: 'Green'
  },
  orange: {
    main: '#ff9800',
    light: '#ffb74d',
    dark: '#f57c00',
    contrastText: '#ffffff',
    name: 'Orange'
  }
};

// Font size mapping for more consistent application
const fontSizes = {
  small: {
    htmlFontSize: 14,
    fontSize: 13,
    h1: { fontSize: '2rem' },
    h2: { fontSize: '1.75rem' },
    h3: { fontSize: '1.5rem' },
    h4: { fontSize: '1.25rem' },
    h5: { fontSize: '1.1rem' },
    h6: { fontSize: '1rem' },
    body1: { fontSize: '0.875rem' },
    body2: { fontSize: '0.8rem' },
    button: { fontSize: '0.875rem' },
    caption: { fontSize: '0.7rem' },
    name: 'Small'
  },
  medium: {
    htmlFontSize: 16,
    fontSize: 14,
    h1: { fontSize: '2.25rem' },
    h2: { fontSize: '2rem' },
    h3: { fontSize: '1.75rem' },
    h4: { fontSize: '1.5rem' },
    h5: { fontSize: '1.25rem' },
    h6: { fontSize: '1.1rem' },
    body1: { fontSize: '1rem' },
    body2: { fontSize: '0.875rem' },
    button: { fontSize: '0.9375rem' },
    caption: { fontSize: '0.75rem' },
    name: 'Medium'
  },
  large: {
    htmlFontSize: 18,
    fontSize: 16,
    h1: { fontSize: '2.7rem' },
    h2: { fontSize: '2.4rem' },
    h3: { fontSize: '2.1rem' },
    h4: { fontSize: '1.8rem' },
    h5: { fontSize: '1.5rem' },
    h6: { fontSize: '1.3rem' },
    body1: { fontSize: '1.125rem' },
    body2: { fontSize: '1rem' },
    button: { fontSize: '1.0625rem' },
    caption: { fontSize: '0.875rem' },
    name: 'Large'
  }
};

// Available languages (for future implementation)
const languages = {
  english: { name: 'English', code: 'en', available: true },
  sinhala: { name: 'සිංහල', code: 'si', available: false },
  tamil: { name: 'தமிழ்', code: 'ta', available: false }
};

export const AppSettingsProvider = ({ children }) => {
  // Get settings from localStorage or use defaults,
  // but override with light theme if the saved setting is invalid
  const [settings, setSettings] = useState(() => {
    try {
      const savedSettings = localStorage.getItem('safetrackSettings');
      const parsedSettings = savedSettings ? JSON.parse(savedSettings) : defaultSettings;

      // Explicitly ensure we're starting with light mode unless specifically set to dark
      if (savedSettings && typeof parsedSettings.themeMode !== 'string') {
        parsedSettings.themeMode = 'light';
      }

      return parsedSettings;
    } catch (error) {
      console.error("Error loading settings:", error);
      return defaultSettings;
    }
  });

  // Create theme based on settings
  const [theme, setTheme] = useState(() => createApplicationTheme(settings));

  // Function to create theme based on settings - enhanced for better control
  function createApplicationTheme(currentSettings) {
    const colorScheme = colorSchemes[currentSettings.colorScheme] || colorSchemes.blue;
    const fontSizeConfig = fontSizes[currentSettings.fontSize] || fontSizes.medium;

    // Always double-check that themeMode is valid
    const safeThemeMode = (currentSettings.themeMode === 'dark') ? 'dark' : 'light';

    return createTheme({
      palette: {
        mode: safeThemeMode,
        primary: {
          main: colorScheme.main,
          light: colorScheme.light,
          dark: colorScheme.dark,
          contrastText: colorScheme.contrastText
        },
        background: {
          default: safeThemeMode === 'dark' ? '#121212' : '#f5f8fb',
          paper: safeThemeMode === 'dark' ? '#1e1e1e' : '#ffffff',
        },
        text: {
          primary: safeThemeMode === 'dark' ? '#ffffff' : 'rgba(0, 0, 0, 0.87)',
          secondary: safeThemeMode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
        },
      },
      typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontSize: fontSizeConfig.fontSize,
        htmlFontSize: fontSizeConfig.htmlFontSize,
        h1: fontSizeConfig.h1,
        h2: fontSizeConfig.h2,
        h3: fontSizeConfig.h3,
        h4: fontSizeConfig.h4,
        h5: fontSizeConfig.h5,
        h6: fontSizeConfig.h6,
        body1: fontSizeConfig.body1,
        body2: fontSizeConfig.body2,
        button: fontSizeConfig.button,
        caption: fontSizeConfig.caption,
      },
      components: {
        MuiCssBaseline: {
          styleOverrides: {
            html: {
              fontSize: `${fontSizeConfig.htmlFontSize}px`,
            },
            body: {
              fontSize: `${fontSizeConfig.fontSize}px`,
              transition: 'background-color 0.3s, color 0.3s',
            },
          },
        },
        MuiPaper: {
          styleOverrides: {
            root: {
              transition: 'background-color 0.3s, color 0.3s, box-shadow 0.3s',
              filter: `contrast(${1 + currentSettings.contrastLevel * 0.05})`,
            },
          },
        },
        MuiButton: {
          styleOverrides: {
            root: {
              transition: 'background-color 0.3s, color 0.3s, box-shadow 0.3s',
            },
          },
        },
        // Enhanced typography overrides for consistency
        MuiTypography: {
          styleOverrides: {
            root: {
              transition: 'font-size 0.3s, color 0.3s',
            },
          },
        },
      },
    });
  }

  // Update settings with added validation for themeMode
  const updateSettings = (updatedSettings) => {
    // Validate themeMode if it's being updated
    if (updatedSettings.themeMode !== undefined &&
        updatedSettings.themeMode !== 'light' &&
        updatedSettings.themeMode !== 'dark') {
      updatedSettings.themeMode = 'light'; // default to light for invalid values
    }

    const newSettings = { ...settings, ...updatedSettings };
    setSettings(newSettings);

    // Create new theme based on updated settings
    setTheme(createApplicationTheme(newSettings));

    // Save to localStorage
    localStorage.setItem('safetrackSettings', JSON.stringify(newSettings));
  };

  // Reset settings
  const resetSettings = () => {
    setSettings(defaultSettings);
    setTheme(createApplicationTheme(defaultSettings));
    localStorage.setItem('safetrackSettings', JSON.stringify(defaultSettings));
  };

  // Apply theme mode with explicit validation
  const applyThemeMode = (mode) => {
    // Only accept 'light' or 'dark' as valid modes
    const validMode = (mode === 'dark') ? 'dark' : 'light';
    updateSettings({ themeMode: validMode });

    // Update data-theme attribute for CSS selectors
    document.documentElement.setAttribute('data-theme', validMode);
  };

  // Enhanced color scheme application with additional features
  const applyColorScheme = (colorScheme) => {
    if (!colorSchemes[colorScheme]) {
      console.warn(`Color scheme "${colorScheme}" not found, defaulting to blue.`);
      colorScheme = 'blue';
    }

    updateSettings({ colorScheme });

    // Apply color properties as CSS variables for non-MUI components
    const scheme = colorSchemes[colorScheme];
    document.documentElement.style.setProperty('--primary-main', scheme.main);
    document.documentElement.style.setProperty('--primary-light', scheme.light);
    document.documentElement.style.setProperty('--primary-dark', scheme.dark);
  };

  // Enhanced font size application with better scaling
  const applyFontSize = (fontSize) => {
    if (!fontSizes[fontSize]) {
      console.warn(`Font size "${fontSize}" not found, defaulting to medium.`);
      fontSize = 'medium';
    }

    updateSettings({ fontSize });

    // Apply base font size to html element for rem scaling
    const size = fontSizes[fontSize];
    document.documentElement.style.fontSize = `${size.htmlFontSize}px`;

    // Add a class to the body for additional CSS targeting
    document.body.className = document.body.className
      .replace(/font-size-\S+/g, '')
      .concat(` font-size-${fontSize}`);
  };

  // Enhanced language application with availability status
  const applyLanguage = (language) => {
    // Check if language is available
    const langInfo = languages[language] || languages.english;

    updateSettings({ language });
    document.documentElement.setAttribute('lang', langInfo.code);

    // If language is not available, show notification
    if (!langInfo.available && language !== 'english') {
      console.log(`Language ${langInfo.name} is not fully implemented yet. Using English as fallback.`);
      // In a real app, you would show a toast notification here
    }
  };

  // Apply contrast
  const applyContrast = (contrastLevel) => {
    updateSettings({ contrastLevel });
  };

  // Expose color schemes and font sizes to components
  const getAvailableColorSchemes = () => {
    return Object.entries(colorSchemes).map(([id, scheme]) => ({
      id,
      name: scheme.name,
      color: scheme.main
    }));
  };

  const getAvailableFontSizes = () => {
    return Object.entries(fontSizes).map(([id, size]) => ({
      id,
      name: size.name
    }));
  };

  const getAvailableLanguages = () => {
    return Object.entries(languages).map(([id, lang]) => ({
      id,
      name: lang.name,
      code: lang.code,
      available: lang.available
    }));
  };

  // Apply settings on initial load
  useEffect(() => {
    // Apply language immediately as it's not covered by theme
    document.documentElement.setAttribute('lang', settings.language);

    // Validate theme mode and then set data-theme attribute
    const validThemeMode = (settings.themeMode === 'dark') ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', validThemeMode);

    // If current theme mode doesn't match what's saved, update saved settings
    if (validThemeMode !== settings.themeMode) {
      updateSettings({ themeMode: validThemeMode });
    }

    // Set up viewport height fix for mobile browsers
    const setDocHeight = () => {
      document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    };
    window.addEventListener('resize', setDocHeight);
    setDocHeight();

    // Apply enhanced settings immediately
    applyColorScheme(settings.colorScheme);
    applyFontSize(settings.fontSize);
    applyLanguage(settings.language);

    return () => window.removeEventListener('resize', setDocHeight);
  }, []);

  return (
    <AppSettingsContext.Provider
      value={{
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
      }}
    >
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </AppSettingsContext.Provider>
  );
};
