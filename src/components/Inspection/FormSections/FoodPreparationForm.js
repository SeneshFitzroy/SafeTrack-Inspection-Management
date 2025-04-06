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
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
  CardContent,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const FoodPreparationForm = ({ formData, handleChange, errors }) => {
  return (
    <Box>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Part 03 - Area of Food Preparation/Serving/Display/Storage
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Assess the cleanliness, safety, and condition of food preparation, serving, display, and storage areas according to health regulations.
      </Typography>

      <Accordion defaultExpanded sx={{ mb: 2 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography fontWeight="medium">Section 3.1 - Hygiene & Cleanliness Assessment</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth error={!!errors.generalCleanliness}>
                <InputLabel>3.1 Overall Cleanliness & Hygiene of Food Preparation Area</InputLabel>
                <Select
                  name="generalCleanliness"
                  value={formData.generalCleanliness}
                  onChange={handleChange}
                  label="3.1 Overall Cleanliness & Hygiene of Food Preparation Area"
                >
                  <MenuItem value="Satisfactory">Satisfactory - Clean, organized, and meets hygiene standards</MenuItem>
                  <MenuItem value="Unsatisfactory">Unsatisfactory - Issues with cleanliness or organization found</MenuItem>
                </Select>
                {errors.generalCleanliness && <FormHelperText>{errors.generalCleanliness}</FormHelperText>}
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>3.2 Implementation of Food Safety & Cleanliness Measures</InputLabel>
                <Select
                  name="safetyMeasures"
                  value={formData.safetyMeasures}
                  onChange={handleChange}
                  label="3.2 Implementation of Food Safety & Cleanliness Measures"
                >
                  <MenuItem value="Satisfactory">Satisfactory - Proper cleaning protocols and safety measures observed</MenuItem>
                  <MenuItem value="Unsatisfactory">Unsatisfactory - Inadequate procedures for maintaining cleanliness</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>3.3 Presence of Flies or Flying Insects in Food Areas</InputLabel>
                <Select
                  name="flies"
                  value={formData.flies}
                  onChange={handleChange}
                  label="3.3 Presence of Flies or Flying Insects in Food Areas"
                >
                  <MenuItem value="Yes">Yes - Flying insects observed in food preparation/serving areas</MenuItem>
                  <MenuItem value="No">No - No evidence of flies or other flying insects</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>3.4 Evidence of Pest Infestation (Ants/Cockroaches/Rodents)</InputLabel>
                <Select
                  name="rodentsPresence"
                  value={formData.rodentsPresence}
                  onChange={handleChange}
                  label="3.4 Evidence of Pest Infestation (Ants/Cockroaches/Rodents)"
                >
                  <MenuItem value="Yes">Yes - Signs of pests or pest activity observed</MenuItem>
                  <MenuItem value="No">No - No evidence of pest presence or activity</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded sx={{ mb: 2 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography fontWeight="medium">Section 3.2 - Structural Condition & Space Management</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>3.5 Floor Condition, Cleanliness & Suitability for Food Handling</InputLabel>
                <Select
                  name="floorMaintenance"
                  value={formData.floorMaintenance}
                  onChange={handleChange}
                  label="3.5 Floor Condition, Cleanliness & Suitability for Food Handling"
                >
                  <MenuItem value="Good">Good - Clean, intact, non-absorbent, easy to clean</MenuItem>
                  <MenuItem value="Poor">Poor - Damaged, dirty, or unsuitable for food handling areas</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>3.6 Wall Surfaces Condition, Cleanliness & Suitability</InputLabel>
                <Select
                  name="wallsMaintenance"
                  value={formData.wallsMaintenance}
                  onChange={handleChange}
                  label="3.6 Wall Surfaces Condition, Cleanliness & Suitability"
                >
                  <MenuItem value="Good">Good - Clean, smooth, non-absorbent surfaces in good repair</MenuItem>
                  <MenuItem value="Poor">Poor - Damaged, dirty, or unsuitable wall surfaces</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>3.7 Ceiling Structure, Cleanliness & Maintenance Status</InputLabel>
                <Select
                  name="ceilingMaintenance"
                  value={formData.ceilingMaintenance}
                  onChange={handleChange}
                  label="3.7 Ceiling Structure, Cleanliness & Maintenance Status"
                >
                  <MenuItem value="Good">Good - Clean, well-maintained, no flaking or peeling</MenuItem>
                  <MenuItem value="Poor">Poor - Damaged, stained, or showing signs of deterioration</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>3.8 Working Space Adequacy for Safe Food Handling</InputLabel>
                <Select
                  name="workingSpace"
                  value={formData.workingSpace}
                  onChange={handleChange}
                  label="3.8 Working Space Adequacy for Safe Food Handling"
                >
                  <MenuItem value="Adequate">Adequate - Sufficient space for separate operations and processes</MenuItem>
                  <MenuItem value="Inadequate">Inadequate - Insufficient space causing cross-contamination risks</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded sx={{ mb: 2 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography fontWeight="medium">Section 3.3 - Hygiene Practices & Waste Management</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>3.9 Regular Cleaning Schedule & Daily Sanitation Procedures</InputLabel>
                <Select
                  name="dailyCleaning"
                  value={formData.dailyCleaning}
                  onChange={handleChange}
                  label="3.9 Regular Cleaning Schedule & Daily Sanitation Procedures"
                >
                  <MenuItem value="Yes">Yes - Evidence of systematic daily cleaning protocols</MenuItem>
                  <MenuItem value="No">No - Inadequate or inconsistent cleaning procedures</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>3.10 Cross-Contamination Risk from Toilet/Sanitation Facilities</InputLabel>
                <Select
                  name="contaminationRisk"
                  value={formData.contaminationRisk}
                  onChange={handleChange}
                  label="3.10 Cross-Contamination Risk from Toilet/Sanitation Facilities"
                >
                  <MenuItem value="Yes">Yes - Potential for contamination due to proximity or arrangement</MenuItem>
                  <MenuItem value="No">No - Properly separated with appropriate barriers and controls</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>3.11 Appropriate Waste Management & Disposal System</InputLabel>
                <Select
                  name="wasteDisposalBins"
                  value={formData.wasteDisposalBins}
                  onChange={handleChange}
                  label="3.11 Appropriate Waste Management & Disposal System"
                >
                  <MenuItem value="Yes">Yes - Adequate covered bins, regularly emptied, properly located</MenuItem>
                  <MenuItem value="No">No - Insufficient, uncovered, or improperly maintained waste bins</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>3.12 Storage of Non-Food Items & Potential Contaminants</InputLabel>
                <Select
                  name="emptyBoxes"
                  value={formData.emptyBoxes}
                  onChange={handleChange}
                  label="3.12 Storage of Non-Food Items & Potential Contaminants"
                >
                  <MenuItem value="Yes">Yes - Inappropriate storage creating clutter or contamination risk</MenuItem>
                  <MenuItem value="No">No - Good organization with proper segregation of non-food items</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>3.13 Availability of Cleaning Tools & Materials</InputLabel>
                <Select
                  name="cleaningTools"
                  value={formData.cleaningTools}
                  onChange={handleChange}
                  label="3.13 Availability of Cleaning Tools & Materials"
                >
                  <MenuItem value="Yes">Yes - Adequate cleaning tools and materials available</MenuItem>
                  <MenuItem value="No">No - Insufficient or missing cleaning equipment</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>3.14 Presence of Objectionable Odors in Food Areas</InputLabel>
                <Select
                  name="objectionableOdor"
                  value={formData.objectionableOdor}
                  onChange={handleChange}
                  label="3.14 Presence of Objectionable Odors in Food Areas"
                >
                  <MenuItem value="Yes">Yes - Unpleasant or concerning odors detected</MenuItem>
                  <MenuItem value="No">No - No objectionable odors present</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>3.15 Open Drains or Stagnant Water Issues</InputLabel>
                <Select
                  name="stagnantWater"
                  value={formData.stagnantWater}
                  onChange={handleChange}
                  label="3.15 Open Drains or Stagnant Water Issues"
                >
                  <MenuItem value="Yes">Yes - Problematic drainage or standing water observed</MenuItem>
                  <MenuItem value="No">No - Proper drainage with no standing water</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded sx={{ mb: 2 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4a-content"
          id="panel4a-header"
        >
          <Typography fontWeight="medium">Section 3.4 - Additional Food Safety Assessment</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>3.16 Area Used for Non-Food Related Activities</InputLabel>
                <Select
                  name="areaUsed"
                  value={formData.areaUsed}
                  onChange={handleChange}
                  label="3.16 Area Used for Non-Food Related Activities"
                >
                  <MenuItem value="Yes">Yes - Food areas used for sleeping, storage, or other unrelated activities</MenuItem>
                  <MenuItem value="No">No - Food areas dedicated exclusively to food-related operations</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>3.17 Use of Separate Utensils for Different Food Types</InputLabel>
                <Select
                  name="separateChoppingBoards"
                  value={formData.separateChoppingBoards}
                  onChange={handleChange}
                  label="3.17 Use of Separate Utensils for Different Food Types"
                >
                  <MenuItem value="Yes">Yes - Separate utensils/boards for different food types (raw/cooked)</MenuItem>
                  <MenuItem value="No">No - No segregation of utensils for different food categories</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>3.18 Equipment & Utensil Cleanliness and Maintenance</InputLabel>
                <Select
                  name="cleanlinessOfEquipment"
                  value={formData.cleanlinessOfEquipment}
                  onChange={handleChange}
                  label="3.18 Equipment & Utensil Cleanliness and Maintenance"
                >
                  <MenuItem value="Good">Good - Clean, sanitized, well-maintained equipment and utensils</MenuItem>
                  <MenuItem value="Poor">Poor - Unclean, damaged, or improperly maintained equipment</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>3.19 Layout Suitability for Food Preparation Processes</InputLabel>
                <Select
                  name="layoutSuitability"
                  value={formData.layoutSuitability}
                  onChange={handleChange}
                  label="3.19 Layout Suitability for Food Preparation Processes"
                >
                  <MenuItem value="Yes">Yes - Efficient and logical layout preventing cross-contamination</MenuItem>
                  <MenuItem value="No">No - Poor layout causing food safety concerns</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>3.20 Ventilation Quality in Food Preparation Areas</InputLabel>
                <Select
                  name="ventilation"
                  value={formData.ventilation}
                  onChange={handleChange}
                  label="3.20 Ventilation Quality in Food Preparation Areas"
                >
                  <MenuItem value="Good">Good - Adequate air flow preventing condensation and odors</MenuItem>
                  <MenuItem value="Poor">Poor - Insufficient ventilation causing condensation or odors</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>3.21 Overall Housekeeping Standards</InputLabel>
                <Select
                  name="houseKeeping"
                  value={formData.houseKeeping}
                  onChange={handleChange}
                  label="3.21 Overall Housekeeping Standards"
                >
                  <MenuItem value="Satisfactory">Satisfactory - Well-organized and maintained facility</MenuItem>
                  <MenuItem value="Unsatisfactory">Unsatisfactory - Disorganized with poor maintenance</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>3.22 Water Supply Suitability for Food Operations</InputLabel>
                <Select
                  name="waterSupply"
                  value={formData.waterSupply}
                  onChange={handleChange}
                  label="3.22 Water Supply Suitability for Food Operations"
                >
                  <MenuItem value="Suitable">Suitable - Clean, potable water appropriately supplied</MenuItem>
                  <MenuItem value="Unsuitable">Unsuitable - Questionable water quality or supply issues</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>3.23 Food Handling Safety & Hygiene Practices</InputLabel>
                <Select
                  name="safeFoodPractices"
                  value={formData.safeFoodPractices}
                  onChange={handleChange}
                  label="3.23 Food Handling Safety & Hygiene Practices"
                >
                  <MenuItem value="Yes">Yes - Proper temperature control, storage, and handling procedures</MenuItem>
                  <MenuItem value="No">No - Poor food handling practices observed</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      <Box sx={{ mt: 3, bgcolor: '#f5f5f5', p: 2, borderRadius: 1 }}>
        <Typography variant="subtitle2" color="text.secondary">
          Note: Critical food safety violations including pest infestations, improper food handling, or inadequate waste management may result in immediate corrective action requirements or establishment closure until remedied.
        </Typography>
      </Box>
    </Box>
  );
};

export default FoodPreparationForm;
