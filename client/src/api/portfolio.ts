import api from './api';

// Description: Get a list of portfolio projects
// Endpoint: GET /api/portfolio-projects
// Request: {}
// Response: { projects: Array<{ _id: string, title: string, category: string, image: string, description: string, technologies: string[], liveUrl: string, githubUrl: string, client?: object, features?: string[], duration?: string, teamSize?: string, rating?: string, status: string }> }
export const getPortfolioProjects = async () => {
  console.log("API: Making request to /api/portfolio-projects")
  try {
    const response = await api.get('/api/portfolio-projects');
    console.log("API: Response received:", response)
    console.log("API: Response data:", response.data)
    console.log("API: Response status:", response.status)
    return response.data;
  } catch (error: any) {
    console.error("API: Error in getPortfolioProjects:", error)
    console.error("API: Error response:", error?.response)
    console.error("API: Error response data:", error?.response?.data)
    throw new Error(error?.response?.data?.error || error.message);
  }
}

// Description: Get a single portfolio project by ID
// Endpoint: GET /api/portfolio-projects/:id
// Request: { id: string }
// Response: { project: { _id: string, title: string, category: string, image: string, description: string, technologies: string[], liveUrl: string, githubUrl: string, client?: object, features?: string[], duration?: string, teamSize?: string, rating?: string, status: string } }
export const getPortfolioProject = async (id: string) => {
  try {
    const response = await api.get(`/api/portfolio-projects/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.error || error.message);
  }
}

// Description: Create a new portfolio project
// Endpoint: POST /api/portfolio-projects
// Request: { title: string, category: string, image: string, description: string, technologies: string[], liveUrl?: string, githubUrl?: string, client?: object, features?: string[], duration?: string, teamSize?: string, rating?: string, status?: string }
// Response: { project: object, message: string }
export const createPortfolioProject = async (projectData: {
  title: string;
  category: string;
  image: string;
  description: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  client?: {
    name: string;
    role: string;
    feedback: string;
    avatar: string;
  };
  features?: string[];
  duration?: string;
  teamSize?: string;
  rating?: string;
  status?: string;
}) => {
  try {
    const response = await api.post('/api/portfolio-projects', projectData);
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.error || error.message);
  }
}

// Description: Update an existing portfolio project
// Endpoint: PUT /api/portfolio-projects/:id
// Request: { id: string, ...projectData }
// Response: { project: object, message: string }
export const updatePortfolioProject = async (id: string, projectData: any) => {
  try {
    const response = await api.put(`/api/portfolio-projects/${id}`, projectData);
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.error || error.message);
  }
}

// Description: Delete a portfolio project
// Endpoint: DELETE /api/portfolio-projects/:id
// Request: { id: string }
// Response: { message: string }
export const deletePortfolioProject = async (id: string) => {
  try {
    const response = await api.delete(`/api/portfolio-projects/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.error || error.message);
  }
}