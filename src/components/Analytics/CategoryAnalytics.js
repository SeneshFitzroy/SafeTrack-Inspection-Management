import React, { useState, useEffect } from 'react';
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
import StorefrontIcon from '@mui/icons-material/Storefront';
import { green, red, amber, blue, purple, grey } from '@mui/material/colors';
import { getAllInspections } from '../../services/inspectionService';
import { getShopByName } from '../../services/shopService';

const CategoryAnalytics = ({ month, year, monthName }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchInspections = async () => {
      try {
        const inspections = await getAllInspections();
        const categoryData = await inspections.reduce(async (accPromise, inspection) => {
          const acc = await accPromise;
          let category = inspection.category;

          if (!category) {
            try {
              const shopDetails = await getShopByName(inspection.shopName);
              category = shopDetails?.category || 'Other';
            } catch (error) {
              console.error(`Error fetching shop details for ${inspection.shopName}:`, error);
              category = 'Other';
            }
          }

          if (!acc[category]) {
            acc[category] = { count: 0, inspected: 0, passRate: 0, avgScore: 0 };
          }
          acc[category].count += 1;
          acc[category].inspected += inspection.status === 'Completed' ? 1 : 0;
          acc[category].passRate += inspection.overallRating === 'A' ? 1 : 0;
          acc[category].avgScore += inspection.score || 0;
          return acc;
        }, Promise.resolve({}));

        const formattedCategories = Object.entries(categoryData).map(([name, data]) => ({
          name,
          count: data.count,
          inspected: data.inspected,
          passRate: Math.round((data.passRate / data.count) * 100),
          avgScore: Math.round(data.avgScore / data.count),
          color: name === 'Food' ? red[500] : name === 'Groceries' ? green[500] : blue[500],
          icon: name === 'Food' ? <RestaurantIcon /> : name === 'Groceries' ? <LocalGroceryStoreIcon /> : <StorefrontIcon />,
          riskLevel: data.avgScore > 80 ? 'Low Risk' : data.avgScore > 60 ? 'Medium Risk' : data.avgScore > 40 ? 'High Risk' : 'Critical Risk'
        }));

        setCategories(formattedCategories);
      } catch (error) {
        console.error('Error fetching inspections:', error);
      }
    };

    fetchInspections();
  }, []);

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
                        category.avgScore > 80 ? 'Low Risk' :
                        category.avgScore > 60 ? 'Medium Risk' :
                        category.avgScore > 40 ? 'High Risk' : 'Critical Risk'
                      } 
                      size="small"
                      sx={{ 
                        bgcolor: 
                          category.avgScore > 80 ? green[100] :
                          category.avgScore > 60 ? blue[100] :
                          category.avgScore > 40 ? amber[100] : red[100],
                        color: 
                          category.avgScore > 80 ? green[800] :
                          category.avgScore > 60 ? blue[800] :
                          category.avgScore > 40 ? amber[800] : red[800],
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