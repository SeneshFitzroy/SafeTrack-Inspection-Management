import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  MenuItem,
  InputAdornment,
  Divider,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  Switch,
  FormControlLabel
} from '@mui/material';
import StorefrontIcon from '@mui/icons-material/Storefront';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import BadgeIcon from '@mui/icons-material/Badge';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GroupIcon from '@mui/icons-material/Group';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import RefreshIcon from '@mui/icons-material/Refresh';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import CakeIcon from '@mui/icons-material/Cake';
import LocalPizzaIcon from '@mui/icons-material/LocalPizza';
import EmojiFoodBeverageIcon from '@mui/icons-material/EmojiFoodBeverage';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';

// Food-focused trade types
const FOOD_TRADE_TYPES = [
  { value: 'Bakery', icon: <CakeIcon /> },
  { value: 'Restaurant', icon: <RestaurantIcon /> },
  { value: 'Cafe', icon: <LocalCafeIcon /> },
  { value: 'Pizzeria', icon: <LocalPizzaIcon /> },
  { value: 'Fast Food', icon: <EmojiFoodBeverageIcon /> },
  { value: 'Food', icon: <RestaurantIcon /> },
  { value: 'Dessert Shop', icon: <CakeIcon /> },
  { value: 'Food Truck', icon: <RestaurantIcon /> },
  { value: 'Catering', icon: <RestaurantIcon /> },
  { value: 'Other', icon: <StorefrontIcon /> }
];

const GN_DIVISIONS = ['Biyagama', 'Kaduwela', 'Kelaniya', 'Kolonnawa'];
const DISTRICTS = ['Colombo', 'Gampaha', 'Kalutara', 'Kandy', 'Matale'];

const EditShopForm = ({ shop, onClose, onSave }) => {
  // Convert shop data to form format
  const initialFormData = {
    establishmentName: shop.name || '',
    tradeType: shop.category || '',
    licenseYear: shop.licenseYear || new Date().getFullYear().toString(),
    licenseNumber: shop.licenseNo || '',
    businessRegNo: shop.businessRegNo || '',
    numberOfEmployees: shop.employees?.toString() || '',
    telephoneNo: shop.telephone || '',
    address: shop.address || '',
    ownerName: shop.owner || '',
    nicNumber: shop.nicNumber || '',
    privateAddress: shop.privateAddress || '',
    district: shop.district || 'Colombo',
    phiArea: shop.phiArea || '',
    gnRegion: shop.gnDivision || '',
    specialties: shop.specialties || '',
    hasDelivery: shop.hasDelivery || 'No',
    status: shop.status || 'Active'
  };

  const [shopData, setShopData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShopData({
      ...shopData,
      [name]: value
    });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const handleStatusChange = (e) => {
    setShopData({
      ...shopData,
      status: e.target.checked ? 'Active' : 'Inactive'
    });
  };

  const handleDeliveryChange = (e) => {
    setShopData({
      ...shopData,
      hasDelivery: e.target.checked ? 'Yes' : 'No'
    });
  };

  const handleReset = () => {
    setShopData(initialFormData);
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Required field validation
    if (!shopData.establishmentName) newErrors.establishmentName = 'Shop name is required';
    if (!shopData.tradeType) newErrors.tradeType = 'Food business type is required';
    if (!shopData.licenseNumber) newErrors.licenseNumber = 'License number is required';
    if (!shopData.numberOfEmployees) newErrors.numberOfEmployees = 'Number of employees is required';
    if (!shopData.telephoneNo) newErrors.telephoneNo = 'Telephone number is required';
    if (!shopData.address) newErrors.address = 'Address is required';
    if (!shopData.ownerName) newErrors.ownerName = 'Owner name is required';
    if (!shopData.gnRegion) newErrors.gnRegion = 'GN region is required';
    
    // Format validation
    const phoneRegex = /^\d{10}$/;
    if (shopData.telephoneNo && !phoneRegex.test(shopData.telephoneNo.replace(/\D/g, ''))) {
      newErrors.telephoneNo = 'Invalid phone format (10 digits required)';
    }
    
    // NIC validation if provided
    if (shopData.nicNumber) {
      const oldNicRegex = /^\d{9}[vVxX]$/;
      const newNicRegex = /^\d{12}$/;
      if (!oldNicRegex.test(shopData.nicNumber) && !newNicRegex.test(shopData.nicNumber)) {
        newErrors.nicNumber = 'Invalid NIC format';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Create updated shop object
      const updatedShop = {
        ...shop,
        name: shopData.establishmentName,
        category: shopData.tradeType,
        licenseYear: shopData.licenseYear,
        licenseNo: shopData.licenseNumber,
        businessRegNo: shopData.businessRegNo,
        employees: parseInt(shopData.numberOfEmployees, 10),
        telephone: shopData.telephoneNo,
        address: shopData.address,
        owner: shopData.ownerName,
        nicNumber: shopData.nicNumber,
        privateAddress: shopData.privateAddress,
        district: shopData.district,
        phiArea: shopData.phiArea,
        gnDivision: shopData.gnRegion,
        specialties: shopData.specialties,
        hasDelivery: shopData.hasDelivery,
        status: shopData.status
      };
      
      onSave(updatedShop);
    }
  };

  // Get appropriate food icon based on category
  const getFoodIcon = (category) => {
    const found = FOOD_TRADE_TYPES.find(type => type.value === category);
    return found ? found.icon : <RestaurantIcon color="primary" />;
  };

  return (
    <Paper component="form" onSubmit={handleSubmit} elevation={0} sx={{ p: 0 }}>
      <Box sx={{ 
        p: 2, 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        bgcolor: '#d32f2f', // Food-themed red color
        color: 'white',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8
      }}>
        <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {getFoodIcon(shopData.tradeType)} Edit Food Establishment: {shop.name}
        </Typography>
        <IconButton size="small" onClick={onClose} sx={{ color: 'white' }}>
          <CloseIcon />
        </IconButton>
      </Box>
      
      {/* Status Bar */}
      <Box sx={{ 
        p: 2, 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        bgcolor: 'rgba(211, 47, 47, 0.05)', 
        borderBottom: '1px solid rgba(211, 47, 47, 0.2)'
      }}>
        <FormControlLabel
          control={
            <Switch 
              checked={shopData.status === 'Active'} 
              onChange={handleStatusChange}
              color="success"
            />
          }
          label={shopData.status === 'Active' ? 'Active' : 'Inactive'}
        />
        <Typography variant="body2" fontWeight="medium">
          Reference ID: {shop.id}
        </Typography>
      </Box>
      
      <Box sx={{ p: 3 }}>
        {/* Basic Information */}
        <Typography variant="subtitle1" fontWeight="bold" color="#d32f2f" gutterBottom>
          Basic Information
        </Typography>
        <Divider sx={{ mb: 2 }} />
        
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Name of the Food Establishment"
              name="establishmentName"
              value={shopData.establishmentName}
              onChange={handleChange}
              fullWidth
              required
              error={!!errors.establishmentName}
              helperText={errors.establishmentName}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <RestaurantIcon color="primary" />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <FormControl fullWidth required error={!!errors.tradeType}>
              <InputLabel>Type of Food Business</InputLabel>
              <Select
                name="tradeType"
                value={shopData.tradeType}
                onChange={handleChange}
                label="Type of Food Business"
                startAdornment={
                  <InputAdornment position="start">
                    {getFoodIcon(shopData.tradeType)}
                  </InputAdornment>
                }
              >
                {FOOD_TRADE_TYPES.map(option => (
                  <MenuItem key={option.value} value={option.value} sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
                      {option.icon}
                    </Box>
                    {option.value}
                  </MenuItem>
                ))}
              </Select>
              {errors.tradeType && <FormHelperText>{errors.tradeType}</FormHelperText>}
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <TextField
              label="License Year"
              name="licenseYear"
              type="number"
              value={shopData.licenseYear}
              onChange={handleChange}
              fullWidth
              error={!!errors.licenseYear}
              helperText={errors.licenseYear}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CalendarTodayIcon color="primary" />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <TextField
              label="License Number"
              name="licenseNumber"
              value={shopData.licenseNumber}
              onChange={handleChange}
              fullWidth
              required
              error={!!errors.licenseNumber}
              helperText={errors.licenseNumber}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <BadgeIcon color="primary" />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
        </Grid>
        
        {/* Food Business Details */}
        <Typography variant="subtitle1" fontWeight="bold" color="#d32f2f" gutterBottom sx={{ mt: 4 }}>
          Food Business Details
        </Typography>
        <Divider sx={{ mb: 2 }} />
        
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField
              label="Business Registration Number"
              name="businessRegNo"
              value={shopData.businessRegNo}
              onChange={handleChange}
              fullWidth
              error={!!errors.businessRegNo}
              helperText={errors.businessRegNo}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <BusinessIcon color="primary" />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          
          <Grid item xs={12} md={4}>
            <TextField
              label="Number of Employees"
              name="numberOfEmployees"
              type="number"
              value={shopData.numberOfEmployees}
              onChange={handleChange}
              fullWidth
              required
              error={!!errors.numberOfEmployees}
              helperText={errors.numberOfEmployees}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <GroupIcon color="primary" />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          
          <Grid item xs={12} md={4} sx={{ display: 'flex', alignItems: 'center' }}>
            <FormControlLabel
              control={
                <Switch 
                  checked={shopData.hasDelivery === 'Yes'} 
                  onChange={handleDeliveryChange}
                  color="primary"
                />
              }
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <DeliveryDiningIcon color={shopData.hasDelivery === 'Yes' ? 'primary' : 'disabled'} />
                  <span>Delivery Service</span>
                </Box>
              }
            />
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              label="Food Specialties"
              name="specialties"
              value={shopData.specialties}
              onChange={handleChange}
              fullWidth
              multiline
              rows={2}
              placeholder="Enter your signature dishes or food specialties"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1.5 }}>
                    <EmojiFoodBeverageIcon color="primary" />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
        </Grid>
        
        {/* Contact Details */}
        <Typography variant="subtitle1" fontWeight="bold" color="#d32f2f" gutterBottom sx={{ mt: 4 }}>
          Contact Details
        </Typography>
        <Divider sx={{ mb: 2 }} />
        
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Telephone Number"
              name="telephoneNo"
              value={shopData.telephoneNo}
              onChange={handleChange}
              fullWidth
              required
              error={!!errors.telephoneNo}
              helperText={errors.telephoneNo}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon color="primary" />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <TextField
              label="Address of the Food Establishment"
              name="address"
              value={shopData.address}
              onChange={handleChange}
              fullWidth
              required
              error={!!errors.address}
              helperText={errors.address}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationOnIcon color="primary" />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
        </Grid>
        
        {/* Owner Information */}
        <Typography variant="subtitle1" fontWeight="bold" color="#d32f2f" gutterBottom sx={{ mt: 4 }}>
          Owner Information
        </Typography>
        <Divider sx={{ mb: 2 }} />
        
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Name of the Owner"
              name="ownerName"
              value={shopData.ownerName}
              onChange={handleChange}
              fullWidth
              required
              error={!!errors.ownerName}
              helperText={errors.ownerName}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon color="primary" />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <TextField
              label="NIC Number"
              name="nicNumber"
              value={shopData.nicNumber}
              onChange={handleChange}
              fullWidth
              error={!!errors.nicNumber}
              helperText={errors.nicNumber}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <BadgeIcon color="primary" />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              label="Private Address"
              name="privateAddress"
              value={shopData.privateAddress}
              onChange={handleChange}
              fullWidth
              multiline
              rows={2}
              error={!!errors.privateAddress}
              helperText={errors.privateAddress}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1.5 }}>
                    <LocationOnIcon color="primary" />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
        </Grid>
        
        {/* Location Details */}
        <Typography variant="subtitle1" fontWeight="bold" color="#d32f2f" gutterBottom sx={{ mt: 4 }}>
          Location Details
        </Typography>
        <Divider sx={{ mb: 2 }} />
        
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth error={!!errors.district}>
              <InputLabel>District</InputLabel>
              <Select
                name="district"
                value={shopData.district}
                onChange={handleChange}
                label="District"
              >
                {DISTRICTS.map(option => (
                  <MenuItem key={option} value={option}>{option}</MenuItem>
                ))}
              </Select>
              {errors.district && <FormHelperText>{errors.district}</FormHelperText>}
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <TextField
              label="PHI Area"
              name="phiArea"
              value={shopData.phiArea}
              onChange={handleChange}
              fullWidth
              error={!!errors.phiArea}
              helperText={errors.phiArea}
            />
          </Grid>
          
          <Grid item xs={12} md={4}>
            <FormControl fullWidth required error={!!errors.gnRegion}>
              <InputLabel>GN Region</InputLabel>
              <Select
                name="gnRegion"
                value={shopData.gnRegion}
                onChange={handleChange}
                label="GN Region"
              >
                {GN_DIVISIONS.map(option => (
                  <MenuItem key={option} value={option}>{option}</MenuItem>
                ))}
              </Select>
              {errors.gnRegion && <FormHelperText>{errors.gnRegion}</FormHelperText>}
            </FormControl>
          </Grid>
        </Grid>
      </Box>
      
      {/* Action Buttons */}
      <Box sx={{ p: 3, borderTop: '1px solid', borderColor: 'divider', display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <Button 
          variant="outlined" 
          color="secondary"
          onClick={handleReset}
          startIcon={<RefreshIcon />}
        >
          Reset
        </Button>
        <Button 
          variant="outlined" 
          onClick={onClose}
          color="error"
        >
          Cancel
        </Button>
        <Button 
          variant="contained" 
          color="error"
          type="submit"
          startIcon={<SaveIcon />}
        >
          Save Changes
        </Button>
      </Box>
    </Paper>
  );
};

export default EditShopForm;
