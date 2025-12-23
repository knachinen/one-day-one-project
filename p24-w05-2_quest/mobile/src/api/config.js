import axios from 'axios';
import { API_URL } from '../constants/config';

console.log('🔗 API URL:', API_URL);

// Create axios instance
export const api = axios.create({
  baseURL: `${API_URL}/api`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`📤 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('📤 API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for logging
api.interceptors.response.use(
  (response) => {
    console.log(`📥 API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    if (error.response) {
      console.error(`📥 API Error: ${error.response.status} ${error.response.config.url}`);
    } else if (error.request) {
      console.error('📥 API Error: No response received');
    } else {
      console.error('📥 API Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// Set auth token helper
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    console.log('🔐 Auth token set');
  } else {
    delete api.defaults.headers.common['Authorization'];
    console.log('🔐 Auth token removed');
  }
};

// Test connection helper
export const testConnection = async () => {
  try {
    const response = await api.get('/health');
    console.log('✅ Server connection successful:', response.data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('❌ Server connection failed:', error.message);
    return { success: false, error: error.message };
  }
};

export default api;
