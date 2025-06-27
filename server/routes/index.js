const express = require('express');
const router = express.Router();

// Root path response
router.get("/", (req, res) => {
  res.status(200).send("Welcome to Your Website!");
});

// Basic health check route (always available)
router.get('/ping', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Service status route
router.get('/status', (req, res) => {
  res.json({
    server: 'online',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Fallback route for Railway deployment verification
router.get('/railway-health', (req, res) => {
  res.status(200).json({
    status: 'Railway deployment successful',
    server: 'WebNaster API',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
