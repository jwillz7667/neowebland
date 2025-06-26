const express = require('express');
const serviceService = require('../services/serviceService');
const router = express.Router();

// GET /api/services - Get all services
router.get('/services', async (req, res) => {
  try {
    console.log('Route: GET /api/services called');
    const services = await serviceService.getAllServices();
    console.log('Route: Services retrieved from service:', services.length);
    console.log('Route: Sample service data:', services[0] || 'No services found');
    res.json({ services });
  } catch (error) {
    console.error('Services fetch error:', error.message);
    console.error('Services fetch error stack:', error.stack);
    res.status(500).json({ error: error.message });
  }
});

// GET /api/services/:id - Get single service
router.get('/services/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const service = await serviceService.getServiceById(id);
    res.json({ service });
  } catch (error) {
    console.error('Service fetch error:', error.message);
    const statusCode = error.message.includes('not found') ? 404 : 500;
    res.status(statusCode).json({ error: error.message });
  }
});

// POST /api/services - Create new service
router.post('/services', async (req, res) => {
  try {
    const serviceData = req.body;

    // Validate required fields
    if (!serviceData.title || !serviceData.description) {
      return res.status(400).json({
        error: 'Title and description are required fields'
      });
    }

    // Ensure features is an array
    if (!serviceData.features || !Array.isArray(serviceData.features)) {
      serviceData.features = [];
    }

    const service = await serviceService.createService(serviceData);
    res.status(201).json({
      service,
      message: 'Service created successfully'
    });
  } catch (error) {
    console.error('Service creation error:', error.message);
    res.status(400).json({ error: error.message });
  }
});

// PUT /api/services/:id - Update service
router.put('/services/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const service = await serviceService.updateService(id, updateData);
    res.json({
      service,
      message: 'Service updated successfully'
    });
  } catch (error) {
    console.error('Service update error:', error.message);
    const statusCode = error.message.includes('not found') ? 404 : 400;
    res.status(statusCode).json({ error: error.message });
  }
});

// DELETE /api/services/:id - Delete service
router.delete('/services/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await serviceService.deleteService(id);
    res.json(result);
  } catch (error) {
    console.error('Service deletion error:', error.message);
    const statusCode = error.message.includes('not found') ? 404 : 500;
    res.status(statusCode).json({ error: error.message });
  }
});

module.exports = router;