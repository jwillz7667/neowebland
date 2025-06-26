const Portfolio = require('../models/Portfolio');

class PortfolioService {
  async createProject(projectData) {
    try {
      console.log('Creating new portfolio project:', projectData.title);
      const project = new Portfolio(projectData);
      const savedProject = await project.save();
      console.log('Portfolio project created successfully:', savedProject._id);
      return savedProject;
    } catch (error) {
      console.error('Error creating portfolio project:', error.message);
      throw new Error(`Failed to create portfolio project: ${error.message}`);
    }
  }

  async getAllProjects() {
    try {
      console.log('Service: Fetching all portfolio projects from database');
      const projects = await Portfolio.find().sort({ createdAt: -1 });
      console.log(`Service: Database query completed. Found ${projects.length} portfolio projects`);
      
      if (projects.length === 0) {
        console.log('Service: No projects found in database. Database might be empty.');
      } else {
        console.log('Service: First project sample:', {
          id: projects[0]._id,
          title: projects[0].title,
          category: projects[0].category
        });
      }
      
      return projects;
    } catch (error) {
      console.error('Service: Error fetching portfolio projects:', error.message);
      console.error('Service: Error stack:', error.stack);
      throw new Error(`Failed to fetch portfolio projects: ${error.message}`);
    }
  }

  async getProjectById(projectId) {
    try {
      console.log('Fetching portfolio project by ID:', projectId);
      const project = await Portfolio.findById(projectId);
      if (!project) {
        throw new Error('Portfolio project not found');
      }
      console.log('Portfolio project found:', project.title);
      return project;
    } catch (error) {
      console.error('Error fetching portfolio project:', error.message);
      throw new Error(`Failed to fetch portfolio project: ${error.message}`);
    }
  }

  async updateProject(projectId, updateData) {
    try {
      console.log('Updating portfolio project:', projectId);
      const project = await Portfolio.findByIdAndUpdate(
        projectId,
        updateData,
        { new: true, runValidators: true }
      );
      if (!project) {
        throw new Error('Portfolio project not found');
      }
      console.log('Portfolio project updated successfully:', project.title);
      return project;
    } catch (error) {
      console.error('Error updating portfolio project:', error.message);
      throw new Error(`Failed to update portfolio project: ${error.message}`);
    }
  }

  async deleteProject(projectId) {
    try {
      console.log('Deleting portfolio project:', projectId);
      const project = await Portfolio.findByIdAndDelete(projectId);
      if (!project) {
        throw new Error('Portfolio project not found');
      }
      console.log('Portfolio project deleted successfully:', project.title);
      return { message: 'Portfolio project deleted successfully' };
    } catch (error) {
      console.error('Error deleting portfolio project:', error.message);
      throw new Error(`Failed to delete portfolio project: ${error.message}`);
    }
  }
}

module.exports = new PortfolioService();