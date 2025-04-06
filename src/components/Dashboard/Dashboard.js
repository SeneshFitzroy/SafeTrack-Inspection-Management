import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Card, 
  CardContent, 
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  Button,
  IconButton,
  Tooltip,
  Badge,
  Stack,
  Chip,
  LinearProgress,
  CardHeader,
  useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import WarningIcon from '@mui/icons-material/Warning';
import StoreIcon from '@mui/icons-material/Store';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  ArcElement,
  Tooltip as ChartTooltip, 
  Legend,
  Title 
} from 'chart.js';
import { Line, Pie } from 'react-chartjs-2';

import Header from '../common/Header';
import Sidebar from '../common/Sidebar';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  ChartTooltip,
  Legend
);

const Dashboard = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  // Optimize spacing for better layout
  const SPACING = {
    xs: 1.5, // Increased from 1
    md: 2    // Increased from 1.5
  };

  // Dashboard data for metrics
  const dashboardData = {
    totalShops: 248,
    totalInspections: 1520,
    pendingInspections: 12,
    highRiskShops: 18,
    rankings: {
      A: 65,
      B: 22,
      C: 10,
      D: 3
    },
    recentInspections: [
      { id: 13245, date: '2024-10-28', shopName: 'Family Pharmacy', inspector: 'Michael Brown', ranking: 'A', status: 'No violations found', location: 'Biyagama' },
      { id: 13244, date: '2024-10-25', shopName: 'Tech Haven Electronics', inspector: 'Jane Smith', ranking: 'C', status: 'Minor violations', location: 'Kelaniya' },
      { id: 13243, date: '2024-10-22', shopName: 'Tasty Delights Restaurant', inspector: 'John Doe', ranking: 'B', status: 'Good standing', location: 'Kaduwela' },
      { id: 13242, date: '2024-10-20', shopName: 'Fresh Market Grocery', inspector: 'Emily Wilson', ranking: 'A', status: 'Excellent compliance', location: 'Kolonnawa' },
      { id: 13241, date: '2024-10-18', shopName: 'Central Pharmacy', inspector: 'Robert Chen', ranking: 'B', status: 'Minor issues resolved', location: 'Biyagama' },
    ],
    upcomingInspections: [
      { id: 13246, date: '2024-11-02', shopName: 'Green Garden Groceries', inspector: 'Jane Smith', time: '10:00 AM', type: 'Regular', location: 'Kelaniya' },
      { id: 13247, date: '2024-11-05', shopName: 'Super Electronics', inspector: 'Michael Brown', time: '2:30 PM', type: 'Follow-up', location: 'Biyagama' },
      { id: 13248, date: '2024-11-08', shopName: 'Coffee Corner', inspector: 'John Doe', time: '9:00 AM', type: 'Regular', location: 'Kaduwela' },
      { id: 13249, date: '2024-11-10', shopName: 'Sunshine Bakery', inspector: 'Emily Wilson', time: '11:30 AM', type: 'Complaint', location: 'Kolonnawa' },
      { id: 13250, date: '2024-11-12', shopName: 'Health First Pharmacy', inspector: 'Robert Chen', time: '1:00 PM', type: 'Regular', location: 'Biyagama' },
    ]
  };

  // More comprehensive data for a fuller dashboard
  const additionalData = {
    inspectionCompletion: 87,
    trendData: [42, 47, 53, 58, 63, 68, 65],
    shopsByDivision: [
      { division: 'Biyagama', count: 78 },
      { division: 'Kelaniya', count: 52 },
      { division: 'Kaduwela', count: 65 },
      { division: 'Kolonnawa', count: 53 }
    ],
    quickStats: [
      { label: 'Active Inspectors', value: 12, trend: '+2', color: theme.palette.primary.main },
      { label: 'Overdue Tasks', value: 8, trend: '-3', color: theme.palette.error.main },
      { label: 'This Week\'s Inspections', value: 23, trend: '+5', color: theme.palette.success.main }
    ]
  };

  // Common styles for metric box headings and values
  const metricTextStyles = {
    heading: {
      fontSize: { xs: '0.95rem', md: '1.05rem' },
      fontWeight: 500,
      lineHeight: 1.3
    },
    value: {
      fontSize: { xs: '1.9rem', md: '2.1rem' },
      fontWeight: 'bold',
      lineHeight: 1.2
    },
    trend: {
      fontSize: '0.8rem',
      display: 'flex',
      alignItems: 'center',
      opacity: 0.9
    }
  };

  // Line chart data - Daily inspection rate
  const lineChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Inspections',
        data: [5, 12, 8, 15, 10, 6, 9],
        fill: false,
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
        tension: 0.3
      }
    ]
  };

  // Enhanced line chart with weekly comparison data
  const enhancedLineChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'This Week',
        data: [5, 12, 8, 15, 10, 6, 9],
        borderColor: theme.palette.primary.main,
        backgroundColor: theme.palette.primary.main,
        tension: 0.3
      },
      {
        label: 'Last Week',
        data: additionalData.trendData,
        borderColor: theme.palette.grey[400],
        backgroundColor: theme.palette.grey[400],
        borderDash: [5, 5],
        tension: 0.3
      }
    ]
  };

  // Enhanced line chart options with tooltips
  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          drawBorder: false,
          color: theme.palette.divider
        },
        ticks: {
          font: {
            size: 11
          }
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 11
          }
        }
      }
    },
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
        labels: {
          boxWidth: 12,
          usePointStyle: true,
          font: {
            size: 11
          }
        }
      },
      title: {
        display: true,
        text: 'Daily Inspection Rate',
        font: {
          size: 14,
          weight: 'bold'
        },
        padding: {
          bottom: 15
        }
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: theme.palette.text.primary,
        bodyColor: theme.palette.text.secondary,
        borderColor: theme.palette.divider,
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
        usePointStyle: true,
        callbacks: {
          title: (tooltipItems) => {
            return `${tooltipItems[0].label} Inspections`;
          },
          label: (context) => {
            return `Count: ${context.raw} inspections`;
          }
        }
      }
    }
  };

  // Pie chart data - Risk level distribution
  const pieChartData = {
    labels: ['A - Excellent', 'B - Good', 'C - Fair', 'D - Poor'],
    datasets: [
      {
        data: [
          dashboardData.rankings.A,
          dashboardData.rankings.B,
          dashboardData.rankings.C,
          dashboardData.rankings.D
        ],
        backgroundColor: [
          theme.palette.success.light,
          theme.palette.warning.light,
          theme.palette.warning.main,
          theme.palette.error.main
        ],
        borderColor: [
          theme.palette.success.main,
          theme.palette.warning.main,
          theme.palette.warning.dark,
          theme.palette.error.dark
        ],
        borderWidth: 1
      }
    ]
  };

  // Enhanced pie chart options with better tooltips
  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          boxWidth: 12,
          padding: 15,
          usePointStyle: true,
          font: {
            size: 11
          }
        }
      },
      title: {
        display: true,
        text: 'Risk Level Distribution',
        font: {
          size: 14,
          weight: 'bold'
        },
        padding: {
          bottom: 10
        }
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: theme.palette.text.primary,
        bodyColor: theme.palette.text.secondary,
        borderColor: theme.palette.divider,
        borderWidth: 1,
        padding: 12,
        callbacks: {
          label: (context) => {
            const value = context.raw;
            const total = context.dataset.data.reduce((acc, val) => acc + val, 0);
            const percentage = ((value * 100) / total).toFixed(1);
            return `${context.label}: ${percentage}% (${value})`;
          }
        }
      }
    },
    cutout: '60%'
  };

  // Function to determine ranking color
  const getRankingColor = (ranking) => {
    switch (ranking) {
      case 'A': return theme.palette.success.main;
      case 'B': return theme.palette.warning.light;
      case 'C': return theme.palette.warning.main;
      case 'D': return theme.palette.error.main;
      default: return theme.palette.text.secondary;
    }
  };

  // Helper function for inspection type colors
  const getInspectionTypeColor = (type) => {
    switch (type) {
      case 'Regular': return '#4caf50';
      case 'Follow-up': return '#ff9800';
      case 'Complaint': return '#f44336';
      default: return '#2196f3';
    }
  };

  // Enhanced card styles with more refined aesthetics and consistent spacing
  const cardStyles = {
    elevation: 0,
    borderRadius: 2,
    height: '100%',
    border: `1px solid ${theme.palette.divider}`,
    transition: 'all 0.2s ease',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 8px 20px rgba(0,0,0,0.08)'
    },
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column'
  };

  // Colorful metric card styles
  const metricCardStyles = {
    ...cardStyles,
    border: 'none',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
  };

  // Common button styles for consistency
  const primaryButtonStyles = {
    fontWeight: 500,
    textTransform: 'none',
    borderRadius: 2,
    boxShadow: 'none',
    py: 1,
    '&:hover': {
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
    }
  };

  // Common header styles
  const cardHeaderStyles = {
    p: 2,
    borderBottom: `1px solid ${theme.palette.divider}`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', bgcolor: '#F5F8FF' }}>
      <Sidebar />
      
      <Box sx={{ 
        flex: 1, 
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <Header pageTitle="Dashboard" />
        
        {/* Dashboard Content - Better spacing */}
        <Box sx={{ 
          p: { xs: SPACING.xs, md: SPACING.md }, 
          pb: { xs: 3, md: 4 }, // Add bottom padding
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: { xs: 2, md: 3 }, // Increased gap between sections
          maxWidth: '1920px', // Set a max width that works for large screens
          mx: 'auto', 
          width: '100%',
          boxSizing: 'border-box' // Ensure padding is included in width calculation
        }}>
          {/* Top Metrics Cards - Better spacing */}
          <Grid container spacing={{ xs: 2, md: 3 }}>
            {/* Total Shops */}
            <Grid item xs={6} sm={6} md={3}>
              <Card sx={{ 
                ...metricCardStyles,
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                color: 'white',
                minHeight: { xs: 165, md: 185 },
              }}>
                <CardContent sx={{ 
                  p: { xs: 2.5, md: 3 }, // Increased padding 
                  pb: { xs: '16px !important', md: '20px !important' },
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <StoreIcon sx={{ mr: 1, fontSize: 22 }} /> {/* Smaller icon */}
                    <Typography variant="subtitle1" sx={metricTextStyles.heading}>Total Shops</Typography>
                  </Box>
                  <Typography variant="h3" sx={{...metricTextStyles.value, my: 1 }}>{dashboardData.totalShops}</Typography>
                  <Typography variant="body2" sx={metricTextStyles.trend}> 
                    <TrendingUpIcon fontSize="small" sx={{ mr: 0.5, fontSize: '0.9rem' }} />
                    12% increase from last month
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            {/* Total Inspections */}
            <Grid item xs={6} sm={6} md={3}>
              <Card sx={{ 
                ...metricCardStyles,
                background: `linear-gradient(135deg, ${theme.palette.success.main}, ${theme.palette.success.dark})`,
                color: 'white',
                minHeight: { xs: 165, md: 185 },
              }}>
                <CardContent sx={{ 
                  p: { xs: 2.5, md: 3 }, // Increased padding 
                  pb: { xs: '16px !important', md: '20px !important' },
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <AssignmentTurnedInIcon sx={{ mr: 1, fontSize: 22 }} /> {/* Smaller icon */}
                    <Typography variant="subtitle1" sx={metricTextStyles.heading}>Inspections</Typography>
                  </Box>
                  <Typography variant="h3" sx={{...metricTextStyles.value, my: 1 }}>{dashboardData.totalInspections}</Typography>
                  <Typography variant="body2" sx={metricTextStyles.trend}> 
                    <TrendingUpIcon fontSize="small" sx={{ mr: 0.5, fontSize: '0.9rem' }} />
                    8% increase from last month
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            {/* Pending Inspections */}
            <Grid item xs={6} sm={6} md={3}>
              <Card sx={{ 
                ...metricCardStyles,
                background: `linear-gradient(135deg, ${theme.palette.warning.main}, ${theme.palette.warning.dark})`,
                color: 'white',
                minHeight: { xs: 165, md: 185 },
              }}>
                <CardContent sx={{ 
                  p: { xs: 2.5, md: 3 }, // Increased padding 
                  pb: { xs: '16px !important', md: '20px !important' },
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <CalendarTodayIcon sx={{ mr: 1, fontSize: 22 }} /> {/* Smaller icon */}
                    <Typography variant="subtitle1" sx={metricTextStyles.heading}>Pending</Typography>
                  </Box>
                  <Typography variant="h3" sx={{...metricTextStyles.value, my: 1 }}>{dashboardData.pendingInspections}</Typography>
                  <Button 
                    variant="contained" 
                    size="small" 
                    sx={{ 
                      ...primaryButtonStyles,
                      px: 2,
                      py: 0.6, // Smaller button
                      fontSize: '0.75rem',
                      backgroundColor: 'rgba(255, 255, 255, 0.15)',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.25)',
                      }
                    }}
                    onClick={() => navigate('/calendar')}
                  >
                    View Calendar
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            
            {/* High Risk Shops */}
            <Grid item xs={6} sm={6} md={3}>
              <Card sx={{ 
                ...metricCardStyles,
                background: `linear-gradient(135deg, ${theme.palette.error.main}, ${theme.palette.error.dark})`,
                color: 'white',
                minHeight: { xs: 165, md: 185 },
              }}>
                <CardContent sx={{ 
                  p: { xs: 2.5, md: 3 }, // Increased padding 
                  pb: { xs: '16px !important', md: '20px !important' },
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Badge 
                      badgeContent={dashboardData.highRiskShops} 
                      color="error"
                      sx={{ 
                        '& .MuiBadge-badge': { 
                          bgcolor: 'white', 
                          color: theme.palette.error.main,
                          fontWeight: 'bold',
                          fontSize: '0.75rem',
                          minWidth: 22,
                          height: 22
                        } 
                      }}
                    >
                      <WarningIcon sx={{ mr: 1, fontSize: 22 }} /> {/* Smaller icon */}
                    </Badge>
                    <Typography variant="subtitle1" sx={metricTextStyles.heading}>High Risk</Typography>
                  </Box>
                  <Typography variant="h3" sx={{...metricTextStyles.value, my: 1 }}>{dashboardData.highRiskShops}</Typography>
                  <Button 
                    variant="contained" 
                    size="small" 
                    sx={{ 
                      ...primaryButtonStyles,
                      px: 2,
                      py: 0.6, // Smaller button
                      fontSize: '0.75rem',
                      backgroundColor: 'rgba(255, 255, 255, 0.15)',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.25)',
                      }
                    }}
                    onClick={() => navigate('/inspection-log')}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          
          {/* Charts Section - Better spacing */}
          <Grid container spacing={{ xs: 2, md: 3 }}>
            {/* Daily Inspection Rate */}
            <Grid item xs={12}>
              <Card sx={{ 
                ...cardStyles,
                mb: { xs: 1, md: 1.5 } // Add margin bottom
              }}>
                <CardHeader 
                  title="Daily Inspection Rate" 
                  titleTypographyProps={{ variant: 'h6', fontWeight: 'bold' }}
                  action={
                    <Tooltip title="Compare with previous week">
                      <IconButton size="small">
                        <MoreVertIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  }
                  sx={{ p: { xs: 2, md: 2.5 }, pb: { xs: 1.5, md: 2 } }} // Increased padding
                />
                <Divider />
                <Box sx={{ 
                  p: { xs: 2, md: 2.5 }, // Increased padding
                  height: { xs: 210, sm: 230, md: 250 } // Slightly taller
                }}>
                  <Line data={enhancedLineChartData} options={{
                    ...lineChartOptions,
                    maintainAspectRatio: true,
                    aspectRatio: 2.5 // Better aspect ratio
                  }} />
                </Box>
              </Card>
            </Grid>

            {/* Bottom charts row - Better spacing */}
            <Grid item xs={12} container spacing={{ xs: 2, md: 3 }}>
              {/* Completion Rate */}
              <Grid item xs={12} sm={4} md={3}>
                <Card sx={{ ...cardStyles, height: '100%' }}>
                  <Box sx={{ 
                    p: { xs: 2.5, md: 3 }, // Increased padding
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1.5 }}>
                      Completion Rate
                    </Typography>
                    
                    <Box sx={{ position: 'relative', mb: 1.5 }}>
                      <Box 
                        sx={{ 
                          width: { xs: 100, md: 120 }, // Smaller size
                          height: { xs: 100, md: 120 }, 
                          borderRadius: '50%', 
                          border: `8px solid ${theme.palette.divider}`,
                          borderTop: `8px solid ${theme.palette.primary.main}`,
                          transform: `rotate(${additionalData.inspectionCompletion * 3.6}deg)`,
                          transition: 'transform 1s ease-out'
                        }} 
                      />
                      <Typography 
                        variant="h4" // Smaller text
                        color="primary.main" 
                        fontWeight="bold"
                        sx={{ 
                          position: 'absolute', 
                          top: '50%', 
                          left: '50%', 
                          transform: 'translate(-50%, -50%)',
                          fontSize: { xs: '1.75rem', md: '2rem' }
                        }}
                      >
                        {additionalData.inspectionCompletion}%
                      </Typography>
                    </Box>
                    
                    <LinearProgress 
                      variant="determinate" 
                      value={additionalData.inspectionCompletion} 
                      sx={{ 
                        width: '85%',
                        height: 8, 
                        borderRadius: 4, 
                        bgcolor: 'rgba(0, 0, 0, 0.05)'
                      }} 
                    />
                  </Box>
                </Card>
              </Grid>
              
              {/* Risk Level Distribution */}
              <Grid item xs={12} sm={8} md={4}>
                <Card sx={{ ...cardStyles, height: '100%' }}>
                  <CardHeader 
                    title="Risk Level Distribution" 
                    titleTypographyProps={{ variant: 'subtitle1', fontWeight: 'bold' }}
                    action={
                      <Tooltip title="Analysis of shop risk levels">
                        <IconButton size="small">
                          <MoreVertIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    }
                    sx={{ p: { xs: 2, md: 2.5 }, pb: { xs: 1.5, md: 2 } }} // Increased padding
                  />
                  <Divider />
                  <Box sx={{ 
                    p: { xs: 2, md: 2.5 }, 
                    height: { xs: 200, sm: 220, md: 240 }, // Slightly taller
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Pie data={pieChartData} options={{
                      ...pieChartOptions,
                      maintainAspectRatio: true, // Better responsiveness
                      aspectRatio: 1.5, // Control aspect ratio for better fit
                      plugins: {
                        ...pieChartOptions.plugins,
                        title: {
                          ...pieChartOptions.plugins.title,
                          display: false
                        },
                        legend: {
                          ...pieChartOptions.plugins.legend,
                          position: 'right',
                          labels: {
                            ...pieChartOptions.plugins.legend.labels,
                            boxWidth: 10,
                            padding: 10,
                            font: {
                              size: 10
                            }
                          }
                        }
                      }
                    }} />
                  </Box>
                </Card>
              </Grid>
              
              {/* Shops by Division */}
              <Grid item xs={12} md={5}>
                <Card sx={{ ...cardStyles, height: '100%' }}>
                  <CardHeader 
                    title="Shops by Division" 
                    titleTypographyProps={{ variant: 'subtitle1', fontWeight: 'bold' }}
                    action={
                      <Tooltip title="Geographic distribution">
                        <IconButton size="small">
                          <Typography variant="body2" fontWeight="bold">{item.count}</Typography>
                        </Box>
                        <LinearProgress 
                          variant="determinate" 
                          value={(item.count / dashboardData.totalShops) * 100} 
                          sx={{ 
                            height: 8, // Shorter bars
                            borderRadius: 4,
                            bgcolor: '#f0f0f0',
                            '& .MuiLinearProgress-bar': {
                              bgcolor: index % 2 === 0 ? theme.palette.primary.main : theme.palette.secondary.main
                            }
                          }}
                        />
                      </Box>
                    ))}
                  </Box>
                </Card>
              </Grid>
            </Grid>
          </Grid>
          
          {/* Inspection Lists - Better spacing */}
          <Grid container spacing={{ xs: 2, md: 3 }}>
            {/* Recent Inspections */}
            <Grid item xs={12} md={6} sx={{ display: 'flex' }}>
              <Card sx={{ 
                ...cardStyles, 
                width: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <CardHeader 
                  title="Recent Inspections" 
                  titleTypographyProps={{ variant: 'subtitle1', fontWeight: 'bold' }}
                  action={
                    <Tooltip title="View all inspection records">
                      <Button 
                        size="small" 
                        color="primary" 
                        sx={{ textTransform: 'none' }}
                        onClick={() => navigate('/inspection-log')}
                      >
                        View All
                      </Button>
                    </Tooltip>
                  }
                  sx={{ 
                    p: { xs: 2.5, md: 3 }, // Increased padding
                    backgroundColor: 'rgba(25, 118, 210, 0.05)',
                    borderBottom: `1px solid ${theme.palette.divider}`
                  }}
                />
                <List sx={{ 
                  p: 0, 
                  overflow: 'auto', 
                  minHeight: { xs: 300, md: 350 }, // Taller list
                  maxHeight: { xs: 300, md: 350 }
                }}>
                  {dashboardData.recentInspections.map((inspection, index) => (
                    <React.Fragment key={inspection.id}>
                      <ListItem 
                        sx={{ 
                          py: 2, // Increased padding
                          px: { xs: 2.5, md: 3 },
                          transition: 'all 0.2s',
                          '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.03)'
                          }
                        }}
                        button
                        onClick={() => navigate(`/inspection-log/${inspection.id}`)}
                      >
                        <Box sx={{ display: 'flex', width: '100%', alignItems: 'flex-start' }}>
                          {/* Left side: Avatar and main info */}
                          <Box sx={{ display: 'flex', flex: 1, mr: 1.5 }}>
                            <Avatar 
                              sx={{ 
                                bgcolor: getRankingColor(inspection.ranking),
                                width: 40, // Smaller avatar
                                height: 40,
                                mr: 2,
                                fontSize: '1rem',
                                fontWeight: 'bold'
                              }}
                            >
                              {inspection.ranking}
                            </Avatar>
                            <Box>
                              <Typography variant="subtitle1" fontWeight="600" color="text.primary" sx={{ mb: 0.5 }}>
                                {inspection.shopName}
                              </Typography>
                              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                                {inspection.date} • {inspection.inspector}
                              </Typography>
                              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', fontWeight: 500 }}>
                                <span>{inspection.location}</span>
                              </Typography>
                            </Box>
                          </Box>
                          
                          {/* Right side: Status chip */}
                          <Chip 
                            label={inspection.status} 
                            size="small"
                            sx={{ 
                              mt: 0.5,
                              backgroundColor: `${getRankingColor(inspection.ranking)}15`,
                              color: getRankingColor(inspection.ranking),
                              borderRadius: 1,
                              height: 24,
                              fontSize: '0.75rem'
                            }}
                          />
                        </Box>
                      </ListItem>
                      {index < dashboardData.recentInspections.length - 1 && (
                        <Divider component="li" sx={{ mx: { xs: 2.5, md: 3 } }} />
                      )}
                    </React.Fragment>
                  ))}
                </List>
              </Card>
            </Grid>
            
            {/* Upcoming Inspections */}
            <Grid item xs={12} md={6} sx={{ display: 'flex' }}>
              <Card sx={{ 
                ...cardStyles, 
                width: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <Box sx={{ 
                  p: { xs: 2.5, md: 3 }, // Increased padding
                  bgcolor: theme.palette.primary.main,
                  color: 'white',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderTopLeftRadius: 2,
                  borderTopRightRadius: 2
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="subtitle1" fontWeight="bold">Upcoming Inspections</Typography>
                    <Badge 
                      badgeContent={dashboardData.upcomingInspections.length} 
                      color="error"
                      sx={{ 
                        ml: 1.5,
                        '& .MuiBadge-badge': {
                          fontSize: '0.75rem',
                          height: 20,
                          minWidth: 20,
                          fontWeight: 'bold'
                        }
                      }}
                    />
                  </Box>
                  <Button 
                    variant="outlined" 
                    size="small"
                    sx={{ 
                      color: 'white', 
                      borderColor: 'rgba(255,255,255,0.5)',
                      textTransform: 'none',
                      px: 1.5,
                      '&:hover': { borderColor: 'white', backgroundColor: 'rgba(255,255,255,0.1)' }
                    }}
                    onClick={() => navigate('/calendar')}
                  >
                    Calendar
                  </Button>
                </Box>
                <List sx={{ 
                  p: 0, 
                  overflow: 'auto', 
                  minHeight: { xs: 300, md: 350 }, // Taller list to match recent inspections
                  maxHeight: { xs: 300, md: 350 }
                }}>
                  {dashboardData.upcomingInspections.map((inspection, index) => (
                    <React.Fragment key={inspection.id}>
                      <ListItem 
                        sx={{ 
                          py: 2, // Increased padding
                          px: { xs: 2.5, md: 3 },
                          transition: 'all 0.2s',
                          '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.03)'
                          }
                        }}
                        button
                        onClick={() => navigate('/calendar')}
                      >
                        <Box sx={{ display: 'flex', width: '100%', alignItems: 'center' }}>
                          {/* Calendar icon with date indicator - Smaller size */}
                          <Box 
                            sx={{ 
                              width: 46, 
                              height: 52, 
                              mr: 2,
                              border: `1px solid ${theme.palette.primary.main}`,
                              borderRadius: 1.5,
                              overflow: 'hidden',
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                              boxShadow: '0 2px 6px rgba(0,0,0,0.08)'
                            }}
                          >
                            <Box sx={{ 
                              width: '100%', 
                              bgcolor: theme.palette.primary.main, 
                              color: 'white',
                              fontSize: '0.7rem',
                              textAlign: 'center',
                              fontWeight: 'bold',
                              py: 0.3
                            }}>
                              {new Date(inspection.date).toLocaleString('default', { month: 'short' })}
                            </Box>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', lineHeight: 1.5 }}>
                              {new Date(inspection.date).getDate()}
                            </Typography>
                          </Box>
                          
                          {/* Main inspection info - Improved layout */}
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="subtitle1" fontWeight="600" color="text.primary" sx={{ mb: 0.5 }}>
                              {inspection.shopName}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                              <Chip 
                                label={inspection.time} 
                                size="small"
                                sx={{ 
                                  mr: 1, 
                                  backgroundColor: theme.palette.primary.light, 
                                  color: 'white',
                                  height: 22,
                                  fontSize: '0.7rem',
                                  fontWeight: 500
                                }}
                              />
                              <Typography variant="body2" color="text.secondary">
                                {inspection.inspector} • {inspection.location}
                              </Typography>
                            </Box>
                          </Box>
                          
                          {/* Inspection type indicator */}
                          <Chip 
                            label={inspection.type} 
                            size="small"
                            sx={{ 
                              backgroundColor: getInspectionTypeColor(inspection.type),
                              color: 'white',
                              ml: 1,
                              borderRadius: 1,
                              fontWeight: 500,
                              height: 24,
                              fontSize: '0.75rem'
                            }}
                          />
                        </Box>
                      </ListItem>
                      {index < dashboardData.upcomingInspections.length - 1 && (
                        <Divider component="li" sx={{ mx: { xs: 2.5, md: 3 } }} />
                      )}
                    </React.Fragment>
                  ))}
                </List>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
