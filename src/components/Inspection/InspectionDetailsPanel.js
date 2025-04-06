import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Divider, 
  Rating, 
  Chip, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemIcon,
  IconButton,
  Button,
  Grid,
  LinearProgress,
  Card,
  CardContent,
  Stack,
  useMediaQuery,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Avatar
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import VerifiedIcon from '@mui/icons-material/Verified';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import DescriptionIcon from '@mui/icons-material/Description';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DownloadIcon from '@mui/icons-material/Download';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const InspectionDetailsPanel = ({
  isOpen,
  onClose,
  inspectionData
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // Add effect to update derived values when inspection data changes
  const [realTimeData, setRealTimeData] = useState({
    cleanliness: 3,
    documentation: 100,
    staffTraining: true,
    highlights: ["Well-trained staff with proper feedback systems in place"],
    recommendations: [
      "Continue maintaining current standards",
      "Schedule regular self-inspections to maintain compliance"
    ]
  });

  useEffect(() => {
    // Only update if we have real inspection data
    if (inspectionData) {
      // Calculate derived values from incoming data
      const cleanlinessRating = calculateCleanlinessRating(inspectionData);
      const documentationPercentage = calculateDocumentationPercentage(inspectionData);
      const staffTraining = determineStaffTraining(inspectionData);
      const highlights = generateHighlights(inspectionData);
      const recommendations = generateRecommendations(inspectionData);
      
      setRealTimeData({
        cleanliness: cleanlinessRating,
        documentation: documentationPercentage,
        staffTraining: staffTraining,
        highlights: highlights,
        recommendations: recommendations
      });
    }
  }, [inspectionData]);

  // Add effect to handle status style
  useEffect(() => {
    if (inspectionData && inspectionData.status) {
      setRealTimeData(prevData => ({
        ...prevData,
        statusStyle: getStatusColor(inspectionData.status)
      }));
    }
  }, [inspectionData?.status]);

  // Helper functions to calculate real-time metrics
  const calculateCleanlinessRating = (data) => {
    if (!data) return 3;
    
    let score = 3; // Default middle rating
    
    // Add points for good conditions
    if (data.cleanliness === "Satisfying") score += 0.5;
    if (data.generalCleanliness === "Satisfactory") score += 0.5;
    if (data.floorMaintenance === "Good") score += 0.25;
    if (data.wallsMaintenance === "Good") score += 0.25;
    if (data.ceilingMaintenance === "Good") score += 0.25;
    if (data.cleanlinessOfEquipment === "Good") score += 0.25;
    
    // Subtract for poor conditions
    if (data.flies === "Yes") score -= 0.5;
    if (data.rodentsPresence === "Yes") score -= 0.5;
    if (data.emptyBoxes === "Yes") score -= 0.25;
    if (data.objectionableOdor === "Yes") score -= 0.25;
    
    // Ensure within range 1-5
    return Math.max(1, Math.min(5, Math.round(score * 2) / 2)); // Round to nearest 0.5
  };

  const calculateDocumentationPercentage = (data) => {
    if (!data) return 100;
    
    let percentage = 0;
    let total = 0;
    
    // Count documentation-related items
    if (data.displayHealthInstructions === "Yes") { percentage += 20; total += 20; }
    else if (data.displayHealthInstructions === "No") { total += 20; }
    
    if (data.recordKeeping === "Yes") { percentage += 30; total += 30; }
    else if (data.recordKeeping === "No") { total += 30; }
    
    if (data.accreditedCertification === "Yes") { percentage += 50; total += 50; }
    else if (data.accreditedCertification === "No") { total += 50; }
    
    // Avoid division by zero
    return total > 0 ? Math.round((percentage / total) * 100) : 100;
  };

  const determineStaffTraining = (data) => {
    if (!data) return true;
    
    // If there's explicit staff training data, use it
    if (data.staffTraining !== undefined) return data.staffTraining;
    
    // Otherwise infer from other fields
    return data.safeFoodPractices === "Yes" || data.separateChoppingBoards === "Yes";
  };

  const generateHighlights = (data) => {
    if (!data) return ["Well-trained staff with proper feedback systems in place"];
    
    const highlights = [];

    // Process Location & Environment data
    if (data.cleanliness === "Satisfying") {
      highlights.push("Satisfactory general cleanliness and tidiness");
    }
    if (data.pollutionConditions === "No") {
      highlights.push("No polluting conditions present");
    }
    if (data.animalsPresence === "No" && data.flies === "No" && data.rodentsPresence === "No") {
      highlights.push("No pests or animals observed in the premises");
    }

    // Process Building Assessment data
    if (data.lightVentilation === "Good") {
      highlights.push("Good lighting and ventilation throughout the facility");
    }
    if (data.hazards === "No") {
      highlights.push("No potential hazards identified for employees or customers");
    }

    // Process Food Preparation data
    if (data.generalCleanliness === "Satisfactory" && data.cleanlinessOfEquipment === "Good") {
      highlights.push("Excellent maintenance of food preparation areas and equipment");
    }
    if (data.separateChoppingBoards === "Yes") {
      highlights.push("Proper use of separate utensils for different food types");
    }
    if (data.safeFoodPractices === "Yes") {
      highlights.push("Safe food handling practices observed and implemented");
    }

    // Process Health Instructions data
    if (data.displayHealthInstructions === "Yes") {
      highlights.push("Health information properly displayed for staff and customers");
    }
    if (data.entertainComplaints === "Yes") {
      highlights.push("Well-trained staff with proper feedback systems in place");
    }

    return highlights.length > 0 ? highlights : ["Well-trained staff with proper feedback systems in place"];
  };

  const generateRecommendations = (data) => {
    if (!data) return ["Continue maintaining current standards", "Schedule regular self-inspections to maintain compliance"];
    
    const recommendations = [];

    // Process issues from Location & Environment
    if (data.cleanliness === "Unsatisfying") {
      recommendations.push("Improve general cleanliness around the premises");
    }
    if (data.pollutionConditions === "Yes") {
      recommendations.push("Address environmental pollution issues around facility");
    }

    // Process issues from Building Assessment
    if (data.floorCondition === "Bad" || data.wallCondition === "Bad" || data.ceilingCondition === "Bad") {
      recommendations.push("Repair and maintain building structure (floors, walls, ceiling)");
    }
    if (data.hazards === "Yes") {
      recommendations.push("Remove potential hazards to ensure customer and employee safety");
    }

    // Process issues from Food Preparation
    if (data.rodentsPresence === "Yes" || data.flies === "Yes") {
      recommendations.push("Implement pest control measures immediately");
    }
    if (data.wasteDisposalBins === "No") {
      recommendations.push("Increase number of covered waste disposal bins");
    }
    if (data.separateChoppingBoards === "No") {
      recommendations.push("Use separate utensils for different food types to prevent cross-contamination");
    }

    // Process issues from Health Instructions
    if (data.displayHealthInstructions === "No") {
      recommendations.push("Post required health information in visible locations");
    }
    if (data.preventSmoking === "No") {
      recommendations.push("Implement and enforce no-smoking policy");
    }
    if (data.recordKeeping === "No") {
      recommendations.push("Maintain proper documentation of food purchases and sales");
    }

    return recommendations.length > 0 ? recommendations : [
      "Continue maintaining current standards", 
      "Schedule regular self-inspections to maintain compliance"
    ];
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'A':
        return { bg: '#e8f5e9', color: '#1e8e3e', icon: <VerifiedIcon />, text: 'Excellent', description: 'Meets all standards with high compliance' };
      case 'B':
        return { bg: '#fff8e1', color: '#f9ab00', icon: <InfoIcon />, text: 'Good', description: 'Meets most standards with minor issues' };
      case 'C':
        return { bg: '#fff3e0', color: '#fa903e', icon: <WarningIcon />, text: 'Fair', description: 'Several issues requiring attention' };
      case 'D':
        return { bg: '#fbe9e7', color: '#d93025', icon: <CancelIcon />, text: 'Poor', description: 'Major violations requiring immediate action' };
      case 'N/A':
        return { bg: '#f5f5f5', color: '#757575', icon: <InfoIcon />, text: 'Pending', description: 'Final assessment pending submission' };
      default:
        return { bg: '#f1f3f4', color: '#5f6368', icon: null, text: 'Unknown', description: 'Status not determined' };
    }
  };

  // Use real inspection data or fallback to sample data if not provided
  const data = inspectionData || {
    shopName: "Unnamed Establishment",
    shopId: "ID Pending",
    inspector: "John Doe",
    date: new Date().toISOString().split('T')[0],
    status: "N/A",
    cleanliness: 3,
    documentation: 100,
    staffTraining: true,
    highlights: ["Well-trained staff with proper feedback systems in place"],
    recommendations: [
      "Continue maintaining current standards",
      "Schedule regular self-inspections to maintain compliance"
    ],
    inspectorNotes: "",
    attachments: []
  };
  
  // Function to format date as "Month Day, Year" (e.g., "April 5, 2025")
  const formatDate = (dateString) => {
    if (!dateString) return "Not specified";
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    } catch (error) {
      console.error("Date formatting error:", error);
      return dateString || "Not specified";
    }
  };

  const handleDownloadPDF = () => {
    // In a real app, this would generate and download a PDF
    console.log('Generating PDF report for download');
    alert('PDF report generation started. Your download will begin shortly.');
  };

  const handlePrint = () => {
    window.print();
  };
  
  const handleShare = () => {
    // In a real app, this would open a share dialog
    console.log('Sharing report');
    alert('Share functionality would open here in the production version.');
  };

  return (
    <Box 
      sx={{ 
        width: '100%', 
        minHeight: '100vh', 
        display: 'flex',
        flexDirection: 'column',
        bgcolor: '#F5F8FF',
        '@media print': {
          bgcolor: '#ffffff'
        }
      }}
    >
      <Paper 
        elevation={3} 
        sx={{ 
          width: '100%', 
          maxWidth: 1200, 
          mx: 'auto', 
          my: 0,
          borderRadius: 2,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          '@media print': {
            boxShadow: 'none',
            m: 0
          }
        }}
      >
        {/* Header */}
        <Box sx={{ 
          p: { xs: 2, md: 3 }, 
          bgcolor: theme.palette.primary.main, 
          color: 'white',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          '@media print': {
            display: 'none'
          }
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <DescriptionIcon />
            <Typography variant="h5" fontWeight="bold">
              Health & Safety Inspection Report
            </Typography>
          </Box>
          <Box>
            <IconButton 
              onClick={onClose} 
              sx={{ color: 'white' }}
              aria-label="close panel"
              title="Close"
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>

        {/* Print Header - only visible when printing */}
        <Box sx={{ 
          display: 'none',
          '@media print': {
            display: 'flex',
            p: 3,
            borderBottom: '1px solid #ddd',
            alignItems: 'center',
            justifyContent: 'space-between'
          }
        }}>
          <Typography variant="h5" fontWeight="bold">
            SafeTrack Health & Safety Inspection Report
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Generated on {new Date().toLocaleDateString()}
          </Typography>
        </Box>

        {/* Main Content - Scrollable */}
        <Box sx={{ p: { xs: 2, md: 3 }, flexGrow: 1, overflow: 'auto' }}>
          {/* Report Header with Shop and Inspection Information */}
          <Card variant="outlined" sx={{ 
            mb: 3, 
            overflow: 'hidden',
            borderColor: theme.palette.divider,
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
          }}>
            <Grid container>
              <Grid item xs={12} md={8} sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h5" fontWeight="bold" color="primary">
                    {data.shopName || "Unnamed Establishment"}
                  </Typography>
                  <Chip 
                    label={data.shopId || "ID Pending"} 
                    size="small" 
                    sx={{ ml: 2, bgcolor: 'rgba(25, 118, 210, 0.08)' }}
                  />
                </Box>
                
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">Inspector</Typography>
                      <Typography variant="body1" fontWeight="medium">{data.inspector || "John Doe"}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">Date of Inspection</Typography>
                      <Typography variant="body1" fontWeight="medium">{formatDate(data.date)}</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">Reference Number</Typography>
                      <Typography variant="body1" fontWeight="medium">
                        {data.refNumber || `INS-${data.date?.replace(/-/g, '').substring(2) || new Date().toISOString().split('T')[0].replace(/-/g, '').substring(2)}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">Inspection Score</Typography>
                      <Typography variant="body1" fontWeight="medium">
                        {data.status && data.status !== "N/A" ? `${data.score || "N/A"}/100 points` : "Not rated"}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
              
              <Grid item xs={12} md={4} sx={{ 
                display: 'flex', 
                alignItems: 'stretch',
                borderLeft: { xs: 'none', md: `1px solid ${theme.palette.divider}` },
                borderTop: { xs: `1px solid ${theme.palette.divider}`, md: 'none' }
              }}>
                <Box sx={{ 
                  bgcolor: realTimeData.statusStyle?.bg || '#f5f5f5', 
                  color: realTimeData.statusStyle?.color || '#757575', 
                  p: 3, 
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%'
                }}>
                  <Box sx={{ mb: 1 }}>
                    {realTimeData.statusStyle?.icon && React.cloneElement(realTimeData.statusStyle.icon, { fontSize: 'large' })}
                  </Box>
                  <Typography variant="h2" fontWeight="bold">{data.status || "N/A"}</Typography>
                  <Typography variant="subtitle1" fontWeight="medium">{realTimeData.statusStyle?.text || "Pending"}</Typography>
                  <Typography variant="body2" align="center" sx={{ mt: 1 }}>
                    {realTimeData.statusStyle?.description || "Final assessment pending submission"}
                  </Typography>
                  {data.status === "N/A" && (
                    <Typography variant="caption" align="center" sx={{ mt: 1 }}>
                      Rating to be determined on final submission
                    </Typography>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Card>

          {/* Metrics */}
          <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }} color="primary">
            <InfoIcon sx={{ mr: 1, fontSize: '1.2rem' }} />
            Health & Safety Assessment Metrics
          </Typography>
          
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {/* Cleanliness Rating */}
            <Grid item xs={12} sm={4}>
              <Card variant="outlined" sx={{ height: '100%', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                <CardContent>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Cleanliness Rating
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Rating 
                      value={realTimeData.cleanliness} 
                      readOnly 
                      precision={0.5}
                      icon={<StarIcon fontSize="inherit" />}
                      emptyIcon={<StarBorderIcon fontSize="inherit" />}
                      sx={{ color: theme.palette.warning.main, fontSize: '1.5rem' }}
                    />
                    <Typography 
                      variant="body2" 
                      sx={{ ml: 1, fontWeight: 'medium' }}
                    >
                      {realTimeData.cleanliness}/5
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {realTimeData.cleanliness >= 4 
                      ? "Meets high cleanliness standards" 
                      : realTimeData.cleanliness >= 3 
                        ? "Acceptable cleanliness level"
                        : "Requires improvement"}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Documentation */}
            <Grid item xs={12} sm={4}>
              <Card variant="outlined" sx={{ height: '100%', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                <CardContent>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Documentation Compliance
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Box sx={{ width: '100%', mr: 1 }}>
                      <LinearProgress 
                        variant="determinate" 
                        value={realTimeData.documentation} 
                        sx={{ 
                          height: 10, 
                          borderRadius: 5,
                          bgcolor: theme.palette.grey[200],
                          '& .MuiLinearProgress-bar': {
                            bgcolor: theme.palette.success.main
                          }
                        }}
                      />
                    </Box>
                    <Typography variant="body2" sx={{ fontWeight: 'medium', minWidth: '45px' }}>
                      {realTimeData.documentation}%
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {realTimeData.documentation === 100 
                      ? "All required documentation present" 
                      : realTimeData.documentation >= 80 
                        ? "Most documentation in order"
                        : "Documentation needs attention"}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Staff Training */}
            <Grid item xs={12} sm={4}>
              <Card variant="outlined" sx={{ height: '100%', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                <CardContent>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Staff Food Safety Training
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    {realTimeData.staffTraining ? (
                      <CheckCircleIcon sx={{ color: theme.palette.success.main, mr: 1, fontSize: 28 }} />
                    ) : (
                      <CancelIcon sx={{ color: theme.palette.error.main, mr: 1, fontSize: 28 }} />
                    )}
                    <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                      {realTimeData.staffTraining ? 'Verified' : 'Not Verified'}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {realTimeData.staffTraining 
                      ? "Staff properly trained in food handling safety" 
                      : "Staff requires food safety training"}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            {/* Highlights */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom color="primary" sx={{ display: 'flex', alignItems: 'center' }}>
                <CheckCircleIcon sx={{ mr: 1, fontSize: '1.2rem' }} />
                Inspection Highlights
              </Typography>
              <Card variant="outlined" sx={{ boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                <List>
                  {realTimeData.highlights.map((highlight, index) => (
                    <ListItem key={index} sx={{ py: 1.5 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <CheckCircleIcon sx={{ color: theme.palette.success.main }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary={highlight}
                        primaryTypographyProps={{
                          fontWeight: index === 0 ? 'bold' : 'normal'
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Card>
            </Grid>

            {/* Recommendations */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom color="primary" sx={{ display: 'flex', alignItems: 'center' }}>
                <InfoIcon sx={{ mr: 1, fontSize: '1.2rem' }} />
                Improvement Recommendations
              </Typography>
              <Card variant="outlined" sx={{ boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                <List>
                  {realTimeData.recommendations.map((recommendation, index) => (
                    <ListItem key={index} sx={{ py: 1.5 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <Avatar sx={{ 
                          width: 24, 
                          height: 24, 
                          bgcolor: theme.palette.primary.light,
                          fontSize: '0.75rem',
                          fontWeight: 'bold'
                        }}>
                          {index + 1}
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText primary={recommendation} />
                    </ListItem>
                  ))}
                </List>
              </Card>
            </Grid>
          </Grid>

          {/* Notes from Inspector */}
          {data.inspectorNotes && (
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" gutterBottom color="primary" sx={{ display: 'flex', alignItems: 'center' }}>
                <InfoIcon sx={{ mr: 1, fontSize: '1.2rem' }} />
                Inspector Notes
              </Typography>
              <Card variant="outlined" sx={{ p: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                <Typography variant="body1">{data.inspectorNotes}</Typography>
              </Card>
            </Box>
          )}

          {/* Attachments - Only show if there are attachments or if in edit mode */}
          {(Array.isArray(data.attachments) && data.attachments.length > 0) && (
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" gutterBottom color="primary" sx={{ display: 'flex', alignItems: 'center' }}>
                <AttachFileIcon sx={{ mr: 1, fontSize: '1.2rem' }} />
                Documentation & Attachments
              </Typography>
              <Card variant="outlined" sx={{ p: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                  {data.attachments.map((file, index) => (
                    <Chip
                      key={index}
                      icon={typeof file === 'string' && file.endsWith('.pdf') ? <PictureAsPdfIcon /> : <DescriptionIcon />}
                      label={typeof file === 'string' ? file : `Attachment ${index + 1}`}
                      onClick={() => console.log(`Download ${file}`)}
                      deleteIcon={<DownloadIcon />}
                      onDelete={() => console.log(`Download ${file}`)}
                      variant="outlined"
                      sx={{ 
                        p: 1, 
                        borderRadius: 2,
                        '& .MuiChip-icon': { color: theme.palette.primary.main },
                        '& .MuiChip-deleteIcon': { color: theme.palette.primary.main },
                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                        transition: 'all 0.2s',
                        '&:hover': {
                          backgroundColor: theme.palette.primary.lighter || '#f0f7ff',
                          boxShadow: '0 2px 5px rgba(0,0,0,0.15)',
                        }
                      }}
                    />
                  ))}
                  <Chip
                    icon={<AttachFileIcon />}
                    label="Add Attachment"
                    variant="outlined"
                    onClick={() => console.log('Add attachment')}
                    sx={{ 
                      p: 1, 
                      borderRadius: 2,
                      borderStyle: 'dashed',
                      '& .MuiChip-icon': { color: theme.palette.text.secondary }
                    }}
                  />
                </Box>
              </Card>
            </Box>
          )}
          
        </Box>

        {/* Action Buttons */}
        <Box sx={{ 
          p: 3, 
          display: 'flex', 
          justifyContent: 'space-between',
          borderTop: `1px solid ${theme.palette.divider}`,
          bgcolor: theme.palette.background.paper,
          '@media print': {
            display: 'none'
          }
        }}>
          <Button 
            variant="outlined" 
            onClick={() => navigate('/inspection-log')}
            startIcon={<ArrowBackIcon />}
          >
            Back to Inspection Log
          </Button>
          <Box>
            <Button 
              variant="contained" 
              startIcon={<PictureAsPdfIcon />}
              onClick={handleDownloadPDF}
              color="primary"
            >
              Download PDF
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default InspectionDetailsPanel;
