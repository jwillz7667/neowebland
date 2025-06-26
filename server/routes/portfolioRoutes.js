const express = require('express');
const portfolioService = require('../services/portfolioService');
const router = express.Router();

// GET /api/portfolio-projects - Get all portfolio projects
router.get('/portfolio-projects', async (req, res) => {
  try {
    console.log('Route: GET /api/portfolio-projects called');
    const projects = await portfolioService.getAllProjects();
    console.log('Route: Projects retrieved from service:', projects.length);
    console.log('Route: Sample project data:', projects[0] || 'No projects found');
    res.json({ projects });
  } catch (error) {
    console.error('Portfolio projects fetch error:', error.message);
    console.error('Portfolio projects fetch error stack:', error.stack);
    res.status(500).json({ error: error.message });
  }
});

// GET /api/portfolio-projects/:id - Get single portfolio project
router.get('/portfolio-projects/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const project = await portfolioService.getProjectById(id);
    res.json({ project });
  } catch (error) {
    console.error('Portfolio project fetch error:', error.message);
    const statusCode = error.message.includes('not found') ? 404 : 500;
    res.status(statusCode).json({ error: error.message });
  }
});

// POST /api/portfolio-projects - Create new portfolio project
router.post('/portfolio-projects', async (req, res) => {
  try {
    const projectData = req.body;
    
    // Validate required fields
    if (!projectData.title || !projectData.category || !projectData.description) {
      return res.status(400).json({ 
        error: 'Title, category, and description are required fields' 
      });
    }

    const project = await portfolioService.createProject(projectData);
    res.status(201).json({ 
      project, 
      message: 'Portfolio project created successfully' 
    });
  } catch (error) {
    console.error('Portfolio project creation error:', error.message);
    res.status(400).json({ error: error.message });
  }
});

// PUT /api/portfolio-projects/:id - Update portfolio project
router.put('/portfolio-projects/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    const project = await portfolioService.updateProject(id, updateData);
    res.json({ 
      project, 
      message: 'Portfolio project updated successfully' 
    });
  } catch (error) {
    console.error('Portfolio project update error:', error.message);
    const statusCode = error.message.includes('not found') ? 404 : 400;
    res.status(statusCode).json({ error: error.message });
  }
});

// DELETE /api/portfolio-projects/:id - Delete portfolio project
router.delete('/portfolio-projects/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await portfolioService.deleteProject(id);
    res.json(result);
  } catch (error) {
    console.error('Portfolio project deletion error:', error.message);
    const statusCode = error.message.includes('not found') ? 404 : 500;
    res.status(statusCode).json({ error: error.message });
  }
});

module.exports = router;