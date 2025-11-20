import axios from 'axios';

// Base URL can be either:
// Option 1: Full path including /api/nrr
// Option 2: Just the domain (then we add /api/nrr in each call)
const BASE_DOMAIN = import.meta.env.VITE_API_BASE_URL || 'https://cricheros-backend.urvish.website';
const API_BASE_URL = import.meta.env.VITE_API_URL || `${BASE_DOMAIN}/api/nrr`;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const getPointsTable = async () => {
  try {
    const response = await api.get('/points-table');
    return response.data;
  } catch (error) {
    const fullURL = error.config?.baseURL + error.config?.url;
    console.error('API Error Details:', {
      message: error.message,
      fullURL: fullURL,
      status: error.response?.status,
      statusText: error.response?.statusText,
      responseData: error.response?.data,
      baseURL: error.config?.baseURL,
      requestedPath: error.config?.url
    });
    throw new Error(error.response?.data?.error || `Failed to fetch points table from ${fullURL}`);
  }
};

export const calculateNRRRange = async (data) => {
  try {
    const response = await api.post('/calculate', data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to calculate NRR range');
  }
};

