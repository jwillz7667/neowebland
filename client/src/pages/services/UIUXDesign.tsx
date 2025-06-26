import { useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Palette, Users, Zap, Target, Eye, Smartphone, Monitor, Tablet } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SEO } from "@/components/SEO"
import { useNavigate } from "react-router-dom"

const services = [
  {
    icon: Eye,
    title: "User Experience (UX) Design",
    description: "Research-driven UX design that creates intuitive, user-friendly experiences that convert visitors into customers.",
    features: ["User Research & Analysis", "Information Architecture", "User Journey Mapping", "Wireframing & Prototyping"]
  },
  {
    icon: Palette,
    title: "User Interface (UI) Design",
    description: "Beautiful, modern interfaces that capture your brand essence while providing exceptional usability.",
    features: ["Visual Design Systems", "Interactive Prototypes", "Brand Integration", "Accessibility Compliance"]
  },
  {
    icon: Smartphone,
    title: "Mobile-First Design",
    description: "Responsive designs optimized for mobile devices, ensuring perfect experiences across all screen sizes.",
    features: ["Mobile Optimization", "Touch-Friendly Interfaces", "Progressive Web Apps", "Cross-Platform Consistency"]
  },
  {
    icon: Target,
    title: "Conversion Optimization",
    description: "Strategic design decisions focused on improving conversion rates and achieving your business goals.",
    features: ["A/B Testing", "Conversion Funnels", "Call-to-Action Optimization", "Performance Analytics"]
  }
]

const process = [
  {
    step: "01",
    title: "Discovery & Research",
    description: "We start by understanding your users, business goals, and competitive landscape through comprehensive research.",
    color: "from-purple-500 to-pink-500"
  },
  {
    step: "02",
    title: "Strategy & Planning",
    description: "Define user personas, create user journeys, and establish the information architecture for optimal user flow.",
    color: "from-blue-500 to-cyan-500"
  },
  {
    step: "03",
    title: "Wireframing & Prototyping",
    description: "Create low and high-fidelity wireframes and interactive prototypes to test concepts before development.",
    color: "from-green-500 to-teal-500"
  },
  {
    step: "04",
    title: "Visual Design",
    description: "Craft beautiful, on-brand visual designs that engage users and reinforce your brand identity.",
    color: "from-yellow-500 to-orange-500"
  },
  {
    step: "05",
    title: "Testing & Iteration",
    description: "Conduct usability testing and iterate based on user feedback to ensure optimal user experience.",
    color: "from-red-500 to-pink-500"
  },
  {
    step: "06",
    title: "Launch & Optimization",
    description: "Launch your design and continuously optimize based on user behavior and performance metrics.",
    color: "from-indigo-500 to-purple-500"
  }
]

const portfolio = [
  {
    title: "E-commerce Platform",
    category: "Retail",
    description: "Complete UX/UI redesign that increased conversion rates by 45% and reduced bounce rate by 30%.",
    metrics: ["45% increase in conversions", "30% reduction in bounce rate", "60% improvement in user satisfaction"],
    image: "/portfolio/ecommerce-ui.jpg"
  },
  {
    title: "SaaS Dashboard",
    category: "Technology",
    description: "Intuitive dashboard design for complex data visualization, improving user productivity by 40%.",
    metrics: ["40% increase in productivity", "25% reduction in support tickets", "90% user adoption rate"],
    image: "/portfolio/saas-dashboard.jpg"
  },
  {
    title: "Mobile Banking App",
    category: "Finance",
    description: "Secure, user-friendly mobile banking interface with biometric authentication and seamless transactions.",
    metrics: ["50% faster transactions", "95% security compliance", "4.8/5 app store rating"],
    image: "/portfolio/banking-app.jpg"
  }
]

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Marketing Director",
    company: "TechStart Inc.",
    content: "The UI/UX redesign transformed our user engagement completely. Our conversion rates increased by 60% within the first month.",
    rating: 5
  },
  {
    name: "Michael Chen",
    role: "Product Manager",
    company: "InnovateCorp",
    content: "WebNaster's design team created an intuitive interface that our users love. The attention to detail is exceptional.",
    rating: 5
  },
  {
    name: "Emily Rodriguez",
    role: "CEO",
    company: "GrowthLab",
    content: "Professional, creative, and results-driven. They delivered a design that perfectly captures our brand and converts visitors.",
    rating: 5
  }
]

export function UIUXDesign() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "UI/UX Design Services",
    "description": "Professional UI/UX design services including user experience design, user interface design, mobile-first design, and conversion optimization.",
    "provider": {
      "@type": "Organization",
      "name": "WebNaster.com",
      "url": "https://webnaster.com"
    },
    "serviceType": "UI/UX Design",
    "areaServed": "Minneapolis-St. Paul Metro Area",
    "offers": {
      "@type": "Offer",
      "description": "Custom UI/UX design solutions for web and mobile applications"
    }
  }

  return (
    <>
      <SEO
        title="UI/UX Design Services - User-Centered Design Solutions"
        description="Professional UI/UX design services in Minneapolis. We create user-centered designs that improve conversions, enhance user experience, and drive business growth."
        keywords="UI UX design Minneapolis, user experience design, user interface design, mobile app design, conversion optimization, usability testing"
        canonicalUrl="/services/ui-ux-design"
        structuredData={structuredData}
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        {/* Hero Section */}
        <section className="py-20 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-pink-600/10 to-blue-600/10" />
          
          <div className="relative z-10 max-w-7xl mx-auto">
            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <Badge variant="secondary" className="mb-4 px-4 py-2">
                UI/UX Design Services
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                User-Centered Design
                <br />
                <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                  That Converts
                </span>
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-400 max-w-4xl mx-auto mb-8">
                We create intuitive, beautiful, and conversion-focused UI/UX designs that put your users first
                and drive measurable business results through research-driven design decisions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  onClick={() => navigate('/contact')}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3"
                >
                  Start Your Design Project
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate('/contact')}
                  className="border-purple-200 text-purple-700 hover:bg-purple-50 px-8 py-3"
                >
                  View Portfolio
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
                { number: "200+", label: "UI/UX Projects" },
                { number: "45%", label: "Avg. Conversion Increase" },
                { number: "98%", label: "Client Satisfaction" },
                { number: "30%", label: "Avg. Bounce Rate Reduction" }
              ].map((stat, index) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-slate-600 dark:text-slate-400 text-sm">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
                Our UI/UX Design Services
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                Comprehensive design solutions that create exceptional user experiences and drive business growth
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
                >
                  <Card className="group h-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                    <CardHeader className="pb-4">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 p-4 mb-4 group-hover:scale-110 transition-transform duration-300">
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
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                            <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-3" />
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
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
                Our Design Process
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                A proven methodology that ensures exceptional results every time
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {process.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 1 + index * 0.1 }}
                >
                  <Card className="group h-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <span className="text-white font-bold text-lg">{step.step}</span>
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">
                        {step.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400">
                        {step.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
                Featured Design Projects
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Real results from our UI/UX design projects
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {portfolio.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 1.4 + index * 0.1 }}
                >
                  <Card className="group h-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                    <div className="aspect-video bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-t-lg flex items-center justify-center">
                      <div className="text-center">
                        <Monitor className="w-16 h-16 text-purple-400 mx-auto mb-2" />
                        <p className="text-sm text-slate-600 dark:text-slate-400">Design Preview</p>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                          {project.title}
                        </h3>
                        <Badge variant="secondary">{project.category}</Badge>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 mb-4">
                        {project.description}
                      </p>
                      <div className="space-y-2">
                        {project.metrics.map((metric, idx) => (
                          <div key={idx} className="flex items-center text-sm">
                            <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-3" />
                            <span className="text-slate-600 dark:text-slate-400">{metric}</span>
                          </div>
                        ))}
                      </div>
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
                What Our Clients Say
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Hear from businesses who've transformed their user experience with our designs
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
                          <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 mb-4 italic">
                        "{testimonial.content}"
                      </p>
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-white">
                          {testimonial.name}
                        </p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          {testimonial.role}, {testimonial.company}
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
              <Card className="bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 text-white border-0 shadow-2xl">
                <CardContent className="p-10">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Ready to Transform Your User Experience?
                  </h2>
                  <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
                    Let's create a design that not only looks amazing but drives real business results.
                    Get started with a free consultation today.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      size="lg"
                      onClick={() => navigate('/contact')}
                      className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3"
                    >
                      Start Your Project
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      onClick={() => navigate('/contact')}
                      className="border-white text-white hover:bg-white/10 px-8 py-3"
                    >
                      Schedule Consultation
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