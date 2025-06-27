import axios, { AxiosRequestConfig, AxiosError, InternalAxiosRequestConfig } from 'axios';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const JSONbig = require('json-bigint');

// Environment-based API configuration
const getApiBaseUrl = (): string => {
  // Check for Vite environment variables first
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  
  // Production environment detection
  if (import.meta.env.PROD || window.location.hostname === 'webnaster.com' || window.location.hostname === 'www.webnaster.com') {
    return 'https://api.webnaster.com'; // Your Railway production URL
  }
  
  // Development fallback
  return 'http://localhost:3000';
};

const API_BASE_URL = getApiBaseUrl();

console.log('🔗 API Base URL:', API_BASE_URL);

// Create axios instance with production-ready configuration
const localApi = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 second timeout
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  validateStatus: (status) => {
    return status >= 200 && status < 300;
  },
  transformResponse: [
    (data) => {
      try {
        return JSONbig.parse(data);
      } catch {
        return data;
      }
    }
  ],
  withCredentials: false, // Set to true if you need cookies/sessions
});

// Request interceptor for adding authentication tokens
localApi.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Add timestamp for cache busting if needed
    if (config.method === 'get') {
      config.params = { ...config.params, _t: Date.now() };
    }
    
    // Add authorization header if token exists
    const token = localStorage.getItem('auth_token');
    if (token && !isAuthEndpoint(config.url || '')) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    console.log('🚀 API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error: AxiosError) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
localApi.interceptors.response.use(
  (response) => {
    console.log('✅ API Response:', response.status, response.config.url);
    return response;
  },
  (error: AxiosError) => {
    console.error('❌ API Error:', error.response?.status, error.config?.url);
    
    // Handle specific error cases
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login if needed
      localStorage.removeItem('auth_token');
      // window.location.href = '/login'; // Uncomment if you have authentication
    } else if (error.response?.status === 503) {
      // Service unavailable - show user-friendly message
      console.warn('⚠️ Service temporarily unavailable');
    } else if (!error.response) {
      // Network error
      console.error('🌐 Network error - check connection');
    }
    
    return Promise.reject(error);
  }
);

const getApiInstance = () => {
  return localApi;
};

const isAuthEndpoint = (url: string): boolean => {
  return url.includes('/api/auth') || url.includes('/api/login') || url.includes('/api/register');
};

// Enhanced API methods with error handling
const api = {
  // Generic request method
  request: async (config: AxiosRequestConfig) => {
    try {
      const apiInstance = getApiInstance();
      return await apiInstance(config);
    } catch (error) {
      throw handleApiError(error as AxiosError);
    }
  },

  // GET method
  get: async (url: string, config?: AxiosRequestConfig) => {
    try {
      const apiInstance = getApiInstance();
      return await apiInstance.get(url, config);
    } catch (error) {
      throw handleApiError(error as AxiosError);
    }
  },

  // POST method
  post: async (url: string, data?: unknown, config?: AxiosRequestConfig) => {
    try {
      const apiInstance = getApiInstance();
      return await apiInstance.post(url, data, config);
    } catch (error) {
      throw handleApiError(error as AxiosError);
    }
  },

  // PUT method
  put: async (url: string, data?: unknown, config?: AxiosRequestConfig) => {
    try {
      const apiInstance = getApiInstance();
      return await apiInstance.put(url, data, config);
    } catch (error) {
      throw handleApiError(error as AxiosError);
    }
  },

  // DELETE method
  delete: async (url: string, config?: AxiosRequestConfig) => {
    try {
      const apiInstance = getApiInstance();
      return await apiInstance.delete(url, config);
    } catch (error) {
      throw handleApiError(error as AxiosError);
    }
  },

  // Health check method
  healthCheck: async () => {
    try {
      const response = await localApi.get('/api/health');
      return response.data;
    } catch (error) {
      console.error('Health check failed:', error);
      return { status: 'ERROR', message: 'API unavailable' };
    }
  },

  // Get API base URL
  getBaseUrl: () => API_BASE_URL,
};

// Interface for API error response
interface ApiErrorData {
  message?: string;
  error?: string;
}

// Error handling utility
function handleApiError(error: AxiosError): Error {
  if (error.response) {
    // Server responded with error status
    const errorData = error.response.data as ApiErrorData;
    const message = errorData?.message || errorData?.error || 'Server error';
    return new Error(`API Error (${error.response.status}): ${message}`);
  } else if (error.request) {
    // Request made but no response received
    return new Error('Network error: Unable to connect to server');
  } else {
    // Something else happened
    return new Error(`Request error: ${error.message}`);
  }
}

export default api;
export { API_BASE_URL, getApiBaseUrl };
