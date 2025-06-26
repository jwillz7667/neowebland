import api from './api';

// Description: Send message to AI chatbot
// Endpoint: POST /api/chatbot/message
// Request: { message: string, conversationId?: string }
// Response: { success: boolean, response: string, conversationId: string, timestamp: string }
export const sendChatMessage = async (data: { message: string; conversationId?: string }) => {
  try {
    const response = await api.post('/api/chatbot/message', data);
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.error || error.message);
  }
}

// Description: Get conversation history
// Endpoint: GET /api/chatbot/history/:conversationId
// Request: { conversationId: string }
// Response: { success: boolean, conversation: { conversationId: string, messages: Array<{ content: string, isBot: boolean, timestamp: string }>, lastActivity: string } }
export const getChatHistory = async (conversationId: string) => {
  try {
    const response = await api.get(`/api/chatbot/history/${conversationId}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.error || error.message);
  }
}

// Description: Get price quote based on project requirements
// Endpoint: POST /api/chatbot/quote
// Request: { projectType: string, features: string[], budget?: string, timeline?: string }
// Response: { quote: { min: number, max: number }, description: string, timeline: string }
export const getProjectQuote = (data: { projectType: string; features: string[]; budget?: string; timeline?: string }) => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      const quotes = {
        'website': { min: 2500, max: 8000, timeline: '2-6 weeks' },
        'ecommerce': { min: 5000, max: 15000, timeline: '4-8 weeks' },
        'webapp': { min: 8000, max: 25000, timeline: '8-16 weeks' },
        'mobile': { min: 10000, max: 50000, timeline: '10-20 weeks' },
        'redesign': { min: 3000, max: 10000, timeline: '3-6 weeks' }
      };

      const projectType = data.projectType.toLowerCase();
      const baseQuote = quotes[projectType as keyof typeof quotes] || quotes.website;

      // Adjust based on features
      const featureMultiplier = 1 + (data.features.length * 0.15);

      // Adjust based on budget if provided
      let budgetAdjustment = 1;
      if (data.budget) {
        const budget = data.budget.toLowerCase();
        if (budget.includes('premium') || budget.includes('high-end')) {
          budgetAdjustment = 1.3;
        } else if (budget.includes('budget') || budget.includes('basic')) {
          budgetAdjustment = 0.8;
        }
      }

      const finalMultiplier = featureMultiplier * budgetAdjustment;

      resolve({
        quote: {
          min: Math.round(baseQuote.min * finalMultiplier),
          max: Math.round(baseQuote.max * finalMultiplier)
        },
        description: `Based on your requirements for a ${data.projectType} with ${data.features.length} additional features, here's our estimated quote. This includes project planning, design, development, testing, and deployment.`,
        timeline: baseQuote.timeline
      });
    }, 800);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.post('/api/chatbot/quote', data);
  // } catch (error) {
  //   throw new Error(error?.response?.data?.error || error.message);
  // }
}