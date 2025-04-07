import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  Button, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Fab,
  Chip,
  Tooltip,
  CircularProgress,
  Alert,
  Snackbar
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AssignmentIcon from '@mui/icons-material/Assignment';
import StorefrontIcon from '@mui/icons-material/Storefront';
import BarChartIcon from '@mui/icons-material/BarChart';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Header from '../common/Header';
import Sidebar from '../common/Sidebar';
import './Calendar.css';
import * as calendarService from '../../services/calendarService';

// Renamed component from CalendarDashboard to Calendar
export const Calendar = () => {
  const theme = useTheme();
  const [activePage, setActivePage] = useState('Calendar');
  const navigate = useNavigate();
  
  // Calendar state
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState([]);
  const [taskDialogOpen, setTaskDialogOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    location: '',
    time: '',
    status: 'pending',
    date: new Date()
  });
  
  // Add loading and error states for API calls
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  // Day names - using Monday as first day of week
  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  // Month names
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Fetch tasks from API
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const data = await calendarService.getAllTask();
      // Convert dates from strings to Date objects
      const formattedTasks = data.map(task => ({
        ...task,
        date: new Date(task.date)
      }));
      setTasks(formattedTasks);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch tasks:', err);
      setError('Failed to fetch tasks. Please try again.');
      setSnackbar({
        open: true,
        message: 'Failed to fetch tasks. Please try again.',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  // Load tasks when component mounts
  useEffect(() => {
    fetchTasks();
  }, []);

  // Navigation functions
  const handleNavClick = (pageName) => {
    setActivePage(pageName);
    
    switch(pageName) {
      case 'Dashboard':
        navigate('/dashboard');
        break;
      case 'Calendar':
        navigate('/calendar');
        break;
      case 'Inspection Log':
        navigate('/inspection-log');
        break;
      case 'Shop Management':
        navigate('/shop-management');
        break;
      case 'Analytics':
        navigate('/analytics');
        break;
      case 'Profile':
        navigate('/profile');
        break;
      case 'Settings':
        navigate('/settings');
        break;
      default:
        navigate('/dashboard');
        break;
    }
  };

  // Status indicators for calendar
  const statusColors = {
    pending: theme.palette.warning.main,
    completed: theme.palette.success.main,
    overdue: theme.palette.error.main
  };

  // Helper functions for date operations
  const formatDate = (date, formatStr) => {
    const options = { month: 'long', year: 'numeric' };
    if (formatStr === 'MMMM yyyy') {
      return date.toLocaleDateString('en-US', options);
    } else if (formatStr === 'd') {
      return date.getDate();
    } else if (formatStr === 'MMMM d, yyyy') {
      return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    } else if (formatStr === 'MMM d, yyyy') {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
    return date.toLocaleDateString();
  };

  const formatDateToISO = (date) => {
    if (!(date instanceof Date)) return '';
    
    // Format in YYYY-MM-DD
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  };

  // Improved function to calculate days in a month and correctly align with weekdays
  const calculateCalendarDays = (year, month) => {
    // Get number of days in current month
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // Get day of week for first day (0 = Sunday, 1 = Monday, etc.)
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    
    // Convert to Monday-first format (0 = Monday, 6 = Sunday)
    const startingDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
    
    const days = [];
    
    // Add previous month's days to fill first row (these will be empty)
    for (let i = 0; i < startingDay; i++) {
      days.push({
        day: null,
        isCurrentMonth: false,
        isOutsideMonth: true,
        date: new Date(year, month, -startingDay + i + 1)
      });
    }
    
    // Add current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      days.push({
        day: day,
        isCurrentMonth: true,
        isOutsideMonth: false,
        date: new Date(year, month, day)
      });
    }
    
    // Calculate remaining days to make complete weeks
    // We want to show full weeks, but not extra empty weeks
    const totalCellsUsed = days.length;
    const remainingCells = 7 - (totalCellsUsed % 7);
    
    // Only add next month's days if needed to complete the last week
    if (remainingCells < 7) {
      for (let i = 1; i <= remainingCells; i++) {
        days.push({
          day: i,
          isCurrentMonth: false,
          isOutsideMonth: true,
          date: new Date(year, month + 1, i)
        });
      }
    }
    
    return days;
  };

  // Regenerate calendar days when month changes
  useEffect(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const days = calculateCalendarDays(year, month);
    setCalendarDays(days);
  }, [currentMonth]);

  // ISO standard week number calculation
  const getWeekNumber = (date) => {
    const target = new Date(date);
    target.setHours(0, 0, 0, 0);
    target.setDate(target.getDate() + 3 - ((target.getDay() + 6) % 7));
    const firstWeek = new Date(target.getFullYear(), 0, 4);
    return 1 + Math.round(((target - firstWeek) / 86400000 - 3 + ((firstWeek.getDay() + 6) % 7)) / 7);
  };

  // Organize days into weeks for better layout control
  const organizeIntoWeeks = (days) => {
    const weeks = [];
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7));
    }
    return weeks;
  };

  // Calendar navigation and rendering
  const prevMonth = () => {
    const prevMonthDate = new Date(currentMonth);
    prevMonthDate.setMonth(prevMonthDate.getMonth() - 1);
    setCurrentMonth(prevMonthDate);
  };

  const nextMonth = () => {
    const nextMonthDate = new Date(currentMonth);
    nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);
    setCurrentMonth(nextMonthDate);
  };

  const onDateClick = (date) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  // Task management - Updated to use API
  const handleOpenTaskDialog = (date) => {
    setNewTask({ 
      title: '',
      location: '',
      time: '',
      status: 'pending',
      date: date 
    });
    setTaskDialogOpen(true);
  };

  const handleCloseTaskDialog = () => {
    setTaskDialogOpen(false);
  };

  const handleTaskInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleDateChange = (newDate) => {
    setNewTask({ ...newTask, date: newDate });
  };

  const handleAddTask = async () => {
    setLoading(true);
    try {
      // Format the date properly before sending to API
      const formattedTaskData = {
        ...newTask,
        date: newTask.date instanceof Date ? newTask.date.toISOString() : newTask.date
      };
      
      const response = await calendarService.createTask(formattedTaskData);
      
      // Add the new task to the state with the correct date format
      const addedTask = {
        ...response,
        date: new Date(response.date)
      };
      
      setTasks([...tasks, addedTask]);
      setTaskDialogOpen(false);
      setNewTask({
        title: '',
        location: '',
        time: '',
        status: 'pending',
        date: new Date()
      });
      
      setSnackbar({
        open: true,
        message: 'Task added successfully!',
        severity: 'success'
      });
    } catch (err) {
      console.error('Failed to add task:', err);
      setSnackbar({
        open: true,
        message: 'Failed to add task. Please try again.',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  // Check if two dates are the same day
  const isSameDay = (date1, date2) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };
  
  // Get tasks for a specific date
  const getTasksForDate = (date) => {
    return tasks.filter(task => isSameDay(new Date(task.date), date));
  };

  // Add a function to handle task selection from the upcoming tasks list
  const handleTaskSelection = (task) => {
    // Set the selected date to the task's date to highlight the corresponding day
    setSelectedDate(new Date(task.date));
    
    // Also ensure the calendar shows the month containing this task
    setCurrentMonth(new Date(
      task.date.getFullYear(),
      task.date.getMonth(),
      1
    ));
  };

  // Add function to update task status - Updated to use API
  const updateTaskStatus = async (taskId, newStatus) => {
    setLoading(true);
    try {
      const taskToUpdate = tasks.find(task => task._id === taskId);
      if (!taskToUpdate) {
        throw new Error('Task not found');
      }
      
      const updatedTask = await calendarService.updateTask(taskId, {
        ...taskToUpdate,
        status: newStatus
      });
      
      // Update the task in the state
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task._id === taskId 
            ? { ...task, status: newStatus } 
            : task
        )
      );
      
      setSnackbar({
        open: true,
        message: 'Task status updated successfully!',
        severity: 'success'
      });
    } catch (err) {
      console.error('Failed to update task status:', err);
      setSnackbar({
        open: true,
        message: 'Failed to update task status. Please try again.',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  // Add function to delete a task - Updated to use API
  const deleteTask = async (taskId) => {
    setLoading(true);
    try {
      await calendarService.deleteTask(taskId);
      
      // Remove the task from the state
      setTasks(prevTasks => prevTasks.filter(task => task._id !== taskId));
      
      setSnackbar({
        open: true,
        message: 'Task deleted successfully!',
        severity: 'success'
      });
    } catch (err) {
      console.error('Failed to delete task:', err);
      setSnackbar({
        open: true,
        message: 'Failed to delete task. Please try again.',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  // Enhanced function to get upcoming tasks with more options
  const getUpcomingTasks = (days = 7) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to start of day
    
    const endDate = new Date(today);
    endDate.setDate(today.getDate() + days);
    
    return tasks
      .filter(task => {
        const taskDate = new Date(task.date);
        taskDate.setHours(0, 0, 0, 0); // Reset time for proper comparison
        return taskDate >= today && taskDate <= endDate;
      })
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  // Function to check if a date has tasks
  const hasTasksOnDate = (date) => {
    return getTasksForDate(date).length > 0;
  };

  // Function to get the status color for a day based on its tasks
  const getDayStatusColor = (date) => {
    const dayTasks = getTasksForDate(date);
    if (dayTasks.length === 0) return null;
    
    // Priority: overdue > pending > completed
    if (dayTasks.some(task => task.status === 'overdue')) return statusColors.overdue;
    if (dayTasks.some(task => task.status === 'pending')) return statusColors.pending;
    return statusColors.completed;
  };

  // Handle snackbar close
  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Add visual indicators to the calendar based on task status
  const getTaskIndicator = (date) => {
    const statusColor = getDayStatusColor(date);
    if (!statusColor) return null;
    
    return (
      <Box
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: statusColor,
          boxShadow: `0 0 4px ${statusColor}`
        }}
      />
    );
  };

  // Function to handle quick task creation from calendar
  const handleQuickAddTask = (date, event) => {
    // Prevent the click from bubbling to the day cell
    event.stopPropagation();
    
    // Open the task dialog with the date pre-filled
    setNewTask({
      ...newTask,
      date: date,
      // Default the time to current time rounded to nearest hour
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    });
    setTaskDialogOpen(true);
  };

  // Styled components
  const StyledCalendarDay = styled(Box)(({ theme, isSelected, hasTask, status, isCurrentMonth }) => ({
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    aspectRatio: '1/1',
    padding: theme.spacing(1),
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: 8,
    position: 'relative',
    backgroundColor: isSelected 
      ? 'rgba(84, 121, 255, 0.08)' 
      : isCurrentMonth 
        ? 'transparent' 
        : 'rgba(0, 0, 0, 0.02)',
    boxShadow: isSelected ? '0 0 0 2px rgba(84, 121, 255, 0.6)' : 'none',
    opacity: isCurrentMonth ? 1 : 0.6,
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: isCurrentMonth ? 'rgba(84, 121, 255, 0.04)' : 'rgba(0, 0, 0, 0.04)',
      opacity: 1,
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
    }
  }));

  // Navigation items
  const navItems = [
    { icon: <DashboardIcon />, title: 'Dashboard', id: 'Dashboard' },
    { icon: <CalendarMonthIcon />, title: 'Calendar', id: 'Calendar' },
    { icon: <AssignmentIcon />, title: 'Inspection Log', id: 'Inspection Log' },
    { icon: <StorefrontIcon />, title: 'Shop Management', id: 'Shop Management' },
    { icon: <BarChartIcon />, title: 'Analytics', id: 'Analytics' },
    { icon: <PersonIcon />, title: 'Profile', id: 'Profile' },
    { icon: <SettingsIcon />, title: 'Settings', id: 'Settings' },
  ];

  // Nav item component
  const NavItem = ({ icon, title, isActive, onClick }) => {
    return (
      <Box
        onClick={onClick}
        sx={{
          display: 'flex',
          alignItems: 'center',
          px: 3,
          py: 1.5,
          cursor: 'pointer',
          bgcolor: isActive ? 'primary.main' : 'transparent',
          color: isActive ? 'white' : 'text.primary',
          '&:hover': {
            bgcolor: isActive ? 'primary.main' : 'rgba(0, 0, 0, 0.04)',
          },
          borderRadius: 1,
          mx: 1,
          mb: 0.5,
        }}
      >
        <Box sx={{ mr: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 28, height: 28 }}>
          {icon}
        </Box>
        <Typography sx={{ fontWeight: isActive ? 600 : 400 }}>{title}</Typography>
      </Box>
    );
  };

  // Updated CalendarGrid component to better integrate with upcoming tasks
  const CalendarGrid = () => {
    const weeks = organizeIntoWeeks(calendarDays);
    const upcomingTaskDates = getUpcomingTasks().map(task => 
      new Date(task.date).toDateString()
    );
    
    return (
      <Paper 
        elevation={0} 
        className="calendar-container"
        sx={{ 
          mb: 4, 
          borderRadius: 3,
          overflow: 'hidden',
        }}
      >
        {/* Calendar Header */}
        <Box className="calendar-header">
          <Typography variant="h6" fontWeight={600} className="month-label">
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Tooltip title="Previous month">
              <IconButton onClick={prevMonth} sx={{ color: 'white', mr: 1 }}>
                <KeyboardArrowLeftIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Next month">
              <IconButton onClick={nextMonth} sx={{ color: 'white' }}>
                <KeyboardArrowRightIcon />
              </IconButton>
            </Tooltip>
            <Button 
              variant="outlined"
              className="today-button"
              sx={{ 
                color: 'white', 
                borderColor: 'white',
                '&:hover': {
                  borderColor: 'white',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
              onClick={() => {
                setCurrentMonth(new Date());
                setSelectedDate(new Date());
              }}
            >
              Today
            </Button>
          </Box>
        </Box>
        
        {/* Calendar Grid */}
        <Box className="calendar-grid">
          {/* Days of week header - perfectly aligned with grid below */}
          <Box className="days-header-row">
            {dayNames.map((day, index) => (
              <Typography 
                key={index}
                variant="subtitle2" 
                className="day-name"
                sx={{ 
                  color: day === 'Sun' ? 'error.main' : 'text.primary',
                }}
              >
                {day}
              </Typography>
            ))}
          </Box>
          
          {/* Calendar weeks with perfect alignment */}
          <Box className="days-grid-container" sx={{ position: 'relative', pl: { xs: 0, md: 5 } }}>
            {weeks.map((week, weekIndex) => {
              // Get week number for the week
              const validDateInWeek = week.find(day => day.isCurrentMonth)?.date || week[0].date;
              const weekNumber = getWeekNumber(validDateInWeek);
              
              return (
                <Box key={weekIndex} position="relative">
                  {/* Week number indicator */}
                  <Tooltip title={`Week ${weekNumber}`} placement="left">
                    <Box className="week-number" sx={{ display: { xs: 'none', md: 'flex' } }}>
                      {weekNumber}
                    </Box>
                  </Tooltip>
                  
                  {/* Days row with perfect grid alignment */}
                  <Box className="calendar-week-row">
                    {week.map((dayInfo, dayIndex) => {
                      const day = dayInfo.day;
                      const date = dayInfo.date;
                      const isCurrentMonth = dayInfo.isCurrentMonth;
                      const isOutsideMonth = dayInfo.isOutsideMonth;
                      const dayTasks = getTasksForDate(date);
                      const hasTask = dayTasks.length > 0;
                      const isSelected = isSameDay(date, selectedDate);
                      const isToday = isSameDay(date, new Date());
                      const isInUpcoming = upcomingTaskDates.includes(date.toDateString());
                      
                      return (
                        <Box 
                          key={dayIndex}
                          className={`calendar-day ${!isCurrentMonth ? 'empty' : ''} ${isSelected ? 'selected' : ''} ${isOutsideMonth ? 'outside-month' : ''} ${isInUpcoming ? 'upcoming-task' : ''}`}
                          onClick={() => isCurrentMonth && onDateClick(date)}
                          sx={{
                            cursor: isCurrentMonth ? 'pointer' : 'default',
                            // Highlight days with upcoming tasks
                            ...(isInUpcoming && isCurrentMonth && !isSelected && !isToday ? {
                              borderColor: theme.palette.primary.light,
                            } : {})
                          }}
                        >
                          {day && (
                            <>
                              <Box className={`day-number ${isToday ? 'today' : ''}`}>
                                {day}
                                {hasTask && getTaskIndicator(date)}
                              </Box>
                              
                              {isCurrentMonth && (
                                <Box sx={{ 
                                  width: '100%', 
                                  display: 'flex', 
                                  flexDirection: 'column', 
                                  alignItems: 'center' 
                                }}>
                                  {/* Display tasks for the day */}
                                  {hasTask && (
                                    <Box sx={{ width: '100%' }}>
                                      {dayTasks.slice(0, 2).map((task, taskIndex) => (
                                        <Box
                                          key={taskIndex}
                                          className="task-chip"
                                          sx={{ 
                                            backgroundColor: `${statusColors[task.status]}20`,
                                            color: statusColors[task.status],
                                            border: `1px solid ${statusColors[task.status]}30`,
                                          }}
                                        >
                                          {task.title}
                                        </Box>
                                      ))}
                                      
                                      {dayTasks.length > 2 && (
                                        <Typography 
                                          variant="caption" 
                                          color="text.secondary" 
                                          className="more-tasks"
                                        >
                                          +{dayTasks.length - 2} more
                                        </Typography>
                                      )}
                                    </Box>
                                  )}
                                  
                                  {/* Add quick task button */}
                                  {isCurrentMonth && !hasTask && (
                                    <IconButton 
                                      size="small" 
                                      onClick={(e) => handleQuickAddTask(date, e)}
                                      sx={{ 
                                        opacity: 0,
                                        transition: 'opacity 0.2s',
                                        mt: 'auto',
                                        width: 28,
                                        height: 28,
                                        '.calendar-day:hover &': {
                                          opacity: 0.7,
                                        },
                                        '&:hover': {
                                          opacity: 1,
                                          backgroundColor: 'rgba(25, 118, 210, 0.08)'
                                        }
                                      }}
                                    >
                                      <AddIcon fontSize="small" />
                                    </IconButton>
                                  )}
                                </Box>
                              )}
                            </>
                          )}
                        </Box>
                      );
                    })}
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Paper>
    );
  };

  // Enhanced TaskDetails component for better integration with API
  const TaskDetails = () => {
    const selectedDateTasks = getTasksForDate(selectedDate);
    const upcomingTasks = getUpcomingTasks();
    
    // Function to get the next task date
    const getNextTaskDate = () => {
      if (upcomingTasks.length === 0) return null;
      
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const nextTask = upcomingTasks.find(task => {
        const taskDate = new Date(task.date);
        taskDate.setHours(0, 0, 0, 0);
        return taskDate >= today;
      });
      
      return nextTask ? nextTask.date : null;
    };
    
    // Function to jump to the next task date
    const jumpToNextTask = () => {
      const nextDate = getNextTaskDate();
      if (nextDate) {
        setSelectedDate(new Date(nextDate));
        setCurrentMonth(new Date(nextDate.getFullYear(), nextDate.getMonth(), 1));
      }
    };

    return (
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Tasks for Selected Date */}
        <Grid item xs={12} md={6}>
          <Paper 
            elevation={0} 
            sx={{ 
              borderRadius: 3,
              overflow: 'hidden',
              height: '100%',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
            }}
          >
            <Box 
              sx={{ 
                p: 3, 
                bgcolor: 'primary.main', 
                color: 'white',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="h6" fontWeight={600}>
                  Tasks for {formatDate(selectedDate, 'MMMM d, yyyy')}
                </Typography>
                {selectedDateTasks.length > 0 && (
                  <Chip 
                    label={selectedDateTasks.length}
                    size="small"
                    sx={{ ml: 1, backgroundColor: 'rgba(255, 255, 255, 0.2)', color: 'white' }}
                  />
                )}
              </Box>
              <Fab 
                size="small" 
                color="secondary" 
                aria-label="add"
                onClick={() => handleOpenTaskDialog(selectedDate)}
              >
                <AddIcon />
              </Fab>
            </Box>
            
            <Box sx={{ p: 3, minHeight: 300, maxHeight: 400, overflow: 'auto' }}>
              {loading && selectedDateTasks.length === 0 ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', minHeight: 200 }}>
                  <CircularProgress />
                </Box>
              ) : selectedDateTasks.length > 0 ? (
                selectedDateTasks.map((task, index) => (
                  <Box 
                    key={index} 
                    sx={{ 
                      mb: 2, 
                      p: 2, 
                      borderRadius: 2,
                      border: '1px solid',
                      borderColor: 'divider',
                      backgroundColor: `${statusColors[task.status]}10`,
                      position: 'relative'
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="h6">{task.title}</Typography>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Tooltip title="Change status">
                          <Chip 
                            label={task.status.toUpperCase()} 
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              const nextStatus = {
                                'pending': 'completed',
                                'completed': 'overdue',
                                'overdue': 'pending'
                              }[task.status];
                              updateTaskStatus(task._id, nextStatus);
                            }}
                            sx={{ 
                              backgroundColor: `${statusColors[task.status]}20`,
                              color: statusColors[task.status],
                              cursor: 'pointer',
                              '&:hover': {
                                backgroundColor: `${statusColors[task.status]}30`,
                              }
                            }}
                          />
                        </Tooltip>
                      </Box>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      <strong>Location:</strong> {task.location}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Time:</strong> {task.time}
                    </Typography>
                    <IconButton
                      size="small"
                      sx={{ 
                        position: 'absolute', 
                        right: 8, 
                        bottom: 8,
                        color: 'text.secondary',
                        '&:hover': {
                          color: 'error.main'
                        }
                      }}
                      onClick={() => deleteTask(task._id)}
                    >
                      <Tooltip title="Delete task">
                        <Box component="span" sx={{ display: 'flex', alignItems: 'center' }}>
                          <Box component="svg" width="18" height="18" viewBox="0 0 24 24">
                            <path 
                              fill="currentColor" 
                              d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
                            />
                          </Box>
                        </Box>
                      </Tooltip>
                    </IconButton>
                  </Box>
                ))
              ) : (
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column',
                  alignItems: 'center', 
                  justifyContent: 'center',
                  height: '100%',
                  minHeight: 200,
                  textAlign: 'center',
                  color: 'text.secondary'
                }}>
                  <CalendarMonthIcon sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }} />
                  <Typography variant="body1" sx={{ mb: 1 }}>No tasks for this day</Typography>
                  <Typography variant="body2">
                    Click the + button to add a new task for {formatDate(selectedDate, 'MMMM d, yyyy')}
                  </Typography>
                </Box>
              )}
            </Box>
          </Paper>
        </Grid>
        
        {/* Upcoming Tasks (Next 7 Days) - Enhanced with interaction */}
        <Grid item xs={12} md={6}>
          <Paper 
            elevation={0} 
            sx={{ 
              borderRadius: 3,
              overflow: 'hidden',
              height: '100%',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
            }}
          >
            <Box sx={{ 
              p: 3, 
              bgcolor: 'primary.main', 
              color: 'white',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center' 
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="h6" fontWeight={600}>
                  Upcoming Tasks
                </Typography>
                {upcomingTasks.length > 0 && (
                  <Chip 
                    label={upcomingTasks.length}
                    size="small"
                    sx={{ ml: 1, backgroundColor: 'rgba(255, 255, 255, 0.2)', color: 'white' }}
                  />
                )}
              </Box>
              {getNextTaskDate() && (
                <Tooltip title="Jump to next task">
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={jumpToNextTask}
                    sx={{ 
                      color: 'white', 
                      borderColor: 'white',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        borderColor: 'white'
                      }
                    }}
                  >
                    Next Task
                  </Button>
                </Tooltip>
              )}
            </Box>
            <TableContainer component={Box} sx={{ p: 2, maxHeight: 400, overflow: 'auto' }}>
              {loading && upcomingTasks.length === 0 ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 250 }}>
                  <CircularProgress />
                </Box>
              ) : upcomingTasks.length > 0 ? (
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Time</TableCell>
                      <TableCell>Task</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {upcomingTasks.map((task, index) => (
                      <TableRow 
                        key={index}
                        hover
                        onClick={() => handleTaskSelection(task)}
                        sx={{ 
                          cursor: 'pointer',
                          '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.04)'
                          },
                          ...(isSameDay(new Date(task.date), selectedDate) ? {
                            backgroundColor: 'rgba(84, 121, 255, 0.08) !important'
                          } : {})
                        }}
                      >
                        <TableCell>
                          <Box sx={{ 
                            fontWeight: isSameDay(new Date(task.date), new Date()) ? 700 : 400,
                            color: isSameDay(new Date(task.date), new Date()) ? 'primary.main' : 'inherit'
                          }}>
                            {formatDate(new Date(task.date), 'MMM d, yyyy')}
                          </Box>
                        </TableCell>
                        <TableCell>{task.time}</TableCell>
                        <TableCell sx={{ maxWidth: 150, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {task.title}
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={task.status.charAt(0).toUpperCase() + task.status.slice(1)} 
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              const nextStatus = {
                                'pending': 'completed',
                                'completed': 'overdue',
                                'overdue': 'pending'
                              }[task.status];
                              updateTaskStatus(task._id, nextStatus);
                            }}
                            sx={{ 
                              backgroundColor: `${statusColors[task.status]}20`,
                              color: statusColors[task.status],
                              cursor: 'pointer',
                              '&:hover': {
                                backgroundColor: `${statusColors[task.status]}30`,
                              }
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column',
                  alignItems: 'center', 
                  justifyContent: 'center',
                  height: 250,
                  textAlign: 'center',
                  color: 'text.secondary'
                }}>
                  <CalendarMonthIcon sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }} />
                  <Typography variant="body1" sx={{ mb: 1 }}>No upcoming tasks</Typography>
                  <Typography variant="body2">
                    Tasks for the next 7 days will appear here
                  </Typography>
                </Box>
              )}
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    );
  };

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
        {/* Use the shared Header component */}
        <Header pageTitle="Calendar" />
        
        {/* Calendar Content */}
        <Box sx={{ p: 4, flexGrow: 1 }}>
          {/* Status indicators */}
          <Box sx={{ display: 'flex', gap: 3, mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ 
                width: 12, 
                height: 12, 
                borderRadius: '50%', 
                bgcolor: statusColors.pending, 
                mr: 1 
              }} />
              <Typography>Pending</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ 
                width: 12, 
                height: 12, 
                borderRadius: '50%', 
                bgcolor: statusColors.completed, 
                mr: 1 
              }} />
              <Typography>Completed</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ 
                width: 12, 
                height: 12, 
                borderRadius: '50%', 
                bgcolor: statusColors.overdue, 
                mr: 1 
              }} />
              <Typography>Overdue</Typography>
            </Box>
          </Box>
          
          {/* Calendar Component */}
          <CalendarGrid />
          
          {/* Task Details */}
          <TaskDetails />
        </Box>
      </Box>
      
      {/* Add Task Dialog */}
      <Dialog open={taskDialogOpen} onClose={handleCloseTaskDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Task</DialogTitle>
        <DialogContent>
          <Box sx={{ p: 1 }}>
            <TextField
              fullWidth
              label="Task Title"
              name="title"
              value={newTask.title}
              onChange={handleTaskInputChange}
              margin="normal"
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Location"
              name="location"
              value={newTask.location}
              onChange={handleTaskInputChange}
              margin="normal"
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Time"
              name="time"
              value={newTask.time}
              onChange={handleTaskInputChange}
              margin="normal"
              variant="outlined"
              placeholder="e.g. 10:00 AM"
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Status</InputLabel>
              <Select
                name="status"
                value={newTask.status}
                onChange={handleTaskInputChange}
                label="Status"
              >
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
                <MenuItem value="overdue">Overdue</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Date"
              type="date"
              value={formatDateToISO(newTask.date)}
              onChange={(e) => handleDateChange(new Date(e.target.value))}
              margin="normal"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseTaskDialog}>Cancel</Button>
          <Button 
            onClick={handleAddTask} 
            variant="contained" 
            color="primary"
            disabled={!newTask.title || !newTask.location || !newTask.time || loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Add Task'}
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Calendar;
