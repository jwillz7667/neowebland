import { useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Search, TrendingUp, Target, BarChart3, Globe, Zap, CheckCircle, Star, ArrowRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SEO } from "@/components/SEO"
import { useNavigate } from "react-router-dom"

const seoServices = [
  {
    icon: Search,
    title: "Keyword Research & Strategy",
    description: "Comprehensive keyword analysis to identify high-value opportunities and create targeted content strategies that drive qualified traffic.",
    features: ["Competitor keyword analysis", "Long-tail keyword discovery", "Search intent mapping", "Keyword difficulty assessment"],
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: TrendingUp,
    title: "On-Page SEO Optimization",
    description: "Complete optimization of your website's content, structure, and technical elements to improve search engine rankings.",
    features: ["Title tag optimization", "Meta description crafting", "Header structure improvement", "Internal linking strategy"],
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: Globe,
    title: "Technical SEO Audit",
    description: "In-depth technical analysis to identify and fix issues that may be preventing your site from ranking higher.",
    features: ["Site speed optimization", "Mobile responsiveness check", "Schema markup implementation", "XML sitemap optimization"],
    color: "from-green-500 to-teal-500"
  },
  {
    icon: Target,
    title: "Local SEO Services",
    description: "Dominate local search results and attract customers in your area with targeted local SEO strategies.",
    features: ["Google My Business optimization", "Local citation building", "Review management", "Local keyword targeting"],
    color: "from-yellow-500 to-orange-500"
  },
  {
    icon: BarChart3,
    title: "SEO Analytics & Reporting",
    description: "Detailed tracking and reporting of your SEO performance with actionable insights for continuous improvement.",
    features: ["Ranking position tracking", "Traffic analysis", "Conversion tracking", "Monthly performance reports"],
    color: "from-red-500 to-pink-500"
  },
  {
    icon: Zap,
    title: "Content SEO Strategy",
    description: "Strategic content creation and optimization that engages users and satisfies search engine algorithms.",
    features: ["Content gap analysis", "SEO-optimized blog posts", "Landing page optimization", "Content calendar planning"],
    color: "from-indigo-500 to-purple-500"
  }
]

const benefits = [
  "Increase organic search visibility",
  "Drive qualified traffic to your website",
  "Improve user experience and engagement",
  "Build long-term sustainable growth",
  "Outrank your competitors",
  "Maximize ROI on digital marketing"
]

const testimonials = [
  {
    name: "Sarah Johnson",
    company: "TechStart Solutions",
    rating: 5,
    text: "WebNaster's SEO services transformed our online presence. We saw a 300% increase in organic traffic within 6 months!"
  },
  {
    name: "Mike Chen",
    company: "Local Fitness Studio",
    rating: 5,
    text: "Their local SEO expertise helped us dominate search results in our area. We're now the top-ranked fitness studio in Minneapolis."
  },
  {
    name: "Emily Rodriguez",
    company: "E-commerce Fashion Brand",
    rating: 5,
    text: "The keyword research and content strategy they provided doubled our online sales. Highly recommend their SEO services!"
  }
]

const process = [
  {
    step: "01",
    title: "SEO Audit & Analysis",
    description: "Comprehensive analysis of your current SEO performance, technical issues, and competitive landscape."
  },
  {
    step: "02",
    title: "Strategy Development",
    description: "Custom SEO strategy tailored to your business goals, target audience, and industry requirements."
  },
  {
    step: "03",
    title: "Implementation",
    description: "Execute on-page optimizations, technical fixes, and content improvements across your website."
  },
  {
    step: "04",
    title: "Monitoring & Optimization",
    description: "Continuous monitoring, testing, and refinement to maximize your SEO performance and ROI."
  }
]

export function SEOServices() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "SEO Services",
    "description": "Professional SEO services to improve search engine rankings, drive organic traffic, and grow your business online.",
    "provider": {
      "@type": "Organization",
      "name": "WebNaster.com",
      "url": "https://webnaster.com"
    },
    "areaServed": "Minneapolis-St. Paul Metro Area",
    "serviceType": "Search Engine Optimization",
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "priceRange": "$$"
    }
  }

  return (
    <>
      <SEO
        title="Professional SEO Services - Boost Your Search Rankings"
        description="Expert SEO services in Minneapolis. Increase organic traffic, improve search rankings, and grow your business with our proven SEO strategies and optimization techniques."
        keywords="SEO services Minneapolis, search engine optimization, organic traffic, keyword research, local SEO, technical SEO audit, content optimization"
        canonicalUrl="/services/seo"
        structuredData={structuredData}
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        {/* Hero Section */}
        <section className="py-20 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-600/10 via-blue-600/10 to-purple-600/10" />

          <div className="relative z-10 max-w-7xl mx-auto">
            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <Badge variant="secondary" className="mb-4 px-4 py-2">
                SEO Services
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                Dominate Search Results
                <br />
                <span className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Drive Organic Growth
                </span>
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-400 max-w-4xl mx-auto mb-8">
                Boost your search engine rankings, increase organic traffic, and grow your business with our
                comprehensive SEO services. Get found by customers actively searching for your products and services.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  onClick={() => navigate('/contact')}
                  className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-3"
                >
                  Get SEO Audit
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate('/contact')}
                  className="px-8 py-3"
                >
                  View SEO Packages
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
                { number: "300%", label: "Average Traffic Increase" },
                { number: "85%", label: "First Page Rankings" },
                { number: "150+", label: "SEO Projects Completed" },
                { number: "6 Months", label: "Average Results Timeline" }
              ].map((stat, index) => (
                <Card key={stat.label} className="text-center bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">
                      {stat.number}
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
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
                Comprehensive SEO Services
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                From technical audits to content optimization, we provide end-to-end SEO solutions
                that deliver measurable results for your business.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {seoServices.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
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
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center text-sm text-slate-600 dark:text-slate-400">
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
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
                Our SEO Process
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                A proven methodology that delivers consistent results
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {process.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 1 + index * 0.1 }}
                >
                  <Card className="text-center bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                        {step.step}
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

        {/* Benefits Section */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900 dark:text-white">
                  Why Choose Our SEO Services?
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
                  Our data-driven approach and proven strategies help businesses achieve sustainable
                  growth through improved search engine visibility and organic traffic.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-slate-700 dark:text-slate-300">{benefit}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 1.4 }}
              >
                <Card className="bg-gradient-to-br from-green-600 via-blue-600 to-purple-600 text-white border-0 shadow-2xl">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold mb-4">Ready to Boost Your Rankings?</h3>
                    <p className="text-white/90 mb-6">
                      Get a free SEO audit and discover how we can help your business
                      dominate search results and drive more qualified traffic.
                    </p>
                    <Button
                      size="lg"
                      onClick={() => navigate('/contact')}
                      className="bg-white text-slate-900 hover:bg-slate-100 w-full"
                    >
                      Get Free SEO Audit
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
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
                Client Success Stories
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                See how our SEO services have transformed businesses
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
                  <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 mb-4 italic">
                        "{testimonial.text}"
                      </p>
                      <div>
                        <div className="font-semibold text-slate-900 dark:text-white">
                          {testimonial.name}
                        </div>
                        <div className="text-sm text-slate-500 dark:text-slate-400">
                          {testimonial.company}
                        </div>
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
              <Card className="bg-gradient-to-br from-green-600 via-blue-600 to-purple-600 text-white border-0 shadow-2xl">
                <CardContent className="p-10">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Start Your SEO Journey Today
                  </h2>
                  <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
                    Don't let your competitors dominate search results. Get started with our
                    proven SEO strategies and watch your organic traffic soar.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      size="lg"
                      onClick={() => navigate('/contact')}
                      className="bg-white text-slate-900 hover:bg-slate-100 px-8 py-3"
                    >
                      Get Free Consultation
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      onClick={() => navigate('/contact')}
                      className="border-white text-white hover:bg-white hover:text-slate-900 px-8 py-3"
                    >
                      View Our Work
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