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

  // Create more realistic looking data with a pattern and some randomness
  const generateDailyData = () => {
    const pattern = [14, 16, 12, 18, 20, 10, 8]; // Weekly pattern (Mon-Sun)
    return days.map((day, index) => {
      const baseValue = pattern[index % 7];
      const randomVariation = Math.floor(Math.random() * 8) - 3; // Random variation between -3 and +4
      return Math.max(baseValue + randomVariation, 5); // Ensure at least 5 inspections
    });
  };

  const [dailyData, setDailyData] = useState(generateDailyData());

  useEffect(() => {
    // Regenerate data when month/year changes
    setDailyData(generateDailyData());
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
