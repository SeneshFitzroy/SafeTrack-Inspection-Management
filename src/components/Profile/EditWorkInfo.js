import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  IconButton,
  Typography,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Chip,
  Autocomplete
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// Sample list of districts and GN divisions
const districtsList = ['Colombo', 'Gampaha', 'Kalutara', 'Kandy', 'Matale', 'Nuwara Eliya'];
const allGNDivisions = [
  'Kaduwatha', 'Kottawa', 'Biyagama', 'Malabe', 'Athurugiriya', 'Homagama',
  'Maharagama', 'Piliyandala', 'Pannipitiya', 'Battaramulla', 'Thalawathugoda', 'Boralesgamuwa'
];

const EditWorkInfo = ({ open, handleClose, data, onUpdate }) => {
  const [formData, setFormData] = useState({
    district: '',
    officeLocation: '',
    gramaNiladhari: [],
  });

  // Initialize form data when modal opens
  useEffect(() => {
    if (open && data) {
      setFormData({
        district: data.district || '',
        officeLocation: data.officeLocation || '',
        gramaNiladhari: data.gramaNiladhari || [],
      });
    }
  }, [open, data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleGNDivisionsChange = (event, newValue) => {
    setFormData(prev => ({
      ...prev,
      gramaNiladhari: newValue
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
        }
      }}
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle sx={{ pb: 1, pt: 2 }}>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography variant="h6" fontWeight="bold" color="primary">
              Edit Work Information
            </Typography>
            <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        
        <DialogContent dividers>
          <Grid container spacing={2} sx={{ mt: 0.5 }}>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel id="district-label">District</InputLabel>
                <Select
                  labelId="district-label"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  label="District"
                >
                  {districtsList.map((district) => (
                    <MenuItem key={district} value={district}>
                      {district}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Office Location"
                name="officeLocation"
                value={formData.officeLocation}
                onChange={handleChange}
                variant="outlined"
                required
              />
            </Grid>
            
            <Grid item xs={12}>
              <Autocomplete
                multiple
                id="gn-divisions"
                options={allGNDivisions}
                value={formData.gramaNiladhari}
                onChange={handleGNDivisionsChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Grama Niladhari Divisions"
                    placeholder="Select divisions"
                    required
                  />
                )}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip 
                      variant="outlined" 
                      label={option} 
                      {...getTagProps({ index })} 
                      sx={{ bgcolor: 'primary.light', color: 'primary.contrastText' }} 
                    />
                  ))
                }
              />
            </Grid>
          </Grid>
        </DialogContent>
        
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button 
            onClick={handleClose} 
            variant="outlined" 
            color="secondary"
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            variant="contained" 
            color="primary"
          >
            Update
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditWorkInfo;
