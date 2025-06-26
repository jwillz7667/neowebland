import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Sparkles, Eye, Wand2, Palette, Code, Zap, Clock, DollarSign } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { generateWebsiteMockup, getProjectQuote } from "@/api/mockup"
import { useToast } from "@/hooks/useToast"

// Type definitions for mockup data
interface MockupData {
  companyInfo?: {
    name: string;
    tagline: string;
    description: string;
    mission: string;
    founded: string;
    location: string;
  };
  header?: {
    logo: string;
    logoStyle: string;
    navigation: string[];
    style: string;
    layout: string;
  };
  hero?: {
    title: string;
    subtitle: string;
    cta: string;
    secondaryCta?: string;
    backgroundConcept: string;
    layout: string;
    heroImage: string;
  };
  sections?: Array<{
    name: string;
    title: string;
    content: string;
    highlights?: string[];
    layout: string;
    visual?: string;
    services?: Array<{
      name: string;
      description: string;
      features: string[];
    }>;
    benefits?: Array<{
      title: string;
      description: string;
      icon: string;
    }>;
    testimonials?: Array<{
      quote: string;
      author: string;
      position: string;
      company: string;
      rating: number;
    }>;
    contactInfo?: {
      phone: string;
      email: string;
      address: string;
      hours: string;
    };
    form?: {
      fields: string[];
      submitText: string;
    };
  }>;
  designSystem?: {
    colorPalette: Record<string, string>;
    typography: {
      headings: string;
      body: string;
      style: string;
      sizes?: Record<string, string>;
      headingWeights?: string;
    };
    spacing?: Record<string, string>;
    borderRadius?: string;
    shadows?: string;
    layoutStyle: string;
    visualStyle: string;
  };
  responsiveDesign?: Record<string, Record<string, string>>;
  features?: string[];
  technicalRecommendations?: string[];
  contentStrategy?: {
    tone: string;
    messaging: string;
    seoKeywords: string[];
    callsToAction: string[];
  };
  additionalPages?: Array<{
    name: string;
    purpose: string;
    keyContent: string;
  }>;
}

interface QuoteData {
  pricing?: {
    designCost?: number;
    developmentCost?: number;
    featuresCost?: number;
    testingCost?: number;
    totalCost?: number;
  };
  timeline?: {
    design?: string;
    development?: string;
    testing?: string;
    total?: string;
  };
  breakdown?: Array<{
    phase: string;
    duration: string;
    cost?: number;
    description: string;
  }>;
  included?: string[];
  optional?: Array<{
    feature: string;
    cost: number;
    description: string;
  }>;
  recommendations?: string[];
  nextSteps?: string[];
}

export function PortfolioSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [isGeneratorOpen, setIsGeneratorOpen] = useState(false)
  const [mockupData, setMockupData] = useState<MockupData | null>(null)
  const [loading, setLoading] = useState(false)
  const [quoteLoading, setQuoteLoading] = useState(false)
  const [quote, setQuote] = useState<QuoteData | null>(null)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    companyName: "",
    industry: "",
    description: "",
    targetAudience: "",
    preferredColors: "",
    websiteType: "",
    features: ""
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const generateMockup = async () => {
    if (!formData.companyName || !formData.industry || !formData.description) {
      toast({
        title: "Error",
        description: "Please fill in company name, industry, and description",
        variant: "destructive",
      })
      return
    }

    try {
      setLoading(true)
      const mockup = await generateWebsiteMockup(formData)
      setMockupData(mockup)
      toast({
        title: "Success",
        description: "AI-powered website mockup generated successfully!",
      })
    } catch (error: unknown) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const generateQuote = async () => {
    if (!mockupData) return

    try {
      setQuoteLoading(true)
      const quoteData = await getProjectQuote({
        ...formData,
        mockup: mockupData
      })
      setQuote(quoteData)
      toast({
        title: "Success",
        description: "Professional quote generated by AI!",
      })
    } catch (error: unknown) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      })
    } finally {
      setQuoteLoading(false)
    }
  }

  const resetGenerator = () => {
    setFormData({
      companyName: "",
      industry: "",
      description: "",
      targetAudience: "",
      preferredColors: "",
      websiteType: "",
      features: ""
    })
    setMockupData(null)
    setQuote(null)
  }

  return (
    <section id="portfolio" className="py-16 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-slate-800 dark:via-purple-900/20 dark:to-slate-800" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <Badge variant="secondary" className="mb-4 px-4 py-2">
            <Sparkles className="w-4 h-4 mr-2" />
            Powered by Google Gemini 2.0
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
            AI Website Mockup Generator
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Get professional, industry-specific website mockups and accurate development quotes powered by cutting-edge AI
          </p>

          <div className="mt-8">
            <Dialog open={isGeneratorOpen} onOpenChange={setIsGeneratorOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-full text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  <Wand2 className="w-6 h-6 mr-3" />
                  Generate Professional Mockup
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-7xl max-h-[95vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-3xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    AI-Powered Website Mockup Generator
                  </DialogTitle>
                </DialogHeader>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Form Section */}
                  <div className="space-y-6">
                    <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 rounded-xl p-6">
                      <h3 className="text-xl font-semibold mb-4 flex items-center">
                        <Code className="w-5 h-5 mr-2" />
                        Company Information
                      </h3>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Company Name *</label>
                          <Input
                            value={formData.companyName}
                            onChange={(e) => handleInputChange("companyName", e.target.value)}
                            placeholder="Enter your company name"
                            className="bg-white dark:bg-slate-900"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">Industry *</label>
                          <Select value={formData.industry} onValueChange={(value) => handleInputChange("industry", value)}>
                            <SelectTrigger className="bg-white dark:bg-slate-900">
                              <SelectValue placeholder="Select your industry" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="technology">Technology & Software</SelectItem>
                              <SelectItem value="healthcare">Healthcare & Medical</SelectItem>
                              <SelectItem value="finance">Finance & Banking</SelectItem>
                              <SelectItem value="retail">Retail & E-commerce</SelectItem>
                              <SelectItem value="education">Education & Training</SelectItem>
                              <SelectItem value="restaurant">Restaurant & Food</SelectItem>
                              <SelectItem value="real-estate">Real Estate</SelectItem>
                              <SelectItem value="consulting">Consulting & Services</SelectItem>
                              <SelectItem value="manufacturing">Manufacturing</SelectItem>
                              <SelectItem value="nonprofit">Non-profit</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">Business Description *</label>
                          <Textarea
                            value={formData.description}
                            onChange={(e) => handleInputChange("description", e.target.value)}
                            placeholder="Describe what your business does, your unique value proposition, and key services..."
                            rows={4}
                            className="bg-white dark:bg-slate-900"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">Target Audience</label>
                          <Input
                            value={formData.targetAudience}
                            onChange={(e) => handleInputChange("targetAudience", e.target.value)}
                            placeholder="Who are your ideal customers? (e.g., small businesses, millennials, professionals)"
                            className="bg-white dark:bg-slate-900"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">Website Type</label>
                          <Select value={formData.websiteType} onValueChange={(value) => handleInputChange("websiteType", value)}>
                            <SelectTrigger className="bg-white dark:bg-slate-900">
                              <SelectValue placeholder="Select website type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="business">Business Website</SelectItem>
                              <SelectItem value="ecommerce">E-commerce Store</SelectItem>
                              <SelectItem value="portfolio">Portfolio Website</SelectItem>
                              <SelectItem value="blog">Blog/Content Site</SelectItem>
                              <SelectItem value="landing">Landing Page</SelectItem>
                              <SelectItem value="saas">SaaS Platform</SelectItem>
                              <SelectItem value="marketplace">Marketplace</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">Brand Colors & Style</label>
                          <Input
                            value={formData.preferredColors}
                            onChange={(e) => handleInputChange("preferredColors", e.target.value)}
                            placeholder="e.g., Modern blue and white, Warm earth tones, Minimalist black and gold"
                            className="bg-white dark:bg-slate-900"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">Desired Features</label>
                          <Textarea
                            value={formData.features}
                            onChange={(e) => handleInputChange("features", e.target.value)}
                            placeholder="Contact forms, online booking, payment processing, user accounts, live chat, blog, etc."
                            rows={3}
                            className="bg-white dark:bg-slate-900"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button
                        onClick={generateMockup}
                        disabled={loading}
                        className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 py-3 text-lg"
                      >
                        {loading ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                            AI is Creating...
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-5 h-5 mr-2" />
                            Generate AI Mockup
                          </>
                        )}
                      </Button>
                      <Button variant="outline" onClick={resetGenerator} className="px-6">
                        Reset
                      </Button>
                    </div>
                  </div>

                  {/* Preview Section */}
                  <div className="space-y-6">
                    {mockupData ? (
                      <div className="space-y-6">
                        <Tabs defaultValue="mockup" className="w-full">
                          <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="mockup">Mockup</TabsTrigger>
                            <TabsTrigger value="design">Design</TabsTrigger>
                            <TabsTrigger value="features">Features</TabsTrigger>
                          </TabsList>

                          <TabsContent value="mockup" className="space-y-4">
                            <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 rounded-xl p-6">
                              <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-semibold flex items-center">
                                  <Eye className="w-5 h-5 mr-2" />
                                  Professional Website Preview
                                </h3>
                                <div className="flex space-x-2">
                                  <Button variant="outline" size="sm">Desktop</Button>
                                  <Button variant="outline" size="sm">Mobile</Button>
                                </div>
                              </div>

                              {/* Realistic Website Mockup */}
                              <div className="bg-white rounded-xl shadow-2xl overflow-hidden border-8 border-gray-300" style={{
                                maxWidth: '1200px',
                                margin: '0 auto',
                                transform: 'scale(0.8)',
                                transformOrigin: 'top center'
                              }}>
                                
                                {/* Browser Chrome */}
                                <div className="bg-gray-200 px-4 py-3 flex items-center space-x-2 border-b">
                                  <div className="flex space-x-2">
                                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                  </div>
                                  <div className="flex-1 bg-white rounded px-3 py-1 text-sm text-gray-600 ml-4">
                                    {mockupData.companyInfo?.name.toLowerCase().replace(/\s+/g, '')}.com
                                  </div>
                                </div>

                                {/* Website Content */}
                                <div className="bg-white">
                                  
                                  {/* Header/Navigation */}
                                  <header 
                                    className="px-8 py-4 shadow-sm border-b"
                                    style={{
                                      backgroundColor: mockupData.designSystem?.colorPalette?.background || '#ffffff',
                                      borderBottomColor: mockupData.designSystem?.colorPalette?.neutral || '#e5e5e5'
                                    }}
                                  >
                                    <div className="flex items-center justify-between max-w-7xl mx-auto">
                                      <div 
                                        className="text-2xl font-bold"
                                        style={{
                                          color: mockupData.designSystem?.colorPalette?.primary || '#1f2937',
                                          fontFamily: mockupData.designSystem?.typography?.headings || 'Inter'
                                        }}
                                      >
                                        {mockupData.header?.logo || mockupData.companyInfo?.name}
                                      </div>
                                      <nav className="hidden md:flex space-x-8">
                                        {mockupData.header?.navigation?.map((item: string, index: number) => (
                                          <a 
                                            key={index} 
                                            className="font-medium hover:opacity-75 transition-opacity"
                                            style={{
                                              color: mockupData.designSystem?.colorPalette?.text || '#374151',
                                              fontFamily: mockupData.designSystem?.typography?.body || 'Open Sans'
                                            }}
                                          >
                                            {item}
                                          </a>
                                        ))}
                                      </nav>
                                    </div>
                                  </header>

                                  {/* Hero Section */}
                                  <section 
                                    className="py-20 px-8"
                                    style={{
                                      background: `linear-gradient(135deg, ${mockupData.designSystem?.colorPalette?.primary || '#3b82f6'}, ${mockupData.designSystem?.colorPalette?.secondary || '#1e40af'})`,
                                      color: '#ffffff'
                                    }}
                                  >
                                    <div className="max-w-7xl mx-auto text-center">
                                      <h1 
                                        className="text-5xl font-bold mb-6 leading-tight"
                                        style={{
                                          fontFamily: mockupData.designSystem?.typography?.headings || 'Inter',
                                          fontSize: mockupData.designSystem?.typography?.sizes?.h1 || '3.5rem'
                                        }}
                                      >
                                        {mockupData.hero?.title || `Welcome to ${mockupData.companyInfo?.name}`}
                                      </h1>
                                      <p 
                                        className="text-xl mb-8 opacity-90 max-w-3xl mx-auto"
                                        style={{
                                          fontFamily: mockupData.designSystem?.typography?.body || 'Open Sans'
                                        }}
                                      >
                                        {mockupData.hero?.subtitle || mockupData.companyInfo?.tagline}
                                      </p>
                                      <div className="flex justify-center space-x-4">
                                        <button 
                                          className="px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                                          style={{
                                            backgroundColor: mockupData.designSystem?.colorPalette?.accent || '#f59e0b',
                                            color: '#ffffff'
                                          }}
                                        >
                                          {mockupData.hero?.cta || 'Get Started'}
                                        </button>
                                        {mockupData.hero?.secondaryCta && (
                                          <button className="px-8 py-4 border-2 border-white rounded-lg font-semibold text-lg hover:bg-white hover:text-gray-900 transition-all duration-300">
                                            {mockupData.hero.secondaryCta}
                                          </button>
                                        )}
                                      </div>
                                    </div>
                                  </section>

                                  {/* About Section */}
                                  {mockupData.sections?.find((s: any) => s.name.includes('About')) && (
                                    <section 
                                      className="py-16 px-8"
                                      style={{
                                        backgroundColor: mockupData.designSystem?.colorPalette?.background || '#f9fafb'
                                      }}
                                    >
                                      <div className="max-w-7xl mx-auto">
                                        <div className="grid md:grid-cols-2 gap-12 items-center">
                                          <div>
                                            <h2 
                                              className="text-3xl font-bold mb-6"
                                              style={{
                                                color: mockupData.designSystem?.colorPalette?.primary || '#1f2937',
                                                fontFamily: mockupData.designSystem?.typography?.headings || 'Inter'
                                              }}
                                            >
                                              {mockupData.sections.find((s: any) => s.name.includes('About'))?.title}
                                            </h2>
                                            <p 
                                              className="text-lg mb-6 leading-relaxed"
                                              style={{
                                                color: mockupData.designSystem?.colorPalette?.text || '#374151',
                                                fontFamily: mockupData.designSystem?.typography?.body || 'Open Sans'
                                              }}
                                            >
                                              {mockupData.sections.find((s: any) => s.name.includes('About'))?.content}
                                            </p>
                                            <div className="grid grid-cols-1 gap-4">
                                              {mockupData.sections.find((s: any) => s.name.includes('About'))?.highlights?.map((highlight: string, index: number) => (
                                                <div key={index} className="flex items-center">
                                                  <div 
                                                    className="w-2 h-2 rounded-full mr-3"
                                                    style={{
                                                      backgroundColor: mockupData.designSystem?.colorPalette?.accent || '#f59e0b'
                                                    }}
                                                  ></div>
                                                  <span style={{
                                                    color: mockupData.designSystem?.colorPalette?.text || '#374151'
                                                  }}>{highlight}</span>
                                                </div>
                                              ))}
                                            </div>
                                          </div>
                                          <div 
                                            className="h-80 rounded-xl flex items-center justify-center"
                                            style={{
                                              backgroundColor: mockupData.designSystem?.colorPalette?.neutral || '#e5e7eb'
                                            }}
                                          >
                                            <div className="text-center">
                                              <div className="w-16 h-16 bg-gray-400 rounded-full mx-auto mb-4"></div>
                                              <p className="text-sm text-gray-600">
                                                {mockupData.sections.find((s: any) => s.name.includes('About'))?.visual || 'Professional imagery'}
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </section>
                                  )}

                                  {/* Services Section */}
                                  {mockupData.sections?.find((s: any) => s.name.includes('Services')) && (
                                    <section className="py-16 px-8">
                                      <div className="max-w-7xl mx-auto">
                                        <div className="text-center mb-12">
                                          <h2 
                                            className="text-4xl font-bold mb-4"
                                            style={{
                                              color: mockupData.designSystem?.colorPalette?.primary || '#1f2937',
                                              fontFamily: mockupData.designSystem?.typography?.headings || 'Inter'
                                            }}
                                          >
                                            {mockupData.sections.find((s: any) => s.name.includes('Services'))?.title}
                                          </h2>
                                          <p 
                                            className="text-lg max-w-3xl mx-auto"
                                            style={{
                                              color: mockupData.designSystem?.colorPalette?.text || '#374151',
                                              fontFamily: mockupData.designSystem?.typography?.body || 'Open Sans'
                                            }}
                                          >
                                            {mockupData.sections.find((s: any) => s.name.includes('Services'))?.content}
                                          </p>
                                        </div>
                                        
                                        <div className="grid md:grid-cols-3 gap-8">
                                          {mockupData.sections.find((s: any) => s.name.includes('Services'))?.services?.map((service: any, index: number) => (
                                            <div 
                                              key={index}
                                              className="p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                                              style={{
                                                backgroundColor: '#ffffff',
                                                border: `1px solid ${mockupData.designSystem?.colorPalette?.neutral || '#e5e7eb'}`
                                              }}
                                            >
                                              <div 
                                                className="w-12 h-12 rounded-lg mb-4 flex items-center justify-center"
                                                style={{
                                                  backgroundColor: mockupData.designSystem?.colorPalette?.primary || '#3b82f6'
                                                }}
                                              >
                                                <div className="w-6 h-6 bg-white rounded"></div>
                                              </div>
                                              <h3 
                                                className="text-xl font-semibold mb-3"
                                                style={{
                                                  color: mockupData.designSystem?.colorPalette?.primary || '#1f2937',
                                                  fontFamily: mockupData.designSystem?.typography?.headings || 'Inter'
                                                }}
                                              >
                                                {service.name}
                                              </h3>
                                              <p 
                                                className="mb-4 leading-relaxed"
                                                style={{
                                                  color: mockupData.designSystem?.colorPalette?.text || '#374151'
                                                }}
                                              >
                                                {service.description}
                                              </p>
                                              <ul className="space-y-2">
                                                {service.features?.map((feature: string, featureIndex: number) => (
                                                  <li key={featureIndex} className="flex items-center text-sm">
                                                    <div 
                                                      className="w-1.5 h-1.5 rounded-full mr-2"
                                                      style={{
                                                        backgroundColor: mockupData.designSystem?.colorPalette?.accent || '#f59e0b'
                                                      }}
                                                    ></div>
                                                    {feature}
                                                  </li>
                                                ))}
                                              </ul>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    </section>
                                  )}

                                  {/* Testimonials Section */}
                                  {mockupData.sections?.find((s: any) => s.name.includes('Testimonials')) && (
                                    <section 
                                      className="py-16 px-8"
                                      style={{
                                        backgroundColor: mockupData.designSystem?.colorPalette?.background || '#f9fafb'
                                      }}
                                    >
                                      <div className="max-w-7xl mx-auto">
                                        <div className="text-center mb-12">
                                          <h2 
                                            className="text-4xl font-bold mb-4"
                                            style={{
                                              color: mockupData.designSystem?.colorPalette?.primary || '#1f2937',
                                              fontFamily: mockupData.designSystem?.typography?.headings || 'Inter'
                                            }}
                                          >
                                            {mockupData.sections.find((s: any) => s.name.includes('Testimonials'))?.title}
                                          </h2>
                                        </div>
                                        
                                        <div className="grid md:grid-cols-2 gap-8">
                                          {mockupData.sections.find((s: any) => s.name.includes('Testimonials'))?.testimonials?.map((testimonial: any, index: number) => (
                                            <div 
                                              key={index}
                                              className="p-6 rounded-xl shadow-lg"
                                              style={{
                                                backgroundColor: '#ffffff'
                                              }}
                                            >
                                              <div className="flex mb-4">
                                                {[...Array(testimonial.rating)].map((_, i) => (
                                                  <div 
                                                    key={i}
                                                    className="w-5 h-5"
                                                    style={{
                                                      backgroundColor: mockupData.designSystem?.colorPalette?.accent || '#f59e0b'
                                                    }}
                                                  ></div>
                                                ))}
                                              </div>
                                              <p 
                                                className="mb-4 italic text-lg"
                                                style={{
                                                  color: mockupData.designSystem?.colorPalette?.text || '#374151'
                                                }}
                                              >
                                                "{testimonial.quote}"
                                              </p>
                                              <div className="flex items-center">
                                                <div 
                                                  className="w-12 h-12 rounded-full mr-4"
                                                  style={{
                                                    backgroundColor: mockupData.designSystem?.colorPalette?.neutral || '#e5e7eb'
                                                  }}
                                                ></div>
                                                <div>
                                                  <div 
                                                    className="font-semibold"
                                                    style={{
                                                      color: mockupData.designSystem?.colorPalette?.primary || '#1f2937'
                                                    }}
                                                  >
                                                    {testimonial.author}
                                                  </div>
                                                  <div 
                                                    className="text-sm"
                                                    style={{
                                                      color: mockupData.designSystem?.colorPalette?.textLight || '#6b7280'
                                                    }}
                                                  >
                                                    {testimonial.position}, {testimonial.company}
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    </section>
                                  )}

                                  {/* Contact Section */}
                                  {mockupData.sections?.find((s) => s.name.includes('Contact')) && (
                                    <section className="py-16 px-8">
                                      <div className="max-w-7xl mx-auto">
                                        <div className="text-center mb-12">
                                          <h2 
                                            className="text-4xl font-bold mb-4"
                                            style={{
                                              color: mockupData.designSystem?.colorPalette?.primary || '#1f2937',
                                              fontFamily: mockupData.designSystem?.typography?.headings || 'Inter'
                                            }}
                                          >
                                            {mockupData.sections.find((s) => s.name.includes('Contact'))?.title}
                                          </h2>
                                          <p 
                                            className="text-lg"
                                            style={{
                                              color: mockupData.designSystem?.colorPalette?.text || '#374151'
                                            }}
                                          >
                                            {mockupData.sections.find((s) => s.name.includes('Contact'))?.content}
                                          </p>
                                        </div>
                                        
                                        <div className="grid md:grid-cols-2 gap-12">
                                          <div>
                                            <h3 
                                              className="text-2xl font-semibold mb-6"
                                              style={{
                                                color: mockupData.designSystem?.colorPalette?.primary || '#1f2937'
                                              }}
                                            >
                                              Contact Information
                                            </h3>
                                            <div className="space-y-4">
                                              {(() => {
                                                const contactSection = mockupData.sections.find((s) => s.name.includes('Contact'));
                                                return contactSection?.contactInfo && (
                                                  <>
                                                    <div className="flex items-center">
                                                      <div 
                                                        className="w-5 h-5 mr-3"
                                                        style={{
                                                          backgroundColor: mockupData.designSystem?.colorPalette?.primary || '#3b82f6'
                                                        }}
                                                      ></div>
                                                      <span>{contactSection.contactInfo.phone}</span>
                                                    </div>
                                                    <div className="flex items-center">
                                                      <div 
                                                        className="w-5 h-5 mr-3"
                                                        style={{
                                                          backgroundColor: mockupData.designSystem?.colorPalette?.primary || '#3b82f6'
                                                        }}
                                                      ></div>
                                                      <span>{contactSection.contactInfo.email}</span>
                                                    </div>
                                                    <div className="flex items-center">
                                                      <div 
                                                        className="w-5 h-5 mr-3"
                                                        style={{
                                                          backgroundColor: mockupData.designSystem?.colorPalette?.primary || '#3b82f6'
                                                        }}
                                                      ></div>
                                                      <span>{contactSection.contactInfo.address}</span>
                                                    </div>
                                                  </>
                                                );
                                              })()}
                                            </div>
                                          </div>
                                          
                                          <div>
                                            <h3 
                                              className="text-2xl font-semibold mb-6"
                                              style={{
                                                color: mockupData.designSystem?.colorPalette?.primary || '#1f2937'
                                              }}
                                            >
                                              Get In Touch
                                            </h3>
                                            <div className="space-y-4">
                                              {(() => {
                                                const contactSection = mockupData.sections.find((s) => s.name.includes('Contact'));
                                                return contactSection?.form?.fields?.map((field: string, index: number) => (
                                                  <div key={index}>
                                                    <div 
                                                      className="w-full h-12 rounded border px-3 flex items-center"
                                                      style={{
                                                        borderColor: mockupData.designSystem?.colorPalette?.neutral || '#e5e7eb',
                                                        backgroundColor: '#ffffff'
                                                      }}
                                                    >
                                                      <span className="text-gray-400">{field}</span>
                                                    </div>
                                                  </div>
                                                ));
                                              })()}
                                              <button 
                                                className="w-full py-3 rounded font-semibold"
                                                style={{
                                                  backgroundColor: mockupData.designSystem?.colorPalette?.primary || '#3b82f6',
                                                  color: '#ffffff'
                                                }}
                                              >
                                                {(() => {
                                                  const contactSection = mockupData.sections.find((s) => s.name.includes('Contact'));
                                                  return contactSection?.form?.submitText || 'Send Message';
                                                })()}
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </section>
                                  )}

                                  {/* Footer */}
                                  <footer 
                                    className="py-8 px-8"
                                    style={{
                                      backgroundColor: mockupData.designSystem?.colorPalette?.primary || '#1f2937',
                                      color: '#ffffff'
                                    }}
                                  >
                                    <div className="max-w-7xl mx-auto text-center">
                                      <div 
                                        className="text-xl font-bold mb-2"
                                        style={{
                                          fontFamily: mockupData.designSystem?.typography?.headings || 'Inter'
                                        }}
                                      >
                                        {mockupData.companyInfo?.name}
                                      </div>
                                      <p className="text-sm opacity-75">
                                        © 2024 {mockupData.companyInfo?.name}. All rights reserved.
                                      </p>
                                    </div>
                                  </footer>

                                </div>
                              </div>
                            </div>
                          </TabsContent>

                          <TabsContent value="design" className="space-y-4">
                            <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 rounded-xl p-6">
                              <h3 className="text-xl font-semibold mb-4 flex items-center">
                                <Palette className="w-5 h-5 mr-2" />
                                Professional Design System
                              </h3>

                              {mockupData.designSystem && (
                                <div className="space-y-6">
                                  {/* Company Information */}
                                  {mockupData.companyInfo && (
                                    <div className="bg-white dark:bg-slate-900 rounded-lg p-6 shadow-sm">
                                      <h4 className="font-semibold mb-4 text-lg">Brand Identity</h4>
                                      <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                          <div className="mb-3">
                                            <strong>Company:</strong> {mockupData.companyInfo.name}
                                          </div>
                                          <div className="mb-3">
                                            <strong>Tagline:</strong> {mockupData.companyInfo.tagline}
                                          </div>
                                          <div className="mb-3">
                                            <strong>Industry Focus:</strong> {formData.industry}
                                          </div>
                                        </div>
                                        <div>
                                          <div className="mb-3">
                                            <strong>Mission:</strong> {mockupData.companyInfo.mission}
                                          </div>
                                          <div className="mb-3">
                                            <strong>Target Audience:</strong> {formData.targetAudience || 'General public'}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  )}

                                  {/* Color Palette */}
                                  <div className="bg-white dark:bg-slate-900 rounded-lg p-6 shadow-sm">
                                    <h4 className="font-semibold mb-4 text-lg">Color Palette</h4>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                      {Object.entries(mockupData.designSystem.colorPalette || {}).map(([name, color]: [string, any]) => (
                                        <div key={name} className="text-center">
                                          <div
                                            className="w-full h-20 rounded-lg border-2 border-white shadow-md mb-2"
                                            style={{ backgroundColor: color }}
                                          ></div>
                                          <div className="text-sm font-medium capitalize">{name}</div>
                                          <div className="text-xs text-gray-500">{color}</div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>

                                  {/* Typography */}
                                  <div className="bg-white dark:bg-slate-900 rounded-lg p-6 shadow-sm">
                                    <h4 className="font-semibold mb-4 text-lg">Typography System</h4>
                                    <div className="space-y-4">
                                      <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                          <div className="mb-2"><strong>Headings:</strong> {mockupData.designSystem.typography?.headings}</div>
                                          <div className="mb-2"><strong>Body Text:</strong> {mockupData.designSystem.typography?.body}</div>
                                          <div className="mb-2"><strong>Style:</strong> {mockupData.designSystem.typography?.style}</div>
                                        </div>
                                        {mockupData.designSystem.typography?.sizes && (
                                          <div>
                                            <div className="text-sm font-medium mb-2">Font Sizes:</div>
                                            {Object.entries(mockupData.designSystem.typography.sizes).map(([size, value]: [string, any]) => (
                                              <div key={size} className="text-sm mb-1">
                                                <span className="font-medium">{size}:</span> {value}
                                              </div>
                                            ))}
                                          </div>
                                        )}
                                      </div>
                                      
                                      {/* Typography Preview */}
                                      <div className="border-t pt-4">
                                        <div className="text-sm font-medium mb-3">Typography Preview:</div>
                                        <div className="space-y-3">
                                          <div 
                                            className="text-3xl font-bold"
                                            style={{
                                              fontFamily: mockupData.designSystem.typography?.headings || 'Inter',
                                              color: mockupData.designSystem.colorPalette?.primary || '#1f2937'
                                            }}
                                          >
                                            {mockupData.companyInfo?.name} - Main Heading
                                          </div>
                                          <div 
                                            className="text-xl font-semibold"
                                            style={{
                                              fontFamily: mockupData.designSystem.typography?.headings || 'Inter',
                                              color: mockupData.designSystem.colorPalette?.primary || '#1f2937'
                                            }}
                                          >
                                            Secondary Heading Style
                                          </div>
                                          <div 
                                            className="text-base"
                                            style={{
                                              fontFamily: mockupData.designSystem.typography?.body || 'Open Sans',
                                              color: mockupData.designSystem.colorPalette?.text || '#374151'
                                            }}
                                          >
                                            This is how body text will appear throughout the website. It's readable, professional, and matches the overall design aesthetic.
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Layout & Visual Style */}
                                  <div className="bg-white dark:bg-slate-900 rounded-lg p-6 shadow-sm">
                                    <h4 className="font-semibold mb-4 text-lg">Layout & Visual Design</h4>
                                    <div className="grid md:grid-cols-2 gap-6">
                                      <div>
                                        <div className="mb-3"><strong>Layout Style:</strong> {mockupData.designSystem.layoutStyle}</div>
                                        <div className="mb-3"><strong>Visual Approach:</strong> {mockupData.designSystem.visualStyle}</div>
                                        {mockupData.designSystem.borderRadius && (
                                          <div className="mb-3"><strong>Border Radius:</strong> {mockupData.designSystem.borderRadius}</div>
                                        )}
                                      </div>
                                      <div>
                                        {mockupData.designSystem.spacing && (
                                          <div>
                                            <div className="text-sm font-medium mb-2">Spacing System:</div>
                                            {Object.entries(mockupData.designSystem.spacing).map(([type, value]: [string, any]) => (
                                              <div key={type} className="text-sm mb-1">
                                                <span className="font-medium capitalize">{type.replace(/([A-Z])/g, ' $1')}:</span> {value}
                                              </div>
                                            ))}
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </div>

                                  {/* Responsive Design */}
                                  {mockupData.responsiveDesign && (
                                    <div className="bg-white dark:bg-slate-900 rounded-lg p-6 shadow-sm">
                                      <h4 className="font-semibold mb-4 text-lg">Responsive Design Strategy</h4>
                                      <div className="grid md:grid-cols-3 gap-6">
                                        {Object.entries(mockupData.responsiveDesign).map(([device, specs]: [string, any]) => (
                                          <div key={device}>
                                            <div className="font-medium mb-2 capitalize">{device}</div>
                                            {Object.entries(specs).map(([aspect, description]: [string, any]) => (
                                              <div key={aspect} className="text-sm mb-1">
                                                <span className="font-medium">{aspect.replace(/([A-Z])/g, ' $1')}:</span> {description}
                                              </div>
                                            ))}
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </TabsContent>

                          <TabsContent value="features" className="space-y-4">
                            <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 rounded-xl p-6">
                              <h3 className="text-xl font-semibold mb-4 flex items-center">
                                <Code className="w-5 h-5 mr-2" />
                                Features & Technical Specifications
                              </h3>

                              <div className="space-y-6">
                                {/* Core Features */}
                                <div className="bg-white dark:bg-slate-900 rounded-lg p-6 shadow-sm">
                                  <h4 className="font-semibold mb-4 text-lg flex items-center">
                                    <Zap className="w-4 h-4 mr-2" />
                                    Core Website Features
                                  </h4>
                                  <div className="grid md:grid-cols-2 gap-3">
                                    {mockupData.features?.map((feature: string, index: number) => (
                                      <div key={index} className="flex items-center">
                                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                                        <span className="text-sm">{feature}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                {/* Technical Recommendations */}
                                {mockupData.technicalRecommendations && (
                                  <div className="bg-white dark:bg-slate-900 rounded-lg p-6 shadow-sm">
                                    <h4 className="font-semibold mb-4 text-lg flex items-center">
                                      <Code className="w-4 h-4 mr-2" />
                                      Technical Implementation
                                    </h4>
                                    <div className="space-y-3">
                                      {mockupData.technicalRecommendations.map((rec: string, index: number) => (
                                        <div key={index} className="flex items-start">
                                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2"></div>
                                          <span className="text-sm">{rec}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {/* Content Strategy */}
                                {mockupData.contentStrategy && (
                                  <div className="bg-white dark:bg-slate-900 rounded-lg p-6 shadow-sm">
                                    <h4 className="font-semibold mb-4 text-lg">Content Strategy</h4>
                                    <div className="grid md:grid-cols-2 gap-6">
                                      <div>
                                        <div className="mb-3"><strong>Brand Tone:</strong> {mockupData.contentStrategy.tone}</div>
                                        <div className="mb-3"><strong>Key Messaging:</strong> {mockupData.contentStrategy.messaging}</div>
                                      </div>
                                      <div>
                                        {mockupData.contentStrategy.seoKeywords && (
                                          <div className="mb-3">
                                            <strong>SEO Keywords:</strong>
                                            <div className="flex flex-wrap gap-2 mt-2">
                                              {mockupData.contentStrategy.seoKeywords.map((keyword: string, index: number) => (
                                                <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                                                  {keyword}
                                                </span>
                                              ))}
                                            </div>
                                          </div>
                                        )}
                                        {mockupData.contentStrategy.callsToAction && (
                                          <div>
                                            <strong>Call-to-Actions:</strong>
                                            <div className="flex flex-wrap gap-2 mt-2">
                                              {mockupData.contentStrategy.callsToAction.map((cta: string, index: number) => (
                                                <span key={index} className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                                                  {cta}
                                                </span>
                                              ))}
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                )}

                                {/* Additional Pages */}
                                {mockupData.additionalPages && (
                                  <div className="bg-white dark:bg-slate-900 rounded-lg p-6 shadow-sm">
                                    <h4 className="font-semibold mb-4 text-lg">Recommended Additional Pages</h4>
                                    <div className="grid md:grid-cols-2 gap-4">
                                      {mockupData.additionalPages.map((page: any, index: number) => (
                                        <div key={index} className="border rounded-lg p-4">
                                          <div className="font-medium mb-2">{page.name}</div>
                                          <div className="text-sm text-gray-600 mb-2">{page.purpose}</div>
                                          <div className="text-xs text-gray-500">{page.keyContent}</div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {/* Website Sections Detail */}
                                <div className="bg-white dark:bg-slate-900 rounded-lg p-6 shadow-sm">
                                  <h4 className="font-semibold mb-4 text-lg">Page Sections Overview</h4>
                                  <div className="space-y-4">
                                    {mockupData.sections?.map((section: any, index: number) => (
                                      <div key={index} className="border-l-4 border-blue-500 pl-4">
                                        <div className="font-medium text-lg mb-1">{section.name}</div>
                                        <div className="text-sm text-gray-600 mb-2">{section.title}</div>
                                        <div className="text-sm text-gray-700 mb-2">{section.content?.substring(0, 150)}...</div>
                                        <div className="text-xs text-gray-500"><strong>Layout:</strong> {section.layout}</div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </TabsContent>
                        </Tabs>

                        {/* Quote Section */}
                        <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl p-6">
                          <h3 className="text-xl font-semibold mb-4 flex items-center">
                            <DollarSign className="w-5 h-5 mr-2" />
                            Professional Quote
                          </h3>

                          {quote ? (
                            <div className="space-y-4">
                              <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                                ${quote.pricing?.totalCost?.toLocaleString() || 'Contact for pricing'}
                              </div>
                              
                              {quote.pricing && (
                                <div className="space-y-2">
                                  <div className="flex justify-between">
                                    <span>Design Cost:</span>
                                    <span>${quote.pricing.designCost?.toLocaleString()}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Development Cost:</span>
                                    <span>${quote.pricing.developmentCost?.toLocaleString()}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Features Cost:</span>
                                    <span>${quote.pricing.featuresCost?.toLocaleString()}</span>
                                  </div>
                                </div>
                              )}

                              {quote.timeline && (
                                <div className="flex items-center space-x-2">
                                  <Clock className="w-4 h-4" />
                                  <span><strong>Timeline:</strong> {quote.timeline.total}</span>
                                </div>
                              )}

                              {quote.breakdown && (
                                <div className="space-y-2">
                                  <h4 className="font-medium">Project Breakdown:</h4>
                                  {quote.breakdown.map((phase: any, index: number) => (
                                    <div key={index} className="flex justify-between text-sm">
                                      <span>{phase.phase} ({phase.duration})</span>
                                      <span>${phase.cost?.toLocaleString()}</span>
                                    </div>
                                  ))}
                                </div>
                              )}

                              <div className="pt-4 border-t">
                                <Button className="w-full bg-green-600 hover:bg-green-700">
                                  <DollarSign className="w-4 h-4 mr-2" />
                                  Get Started with This Quote
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <Button
                              onClick={generateQuote}
                              disabled={quoteLoading}
                              className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                            >
                              {quoteLoading ? (
                                <>
                                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                  AI is Calculating...
                                </>
                              ) : (
                                <>
                                  <DollarSign className="w-4 h-4 mr-2" />
                                  Generate Professional Quote
                                </>
                              )}
                            </Button>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-12 text-center">
                        <Wand2 className="w-16 h-16 mx-auto mb-4 text-slate-400" />
                        <h3 className="text-xl font-semibold mb-2">Ready to Generate</h3>
                        <p className="text-slate-600 dark:text-slate-400">
                          Fill in your company details and click "Generate AI Mockup" to see your professional website design powered by Google Gemini 2.0
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Google Gemini 2.0 Powered</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Cutting-edge AI analyzes your business and creates sophisticated, industry-specific website mockups with professional design systems
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Advanced Visual Preview</h3>
              <p className="text-slate-600 dark:text-slate-400">
                See detailed mockups with custom color palettes, typography, layout concepts, and comprehensive design systems tailored to your brand
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Intelligent Pricing</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Get accurate, detailed development quotes with project breakdowns, timelines, and professional recommendations based on current market rates
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}