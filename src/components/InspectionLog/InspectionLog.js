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
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Chip,
  Tooltip,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Autocomplete,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate, useLocation } from 'react-router-dom';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AssignmentIcon from '@mui/icons-material/Assignment';
import StorefrontIcon from '@mui/icons-material/Storefront';
import BarChartIcon from '@mui/icons-material/BarChart';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import ViewIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SortIcon from '@mui/icons-material/Sort';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import HelpIcon from '@mui/icons-material/Help';
import Header from '../common/Header';
import Sidebar from '../common/Sidebar';
import InspectionDetailsPanel from '../Inspection/InspectionDetailsPanel';

// Enhanced mock data with consistent date ranges spanning different months
const MOCK_INSPECTION_DATA = [
  // October 2024
  { id: 13245, date: '2024-10-28', shopName: 'Family Pharmacy', gnDivision: 'Kolonnawa', ranking: 'A' },
  { id: 13244, date: '2024-10-25', shopName: 'Tech Haven Electronics', gnDivision: 'Biyagama', ranking: 'C' },
  { id: 13243, date: '2024-10-22', shopName: 'Tasty Delights Restaurant', gnDivision: 'Kelaniya', ranking: 'B' },
  { id: 13242, date: '2024-10-20', shopName: 'Fresh Market Groceries', gnDivision: 'Kaduwela', ranking: 'A' },
  { id: 13241, date: '2024-10-18', shopName: 'Wellness Pharmacy', gnDivision: 'Biyagama', ranking: 'D' },
  { id: 13240, date: '2024-10-15', shopName: 'Urban Trends Clothing', gnDivision: 'Kolonnawa', ranking: 'C' },
  { id: 13239, date: '2024-10-12', shopName: 'SwiftTech Electronics', gnDivision: 'Kaduwela', ranking: 'B' },
  { id: 13238, date: '2024-10-08', shopName: 'Golden Spoon Bakery', gnDivision: 'Biyagama', ranking: 'A' },
  { id: 13237, date: '2024-10-05', shopName: 'Sunrise Groceries', gnDivision: 'Kelaniya', ranking: 'B' },
  { id: 13236, date: '2024-10-02', shopName: 'ABC Cafe & Bakery', gnDivision: 'Biyagama', ranking: 'A' },
  
  // September 2024
  { id: 13235, date: '2024-09-30', shopName: 'Sunset Bakery', gnDivision: 'Kolonnawa', ranking: 'B' },
  { id: 13234, date: '2024-09-27', shopName: 'Health First Pharmacy', gnDivision: 'Kaduwela', ranking: 'A' },
  { id: 13233, date: '2024-09-25', shopName: 'Quick Mart Grocery', gnDivision: 'Biyagama', ranking: 'C' },
  { id: 13232, date: '2024-09-20', shopName: 'Spice Garden Restaurant', gnDivision: 'Kelaniya', ranking: 'B' },
  { id: 13231, date: '2024-09-18', shopName: 'Comfort Electronics', gnDivision: 'Kolonnawa', ranking: 'A' },
  { id: 13230, date: '2024-09-15', shopName: 'Central Pharmacy', gnDivision: 'Biyagama', ranking: 'B' },
  { id: 13229, date: '2024-09-10', shopName: 'Daily Fresh Market', gnDivision: 'Kaduwela', ranking: 'A' },
  { id: 13228, date: '2024-09-07', shopName: 'Taste of Asia Restaurant', gnDivision: 'Kelaniya', ranking: 'C' },
  { id: 13227, date: '2024-09-05', shopName: 'Modern Electronics', gnDivision: 'Biyagama', ranking: 'B' },
  { id: 13226, date: '2024-09-02', shopName: 'Community Pharmacy', gnDivision: 'Kolonnawa', ranking: 'A' },
  
  // August 2024
  { id: 13225, date: '2024-08-30', shopName: 'Green Grocers', gnDivision: 'Kelaniya', ranking: 'B' },
  { id: 13224, date: '2024-08-28', shopName: 'Fine Dining Restaurant', gnDivision: 'Biyagama', ranking: 'A' },
  { id: 13223, date: '2024-08-25', shopName: 'Budget Electronics', gnDivision: 'Kaduwela', ranking: 'C' },
  { id: 13222, date: '2024-08-22', shopName: 'Downtown Pharmacy', gnDivision: 'Kolonnawa', ranking: 'B' },
  { id: 13221, date: '2024-08-20', shopName: 'Fresh Finds Market', gnDivision: 'Kelaniya', ranking: 'A' },
  { id: 13220, date: '2024-08-18', shopName: 'Easy Tech Store', gnDivision: 'Biyagama', ranking: 'D' },
  { id: 13219, date: '2024-08-15', shopName: 'Blissful Bakery', gnDivision: 'Kaduwela', ranking: 'B' },
  { id: 13218, date: '2024-08-10', shopName: 'Convenience Mart', gnDivision: 'Kolonnawa', ranking: 'C' },
  { id: 13217, date: '2024-08-05', shopName: 'Wellness Clinic Pharmacy', gnDivision: 'Biyagama', ranking: 'A' },
  { id: 13216, date: '2024-08-02', shopName: 'Family Restaurant', gnDivision: 'Kelaniya', ranking: 'B' },
  
  // July 2024
  { id: 13215, date: '2024-07-30', shopName: 'Mega Electronics', gnDivision: 'Kaduwela', ranking: 'B' },
  { id: 13214, date: '2024-07-28', shopName: 'Value Grocery', gnDivision: 'Kolonnawa', ranking: 'A' },
  { id: 13213, date: '2024-07-25', shopName: 'Town Pharmacy', gnDivision: 'Biyagama', ranking: 'C' },
  { id: 13212, date: '2024-07-22', shopName: 'Royal Bakery', gnDivision: 'Kelaniya', ranking: 'B' },
  { id: 13211, date: '2024-07-20', shopName: 'Elite Restaurant', gnDivision: 'Kaduwela', ranking: 'A' },
  { id: 13210, date: '2024-07-15', shopName: 'Prime Electronics', gnDivision: 'Kolonnawa', ranking: 'B' },
  { id: 13209, date: '2024-07-10', shopName: 'City Pharmacy', gnDivision: 'Biyagama', ranking: 'A' },
  { id: 13208, date: '2024-07-05', shopName: 'Budget Grocery', gnDivision: 'Kelaniya', ranking: 'C' },
  { id: 13207, date: '2024-07-02', shopName: 'Cafe Supreme', gnDivision: 'Kaduwela', ranking: 'B' },
];

// Available months for filtering - now matches the data
const AVAILABLE_MONTHS = [
  { value: 'All', label: 'All Dates' },
  { value: 'October 2024', label: 'October 2024' },
  { value: 'September 2024', label: 'September 2024' },
  { value: 'August 2024', label: 'August 2024' },
  { value: 'July 2024', label: 'July 2024' },
];

// Ranking options
const RANKING_OPTIONS = [
  { value: 'All', label: 'All Rankings' },
  { value: 'A', label: 'A - Excellent' },
  { value: 'B', label: 'B - Good' },
  { value: 'C', label: 'C - Fair' },
  { value: 'D', label: 'D - Poor' },
];

// Shop options
const SHOP_OPTIONS = [
  { id: 'SH001', name: 'Golden Dragon Restaurant' },
  { id: 'SH002', name: 'Tasty Bakery' },
  { id: 'SH003', name: 'ABC Cafe & Bakery' },
  { id: 'SH004', name: 'Sunrise Diner' },
  { id: 'SH005', name: 'Spice Heaven' },
];

export const InspectionLog = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  
  // State variables for filtering and sorting
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDate, setFilterDate] = useState('All');
  const [rankingFilter, setRankingFilter] = useState('All');
  const [filterShop, setFilterShop] = useState(null);
  const [inspectionData, setInspectionData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');
  
  // State for view/edit dialog
  const [selectedInspection, setSelectedInspection] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState('view'); // 'view', 'edit', or 'delete'
  
  // New state for inspection details panel
  const [detailsPanelOpen, setDetailsPanelOpen] = useState(false);
  const [viewInspectionData, setViewInspectionData] = useState(null);

  // Use consistent date format for both display and filtering
  const formatDisplayDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Format date for filter comparison (YYYY-MM-DD)
  const formatFilterDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  // Enhance date rendering in table with more user-friendly format
  const formatTableDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Filter function to apply all active filters
  useEffect(() => {
    let filtered = [...inspectionData];
    
    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(item => 
        item.shopName.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.id.toString().includes(searchQuery) ||
        item.gnDivision.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply ranking filter
    if (rankingFilter !== 'All') {
      filtered = filtered.filter(item => item.ranking === rankingFilter);
    }
    
    // Apply shop filter
    if (filterShop) {
      filtered = filtered.filter(item => item.shopName === filterShop.name);
    }
    
    // Apply date filter - Enhanced to handle "All" option and exact month matching
    if (filterDate !== 'All') {
      const [month, year] = filterDate.split(' ');
      filtered = filtered.filter(item => {
        const date = new Date(item.date);
        return (
          date.getFullYear() === parseInt(year) && 
          date.toLocaleString('default', { month: 'long' }) === month
        );
      });
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      if (sortField === 'id') {
        return sortDirection === 'asc' ? a.id - b.id : b.id - a.id;
      } else if (sortField === 'date') {
        return sortDirection === 'asc' 
          ? new Date(a.date) - new Date(b.date) 
          : new Date(b.date) - new Date(a.date);
      } else {
        // String comparisons for other fields
        const valueA = a[sortField].toString().toLowerCase();
        const valueB = b[sortField].toString().toLowerCase();
        return sortDirection === 'asc'
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }
    });
    
    setFilteredData(filtered);
  }, [searchQuery, rankingFilter, filterDate, filterShop, inspectionData, sortField, sortDirection]);

  // Sort function
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Function to handle dialog actions
  const handleAction = (action, inspection) => {
    setSelectedInspection(inspection);
    
    if (action === 'view') {
      // Convert the inspection data to the format expected by InspectionDetailsPanel
      const inspectionDetails = {
        shopName: inspection.shopName,
        shopId: `SH-${inspection.id}`,
        inspector: "Current User", // Default to current user instead of specific inspector
        date: inspection.date,
        status: inspection.ranking,
        cleanliness: inspection.ranking === 'A' ? 4.5 : 
                    inspection.ranking === 'B' ? 3.5 : 
                    inspection.ranking === 'C' ? 2.5 : 1.5,
        documentation: inspection.ranking === 'A' ? 100 : 
                      inspection.ranking === 'B' ? 85 : 
                      inspection.ranking === 'C' ? 70 : 55,
        staffTraining: inspection.ranking === 'A' || inspection.ranking === 'B',
        highlights: [
          "Health and safety compliance in good standing",
          `Inspection conducted in ${inspection.gnDivision} area`,
          inspection.ranking === 'A' ? "Excellent food handling practices" : 
          inspection.ranking === 'B' ? "Good food handling practices" : 
          "Standard food handling practices"
        ],
        recommendations: [
          inspection.ranking === 'A' ? "Continue maintaining high standards" : 
          inspection.ranking === 'B' ? "Minor improvements needed in documentation" : 
          inspection.ranking === 'C' ? "Significant improvements needed in cleanliness" :
          "Major improvements required across all areas",
          "Follow up inspection scheduled as per protocol"
        ],
        inspectorNotes: `Inspection conducted on ${inspection.date} in ${inspection.gnDivision}.`,
        attachments: inspection.ranking === 'A' || inspection.ranking === 'B' ? 
          ["Inspection_Certificate.pdf", "Compliance_Document.pdf"] : 
          ["Improvement_Notice.pdf"]
      };
      
      setViewInspectionData(inspectionDetails);
      setDetailsPanelOpen(true);
    } else {
      setDialogMode(action);
      setDialogOpen(true);
    }
  };

  // Handle close of inspection details panel
  const handleDetailsPanelClose = () => {
    setDetailsPanelOpen(false);
    setViewInspectionData(null);
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setRankingFilter('All');
    setFilterDate('All');
    setFilterShop(null);
  };

  // Handle dialog close
  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedInspection(null);
  };

  // Handle delete confirmation
  const handleDeleteConfirm = () => {
    if (selectedInspection) {
      setInspectionData(prevData => 
        prevData.filter(item => item.id !== selectedInspection.id)
      );
      setDialogOpen(false);
      setSelectedInspection(null);
    }
  };

  // Function to get color based on ranking
  const getRankingColor = (ranking) => {
    switch (ranking) {
      case 'A':
        return { color: '#1e8e3e', bgColor: '#e6f4ea', icon: <CheckCircleIcon fontSize="small" /> };
      case 'B':
        return { color: '#f9ab00', bgColor: '#fef7e0', icon: <HelpIcon fontSize="small" /> };
      case 'C':
        return { color: '#fa903e', bgColor: '#fef0e6', icon: <WarningIcon fontSize="small" /> };
      case 'D':
        return { color: '#d93025', bgColor: '#fce8e6', icon: <ErrorIcon fontSize="small" /> };
      default:
        return { color: '#5f6368', bgColor: '#f1f3f4', icon: null };
    }
  };

  const SortableTableCell = ({ label, field }) => (
    <TableCell>
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          cursor: 'pointer',
          '&:hover': { color: theme.palette.primary.main }
        }}
        onClick={() => handleSort(field)}
      >
        {label}
        <SortIcon 
          fontSize="small" 
          sx={{ 
            ml: 0.5, 
            opacity: sortField === field ? 1 : 0.3,
            transform: sortField === field && sortDirection === 'desc' ? 'rotate(180deg)' : 'none'
          }} 
        />
      </Box>
    </TableCell>
  );

  useEffect(() => {
    const formattedInspections = MOCK_INSPECTION_DATA.map(inspection => ({
      ...inspection,
      dateForFilter: formatFilterDate(inspection.date),
      displayDate: formatDisplayDate(inspection.date)
    }));
    setInspectionData(formattedInspections);
    setFilteredData(formattedInspections);
  }, []);

  return (
    <Box sx={{ display: 'flex', height: '100vh', bgcolor: '#F5F8FF' }}>
      {/* Use the shared Sidebar component */}
      <Sidebar />
      
      {/* Main Content */}
      <Box sx={{ 
        flex: 1, 
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Show details panel if open, otherwise show the normal view */}
        {detailsPanelOpen && viewInspectionData ? (
          <InspectionDetailsPanel 
            isOpen={detailsPanelOpen}
            onClose={handleDetailsPanelClose}
            inspectionData={viewInspectionData}
          />
        ) : (
          <>
            {/* Header */}
            <Header pageTitle="Inspection Log" />
            
            {/* Inspection Log Content */}
            <Box sx={{ p: 4, flexGrow: 1 }}>
              {/* Toolbar with search and filters */}
              <Box sx={{ mb: 3, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2, alignItems: 'center', justifyContent: 'space-between' }}>
                {/* Left Side - Search */}
                <TextField
                  placeholder="Search by Shop, GN Division or ID"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  variant="outlined"
                  size="small"
                  sx={{ minWidth: { xs: '100%', md: 300 } }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
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
                
                {/* Right Side - Filters and Actions */}
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
                  {/* Shop Filter */}
                  <Autocomplete
                    size="small"
                    sx={{ minWidth: 200 }}
                    options={SHOP_OPTIONS}
                    getOptionLabel={(option) => option.name}
                    value={filterShop}
                    onChange={(event, newValue) => {
                      setFilterShop(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="Shop" variant="outlined" />
                    )}
                  />
                  
                  {/* Date Filter */}
                  <FormControl size="small" sx={{ minWidth: 150 }}>
                    <InputLabel id="date-filter-label">Date</InputLabel>
                    <Select
                      labelId="date-filter-label"
                      value={filterDate}
                      label="Date"
                      onChange={(e) => setFilterDate(e.target.value)}
                    >
                      {AVAILABLE_MONTHS.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  
                  {/* Ranking Filter */}
                  <FormControl size="small" sx={{ minWidth: 150 }}>
                    <InputLabel id="ranking-filter-label">Ranking</InputLabel>
                    <Select
                      labelId="ranking-filter-label"
                      value={rankingFilter}
                      label="Ranking"
                      onChange={(e) => setRankingFilter(e.target.value)}
                    >
                      {RANKING_OPTIONS.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  
                  {/* Clear Filters Button */}
                  {(searchQuery || rankingFilter !== 'All' || filterShop) && (
                    <Button 
                      variant="outlined" 
                      size="small" 
                      startIcon={<ClearIcon />}
                      onClick={clearFilters}
                    >
                      Clear Filters
                    </Button>
                  )}
                  
                  {/* Add New Inspection Button */}
                  <Button 
                    variant="contained" 
                    color="primary" 
                    startIcon={<AddIcon />}
                    onClick={() => navigate('/inspection-form')}
                  >
                    New Inspection
                  </Button>
                </Box>
              </Box>
              
              <Divider sx={{ mb: 3 }} />
              
              {/* Results Count */}
              <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  Showing {filteredData.length} {filteredData.length === 1 ? 'result' : 'results'}
                  {searchQuery && <span> for "{searchQuery}"</span>}
                  {rankingFilter !== 'All' && <span> with ranking {rankingFilter}</span>}
                  {filterShop && <span> for shop {filterShop.name}</span>}
                  {filterDate !== 'All' && <span> from {filterDate}</span>}
                </Typography>
              </Box>
              
              {/* Table */}
              <TableContainer component={Paper} elevation={0} sx={{ mb: 3, borderRadius: 2, overflow: 'hidden' }}>
                <Table sx={{ minWidth: 650 }} size="medium">
                  <TableHead sx={{ bgcolor: 'background.paper' }}>
                    <TableRow>
                      <SortableTableCell label="Reference ID" field="id" />
                      <SortableTableCell label="Date" field="date" />
                      <SortableTableCell label="Shop Name" field="shopName" />
                      <SortableTableCell label="GN Division" field="gnDivision" />
                      <SortableTableCell label="Ranking" field="ranking" />
                      <TableCell align="center">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredData.length > 0 ? (
                      filteredData.map((inspection) => {
                        const rankingStyle = getRankingColor(inspection.ranking);
                        return (
                          <TableRow 
                            key={inspection.id}
                            sx={{ '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.04)' } }}
                          >
                            <TableCell sx={{ fontWeight: 500 }}>#{inspection.id}</TableCell>
                            <TableCell>{formatTableDate(inspection.date)}</TableCell>
                            <TableCell sx={{ fontWeight: 500 }}>{inspection.shopName}</TableCell>
                            <TableCell>{inspection.gnDivision}</TableCell>
                            <TableCell>
                              <Chip
                                icon={rankingStyle.icon}
                                label={inspection.ranking}
                                size="small"
                                sx={{
                                  backgroundColor: rankingStyle.bgColor,
                                  color: rankingStyle.color,
                                  fontWeight: 600,
                                  '& .MuiChip-icon': {
                                    color: rankingStyle.color
                                  }
                                }}
                              />
                            </TableCell>
                            <TableCell align="center">
                              <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                                <Tooltip title="View Details">
                                  <IconButton 
                                    size="small" 
                                    color="primary"
                                    onClick={() => handleAction('view', inspection)}
                                  >
                                    <ViewIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Edit Inspection">
                                  <IconButton 
                                    size="small" 
                                    color="warning"
                                    onClick={() => handleAction('edit', inspection)}
                                  >
                                    <EditIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Delete">
                                  <IconButton 
                                    size="small" 
                                    color="error"
                                    onClick={() => handleAction('delete', inspection)}
                                  >
                                    <DeleteIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                              </Box>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                            <AssignmentIcon sx={{ fontSize: 40, color: 'text.disabled' }} />
                            <Typography variant="h6" color="text.secondary">No inspections found</Typography>
                            <Typography variant="body2" color="text.secondary">
                              Try adjusting your search or filters to find what you're looking for
                            </Typography>
                            {(searchQuery || rankingFilter !== 'All' || filterShop) && (
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
            </Box>
          </>
        )}
      </Box>
      
      {/* View/Edit/Delete Dialog */}
      <Dialog 
        open={dialogOpen} 
        onClose={handleDialogClose} 
        maxWidth="md" 
        fullWidth
      >
        <DialogTitle>
          {dialogMode === 'view' && 'Inspection Details'}
          {dialogMode === 'edit' && 'Edit Inspection'}
          {dialogMode === 'delete' && 'Confirm Deletion'}
        </DialogTitle>
        <DialogContent dividers>
          {selectedInspection && dialogMode === 'delete' ? (
            <Box sx={{ py: 2 }}>
              <Typography variant="body1" gutterBottom>
                Are you sure you want to delete the following inspection?
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                <strong>Shop:</strong> {selectedInspection.shopName}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                <strong>Date:</strong> {selectedInspection.date}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                <strong>Reference ID:</strong> #{selectedInspection.id}
              </Typography>
              <Typography variant="body2" color="error" sx={{ mt: 2 }}>
                This action cannot be undone.
              </Typography>
            </Box>
          ) : selectedInspection && (dialogMode === 'view' || dialogMode === 'edit') ? (
            <Grid container spacing={2} sx={{ pt: 1 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Shop Name"
                  fullWidth
                  value={selectedInspection.shopName}
                  disabled={dialogMode === 'view'}
                  margin="dense"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Date"
                  fullWidth
                  value={selectedInspection.date}
                  disabled={dialogMode === 'view'}
                  margin="dense"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="GN Division"
                  fullWidth
                  value={selectedInspection.gnDivision}
                  disabled={dialogMode === 'view'}
                  margin="dense"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth margin="dense">
                  <InputLabel id="ranking-label">Ranking</InputLabel>
                  <Select
                    labelId="ranking-label"
                    value={selectedInspection.ranking}
                    label="Ranking"
                    disabled={dialogMode === 'view'}
                  >
                    <MenuItem value="A">A - Excellent</MenuItem>
                    <MenuItem value="B">B - Good</MenuItem>
                    <MenuItem value="C">C - Fair</MenuItem>
                    <MenuItem value="D">D - Poor</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Reference ID"
                  fullWidth
                  value={selectedInspection.id}
                  disabled
                  margin="dense"
                />
              </Grid>
              {dialogMode === 'view' && (
                <>
                  <Grid item xs={12}>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="h6" gutterBottom>
                      Additional Details
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Notes"
                      fullWidth
                      multiline
                      rows={4}
                      value="No additional notes for this inspection."
                      disabled
                      margin="dense"
                    />
                  </Grid>
                </>
              )}
            </Grid>
          ) : null}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>
            {dialogMode === 'delete' ? 'Cancel' : 'Close'}
          </Button>
          {dialogMode === 'edit' && (
            <Button variant="contained" color="primary">
              Save Changes
            </Button>
          )}
          {dialogMode === 'delete' && (
            <Button variant="contained" color="error" onClick={handleDeleteConfirm}>
              Delete
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default InspectionLog;
