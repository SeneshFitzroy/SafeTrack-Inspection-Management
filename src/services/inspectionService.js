import api from './api';

export const getAllInspections = async () => {
  try {
    const response = await api.get('/api/inspections');
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'An error occurred fetching inspections';
  }
};

export const getInspectionById = async (id) => {
  try {
    const response = await api.get(`/api/inspections/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'An error occurred fetching inspection details';
  }
};

export const createInspection = async (inspectionData) => {
  try {
    const response = await api.post('/api/inspections', inspectionData);
    return response.data;
  } catch (error) {
    console.error('Error creating inspection:', error.response?.data || error.message);
    throw error.response?.data?.message || 'An error occurred creating inspection';
  }
};

export const updateInspection = async (id, inspectionData) => {
  try {
    const response = await api.put(`/api/inspections/${id}`, inspectionData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'An error occurred updating inspection';
  }
};

export const deleteInspection = async (id) => {
  try {
    const response = await api.delete(`/api/inspections/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'An error occurred deleting inspection';
  }
};