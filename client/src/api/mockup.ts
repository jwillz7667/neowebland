import api from './api';

// Description: Generate AI website mockup based on company information using Google Gemini
// Endpoint: POST /api/generate-mockup
// Request: { companyName: string, industry: string, description: string, targetAudience?: string, preferredColors?: string, websiteType?: string, features?: string }
// Response: { success: boolean, mockup: object }
export const generateWebsiteMockup = async (companyData: {
  companyName: string;
  industry: string;
  description: string;
  targetAudience?: string;
  preferredColors?: string;
  websiteType?: string;
  features?: string;
}) => {
  try {
    console.log('Sending mockup generation request to Gemini AI...');
    const response = await api.post('/api/generate-mockup', companyData);
    console.log('Received AI mockup response:', response.data);
    return response.data.mockup;
  } catch (error: any) {
    console.error('Error generating AI mockup:', error);
    throw new Error(error?.response?.data?.error || error.message);
  }
}

// Description: Get custom project quote based on mockup and requirements using Google Gemini
// Endpoint: POST /api/project-quote
// Request: { companyName: string, industry: string, description: string, websiteType?: string, features?: string, mockup: object }
// Response: { success: boolean, quote: object }
export const getProjectQuote = async (projectData: {
  companyName: string;
  industry: string;
  description: string;
  websiteType?: string;
  features?: string;
  mockup: any;
}) => {
  try {
    console.log('Sending quote generation request to Gemini AI...');
    const response = await api.post('/api/project-quote', projectData);
    console.log('Received AI quote response:', response.data);
    return response.data.quote;
  } catch (error: any) {
    console.error('Error generating AI quote:', error);
    throw new Error(error?.response?.data?.error || error.message);
  }
}