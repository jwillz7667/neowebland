const express = require('express');
const contactService = require('../services/contactService');
const pino = require('pino');

const router = express.Router();

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: {
    target: 'pino-pretty'
  }
});

/**
 * POST /api/contact
 * Submit a new contact form message
 */
router.post('/contact', async (req, res) => {
  console.log("=== CONTACT ROUTE: POST /api/contact ===")
  console.log("Request received at:", new Date().toISOString())
  console.log("Request body:", {
    name: req.body.name,
    email: req.body.email,
    company: req.body.company || 'Not provided',
    messageLength: req.body.message ? req.body.message.length : 0
  })
  console.log("Request headers:", {
    'content-type': req.get('Content-Type'),
    'user-agent': req.get('User-Agent'),
    'origin': req.get('Origin')
  })

  try {
    const { name, email, company, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      console.log("Validation failed - missing required fields:", {
        hasName: !!name,
        hasEmail: !!email,
        hasMessage: !!message
      })
      
      logger.warn('Contact form submission with missing required fields', {
        hasName: !!name,
        hasEmail: !!email,
        hasMessage: !!message
      });

      return res.status(400).json({
        success: false,
        error: 'Name, email, and message are required fields'
      });
    }

    // Email format validation
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      console.log("Email validation failed for:", email)
      
      logger.warn('Contact form submission with invalid email format', { email });

      return res.status(400).json({
        success: false,
        error: 'Please provide a valid email address'
      });
    }

    // Get client info
    const ipAddress = req.ip || req.connection.remoteAddress || req.socket.remoteAddress ||
                     (req.connection.socket ? req.connection.socket.remoteAddress : null);
    const userAgent = req.get('User-Agent');

    console.log("Client info:", { ipAddress, userAgent })

    logger.info('Processing contact form submission', {
      email,
      name,
      hasCompany: !!company,
      ipAddress
    });

    const contactData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      company: company ? company.trim() : '',
      message: message.trim()
    };

    console.log("Calling contactService.createContact...")
    const contact = await contactService.createContact(contactData, ipAddress, userAgent);
    console.log("Contact created successfully:", {
      contactId: contact._id,
      email: contact.email,
      createdAt: contact.createdAt
    })

    logger.info('Contact form submitted successfully', {
      contactId: contact._id,
      email: contact.email
    });

    const responseData = {
      success: true,
      message: 'Thank you for your message! We will get back to you soon.',
      contactId: contact._id
    };

    console.log("Sending response:", responseData)
    console.log("=== CONTACT ROUTE SUCCESS ===")
    
    res.status(201).json(responseData);

  } catch (error) {
    console.error("=== CONTACT ROUTE ERROR ===")
    console.error("Error occurred at:", new Date().toISOString())
    console.error("Error type:", error.constructor.name)
    console.error("Error message:", error.message)
    console.error("Error stack:", error.stack)
    
    logger.error('Error processing contact form submission', {
      error: error.message,
      stack: error.stack
    });

    res.status(500).json({
      success: false,
      error: error.message || 'Failed to submit contact form'
    });
  }
});

/**
 * GET /api/contact
 * Get all contact messages (for admin use)
 */
router.get('/contact', async (req, res) => {
  try {
    const { page, limit, status } = req.query;
    
    const options = {
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 20,
      status
    };

    logger.info('Fetching contact messages', options);

    const result = await contactService.getAllContacts(options);

    res.status(200).json({
      success: true,
      data: result
    });

  } catch (error) {
    logger.error('Error fetching contact messages', { 
      error: error.message,
      stack: error.stack 
    });

    res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch contact messages'
    });
  }
});

/**
 * GET /api/contact/:id
 * Get a specific contact message by ID
 */
router.get('/contact/:id', async (req, res) => {
  try {
    const { id } = req.params;

    logger.info('Fetching contact message by ID', { contactId: id });

    const contact = await contactService.getContactById(id);

    res.status(200).json({
      success: true,
      data: contact
    });

  } catch (error) {
    logger.error('Error fetching contact message', { 
      error: error.message,
      contactId: req.params.id 
    });

    const statusCode = error.message === 'Contact message not found' ? 404 : 500;
    
    res.status(statusCode).json({
      success: false,
      error: error.message || 'Failed to fetch contact message'
    });
  }
});

/**
 * PUT /api/contact/:id/status
 * Update contact message status
 */
router.put('/contact/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        error: 'Status is required'
      });
    }

    const validStatuses = ['new', 'read', 'replied', 'archived'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        error: `Status must be one of: ${validStatuses.join(', ')}`
      });
    }

    logger.info('Updating contact message status', { contactId: id, status });

    const contact = await contactService.updateContactStatus(id, status);

    res.status(200).json({
      success: true,
      message: 'Contact status updated successfully',
      data: contact
    });

  } catch (error) {
    logger.error('Error updating contact message status', { 
      error: error.message,
      contactId: req.params.id 
    });

    const statusCode = error.message === 'Contact message not found' ? 404 : 500;
    
    res.status(statusCode).json({
      success: false,
      error: error.message || 'Failed to update contact status'
    });
  }
});

module.exports = router;