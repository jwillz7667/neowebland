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
You are an expert web designer, UX/UI specialist, and copywriter. Generate a comprehensive, professional website mockup with SPECIFIC, REALISTIC content for the following company:

Company Name: ${companyData.companyName}
Industry: ${companyData.industry}
Description: ${companyData.description}
Target Audience: ${companyData.targetAudience || 'General public'}
Preferred Colors: ${companyData.preferredColors || 'Modern and professional'}
Website Type: ${companyData.websiteType || 'Business website'}
Desired Features: ${companyData.features || 'Standard business features'}

IMPORTANT: Generate ACTUAL, REALISTIC content - not placeholders. Use the specific company name throughout all content.

Generate a detailed mockup response in the following JSON format:
{
  "companyInfo": {
    "name": "${companyData.companyName}",
    "tagline": "Compelling, industry-specific tagline for ${companyData.companyName}",
    "description": "Professional company description (2-3 sentences)",
    "mission": "Company mission statement",
    "founded": "Realistic founding year",
    "location": "Realistic business location"
  },
  "header": {
    "logo": "${companyData.companyName}",
    "logoStyle": "Detailed logo design concept and styling",
    "navigation": ["Home", "About", "Services", "Portfolio", "Contact"],
    "style": "Modern, clean navigation with hover effects",
    "layout": "Horizontal navigation bar with company logo on left"
  },
  "hero": {
    "title": "Powerful, specific headline for ${companyData.companyName} (use actual company name)",
    "subtitle": "Engaging 1-2 sentence subtitle that speaks to their specific industry and value proposition",
    "cta": "Action-oriented button text",
    "secondaryCta": "Secondary action text",
    "backgroundConcept": "Specific background design concept",
    "layout": "Hero section layout with call-to-action positioning",
    "heroImage": "Detailed description of hero image/graphics for this specific industry"
  },
  "sections": [
    {
      "name": "About ${companyData.companyName}",
      "title": "Industry-specific section title",
      "content": "2-3 paragraphs of realistic content about ${companyData.companyName}, their expertise, and why clients should choose them",
      "highlights": ["Key point 1", "Key point 2", "Key point 3"],
      "layout": "Two-column layout with text and image",
      "visual": "Specific visual/image description for this section"
    },
    {
      "name": "Our Services",
      "title": "Services We Provide",
      "content": "Overview paragraph about ${companyData.companyName}'s service offerings",
      "services": [
        {
          "name": "Service 1 name (industry-specific)",
          "description": "Detailed service description",
          "features": ["Feature 1", "Feature 2", "Feature 3"]
        },
        {
          "name": "Service 2 name (industry-specific)", 
          "description": "Detailed service description",
          "features": ["Feature 1", "Feature 2", "Feature 3"]
        },
        {
          "name": "Service 3 name (industry-specific)",
          "description": "Detailed service description", 
          "features": ["Feature 1", "Feature 2", "Feature 3"]
        }
      ],
      "layout": "Three-column grid with service cards",
      "visual": "Icons and imagery for each service"
    },
    {
      "name": "Why Choose ${companyData.companyName}",
      "title": "Why Choose ${companyData.companyName}",
      "content": "Compelling paragraph about competitive advantages",
      "benefits": [
        {
          "title": "Benefit 1 (industry-specific)",
          "description": "Detailed benefit description",
          "icon": "Relevant icon description"
        },
        {
          "title": "Benefit 2 (industry-specific)",
          "description": "Detailed benefit description", 
          "icon": "Relevant icon description"
        },
        {
          "title": "Benefit 3 (industry-specific)",
          "description": "Detailed benefit description",
          "icon": "Relevant icon description"
        }
      ],
      "layout": "Grid layout with icons and descriptions"
    },
    {
      "name": "Client Testimonials",
      "title": "What Our Clients Say",
      "content": "Introduction to testimonials",
      "testimonials": [
        {
          "quote": "Realistic, specific testimonial about ${companyData.companyName}",
          "author": "Realistic client name",
          "position": "Job title",
          "company": "Company name",
          "rating": 5
        },
        {
          "quote": "Another realistic testimonial highlighting specific benefits",
          "author": "Another client name", 
          "position": "Job title",
          "company": "Company name",
          "rating": 5
        }
      ],
      "layout": "Testimonial cards with photos and ratings"
    },
    {
      "name": "Contact ${companyData.companyName}",
      "title": "Get In Touch",
      "content": "Encouraging paragraph about contacting ${companyData.companyName}",
      "contactInfo": {
        "phone": "Realistic phone number format",
        "email": "professional@${companyData.companyName.toLowerCase().replace(/\\s+/g, '')}.com",
        "address": "Realistic business address",
        "hours": "Business hours"
      },
      "form": {
        "fields": ["Name", "Email", "Phone", "Service Interest", "Message"],
        "submitText": "Get Free Consultation"
      },
      "layout": "Split layout with contact form and contact information"
    }
  ],
  "designSystem": {
    "colorPalette": {
      "primary": "Professional hex color for ${companyData.industry}",
      "secondary": "Complementary hex color",
      "accent": "Accent hex color",
      "background": "Background hex color",
      "text": "Text hex color",
      "textLight": "Light text hex color",
      "success": "Success green hex",
      "neutral": "Neutral gray hex"
    },
    "typography": {
      "headings": "Professional font family (e.g., 'Poppins', 'Inter', 'Montserrat')",
      "body": "Readable font family (e.g., 'Open Sans', 'Source Sans Pro')",
      "headingWeights": "Font weights for headings",
      "sizes": {
        "h1": "3.5rem",
        "h2": "2.5rem", 
        "h3": "1.75rem",
        "body": "1rem",
        "small": "0.875rem"
      }
    },
    "spacing": {
      "sectionPadding": "5rem",
      "elementSpacing": "2rem",
      "cardPadding": "2rem"
    },
    "borderRadius": "0.5rem",
    "shadows": "Professional shadow system",
    "layoutStyle": "Modern, clean layout with generous whitespace",
    "visualStyle": "Professional, conversion-focused design"
  },
  "responsiveDesign": {
    "mobile": {
      "navigation": "Hamburger menu",
      "heroLayout": "Single column with adjusted text sizes",
      "sectionsLayout": "Stacked sections with mobile-optimized spacing"
    },
    "tablet": {
      "navigation": "Condensed horizontal navigation",
      "heroLayout": "Adjusted hero with balanced text and visual",
      "sectionsLayout": "Two-column where appropriate"
    }
  },
  "features": [
    "Responsive mobile-first design",
    "SEO optimization with ${companyData.companyName} branding",
    "Fast loading performance",
    "Accessibility compliance (WCAG 2.1)",
    "Contact form with validation",
    "Social media integration",
    "Google Analytics integration",
    "SSL security certificate",
    "Industry-specific features for ${companyData.industry}"
  ],
  "technicalRecommendations": [
    "Modern framework (React/Next.js or similar)",
    "Performance optimization techniques",
    "SEO best practices implementation",
    "Security considerations for ${companyData.industry}",
    "Content Management System integration"
  ],
  "contentStrategy": {
    "tone": "Professional, trustworthy, and ${companyData.industry}-focused",
    "messaging": "Key messaging strategy emphasizing ${companyData.companyName}'s unique value",
    "seoKeywords": ["Industry-specific keyword 1", "Industry-specific keyword 2", "${companyData.companyName}", "Local + industry", "Service + location"],
    "callsToAction": ["Primary CTA", "Secondary CTA", "Contact CTA"]
  },
  "additionalPages": [
    {
      "name": "About Us",
      "purpose": "Detailed company story and team information",
      "keyContent": "Company history, team bios, mission/vision"
    },
    {
      "name": "Services Detail",
      "purpose": "In-depth service descriptions",
      "keyContent": "Service processes, pricing, case studies"
    },
    {
      "name": "Portfolio/Case Studies", 
      "purpose": "Showcase past work and results",
      "keyContent": "Project examples, before/after, client results"
    },
    {
      "name": "Blog/Resources",
      "purpose": "Industry insights and thought leadership",
      "keyContent": "Industry articles, tips, company news"
    }
  ]
}

Make the mockup extremely professional and industry-specific. Use realistic content that a real ${companyData.industry} business would have. Include specific details, actual service names, realistic pricing considerations, and professional copy throughout.

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