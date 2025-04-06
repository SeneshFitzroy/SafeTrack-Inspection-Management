import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Button, 
  IconButton,
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  TextField,
  InputAdornment,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Chip,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  TablePagination,
  CircularProgress,
  Tooltip,
  Alert
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import StorefrontIcon from '@mui/icons-material/Storefront';
import BusinessIcon from '@mui/icons-material/Business';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import BadgeIcon from '@mui/icons-material/Badge';
import GroupIcon from '@mui/icons-material/Group';
import Header from '../common/Header';
import Sidebar from '../common/Sidebar';

// Import new components
import AddShopForm from './AddShopForm';
import ViewShopDetails from './ViewShopDetails';
import EditShopForm from './EditShopForm';

// Sample shop data
const MOCK_SHOP_DATA = [
  { id: '13236', name: 'ABC Cafe & Bakery', address: '585 Makola North Makola', owner: 'Kasun Perera', telephone: '0717494743', licenseNo: '26497833', employees: 35, gnDivision: 'Biyagama', category: 'Food', status: 'Active' },
  { id: '13237', name: 'Sunrise Groceries', address: '23 Main Street, Kaduwela', owner: 'Priya Mendis', telephone: '0767832156', licenseNo: '27584933', employees: 12, gnDivision: 'Kaduwela', category: 'Groceries', status: 'Active' },
  { id: '13238', name: 'Golden Spoon Bakery', address: '112 Temple Road, Kelaniya', owner: 'Nuwan Silva', telephone: '0719467821', licenseNo: '29674521', employees: 18, gnDivision: 'Kelaniya', category: 'Food', status: 'Active' },
  { id: '13239', name: 'SwiftTech Electronics', address: '45 Station Road, Kolonnawa', owner: 'Samantha Fernando', telephone: '0776542198', licenseNo: '31452789', employees: 23, gnDivision: 'Kolonnawa', category: 'Electronics', status: 'Active' },
  { id: '13240', name: 'Urban Trends Clothing', address: '78 High Street, Kaduwela', owner: 'Dinesh Rajapaksa', telephone: '0723456789', licenseNo: '28976543', employees: 15, gnDivision: 'Kaduwela', category: 'Retail', status: 'Inactive' },
  { id: '13241', name: 'Wellness Pharmacy', address: '34 Hospital Road, Biyagama', owner: 'Dilshan Perera', telephone: '0712345678', licenseNo: '25764321', employees: 8, gnDivision: 'Biyagama', category: 'Healthcare', status: 'Active' },
  { id: '13242', name: 'Fresh Market Groceries', address: '56 Market Street, Kelaniya', owner: 'Amali Jayawardena', telephone: '0765432198', licenseNo: '29876543', employees: 20, gnDivision: 'Kelaniya', category: 'Groceries', status: 'Active' },
  { id: '13243', name: 'Tasty Delights Restaurant', address: '89 Food Avenue, Biyagama', owner: 'Ruwan Senaratne', telephone: '0719876543', licenseNo: '26543219', employees: 28, gnDivision: 'Biyagama', category: 'Food', status: 'Active' },
];

// Filter options
const GN_DIVISIONS = ['All', 'Biyagama', 'Kaduwela', 'Kelaniya', 'Kolonnawa'];
const STATUS_OPTIONS = ['All', 'Active', 'Inactive'];

const ShopManagement = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [shops, setShops] = useState(MOCK_SHOP_DATA);
  const [filteredShops, setFilteredShops] = useState(MOCK_SHOP_DATA);
  const [searchQuery, setSearchQuery] = useState('');
  const [gnDivisionFilter, setGnDivisionFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState('view');
  const [selectedShop, setSelectedShop] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    owner: '',
    telephone: '',
    licenseNo: '',
    employees: '',
    gnDivision: '',
    category: '',
    status: 'Active'
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const [loading, setLoading] = useState(false);

  const [stats, setStats] = useState({
    totalShops: 0,
    activeShops: 0,
    inactiveShops: 0
  });

  const [formDialog, setFormDialog] = useState({
    open: false,
    type: null, // 'add', 'view', 'edit'
  });

  useEffect(() => {
    const totalShops = shops.length;
    const activeShops = shops.filter(shop => shop.status === 'Active').length;
    const inactiveShops = shops.filter(shop => shop.status === 'Inactive').length;
    
    setStats({
      totalShops,
      activeShops,
      inactiveShops
    });
  }, [shops]);

  useEffect(() => {
    setLoading(true);
    
    setTimeout(() => {
      let result = [...shops];
      
      if (searchQuery) {
        const lowercaseQuery = searchQuery.toLowerCase();
        result = result.filter(shop => 
          shop.name.toLowerCase().includes(lowercaseQuery) ||
          shop.owner.toLowerCase().includes(lowercaseQuery) ||
          shop.address.toLowerCase().includes(lowercaseQuery) ||
          shop.id.includes(lowercaseQuery)
        );
      }
      
      if (gnDivisionFilter !== 'All') {
        result = result.filter(shop => shop.gnDivision === gnDivisionFilter);
      }
      
      if (statusFilter !== 'All') {
        result = result.filter(shop => shop.status === statusFilter);
      }
      
      result.sort((a, b) => {
        const valueA = typeof a[sortField] === 'string' ? a[sortField].toLowerCase() : a[sortField];
        const valueB = typeof b[sortField] === 'string' ? b[sortField].toLowerCase() : b[sortField];
        
        if (sortDirection === 'asc') {
          return valueA > valueB ? 1 : -1;
        } else {
          return valueA < valueB ? 1 : -1;
        }
      });
      
      setFilteredShops(result);
      setLoading(false);
    }, 300);
  }, [shops, searchQuery, gnDivisionFilter, statusFilter, sortField, sortDirection]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setGnDivisionFilter('All');
    setStatusFilter('All');
    setPage(0);
  };

  const handleViewShop = (shop) => {
    setDialogType('view');
    setSelectedShop(shop);
    setFormData({
      name: shop.name,
      address: shop.address,
      owner: shop.owner,
      telephone: shop.telephone,
      licenseNo: shop.licenseNo,
      employees: shop.employees,
      gnDivision: shop.gnDivision,
      category: shop.category,
      status: shop.status
    });
    setOpenDialog(true);
  };

  const handleViewDetail = () => {
    setSnackbar({
      open: true,
      message: 'View shop details feature coming soon!',
      severity: 'info'
    });
  };

  const handleEditShop = (shop) => {
    setSnackbar({
      open: true,
      message: 'Edit shop feature coming soon!',
      severity: 'info'
    });
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedShop(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false
    });
  };

  const getStatusChipStyle = (status) => {
    if (status === 'Active') {
      return { color: '#1e8e3e', bgcolor: '#e6f4ea' };
    } else {
      return { color: '#d93025', bgcolor: '#fce8e6' };
    }
  };

  const getCategoryChipStyle = (category) => {
    switch (category) {
      case 'Food':
        return { color: '#8e24aa', bgcolor: '#f3e5f5' };
      case 'Groceries':
        return { color: '#2e7d32', bgcolor: '#e8f5e9' };
      case 'Electronics':
        return { color: '#1565c0', bgcolor: '#e3f2fd' };
      case 'Retail':
        return { color: '#ef6c00', bgcolor: '#fff3e0' };
      case 'Healthcare':
        return { color: '#d32f2f', bgcolor: '#ffebee' };
      default:
        return { color: '#616161', bgcolor: '#f5f5f5' };
    }
  };

  const handleAddShopClick = () => {
    setFormDialog({
      open: true,
      type: 'add'
    });
  };

  const handleViewShopClick = (shop) => {
    setSelectedShop(shop);
    setFormDialog({
      open: true,
      type: 'view'
    });
  };

  const handleEditShopClick = (shop) => {
    setSelectedShop(shop);
    setFormDialog({
      open: true,
      type: 'edit'
    });
  };

  const handleCloseForm = () => {
    setFormDialog({
      open: false,
      type: null
    });
    setSelectedShop(null);
  };

  const handleSaveNewShop = (shopData) => {
    setLoading(true);
    
    setTimeout(() => {
      const newShop = {
        id: `${Math.floor(10000 + Math.random() * 90000)}`,
        name: shopData.establishmentName,
        address: shopData.address,
        owner: shopData.ownerName,
        telephone: shopData.telephoneNo,
        licenseNo: shopData.licenseNumber,
        employees: parseInt(shopData.numberOfEmployees, 10),
        gnDivision: shopData.gnRegion,
        category: shopData.tradeType,
        status: 'Active',
        nicNumber: shopData.nicNumber,
        businessRegNo: shopData.businessRegNo,
        district: shopData.district,
        phiArea: shopData.phiArea,
        privateAddress: shopData.privateAddress,
        licenseYear: shopData.licenseYear
      };
      
      setShops([...shops, newShop]);
      setSnackbar({
        open: true,
        message: 'Shop added successfully!',
        severity: 'success'
      });
      
      handleCloseForm();
      setLoading(false);
    }, 800);
  };

  const handleSaveUpdatedShop = (updatedShop) => {
    setLoading(true);
    
    setTimeout(() => {
      const updatedShops = shops.map(shop => 
        shop.id === updatedShop.id ? updatedShop : shop
      );
      
      setShops(updatedShops);
      setSnackbar({
        open: true,
        message: 'Shop updated successfully!',
        severity: 'success'
      });
      
      handleCloseForm();
      setLoading(false);
    }, 800);
  };

  const handleExportShopPdf = () => {
    setSnackbar({
      open: true,
      message: 'Exporting shop details as PDF...',
      severity: 'info'
    });
  };

  const HeaderCell = ({ label }) => (
    <TableCell 
      sx={{ 
        fontWeight: 'bold', 
        bgcolor: theme.palette.primary.main,
        color: 'white',
        py: 2,
        px: 3
      }}
    >
      {label}
    </TableCell>
  );

  const paginatedShops = filteredShops.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box sx={{ display: 'flex', height: '100vh', bgcolor: '#F5F8FF' }}>
      <Sidebar />
      
      <Box sx={{ flexGrow: 1, overflow: 'auto', p: 0 }}>
        <Header pageTitle="Shop Management" />
        
        <Box sx={{ p: 4 }}>
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={4}>
              <Paper elevation={1} sx={{ p: 3, borderRadius: 2, bgcolor: 'white', borderLeft: '4px solid #1e8e3e', textAlign: 'center' }}>
                <Typography variant="h5" fontWeight="bold" color="#1e8e3e">{stats.totalShops}</Typography>
                <Typography variant="body1" color="text.secondary">Total Shops</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper elevation={1} sx={{ p: 3, borderRadius: 2, bgcolor: 'white', borderLeft: '4px solid #1976d2', textAlign: 'center' }}>
                <Typography variant="h5" fontWeight="bold" color="#1976d2">{stats.activeShops}</Typography>
                <Typography variant="body1" color="text.secondary">Active Shops</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper elevation={1} sx={{ p: 3, borderRadius: 2, bgcolor: 'white', borderLeft: '4px solid #d93025', textAlign: 'center' }}>
                <Typography variant="h5" fontWeight="bold" color="#d93025">{stats.inactiveShops}</Typography>
                <Typography variant="body1" color="text.secondary">Inactive Shops</Typography>
              </Paper>
            </Grid>
          </Grid>
          
          <Paper elevation={1} sx={{ p: 2, mb: 3, borderRadius: 2 }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              flexWrap: { xs: 'wrap', md: 'nowrap' },
              gap: 2
            }}>
              <TextField
                placeholder="Search shops..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                variant="outlined"
                size="small"
                sx={{ flexGrow: 1, minWidth: '200px' }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="primary" />
                    </InputAdornment>
                  ),
                  endAdornment: searchQuery && (
                    <InputAdornment position="end">
                      <IconButton size="small" onClick={() => setSearchQuery('')}>
                        <ClearIcon fontSize="small" />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              
              <FormControl size="small" sx={{ minWidth: '150px' }}>
                <InputLabel>GN Division</InputLabel>
                <Select
                  value={gnDivisionFilter}
                  label="GN Division"
                  onChange={(e) => setGnDivisionFilter(e.target.value)}
                >
                  {GN_DIVISIONS.map((division) => (
                    <MenuItem key={division} value={division}>
                      {division}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              
              <FormControl size="small" sx={{ minWidth: '120px' }}>
                <InputLabel>Status</InputLabel>
                <Select
                  value={statusFilter}
                  label="Status"
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  {STATUS_OPTIONS.map((status) => (
                    <MenuItem key={status} value={status}>
                      {status}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button 
                  variant="contained" 
                  size="small"
                  color="primary"
                  startIcon={<StorefrontIcon />}
                  onClick={handleAddShopClick}
                  disabled={loading}
                >
                  Add Shop
                </Button>
                
                {(searchQuery || gnDivisionFilter !== 'All' || statusFilter !== 'All') && (
                  <Button 
                    variant="outlined"
                    color="secondary"
                    size="small"
                    onClick={clearFilters}
                    startIcon={<ClearIcon />}
                  >
                    Clear
                  </Button>
                )}
              </Box>
            </Box>
          </Paper>
          
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Showing {filteredShops.length} {filteredShops.length === 1 ? 'shop' : 'shops'}
            {searchQuery && <span> for "{searchQuery}"</span>}
            {gnDivisionFilter !== 'All' && <span> in {gnDivisionFilter}</span>}
            {statusFilter !== 'All' && <span> with {statusFilter} status</span>}
          </Typography>
          
          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
              <CircularProgress size={40} />
            </Box>
          )}
          
          {!loading && (
            <Paper elevation={1} sx={{ borderRadius: 2, overflow: 'hidden', mb: 3 }}>
              <TableContainer>
                <Table sx={{ minWidth: 1000 }}>
                  <TableHead>
                    <TableRow>
                      <HeaderCell label="ID" />
                      <HeaderCell label="Shop Name" />
                      <HeaderCell label="Owner" />
                      <HeaderCell label="Contact" />
                      <HeaderCell label="Location" />
                      <HeaderCell label="License No" />
                      <HeaderCell label="Employees" />
                      <HeaderCell label="Status" />
                      <HeaderCell label="Actions" />
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paginatedShops.length > 0 ? (
                      paginatedShops.map((shop, index) => (
                        <TableRow 
                          key={shop.id} 
                          sx={{ 
                            '&:hover': { bgcolor: 'rgba(84, 121, 255, 0.08)' },
                            bgcolor: index % 2 ? 'rgba(0, 0, 0, 0.02)' : 'inherit',
                            cursor: 'pointer'
                          }}
                          onClick={() => handleViewShop(shop)}
                        >
                          <TableCell sx={{ fontWeight: 500, width: '80px' }}>{shop.id}</TableCell>
                          <TableCell sx={{ fontWeight: 600, color: theme.palette.primary.main }}>
                            {shop.name}
                            <Typography variant="caption" display="block" color="text.secondary">
                              {shop.category}
                            </Typography>
                          </TableCell>
                          <TableCell>{shop.owner}</TableCell>
                          <TableCell>
                            {shop.telephone}
                          </TableCell>
                          <TableCell>
                            <Box>
                              {shop.address}
                              <Typography variant="caption" display="block" color="text.secondary">
                                {shop.gnDivision}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>{shop.licenseNo}</TableCell>
                          <TableCell align="center" sx={{ fontWeight: 500 }}>{shop.employees}</TableCell>
                          <TableCell>
                            <Chip
                              label={shop.status}
                              size="small"
                              sx={{
                                ...getStatusChipStyle(shop.status),
                                fontWeight: 600
                              }}
                            />
                          </TableCell>
                          <TableCell align="center">
                            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                              <Tooltip title="View Details">
                                <IconButton 
                                  size="small" 
                                  color="info"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleViewShopClick(shop);
                                  }}
                                >
                                  <VisibilityIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Edit Shop">
                                <IconButton 
                                  size="small" 
                                  color="primary"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleEditShopClick(shop);
                                  }}
                                >
                                  <EditIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={9} align="center" sx={{ py: 8 }}>
                          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                            <StorefrontIcon sx={{ fontSize: 60, color: 'text.disabled' }} />
                            <Typography variant="h6" color="text.secondary">No shops found</Typography>
                            <Typography variant="body2" color="text.secondary">
                              Try adjusting your search or filters to find what you're looking for
                            </Typography>
                            {(searchQuery || gnDivisionFilter !== 'All' || statusFilter !== 'All') && (
                              <Button 
                                variant="outlined" 
                                size="small" 
                                onClick={clearFilters}
                                sx={{ mt: 1 }}
                              >
                                Clear Filters
                              </Button>
                            )}
                          </Box>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              
              {filteredShops.length > 0 && (
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, 50]}
                  component="div"
                  count={filteredShops.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              )}
            </Paper>
          )}
        </Box>
      </Box>
      
      <Dialog
        open={formDialog.open}
        maxWidth="md"
        fullWidth
        PaperProps={{ sx: { borderRadius: 2 } }}
      >
        {formDialog.type === 'add' && (
          <AddShopForm 
            onClose={handleCloseForm} 
            onSave={handleSaveNewShop} 
          />
        )}
        
        {formDialog.type === 'view' && selectedShop && (
          <ViewShopDetails 
            shop={selectedShop}
            onClose={handleCloseForm}
            onExportPdf={handleExportShopPdf}
          />
        )}
        
        {formDialog.type === 'edit' && selectedShop && (
          <EditShopForm 
            shop={selectedShop}
            onClose={handleCloseForm}
            onSave={handleSaveUpdatedShop}
          />
        )}
      </Dialog>
      
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity} 
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ShopManagement;
