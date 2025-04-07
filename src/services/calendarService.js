import api from './api';

export const getAllTask = async () => {
  try {
    const response = await api.get('/api/tasks');
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error.response?.data?.message || 'An error occurred fetching tasks';
  }
};

export const getTaskById = async (id) => {
  try {
    const response = await api.get(`/api/tasks/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching task details:', error);
    throw error.response?.data?.message || 'An error occurred fetching task details';
  }
};

export const createTask = async (taskData) => {
  try {
    const response = await api.post('/api/tasks', taskData);
    return response.data;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error.response?.data?.message || 'An error occurred creating task';
  }
};

export const updateTask = async (id, taskData) => {
  try {
    const response = await api.put(`/api/tasks/${id}`, taskData);
    return response.data;
  } catch (error) {
    console.error('Error updating task:', error);
    throw error.response?.data?.message || 'An error occurred updating task';
  }
};

export const deleteTask = async (id) => {
  try {
    const response = await api.delete(`/api/tasks/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error.response?.data?.message || 'An error occurred deleting task';
  }
};