import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
  IconButton
} from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import StorefrontIcon from '@mui/icons-material/Storefront';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import ScheduleIcon from '@mui/icons-material/Schedule';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { red, orange, yellow, green } from '@mui/material/colors';
import { getAllInspections } from '../../services/inspectionService';

const HighRiskShops = ({ month, year, monthName }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  
  const [highRiskShops, setHighRiskShops] = useState([]);
  const [filteredShops, setFilteredShops] = useState(highRiskShops);

  useEffect(() => {
    const fetchInspections = async () => {
      try {
        const inspections = await getAllInspections();
        setHighRiskShops(inspections);
      } catch (error) {
        console.error('Error fetching inspections:', error);
      }
    };

    fetchInspections();
  }, []);

  useEffect(() => {
    let result = [...highRiskShops];
    
    if (searchQuery) {
      const lowercaseQuery = searchQuery.toLowerCase();
      result = result.filter(shop => 
        shop.name.toLowerCase().includes(lowercaseQuery) ||
        shop.owner?.toLowerCase().includes(lowercaseQuery) ||
        shop.region.toLowerCase().includes(lowercaseQuery) ||
        shop.id.includes(lowercaseQuery)
      );
    }
    
    if (priorityFilter !== 'All') {
      result = result.filter(shop => shop.priority === priorityFilter);
    }
    
    if (categoryFilter !== 'All') {
      result = result.filter(shop => shop.category === categoryFilter);
    }

    result = result.filter(shop => shop.overallRating === 'D');
    
    setFilteredShops(result);
    setPage(0);
  }, [highRiskShops, searchQuery, priorityFilter, categoryFilter]);

  const getPriorityChipColor = (priority) => {
    switch(priority) {
      case 'Critical': return { bgcolor: red[50], color: red[700], borderColor: red[200] };
      case 'High': return { bgcolor: orange[50], color: orange[700], borderColor: orange[200] };
      case 'Medium': return { bgcolor: yellow[50], color: yellow[800], borderColor: yellow[200] };
      default: return { bgcolor: green[50], color: green[700], borderColor: green[200] };
    }
  };

  const getRiskLevelColor = (level) => {
    switch(level) {
      case 'D': return red[600];
      case 'C': return orange[600];
      case 'B': return yellow[700];
      case 'A': return green[600];
      default: return 'text.secondary';
    }
  };

  const getCategoryIcon = (category) => {
    if (!category) {
      return <StorefrontIcon fontSize="small" />; // Default icon if category is undefined
    }

    switch (category.toLowerCase()) {
      case 'food':
        return <RestaurantIcon fontSize="small" />;
      case 'groceries':
        return <LocalGroceryStoreIcon fontSize="small" />;
      default:
        return <StorefrontIcon fontSize="small" />;
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  const handlePriorityFilterChange = (event) => {
    setPriorityFilter(event.target.value);
  };

  const handleCategoryFilterChange = (event) => {
    setCategoryFilter(event.target.value);
  };

  const resetFilters = () => {
    setSearchQuery('');
    setPriorityFilter('All');
    setCategoryFilter('All');
  };

  const categories = ['All', ...new Set(highRiskShops.map(shop => shop.category))];
  const priorities = ['All', 'Critical', 'High', 'Medium', 'Low'];

  return (
    <Box>
      <Paper 
        sx={{ 
          p: { xs: 2, md: 2.5 }, // Reduced padding 
          borderRadius: 2, 
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)', 
          height: '100%',
          overflow: 'hidden'
        }}
      >
        {/* Filter section - more compact */}
        <Box 
          sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: 1.5, // Reduced gap
            mb: 2, // Reduced bottom margin
            p: 1.5, // Reduced padding
            bgcolor: 'rgba(0, 0, 0, 0.02)', 
            borderRadius: 1,
            alignItems: 'center'
          }}
        >
          <TextField
            placeholder="Search shops..."
            size="small"
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{ flexGrow: 1, minWidth: 180 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="primary" fontSize="small" />
                </InputAdornment>
              ),
              endAdornment: searchQuery && (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={clearSearch}>
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          
          <FormControl size="small" sx={{ minWidth: 130 }}>
            <InputLabel>Priority</InputLabel>
            <Select
              value={priorityFilter}
              label="Priority"
              onChange={handlePriorityFilterChange}
            >
              {priorities.map(priority => (
                <MenuItem key={priority} value={priority}>
                  {priority}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <FormControl size="small" sx={{ minWidth: 130 }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={categoryFilter}
              label="Category"
              onChange={handleCategoryFilterChange}
            >
              {categories.map(category => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          {(searchQuery || priorityFilter !== 'All' || categoryFilter !== 'All') && (
            <Button 
              variant="outlined" 
              size="small" 
              onClick={resetFilters}
              startIcon={<ClearIcon />}
            >
              Clear
            </Button>
          )}
          
          <Typography variant="body2" sx={{ ml: 'auto', color: 'text.secondary', fontWeight: 'medium' }}>
            {filteredShops.length} shops found
          </Typography>
        </Box>
        
        {/* Taller table container to fill more space */}
        <TableContainer sx={{ height: 'calc(100vh - 200px)', minHeight: 450 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', bgcolor: 'primary.main', color: 'white' }}>Inspection ID</TableCell>
                <TableCell sx={{ fontWeight: 'bold', bgcolor: 'primary.main', color: 'white' }}>Shop Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold', bgcolor: 'primary.main', color: 'white' }}>GN Division</TableCell>
                <TableCell sx={{ fontWeight: 'bold', bgcolor: 'primary.main', color: 'white' }}>Inspection Type</TableCell>
                <TableCell sx={{ fontWeight: 'bold', bgcolor: 'primary.main', color: 'white' }}>Overall Rating</TableCell>
                <TableCell sx={{ fontWeight: 'bold', bgcolor: 'primary.main', color: 'white' }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredShops.length > 0 ? (
                filteredShops
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((shop) => (
                    <TableRow 
                      key={shop.inspectionId} 
                      hover
                      sx={{ 
                        '&:hover': { 
                          cursor: 'pointer',
                          bgcolor: 'rgba(25, 118, 210, 0.08)'
                        },
                        '&:nth-of-type(odd)': {
                          backgroundColor: 'rgba(0, 0, 0, 0.02)',
                        }
                      }}
                    >
                      <TableCell>
                        <Typography fontWeight="medium">{shop.inspectionId.slice(0, 9)}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography fontWeight="medium">{shop.shopName}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{shop.GNDivision}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{shop.inspectionType}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography fontWeight="bold" color={getRiskLevelColor(shop.overallRating)}>
                          {shop.overallRating}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{shop.status}</Typography>
                      </TableCell>
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 5 }}>
                    <Typography variant="subtitle1" color="text.secondary">
                      No high-risk shops found with the current filters
                    </Typography>
                    {(searchQuery || priorityFilter !== 'All' || categoryFilter !== 'All') && (
                      <Button 
                        variant="text" 
                        color="primary" 
                        onClick={resetFilters}
                        sx={{ mt: 1 }}
                      >
                        Clear Filters
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        
        <TablePagination
          component="div"
          count={filteredShops.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[10, 25, 50]}
          sx={{ borderTop: 1, borderColor: 'divider', mt: 'auto' }}
        />
      </Paper>
    </Box>
  );
};

export default HighRiskShops;