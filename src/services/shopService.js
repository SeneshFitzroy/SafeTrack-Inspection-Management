import api from './api';

export const getAllShops = async () => {
  try {
    const response = await api.get('/api/shops');
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'An error occurred fetching shops';
  }
};

export const getShopById = async (id) => {
  try {
    const response = await api.get(`/api/shops/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'An error occurred fetching shop details';
  }
};

export const createShop = async (shopData) => {
  try {
    const response = await api.post('/api/shops', shopData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'An error occurred creating shop';
  }
};

export const updateShop = async (id, shopData) => {
  try {
    const response = await api.put(`/api/shops/${id}`, shopData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'An error occurred updating shop';
  }
};

export const deleteShop = async (id) => {
  try {
    const response = await api.delete(`/api/shops/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'An error occurred deleting shop';
  }
};

export const updateShopOwnership = async () => {
  try {
    const response = await api.post('/api/shops/update-ownership');
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'An error occurred updating shop ownership';
  }
};