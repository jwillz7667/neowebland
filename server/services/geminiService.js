const { GoogleGenerativeAI } = require('@google/generative-ai');

class GeminiService {
  constructor() {
    if (!process.env.GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY not found in environment variables');
      return;
    }
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
  }

  async generateWebsiteMockup(companyData) {
    try {
      console.log('Generating website mockup with Gemini AI for:', companyData.companyName);

      const prompt = `
You are an expert web designer and UX/UI specialist. Generate a comprehensive, professional website mockup for the following company:

Company Name: ${companyData.companyName}
Industry: ${companyData.industry}
Description: ${companyData.description}
Target Audience: ${companyData.targetAudience || 'General public'}
Preferred Colors: ${companyData.preferredColors || 'Modern and professional'}
Website Type: ${companyData.websiteType || 'Business website'}
Desired Features: ${companyData.features || 'Standard business features'}

Generate a detailed mockup response in the following JSON format:
{
  "header": {
    "logo": "Company logo concept",
    "navigation": ["Home", "About", "Services", "Portfolio", "Contact"],
    "style": "Navigation bar style description"
  },
  "hero": {
    "title": "Compelling hero headline",
    "subtitle": "Engaging subtitle",
    "cta": "Primary call-to-action text",
    "backgroundConcept": "Hero background concept",
    "layout": "Hero section layout description"
  },
  "sections": [
    {
      "name": "About Us",
      "content": "Section content description",
      "layout": "Layout concept for this section"
    },
    {
      "name": "Services",
      "content": "Services section content",
      "layout": "Services layout concept"
    },
    {
      "name": "Portfolio/Gallery",
      "content": "Portfolio content description",
      "layout": "Portfolio layout concept"
    },
    {
      "name": "Testimonials",
      "content": "Testimonials section concept",
      "layout": "Testimonials layout"
    },
    {
      "name": "Contact",
      "content": "Contact section details",
      "layout": "Contact layout concept"
    }
  ],
  "designSystem": {
    "colorPalette": {
      "primary": "#hex-color",
      "secondary": "#hex-color",
      "accent": "#hex-color",
      "background": "#hex-color",
      "text": "#hex-color"
    },
    "typography": {
      "headings": "Font family for headings",
      "body": "Font family for body text",
      "style": "Typography style description"
    },
    "layoutStyle": "Overall layout approach",
    "visualStyle": "Visual design approach"
  },
  "features": [
    "Responsive mobile-first design",
    "SEO optimization",
    "Fast loading performance",
    "Accessibility compliance",
    "Contact form integration",
    "Social media integration"
  ],
  "technicalRecommendations": [
    "Recommended technologies",
    "Performance optimizations",
    "Security considerations"
  ],
  "contentStrategy": {
    "tone": "Brand voice and tone",
    "messaging": "Key messaging strategy",
    "seoKeywords": ["keyword1", "keyword2", "keyword3"]
  }
}

Make sure the mockup is:
1. Industry-specific and tailored to the business
2. Modern and professional
3. User-experience focused
4. Conversion-optimized
5. Technically sound
6. Visually appealing

Respond ONLY with the JSON object, no additional text.
`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      console.log('Raw Gemini response:', text);

      // Parse the JSON response
      let mockupData;
      try {
        // Clean the response to extract JSON
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          mockupData = JSON.parse(jsonMatch[0]);
        } else {
          throw new Error('No JSON found in response');
        }
      } catch (parseError) {
        console.error('Error parsing Gemini response:', parseError);
        throw new Error('Failed to parse AI response');
      }

      console.log('Parsed mockup data:', JSON.stringify(mockupData, null, 2));
      return mockupData;

    } catch (error) {
      console.error('Error generating mockup with Gemini:', error);
      throw new Error(`Failed to generate mockup: ${error.message}`);
    }
  }

  async generateProjectQuote(projectData) {
    try {
      console.log('Generating project quote with Gemini AI for:', projectData.companyName);

      const prompt = `
You are an expert web development project manager and pricing specialist. Generate a detailed, accurate project quote for the following website project:

Company: ${projectData.companyName}
Industry: ${projectData.industry}
Description: ${projectData.description}
Website Type: ${projectData.websiteType || 'Business website'}
Features: ${projectData.features || 'Standard features'}
Mockup Details: ${JSON.stringify(projectData.mockup)}

Consider the following factors for pricing:
- Industry complexity and requirements
- Website type and functionality
- Custom features and integrations
- Design complexity
- Development time
- Testing and deployment
- Ongoing maintenance

Generate a comprehensive quote in the following JSON format:
{
  "pricing": {
    "designCost": 0000,
    "developmentCost": 0000,
    "featuresCost": 0000,
    "testingCost": 0000,
    "totalCost": 0000
  },
  "timeline": {
    "design": "X weeks",
    "development": "X weeks",
    "testing": "X weeks",
    "total": "X-X weeks"
  },
  "breakdown": [
    {
      "phase": "Discovery & Planning",
      "duration": "X weeks",
      "cost": 0000,
      "description": "Detailed description"
    },
    {
      "phase": "UI/UX Design",
      "duration": "X weeks", 
      "cost": 0000,
      "description": "Design phase details"
    },
    {
      "phase": "Frontend Development",
      "duration": "X weeks",
      "cost": 0000,
      "description": "Frontend development details"
    },
    {
      "phase": "Backend Development",
      "duration": "X weeks",
      "cost": 0000,
      "description": "Backend development details"
    },
    {
      "phase": "Testing & Deployment",
      "duration": "X weeks",
      "cost": 0000,
      "description": "Testing and deployment details"
    }
  ],
  "included": [
    "What's included in the quote"
  ],
  "optional": [
    {
      "feature": "Optional feature name",
      "cost": 0000,
      "description": "Feature description"
    }
  ],
  "recommendations": [
    "Professional recommendations for the project"
  ],
  "nextSteps": [
    "Recommended next steps"
  ]
}

Base pricing should be realistic for ${new Date().getFullYear()} market rates. Consider:
- Simple business sites: $3,000-$8,000
- E-commerce sites: $8,000-$25,000
- Complex web applications: $15,000-$50,000+
- Enterprise solutions: $25,000-$100,000+

Respond ONLY with the JSON object, no additional text.
`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      console.log('Raw Gemini quote response:', text);

      // Parse the JSON response
      let quoteData;
      try {
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          quoteData = JSON.parse(jsonMatch[0]);
        } else {
          throw new Error('No JSON found in response');
        }
      } catch (parseError) {
        console.error('Error parsing Gemini quote response:', parseError);
        throw new Error('Failed to parse AI quote response');
      }

      console.log('Parsed quote data:', JSON.stringify(quoteData, null, 2));
      return quoteData;

    } catch (error) {
      console.error('Error generating quote with Gemini:', error);
      throw new Error(`Failed to generate quote: ${error.message}`);
    }
  }
}

module.exports = new GeminiService();