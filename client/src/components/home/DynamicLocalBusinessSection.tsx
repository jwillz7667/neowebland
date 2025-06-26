import { useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { MapPin, Clock, TrendingUp, Shield, Smartphone, Search } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useGeolocation } from "@/hooks/useGeolocation"
import { getLocationConfig } from "@/utils/locationConfig"

export function DynamicLocalBusinessSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const location = useGeolocation()
  const locationConfig = getLocationConfig(location.city, location.state)

  useEffect(() => {
    console.log("DynamicLocalBusinessSection mounted")
    console.log("Location state:", location)
    console.log("Location config:", locationConfig)
  }, [location, locationConfig])

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact")
    contactSection?.scrollIntoView({ behavior: "smooth" })
  }

  const localServices = [
    {
      icon: TrendingUp,
      title: locationConfig.services[0].title,
      description: locationConfig.services[0].description,
      localFocus: locationConfig.services[0].localFocus,
      features: ["Mobile-First Design", "Fast Loading Speed", "Modern UI/UX", "SEO Optimization"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Search,
      title: locationConfig.services[1].title,
      description: locationConfig.services[1].description,
      localFocus: locationConfig.services[1].localFocus,
      features: ["Google My Business", "Local Keywords", "Citation Building", "Review Management"],
      color: "from-green-500 to-teal-500"
    },
    {
      icon: Smartphone,
      title: locationConfig.services[2].title,
      description: locationConfig.services[2].description,
      localFocus: locationConfig.services[2].localFocus,
      features: ["Responsive Design", "Touch-Friendly", "Fast Mobile Loading", "App-Like Experience"],
      color: "from-purple-500 to-pink-500"
    }
  ]

  // Show content immediately without loading state
  return (
    <section id="local-business" className="py-10 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-emerald-900/20 dark:to-slate-900" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <Badge variant="secondary" className="mb-4 px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300">
            <MapPin className="w-4 h-4 mr-2" />
            {locationConfig.city}, {locationConfig.state} Local Business
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
            Modernize Your Website
            <br />
            <span className="bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Dominate {locationConfig.city} Search
            </span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-4xl mx-auto">
            Is your website stuck in 2010? We help {locationConfig.city} small businesses upgrade their outdated websites
            to modern, mobile-friendly designs that rank #1 on Google and convert visitors into customers.
          </p>
        </motion.div>

        {/* Problem/Solution Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10"
        >
          {/* Problem Card */}
          <Card className="bg-red-50/80 dark:bg-red-900/20 backdrop-blur-sm border-red-200 dark:border-red-800 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-red-800 dark:text-red-300 flex items-center gap-2">
                <Clock className="w-6 h-6" />
                Is Your Website Hurting Your {locationConfig.city} Business?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-slate-700 dark:text-slate-300">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                  <span>Local customers can't find you on Google searches</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                  <span>Website looks unprofessional on mobile phones</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                  <span>Slow loading times drive {locationConfig.city} customers away</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                  <span>Outdated design makes you look behind the times</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                  <span>Losing customers to competitors with modern websites</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Solution Card */}
          <Card className="bg-emerald-50/80 dark:bg-emerald-900/20 backdrop-blur-sm border-emerald-200 dark:border-emerald-800 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                <Shield className="w-6 h-6" />
                We Fix Everything & Get You Ranking #1 in {locationConfig.city}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-slate-700 dark:text-slate-300">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                  <span>Rank #1 for "{locationConfig.seoKeywords[0]}" and local searches</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                  <span>Mobile-first design that works perfectly on all devices</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                  <span>Lightning-fast loading speeds (under 3 seconds)</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                  <span>Modern, professional design that builds trust</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                  <span>Convert 3x more {locationConfig.city} visitors into paying customers</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {localServices.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
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
                  <p className="text-slate-600 dark:text-slate-400 mb-3">
                    {service.description}
                  </p>
                  <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium mb-4">
                    {service.localFocus}
                  </p>
                  <div className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.color}`} />
                        <span className="text-sm text-slate-700 dark:text-slate-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Local Areas */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mb-8"
        >
          <h3 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">
            Serving Small Businesses Throughout {locationConfig.city} and Surrounding Areas
          </h3>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {locationConfig.areas.map((area, index) => (
              <Badge
                key={area}
                variant="outline"
                className="px-4 py-2 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-slate-200 dark:border-slate-700 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors duration-300"
              >
                {area}
              </Badge>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center"
        >
          <Card className="bg-gradient-to-br from-emerald-500 via-blue-600 to-purple-600 text-white border-0 shadow-2xl">
            <CardContent className="p-10">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Dominate {locationConfig.city} Search Results?
              </h3>
              <p className="text-xl mb-8 text-white/90 max-w-3xl mx-auto">
                {locationConfig.marketingMessage}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  size="lg"
                  onClick={scrollToContact}
                  className="bg-white text-slate-900 hover:bg-slate-100 px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <MapPin className="w-5 h-5 mr-2" />
                  Get Free {locationConfig.city} SEO Audit
                </Button>
                <div className="text-white/80 text-sm">
                  ⭐ 5.0 Rating • 200+ Local Projects • Same-Day Response
                </div>
              </div>
              <div className="mt-6 text-white/70 text-sm">
                📞 {locationConfig.phoneNumber} • {locationConfig.businessHours}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}