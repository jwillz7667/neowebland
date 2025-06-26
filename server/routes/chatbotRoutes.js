const express = require('express');
const chatbotService = require('../services/chatbotService');
const router = express.Router();

// POST /api/chatbot/message - Send message to chatbot
router.post('/chatbot/message', async (req, res) => {
  try {
    console.log('Chatbot message request received:', req.body);

    const { message, conversationId } = req.body;

    // Validate required fields
    if (!message || !message.trim()) {
      return res.status(400).json({
        error: 'Message is required'
      });
    }

    // Generate conversation ID if not provided
    const finalConversationId = conversationId || `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const result = await chatbotService.sendMessage(finalConversationId, message.trim());

    res.json({
      success: true,
      response: result.response,
      conversationId: result.conversationId,
      timestamp: result.timestamp
    });
  } catch (error) {
    console.error('Chatbot message error:', error);
    res.status(500).json({
      error: error.message || 'Failed to process message'
    });
  }
});

// GET /api/chatbot/history/:conversationId - Get conversation history
router.get('/chatbot/history/:conversationId', async (req, res) => {
  try {
    const { conversationId } = req.params;
    
    console.log('Retrieving chat history for conversation:', conversationId);

    if (!conversationId) {
      return res.status(400).json({
        error: 'Conversation ID is required'
      });
    }

    const history = await chatbotService.getConversationHistory(conversationId);

    res.json({
      success: true,
      conversation: history
    });
  } catch (error) {
    console.error('Chat history retrieval error:', error);
    res.status(500).json({
      error: error.message || 'Failed to retrieve chat history'
    });
  }
});

// GET /api/chatbot/conversations - Get all conversations (for admin/debugging)
router.get('/chatbot/conversations', async (req, res) => {
  try {
    console.log('Retrieving all conversations');
    
    const Conversation = require('../models/Conversation');
    const conversations = await Conversation.find()
      .select('conversationId userId lastActivity status messages')
      .sort({ lastActivity: -1 })
      .limit(50);

    res.json({
      success: true,
      conversations: conversations.map(conv => ({
        conversationId: conv.conversationId,
        userId: conv.userId,
        lastActivity: conv.lastActivity,
        status: conv.status,
        messageCount: conv.messages.length,
        lastMessage: conv.messages.length > 0 ? conv.messages[conv.messages.length - 1].content.substring(0, 100) : null
      }))
    });
  } catch (error) {
    console.error('Error retrieving conversations:', error);
    res.status(500).json({
      error: error.message || 'Failed to retrieve conversations'
    });
  }
});

module.exports = router;