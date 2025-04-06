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

const LocationEnvironmentForm = ({ formData, handleChange, errors }) => {
  return (
    <Box>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Part 01 - Location & Environment Assessment
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Comprehensive evaluation of the business location's suitability, surrounding environment, and potential external hazards or contaminants.
      </Typography>

      <Card variant="outlined" sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth error={!!errors.locationSuitability}>
                <InputLabel id="location-suitability-label">1.1 Business Location Suitability & Appropriateness for Operations</InputLabel>
                <Select
                  labelId="location-suitability-label"
                  id="locationSuitability"
                  name="locationSuitability"
                  value={formData.locationSuitability}
                  onChange={handleChange}
                  label="1.1 Business Location Suitability & Appropriateness for Operations"
                >
                  <MenuItem value="Suitable">Suitable - Location is appropriate for this type of business operation</MenuItem>
                  <MenuItem value="Unsuitable">Unsuitable - Location presents significant issues for this business type</MenuItem>
                </Select>
                {errors.locationSuitability && <FormHelperText>{errors.locationSuitability}</FormHelperText>}
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth error={!!errors.cleanliness}>
                <InputLabel id="cleanliness-label">1.2 General Environmental Cleanliness & Surrounding Area Conditions</InputLabel>
                <Select
                  labelId="cleanliness-label"
                  id="cleanliness"
                  name="cleanliness"
                  value={formData.cleanliness}
                  onChange={handleChange}
                  label="1.2 General Environmental Cleanliness & Surrounding Area Conditions"
                >
                  <MenuItem value="Satisfying">Satisfactory - Area is generally clean and well-maintained</MenuItem>
                  <MenuItem value="Unsatisfactory">Unsatisfactory - Area has significant cleanliness or maintenance issues</MenuItem>
                </Select>
                {errors.cleanliness && <FormHelperText>{errors.cleanliness}</FormHelperText>}
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="pollution-conditions-label">1.3 Presence of Environmental Pollution or Contamination Sources</InputLabel>
                <Select
                  labelId="pollution-conditions-label"
                  id="pollutionConditions"
                  name="pollutionConditions"
                  value={formData.pollutionConditions}
                  onChange={handleChange}
                  label="1.3 Presence of Environmental Pollution or Contamination Sources"
                >
                  <MenuItem value="Yes">Yes - Environmental contamination sources identified nearby</MenuItem>
                  <MenuItem value="No">No - No significant environmental pollution detected</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="animals-presence-label">1.4 Presence of Domestic or Stray Animals in Business Vicinity</InputLabel>
                <Select
                  labelId="animals-presence-label"
                  id="animalsPresence"
                  name="animalsPresence"
                  value={formData.animalsPresence}
                  onChange={handleChange}
                  label="1.4 Presence of Domestic or Stray Animals in Business Vicinity"
                >
                  <MenuItem value="Yes">Yes - Animals observed in or near business premises</MenuItem>
                  <MenuItem value="No">No - No animals present in the business environment</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="smoke-effects-label">1.5 Smoke, Odors, or Other Environmental Nuisance Factors</InputLabel>
                <Select
                  labelId="smoke-effects-label"
                  id="smokeEffects"
                  name="smokeEffects"
                  value={formData.smokeEffects}
                  onChange={handleChange}
                  label="1.5 Smoke, Odors, or Other Environmental Nuisance Factors"
                >
                  <MenuItem value="Yes">Yes - Smoke, strong odors or other adverse factors present</MenuItem>
                  <MenuItem value="No">No - Environment free from smoke or significant nuisance factors</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Box sx={{ mt: 3, bgcolor: '#f5f5f5', p: 2, borderRadius: 1 }}>
        <Typography variant="subtitle2" color="text.secondary">
          Note: Adverse environmental conditions may impact the overall safety rating of the establishment. The presence of pollution, animals, or smoke in close proximity requires additional preventive measures to maintain proper food safety standards.
        </Typography>
      </Box>
    </Box>
  );
};

export default LocationEnvironmentForm;
