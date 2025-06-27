import React, { useState, useCallback } from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader } from '../ui/dialog';
import { 
  Maximize, 
  Monitor, 
  Smartphone, 
  Tablet, 
  Minimize, 
  ZoomIn,
  Eye,
  Palette,
  Code,
  X
} from 'lucide-react';

// Enhanced Type Definitions
interface TemplateInfo {
  templateId: string;
  name: string;
  description: string;
  colorScheme: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textLight: string;
    success: string;
    neutral: string;
  };
  typography: {
    headings: string;
    body: string;
    sizes: {
      h1: string;
      h2: string;
      h3: string;
      h4: string;
      body: string;
      small: string;
    };
  };
  spacing: {
    sectionPadding: string;
    containerPadding: string;
    elementSpacing: string;
  };
  layout: {
    type: string;
    headerStyle: string;
    heroStyle: string;
    sectionLayout: string;
  };
}

interface MockupData {
  templateUsed: string;
  template?: TemplateInfo;
  companyInfo: {
    name: string;
    tagline: string;
    description: string;
    phone: string;
    email: string;
    address: string;
  };
  header: {
    logo: string;
    navigation: string[];
    style: string;
    layout: string;
  };
  hero: {
    title: string;
    subtitle: string;
    cta: string;
    secondaryCta?: string;
    backgroundConcept: string;
    layout: string;
    heroImage: string;
  };
  sections: Array<{
    name: string;
    title: string;
    content: string;
    services?: ServiceItem[];
    testimonials?: TestimonialItem[];
    highlights?: string[];
    contactInfo?: ContactInfo;
    form?: FormConfig;
  }>;
  designSystem: {
    templateId: string;
    colorPalette: TemplateInfo['colorScheme'];
    typography: TemplateInfo['typography'];
    spacing: TemplateInfo['spacing'];
    layout: TemplateInfo['layout'];
    customizations?: string;
  };
  features: string[];
  technicalRecommendations: string[];
  contentStrategy: {
    tone: string;
    messaging: string;
    seoKeywords: string[];
    callsToAction: string[];
  };
}

interface QuoteData {
  projectType: string;
  timeline: string;
  budget: string;
  features: string[];
  timeline_details: string;
  included_services: string[];
  optional_additions: string[];
  total_cost: string;
  next_steps: string[];
}

interface ServiceItem {
  name: string;
  description: string;
  features?: string[];
}

interface TestimonialItem {
  quote: string;
  author: string;
  position?: string;
  company?: string;
}

interface ContactInfo {
  phone: string;
  email: string;
  address: string;
  hours?: string;
}

interface FormConfig {
  submitText?: string;
}



// Viewport Size Options
type ViewportSize = 'small' | 'medium' | 'large' | 'mobile' | 'tablet' | 'desktop';

interface ViewportConfig {
  name: string;
  width: string;
  scale: number;
  icon: React.ReactNode;
  description: string;
}

const viewportSizes: Record<ViewportSize, ViewportConfig> = {
  small: {
    name: 'Small',
    width: '400px',
    scale: 0.4,
    icon: <Minimize className="w-4 h-4" />,
    description: 'Overview scale (40%)'
  },
  medium: {
    name: 'Medium', 
    width: '600px',
    scale: 0.6,
    icon: <Monitor className="w-4 h-4" />,
    description: 'Default scale (60%)'
  },
  large: {
    name: 'Large',
    width: '800px',
    scale: 0.8,
    icon: <ZoomIn className="w-4 h-4" />,
    description: 'Detailed scale (80%)'
  },
  mobile: {
    name: 'Mobile',
    width: '375px',
    scale: 1,
    icon: <Smartphone className="w-4 h-4" />,
    description: 'Mobile view'
  },
  tablet: {
    name: 'Tablet',
    width: '768px',
    scale: 0.7,
    icon: <Tablet className="w-4 h-4" />,
    description: 'Tablet view'
  },
  desktop: {
    name: 'Desktop',
    width: '1200px',
    scale: 0.5,
    icon: <Monitor className="w-4 h-4" />,
    description: 'Desktop view'
  }
};

// Enhanced Mockup Renderer Component
const MockupRenderer: React.FC<{
  mockup: MockupData;
  viewportSize: ViewportSize;
  isFullScreen?: boolean;
}> = ({ mockup, viewportSize, isFullScreen = false }) => {
  const viewport = viewportSizes[viewportSize];
  const colors = mockup.designSystem.colorPalette;
  const typography = mockup.designSystem.typography;
  const spacing = mockup.designSystem.spacing;

  const containerStyle: React.CSSProperties = {
    width: isFullScreen ? '100%' : viewport.width,
    transform: isFullScreen ? 'none' : `scale(${viewport.scale})`,
    transformOrigin: 'top left',
    backgroundColor: colors.background,
    fontFamily: typography.body,
    color: colors.text,
    overflow: 'hidden',
    boxShadow: isFullScreen ? 'none' : '0 4px 20px rgba(0,0,0,0.1)',
    borderRadius: isFullScreen ? '0' : '8px',
    border: isFullScreen ? 'none' : '1px solid #e0e0e0'
  };

  const headerStyle: React.CSSProperties = {
    backgroundColor: colors.background,
    borderBottom: `1px solid ${colors.neutral}`,
    padding: '1rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'sticky',
    top: 0,
    zIndex: 10
  };

  const logoStyle: React.CSSProperties = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: colors.primary,
    fontFamily: typography.headings
  };

  const navStyle: React.CSSProperties = {
    display: 'flex',
    gap: '2rem',
    listStyle: 'none',
    margin: 0,
    padding: 0
  };

  const navItemStyle: React.CSSProperties = {
    color: colors.text,
    textDecoration: 'none',
    fontWeight: '500',
    transition: 'color 0.3s ease',
    cursor: 'pointer'
  };

  const heroStyle: React.CSSProperties = {
    background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
    color: 'white',
    padding: spacing.sectionPadding,
    textAlign: 'center',
    minHeight: '500px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  };

  const heroTitleStyle: React.CSSProperties = {
    fontSize: typography.sizes.h1,
    fontFamily: typography.headings,
    fontWeight: 'bold',
    marginBottom: '1rem',
    lineHeight: '1.2'
  };

  const heroSubtitleStyle: React.CSSProperties = {
    fontSize: typography.sizes.h4,
    marginBottom: '2rem',
    opacity: 0.9,
    maxWidth: '600px'
  };

  const ctaButtonStyle: React.CSSProperties = {
    backgroundColor: colors.accent,
    color: 'white',
    padding: '1rem 2rem',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'transform 0.3s ease',
    textDecoration: 'none',
    display: 'inline-block'
  };

  const sectionStyle: React.CSSProperties = {
    padding: spacing.sectionPadding,
    borderBottom: `1px solid ${colors.neutral}`
  };

  const sectionTitleStyle: React.CSSProperties = {
    fontSize: typography.sizes.h2,
    fontFamily: typography.headings,
    color: colors.primary,
    marginBottom: '2rem',
    textAlign: 'center'
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: colors.surface,
    padding: '2rem',
    borderRadius: '8px',
    border: `1px solid ${colors.neutral}`,
    marginBottom: '1rem',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  };

  const serviceGridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
    marginTop: '2rem'
  };

  const testimonialStyle: React.CSSProperties = {
    backgroundColor: colors.surface,
    padding: '2rem',
    borderRadius: '8px',
    borderLeft: `4px solid ${colors.primary}`,
    marginBottom: '2rem',
    fontStyle: 'italic'
  };

  const footerStyle: React.CSSProperties = {
    backgroundColor: colors.primary,
    color: 'white',
    padding: '3rem 2rem',
    textAlign: 'center'
  };

  return (
    <div style={containerStyle}>
      {/* Browser Chrome (only when not fullscreen) */}
      {!isFullScreen && (
        <div style={{
          backgroundColor: '#f0f0f0',
          padding: '0.5rem 1rem',
          borderBottom: '1px solid #ccc',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '0.875rem',
          color: '#666'
        }}>
          <div style={{
            display: 'flex',
            gap: '0.25rem'
          }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ff5f57' }}></div>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ffbd2e' }}></div>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#28ca42' }}></div>
          </div>
          <div style={{
            backgroundColor: 'white',
            padding: '0.25rem 0.75rem',
            borderRadius: '4px',
            flex: 1,
            textAlign: 'left',
            border: '1px solid #ddd'
          }}>
            https://www.{mockup.companyInfo.name.toLowerCase().replace(/\s+/g, '')}.com
          </div>
        </div>
      )}

      {/* Website Content */}
      <div style={{ height: isFullScreen ? '100vh' : 'auto', overflow: isFullScreen ? 'auto' : 'hidden' }}>
        {/* Header */}
        <header style={headerStyle}>
          <div style={logoStyle}>{mockup.header.logo}</div>
          <nav>
            <ul style={navStyle}>
              {mockup.header.navigation.map((item, index) => (
                <li key={index}>
                  <a href="#" style={navItemStyle}>{item}</a>
                </li>
              ))}
            </ul>
          </nav>
        </header>

        {/* Hero Section */}
        <section style={heroStyle}>
          <h1 style={heroTitleStyle}>{mockup.hero.title}</h1>
          <p style={heroSubtitleStyle}>{mockup.hero.subtitle}</p>
          <a href="#" style={ctaButtonStyle}>{mockup.hero.cta}</a>
        </section>

        {/* Sections */}
        {mockup.sections.map((section, index) => (
          <section key={index} style={sectionStyle}>
            <h2 style={sectionTitleStyle}>{section.title}</h2>
            
            {section.name.toLowerCase().includes('service') && section.services && (
              <div style={serviceGridStyle}>
                {section.services.map((service: ServiceItem, serviceIndex: number) => (
                  <div key={serviceIndex} style={cardStyle}>
                    <h3 style={{ 
                      color: colors.primary, 
                      fontFamily: typography.headings,
                      marginBottom: '1rem'
                    }}>
                      {service.name}
                    </h3>
                    <p style={{ marginBottom: '1rem', color: colors.textLight }}>
                      {service.description}
                    </p>
                    {service.features && (
                      <ul style={{ color: colors.text, paddingLeft: '1.5rem' }}>
                        {service.features.map((feature: string, featureIndex: number) => (
                          <li key={featureIndex} style={{ marginBottom: '0.5rem' }}>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}

            {section.name.toLowerCase().includes('testimonial') && section.testimonials && (
              <div>
                {section.testimonials.map((testimonial: TestimonialItem, testimonialIndex: number) => (
                  <div key={testimonialIndex} style={testimonialStyle}>
                    <p style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>
                      "{testimonial.quote}"
                    </p>
                    <div style={{ 
                      textAlign: 'right',
                      fontStyle: 'normal',
                      fontWeight: 'bold',
                      color: colors.primary
                    }}>
                      - {testimonial.author}
                      {testimonial.position && (
                        <div style={{ 
                          fontSize: '0.9rem', 
                          fontWeight: 'normal',
                          color: colors.textLight
                        }}>
                          {testimonial.position}
                          {testimonial.company && `, ${testimonial.company}`}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {section.name.toLowerCase().includes('about') && (
              <div style={{ 
                maxWidth: '800px', 
                margin: '0 auto',
                lineHeight: '1.6'
              }}>
                <p style={{ 
                  fontSize: '1.1rem', 
                  color: colors.text,
                  marginBottom: '2rem'
                }}>
                  {section.content}
                </p>
                {section.highlights && (
                  <div style={serviceGridStyle}>
                    {section.highlights.map((highlight: string, highlightIndex: number) => (
                      <div key={highlightIndex} style={{
                        ...cardStyle,
                        textAlign: 'center'
                      }}>
                        <div style={{
                          width: '60px',
                          height: '60px',
                          backgroundColor: colors.primary,
                          borderRadius: '50%',
                          margin: '0 auto 1rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontSize: '1.5rem'
                        }}>
                          ✓
                        </div>
                        <p style={{ 
                          fontWeight: 'bold',
                          color: colors.primary
                        }}>
                          {highlight}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {section.name.toLowerCase().includes('contact') && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '3rem',
                marginTop: '2rem'
              }}>
                <div style={cardStyle}>
                  <h3 style={{ 
                    color: colors.primary,
                    fontFamily: typography.headings,
                    marginBottom: '1.5rem'
                  }}>
                    Contact Information
                  </h3>
                  {section.contactInfo && (
                    <div style={{ lineHeight: '2' }}>
                      <p><strong>Phone:</strong> {section.contactInfo.phone}</p>
                      <p><strong>Email:</strong> {section.contactInfo.email}</p>
                      <p><strong>Address:</strong> {section.contactInfo.address}</p>
                      {section.contactInfo.hours && (
                        <p><strong>Hours:</strong> {section.contactInfo.hours}</p>
                      )}
                    </div>
                  )}
                </div>
                <div style={cardStyle}>
                  <h3 style={{ 
                    color: colors.primary,
                    fontFamily: typography.headings,
                    marginBottom: '1.5rem'
                  }}>
                    Send us a Message
                  </h3>
                  <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <input 
                      type="text" 
                      placeholder="Your Name"
                      style={{
                        padding: '0.75rem',
                        border: `1px solid ${colors.neutral}`,
                        borderRadius: '4px',
                        fontSize: '1rem'
                      }}
                    />
                    <input 
                      type="email" 
                      placeholder="Your Email"
                      style={{
                        padding: '0.75rem',
                        border: `1px solid ${colors.neutral}`,
                        borderRadius: '4px',
                        fontSize: '1rem'
                      }}
                    />
                    <textarea 
                      placeholder="Your Message"
                      rows={4}
                      style={{
                        padding: '0.75rem',
                        border: `1px solid ${colors.neutral}`,
                        borderRadius: '4px',
                        fontSize: '1rem',
                        resize: 'vertical'
                      }}
                    />
                    <button 
                      type="submit"
                      style={{
                        ...ctaButtonStyle,
                        width: '100%',
                        marginTop: '1rem'
                      }}
                    >
                      {section.form?.submitText || 'Send Message'}
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* Default content for other sections */}
            {!section.name.toLowerCase().includes('service') &&
             !section.name.toLowerCase().includes('testimonial') &&
             !section.name.toLowerCase().includes('about') &&
             !section.name.toLowerCase().includes('contact') && (
              <div style={{ 
                maxWidth: '800px', 
                margin: '0 auto',
                lineHeight: '1.6',
                textAlign: 'center'
              }}>
                <p style={{ 
                  fontSize: '1.1rem', 
                  color: colors.text
                }}>
                  {section.content}
                </p>
              </div>
            )}
          </section>
        ))}

        {/* Footer */}
        <footer style={footerStyle}>
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ 
              fontSize: typography.sizes.h3,
              fontFamily: typography.headings,
              marginBottom: '1rem'
            }}>
              {mockup.companyInfo.name}
            </h3>
            <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>
              {mockup.companyInfo.tagline}
            </p>
          </div>
          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.2)',
            paddingTop: '2rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
            textAlign: 'left'
          }}>
            <div>
              <h4 style={{ marginBottom: '1rem', fontWeight: 'bold' }}>Contact</h4>
              <p>{mockup.companyInfo.phone}</p>
              <p>{mockup.companyInfo.email}</p>
              <p>{mockup.companyInfo.address}</p>
            </div>
            <div>
              <h4 style={{ marginBottom: '1rem', fontWeight: 'bold' }}>Services</h4>
              {mockup.sections.find(s => s.name.toLowerCase().includes('service'))?.services?.slice(0, 3).map((service: ServiceItem, index: number) => (
                <p key={index} style={{ marginBottom: '0.5rem' }}>{service.name}</p>
              ))}
            </div>
          </div>
          <div style={{ 
            textAlign: 'center',
            marginTop: '2rem',
            paddingTop: '2rem',
            borderTop: '1px solid rgba(255,255,255,0.2)',
            opacity: 0.7
          }}>
            <p>&copy; 2024 {mockup.companyInfo.name}. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

// Full-Screen Modal Component
const FullScreenMockup: React.FC<{
  mockup: MockupData;
  isOpen: boolean;
  onClose: () => void;
}> = ({ mockup, isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-none w-screen h-screen p-0 m-0">
        <DialogHeader className="absolute top-4 right-4 z-50">
          <Button
            variant="outline"
            size="sm"
            onClick={onClose}
            className="bg-white/90 backdrop-blur-sm"
          >
            <X className="w-4 h-4" />
          </Button>
        </DialogHeader>
        <div className="w-full h-full overflow-auto">
          <MockupRenderer mockup={mockup} viewportSize="desktop" isFullScreen={true} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Main Portfolio Section Component
const PortfolioSection: React.FC = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    description: '',
    targetAudience: '',
    preferredColors: '',
    websiteType: '',
    features: ''
  });

  const [mockup, setMockup] = useState<MockupData | null>(null);
  const [quote, setQuote] = useState<QuoteData | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [currentViewport, setCurrentViewport] = useState<ViewportSize>('medium');
  const [showFullScreen, setShowFullScreen] = useState(false);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const generateMockup = async () => {
    if (!formData.companyName.trim()) {
      setError('Please enter a company name');
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch('/api/mockup/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || 'Failed to generate mockup');
      }

      const data = await response.json();
      
      if (data.mockup && data.quote) {
        setMockup(data.mockup);
        setQuote(data.quote);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      console.error('Error generating mockup:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate mockup. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section className="relative min-h-screen py-20 bg-gradient-to-br from-indigo-50 via-white to-purple-50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-100/20 to-blue-100/20"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e0e7ff' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600/10 to-blue-600/10 rounded-full border border-purple-200/50 backdrop-blur-sm mb-6">
            <span className="text-sm font-medium text-purple-700">✨ AI-Powered Design Generator</span>
          </div>
          <h2 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6 leading-tight">
            AI Website Mockup Generator
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Transform your vision into stunning, professional website designs with our cutting-edge AI technology. 
            Get industry-specific mockups with custom content, perfect layouts, and beautiful aesthetics tailored to your business.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
          {/* Input Form */}
          <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 hover:shadow-3xl transition-all duration-500">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center">
                  <Palette className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  Design Your Dream Website
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Share your vision and let our AI create a stunning, professional website mockup tailored specifically for your business.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-3 group-focus-within:text-purple-600 transition-colors">
                  Company Name *
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className="w-full p-4 bg-white/50 border-2 border-gray-200/50 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 backdrop-blur-sm placeholder-gray-400"
                  placeholder="Enter your company name"
                />
              </div>

              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-3 group-focus-within:text-purple-600 transition-colors">
                  Industry
                </label>
                <select
                  name="industry"
                  value={formData.industry}
                  onChange={handleInputChange}
                  className="w-full p-4 bg-white/50 border-2 border-gray-200/50 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 backdrop-blur-sm text-gray-700"
                >
                  <option value="">Select your industry</option>
                  <option value="restaurant">🍕 Restaurant & Food Service</option>
                  <option value="ecommerce">🛒 E-commerce & Retail</option>
                  <option value="healthcare">🏥 Healthcare & Medical</option>
                  <option value="creative">🎨 Creative & Design</option>
                  <option value="technology">💻 Technology & SaaS</option>
                  <option value="real estate">🏠 Real Estate</option>
                  <option value="professional services">💼 Professional Services</option>
                  <option value="fitness">💪 Fitness & Wellness</option>
                  <option value="education">📚 Education & Training</option>
                  <option value="construction">🔨 Construction & Contracting</option>
                  <option value="other">✨ Other</option>
                </select>
              </div>

              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-3 group-focus-within:text-purple-600 transition-colors">
                  Business Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full p-4 bg-white/50 border-2 border-gray-200/50 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 backdrop-blur-sm placeholder-gray-400 resize-none"
                  placeholder="Tell us what makes your business unique and what services you offer..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-3 group-focus-within:text-purple-600 transition-colors">
                    Website Type
                  </label>
                  <select
                    name="websiteType"
                    value={formData.websiteType}
                    onChange={handleInputChange}
                    className="w-full p-4 bg-white/50 border-2 border-gray-200/50 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 backdrop-blur-sm text-gray-700"
                  >
                    <option value="">Select type</option>
                    <option value="business">🏢 Business Website</option>
                    <option value="ecommerce">🛍️ E-commerce Store</option>
                    <option value="portfolio">📱 Portfolio</option>
                    <option value="blog">📝 Blog</option>
                    <option value="landing">🚀 Landing Page</option>
                  </select>
                </div>

                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-3 group-focus-within:text-purple-600 transition-colors">
                    Color Preference
                  </label>
                  <input
                    type="text"
                    name="preferredColors"
                    value={formData.preferredColors}
                    onChange={handleInputChange}
                    className="w-full p-4 bg-white/50 border-2 border-gray-200/50 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 backdrop-blur-sm placeholder-gray-400"
                    placeholder="e.g., ocean blue, modern"
                  />
                </div>
              </div>

              {error && (
                <div className="p-4 bg-red-50/80 border-2 border-red-200 text-red-700 rounded-2xl backdrop-blur-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-red-500">⚠️</span>
                    {error}
                  </div>
                </div>
              )}

              <Button
                onClick={generateMockup}
                disabled={isGenerating}
                className="w-full py-4 px-8 text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isGenerating ? (
                  <div className="flex items-center gap-3">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    Creating your masterpiece...
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <span>✨</span>
                    Generate My Website Design
                    <span>🚀</span>
                  </div>
                )}
              </Button>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-8">
            {!mockup && !isGenerating && (
              <div className="bg-white/40 backdrop-blur-xl rounded-3xl p-12 shadow-xl border border-white/20 text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Eye className="w-12 h-12 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Your Preview Will Appear Here</h3>
                <p className="text-gray-600 leading-relaxed">
                  Fill out the form and click "Generate My Website Design" to see your custom AI-generated mockup preview.
                </p>
              </div>
            )}
            
            {mockup && (
              <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 hover:shadow-3xl transition-all duration-500">
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-2xl font-semibold">
                      Website Preview - {mockup.companyInfo.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">
                        {mockup.template?.name || 'Professional'} Template
                      </Badge>
                    </div>
                  </div>

                  {/* Viewport Controls */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2 mb-2">
                      {Object.entries(viewportSizes).map(([size, config]) => (
                        <Button
                          key={size}
                          variant={currentViewport === size ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentViewport(size as ViewportSize)}
                          className="flex items-center gap-2"
                        >
                          {config.icon}
                          {config.name}
                        </Button>
                                        ))}
                                      </div>
                    <p className="text-sm text-gray-600">
                      {viewportSizes[currentViewport].description}
                    </p>
                                    </div>

                  {/* Mockup Container */}
                  <div className="relative bg-gray-100 p-4 rounded-lg overflow-auto" style={{ minHeight: '500px' }}>
                    <div className="flex justify-center">
                      <MockupRenderer 
                        mockup={mockup} 
                        viewportSize={currentViewport}
                      />
                                      </div>
                                    </div>

                  {/* Full Screen Button */}
                  <div className="mt-4 text-center">
                    <Button
                      onClick={() => setShowFullScreen(true)}
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <Maximize className="w-4 h-4" />
                      View Full Screen
                    </Button>
                            </div>

                  {/* Tabs for additional information */}
                  <Tabs defaultValue="design" className="mt-6">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="design" className="flex items-center gap-2">
                        <Palette className="w-4 h-4" />
                                Design System
                      </TabsTrigger>
                      <TabsTrigger value="features" className="flex items-center gap-2">
                        <Code className="w-4 h-4" />
                        Features
                      </TabsTrigger>
                      <TabsTrigger value="content" className="flex items-center gap-2">
                        <Eye className="w-4 h-4" />
                        Content Strategy
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="design" className="mt-4">
                                <div className="space-y-4">
                                  <div>
                          <h4 className="font-semibold mb-2">Color Palette</h4>
                          <div className="flex flex-wrap gap-2">
                            {Object.entries(mockup.designSystem.colorPalette).map(([name, color]) => (
                              <div key={name} className="flex items-center gap-2">
                                <div 
                                  className="w-6 h-6 rounded border"
                                            style={{ backgroundColor: color }}
                                />
                                <span className="text-sm capitalize">{name}: {color}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>

                                  <div>
                          <h4 className="font-semibold mb-2">Typography</h4>
                          <div className="space-y-1">
                            <p className="text-sm">Headings: {mockup.designSystem.typography.headings}</p>
                            <p className="text-sm">Body: {mockup.designSystem.typography.body}</p>
                                    </div>
                                  </div>

                                  <div>
                          <h4 className="font-semibold mb-2">Template Information</h4>
                          <div className="bg-gray-50 p-3 rounded">
                            <p className="text-sm"><strong>Template:</strong> {mockup.template?.name}</p>
                            <p className="text-sm"><strong>Type:</strong> {mockup.template?.layout?.type}</p>
                            <p className="text-sm"><strong>Description:</strong> {mockup.template?.description}</p>
                                    </div>
                                  </div>
                            </div>
                          </TabsContent>

                    <TabsContent value="features" className="mt-4">
                              <div className="space-y-4">
                                <div>
                          <h4 className="font-semibold mb-2">Included Features</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {mockup.features.map((feature, index) => (
                              <div key={index} className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full" />
                                        <span className="text-sm">{feature}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                  <div>
                          <h4 className="font-semibold mb-2">Technical Recommendations</h4>
                          <div className="space-y-1">
                            {mockup.technicalRecommendations.map((rec, index) => (
                              <p key={index} className="text-sm text-gray-600">• {rec}</p>
                                      ))}
                                    </div>
                                  </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="content" className="mt-4">
                      <div className="space-y-4">
                                  <div>
                          <h4 className="font-semibold mb-2">Content Strategy</h4>
                                    <div className="space-y-2">
                            <p className="text-sm"><strong>Tone:</strong> {mockup.contentStrategy.tone}</p>
                            <p className="text-sm"><strong>Messaging:</strong> {mockup.contentStrategy.messaging}</p>
                          </div>
                        </div>

                                        <div>
                          <h4 className="font-semibold mb-2">SEO Keywords</h4>
                          <div className="flex flex-wrap gap-2">
                            {mockup.contentStrategy.seoKeywords.map((keyword, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {keyword}
                              </Badge>
                                            ))}
                                          </div>
                                        </div>

                        <div>
                          <h4 className="font-semibold mb-2">Call-to-Actions</h4>
                          <div className="space-y-1">
                            {mockup.contentStrategy.callsToAction.map((cta, index) => (
                              <p key={index} className="text-sm">• {cta}</p>
                            ))}
                                    </div>
                              </div>
                            </div>
                          </TabsContent>
                        </Tabs>
                      </div>
                    </div>
                  )}

                  {quote && (
                    <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 hover:shadow-3xl transition-all duration-500">
                      <div className="mb-6">
                        <h3 className="text-2xl font-semibold mb-4">Project Quote</h3>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-semibold">Project Type</h4>
                              <p className="text-gray-600">{quote.projectType}</p>
                            </div>
                            <div>
                              <h4 className="font-semibold">Timeline</h4>
                              <p className="text-gray-600">{quote.timeline}</p>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-semibold mb-2">Included Services</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                              {quote.included_services.map((service, index) => (
                                <div key={index} className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                                  <span className="text-sm">{service}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="bg-blue-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-xl">Total Investment</h4>
                            <p className="text-2xl font-bold text-blue-600">{quote.total_cost}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

        {/* Full Screen Modal */}
        {mockup && (
          <FullScreenMockup
            mockup={mockup}
            isOpen={showFullScreen}
            onClose={() => setShowFullScreen(false)}
          />
        )}
      </div>
    </section>
  );
};

export { PortfolioSection };