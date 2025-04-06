import React from 'react';
import {
  Box,
  Typography,
  Grid,
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Card,
  CardContent,
} from '@mui/material';

const HealthInstructionsForm = ({ formData, handleChange, errors }) => {
  return (
    <Box>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Part 04 - Health Instructions, Documentation & Compliance Certification
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Comprehensive evaluation of health instruction displays, educational materials, complaint management systems, policy implementation, record-keeping procedures, and regulatory compliance documentation.
      </Typography>

      <Card variant="outlined" sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth error={!!errors.displayHealthInstructions}>
                <InputLabel>4.1 Public Health Information & Food Safety Instructions Display</InputLabel>
                <Select
                  name="displayHealthInstructions"
                  value={formData.displayHealthInstructions}
                  onChange={handleChange}
                  label="4.1 Public Health Information & Food Safety Instructions Display"
                >
                  <MenuItem value="Yes">Yes - Clear and comprehensive health information prominently displayed</MenuItem>
                  <MenuItem value="No">No - Missing or insufficient health instruction displays</MenuItem>
                </Select>
                {errors.displayHealthInstructions && <FormHelperText>{errors.displayHealthInstructions}</FormHelperText>}
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>4.2 Customer/Employee Feedback & Complaint Management System</InputLabel>
                <Select
                  name="entertainComplaints"
                  value={formData.entertainComplaints}
                  onChange={handleChange}
                  label="4.2 Customer/Employee Feedback & Complaint Management System"
                >
                  <MenuItem value="Yes">Yes - Established system for collecting and addressing feedback</MenuItem>
                  <MenuItem value="No">No - No formal process for handling complaints or suggestions</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>4.3 Tobacco Control Policy & No-Smoking Implementation Measures</InputLabel>
                <Select
                  name="preventSmoking"
                  value={formData.preventSmoking}
                  onChange={handleChange}
                  label="4.3 Tobacco Control Policy & No-Smoking Implementation Measures"
                >
                  <MenuItem value="Yes">Yes - Clear no-smoking policy with visible signage and enforcement</MenuItem>
                  <MenuItem value="No">No - No smoking prevention measures or inadequate enforcement</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>4.4 Transaction Documentation & Food Supply Chain Record Keeping</InputLabel>
                <Select
                  name="recordKeeping"
                  value={formData.recordKeeping}
                  onChange={handleChange}
                  label="4.4 Transaction Documentation & Food Supply Chain Record Keeping"
                >
                  <MenuItem value="Yes">Yes - Complete and organized records of purchases and sales maintained</MenuItem>
                  <MenuItem value="No">No - Inadequate or missing transaction documentation</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>4.5 Food Safety System Certification & Regulatory Compliance Documentation</InputLabel>
                <Select
                  name="accreditedCertification"
                  value={formData.accreditedCertification}
                  onChange={handleChange}
                  label="4.5 Food Safety System Certification & Regulatory Compliance Documentation"
                >
                  <MenuItem value="Yes">Yes - Current accredited food safety certification available</MenuItem>
                  <MenuItem value="No">No - Missing or expired certification documentation</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Box sx={{ mt: 3, bgcolor: '#f5f5f5', p: 2, borderRadius: 1 }}>
        <Typography variant="subtitle2" color="text.secondary">
          Note: Proper documentation and visual health instructions are essential compliance requirements. Establishments must maintain current records, display appropriate health information, implement smoking prevention measures, and maintain valid food safety certifications in accordance with local health regulations.
        </Typography>
      </Box>
    </Box>
  );
};

export default HealthInstructionsForm;
