import React, { useState } from 'react';
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
  FormHelperText
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
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import CakeIcon from '@mui/icons-material/Cake';
import LocalPizzaIcon from '@mui/icons-material/LocalPizza';
import EmojiFoodBeverageIcon from '@mui/icons-material/EmojiFoodBeverage';

// Food-focused trade types
const FOOD_TRADE_TYPES = [
  { value: 'Bakery', icon: <CakeIcon /> },
  { value: 'Restaurant', icon: <RestaurantIcon /> },
  { value: 'Cafe', icon: <LocalCafeIcon /> },
  { value: 'Pizzeria', icon: <LocalPizzaIcon /> },
  { value: 'Fast Food', icon: <EmojiFoodBeverageIcon /> },
  { value: 'Dessert Shop', icon: <CakeIcon /> },
  { value: 'Food Truck', icon: <RestaurantIcon /> },
  { value: 'Catering', icon: <RestaurantIcon /> },
  { value: 'Other', icon: <StorefrontIcon /> }
];

const GN_DIVISIONS = [
  'All',
  'Akurana',
  'Delthota',
  'Doluwa',
  'Gangawata Korale',
  'Ganga Ihala Korale',
  'Harispattuwa',
  'Hatharaliyadda',
  'Kundasale',
  'Medadumbara',
  'Minipe',
  'Panvila',
  'Pasbage Korale',
  'Pathadumbara',
  'Pathahewaheta',
  'Poojapitiya',
  'Thumpane',
  'Udadumbara',
  'Udapalatha',
  'Udunuwara',
  'Yatinuwara',
  'Ambanganga Korale',
  'Dambulla',
  'Galewela',
  'Laggala-Pallegama',
  'Matale',
  'Naula',
  'Pallepola',
  'Rattota',
  'Ukuwela',
  'Wilgamuwa',
  'Yatawatta',
  'Ambagamuwa',
  'Hanguranketha',
  'Kothmale',
  'Nuwara Eliya',
  'Walapane',
  'Norwood',
  'Kothmale West',
  'Nildandahinna',
  'Thalawakale',
  'Mathurata',
  'Addalachchenai',
  'Akkaraipattu',
  'Alayadiwembu',
  'Ampara',
  'Damana',
  'Dehiattakandiya',
  'Eragama',
  'Kalmunai Muslim',
  'Kalmunai Tamil',
  'Karaitivu',
  'Lahugala',
  'Mahaoya',
  'Navithanveli',
  'Ninthavur',
  'Padiyathalawa',
  'Pothuvil',
  'Sainthamarathu',
  'Samanthurai',
  'Thirukkovil',
  'Uhana',
  'Eravur Pattu',
  'Eravur Town',
  'Kattankudy',
  'Koralai Pattu',
  'Koralai Pattu Central',
  'Koralai Pattu North',
  'Koralai Pattu South',
  'Koralai Pattu West',
  'Manmunai North',
  'Manmunai Pattu',
  'Manmunai S. and Eruvil Pattu',
  'Manmunai South West',
  'Manmunai West',
  'Porativu Pattu',
  'Gomarankadawala',
  'Kantalai',
  'Kinniya',
  'Kuchchaveli',
  'Morawewa',
  'Muttur',
  'Padavi Sri Pura',
  'Seruvila',
  'Thambalagamuwa',
  'Trincomalee',
  'Verugal',
  'Galnewa',
  'Galenbindunuwewa',
  'Horowpothana',
  'Ipalogama',
  'Kahatagasdigiliya',
  'Kebithigollewa',
  'Kekirawa',
  'Mahavilachchiya',
  'Medawachchiya',
  'Mihinthale',
  'Nachchadoowa',
  'Nochchiyagama',
  'Nuwaragam Palatha Central',
  'Nuwaragam Palatha East',
  'Padaviya',
  'Palagala',
  'Palugaswewa',
  'Rajanganaya',
  'Rambewa',
  'Thalawa',
  'Thambuttegama',
  'Thirappane',
  'Dimbulagala',
  'Elahera',
  'Hingurakgoda',
  'Lankapura',
  'Medirigiriya',
  'Thamankaduwa',
  'Welikanda',
  'Delft',
  'Island North',
  'Island South',
  'Jaffna',
  'Karainagar',
  'Nallur',
  'Thenmaradchi',
  'Vadamaradchi East',
  'Vadamaradchi North',
  'Vadamaradchi South-West',
  'Valikamam East',
  'Valikamam North',
  'Valikamam South',
  'Valikamam South-West',
  'Valikamam West',
  'Kandavalai',
  'Karachchi',
  'Pachchilaipalli',
  'Poonakary',
  'Madhu',
  'Mannar',
  'Manthai West',
  'Musalai',
  'Nanaddan',
  'Manthai East',
  'Maritimepattu',
  'Oddusuddan',
  'Puthukudiyiruppu',
  'Thunukkai',
  'Welioya',
  'Vavuniya',
  'Vavuniya North',
  'Vavuniya South',
  'Vengalacheddikulam',
  'Alawwa',
  'Ambanpola',
  'Bamunakotuwa',
  'Bingiriya',
  'Ehetuwewa',
  'Galgamuwa',
  'Ganewatta',
  'Giribawa',
  'Ibbagamuwa',
  'Katupotha',
  'Kobeigane',
  'Kotavehera',
  'Kuliyapitiya East',
  'Kuliyapitiya West',
  'Kurunegala',
  'Mahawa',
  'Mallawapitiya',
  'Maspotha',
  'Mawathagama',
  'Narammala',
  'Nikaweratiya',
  'Panduwasnuwara',
  'Pannala',
  'Polgahawela',
  'Polpithigama',
  'Rasnayakapura',
  'Rideegama',
  'Udubaddawa',
  'Wariyapola',
  'Weerambugedara',
  'Anamaduwa',
  'Arachchikattuwa',
  'Chilaw',
  'Dankotuwa',
  'Kalpitiya',
  'Karuwalagaswewa',
  'Madampe',
  'Mahakumbukkadawala',
  'Mahawewa',
  'Mundalama',
  'Nattandiya',
  'Nawagattegama',
  'Pallama',
  'Puttalam',
  'Vanathavilluwa',
  'Wennappuwa',
  'Aranayaka',
  'Bulathkohupitiya',
  'Dehiovita',
  'Deraniyagala',
  'Galigamuwa',
  'Kegalle',
  'Mawanella',
  'Rambukkana',
  'Ruwanwella',
  'Warakapola',
  'Yatiyanthota',
  'Ayagama',
  'Balangoda',
  'Eheliyagoda',
  'Elapattha',
  'Embilipitiya',
  'Godakawela',
  'Imbulpe',
  'Kahawatta',
  'Kalawana',
  'Kiriella',
  'Kolonna',
  'Kuruvita',
  'Nivithigala',
  'Opanayaka',
  'Pelmadulla',
  'Ratnapura',
  'Weligepola',
  'Akmeemana',
  'Ambalangoda',
  'Baddegama',
  'Balapitiya',
  'Benthota',
  'Bope-Poddala',
  'Elpitiya',
  'Galle',
  'Gonapinuwala',
  'Habaraduwa',
  'Hikkaduwa',
  'Imaduwa',
  'Karandeniya',
  'Nagoda',
  'Neluwa',
  'Niyagama',
  'Thawalama',
  'Welivitiya-Divithura',
  'Yakkalamulla',
  'Ambalantota',
  'Angunakolapelessa',
  'Beliatta',
  'Hambantota',
  'Katuwana',
  'Lunugamvehera',
  'Okewela',
  'Sooriyawewa',
  'Tangalle',
  'Thissamaharama',
  'Walasmulla',
  'Weeraketiya',
  'Akuressa',
  'Athuraliya',
  'Devinuwara',
  'Dickwella',
  'Hakmana',
  'Kamburupitiya',
  'Kirinda Puhulwella',
  'Kotapola',
  'Malimbada',
  'Matara',
  'Mulatiyana',
  'Pasgoda',
  'Pitabeddara',
  'Thihagoda',
  'Weligama',
  'Welipitiya',
  'Badulla',
  'Bandarawela',
  'Ella',
  'Haldummulla',
  'Hali-Ela',
  'Haputale',
  'Kandaketiya',
  'Lunugala',
  'Mahiyanganaya',
  'Meegahakivula',
  'Passara',
  'Rideemaliyadda',
  'Soranathota',
  'Uva-Paranagama',
  'Welimada',
  'Badalkumbura',
  'Bibile',
  'Buttala',
  'Katharagama',
  'Madulla',
  'Medagama',
  'Moneragala',
  'Sevanagala',
  'Siyambalanduwa',
  'Thanamalvila',
  'Wellawaya',
  'Colombo',
  'Dehiwala',
  'Homagama',
  'Kaduwela',
  'Kesbewa',
  'Kolonnawa',
  'Kotte',
  'Maharagama',
  'Moratuwa',
  'Padukka',
  'Ratmalana',
  'Seethawaka',
  'Thimbirigasyaya',
  'Attanagalla',
  'Biyagama',
  'Divulapitiya',
  'Dompe',
  'Gampaha',
  'Ja-Ela',
  'Katana',
  'Kelaniya',
  'Mahara',
  'Minuwangoda',
  'Mirigama',
  'Negombo',
  'Wattala',
  'Agalawatta',
  'Bandaragama',
  'Beruwala',
  'Bulathsinhala',
  'Dodangoda',
  'Horana',
  'Ingiriya',
  'Kalutara',
  'Madurawela',
  'Mathugama',
  'Millaniya',
  'Palindanuwara',
  'Panadura',
  'Walallavita'
];
const DISTRICTS = [
  'Colombo', 'Gampaha', 'Kalutara', 'Kandy', 'Matale', 
  'Nuwara Eliya', 'Ampara', 'Batticaloa', 'Trincomalee', 'Anuradhapura', 
  'Polonnaruwa', 'Jaffna', 'Kilinochchi', 'Mannar', 'Mullaitivu', 
  'Vavuniya', 'Kurunegala', 'Puttalam', 'Kegalle', 'Ratnapura', 
  'Galle', 'Hambantota', 'Matara', 'Badulla', 'Moneragala', 
  'Colombo', 'Gampaha', 'Kalutara', 'Kandy', 'Matale', 'Nuwara Eliya', 
  'Ampara', 'Batticaloa', 'Trincomalee', 'Anuradhapura', 'Polonnaruwa', 
  'Jaffna', 'Kilinochchi', 'Mannar', 'Mullaitivu', 'Vavuniya'
];

const AddShopForm = ({ onClose, onSave }) => {
  const [shopData, setShopData] = useState({
    establishmentName: '',
    tradeType: '',
    licenseYear: new Date().getFullYear().toString(),
    licenseNumber: '',
    businessRegNo: '',
    numberOfEmployees: '',
    telephoneNo: '',
    address: '',
    ownerName: '',
    nicNumber: '',
    privateAddress: '',
    district: 'Colombo',
    phiArea: '',
    gnRegion: 'Biyagama',
    specialties: '',
    hasDelivery: 'No'
  });

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

  const validateForm = () => {
    const newErrors = {};
    
    // Required field validation
    if (!shopData.establishmentName) newErrors.establishmentName = 'Shop name is required';
    if (!shopData.tradeType) newErrors.tradeType = 'Food business type is required';
    if (!shopData.licenseYear) newErrors.licenseYear = 'License year is required';
    if (!shopData.licenseNumber) newErrors.licenseNumber = 'License number is required';
    if (!shopData.numberOfEmployees) newErrors.numberOfEmployees = 'Number of employees is required';
    if (!shopData.telephoneNo) newErrors.telephoneNo = 'Telephone number is required';
    if (!shopData.address) newErrors.address = 'Address is required';
    if (!shopData.ownerName) newErrors.ownerName = 'Owner name is required';
    if (!shopData.nicNumber) newErrors.nicNumber = 'NIC number is required';
    if (!shopData.district) newErrors.district = 'District is required';
    if (!shopData.gnRegion) newErrors.gnRegion = 'GN region is required';
    
    // Format validation
    const phoneRegex = /^\d{10}$/;
    if (shopData.telephoneNo && !phoneRegex.test(shopData.telephoneNo.replace(/\D/g, ''))) {
      newErrors.telephoneNo = 'Invalid phone format (10 digits required)';
    }
    
    // NIC validation - basic check for old (9 digits + V/X) or new (12 digits) format
    const oldNicRegex = /^\d{9}[vVxX]$/;
    const newNicRegex = /^\d{12}$/;
    if (shopData.nicNumber && !oldNicRegex.test(shopData.nicNumber) && !newNicRegex.test(shopData.nicNumber)) {
      newErrors.nicNumber = 'Invalid NIC format';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSave(shopData);
    }
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
          <RestaurantIcon /> Add New Food Establishment
        </Typography>
        <IconButton size="small" onClick={onClose} sx={{ color: 'white' }}>
          <CloseIcon />
        </IconButton>
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
                    {FOOD_TRADE_TYPES.find(type => type.value === shopData.tradeType)?.icon || <RestaurantIcon color="primary" />}
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
              required
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
          
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Delivery Service</InputLabel>
              <Select
                name="hasDelivery"
                value={shopData.hasDelivery}
                onChange={handleChange}
                label="Delivery Service"
              >
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </Select>
            </FormControl>
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
              required
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
            <FormControl fullWidth required error={!!errors.district}>
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
          Save Food Shop
        </Button>
      </Box>
    </Paper>
  );
};

export default AddShopForm;
