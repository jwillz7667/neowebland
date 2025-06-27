import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Code, Palette, Smartphone, Globe, Zap, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getServices } from "@/api/services"
import { useToast } from "@/hooks/useToast"

// TypeScript interfaces
interface Service {
  _id: string
  icon: string
  title: string
  description: string
  features: string[]
  color: string
  status?: string
}

type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>

const iconMap: { [key: string]: IconComponent } = {
  Code,
  Palette,
  Smartphone,
  Globe,
  Zap,
  Users
}

// Fallback services in case API fails
const fallbackServices = [
  {
    _id: '1',
    icon: 'Code',
    title: "Web Development",
    description: "Custom websites built with cutting-edge technologies and optimized for performance.",
    features: ["React & Next.js", "Node.js Backend", "Database Integration", "API Development"],
    color: "from-blue-500 to-cyan-500"
  },
  {
    _id: '2',
    icon: 'Palette',
    title: "UI/UX Design",
    description: "Beautiful, intuitive designs that create memorable user experiences.",
    features: ["User Research", "Wireframing", "Prototyping", "Design Systems"],
    color: "from-purple-500 to-pink-500"
  },
  {
    _id: '3',
    icon: 'Smartphone',
    title: "Mobile Apps",
    description: "Native and cross-platform mobile applications for iOS and Android.",
    features: ["React Native", "Flutter", "Native iOS/Android", "App Store Optimization"],
    color: "from-green-500 to-teal-500"
  },
  {
    _id: '4',
    icon: 'Globe',
    title: "E-commerce",
    description: "Complete e-commerce solutions that drive sales and grow your business.",
    features: ["Shopify", "WooCommerce", "Custom Solutions", "Payment Integration"],
    color: "from-orange-500 to-red-500"
  },
  {
    _id: '5',
    icon: 'Zap',
    title: "Performance Optimization",
    description: "Speed up your website and improve user experience with our optimization services.",
    features: ["Core Web Vitals", "SEO Optimization", "CDN Setup", "Caching Strategies"],
    color: "from-yellow-500 to-orange-500"
  },
  {
    _id: '6',
    icon: 'Users',
    title: "Consulting",
    description: "Strategic guidance to help you make the right technology decisions.",
    features: ["Technology Audit", "Architecture Planning", "Team Training", "Project Management"],
    color: "from-indigo-500 to-purple-500"
  }
]

const colorOptions = [
  "from-blue-500 to-cyan-500",
  "from-purple-500 to-pink-500",
  "from-green-500 to-teal-500",
  "from-orange-500 to-red-500",
  "from-yellow-500 to-orange-500",
  "from-indigo-500 to-purple-500"
]

export function ServicesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const loadServices = async () => {
      try {
        console.log("ServicesSection: Loading services from API")
        const data = await getServices()
        console.log("ServicesSection: Services data loaded:", data)

        // Map API data to include colors and proper icons
        const mappedServices = data.services.map((service: Service, index: number) => ({
          ...service,
          icon: service.icon || 'Code',
          color: colorOptions[index % colorOptions.length]
        }))

        setServices(mappedServices)
      } catch (error) {
        console.error("ServicesSection: Error loading services:", error instanceof Error ? error.message : String(error))
        toast({
          title: "Error loading services",
          description: error instanceof Error ? error.message : "An error occurred",
          variant: "destructive",
        })
        // Use fallback services if API fails
        setServices(fallbackServices)
      } finally {
        setLoading(false)
      }
    }

    loadServices()
  }, [toast])

  if (loading) {
    return (
      <section id="services" className="py-12 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900" />
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 px-4 py-2">
              Loading Services...
            </Badge>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="services" className="py-12 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <Badge variant="secondary" className="mb-4 px-4 py-2">
            Our Services
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
            What We Do Best
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            We offer comprehensive digital solutions to help your business thrive in the modern world
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon] || Code
            return (
              <motion.div
                key={service._id}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Card className="group h-full bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                  <CardHeader className="pb-4">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} p-4 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-slate-600 dark:text-slate-400 text-base">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {service.features.map((feature: string, featureIndex: number) => (
                        <div key={featureIndex} className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.color}`} />
                          <span className="text-sm text-slate-700 dark:text-slate-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}