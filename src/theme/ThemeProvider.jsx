import {
  CssBaseline,
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material";
import React from "react";

const appTheme = createTheme({
  palette: {
    primary: {
      main: "rgba(84, 121, 255, 1)", // --primary-color from tailwind.css
    },
    secondary: {
      main: "rgba(241, 245, 254, 1)", // --secondary-color from tailwind.css
    },
    error: {
      main: "rgba(192, 1, 4, 1)", // --red from tailwind.css
    },
    hover: {
      main: "rgba(168, 168, 168, 1)", // --hover from tailwind.css
    },
    text: {
      primary: "#000000", // Black text from the component
      secondary: "#1f41bb", // Blue text from "Welcome To"
    },
    background: {
      default: "#ffffff", // White background
      paper: "#ffffff",
      gradient:
        "linear-gradient(180deg, rgba(230,245,254,1) 0%, rgba(245,236,249,1) 35%)",
    },
  },
  typography: {
    fontFamily: "'Poppins', Helvetica, Arial, sans-serif",
    h1: {
      fontFamily: "'Poppins-SemiBold', Helvetica",
      fontWeight: 600,
      fontSize: "50px",
      lineHeight: "normal",
      textAlign: "center",
    },
    h2: {
      fontFamily: "'Poppins-Medium', Helvetica",
      fontWeight: 500,
      fontSize: "22px",
      lineHeight: "normal",
      textAlign: "center",
    },
    body1: {
      fontFamily: "'Poppins-Regular', Helvetica",
      fontWeight: 400,
      fontSize: "28px",
      lineHeight: "2.5rem", // equivalent to leading-10
      textAlign: "center",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "10px",
          fontFamily: "'Poppins-Medium', Helvetica",
          fontWeight: 500,
          fontSize: "22px",
          padding: "8px 16px",
          minWidth: "235px",
          height: "45px",
        },
        containedPrimary: {
          backgroundColor: "rgba(84, 121, 255, 1)",
          color: "#ffffff",
          "&:hover": {
            backgroundColor: "rgba(60, 90, 200, 1)",
          },
        },
        outlinedPrimary: {
          border: "3px solid rgba(84, 121, 255, 1)",
          color: "rgba(84, 121, 255, 1)",
          "&:hover": {
            backgroundColor: "rgba(84, 121, 255, 0.04)",
            border: "3px solid rgba(84, 121, 255, 1)",
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#ffffff",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundImage: theme.palette.background.gradient,
        }),
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: ({ theme }) => ({
          ...theme.typography.body1,
        }),
        head: ({ theme }) => ({
          ...theme.typography.h2,
          fontWeight: 600,
        }),
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: ({ theme }) => ({
          ...theme.typography.body1,
        }),
        secondary: ({ theme }) => ({
          ...theme.typography.body1,
        }),
      },
    },
  },
});

export const ThemeProvider = ({ children }) => {
  return (
    <MuiThemeProvider theme={appTheme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};
