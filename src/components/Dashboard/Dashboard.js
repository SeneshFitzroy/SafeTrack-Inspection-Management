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

  // Optimize spacing for denser layout
  const SPACING = {
    xs: 1,
    md: 1.5
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
      { id: 13245, date: '2024-10-28', shopName: 'Family Pharmacy', inspector: 'Michael Brown', ranking: 'A' },
      { id: 13244, date: '2024-10-25', shopName: 'Tech Haven Electronics', inspector: 'Jane Smith', ranking: 'C' },
      { id: 13243, date: '2024-10-22', shopName: 'Tasty Delights Restaurant', inspector: 'John Doe', ranking: 'B' },
    ],
    upcomingInspections: [
      { id: 13246, date: '2024-11-02', shopName: 'Green Garden Groceries', inspector: 'Jane Smith', time: '10:00 AM' },
      { id: 13247, date: '2024-11-05', shopName: 'Super Electronics', inspector: 'Michael Brown', time: '2:30 PM' },
      { id: 13248, date: '2024-11-08', shopName: 'Coffee Corner', inspector: 'John Doe', time: '9:00 AM' },
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
      {/* Sidebar component (now with logo) is consistently used across all pages */}
      <Sidebar />
      
      <Box sx={{ 
        flex: 1, 
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <Header pageTitle="Dashboard" />
        
        <Box sx={{ 
          p: { xs: SPACING.xs, md: SPACING.md }, 
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: { xs: SPACING.xs, md: SPACING.md }
        }}>
          {/* Top Metrics Cards - Consistent grid spacing */}
          <Grid container spacing={{ xs: SPACING.xs, md: SPACING.md }}>
            {/* Total Shops */}
            <Grid item xs={6} sm={6} md={3}>
              <Card sx={{ 
                ...metricCardStyles,
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                color: 'white'
              }}>
                <CardContent sx={{ 
                  p: { xs: 1.5, md: 2 }, 
                  pb: { xs: '12px !important', md: '16px !important' },
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <StoreIcon sx={{ mr: 1, fontSize: 20 }} />
                    <Typography variant="subtitle2" fontWeight={500}>Total Shops</Typography>
                  </Box>
                  <Typography variant="h4" fontWeight="bold" sx={{ mb: 0.5 }}>{dashboardData.totalShops}</Typography>
                  <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', opacity: 0.9, mt: 'auto' }}>
                    <TrendingUpIcon fontSize="inherit" sx={{ mr: 0.5 }} />
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
                color: 'white'
              }}>
                <CardContent sx={{ 
                  p: { xs: 1.5, md: 2 }, 
                  pb: { xs: '12px !important', md: '16px !important' },
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <AssignmentTurnedInIcon sx={{ mr: 1, fontSize: 20 }} />
                    <Typography variant="subtitle2" fontWeight={500}>Inspections</Typography>
                  </Box>
                  <Typography variant="h4" fontWeight="bold" sx={{ mb: 0.5 }}>{dashboardData.totalInspections}</Typography>
                  <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', opacity: 0.9, mt: 'auto' }}>
                    <TrendingUpIcon fontSize="inherit" sx={{ mr: 0.5 }} />
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
                color: 'white'
              }}>
                <CardContent sx={{ 
                  p: { xs: 1.5, md: 2 }, 
                  pb: { xs: '12px !important', md: '16px !important' },
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <CalendarTodayIcon sx={{ mr: 1, fontSize: 20 }} />
                    <Typography variant="subtitle2" fontWeight={500}>Pending</Typography>
                  </Box>
                  <Typography variant="h4" fontWeight="bold" sx={{ mb: 0.5 }}>{dashboardData.pendingInspections}</Typography>
                  <Button 
                    variant="contained" 
                    size="small" 
                    sx={{ 
                      ...primaryButtonStyles,
                      px: 1,
                      py: 0.5,
                      fontSize: '0.75rem',
                      backgroundColor: 'rgba(255, 255, 255, 0.15)',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.25)',
                      },
                      mt: 'auto'
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
                color: 'white'
              }}>
                <CardContent sx={{ 
                  p: { xs: 1.5, md: 2 }, 
                  pb: { xs: '12px !important', md: '16px !important' },
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Badge 
                      badgeContent={dashboardData.highRiskShops} 
                      color="error"
                      sx={{ 
                        '& .MuiBadge-badge': { 
                          bgcolor: 'white', 
                          color: theme.palette.error.main,
                          fontWeight: 'bold'
                        } 
                      }}
                    >
                      <WarningIcon sx={{ mr: 1, fontSize: 20 }} />
                    </Badge>
                    <Typography variant="subtitle2" fontWeight={500}>High Risk</Typography>
                  </Box>
                  <Typography variant="h4" fontWeight="bold" sx={{ mb: 0.5 }}>{dashboardData.highRiskShops}</Typography>
                  <Button 
                    variant="contained" 
                    size="small" 
                    sx={{ 
                      ...primaryButtonStyles,
                      px: 1,
                      py: 0.5,
                      fontSize: '0.75rem',
                      backgroundColor: 'rgba(255, 255, 255, 0.15)',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.25)',
                      },
                      mt: 'auto'
                    }}
                    onClick={() => navigate('/inspection-log')}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          
          {/* Main Content Area - Improved layout with compact spacing */}
          <Grid container spacing={{ xs: SPACING.xs, md: SPACING.md }}>
            {/* Daily Inspection Rate - Full width chart */}
            <Grid item xs={12}>
              <Card sx={{ ...cardStyles }}>
                <CardHeader 
                  title="Daily Inspection Rate" 
                  titleTypographyProps={{ variant: 'subtitle1', fontWeight: 'bold' }}
                  action={
                    <Tooltip title="Compare with previous week">
                      <IconButton size="small">
                        <MoreVertIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  }
                  sx={{ p: { xs: 1.5, md: 2 }, pb: { xs: 1, md: 1 } }}
                />
                <Divider />
                <Box sx={{ p: { xs: 1.5, md: 2 }, height: { xs: 200, sm: 220 } }}>
                  <Line data={enhancedLineChartData} options={lineChartOptions} />
                </Box>
              </Card>
            </Grid>

            {/* Left section - Charts and visualizations */}
            <Grid item xs={12} lg={7}>
              <Grid container spacing={{ xs: SPACING.xs, md: SPACING.md }}>
                {/* Compact Inspection Completion - Simplified */}
                <Grid item xs={12} sm={4}>
                  <Card sx={{ ...cardStyles, height: '100%' }}>
                    <Box sx={{ 
                      p: 2,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
                        Completion Rate
                      </Typography>
                      
                      <Box sx={{ position: 'relative', mb: 1 }}>
                        <Box 
                          sx={{ 
                            width: 90, 
                            height: 90, 
                            borderRadius: '50%', 
                            border: `8px solid ${theme.palette.divider}`,
                            borderTop: `8px solid ${theme.palette.primary.main}`,
                            transform: `rotate(${additionalData.inspectionCompletion * 3.6}deg)`,
                            transition: 'transform 1s ease-out'
                          }} 
                        />
                        <Typography 
                          variant="h4" 
                          color="primary.main" 
                          fontWeight="bold"
                          sx={{ 
                            position: 'absolute', 
                            top: '50%', 
                            left: '50%', 
                            transform: 'translate(-50%, -50%)',
                            fontSize: { xs: '1.5rem', md: '1.75rem' }
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
                          height: 6, 
                          borderRadius: 3, 
                          bgcolor: 'rgba(0, 0, 0, 0.05)'
                        }} 
                      />
                    </Box>
                  </Card>
                </Grid>
                
                {/* Pie Chart - Risk Level Distribution */}
                <Grid item xs={12} sm={8}>
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
                      sx={{ p: { xs: 1.5, md: 2 }, pb: { xs: 1, md: 1 } }}
                    />
                    <Divider />
                    <Box sx={{ 
                      p: { xs: 1, md: 1.5 }, 
                      height: { xs: 160, sm: 160 },
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Pie data={pieChartData} options={{
                        ...pieChartOptions,
                        plugins: {
                          ...pieChartOptions.plugins,
                          title: {
                            ...pieChartOptions.plugins.title,
                            display: false
                          }
                        }
                      }} />
                    </Box>
                  </Card>
                </Grid>
                
                {/* Shops by Division */}
                <Grid item xs={12}>
                  <Card sx={{ ...cardStyles, height: '100%' }}>
                    <CardHeader 
                      title="Shops by Division" 
                      titleTypographyProps={{ variant: 'subtitle1', fontWeight: 'bold' }}
                      action={
                        <Tooltip title="Geographic distribution">
                          <IconButton size="small">
                            <MoreVertIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      }
                      sx={{ p: { xs: 1.5, md: 2 }, pb: { xs: 1, md: 1 } }}
                    />
                    <Divider />
                    <Box sx={{ 
                      p: { xs: 1.5, md: 2 },
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                      gap: 1.5
                    }}>
                      {additionalData.shopsByDivision.map((item, index) => (
                        <Box key={index}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                            <Typography variant="body2" fontWeight="medium">{item.division}</Typography>
                            <Typography variant="body2" fontWeight="bold">{item.count}</Typography>
                          </Box>
                          <LinearProgress 
                            variant="determinate" 
                            value={(item.count / dashboardData.totalShops) * 100} 
                            sx={{ 
                              height: 8, 
                              borderRadius: 5,
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
            
            {/* Right section - Task lists horizontally aligned on large screens */}
            <Grid item xs={12} lg={5}>
              <Grid container spacing={{ xs: SPACING.xs, md: SPACING.md }} sx={{ height: '100%' }}>
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
                        <Tooltip title="Latest inspection results">
                          <IconButton size="small">
                            <MoreVertIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      }
                      sx={{ p: { xs: 1.5, md: 2 }, pb: { xs: 1, md: 1 } }}
                    />
                    <Divider />
                    <List sx={{ 
                      p: 0, 
                      overflow: 'auto', 
                      flex: 1,
                      maxHeight: { xs: 250, md: '100%' }
                    }}>
                      {dashboardData.recentInspections.map((inspection, index) => (
                        <React.Fragment key={inspection.id}>
                          <ListItem sx={{ p: 1.25 }}>
                            <Avatar 
                              sx={{ 
                                bgcolor: getRankingColor(inspection.ranking),
                                width: 32,
                                height: 32,
                                mr: 1.5,
                                fontSize: '0.75rem'
                              }}
                            >
                              {inspection.ranking}
                            </Avatar>
                            <ListItemText
                              primary={inspection.shopName}
                              secondary={`${inspection.date} • ${inspection.inspector}`}
                              primaryTypographyProps={{ 
                                fontWeight: 'medium', 
                                variant: 'body2',
                                fontSize: '0.85rem',
                                noWrap: true
                              }}
                              secondaryTypographyProps={{
                                fontSize: '0.7rem',
                                noWrap: true
                              }}
                            />
                          </ListItem>
                          {index < dashboardData.recentInspections.length - 1 && <Divider />}
                        </React.Fragment>
                      ))}
                    </List>
                    <Divider />
                    <Box sx={{ p: 1.25 }}>
                      <Button 
                        fullWidth
                        variant="outlined"
                        size="small"
                        sx={{
                          ...primaryButtonStyles,
                          py: 0.5
                        }}
                        onClick={() => navigate('/inspection-log')}
                      >
                        View All
                      </Button>
                    </Box>
                  </Card>
                </Grid>
                
                {/* Upcoming Inspections - Horizontally aligned with Recent Inspections */}
                <Grid item xs={12} md={6} sx={{ display: 'flex' }}>
                  <Card sx={{ 
                    ...cardStyles, 
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                    <Box sx={{ 
                      p: { xs: 1.5, md: 1.75 }, 
                      bgcolor: theme.palette.primary.main,
                      color: 'white',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="subtitle1" fontWeight="bold">Upcoming</Typography>
                        <Badge 
                          badgeContent={dashboardData.upcomingInspections.length} 
                          color="secondary"
                          sx={{ ml: 1 }}
                        />
                      </Box>
                      <Tooltip title="Schedule inspection">
                        <IconButton size="small" sx={{ color: 'white' }}>
                          <MoreVertIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                    <List sx={{ 
                      p: 0, 
                      overflow: 'auto', 
                      flex: 1,
                      maxHeight: { xs: 250, md: '100%' }
                    }}>
                      {dashboardData.upcomingInspections.map((inspection, index) => (
                        <React.Fragment key={inspection.id}>
                          <ListItem sx={{ p: 1.25 }}>
                            <ListItemIcon sx={{ minWidth: 36 }}>
                              <CalendarTodayIcon color="primary" fontSize="small" />
                            </ListItemIcon>
                            <ListItemText
                              primary={
                                <Tooltip title={`Inspector: ${inspection.inspector}`}>
                                  <Typography variant="body2" fontWeight="medium" fontSize="0.85rem" noWrap>
                                    {inspection.shopName}
                                  </Typography>
                                </Tooltip>
                              }
                              secondary={
                                <Box component="span" sx={{ 
                                  display: 'flex', 
                                  alignItems: 'center', 
                                  flexWrap: 'nowrap', 
                                  gap: 0.5
                                }}>
                                  <Typography variant="caption" color="text.secondary" noWrap fontSize="0.7rem">
                                    {inspection.date}
                                  </Typography>
                                  <Chip 
                                    size="small" 
                                    label={inspection.time} 
                                    sx={{ 
                                      height: 20, 
                                      fontSize: '0.65rem', 
                                      bgcolor: 'primary.light', 
                                      color: 'white'
                                    }} 
                                  />
                                </Box>
                              }
                              secondaryTypographyProps={{
                                component: 'div'
                              }}
                            />
                          </ListItem>
                          {index < dashboardData.upcomingInspections.length - 1 && <Divider />}
                        </React.Fragment>
                      ))}
                    </List>
                    <Divider />
                    <Box sx={{ p: 1.25 }}>
                      <Button 
                        fullWidth
                        variant="contained"
                        color="primary"
                        size="small"
                        sx={{
                          ...primaryButtonStyles,
                          py: 0.5
                        }}
                        onClick={() => navigate('/calendar')}
                      >
                        Calendar
                      </Button>
                    </Box>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
