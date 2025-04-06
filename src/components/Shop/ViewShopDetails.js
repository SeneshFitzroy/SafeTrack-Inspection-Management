import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Chip,
  Divider,
  Button,
  IconButton,
  Rating
} from '@mui/material';
import StorefrontIcon from '@mui/icons-material/Storefront';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import BusinessIcon from '@mui/icons-material/Business';
import BadgeIcon from '@mui/icons-material/Badge';
import GroupIcon from '@mui/icons-material/Group';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import CloseIcon from '@mui/icons-material/Close';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import CakeIcon from '@mui/icons-material/Cake';
import LocalPizzaIcon from '@mui/icons-material/LocalPizza';
import EmojiFoodBeverageIcon from '@mui/icons-material/EmojiFoodBeverage';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';

const ViewShopDetails = ({ shop, onClose, onExportPdf }) => {
  // Get appropriate food icon based on category
  const getFoodIcon = (category) => {
    switch(category?.toLowerCase()) {
      case 'bakery': return <CakeIcon fontSize="small" />;
      case 'restaurant': return <RestaurantIcon fontSize="small" />;
      case 'cafe': return <LocalCafeIcon fontSize="small" />;
      case 'pizzeria': return <LocalPizzaIcon fontSize="small" />;
      case 'fast food': return <EmojiFoodBeverageIcon fontSize="small" />;
      case 'food': return <RestaurantIcon fontSize="small" />;
      default: return <StorefrontIcon fontSize="small" />;
    }
  };

  // Determine status chip style
  const getStatusChipStyle = (status) => {
    if (status === 'Active') {
      return { color: '#1e8e3e', bgcolor: '#e6f4ea' };
    } else {
      return { color: '#d93025', bgcolor: '#fce8e6' };
    }
  };

  return (
    <Paper elevation={0} sx={{ p: 0 }}>
      {/* Header */}
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
          {getFoodIcon(shop.category)} Food Establishment Details
        </Typography>
        <IconButton size="small" onClick={onClose} sx={{ color: 'white' }}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Featured Banner */}
      <Box sx={{ 
        p: 3, 
        bgcolor: 'rgba(211, 47, 47, 0.05)', 
        borderBottom: '1px solid rgba(211, 47, 47, 0.2)',
        display: 'flex', 
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'space-between',
        alignItems: { xs: 'flex-start', sm: 'center' },
        gap: 2
      }}>
        <Box>
          <Typography variant="h5" color="#d32f2f" fontWeight="bold" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {shop.name} {getFoodIcon(shop.category)}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
            <Chip
              icon={getFoodIcon(shop.category)}
              label={shop.category}
              size="small"
              sx={{ fontWeight: 500 }}
            />
            <Chip
              label={shop.status}
              size="small"
              sx={{
                ...getStatusChipStyle(shop.status),
                fontWeight: 600,
                px: 1
              }}
            />
            {shop.hasDelivery === 'Yes' && (
              <Chip
                icon={<DeliveryDiningIcon />}
                label="Delivery Available"
                size="small"
                color="success"
                sx={{ fontWeight: 500 }}
              />
            )}
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: { xs: 1, sm: 0 } }}>
          <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
            ID: {shop.id}
          </Typography>
          <Rating 
            value={4.5} 
            precision={0.5} 
            readOnly 
            size="small" 
          />
        </Box>
      </Box>

      {/* Main content */}
      <Box sx={{ p: 3 }}>
        <Grid container spacing={4}>
          {/* Left column */}
          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" color="#d32f2f" fontWeight="bold" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <RestaurantIcon /> Business Information
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary">Food Establishment Name</Typography>
                  <Typography variant="body1" fontWeight="medium">{shop.name}</Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Category</Typography>
                  <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    {getFoodIcon(shop.category)} {shop.category}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">License Number</Typography>
                  <Typography variant="body1">{shop.licenseNo}</Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Business Registration</Typography>
                  <Typography variant="body1">{shop.businessRegNo || 'N/A'}</Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Employees</Typography>
                  <Typography variant="body1">{shop.employees}</Typography>
                </Grid>

                {shop.specialties && (
                  <Grid item xs={12}>
                    <Typography variant="body2" color="text.secondary">Food Specialties</Typography>
                    <Typography variant="body1" fontStyle="italic">"{shop.specialties}"</Typography>
                  </Grid>
                )}
              </Grid>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" color="#d32f2f" fontWeight="bold" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <PersonIcon /> Owner Information
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary">Owner Name</Typography>
                  <Typography variant="body1" fontWeight="medium">{shop.owner}</Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">NIC Number</Typography>
                  <Typography variant="body1">{shop.nicNumber || 'N/A'}</Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Contact</Typography>
                  <Typography variant="body1">{shop.telephone}</Typography>
                </Grid>

                {shop.privateAddress && (
                  <Grid item xs={12}>
                    <Typography variant="body2" color="text.secondary">Private Address</Typography>
                    <Typography variant="body1">{shop.privateAddress}</Typography>
                  </Grid>
                )}
              </Grid>
            </Box>
          </Grid>

          {/* Right column */}
          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" color="#d32f2f" fontWeight="bold" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <LocationOnIcon /> Location Information
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary">Shop Address</Typography>
                  <Typography variant="body1" fontWeight="medium">{shop.address}</Typography>
                </Grid>

                <Grid item xs={4}>
                  <Typography variant="body2" color="text.secondary">GN Division</Typography>
                  <Typography variant="body1">{shop.gnDivision}</Typography>
                </Grid>

                <Grid item xs={4}>
                  <Typography variant="body2" color="text.secondary">District</Typography>
                  <Typography variant="body1">{shop.district || 'N/A'}</Typography>
                </Grid>

                <Grid item xs={4}>
                  <Typography variant="body2" color="text.secondary">PHI Area</Typography>
                  <Typography variant="body1">{shop.phiArea || 'N/A'}</Typography>
                </Grid>
              </Grid>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" color="#d32f2f" fontWeight="bold" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <BusinessIcon /> Additional Information
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">License Year</Typography>
                  <Typography variant="body1">{shop.licenseYear || new Date().getFullYear()}</Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Delivery Service</Typography>
                  <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    {shop.hasDelivery === 'Yes' ? (
                      <>
                        <DeliveryDiningIcon color="success" fontSize="small" /> Available
                      </>
                    ) : (
                      'Not Available'
                    )}
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>Health & Safety Status</Typography>
                  <Box sx={{ 
                    p: 1.5, 
                    bgcolor: '#e6f4ea', 
                    borderRadius: 1, 
                    border: '1px solid #1e8e3e',
                    color: '#1e8e3e',
                    fontWeight: 500,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}>
                    <Typography variant="body2" fontWeight="medium">
                      {shop.status === 'Active' ? 'This food establishment has passed all health & safety inspections' : 'This establishment needs further inspection'}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Footer with buttons */}
      <Box sx={{ p: 3, borderTop: '1px solid', borderColor: 'divider', display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <Button 
          variant="outlined"
          color="error"
          startIcon={<PictureAsPdfIcon />}
          onClick={onExportPdf}
        >
          Export as PDF
        </Button>
        <Button 
          variant="contained" 
          color="error"
          onClick={onClose}
        >
          Close
        </Button>
      </Box>
    </Paper>
  );
};

export default ViewShopDetails;
