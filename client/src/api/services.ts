import api from './api';

// Description: Get a list of services offered by the agency
// Endpoint: GET /api/services
// Request: {}
// Response: { services: Array<{ _id: string, title: string, description: string, features: string[], icon: string, price?: number, duration?: string, category?: string, status: string }> }
export const getServices = async () => {
  try {
    const response = await api.get('/api/services');
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.error || error.message);
  }
}

// Description: Get a single service by ID
// Endpoint: GET /api/services/:id
// Request: {}
// Response: { service: { _id: string, title: string, description: string, features: string[], icon: string, price?: number, duration?: string, category?: string, status: string } }
export const getServiceById = async (id: string) => {
  try {
    const response = await api.get(`/api/services/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.error || error.message);
  }
}

// Description: Create a new service
// Endpoint: POST /api/services
// Request: { title: string, description: string, features: string[], icon?: string, price?: number, duration?: string, category?: string, status?: string }
// Response: { service: { _id: string, title: string, description: string, features: string[], icon: string, price?: number, duration?: string, category?: string, status: string }, message: string }
export const createService = async (serviceData: {
  title: string;
  description: string;
  features: string[];
  icon?: string;
  price?: number;
  duration?: string;
  category?: string;
  status?: string;
}) => {
  try {
    const response = await api.post('/api/services', serviceData);
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.error || error.message);
  }
}

// Description: Update an existing service
// Endpoint: PUT /api/services/:id
// Request: { title?: string, description?: string, features?: string[], icon?: string, price?: number, duration?: string, category?: string, status?: string }
// Response: { service: { _id: string, title: string, description: string, features: string[], icon: string, price?: number, duration?: string, category?: string, status: string }, message: string }
export const updateService = async (id: string, updateData: {
  title?: string;
  description?: string;
  features?: string[];
  icon?: string;
  price?: number;
  duration?: string;
  category?: string;
  status?: string;
}) => {
  try {
    const response = await api.put(`/api/services/${id}`, updateData);
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.error || error.message);
  }
}

// Description: Delete a service
// Endpoint: DELETE /api/services/:id
// Request: {}
// Response: { message: string }
export const deleteService = async (id: string) => {
  try {
    const response = await api.delete(`/api/services/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.error || error.message);
  }
}