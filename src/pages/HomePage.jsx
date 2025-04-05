import { Box, Button, Paper, Typography, Container } from "@mui/material";
import React from "react";
import safetrackLogoRemovebgPreview1 from "../assets/safetrack-logo-removebg-preview-1.png";

const HomePage = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      width="100%"
      sx={{
        backgroundImage: "linear-gradient(180deg, rgba(230,245,254,1) 0%, rgba(245,236,249,1) 100%)",
      }}
    >
      <Container maxWidth="lg">
        <Paper
          elevation={0}
          sx={{
            width: "100%",
            padding: "4rem 2rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "transparent",
            boxShadow: "none",
            position: "relative",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
            }}
          >
            {/* Welcome To Text */}
            <Typography
              variant="h1"
              color="text.secondary"
              sx={{
                fontWeight: 600,
                fontSize: { xs: "36px", md: "50px" },
                mb: 1,
              }}
            >
              Welcome To
            </Typography>

            {/* Logo */}
            <Box
              component="img"
              src={safetrackLogoRemovebgPreview1}
              alt="Safetrack logo"
              sx={{
                width: { xs: "300px", sm: "500px", md: "600px" },
                maxWidth: "100%",
                height: "auto",
                objectFit: "contain",
                mb: 3,
              }}
            />

            {/* Subheading */}
            <Typography
              variant="body1"
              color="text.primary"
              sx={{
                fontSize: { xs: "18px", sm: "22px", md: "28px" },
                textAlign: "center",
                maxWidth: "600px",
                lineHeight: 1.4,
                mb: 6,
                fontWeight: 500,
              }}
            >
              Ensuring Safe Food Practices with Smart Inspections
            </Typography>

            {/* Buttons */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2.5,
                mt: 2,
                width: "100%",
                maxWidth: "280px",
              }}
            >
              <Button 
                variant="contained" 
                color="primary" 
                fullWidth
                sx={{ 
                  borderRadius: "10px",
                  height: "48px",
                  fontSize: "18px",
                  fontWeight: 500,
                  boxShadow: "0px 4px 10px rgba(84, 121, 255, 0.25)"
                }}
              >
                Login
              </Button>

              <Button 
                variant="outlined" 
                color="primary" 
                fullWidth
                sx={{ 
                  borderRadius: "10px",
                  height: "48px",
                  fontSize: "18px",
                  fontWeight: 500,
                  border: "2px solid",
                }}
              >
                PHI Register
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default HomePage;
