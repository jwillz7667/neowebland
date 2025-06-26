import { useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ShoppingCart, CreditCard, Smartphone, BarChart3, Shield, Zap, Users, Globe, Package, TrendingUp, Star, CheckCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SEO } from "@/components/SEO"
import { useNavigate } from "react-router-dom"

const features = [
  {
    icon: ShoppingCart,
    title: "Custom Shopping Cart",
    description: "Intuitive shopping cart with advanced features like saved items, quick checkout, and abandoned cart recovery.",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: CreditCard,
    title: "Secure Payment Processing",
    description: "Multiple payment gateways including Stripe, PayPal, and Apple Pay with PCI compliance and fraud protection.",
    color: "from-green-500 to-teal-500"
  },
  {
    icon: Smartphone,
    title: "Mobile-First Design",
    description: "Responsive design optimized for mobile shopping with touch-friendly interfaces and fast loading times.",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: BarChart3,
    title: "Analytics & Reporting",
    description: "Comprehensive analytics dashboard with sales reports, customer insights, and conversion tracking.",
    color: "from-orange-500 to-red-500"
  },
  {
    icon: Shield,
    title: "Security & Compliance",
    description: "SSL certificates, data encryption, GDPR compliance, and regular security updates for peace of mind.",
    color: "from-indigo-500 to-purple-500"
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    description: "Lightning-fast loading speeds with CDN integration, image optimization, and caching strategies.",
    color: "from-yellow-500 to-orange-500"
  }
]

const platforms = [
  {
    name: "Shopify",
    description: "Perfect for small to medium businesses looking for an all-in-one solution",
    features: ["Easy setup", "App ecosystem", "Built-in hosting", "Mobile responsive themes"],
    bestFor: "Quick launch, ease of use"
  },
  {
    name: "WooCommerce",
    description: "WordPress-based solution offering maximum customization and flexibility",
    features: ["Full customization", "SEO friendly", "Extensive plugins", "Cost effective"],
    bestFor: "Custom requirements, content marketing"
  },
  {
    name: "Magento",
    description: "Enterprise-level platform for large-scale e-commerce operations",
    features: ["Multi-store management", "Advanced B2B features", "Scalable architecture", "Rich functionality"],
    bestFor: "Large catalogs, complex requirements"
  },
  {
    name: "Custom Solutions",
    description: "Bespoke e-commerce platforms built from scratch for unique needs",
    features: ["Complete control", "Unique features", "Scalable design", "Brand-specific UX"],
    bestFor: "Unique business models, maximum control"
  }
]

const services = [
  {
    icon: Globe,
    title: "E-commerce Strategy",
    description: "Comprehensive planning including market analysis, competitor research, and conversion optimization strategies."
  },
  {
    icon: Package,
    title: "Product Catalog Setup",
    description: "Professional product photography, compelling descriptions, and organized category structures."
  },
  {
    icon: Users,
    title: "User Experience Design",
    description: "Customer journey mapping, wireframing, and user testing to maximize conversions."
  },
  {
    icon: TrendingUp,
    title: "Conversion Optimization",
    description: "A/B testing, checkout optimization, and performance monitoring to increase sales."
  }
]

const testimonials = [
  {
    name: "Sarah Johnson",
    company: "Boutique Fashion Co.",
    text: "WebNaster transformed our online store completely. Sales increased by 300% in the first quarter after launch!",
    rating: 5
  },
  {
    name: "Mike Chen",
    company: "Tech Gadgets Plus",
    text: "The custom features they built for our B2B portal saved us countless hours. Exceptional work and support.",
    rating: 5
  },
  {
    name: "Lisa Rodriguez",
    company: "Artisan Crafts Market",
    text: "From design to launch, the team was professional and delivered exactly what we envisioned. Highly recommended!",
    rating: 5
  }
]

export function ECommerce() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "E-commerce Development Services",
    "description": "Professional e-commerce website development with custom shopping carts, secure payment processing, and mobile optimization.",
    "provider": {
      "@type": "Organization",
      "name": "WebNaster.com",
      "url": "https://webnaster.com"
    },
    "areaServed": "Minneapolis-St. Paul Metro Area",
    "serviceType": "E-commerce Development",
    "offers": {
      "@type": "Offer",
      "description": "Custom e-commerce solutions starting from $2,500"
    }
  }

  return (
    <>
      <SEO
        title="E-commerce Development Services - Custom Online Stores"
        description="Professional e-commerce development services in Minneapolis. Custom online stores with secure payments, mobile optimization, and conversion-focused design. Shopify, WooCommerce & custom solutions."
        keywords="e-commerce development, online store design, Shopify development, WooCommerce, custom e-commerce, Minneapolis e-commerce developer"
        canonicalUrl="/services/ecommerce"
        structuredData={structuredData}
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        {/* Hero Section */}
        <section className="py-20 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-teal-600/10" />
          
          <div className="relative z-10 max-w-7xl mx-auto">
            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <Badge variant="secondary" className="mb-4 px-4 py-2">
                E-commerce Development
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                Build Your
                <br />
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
                  Online Empire
                </span>
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-400 max-w-4xl mx-auto mb-8">
                Transform your business with a powerful e-commerce platform that drives sales, 
                delights customers, and scales with your growth. From concept to conversion.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  onClick={() => navigate('/contact')}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3"
                >
                  Start Your Store
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => document.getElementById('platforms')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-3"
                >
                  View Platforms
                </Button>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
            >
              {[
                { number: "150+", label: "Stores Built" },
                { number: "99.9%", label: "Uptime" },
                { number: "2.5s", label: "Avg Load Time" },
                { number: "24/7", label: "Support" }
              ].map((stat, index) => (
                <Card key={stat.label} className="text-center bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                      {stat.number}
                    </div>
                    <div className="text-slate-600 dark:text-slate-400 text-sm">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
                Everything You Need to Sell Online
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                Our e-commerce solutions come packed with features designed to maximize your sales and streamline operations
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
                >
                  <Card className="group h-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                    <CardHeader className="pb-4">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} p-4 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <feature.icon className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-600 dark:text-slate-400">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Platforms Section */}
        <section id="platforms" className="py-16 px-6 bg-white/50 dark:bg-slate-800/50">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
                Choose Your Perfect Platform
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                We work with all major e-commerce platforms and can build custom solutions tailored to your specific needs
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {platforms.map((platform, index) => (
                <motion.div
                  key={platform.name}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 1 + index * 0.1 }}
                >
                  <Card className="h-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-4">
                        <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white">
                          {platform.name}
                        </CardTitle>
                        <Badge variant="secondary" className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                          Popular
                        </Badge>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400">
                        {platform.description}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Key Features:</h4>
                          <ul className="space-y-1">
                            {platform.features.map((feature, idx) => (
                              <li key={idx} className="flex items-center text-slate-600 dark:text-slate-400">
                                <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            <span className="font-semibold">Best for:</span> {platform.bestFor}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
                Complete E-commerce Services
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                From strategy to launch and beyond, we provide end-to-end e-commerce solutions
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 1.4 + index * 0.1 }}
                >
                  <Card className="text-center h-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 p-4 mx-auto mb-4">
                        <service.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">
                        {service.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400">
                        {service.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 px-6 bg-white/50 dark:bg-slate-800/50">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
                Success Stories
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                See what our clients say about their e-commerce transformations
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 1.8 + index * 0.1 }}
                >
                  <Card className="h-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 mb-4 italic">
                        "{testimonial.text}"
                      </p>
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-white">
                          {testimonial.name}
                        </p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          {testimonial.company}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 2 }}
            >
              <Card className="bg-gradient-to-br from-blue-600 via-purple-600 to-teal-600 text-white border-0 shadow-2xl">
                <CardContent className="p-10">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Ready to Launch Your Online Store?
                  </h2>
                  <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
                    Let's build an e-commerce platform that converts visitors into customers 
                    and grows your business exponentially.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      size="lg"
                      onClick={() => navigate('/contact')}
                      className="bg-white text-blue-600 hover:bg-slate-100 px-8 py-3"
                    >
                      Get Free Consultation
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3"
                      onClick={() => window.open('tel:+16129301390', '_self')}
                    >
                      Call (612) 930-1390
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  )
}