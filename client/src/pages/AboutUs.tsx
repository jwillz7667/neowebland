import { useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Award, Users, Target, Heart, Zap, Shield } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SEO } from "@/components/SEO"
import { useNavigate } from "react-router-dom"

const values = [
  {
    icon: Target,
    title: "Innovation First",
    description: "We stay ahead of technology trends to deliver cutting-edge solutions that give our clients a competitive advantage.",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Users,
    title: "Client-Centric Approach",
    description: "Every project starts with understanding your unique needs, goals, and challenges to create tailored solutions.",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: Heart,
    title: "Quality Craftsmanship",
    description: "We take pride in every pixel, every line of code, and every user interaction to ensure exceptional quality.",
    color: "from-green-500 to-teal-500"
  },
  {
    icon: Zap,
    title: "Speed & Efficiency",
    description: "Fast turnaround times without compromising quality, helping you get to market quickly and effectively.",
    color: "from-yellow-500 to-orange-500"
  },
  {
    icon: Shield,
    title: "Reliability & Trust",
    description: "Transparent communication, on-time delivery, and ongoing support you can count on for long-term success.",
    color: "from-red-500 to-pink-500"
  },
  {
    icon: Award,
    title: "Excellence in Everything",
    description: "Award-winning designs and development practices that consistently exceed client expectations and industry standards.",
    color: "from-indigo-500 to-purple-500"
  }
]

const milestones = [
  { year: "2019", title: "Company Founded", description: "Started with a vision to transform digital experiences" },
  { year: "2020", title: "First 100 Clients", description: "Reached our first major milestone with 100 satisfied clients" },
  { year: "2021", title: "Award Recognition", description: "Won 'Best Web Design Agency' at Minnesota Digital Awards" },
  { year: "2022", title: "Team Expansion", description: "Grew to 25+ talented designers and developers" },
  { year: "2023", title: "500+ Projects", description: "Successfully delivered over 500 projects across various industries" },
  { year: "2024", title: "AI Integration", description: "Pioneered AI-powered design and development solutions" }
]

export function AboutUs() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "WebNaster.com",
    "url": "https://webnaster.com",
    "logo": "https://webnaster.com/logo.png",
    "description": "Premium web design and development agency specializing in modern, responsive websites and digital solutions.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "18234 80th Pl N",
      "addressLocality": "Maple Grove",
      "addressRegion": "MN",
      "postalCode": "55311",
      "addressCountry": "US"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-612-930-1390",
      "contactType": "customer service"
    },
    "foundingDate": "2019",
    "numberOfEmployees": "25+",
    "areaServed": "Minneapolis-St. Paul Metro Area"
  }

  return (
    <>
      <SEO
        title="About Us - Award-Winning Web Design Agency"
        description="Learn about WebNaster.com, a premium web design and development agency in Minneapolis. Discover our story, values, and commitment to creating exceptional digital experiences."
        keywords="about WebNaster, web design agency Minneapolis, our story, company values, award-winning design team"
        canonicalUrl="/about"
        structuredData={structuredData}
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
                About WebNaster.com
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                Crafting Digital Excellence
                <br />
                <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 bg-clip-text text-transparent">
                  Since 2019
                </span>
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-400 max-w-4xl mx-auto">
                We're a passionate team of designers, developers, and digital strategists dedicated to transforming
                businesses through innovative web solutions and exceptional user experiences.
              </p>
            </motion.div>

            {/* Story Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20"
            >
              <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">Our Story</h2>
                  <div className="space-y-4 text-slate-600 dark:text-slate-400">
                    <p>
                      Founded in 2019 in the heart of Minneapolis, WebNaster.com began with a simple yet powerful vision:
                      to help businesses thrive in the digital age through exceptional web design and development.
                    </p>
                    <p>
                      What started as a small team of passionate creatives has grown into an award-winning agency
                      trusted by over 500 clients across various industries. We've had the privilege of working with
                      startups, established businesses, and everything in between.
                    </p>
                    <p>
                      Our commitment to innovation, quality, and client success has earned us recognition as one of
                      Minnesota's leading digital agencies, but we're just getting started.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">Our Mission</h2>
                  <div className="space-y-4 text-slate-600 dark:text-slate-400">
                    <p>
                      To empower businesses with cutting-edge digital solutions that not only look stunning but
                      drive real results. We believe every business deserves a digital presence that reflects
                      their unique value and connects with their audience.
                    </p>
                    <p>
                      We're committed to staying at the forefront of technology and design trends, ensuring our
                      clients always have a competitive advantage in their digital landscape.
                    </p>
                    <div className="pt-4">
                      <Button
                        onClick={() => navigate('/contact')}
                        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                      >
                        Start Your Project
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
                Our Core Values
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                These principles guide everything we do and shape how we work with our clients
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
                >
                  <Card className="group h-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                    <CardHeader className="pb-4">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${value.color} p-4 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <value.icon className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">
                        {value.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-600 dark:text-slate-400">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-16 px-6 bg-white/50 dark:bg-slate-800/50">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
                Our Journey
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Key milestones that shaped our growth and success
              </p>
            </motion.div>

            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-purple-500 to-blue-500"></div>

              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={milestone.year}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8, delay: 1 + index * 0.1 }}
                    className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                  >
                    <div className="flex-1">
                      <Card className={`bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg ${index % 2 === 0 ? 'mr-8' : 'ml-8'}`}>
                        <CardContent className="p-6">
                          <div className="flex items-center gap-4 mb-2">
                            <Badge variant="secondary" className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                              {milestone.year}
                            </Badge>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                              {milestone.title}
                            </h3>
                          </div>
                          <p className="text-slate-600 dark:text-slate-400">
                            {milestone.description}
                          </p>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full border-4 border-white dark:border-slate-900 z-10"></div>

                    <div className="flex-1"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.4 }}
            >
              <Card className="bg-gradient-to-br from-purple-600 via-blue-600 to-teal-600 text-white border-0 shadow-2xl">
                <CardContent className="p-10">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Ready to Start Your Digital Journey?
                  </h2>
                  <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
                    Let's work together to create something amazing. Join the hundreds of businesses
                    who trust WebNaster.com with their digital success.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      size="lg"
                      onClick={() => navigate('/contact')}
                      className="bg-white text-purple-600 hover:bg-slate-100 font-semibold"
                    >
                      Get Started Today
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      onClick={() => navigate('/team')}
                      className="border-white text-white hover:bg-white/10"
                    >
                      Meet Our Team
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