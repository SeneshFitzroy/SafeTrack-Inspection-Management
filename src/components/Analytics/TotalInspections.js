import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack
} from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { getAllInspections } from '../../services/inspectionService'; // Import the API function

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const TotalInspections = ({ month: initialMonth, year: initialYear, monthName: initialMonthName }) => {
  // Local state for dropdowns
  const [month, setMonth] = useState(initialMonth);
  const [year, setYear] = useState(initialYear);
  
  // Define months array
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Get current month name from local state
  const monthName = months[month];

  // Get current year for making range of years
  const currentYear = new Date().getFullYear();
  const years = [currentYear - 2, currentYear - 1, currentYear, currentYear + 1];

  useEffect(() => {
    // Update local state when props change
    setMonth(initialMonth);
    setYear(initialYear);
  }, [initialMonth, initialYear]);

  // Generate days for the selected month
  const getDaysInMonth = (month, year) => {
    const days = new Date(year, month + 1, 0).getDate();
    return Array.from({ length: days }, (_, i) => i + 1);
  };

  const days = getDaysInMonth(month, year);

  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    const fetchInspectionData = async () => {
      try {
        const inspections = await getAllInspections();
        const daysInMonth = getDaysInMonth(month, year);
        const dailyCounts = Array(daysInMonth.length).fill(0);

        inspections.forEach((inspection) => {
          const inspectionDate = new Date(inspection.inspectionDate);
          if (
            inspectionDate.getMonth() === month &&
            inspectionDate.getFullYear() === year
          ) {
            const day = inspectionDate.getDate();
            dailyCounts[day - 1] += 1;
          }
        });

        setDailyData(dailyCounts);
      } catch (error) {
        console.error('Error fetching inspection data:', error);
      }
    };

    fetchInspectionData();
  }, [month, year]);
  
  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const barData = {
    labels: days,
    datasets: [
      {
        label: 'Daily Inspections',
        data: dailyData,
        backgroundColor: 'rgba(54, 162, 235, 0.7)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        borderRadius: 4,
        barThickness: 'flex',
        maxBarThickness: 25
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false // Hide the legend for cleaner look
      },
      title: {
        display: true,
        text: `Daily Inspections in ${monthName} ${year}`,
        font: {
          size: 22,
          weight: 'bold'
        },
        padding: {
          top: 20,
          bottom: 30
        },
        color: '#1976d2'
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          title: (tooltipItems) => {
            return `${monthName} ${tooltipItems[0].label}, ${year}`;
          },
          label: (context) => {
            return `Inspections: ${context.raw}`;
          }
        },
        padding: 12,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        bodyFont: {
          size: 14
        },
        titleFont: {
          size: 16,
          weight: 'bold'
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: true,
          drawBorder: true,
          color: 'rgba(0, 0, 0, 0.05)'
        },
        ticks: {
          callback: function(value) {
            return value;
          },
          font: {
            size: 12
          }
        },
        title: {
          display: true,
          text: 'Number of Inspections',
          font: {
            size: 16,
            weight: 'bold'
          },
          color: '#666'
        }
      },
      x: {
        grid: {
          display: false,
          drawBorder: true
        },
        title: {
          display: true,
          text: 'Day of Month',
          font: {
            size: 16,
            weight: 'bold'
          },
          padding: {
            top: 15
          },
          color: '#666'
        },
        ticks: {
          maxRotation: 0,
          autoSkip: true,
          maxTicksLimit: 15,
          font: {
            size: 12
          }
        }
      }
    },
    animation: {
      duration: 1000,
      easing: 'easeOutQuart'
    }
  };

  return (
    <Box>
      {/* Main Content Area - Single full-width chart with filters */}
      <Paper sx={{ 
        p: { xs: 2, sm: 3, md: 4 }, 
        borderRadius: 2, 
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        bgcolor: '#fff'
      }}>
        {/* Filter controls positioned above the chart */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'flex-end',
          gap: 2,
          mb: 3
        }}>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Month</InputLabel>
            <Select
              value={month}
              label="Month"
              onChange={handleMonthChange}
            >
              {months.map((name, index) => (
                <MenuItem key={name} value={index}>{name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <FormControl size="small" sx={{ minWidth: 100 }}>
            <InputLabel>Year</InputLabel>
            <Select
              value={year}
              label="Year"
              onChange={handleYearChange}
            >
              {years.map((yearValue) => (
                <MenuItem key={yearValue} value={yearValue}>{yearValue}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ 
          height: { xs: 350, sm: 450, md: 550 },
          width: '100%'
        }}>
          <Bar options={barOptions} data={barData} />
        </Box>
      </Paper>
    </Box>
  );
};

export default TotalInspections;