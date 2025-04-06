import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Paper, 
  Button, 
  Stepper, 
  Step, 
  StepLabel,
  Container,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Alert,
  Card,
  CardContent,
  IconButton,
  Input,
  FormHelperText,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BusinessIcon from '@mui/icons-material/Business';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import DeleteIcon from '@mui/icons-material/Delete';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ImageIcon from '@mui/icons-material/Image';
import DescriptionIcon from '@mui/icons-material/Description';
import LocationEnvironmentForm from './FormSections/LocationEnvironmentForm';
import BuildingAssessmentForm from './FormSections/BuildingAssessmentForm';
import FoodPreparationForm from './FormSections/FoodPreparationForm';
import HealthInstructionsForm from './FormSections/HealthInstructionsForm';
import ReviewSubmission from './FormSections/ReviewSubmission';
import InspectionDetailsPanel from './InspectionDetailsPanel';

const steps = [
  'Location & Environment',
  'Building Assessment',
  'Food Preparation Area',
  'Health Instructions & Certification',
  'Review & Submit'
];

const InspectionForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeStep, setActiveStep] = useState(0);
  const [shops, setShops] = useState([
    { id: 'SH001', name: 'Golden Dragon Restaurant', address: '123 Main St' },
    { id: 'SH002', name: 'Tasty Bakery', address: '456 Oak Ave' },
    { id: 'SH003', name: 'ABC Cafe & Bakery', address: '789 Pine Rd' },
    { id: 'SH004', name: 'Sunrise Diner', address: '321 Maple Blvd' },
    { id: 'SH005', name: 'Spice Heaven', address: '555 Cedar Ln' }
  ]);
  const [selectedShop, setSelectedShop] = useState(null);

  const [formData, setFormData] = useState({
    // Location & Environment (Part 1)
    locationSuitability: "Suitable",
    cleanliness: "Satisfying",
    pollutionConditions: "No",
    animalsPresence: "No",
    smokeEffects: "No",

    // Building Assessment (Part 2)
    buildingNature: "Brick",
    buildingSpace: "Enough",
    lightVentilation: "Good",
    floorCondition: "Good",
    wallCondition: "Good",
    ceilingCondition: "Good",
    hazards: "No",

    // Food Preparation Area (Part 3)
    // Section 3.1 - Hygiene & Cleanliness
    generalCleanliness: "Satisfactory",
    safetyMeasures: "Satisfactory",
    flies: "No",
    rodentsPresence: "No",
    
    // Section 3.2 - Structural Condition
    floorMaintenance: "Good",
    wallsMaintenance: "Good",
    ceilingMaintenance: "Good",
    workingSpace: "Adequate",
    
    // Section 3.3 - Hygiene Practices
    dailyCleaning: "Yes",
    contaminationRisk: "No",
    wasteDisposalBins: "Yes",
    emptyBoxes: "No",
    cleaningTools: "Yes",
    objectionableOdor: "No",
    stagnantWater: "No",
    
    // Section 3.4 - Additional Assessment
    areaUsed: "No",
    separateChoppingBoards: "Yes",
    cleanlinessOfEquipment: "Good",
    layoutSuitability: "Yes",
    ventilation: "Good",
    houseKeeping: "Satisfactory",
    waterSupply: "Suitable",
    safeFoodPractices: "Yes",

    // Health Instructions & Certification (Part 4)
    displayHealthInstructions: "Yes",
    entertainComplaints: "Yes",
    preventSmoking: "Yes",
    recordKeeping: "Yes",
    accreditedCertification: "Yes",

    // Metadata
    shopId: location.state?.shopId || "",
    shopName: "",
    shopAddress: "",
    inspector: "John Doe", // In a real app this would come from user context
    inspectorNotes: "",
    overallRating: "",
    photoEvidence: []
  });

  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  const [attachments, setAttachments] = useState([]);
  const fileInputRef = React.useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));

    // Clear any error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateCurrentStep = () => {
    const newErrors = {};
    let isValid = true;

    // Different validation for each step
    if (activeStep === 0) {
      // Location & Environment validation
      if (!formData.locationSuitability) {
        newErrors.locationSuitability = "Please select suitability";
        isValid = false;
      }
      if (!formData.cleanliness) {
        newErrors.cleanliness = "Please select cleanliness";
        isValid = false;
      }
    } else if (activeStep === 1) {
      // Building Assessment validation
      if (!formData.buildingNature) {
        newErrors.buildingNature = "Please select building type";
        isValid = false;
      }
      if (!formData.buildingSpace) {
        newErrors.buildingSpace = "Please select space assessment";
        isValid = false;
      }
    } else if (activeStep === 2) {
      // Food Preparation Area validation
      if (!formData.generalCleanliness) {
        newErrors.generalCleanliness = "Please select cleanliness level";
        isValid = false;
      }
    } else if (activeStep === 3) {
      // Health Instructions validation
      if (!formData.displayHealthInstructions) {
        newErrors.displayHealthInstructions = "Please select an option";
        isValid = false;
      }
    } else if (activeStep === 4) {
      // Review & Submit validation
      if (!formData.overallRating) {
        newErrors.overallRating = "Please select an overall rating";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      if (activeStep === steps.length - 1) {
        handleSubmit();
      } else {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
      }
    }
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate saving to database
    try {
      // In a real app, you would send formData to your API
      console.log("Saving form data:", formData);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error("Error saving form:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleShopSelect = (event, shop) => {
    setSelectedShop(shop);
    if (shop) {
      setFormData(prev => ({
        ...prev,
        shopId: shop.id,
        shopName: shop.name,
        shopAddress: shop.address
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        shopId: "",
        shopName: "",
        shopAddress: ""
      }));
    }
  };

  useEffect(() => {
    if (location.state?.shopId) {
      const shop = shops.find(s => s.id === location.state.shopId);
      if (shop) {
        setSelectedShop(shop);
        setFormData(prev => ({
          ...prev,
          shopId: shop.id,
          shopName: shop.name,
          shopAddress: shop.address
        }));
      }
    }
  }, [location.state?.shopId, shops]);

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);
    
    const newFiles = selectedFiles.map(file => ({
      file,
      name: file.name,
      type: file.type,
      size: file.size,
      url: URL.createObjectURL(file)
    }));
    
    setAttachments(prevAttachments => [...prevAttachments, ...newFiles]);
    
    setFormData(prevData => ({
      ...prevData,
      photoEvidence: [...(prevData.photoEvidence || []), ...newFiles.map(f => f.name)]
    }));
    
    e.target.value = null;
  };

  const handleRemoveFile = (index) => {
    setAttachments(prevAttachments => {
      const newAttachments = [...prevAttachments];
      
      if (newAttachments[index].url) {
        URL.revokeObjectURL(newAttachments[index].url);
      }
      
      newAttachments.splice(index, 1);
      return newAttachments;
    });
    
    setFormData(prevData => ({
      ...prevData,
      photoEvidence: prevData.photoEvidence.filter((_, i) => i !== index)
    }));
  };

  const getFileIcon = (file) => {
    if (file.type.includes('pdf')) {
      return <PictureAsPdfIcon color="error" />;
    } else if (file.type.includes('image')) {
      return <ImageIcon color="primary" />;
    } else {
      return <DescriptionIcon color="action" />;
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  const handleSubmit = async () => {
    if (validateCurrentStep()) {
      setIsSaving(true);
      try {
        const inspectionDetails = {
          shopName: formData.shopName || selectedShop?.name || "Unnamed Establishment",
          shopId: formData.shopId || selectedShop?.id || "ID Pending",
          inspector: formData.inspector || "John Doe",
          date: new Date().toISOString().split('T')[0],
          status: formData.overallRating || "N/A",
          cleanliness: calculateCleanlinessRating(),
          documentation: calculateDocumentationPercentage(),
          staffTraining: determineStaffTraining(),
          highlights: generateHighlights(),
          recommendations: generateRecommendations(),
          inspectorNotes: formData.inspectorNotes || "",
          attachments: attachments.map(att => att.name)
        };
        
        setSubmittedData(inspectionDetails);
        setShowDetails(true);
      } catch (error) {
        console.error("Error submitting form:", error);
        setErrors({ submit: "Failed to submit the form. Please try again." });
      } finally {
        setIsSaving(false);
      }
    }
  };

  const calculateCleanlinessRating = () => {
    let score = 3;
    
    if (formData.cleanliness === "Satisfying") score += 0.5;
    if (formData.generalCleanliness === "Satisfactory") score += 0.5;
    if (formData.floorMaintenance === "Good") score += 0.25;
    if (formData.wallsMaintenance === "Good") score += 0.25;
    if (formData.ceilingMaintenance === "Good") score += 0.25;
    if (formData.cleanlinessOfEquipment === "Good") score += 0.25;
    
    if (formData.flies === "Yes") score -= 0.5;
    if (formData.rodentsPresence === "Yes") score -= 0.5;
    if (formData.emptyBoxes === "Yes") score -= 0.25;
    if (formData.objectionableOdor === "Yes") score -= 0.25;
    
    return Math.max(1, Math.min(5, Math.round(score * 2) / 2));
  };

  const calculateDocumentationPercentage = () => {
    let percentage = 0;
    let total = 0;
    
    if (formData.displayHealthInstructions === "Yes") { percentage += 20; total += 20; }
    else if (formData.displayHealthInstructions === "No") { total += 20; }
    
    if (formData.recordKeeping === "Yes") { percentage += 30; total += 30; }
    else if (formData.recordKeeping === "No") { total += 30; }
    
    if (formData.accreditedCertification === "Yes") { percentage += 50; total += 50; }
    else if (formData.accreditedCertification === "No") { total += 50; }
    
    return total > 0 ? Math.round((percentage / total) * 100) : 100;
  };

  const determineStaffTraining = () => {
    return formData.safeFoodPractices === "Yes" || formData.separateChoppingBoards === "Yes";
  };

  const generateHighlights = () => {
    const highlights = [];

    if (formData.cleanliness === "Satisfying") {
      highlights.push("Satisfactory general cleanliness and tidiness");
    }
    if (formData.pollutionConditions === "No") {
      highlights.push("No polluting conditions present");
    }
    if (formData.animalsPresence === "No" && formData.flies === "No" && formData.rodentsPresence === "No") {
      highlights.push("No pests or animals observed in the premises");
    }

    return highlights.length > 0 ? highlights : ["Well-trained staff with proper feedback systems in place"];
  };

  const generateRecommendations = () => {
    const recommendations = [];

    if (formData.cleanliness === "Unsatisfying") {
      recommendations.push("Improve general cleanliness around the premises");
    }

    return recommendations.length > 0 ? recommendations : [
      "Continue maintaining current standards", 
      "Schedule regular self-inspections to maintain compliance"
    ];
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    navigate('/inspection-log', { 
      state: { 
        message: 'Inspection successfully submitted!',
        severity: 'success'
      } 
    });
  };

  const ReviewSubmission = ({ formData, handleChange, errors }) => {
    return (
      <Box>
        <Typography variant="h6" gutterBottom>Review and Submit</Typography>
        <Typography variant="body1" paragraph>
          Please review the information below before submitting your inspection report.
        </Typography>
        
        <FormControl fullWidth margin="normal" error={!!errors.overallRating}>
          <InputLabel id="overall-rating-label">Overall Rating</InputLabel>
          <Select
            labelId="overall-rating-label"
            id="overallRating"
            name="overallRating"
            value={formData.overallRating || ''}
            onChange={handleChange}
            label="Overall Rating"
          >
            <MenuItem value="A">A - Excellent</MenuItem>
            <MenuItem value="B">B - Good</MenuItem>
            <MenuItem value="C">C - Fair</MenuItem>
            <MenuItem value="D">D - Poor</MenuItem>
          </Select>
          {errors.overallRating && <FormHelperText>{errors.overallRating}</FormHelperText>}
        </FormControl>
        
        <FormControl fullWidth margin="normal">
          <TextField
            id="inspectorNotes"
            name="inspectorNotes"
            label="Additional Notes"
            multiline
            rows={4}
            value={formData.inspectorNotes || ''}
            onChange={handleChange}
            variant="outlined"
          />
          <FormHelperText>Add any additional observations or notes about this inspection.</FormHelperText>
        </FormControl>
        
        <Box sx={{ mt: 3, mb: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Photo Evidence & Attachments
          </Typography>
          
          <Box sx={{ mb: 2 }}>
            <Button
              variant="outlined"
              startIcon={<UploadFileIcon />}
              onClick={() => fileInputRef.current.click()}
              sx={{ mb: 2 }}
            >
              Upload Attachments
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={handleFileSelect}
              style={{ display: 'none' }}
              accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
            />
            
            {attachments.length > 0 ? (
              <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                <List dense>
                  {attachments.map((file, index) => (
                    <ListItem
                      key={index}
                      divider={index < attachments.length - 1}
                      secondaryAction={
                        <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveFile(index)}>
                          <DeleteIcon />
                        </IconButton>
                      }
                    >
                      <ListItemIcon>
                        {getFileIcon(file)}
                      </ListItemIcon>
                      <ListItemText
                        primary={file.name}
                        secondary={formatFileSize(file.size)}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            ) : (
              <Typography variant="body2" color="text.secondary">
                No attachments added. Upload photos or documents to support your inspection.
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    );
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <LocationEnvironmentForm 
                formData={formData} 
                handleChange={handleChange} 
                errors={errors} 
              />;
      case 1:
        return <BuildingAssessmentForm 
                formData={formData} 
                handleChange={handleChange} 
                errors={errors} 
              />;
      case 2:
        return <FoodPreparationForm 
                formData={formData} 
                handleChange={handleChange} 
                errors={errors} 
              />;
      case 3:
        return <HealthInstructionsForm 
                formData={formData} 
                handleChange={handleChange} 
                errors={errors} 
              />;
      case 4:
        return <ReviewSubmission 
                formData={formData} 
                handleChange={handleChange} 
                errors={errors} 
              />;
      default:
        return 'Unknown step';
    }
  };

  if (showDetails && submittedData) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
        <InspectionDetailsPanel 
          isOpen={showDetails}
          onClose={handleCloseDetails}
          inspectionData={submittedData}
        />
      </Container>
    );
  }

  return (
    <Box sx={{ 
      width: '100%', 
      height: '100vh', 
      display: 'flex',
      flexDirection: 'column',
      bgcolor: '#F5F8FF'
    }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: { xs: 2, md: 4 }, 
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'divider',
          m: { xs: 2, md: 4 },
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'auto'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <IconButton 
            edge="start" 
            onClick={() => navigate('/inspection-log')} 
            sx={{ mr: 2 }}
            color="primary"
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h5" component="h1" fontWeight="bold">
            HC 800 Health & Safety Inspection Form
          </Typography>
        </Box>

        <Divider sx={{ mb: 4 }} />

        {activeStep === 0 && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
              <BusinessIcon sx={{ mr: 1 }} />
              Select Establishment
            </Typography>
            <Autocomplete
              id="shop-select"
              options={shops}
              value={selectedShop}
              onChange={handleShopSelect}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField 
                  {...params} 
                  label="Search for shop by name" 
                  variant="outlined"
                  error={!!errors.shopId}
                  helperText={errors.shopId}
                />
              )}
              renderOption={(props, option) => (
                <li {...props}>
                  <Box>
                    <Typography variant="body1">{option.name}</Typography>
                    <Typography variant="body2" color="text.secondary">{option.address}</Typography>
                  </Box>
                </li>
              )}
              fullWidth
            />
            {selectedShop && (
              <Card variant="outlined" sx={{ mt: 2, p: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold">{selectedShop.name}</Typography>
                <Typography variant="body2">{selectedShop.address}</Typography>
                <Typography variant="body2" color="text.secondary">ID: {selectedShop.id}</Typography>
              </Card>
            )}
          </Box>
        )}

        {saveSuccess && (
          <Alert 
            severity="success" 
            sx={{ mb: 3 }}
            icon={<CheckCircleIcon fontSize="inherit" />}
          >
            Form progress saved successfully!
          </Alert>
        )}

        {errors.submit && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {errors.submit}
          </Alert>
        )}

        <Stepper 
          activeStep={activeStep} 
          alternativeLabel
          sx={{ 
            mb: 4,
            '& .MuiStepLabel-label': {
              mt: 1,
              fontSize: { xs: '0.75rem', sm: '0.875rem' }
            }
          }}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box sx={{ mb: 4, flexGrow: 1, overflow: 'auto' }}>
          {getStepContent(activeStep)}
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 'auto', pt: 2 }}>
          <Button
            variant="outlined"
            disabled={activeStep === 0 || isSaving}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
          <Box>
            <Button
              variant="outlined"
              startIcon={<SaveIcon />}
              onClick={handleSave}
              disabled={isSaving}
              sx={{ mr: 1 }}
            >
              Save Progress
            </Button>
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={isSaving}
            >
              {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default InspectionForm;
