// Professional Website Templates for Different Business Types
class WebsiteTemplates {
  
  static getTemplateByIndustry(industry, websiteType) {
    const industryLower = industry.toLowerCase();
    const typeLower = websiteType?.toLowerCase() || 'business';

    // Map industries to template types
    if (industryLower.includes('restaurant') || industryLower.includes('food') || industryLower.includes('cafe')) {
      return this.restaurantTemplate;
    } else if (industryLower.includes('ecommerce') || industryLower.includes('retail') || industryLower.includes('shop') || typeLower.includes('ecommerce')) {
      return this.ecommerceTemplate;
    } else if (industryLower.includes('health') || industryLower.includes('medical') || industryLower.includes('doctor') || industryLower.includes('clinic')) {
      return this.healthcareTemplate;
    } else if (industryLower.includes('creative') || industryLower.includes('design') || industryLower.includes('portfolio') || industryLower.includes('agency')) {
      return this.creativeTemplate;
    } else if (industryLower.includes('tech') || industryLower.includes('software') || industryLower.includes('saas') || industryLower.includes('app')) {
      return this.techTemplate;
    } else if (industryLower.includes('real estate') || industryLower.includes('property') || industryLower.includes('realtor')) {
      return this.realEstateTemplate;
    } else {
      return this.professionalTemplate; // Default for most businesses
    }
  }

  static get professionalTemplate() {
    return {
      templateId: 'professional',
      name: 'Professional Business',
      description: 'Clean, corporate design perfect for professional services',
      layout: {
        type: 'corporate',
        headerStyle: 'fixed-navigation',
        heroStyle: 'split-content',
        sectionLayout: 'alternating'
      },
      colorScheme: {
        primary: '#2c3e50',
        secondary: '#3498db', 
        accent: '#e74c3c',
        background: '#ffffff',
        surface: '#f8f9fa',
        text: '#2c3e50',
        textLight: '#7f8c8d',
        success: '#27ae60',
        neutral: '#ecf0f1'
      },
      typography: {
        headings: 'Inter',
        body: 'Open Sans',
        sizes: {
          h1: '3.5rem',
          h2: '2.75rem',
          h3: '2rem',
          h4: '1.5rem',
          body: '1rem',
          small: '0.875rem'
        }
      },
      sections: [
        {
          name: 'hero',
          type: 'split-hero',
          layout: 'image-right',
          style: 'professional'
        },
        {
          name: 'about',
          type: 'text-image',
          layout: 'two-column',
          style: 'clean'
        },
        {
          name: 'services',
          type: 'feature-grid',
          layout: 'three-column',
          style: 'cards'
        },
        {
          name: 'testimonials',
          type: 'testimonial-carousel',
          layout: 'centered',
          style: 'quotes'
        },
        {
          name: 'contact',
          type: 'contact-form',
          layout: 'split',
          style: 'modern'
        }
      ],
      spacing: {
        sectionPadding: '5rem',
        containerPadding: '2rem',
        elementSpacing: '2rem'
      }
    };
  }

  static get restaurantTemplate() {
    return {
      templateId: 'restaurant',
      name: 'Restaurant & Food Service',
      description: 'Warm, inviting design perfect for restaurants and food businesses',
      layout: {
        type: 'hospitality',
        headerStyle: 'centered-logo',
        heroStyle: 'full-background',
        sectionLayout: 'flowing'
      },
      colorScheme: {
        primary: '#8b4513',
        secondary: '#d2691e',
        accent: '#ff6b35',
        background: '#fffef7',
        surface: '#f5f5dc',
        text: '#3c2415',
        textLight: '#8b7355',
        success: '#228b22',
        neutral: '#f0e68c'
      },
      typography: {
        headings: 'Playfair Display',
        body: 'Lato',
        sizes: {
          h1: '4rem',
          h2: '3rem',
          h3: '2.25rem',
          h4: '1.75rem',
          body: '1.1rem',
          small: '0.9rem'
        }
      },
      sections: [
        {
          name: 'hero',
          type: 'full-background-hero',
          layout: 'centered-overlay',
          style: 'dramatic'
        },
        {
          name: 'menu-preview',
          type: 'menu-showcase',
          layout: 'grid',
          style: 'elegant'
        },
        {
          name: 'about',
          type: 'story-section',
          layout: 'narrative',
          style: 'warm'
        },
        {
          name: 'gallery',
          type: 'image-gallery',
          layout: 'masonry',
          style: 'atmospheric'
        },
        {
          name: 'reservations',
          type: 'booking-form',
          layout: 'prominent',
          style: 'inviting'
        },
        {
          name: 'contact',
          type: 'location-contact',
          layout: 'map-info',
          style: 'welcoming'
        }
      ],
      spacing: {
        sectionPadding: '4rem',
        containerPadding: '1.5rem',
        elementSpacing: '1.5rem'
      }
    };
  }

  static get ecommerceTemplate() {
    return {
      templateId: 'ecommerce',
      name: 'E-commerce & Retail',
      description: 'Modern, conversion-focused design for online stores',
      layout: {
        type: 'ecommerce',
        headerStyle: 'utility-navigation',
        heroStyle: 'product-showcase',
        sectionLayout: 'conversion-focused'
      },
      colorScheme: {
        primary: '#6366f1',
        secondary: '#8b5cf6',
        accent: '#f59e0b',
        background: '#ffffff',
        surface: '#f9fafb',
        text: '#111827',
        textLight: '#6b7280',
        success: '#10b981',
        neutral: '#e5e7eb'
      },
      typography: {
        headings: 'Poppins',
        body: 'Source Sans Pro',
        sizes: {
          h1: '3rem',
          h2: '2.5rem',
          h3: '2rem',
          h4: '1.5rem',
          body: '1rem',
          small: '0.875rem'
        }
      },
      sections: [
        {
          name: 'hero',
          type: 'promotional-hero',
          layout: 'product-focus',
          style: 'conversion'
        },
        {
          name: 'featured-products',
          type: 'product-grid',
          layout: 'four-column',
          style: 'modern-cards'
        },
        {
          name: 'categories',
          type: 'category-showcase',
          layout: 'image-tiles',
          style: 'interactive'
        },
        {
          name: 'features',
          type: 'trust-signals',
          layout: 'icon-grid',
          style: 'reassuring'
        },
        {
          name: 'testimonials',
          type: 'review-showcase',
          layout: 'social-proof',
          style: 'authentic'
        }
      ],
      spacing: {
        sectionPadding: '3rem',
        containerPadding: '1rem',
        elementSpacing: '1.5rem'
      }
    };
  }

  static get healthcareTemplate() {
    return {
      templateId: 'healthcare',
      name: 'Healthcare & Medical',
      description: 'Trust-building, professional design for healthcare providers',
      layout: {
        type: 'healthcare',
        headerStyle: 'professional-nav',
        heroStyle: 'trust-building',
        sectionLayout: 'informational'
      },
      colorScheme: {
        primary: '#0ea5e9',
        secondary: '#06b6d4',
        accent: '#10b981',
        background: '#ffffff',
        surface: '#f0f9ff',
        text: '#0f172a',
        textLight: '#64748b',
        success: '#22c55e',
        neutral: '#e2e8f0'
      },
      typography: {
        headings: 'Merriweather',
        body: 'Open Sans',
        sizes: {
          h1: '3.25rem',
          h2: '2.5rem',
          h3: '2rem',
          h4: '1.5rem',
          body: '1.1rem',
          small: '0.9rem'
        }
      },
      sections: [
        {
          name: 'hero',
          type: 'trust-hero',
          layout: 'professional-image',
          style: 'reassuring'
        },
        {
          name: 'services',
          type: 'medical-services',
          layout: 'detailed-grid',
          style: 'informative'
        },
        {
          name: 'about-doctor',
          type: 'professional-bio',
          layout: 'credential-focus',
          style: 'trustworthy'
        },
        {
          name: 'appointment',
          type: 'booking-system',
          layout: 'easy-access',
          style: 'convenient'
        },
        {
          name: 'testimonials',
          type: 'patient-reviews',
          layout: 'credible',
          style: 'authentic'
        }
      ],
      spacing: {
        sectionPadding: '4rem',
        containerPadding: '2rem',
        elementSpacing: '2rem'
      }
    };
  }

  static get creativeTemplate() {
    return {
      templateId: 'creative',
      name: 'Creative & Portfolio',
      description: 'Bold, artistic design for creative professionals',
      layout: {
        type: 'portfolio',
        headerStyle: 'minimal-nav',
        heroStyle: 'artistic-statement',
        sectionLayout: 'showcase-focused'
      },
      colorScheme: {
        primary: '#1f2937',
        secondary: '#f59e0b',
        accent: '#ef4444',
        background: '#ffffff',
        surface: '#f9fafb',
        text: '#111827',
        textLight: '#6b7280',
        success: '#10b981',
        neutral: '#e5e7eb'
      },
      typography: {
        headings: 'Montserrat',
        body: 'Nunito Sans',
        sizes: {
          h1: '4rem',
          h2: '3rem',
          h3: '2.25rem',
          h4: '1.75rem',
          body: '1rem',
          small: '0.875rem'
        }
      },
      sections: [
        {
          name: 'hero',
          type: 'creative-hero',
          layout: 'bold-statement',
          style: 'artistic'
        },
        {
          name: 'portfolio',
          type: 'work-showcase',
          layout: 'masonry-grid',
          style: 'visual-impact'
        },
        {
          name: 'about',
          type: 'creative-story',
          layout: 'personal',
          style: 'engaging'
        },
        {
          name: 'services',
          type: 'capability-showcase',
          layout: 'visual-grid',
          style: 'impressive'
        },
        {
          name: 'contact',
          type: 'collaboration-invite',
          layout: 'engaging',
          style: 'personal'
        }
      ],
      spacing: {
        sectionPadding: '5rem',
        containerPadding: '2rem',
        elementSpacing: '2.5rem'
      }
    };
  }

  static get techTemplate() {
    return {
      templateId: 'tech',
      name: 'Technology & SaaS',
      description: 'Modern, innovative design for tech companies',
      layout: {
        type: 'tech',
        headerStyle: 'modern-nav',
        heroStyle: 'product-demo',
        sectionLayout: 'feature-focused'
      },
      colorScheme: {
        primary: '#4f46e5',
        secondary: '#06b6d4',
        accent: '#f59e0b',
        background: '#ffffff',
        surface: '#f8fafc',
        text: '#0f172a',
        textLight: '#64748b',
        success: '#10b981',
        neutral: '#e2e8f0'
      },
      typography: {
        headings: 'Inter',
        body: 'Inter',
        sizes: {
          h1: '3.75rem',
          h2: '3rem',
          h3: '2.25rem',
          h4: '1.75rem',
          body: '1rem',
          small: '0.875rem'
        }
      },
      sections: [
        {
          name: 'hero',
          type: 'product-hero',
          layout: 'demo-focused',
          style: 'innovative'
        },
        {
          name: 'features',
          type: 'feature-showcase',
          layout: 'interactive-grid',
          style: 'modern'
        },
        {
          name: 'demo',
          type: 'product-demo',
          layout: 'video-showcase',
          style: 'engaging'
        },
        {
          name: 'pricing',
          type: 'pricing-table',
          layout: 'comparison',
          style: 'clear'
        },
        {
          name: 'testimonials',
          type: 'user-testimonials',
          layout: 'social-proof',
          style: 'credible'
        }
      ],
      spacing: {
        sectionPadding: '4rem',
        containerPadding: '2rem',
        elementSpacing: '2rem'
      }
    };
  }

  static get realEstateTemplate() {
    return {
      templateId: 'realestate',
      name: 'Real Estate',
      description: 'Luxurious, trustworthy design for real estate professionals',
      layout: {
        type: 'realestate',
        headerStyle: 'elegant-nav',
        heroStyle: 'property-showcase',
        sectionLayout: 'property-focused'
      },
      colorScheme: {
        primary: '#1e40af',
        secondary: '#059669',
        accent: '#d97706',
        background: '#ffffff',
        surface: '#f8fafc',
        text: '#1e293b',
        textLight: '#64748b',
        success: '#10b981',
        neutral: '#e2e8f0'
      },
      typography: {
        headings: 'Crimson Text',
        body: 'Source Sans Pro',
        sizes: {
          h1: '3.5rem',
          h2: '2.75rem',
          h3: '2.25rem',
          h4: '1.75rem',
          body: '1.1rem',
          small: '0.9rem'
        }
      },
      sections: [
        {
          name: 'hero',
          type: 'property-hero',
          layout: 'search-focused',
          style: 'elegant'
        },
        {
          name: 'featured-properties',
          type: 'property-grid',
          layout: 'three-column',
          style: 'luxury'
        },
        {
          name: 'about-agent',
          type: 'agent-profile',
          layout: 'professional',
          style: 'trustworthy'
        },
        {
          name: 'services',
          type: 'real-estate-services',
          layout: 'detailed',
          style: 'comprehensive'
        },
        {
          name: 'testimonials',
          type: 'client-success',
          layout: 'story-focused',
          style: 'personal'
        }
      ],
      spacing: {
        sectionPadding: '4rem',
        containerPadding: '2rem',
        elementSpacing: '2rem'
      }
    };
  }
}

module.exports = WebsiteTemplates; 