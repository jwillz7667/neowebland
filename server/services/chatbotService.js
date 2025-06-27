const Conversation = require('../models/Conversation');
const geminiService = require('./geminiService');

class ChatbotService {
  constructor() {
    console.log('✅ ChatbotService initialized');
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
      console.error('❌ Error in ChatbotService.sendMessage:', error);
      
      // Provide fallback response on database errors
      return {
        response: this.getFallbackResponse(message),
        conversationId: conversationId,
        timestamp: new Date(),
        fallback: true
      };
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
      console.error('❌ Error in ChatbotService.getConversationHistory:', error);
      
      // Return empty conversation on database errors
      return {
        conversationId,
        messages: [],
        lastActivity: new Date(),
        error: 'Unable to retrieve conversation history'
      };
    }
  }

  async generateAIResponse(message, conversationHistory = []) {
    try {
      console.log('Generating AI response for message:', message);

      // Check if Gemini AI is available
      if (!geminiService.isServiceAvailable()) {
        console.warn('⚠️  Gemini AI unavailable, using enhanced fallback response');
        return this.getEnhancedFallbackResponse(message, conversationHistory);
      }

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
      
      console.log('✅ AI response generated successfully');
      return aiResponse;
    } catch (error) {
      console.error('❌ Error generating AI response:', error);
      
      // Fallback responses based on message content
      return this.getEnhancedFallbackResponse(message, conversationHistory);
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
      console.error('❌ Error calling Gemini AI:', error);
      throw error;
    }
  }

  // Enhanced fallback responses with context awareness
  getEnhancedFallbackResponse(message, conversationHistory = []) {
    const messageLower = message.toLowerCase();
    
    // Check for greeting patterns
    if (messageLower.includes('hello') || messageLower.includes('hi') || messageLower.includes('hey') || 
        messageLower.includes('good morning') || messageLower.includes('good afternoon')) {
      return "Hello! Welcome to Webnaster. I'm here to help you with your web development needs. Whether you're looking for a new website, mobile app, or have questions about our services, I'm ready to assist you. How can I help you today?";
    }
    
    // Service inquiry patterns
    if (messageLower.includes('service') || messageLower.includes('what do you do') || 
        messageLower.includes('what can you help') || messageLower.includes('offer')) {
      return "We offer comprehensive web development services including:\n\n• Custom website development ($2,500-$8,000)\n• E-commerce solutions ($5,000-$15,000)\n• Mobile app development ($10,000-$50,000)\n• UI/UX design\n• Website redesign and optimization\n• Performance optimization\n\nWhich service interests you most? I'd be happy to provide more details and discuss your specific needs.";
    }
    
    // Pricing inquiry patterns
    if (messageLower.includes('price') || messageLower.includes('cost') || messageLower.includes('quote') || 
        messageLower.includes('budget') || messageLower.includes('how much')) {
      return "Our pricing depends on project complexity and requirements:\n\n• Basic websites: $2,500-$8,000\n• E-commerce sites: $5,000-$15,000\n• Web applications: $8,000-$25,000\n• Mobile apps: $10,000-$50,000\n• Website redesign: $3,000-$10,000\n\nWould you like a personalized quote? I can connect you with our team to discuss your specific project requirements.";
    }
    
    // Contact inquiry patterns
    if (messageLower.includes('contact') || messageLower.includes('phone') || messageLower.includes('email') || 
        messageLower.includes('reach') || messageLower.includes('talk to')) {
      return "Here's how you can reach us:\n\n📧 Email: info@webnaster.com\n📞 Phone: 612-930-1390\n📍 Address: 18234 80th Pl N, Maple Grove, MN 55311\n🕒 Hours: Monday-Friday, 8am-6pm\n\nFeel free to call or email us directly, or continue chatting here. We typically respond to emails within 24 hours during business days.";
    }
    
    // Timeline inquiry patterns
    if (messageLower.includes('timeline') || messageLower.includes('how long') || 
        messageLower.includes('when') || messageLower.includes('time')) {
      return "Project timelines vary based on scope and complexity:\n\n• Basic websites: 2-4 weeks\n• E-commerce sites: 4-8 weeks\n• Web applications: 8-16 weeks\n• Mobile apps: 10-20 weeks\n• Website redesign: 3-6 weeks\n\nWe'll provide a detailed timeline after understanding your specific requirements. What type of project are you considering?";
    }
    
    // Technology/technical patterns
    if (messageLower.includes('technology') || messageLower.includes('tech stack') || 
        messageLower.includes('framework') || messageLower.includes('platform')) {
      return "We work with modern, industry-standard technologies including:\n\n• Frontend: React, Vue.js, Angular, HTML5/CSS3\n• Backend: Node.js, Python, PHP\n• Databases: MongoDB, PostgreSQL, MySQL\n• Mobile: React Native, Flutter\n• Cloud: AWS, Google Cloud, Azure\n\nWe choose the best technology stack based on your project requirements. What type of project are you planning?";
    }
    
    // Portfolio/examples patterns
    if (messageLower.includes('portfolio') || messageLower.includes('examples') || 
        messageLower.includes('previous work') || messageLower.includes('case studies')) {
      return "We've worked on diverse projects across various industries including healthcare, e-commerce, finance, and education. Our portfolio includes custom web applications, e-commerce platforms, and mobile apps.\n\nTo see specific examples relevant to your industry or project type, I'd recommend scheduling a consultation with our team. Would you like me to connect you with someone who can show you case studies similar to your needs?";
    }
    
    // Support/maintenance patterns
    if (messageLower.includes('support') || messageLower.includes('maintenance') || 
        messageLower.includes('update') || messageLower.includes('hosting')) {
      return "We provide comprehensive post-launch support including:\n\n• Ongoing maintenance and updates\n• Security monitoring and patches\n• Performance optimization\n• Content management support\n• Hosting solutions\n• Technical support\n\nOur support packages are customized based on your needs. Are you looking for support on an existing website or planning for a new project?";
    }
    
    // Default response with context awareness
    const hasContext = conversationHistory.length > 0;
    if (hasContext) {
      return "I'd be happy to help you with more information about our web development services. Based on our conversation, it sounds like you're exploring your options. Is there a specific aspect of web development or our services you'd like to know more about?\n\nYou can also reach us directly at info@webnaster.com or 612-930-1390 for a detailed discussion.";
    } else {
      return "Welcome to Webnaster! I'm here to help you with information about our web development services, including custom websites, mobile apps, e-commerce solutions, and more.\n\nWhat brings you here today? Are you looking to build a new website, improve an existing one, or just exploring your options?";
    }
  }

  // Simple fallback for compatibility
  getFallbackResponse(message) {
    return this.getEnhancedFallbackResponse(message, []);
  }
}

module.exports = new ChatbotService();