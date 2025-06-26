const Conversation = require('../models/Conversation');
const geminiService = require('./geminiService');

class ChatbotService {
  constructor() {
    console.log('ChatbotService initialized');
  }

  async sendMessage(conversationId, message, userId = 'anonymous') {
    try {
      console.log(`Processing message for conversation ${conversationId}: ${message}`);

      // Find or create conversation
      let conversation = await Conversation.findOne({ conversationId });
      if (!conversation) {
        console.log(`Creating new conversation: ${conversationId}`);
        conversation = new Conversation({
          conversationId,
          userId,
          messages: []
        });
      }

      // Add user message
      const userMessage = {
        content: message,
        isBot: false,
        timestamp: new Date()
      };
      conversation.messages.push(userMessage);

      // Generate AI response
      const aiResponse = await this.generateAIResponse(message, conversation.messages);
      
      // Add bot response
      const botMessage = {
        content: aiResponse,
        isBot: true,
        timestamp: new Date()
      };
      conversation.messages.push(botMessage);

      // Save conversation
      await conversation.save();
      console.log(`Conversation ${conversationId} updated with new messages`);

      return {
        response: aiResponse,
        conversationId: conversationId,
        timestamp: botMessage.timestamp
      };
    } catch (error) {
      console.error('Error in ChatbotService.sendMessage:', error);
      throw new Error(`Failed to process message: ${error.message}`);
    }
  }

  async getConversationHistory(conversationId) {
    try {
      console.log(`Retrieving conversation history for: ${conversationId}`);
      
      const conversation = await Conversation.findOne({ conversationId });
      if (!conversation) {
        console.log(`Conversation ${conversationId} not found`);
        return {
          conversationId,
          messages: [],
          lastActivity: new Date()
        };
      }

      return {
        conversationId: conversation.conversationId,
        messages: conversation.messages,
        lastActivity: conversation.lastActivity
      };
    } catch (error) {
      console.error('Error in ChatbotService.getConversationHistory:', error);
      throw new Error(`Failed to retrieve conversation history: ${error.message}`);
    }
  }

  async generateAIResponse(message, conversationHistory = []) {
    try {
      console.log('Generating AI response for message:', message);

      const messageLower = message.toLowerCase();
      
      // Build context from conversation history
      const context = conversationHistory
        .slice(-6) // Last 6 messages for context
        .map(msg => `${msg.isBot ? 'Assistant' : 'User'}: ${msg.content}`)
        .join('\n');

      // Create a comprehensive prompt for the AI
      const prompt = `
You are a helpful AI assistant for Webnaster, a professional web development agency. You should provide helpful, accurate information about web development services, pricing, and general inquiries.

Company Information:
- Company: Webnaster
- Services: Custom websites, mobile apps, UI/UX design, e-commerce solutions, performance optimization
- Contact: info@webnaster.com, 612-930-1390
- Location: 18234 80th Pl N, Maple Grove, MN 55311
- Hours: Monday-Friday, 8am-6pm

Pricing Guidelines:
- Basic websites: $2,500-$8,000
- E-commerce sites: $5,000-$15,000
- Web applications: $8,000-$25,000
- Mobile apps: $10,000-$50,000
- Website redesign: $3,000-$10,000

Timeline Guidelines:
- Basic websites: 2-4 weeks
- E-commerce sites: 4-8 weeks
- Web applications: 8-16 weeks
- Mobile apps: 10-20 weeks
- Website redesign: 3-6 weeks

Conversation Context:
${context}

Current User Message: ${message}

Please provide a helpful, professional response that:
1. Directly addresses the user's question
2. Provides specific information when possible
3. Includes relevant pricing or timeline information if asked
4. Maintains a friendly, professional tone
5. Encourages further questions or next steps
6. Keeps responses concise but informative (2-3 sentences max unless detailed explanation is needed)

Response:`;

      // Use Gemini AI to generate response
      const aiResponse = await this.callGeminiAI(prompt);
      
      console.log('AI response generated successfully');
      return aiResponse;
    } catch (error) {
      console.error('Error generating AI response:', error);
      
      // Fallback responses based on message content
      return this.getFallbackResponse(message);
    }
  }

  async callGeminiAI(prompt) {
    try {
      if (!geminiService.model) {
        throw new Error('Gemini AI not properly initialized');
      }

      const result = await geminiService.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      return text.trim();
    } catch (error) {
      console.error('Error calling Gemini AI:', error);
      throw error;
    }
  }

  getFallbackResponse(message) {
    const messageLower = message.toLowerCase();
    
    if (messageLower.includes('hello') || messageLower.includes('hi') || messageLower.includes('hey')) {
      return "Hello! I'm here to help you with your web development needs. How can I assist you today?";
    } else if (messageLower.includes('service') || messageLower.includes('what do you do')) {
      return "We offer comprehensive web development services including custom websites, mobile apps, UI/UX design, e-commerce solutions, and performance optimization. What specific service are you interested in?";
    } else if (messageLower.includes('price') || messageLower.includes('cost') || messageLower.includes('quote')) {
      return "Our pricing varies based on project complexity. Basic websites start at $2,500, e-commerce solutions from $5,000, and mobile apps from $10,000. Would you like a detailed quote for your specific project?";
    } else if (messageLower.includes('contact') || messageLower.includes('phone') || messageLower.includes('email')) {
      return "You can reach us at info@webnaster.com or call us at 612-930-1390. We're located at 18234 80th Pl N, Maple Grove, MN 55311. Our office hours are Monday-Friday, 8am-6pm.";
    } else if (messageLower.includes('timeline') || messageLower.includes('how long')) {
      return "Project timelines depend on scope. Basic websites take 2-4 weeks, while custom applications can take 8-16 weeks. We'll provide a detailed timeline after understanding your requirements.";
    } else {
      return "I'd be happy to help you with information about our web development services, pricing, or answer any questions about your project. What would you like to know?";
    }
  }
}

module.exports = new ChatbotService();