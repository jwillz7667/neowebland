const Contact = require('../models/Contact');
const pino = require('pino');

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: {
    target: 'pino-pretty'
  }
});

class ContactService {
  
  /**
   * Create a new contact message
   * @param {Object} contactData - Contact form data
   * @param {string} contactData.name - Contact's name
   * @param {string} contactData.email - Contact's email
   * @param {string} contactData.company - Contact's company (optional)
   * @param {string} contactData.message - Contact's message
   * @param {string} ipAddress - Client's IP address
   * @param {string} userAgent - Client's user agent
   * @returns {Promise<Object>} Created contact document
   */
  async createContact(contactData, ipAddress = null, userAgent = null) {
    console.log("=== CONTACT SERVICE: createContact ===")
    console.log("Service called with data:", {
      name: contactData.name,
      email: contactData.email,
      company: contactData.company || 'Not provided',
      messageLength: contactData.message.length,
      ipAddress,
      userAgent
    })

    try {
      logger.info('Creating new contact message', { 
        email: contactData.email, 
        name: contactData.name 
      });

      console.log("Creating new Contact document...")
      const contact = new Contact({
        name: contactData.name,
        email: contactData.email,
        company: contactData.company || '',
        message: contactData.message,
        ipAddress,
        userAgent
      });

      console.log("Contact document created, saving to database...")
      const savedContact = await contact.save();
      console.log("Contact saved successfully:", {
        id: savedContact._id,
        email: savedContact.email,
        createdAt: savedContact.createdAt,
        updatedAt: savedContact.updatedAt
      })

      logger.info('Contact message created successfully', { 
        contactId: savedContact._id,
        email: savedContact.email 
      });

      console.log("=== CONTACT SERVICE SUCCESS ===")
      return savedContact;
    } catch (error) {
      console.error("=== CONTACT SERVICE ERROR ===")
      console.error("Error type:", error.constructor.name)
      console.error("Error message:", error.message)
      console.error("Error details:", error)
      
      if (error.name === 'ValidationError') {
        console.error("Validation errors:", error.errors)
      }

      logger.error('Error creating contact message', { 
        error: error.message,
        contactData: { ...contactData, message: '[REDACTED]' }
      });
      
      if (error.name === 'ValidationError') {
        const validationErrors = Object.values(error.errors).map(err => err.message);
        throw new Error(`Validation failed: ${validationErrors.join(', ')}`);
      }
      
      throw new Error('Failed to save contact message');
    }
  }

  /**
   * Get all contact messages with pagination
   * @param {Object} options - Query options
   * @param {number} options.page - Page number (default: 1)
   * @param {number} options.limit - Items per page (default: 20)
   * @param {string} options.status - Filter by status
   * @returns {Promise<Object>} Paginated contact messages
   */
  async getAllContacts(options = {}) {
    try {
      const {
        page = 1,
        limit = 20,
        status
      } = options;

      const query = {};
      if (status) {
        query.status = status;
      }

      const skip = (page - 1) * limit;

      logger.info('Fetching contact messages', { page, limit, status });

      const [contacts, total] = await Promise.all([
        Contact.find(query)
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit)
          .lean(),
        Contact.countDocuments(query)
      ]);

      const totalPages = Math.ceil(total / limit);

      logger.info('Contact messages fetched successfully', { 
        count: contacts.length, 
        total, 
        page, 
        totalPages 
      });

      return {
        contacts,
        pagination: {
          currentPage: page,
          totalPages,
          totalItems: total,
          itemsPerPage: limit,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1
        }
      };
    } catch (error) {
      logger.error('Error fetching contact messages', { error: error.message });
      throw new Error('Failed to fetch contact messages');
    }
  }

  /**
   * Get contact message by ID
   * @param {string} contactId - Contact message ID
   * @returns {Promise<Object>} Contact message
   */
  async getContactById(contactId) {
    try {
      logger.info('Fetching contact message by ID', { contactId });

      const contact = await Contact.findById(contactId);
      
      if (!contact) {
        logger.warn('Contact message not found', { contactId });
        throw new Error('Contact message not found');
      }

      logger.info('Contact message fetched successfully', { contactId });
      return contact;
    } catch (error) {
      logger.error('Error fetching contact message', { 
        error: error.message, 
        contactId 
      });
      
      if (error.message === 'Contact message not found') {
        throw error;
      }
      
      throw new Error('Failed to fetch contact message');
    }
  }

  /**
   * Update contact message status
   * @param {string} contactId - Contact message ID
   * @param {string} status - New status
   * @returns {Promise<Object>} Updated contact message
   */
  async updateContactStatus(contactId, status) {
    try {
      logger.info('Updating contact message status', { contactId, status });

      const contact = await Contact.findByIdAndUpdate(
        contactId,
        { status },
        { new: true, runValidators: true }
      );

      if (!contact) {
        logger.warn('Contact message not found for status update', { contactId });
        throw new Error('Contact message not found');
      }

      logger.info('Contact message status updated successfully', { 
        contactId, 
        newStatus: status 
      });

      return contact;
    } catch (error) {
      logger.error('Error updating contact message status', { 
        error: error.message, 
        contactId, 
        status 
      });
      
      if (error.message === 'Contact message not found') {
        throw error;
      }
      
      throw new Error('Failed to update contact message status');
    }
  }
}

module.exports = new ContactService();