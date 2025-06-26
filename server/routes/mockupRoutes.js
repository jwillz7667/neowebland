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

module.exports = router;