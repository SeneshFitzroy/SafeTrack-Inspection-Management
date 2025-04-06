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
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const ReviewSubmission = ({ formData, handleChange, errors }) => {
  // Helper function to count issues
  const countIssues = () => {
    let issues = 0;
    
    // Count "No" responses for positive questions
    if (formData.dailyCleaning === "No") issues++;
    if (formData.wasteDisposalBins === "No") issues++;
    if (formData.cleaningTools === "No") issues++;
    if (formData.separateChoppingBoards === "No") issues++;
    if (formData.safeFoodPractices === "No") issues++;
    if (formData.displayHealthInstructions === "No") issues++;
    if (formData.recordKeeping === "No") issues++;
    
    // Count "Yes" responses for negative questions
    if (formData.pollutionConditions === "Yes") issues++;
    if (formData.animalsPresence === "Yes") issues++;
    if (formData.smokeEffects === "Yes") issues++;
    if (formData.hazards === "Yes") issues++;
    if (formData.flies === "Yes") issues++;
    if (formData.rodentsPresence === "Yes") issues++;
    if (formData.contaminationRisk === "Yes") issues++;
    if (formData.emptyBoxes === "Yes") issues++;
    if (formData.objectionableOdor === "Yes") issues++;
    if (formData.stagnantWater === "Yes") issues++;
    if (formData.areaUsed === "Yes") issues++;
    
    // Count "Poor" or "Unsatisfactory" conditions
    if (formData.cleanliness === "Unsatisfactory") issues++;
    if (formData.floorCondition === "Bad") issues++;
    if (formData.wallCondition === "Bad") issues++;
    if (formData.ceilingCondition === "Bad") issues++;
    if (formData.generalCleanliness === "Unsatisfactory") issues++;
    if (formData.safetyMeasures === "Unsatisfactory") issues++;
    if (formData.floorMaintenance === "Poor") issues++;
    if (formData.wallsMaintenance === "Poor") issues++;
    if (formData.ceilingMaintenance === "Poor") issues++;
    if (formData.cleanlinessOfEquipment === "Poor") issues++;
    
    return issues;
  };

  // Recommend a rating based on issues
  const getRecommendedRating = () => {
    const issues = countIssues();
    
    if (issues === 0) return "A";
    if (issues <= 3) return "B";
    if (issues <= 8) return "C";
    return "D";
  };

  const recommendedRating = getRecommendedRating();

  return (
    <Box>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Final Assessment Review & Submission Summary
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Comprehensive summary of inspection findings, final compliance determination, and submission of the official assessment with supporting evidence and recommendations.
      </Typography>

      <Accordion defaultExpanded sx={{ mb: 2 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography fontWeight="medium">Non-Compliance Issues & Regulatory Violations Summary</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2" paragraph>
            Based on your comprehensive inspection, {countIssues()} potential issues or violations have been identified that require attention.
          </Typography>
          
          <List dense>
            {formData.cleanliness === "Unsatisfactory" && (
              <ListItem>
                <ListItemText 
                  primary="General environmental cleanliness is below required standards" 
                  secondary="Part 1.2 - General Environmental Cleanliness & Surrounding Area Conditions"
                />
              </ListItem>
            )}
            
            {formData.flies === "Yes" && (
              <ListItem>
                <ListItemText 
                  primary="Flying insects present in food preparation/handling areas" 
                  secondary="Part 3.3 - Presence of Flies or Flying Insects in Food Areas"
                />
              </ListItem>
            )}
            
            {formData.rodentsPresence === "Yes" && (
              <ListItem>
                <ListItemText 
                  primary="Evidence of pest infestation or activity in facility" 
                  secondary="Part 3.4 - Evidence of Pest Infestation (Ants/Cockroaches/Rodents)"
                />
              </ListItem>
            )}
            
            {formData.contaminationRisk === "Yes" && (
              <ListItem>
                <ListItemText 
                  primary="Potential cross-contamination risk from sanitation facilities" 
                  secondary="Part 3.10 - Cross-Contamination Risk from Toilet/Sanitation Facilities"
                />
              </ListItem>
            )}
            
            {/* Display more issues if needed */}
            {countIssues() > 3 && (
              <ListItem>
                <ListItemText 
                  primary={`${countIssues() - 3} additional non-compliance issues identified`} 
                  secondary="See complete inspection report for comprehensive details and remediation requirements"
                />
              </ListItem>
            )}
          </List>
        </AccordionDetails>
      </Accordion>

      <Card variant="outlined" sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth error={!!errors.overallRating}>
                <InputLabel>Final Regulatory Compliance Rating & Health Safety Classification</InputLabel>
                <Select
                  name="overallRating"
                  value={formData.overallRating}
                  onChange={handleChange}
                  label="Final Regulatory Compliance Rating & Health Safety Classification"
                >
                  <MenuItem value="A">A - Excellent (Full Compliance with Health & Safety Standards)</MenuItem>
                  <MenuItem value="B">B - Good (Minor Non-Compliance Issues Requiring Attention)</MenuItem>
                  <MenuItem value="C">C - Fair (Significant Violations Requiring Corrective Action)</MenuItem>
                  <MenuItem value="D">D - Poor (Critical Violations Requiring Immediate Remediation)</MenuItem>
                </Select>
                {errors.overallRating && <FormHelperText>{errors.overallRating}</FormHelperText>}
                <FormHelperText>
                  System-calculated recommendation based on inspection findings: {recommendedRating}
                </FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                name="inspectorNotes"
                label="Inspector's Detailed Observations, Findings & Corrective Action Requirements"
                value={formData.inspectorNotes}
                onChange={handleChange}
                placeholder="Document specific observations, critical findings, required corrective actions, timeline for remediation, and follow-up inspection requirements..."
              />
            </Grid>
            
            <Grid item xs={12}>
              <Box sx={{ border: '1px dashed grey', p: 3, borderRadius: 1, textAlign: 'center' }}>
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="photo-upload"
                  multiple
                  type="file"
                />
                <label htmlFor="photo-upload">
                  <Button
                    variant="outlined"
                    component="span"
                    startIcon={<CloudUploadIcon />}
                  >
                    Upload Photographic Evidence & Supporting Documentation
                  </Button>
                </label>
                <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                  Upload photographs documenting violations, non-compliance issues, facility conditions, equipment status, or other relevant evidence to support inspection findings
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Box sx={{ mt: 3, p: 2, borderRadius: 1, bgcolor: recommendedRating === 'D' ? '#ffebee' : '#e8f5e9' }}>
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          {recommendedRating === 'D' 
            ? 'Critical Health & Safety Violations Requiring Immediate Attention' 
            : 'Inspection Report Ready for Final Submission'}
        </Typography>
        <Typography variant="body2">
          {recommendedRating === 'D' 
            ? 'This establishment has significant health and safety violations that present potential public health risks. These issues require immediate corrective action, with a mandatory follow-up inspection to verify compliance within the specified timeframe.' 
            : 'This comprehensive inspection report is ready for submission to the regulatory database. Please review all information for accuracy and completeness before final submission.'}
        </Typography>
      </Box>
    </Box>
  );
};

export default ReviewSubmission;
