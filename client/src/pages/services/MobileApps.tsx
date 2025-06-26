import { useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Smartphone, Tablet, Zap, Shield, Users, Star, ArrowRight, CheckCircle, Code, Palette, Rocket } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SEO } from "@/components/SEO"
import { useNavigate } from "react-router-dom"
import { pagesSEO, generateServiceSchema } from "@/data/seoData"

const features = [
  {
    icon: Smartphone,
    title: "Native iOS & Android",
    description: "Platform-specific development for optimal performance and user experience on both iOS and Android devices.",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Code,
    title: "Cross-Platform Solutions",
    description: "React Native and Flutter development for efficient cross-platform apps with native performance.",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Intuitive and beautiful mobile interfaces designed for maximum user engagement and conversion.",
    color: "from-green-500 to-teal-500"
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    description: "Lightning-fast apps optimized for speed, battery life, and smooth user interactions.",
    color: "from-yellow-500 to-orange-500"
  },
  {
    icon: Shield,
    title: "Security & Privacy",
    description: "Enterprise-grade security measures to protect user data and ensure compliance with regulations.",
    color: "from-red-500 to-pink-500"
  },
  {
    icon: Rocket,
    title: "App Store Deployment",
    description: "Complete app store submission and optimization for maximum visibility and downloads.",
    color: "from-indigo-500 to-purple-500"
  }
]

const technologies = [
  { name: "React Native", category: "Cross-Platform" },
  { name: "Flutter", category: "Cross-Platform" },
  { name: "Swift", category: "iOS Native" },
  { name: "Kotlin", category: "Android Native" },
  { name: "Firebase", category: "Backend" },
  { name: "AWS Mobile", category: "Cloud Services" },
  { name: "GraphQL", category: "API" },
  { name: "Redux", category: "State Management" }
]

const projects = [
  {
    title: "HealthTracker Pro",
    description: "A comprehensive health monitoring app with real-time data sync and AI-powered insights.",
    features: ["Real-time Health Monitoring", "AI Analytics", "Cloud Sync", "Wearable Integration"],
    image: "/projects/health-app.jpg",
    category: "Healthcare"
  },
  {
    title: "EcoCommerce",
    description: "Sustainable shopping platform with AR product visualization and carbon footprint tracking.",
    features: ["AR Product View", "Carbon Tracking", "Social Shopping", "Secure Payments"],
    image: "/projects/ecommerce-app.jpg",
    category: "E-commerce"
  },
  {
    title: "TaskFlow",
    description: "Team collaboration app with advanced project management and real-time communication.",
    features: ["Team Collaboration", "Project Management", "Real-time Chat", "File Sharing"],
    image: "/projects/productivity-app.jpg",
    category: "Productivity"
  }
]

const process = [
  {
    step: "01",
    title: "Discovery & Planning",
    description: "We analyze your requirements, target audience, and business goals to create a comprehensive mobile strategy."
  },
  {
    step: "02",
    title: "Design & Prototyping",
    description: "Create wireframes, mockups, and interactive prototypes to visualize your app before development begins."
  },
  {
    step: "03",
    title: "Development & Testing",
    description: "Build your app using best practices with continuous testing to ensure quality and performance."
  },
  {
    step: "04",
    title: "Launch & Support",
    description: "Deploy to app stores and provide ongoing maintenance, updates, and technical support."
  }
]

export function MobileApps() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Services", url: "/services" },
    { name: "Mobile Apps", url: "/services/mobile-apps" }
  ]

  const serviceSchema = generateServiceSchema({
    name: "Mobile App Development",
    description: "Professional iOS and Android mobile app development services using native and cross-platform technologies."
  })

  const mobileAppsSchema = [
    serviceSchema,
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": pagesSEO.mobileApps.title,
      "description": pagesSEO.mobileApps.description,
      "url": "https://webnaster.com/services/mobile-apps",
      "mainEntity": {
        "@type": "Service",
        "name": "Mobile App Development Services",
        "description": "Native and cross-platform mobile app development for iOS and Android that engages users and drives business growth.",
        "serviceType": "Mobile Development",
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
        title={pagesSEO.mobileApps.title}
        description={pagesSEO.mobileApps.description}
        keywords={pagesSEO.mobileApps.keywords}
        canonicalUrl="/services/mobile-apps"
        ogType={pagesSEO.mobileApps.ogType}
        structuredData={mobileAppsSchema}
        breadcrumbs={breadcrumbs}
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        {/* Hero Section */}
        <section className="py-20 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-blue-600/10 to-teal-600/10" />
          
          <div className="relative z-10 max-w-7xl mx-auto">
            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <Badge variant="secondary" className="mb-4 px-4 py-2">
                Mobile App Development
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                Build Powerful Mobile Apps
                <br />
                <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 bg-clip-text text-transparent">
                  That Users Love
                </span>
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-400 max-w-4xl mx-auto mb-8">
                From concept to app store, we create stunning mobile applications for iOS and Android 
                that engage users and drive business growth. Native performance, beautiful design, seamless experience.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  onClick={() => navigate('/contact')}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  Start Your App Project
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline">
                  View Our Portfolio
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
                { number: "150+", label: "Apps Developed" },
                { number: "4.9★", label: "App Store Rating" },
                { number: "2M+", label: "Downloads" },
                { number: "99%", label: "Client Satisfaction" }
              ].map((stat, index) => (
                <Card key={stat.label} className="text-center bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
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
                Complete Mobile Solutions
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                We offer end-to-end mobile app development services from initial concept to app store success
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

        {/* Technologies Section */}
        <section className="py-16 px-6 bg-white/50 dark:bg-slate-800/50">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
                Cutting-Edge Technologies
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                We use the latest tools and frameworks to build high-performance mobile applications
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {technologies.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                >
                  <Card className="text-center bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <CardContent className="p-4">
                      <div className="font-semibold text-slate-900 dark:text-white mb-1">
                        {tech.name}
                      </div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        {tech.category}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
                Featured Mobile Apps
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Discover some of our successful mobile app projects across different industries
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 1.4 + index * 0.2 }}
                >
                  <Card className="group h-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
                    <div className="aspect-video bg-gradient-to-br from-purple-500 to-blue-500 relative overflow-hidden">
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                      <div className="absolute top-4 left-4">
                        <Badge variant="secondary" className="bg-white/90 text-slate-900">
                          {project.category}
                        </Badge>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Smartphone className="w-16 h-16 text-white/80" />
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">
                        {project.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 mb-4">
                        {project.description}
                      </p>
                      <div className="space-y-2">
                        {project.features.map((feature) => (
                          <div key={feature} className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-sm text-slate-600 dark:text-slate-400">
                              {feature}
                            </span>
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

        {/* Process Section */}
        <section className="py-16 px-6 bg-white/50 dark:bg-slate-800/50">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
                Our Development Process
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                A proven methodology that ensures your app is delivered on time and exceeds expectations
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {process.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 1.8 + index * 0.1 }}
                >
                  <Card className="text-center h-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
                    <CardContent className="p-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                        {step.step}
                      </div>
                      <h3 className="text-lg font-bold mb-3 text-slate-900 dark:text-white">
                        {step.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 text-sm">
                        {step.description}
                      </p>
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
              <Card className="bg-gradient-to-br from-purple-600 via-blue-600 to-teal-600 text-white border-0 shadow-2xl">
                <CardContent className="p-10">
                  <Smartphone className="w-16 h-16 mx-auto mb-6 text-white/90" />
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Ready to Build Your Mobile App?
                  </h2>
                  <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
                    Let's turn your app idea into reality. Get a free consultation and project estimate today.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      size="lg"
                      onClick={() => navigate('/contact')}
                      className="bg-white text-purple-600 hover:bg-slate-100"
                    >
                      Get Free Consultation
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-white text-white hover:bg-white/10"
                    >
                      View Pricing
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