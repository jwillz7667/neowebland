const express = require('express');
const geminiService = require('../services/geminiService');
const router = express.Router();

// POST /api/generate-mockup - Generate AI website mockup
router.post('/generate-mockup', async (req, res) => {
  try {
    console.log('Mockup generation request received:', req.body);
    
    const { companyName, industry, description } = req.body;
    
    // Validate required fields
    if (!companyName || !industry || !description) {
      return res.status(400).json({
        error: 'Company name, industry, and description are required'
      });
    }

    const mockup = await geminiService.generateWebsiteMockup(req.body);
    
    res.json({ 
      success: true,
      mockup 
    });
  } catch (error) {
    console.error('Mockup generation error:', error);
    res.status(500).json({ 
      error: error.message || 'Failed to generate mockup'
    });
  }
});

// POST /api/mockup/generate - Generate AI website mockup (frontend expects this endpoint)
router.post('/mockup/generate', async (req, res) => {
  try {
    console.log('Mockup generation request received (new endpoint):', req.body);
    
    const { companyName, industry, description } = req.body;
    
    // Validate required fields
    if (!companyName) {
      return res.status(400).json({
        error: 'Company name is required'
      });
    }

    // Generate both mockup and quote in one request
    const mockup = await geminiService.generateWebsiteMockup(req.body);
    
    // Generate quote based on mockup
    const quoteData = { ...req.body, mockup };
    const quote = await geminiService.generateProjectQuote(quoteData);
    
    res.json({ 
      success: true,
      mockup,
      quote
    });
  } catch (error) {
    console.error('Mockup generation error:', error);
    res.status(500).json({ 
      error: error.message || 'Failed to generate mockup'
    });
  }
});

// POST /api/project-quote - Generate project quote
router.post('/project-quote', async (req, res) => {
  try {
    console.log('Quote generation request received for:', req.body.companyName);
    
    const quote = await geminiService.generateProjectQuote(req.body);
    
    res.json({ 
      success: true,
      quote 
    });
  } catch (error) {
    console.error('Quote generation error:', error);
    res.status(500).json({ 
      error: error.message || 'Failed to generate quote'
    });
  }
});

// GET /api/mockup/templates - Get available templates
router.get('/mockup/templates', (req, res) => {
  try {
    const WebsiteTemplates = require('../services/websiteTemplates');
    const templates = [
      WebsiteTemplates.professionalTemplate,
      WebsiteTemplates.restaurantTemplate,
      WebsiteTemplates.ecommerceTemplate,
      WebsiteTemplates.healthcareTemplate,
      WebsiteTemplates.creativeTemplate,
      WebsiteTemplates.techTemplate,
      WebsiteTemplates.realEstateTemplate
    ];
    
    res.json({ 
      success: true,
      templates: templates.map(t => ({
        id: t.templateId,
        name: t.name,
        description: t.description,
        colorScheme: t.colorScheme
      }))
    });
  } catch (error) {
    console.error('Error fetching templates:', error);
    res.status(500).json({ 
      error: 'Failed to fetch templates'
    });
  }
});

module.exports = router;