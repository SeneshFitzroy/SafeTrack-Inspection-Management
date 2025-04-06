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

const BuildingAssessmentForm = ({ formData, handleChange, errors }) => {
  return (
    <Box>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Part 02 - Building Structure & Physical Facilities Assessment
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Detailed evaluation of the building's construction, structural integrity, space allocation, maintenance status, and safety considerations for employees and customers.
      </Typography>

      <Card variant="outlined" sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth error={!!errors.buildingNature}>
                <InputLabel id="building-nature-label">2.1 Building Construction Material & Structural Composition</InputLabel>
                <Select
                  labelId="building-nature-label"
                  id="buildingNature"
                  name="buildingNature"
                  value={formData.buildingNature}
                  onChange={handleChange}
                  label="2.1 Building Construction Material & Structural Composition"
                >
                  <MenuItem value="Brick">Brick Construction - Solid masonry construction with good durability</MenuItem>
                  <MenuItem value="Wooden">Wooden Construction - Primarily timber-framed structure</MenuItem>
                  <MenuItem value="Concrete">Concrete Construction - Reinforced concrete structure</MenuItem>
                  <MenuItem value="Mixed">Mixed Construction - Combination of multiple building materials</MenuItem>
                </Select>
                {errors.buildingNature && <FormHelperText>{errors.buildingNature}</FormHelperText>}
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth error={!!errors.buildingSpace}>
                <InputLabel id="building-space-label">2.2 Building Space Adequacy & Floor Area Suitability</InputLabel>
                <Select
                  labelId="building-space-label"
                  id="buildingSpace"
                  name="buildingSpace"
                  value={formData.buildingSpace}
                  onChange={handleChange}
                  label="2.2 Building Space Adequacy & Floor Area Suitability"
                >
                  <MenuItem value="Enough">Adequate Space - Sufficient for business operations and customer flow</MenuItem>
                  <MenuItem value="Not enough">Inadequate Space - Insufficient for proper business function</MenuItem>
                </Select>
                {errors.buildingSpace && <FormHelperText>{errors.buildingSpace}</FormHelperText>}
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="light-ventilation-label">2.3 Natural/Artificial Lighting & Ventilation System Quality</InputLabel>
                <Select
                  labelId="light-ventilation-label"
                  id="lightVentilation"
                  name="lightVentilation"
                  value={formData.lightVentilation}
                  onChange={handleChange}
                  label="2.3 Natural/Artificial Lighting & Ventilation System Quality"
                >
                  <MenuItem value="Good">Good - Proper illumination and air circulation throughout facility</MenuItem>
                  <MenuItem value="Poor">Poor - Inadequate lighting or insufficient ventilation</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="floor-condition-label">2.4 Floor Construction, Material & Maintenance Condition</InputLabel>
                <Select
                  labelId="floor-condition-label"
                  id="floorCondition"
                  name="floorCondition"
                  value={formData.floorCondition}
                  onChange={handleChange}
                  label="2.4 Floor Construction, Material & Maintenance Condition"
                >
                  <MenuItem value="Good">Good - Floor is clean, intact, and suitable for the business type</MenuItem>
                  <MenuItem value="Bad">Bad - Floor shows damage, deterioration, or unsuitable materials</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="wall-condition-label">2.5 Wall Surfaces, Material & Maintenance Condition</InputLabel>
                <Select
                  labelId="wall-condition-label"
                  id="wallCondition"
                  name="wallCondition"
                  value={formData.wallCondition}
                  onChange={handleChange}
                  label="2.5 Wall Surfaces, Material & Maintenance Condition"
                >
                  <MenuItem value="Good">Good - Walls are clean, intact, and properly maintained</MenuItem>
                  <MenuItem value="Bad">Bad - Walls show damage, deterioration, or unsuitable materials</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="ceiling-condition-label">2.6 Ceiling Construction, Material & Maintenance Condition</InputLabel>
                <Select
                  labelId="ceiling-condition-label"
                  id="ceilingCondition"
                  name="ceilingCondition"
                  value={formData.ceilingCondition}
                  onChange={handleChange}
                  label="2.6 Ceiling Construction, Material & Maintenance Condition"
                >
                  <MenuItem value="Good">Good - Ceiling is clean, intact, and free from defects</MenuItem>
                  <MenuItem value="Bad">Bad - Ceiling shows damage, leaks, or maintenance issues</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="hazards-label">2.7 Structural or Physical Hazards to Employees or Customers</InputLabel>
                <Select
                  labelId="hazards-label"
                  id="hazards"
                  name="hazards"
                  value={formData.hazards}
                  onChange={handleChange}
                  label="2.7 Structural or Physical Hazards to Employees or Customers"
                >
                  <MenuItem value="Yes">Yes - Building presents hazards that require immediate attention</MenuItem>
                  <MenuItem value="No">No - No significant structural or physical hazards identified</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Box sx={{ mt: 3, bgcolor: '#f5f5f5', p: 2, borderRadius: 1 }}>
        <Typography variant="subtitle2" color="text.secondary">
          Note: Structural deficiencies or physical hazards in the building may require immediate corrective action. Poor building conditions increase risks to food safety and require more frequent inspections to monitor compliance with health regulations.
        </Typography>
      </Box>
    </Box>
  );
};

export default BuildingAssessmentForm;
