const { GoogleGenerativeAI } = require('@google/generative-ai');
const WebsiteTemplates = require('./websiteTemplates');

class GeminiService {
  constructor() {
    this.isAvailable = false;
    this.genAI = null;
    this.model = null;
    
    if (!process.env.GEMINI_API_KEY) {
      console.warn('⚠️  GEMINI_API_KEY not found - AI features will use fallback responses');
      console.warn('💡 Set GEMINI_API_KEY in Railway variables to enable full AI functionality');
      return;
    }
    
    try {
      this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      this.model = this.genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
      this.isAvailable = true;
      console.log('✅ Gemini AI service initialized successfully');
    } catch (error) {
      console.error('❌ Failed to initialize Gemini AI:', error.message);
      console.warn('🔄 AI features will use fallback responses');
    }
  }

  // Check if AI service is available
  isServiceAvailable() {
    return this.isAvailable && this.model !== null;
  }

  // Generate fallback mockup when AI is unavailable
  generateFallbackMockup(companyData) {
    console.log('🔄 Generating fallback mockup for:', companyData.companyName);
    
    // Get the appropriate template based on industry
    const template = WebsiteTemplates.getTemplateByIndustry(companyData.industry, companyData.websiteType);
    
    return {
      templateUsed: template.templateId,
      companyInfo: {
        name: companyData.companyName,
        tagline: `Professional ${companyData.industry} Services`,
        description: `${companyData.companyName} is a leading provider of ${companyData.industry} solutions, dedicated to delivering exceptional results for our clients.`,
        mission: `To provide innovative ${companyData.industry} solutions that drive success`,
        founded: "2020",
        location: "Minneapolis, MN",
        phone: "(612) 555-0123",
        email: `info@${companyData.companyName.toLowerCase().replace(/\s+/g, '')}.com`,
        address: "123 Business Ave, Minneapolis, MN 55404"
      },
      header: {
        logo: companyData.companyName,
        logoStyle: `Professional logo design for ${companyData.industry}`,
        navigation: ["Home", "About", "Services", "Portfolio", "Contact"],
        style: template.layout.headerStyle,
        layout: "Clean, professional header design"
      },
      hero: {
        title: `Leading ${companyData.industry} Solutions`,
        subtitle: `Experience excellence with ${companyData.companyName}'s professional services`,
        cta: "Get Started Today",
        secondaryCta: "Learn More",
        backgroundConcept: `Hero background for ${companyData.industry} business`,
        layout: template.layout.heroStyle,
        heroImage: `Professional imagery showcasing ${companyData.industry} services`
      },
      sections: [
        {
          name: `About ${companyData.companyName}`,
          title: "About Our Company",
          content: `${companyData.companyName} specializes in ${companyData.industry} services with a commitment to quality and innovation. Our experienced team delivers results that exceed expectations.`,
          highlights: [
            "Expert team with years of experience",
            "Quality-focused approach",
            "Customer satisfaction guaranteed"
          ],
          layout: "Professional about section",
          visual: `About section imagery for ${companyData.industry}`
        },
        {
          name: "Our Services",
          title: "What We Offer",
          content: `Comprehensive ${companyData.industry} services tailored to your needs.`,
          services: [
            {
              name: `Core ${companyData.industry} Service`,
              description: `Professional ${companyData.industry} solutions designed for your business`,
              features: ["Professional quality", "Timely delivery", "Expert support"],
              icon: "Service icon"
            },
            {
              name: `Advanced ${companyData.industry} Solutions`,
              description: `Advanced solutions for complex requirements`,
              features: ["Custom approach", "Scalable solutions", "Ongoing support"],
              icon: "Advanced icon"
            },
            {
              name: `Consulting Services`,
              description: `Expert consultation and strategic planning`,
              features: ["Strategic planning", "Expert advice", "Implementation support"],
              icon: "Consulting icon"
            }
          ],
          layout: "Grid layout with service cards",
          visual: `Service imagery for ${companyData.industry}`
        }
      ],
      designSystem: {
        templateId: template.templateId,
        colorPalette: template.colorScheme,
        typography: template.typography,
        spacing: template.spacing,
        layout: template.layout,
        customizations: "Template-based design system"
      },
      features: [
        "Responsive mobile-first design",
        "SEO optimization",
        "Fast loading performance",
        "Professional template foundation",
        "Industry-appropriate design"
      ],
      technicalRecommendations: [
        "Modern web framework",
        "Performance optimization",
        "SEO best practices",
        "Security considerations",
        "Mobile responsiveness"
      ],
      contentStrategy: {
        tone: "Professional and trustworthy",
        messaging: `Expert ${companyData.industry} services`,
        seoKeywords: [companyData.industry, "professional", "services", "quality"],
        callsToAction: ["Contact Us", "Get Quote", "Learn More"]
      },
      isAIGenerated: false,
      fallbackNotice: "This mockup was generated using template-based fallback due to AI service unavailability"
    };
  }

  async generateWebsiteMockup(companyData) {
    try {
      console.log('Generating website mockup for:', companyData.companyName);

      // Check if AI service is available
      if (!this.isServiceAvailable()) {
        console.warn('🔄 AI service unavailable, using fallback mockup generation');
        return this.generateFallbackMockup(companyData);
      }

      // Get the appropriate template based on industry
      const template = WebsiteTemplates.getTemplateByIndustry(companyData.industry, companyData.websiteType);
      
      console.log('Selected template:', template.templateId, '-', template.name);

      const prompt = `
You are an expert web designer and copywriter. You have been provided with a professional website template for ${template.name}. Your task is to customize this template with SPECIFIC, REALISTIC content for the following company:

COMPANY INFORMATION:
- Company Name: ${companyData.companyName}
- Industry: ${companyData.industry}
- Description: ${companyData.description}
- Target Audience: ${companyData.targetAudience || 'General public'}
- Preferred Colors: ${companyData.preferredColors || 'Use template defaults'}
- Website Type: ${companyData.websiteType || 'Business website'}
- Desired Features: ${companyData.features || 'Standard business features'}

SELECTED TEMPLATE: ${template.name}
Template Description: ${template.description}
Template Type: ${template.templateId}

CUSTOMIZATION INSTRUCTIONS:
1. Use the template's structure and design system as the foundation
2. Generate REALISTIC, industry-specific content for ${companyData.companyName}
3. Customize colors if user provided preferences, otherwise use template colors
4. Create specific services/products relevant to ${companyData.industry}
5. Generate authentic testimonials and contact information
6. Ensure all content is professional and conversion-focused

BASE TEMPLATE STRUCTURE:
${JSON.stringify(template, null, 2)}

Generate a customized mockup response that enhances this template with specific content in the following JSON format:
{
  "templateUsed": "${template.templateId}",
  "companyInfo": {
    "name": "${companyData.companyName}",
    "tagline": "Compelling, industry-specific tagline for ${companyData.companyName}",
    "description": "Professional company description (2-3 sentences)",
    "mission": "Company mission statement that aligns with ${companyData.industry}",
    "founded": "Realistic founding year",
    "location": "Realistic business location based on ${companyData.industry}",
    "phone": "Professional phone number format",
    "email": "professional@${companyData.companyName.toLowerCase().replace(/\\s+/g, '')}.com",
    "address": "Realistic business address"
  },
  "header": {
    "logo": "${companyData.companyName}",
    "logoStyle": "Professional logo concept based on ${template.name} template style",
    "navigation": ["Home", "About", "Services", "Portfolio", "Contact"],
    "style": "${template.layout.headerStyle}",
    "layout": "Based on ${template.name} template header design"
  },
  "hero": {
    "title": "Powerful, specific headline for ${companyData.companyName} (use actual company name)",
    "subtitle": "Engaging 1-2 sentence subtitle specific to ${companyData.industry}",
    "cta": "Action-oriented button text for ${companyData.industry}",
    "secondaryCta": "Secondary action text (if applicable)",
    "backgroundConcept": "Hero background concept matching ${template.name} style",
    "layout": "${template.layout.heroStyle}",
    "heroImage": "Detailed description of hero image/graphics for ${companyData.industry}"
  },
  "sections": [
    {
      "name": "About ${companyData.companyName}",
      "title": "Industry-specific section title",
      "content": "2-3 paragraphs of realistic content about ${companyData.companyName}, their expertise in ${companyData.industry}, and why clients should choose them",
      "highlights": ["Key benefit 1 for ${companyData.industry}", "Key benefit 2", "Key benefit 3"],
      "layout": "Based on template about section design",
      "visual": "Specific visual/image description for ${companyData.industry}"
    },
    {
      "name": "Our Services",
      "title": "Services We Provide",
      "content": "Overview paragraph about ${companyData.companyName}'s ${companyData.industry} services",
      "services": [
        {
          "name": "Primary service for ${companyData.industry}",
          "description": "Detailed service description relevant to ${companyData.industry}",
          "features": ["Service feature 1", "Service feature 2", "Service feature 3"],
          "icon": "Relevant icon description"
        },
        {
          "name": "Secondary service for ${companyData.industry}",
          "description": "Detailed service description",
          "features": ["Service feature 1", "Service feature 2", "Service feature 3"],
          "icon": "Relevant icon description"
        },
        {
          "name": "Additional service for ${companyData.industry}",
          "description": "Detailed service description",
          "features": ["Service feature 1", "Service feature 2", "Service feature 3"],
          "icon": "Relevant icon description"
        }
      ],
      "layout": "Based on template services section",
      "visual": "Service-specific imagery for ${companyData.industry}"
    },
    {
      "name": "Why Choose ${companyData.companyName}",
      "title": "Why Choose ${companyData.companyName}",
      "content": "Compelling paragraph about competitive advantages in ${companyData.industry}",
      "benefits": [
        {
          "title": "Industry-specific benefit 1",
          "description": "Detailed benefit description for ${companyData.industry}",
          "icon": "Relevant icon description"
        },
        {
          "title": "Industry-specific benefit 2", 
          "description": "Detailed benefit description",
          "icon": "Relevant icon description"
        },
        {
          "title": "Industry-specific benefit 3",
          "description": "Detailed benefit description",
          "icon": "Relevant icon description"
        }
      ],
      "layout": "Grid layout with icons"
    },
    {
      "name": "Client Testimonials",
      "title": "What Our Clients Say",
      "content": "Introduction to testimonials",
      "testimonials": [
        {
          "quote": "Realistic, specific testimonial about ${companyData.companyName}'s ${companyData.industry} services",
          "author": "Realistic client name",
          "position": "Job title relevant to ${companyData.industry}",
          "company": "Company name that would use ${companyData.industry} services",
          "rating": 5
        },
        {
          "quote": "Another realistic testimonial highlighting specific ${companyData.industry} benefits",
          "author": "Another client name",
          "position": "Job title",
          "company": "Company name",
          "rating": 5
        },
        {
          "quote": "Third testimonial focusing on results from ${companyData.companyName}",
          "author": "Third client name",
          "position": "Job title",
          "company": "Company name",
          "rating": 5
        }
      ],
      "layout": "Template testimonial layout"
    },
    {
      "name": "Contact ${companyData.companyName}",
      "title": "Get In Touch",
      "content": "Encouraging paragraph about contacting ${companyData.companyName}",
      "contactInfo": {
        "phone": "Realistic phone number format",
        "email": "professional@${companyData.companyName.toLowerCase().replace(/\\s+/g, '')}.com",
        "address": "Realistic business address for ${companyData.industry}",
        "hours": "Business hours appropriate for ${companyData.industry}"
      },
      "form": {
        "fields": ["Name", "Email", "Phone", "Service Interest", "Message"],
        "submitText": "Contact Us Today"
      },
      "layout": "Template contact layout"
    }
  ],
  "designSystem": {
    "templateId": "${template.templateId}",
    "colorPalette": ${JSON.stringify(template.colorScheme)},
    "typography": ${JSON.stringify(template.typography)},
    "spacing": ${JSON.stringify(template.spacing)},
    "layout": ${JSON.stringify(template.layout)},
    "customizations": "List any color/style customizations based on user preferences"
  },
  "features": [
    "Responsive mobile-first design using ${template.name} template",
    "SEO optimization for ${companyData.industry}",
    "Fast loading performance",
    "Accessibility compliance (WCAG 2.1)",
    "Contact form with validation",
    "Social media integration",
    "Google Analytics integration",
    "SSL security certificate",
    "Industry-specific features for ${companyData.industry}",
    "${template.name} template optimizations"
  ],
  "technicalRecommendations": [
    "Modern framework optimized for ${template.name} template",
    "Performance optimization for ${companyData.industry} websites",
    "SEO best practices for ${companyData.industry}",
    "Security considerations for ${companyData.industry}",
    "Template-specific technical requirements"
  ],
  "contentStrategy": {
    "tone": "${template.templateId} template tone optimized for ${companyData.industry}",
    "messaging": "Key messaging strategy for ${companyData.companyName} in ${companyData.industry}",
    "seoKeywords": ["${companyData.industry} keyword 1", "${companyData.industry} keyword 2", "${companyData.companyName}", "local + ${companyData.industry}", "service + location"],
    "callsToAction": ["Primary CTA for ${companyData.industry}", "Secondary CTA", "Contact CTA"]
  }
}

IMPORTANT: Make this extremely professional and industry-specific. Use realistic content that a real ${companyData.industry} business would have. The template provides the structure and design foundation - you provide the personalized, realistic content.

Respond ONLY with the JSON object, no additional text.
`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      console.log('Raw Gemini response length:', text.length);

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
        console.warn('🔄 Falling back to template-based mockup generation');
        return this.generateFallbackMockup(companyData);
      }

      // Add template information to the response
      mockupData.template = template;
      mockupData.isAIGenerated = true;
      
      console.log('✅ Generated AI-powered mockup using template:', template.templateId);
      return mockupData;

    } catch (error) {
      console.error('❌ Error generating mockup with Gemini:', error);
      console.warn('🔄 Falling back to template-based mockup generation');
      return this.generateFallbackMockup(companyData);
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