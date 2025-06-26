import api from './api';

// Description: Submit contact form data
// Endpoint: POST /api/contact
// Request: { name: string, email: string, company?: string, message: string }
// Response: { success: boolean, message: string, contactId: string }
export const submitContactForm = async (data: { name: string; email: string; company?: string; message: string }) => {
  console.log("=== API CALL: submitContactForm ===")
  console.log("Request data:", {
    name: data.name,
    email: data.email,
    company: data.company || 'Not provided',
    messageLength: data.message.length
  })
  console.log("Making POST request to /api/contact...")
  
  try {
    const response = await api.post('/api/contact', data);
    console.log("API Response status:", response.status)
    console.log("API Response data:", response.data)
    console.log("=== API CALL SUCCESS ===")
    return response.data;
  } catch (error: any) {
    console.error("=== API CALL ERROR ===")
    console.error("Error status:", error?.response?.status)
    console.error("Error data:", error?.response?.data)
    console.error("Error message:", error?.message)
    console.error("Full error:", error)
    throw new Error(error?.response?.data?.error || error.message);
  }
}

// Description: Get all contact messages (admin function)
// Endpoint: GET /api/contact
// Request: { page?: number, limit?: number, status?: string }
// Response: { success: boolean, data: { contacts: Array, pagination: Object } }
export const getContactMessages = async (params?: { page?: number; limit?: number; status?: string }) => {
  try {
    const response = await api.get('/api/contact', { params });
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.error || error.message);
  }
}

// Description: Get a specific contact message by ID
// Endpoint: GET /api/contact/:id
// Request: {}
// Response: { success: boolean, data: Object }
export const getContactById = async (contactId: string) => {
  try {
    const response = await api.get(`/api/contact/${contactId}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.error || error.message);
  }
}

// Description: Update contact message status
// Endpoint: PUT /api/contact/:id/status
// Request: { status: string }
// Response: { success: boolean, message: string, data: Object }
export const updateContactStatus = async (contactId: string, status: string) => {
  try {
    const response = await api.put(`/api/contact/${contactId}/status`, { status });
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.error || error.message);
  }
}