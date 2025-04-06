import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
  Chip
} from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { green, red, amber, blue, purple, grey } from '@mui/material/colors';

const CategoryAnalytics = ({ month, year, monthName }) => {
  // Mock data for category distribution
  const [categories, setCategories] = useState([
    { 
      name: 'Food', 
      count: 45, 
      passRate: 78, 
      inspected: 38, 
      avgScore: 82,
      color: red[500],
      icon: <RestaurantIcon />
    },
    { 
      name: 'Groceries', 
      count: 32, 
      passRate: 84, 
      inspected: 30, 
      avgScore: 88,
      color: green[500],
      icon: <LocalGroceryStoreIcon />
    },
    { 
      name: 'Retail', 
      count: 28, 
      passRate: 90, 
      inspected: 25, 
      avgScore: 92,
      color: blue[500],
      icon: <ShoppingBagIcon />
    },
    { 
      name: 'Healthcare', 
      count: 12, 
      passRate: 95, 
      inspected: 10, 
      avgScore: 95,
      color: purple[500],
      icon: <HealthAndSafetyIcon />
    },
    { 
      name: 'Other', 
      count: 18, 
      passRate: 82, 
      inspected: 15, 
      avgScore: 85,
      color: grey[500],
      icon: <StorefrontIcon />
    }
  ]);

  return (
    <Box>
      {/* Categories Table - Full width */}
      <Paper sx={{ 
        p: { xs: 2, md: 2.5 }, 
        borderRadius: 2, 
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        height: '100%'
      }}>
        <Typography variant="h6" fontWeight="bold" color="primary.main" gutterBottom>
          Category Performance Summary
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Detailed information about shop categories and their inspection performance
        </Typography>
        
        <TableContainer sx={{ maxHeight: 'calc(100vh - 220px)' }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', bgcolor: 'primary.main', color: 'white' }}>Category</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold', bgcolor: 'primary.main', color: 'white' }}>Total Shops</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold', bgcolor: 'primary.main', color: 'white' }}>Inspected</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold', bgcolor: 'primary.main', color: 'white' }}>Pass Rate</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold', bgcolor: 'primary.main', color: 'white' }}>Avg. Score</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold', bgcolor: 'primary.main', color: 'white' }}>Risk Level</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((category) => (
                <TableRow 
                  key={category.name} 
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
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ 
                        mr: 1.5, 
                        p: 1, 
                        borderRadius: '50%', 
                        bgcolor: `${category.color}15`,
                        display: 'flex',
                        color: category.color
                      }}>
                        {category.icon}
                      </Box>
                      <Typography fontWeight="medium">{category.name}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <Typography fontWeight="medium">{category.count}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography>{category.inspected}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      ({Math.round(category.inspected / category.count * 100)}%)
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <LinearProgress 
                        variant="determinate" 
                        value={category.passRate} 
                        sx={{ 
                          height: 8, 
                          borderRadius: 2, 
                          width: '60%', 
                          mr: 1,
                          '& .MuiLinearProgress-bar': {
                            bgcolor: 
                              category.passRate > 90 ? green[500] :
                              category.passRate > 80 ? blue[500] :
                              category.passRate > 70 ? amber[500] : red[500]
                          }
                        }}
                      />
                      <Typography>{category.passRate}%</Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <Typography fontWeight="medium">
                      {category.avgScore}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Chip 
                      label={
                        category.avgScore > 90 ? 'Low Risk' :
                        category.avgScore > 80 ? 'Medium Risk' :
                        category.avgScore > 70 ? 'High Risk' : 'Critical Risk'
                      } 
                      size="small"
                      sx={{ 
                        bgcolor: 
                          category.avgScore > 90 ? green[100] :
                          category.avgScore > 80 ? blue[100] :
                          category.avgScore > 70 ? amber[100] : red[100],
                        color: 
                          category.avgScore > 90 ? green[800] :
                          category.avgScore > 80 ? blue[800] :
                          category.avgScore > 70 ? amber[800] : red[800],
                        fontWeight: 'bold',
                        minWidth: 100
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default CategoryAnalytics;
