import { useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Search, TrendingUp, Target, BarChart3, Globe, Zap, CheckCircle, Star, ArrowRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SEO } from "@/components/SEO"
import { useNavigate } from "react-router-dom"
import { pagesSEO, generateServiceSchema } from "@/data/seoData"

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

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Services", url: "/services" },
    { name: "SEO Services", url: "/services/seo" }
  ]

  const serviceSchema = generateServiceSchema({
    name: "SEO Services",
    description: "Comprehensive SEO and digital marketing services that increase online visibility, drive organic traffic, and boost conversions."
  })

  const seoSchema = [
    serviceSchema,
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": pagesSEO.seoServices.title,
      "description": pagesSEO.seoServices.description,
      "url": "https://webnaster.com/services/seo",
      "mainEntity": {
        "@type": "Service",
        "name": "SEO & Digital Marketing Services",
        "description": "Professional SEO services that improve search rankings, increase organic traffic, and drive business growth.",
        "serviceType": "SEO & Digital Marketing",
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
        title={pagesSEO.seoServices.title}
        description={pagesSEO.seoServices.description}
        keywords={pagesSEO.seoServices.keywords}
        canonicalUrl="/services/seo"
        ogType={pagesSEO.seoServices.ogType}
        structuredData={seoSchema}
        breadcrumbs={breadcrumbs}
      />

      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-green-50">
        {/* Hero Section */}
        <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              SEO Services &
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-green-600"> Digital Marketing</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Increase your online visibility and drive more qualified traffic to your website with our comprehensive SEO and digital marketing services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-teal-600 to-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
                Get Started
              </button>
              <button className="border-2 border-teal-600 text-teal-600 px-8 py-3 rounded-lg font-semibold hover:bg-teal-50 transition-colors">
                Free SEO Audit
              </button>
            </div>
          </div>
        </section>

        {/* SEO Services */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our SEO Services</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Technical SEO",
                  description: "Optimize your website's technical foundation for better search engine crawling and indexing.",
                  icon: "⚙️",
                  features: ["Site Speed Optimization", "Mobile Optimization", "Schema Markup", "XML Sitemaps"]
                },
                {
                  title: "On-Page SEO",
                  description: "Optimize individual pages for target keywords and improve content relevance.",
                  icon: "📄",
                  features: ["Keyword Research", "Content Optimization", "Meta Tags", "Internal Linking"]
                },
                {
                  title: "Local SEO",
                  description: "Improve your visibility in local search results and attract nearby customers.",
                  icon: "📍",
                  features: ["Google My Business", "Local Citations", "Review Management", "Local Keywords"]
                },
                {
                  title: "Content Marketing",
                  description: "Create valuable, engaging content that attracts and converts your target audience.",
                  icon: "✍️",
                  features: ["Blog Content", "Landing Pages", "Content Strategy", "Content Optimization"]
                },
                {
                  title: "Link Building",
                  description: "Build high-quality backlinks to improve your domain authority and search rankings.",
                  icon: "🔗",
                  features: ["Quality Backlinks", "Guest Posting", "Resource Building", "Competitor Analysis"]
                },
                {
                  title: "SEO Analytics",
                  description: "Track performance, measure results, and continuously optimize your SEO strategy.",
                  icon: "📊",
                  features: ["Rank Tracking", "Traffic Analysis", "Conversion Tracking", "Reporting"]
                }
              ].map((service, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-600">
                        <span className="text-green-500 mr-2">✓</span>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SEO Process */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our SEO Process</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  step: "01",
                  title: "SEO Audit",
                  description: "Comprehensive analysis of your current SEO performance and opportunities.",
                  icon: "🔍"
                },
                {
                  step: "02",
                  title: "Strategy Development",
                  description: "Create a customized SEO strategy based on your business goals and competition.",
                  icon: "📋"
                },
                {
                  step: "03",
                  title: "Implementation",
                  description: "Execute on-page and technical optimizations across your website.",
                  icon: "🛠️"
                },
                {
                  step: "04",
                  title: "Monitor & Optimize",
                  description: "Continuous monitoring, reporting, and optimization for better results.",
                  icon: "📈"
                }
              ].map((process, index) => (
                <div key={index} className="text-center">
                  <div className="bg-gradient-to-r from-teal-600 to-green-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    {process.step}
                  </div>
                  <div className="text-4xl mb-4">{process.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{process.title}</h3>
                  <p className="text-gray-600">{process.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Results & Benefits */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">What You Can Expect</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "Increased Traffic",
                  description: "More qualified visitors finding your website through search engines.",
                  icon: "📊",
                  metric: "150%+"
                },
                {
                  title: "Higher Rankings",
                  description: "Improved search engine rankings for your target keywords.",
                  icon: "🏆",
                  metric: "Top 10"
                },
                {
                  title: "Better Conversions",
                  description: "More website visitors converting into customers and leads.",
                  icon: "💰",
                  metric: "85%+"
                },
                {
                  title: "Brand Visibility",
                  description: "Increased online presence and brand awareness in your market.",
                  icon: "🎯",
                  metric: "3x More"
                }
              ].map((benefit, index) => (
                <div key={index} className="bg-gradient-to-br from-teal-50 to-green-50 rounded-xl p-6 text-center">
                  <div className="text-4xl mb-4">{benefit.icon}</div>
                  <div className="text-2xl font-bold text-teal-600 mb-2">{benefit.metric}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Boost Your Search Rankings?</h2>
            <p className="text-lg text-gray-600 mb-8">
              Get a free SEO audit and discover how we can help increase your online visibility and drive more qualified traffic.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-teal-600 to-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
                Get Free SEO Audit
              </button>
              <button className="border-2 border-teal-600 text-teal-600 px-8 py-3 rounded-lg font-semibold hover:bg-teal-50 transition-colors">
                Contact Us
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}