import { useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Code, Smartphone, Zap, Shield, Globe, Rocket, CheckCircle, ArrowRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SEO } from "@/components/SEO"
import { useNavigate } from "react-router-dom"
import { pagesSEO, generateServiceSchema } from "@/data/seoData"

const technologies = [
  { name: "React", logo: "⚛️", description: "Modern UI library for interactive experiences" },
  { name: "Next.js", logo: "▲", description: "Full-stack React framework for production" },
  { name: "TypeScript", logo: "📘", description: "Type-safe JavaScript for robust applications" },
  { name: "Node.js", logo: "🟢", description: "Server-side JavaScript runtime" },
  { name: "Python", logo: "🐍", description: "Versatile backend development language" },
  { name: "PostgreSQL", logo: "🐘", description: "Advanced relational database system" },
  { name: "MongoDB", logo: "🍃", description: "Flexible NoSQL database solution" },
  { name: "AWS", logo: "☁️", description: "Scalable cloud infrastructure" }
]

const services = [
  {
    icon: Code,
    title: "Custom Web Applications",
    description: "Tailored web applications built with modern frameworks and best practices for optimal performance and user experience.",
    features: ["React/Next.js Development", "API Integration", "Database Design", "Authentication Systems"],
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Smartphone,
    title: "Responsive Design",
    description: "Mobile-first responsive websites that look and perform perfectly across all devices and screen sizes.",
    features: ["Mobile-First Approach", "Cross-Browser Compatibility", "Touch-Friendly Interfaces", "Progressive Web Apps"],
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    description: "Lightning-fast websites optimized for speed, SEO, and user experience with advanced performance techniques.",
    features: ["Core Web Vitals Optimization", "Image Optimization", "Code Splitting", "CDN Integration"],
    color: "from-green-500 to-teal-500"
  },
  {
    icon: Shield,
    title: "Security & Maintenance",
    description: "Robust security measures and ongoing maintenance to keep your website secure and up-to-date.",
    features: ["SSL Certificates", "Security Audits", "Regular Updates", "Backup Solutions"],
    color: "from-red-500 to-orange-500"
  },
  {
    icon: Globe,
    title: "E-commerce Solutions",
    description: "Complete e-commerce platforms with payment processing, inventory management, and customer analytics.",
    features: ["Shopping Cart Integration", "Payment Gateways", "Inventory Management", "Order Tracking"],
    color: "from-yellow-500 to-orange-500"
  },
  {
    icon: Rocket,
    title: "Cloud Deployment",
    description: "Scalable cloud hosting and deployment solutions for reliable performance and automatic scaling.",
    features: ["AWS/Vercel Deployment", "Auto-Scaling", "Load Balancing", "Monitoring & Analytics"],
    color: "from-indigo-500 to-purple-500"
  }
]

const process = [
  {
    step: "01",
    title: "Discovery & Planning",
    description: "We start by understanding your business goals, target audience, and technical requirements to create a comprehensive project roadmap."
  },
  {
    step: "02",
    title: "Design & Prototyping",
    description: "Our design team creates wireframes and interactive prototypes to visualize the user experience and interface design."
  },
  {
    step: "03",
    title: "Development & Testing",
    description: "We build your application using modern technologies with rigorous testing to ensure quality and performance."
  },
  {
    step: "04",
    title: "Launch & Support",
    description: "We deploy your website and provide ongoing support, maintenance, and optimization to ensure continued success."
  }
]

const portfolio = [
  {
    title: "E-commerce Platform",
    description: "Modern online store with advanced filtering, payment processing, and inventory management",
    tech: ["React", "Node.js", "PostgreSQL", "Stripe"],
    image: "🛒"
  },
  {
    title: "SaaS Dashboard",
    description: "Complex data visualization dashboard with real-time analytics and user management",
    tech: ["Next.js", "TypeScript", "MongoDB", "Chart.js"],
    image: "📊"
  },
  {
    title: "Healthcare Portal",
    description: "HIPAA-compliant patient portal with appointment scheduling and secure messaging",
    tech: ["React", "Python", "PostgreSQL", "AWS"],
    image: "🏥"
  }
]

export function WebDevelopment() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Services", url: "/services" },
    { name: "Web Development", url: "/services/web-development" }
  ]

  const serviceSchema = generateServiceSchema({
    name: "Custom Web Development",
    description: "Professional web development services using cutting-edge technologies including React, Node.js, and modern frameworks."
  })

  const webDevSchema = [
    serviceSchema,
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": pagesSEO.webDevelopment.title,
      "description": pagesSEO.webDevelopment.description,
      "url": "https://webnaster.com/services/web-development",
      "mainEntity": {
        "@type": "Service",
        "name": "Web Development Services",
        "description": "Custom web development solutions including responsive websites, web applications, and e-commerce platforms.",
        "serviceType": "Web Development",
        "provider": {
          "@type": "Organization",
          "name": "WebNaster.com"
        }
      }
    }
  ]

  return (
    <>
      <SEO
        title={pagesSEO.webDevelopment.title}
        description={pagesSEO.webDevelopment.description}
        keywords={pagesSEO.webDevelopment.keywords}
        canonicalUrl="/services/web-development"
        ogType={pagesSEO.webDevelopment.ogType}
        structuredData={webDevSchema}
        breadcrumbs={breadcrumbs}
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
                Web Development Services
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                Custom Web Development
                <br />
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
                  That Drives Results
                </span>
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-400 max-w-4xl mx-auto mb-8">
                We build modern, scalable web applications using cutting-edge technologies like React, Next.js, and Node.js. 
                From simple websites to complex enterprise solutions, we deliver exceptional digital experiences.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  onClick={() => navigate('/contact')}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  Start Your Project
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  View Our Work
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Technologies Section */}
        <section className="py-16 px-6 bg-white/50 dark:bg-slate-800/50">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
                Technologies We Master
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                We use the latest and most reliable technologies to build your web applications
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {technologies.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                >
                  <Card className="group h-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <CardContent className="p-6 text-center">
                      <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                        {tech.logo}
                      </div>
                      <h3 className="font-bold text-slate-900 dark:text-white mb-2">
                        {tech.name}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {tech.description}
                      </p>
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
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
                Our Web Development Services
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                Comprehensive web development solutions tailored to your business needs
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.8 + index * 0.1 }}
                >
                  <Card className="group h-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                    <CardHeader className="pb-4">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} p-4 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <service.icon className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">
                        {service.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-600 dark:text-slate-400 mb-4">
                        {service.description}
                      </p>
                      <ul className="space-y-2">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-16 px-6 bg-white/50 dark:bg-slate-800/50">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
                Our Development Process
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                A proven methodology that ensures successful project delivery
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {process.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 1.4 + index * 0.1 }}
                  className="relative"
                >
                  <Card className="h-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
                    <CardContent className="p-6">
                      <div className="text-4xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text mb-4">
                        {step.step}
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                        {step.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400">
                        {step.description}
                      </p>
                    </CardContent>
                  </Card>
                  {index < process.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                      <ArrowRight className="w-8 h-8 text-slate-400" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
                Recent Projects
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Showcasing our latest web development work
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolio.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 2 + index * 0.1 }}
                >
                  <Card className="group h-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                    <CardContent className="p-6">
                      <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                        {project.image}
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                        {project.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 mb-4">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
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
              transition={{ duration: 0.8, delay: 2.4 }}
            >
              <Card className="bg-gradient-to-br from-blue-600 via-purple-600 to-teal-600 text-white border-0 shadow-2xl">
                <CardContent className="p-10">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Ready to Build Something Amazing?
                  </h2>
                  <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
                    Let's discuss your web development project and create a solution that exceeds your expectations.
                    Get a free consultation and project estimate today.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      size="lg"
                      onClick={() => navigate('/contact')}
                      className="bg-white text-blue-600 hover:bg-slate-100"
                    >
                      Get Free Consultation
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      onClick={() => navigate('/about')}
                      className="border-white text-white hover:bg-white/10"
                    >
                      Learn About Us
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