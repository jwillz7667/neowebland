import { useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Star, Award, Users, Clock, Shield, Zap, CheckCircle, Quote } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const benefits = [
  {
    icon: Award,
    title: "Award-Winning Design",
    description: "Recognized by industry leaders for exceptional design and innovation.",
    color: "from-yellow-500 to-orange-500"
  },
  {
    icon: Users,
    title: "500+ Happy Clients",
    description: "Trusted by businesses of all sizes to deliver outstanding results.",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Clock,
    title: "On-Time Delivery",
    description: "We respect your deadlines and deliver projects when promised.",
    color: "from-green-500 to-teal-500"
  },
  {
    icon: Shield,
    title: "100% Satisfaction Guarantee",
    description: "We're not happy until you're completely satisfied with the results.",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: Zap,
    title: "Lightning Fast Support",
    description: "Get help when you need it with our responsive support team.",
    color: "from-red-500 to-pink-500"
  },
  {
    icon: CheckCircle,
    title: "Proven Track Record",
    description: "98% client retention rate and countless success stories.",
    color: "from-indigo-500 to-purple-500"
  }
]

const testimonials = [
  {
    name: "Sarah Johnson",
    company: "TechStart Inc.",
    role: "CEO",
    content: "WebNaster.com transformed our outdated website into a modern masterpiece. Our online sales increased by 300% within the first month!",
    rating: 5,
    avatar: "SJ"
  },
  {
    name: "Michael Chen",
    company: "Local Restaurant Group",
    role: "Owner",
    content: "The team's attention to detail and understanding of our local market was incredible. We now rank #1 for all our target keywords.",
    rating: 5,
    avatar: "MC"
  },
  {
    name: "Emily Rodriguez",
    company: "Fashion Boutique",
    role: "Founder",
    content: "Professional, creative, and delivered exactly what we envisioned. Our customers love the new mobile experience!",
    rating: 5,
    avatar: "ER"
  }
]

export function WhyChooseUsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  useEffect(() => {
    console.log("WhyChooseUsSection mounted")
  }, [])

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact")
    contactSection?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section id="why-choose-us" className="py-12 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50 dark:from-slate-900 dark:via-purple-900/20 dark:to-slate-900" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <Badge variant="secondary" className="mb-4 px-4 py-2">
            Why Choose Us
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
            Why Businesses Choose
            <br />
            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 bg-clip-text text-transparent">
              WebNaster.com
            </span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            We don't just build websites - we create digital experiences that drive real business results
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <Card className="group h-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <CardHeader className="pb-4">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${benefit.color} p-4 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <benefit.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">
                    {benefit.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 dark:text-slate-400">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Testimonials Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-12"
        >
          <div className="text-center mb-10">
            <h3 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
              What Our Clients Say
            </h3>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Don't just take our word for it - hear from businesses we've helped succeed
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.8 + index * 0.1 }}
              >
                <Card className="h-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <Quote className="w-8 h-8 text-purple-400 mb-4" />
                    <p className="text-slate-700 dark:text-slate-300 mb-6 italic">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-white">
                          {testimonial.name}
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {testimonial.role}, {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mb-12"
        >
          <Card className="bg-gradient-to-br from-purple-600 via-blue-600 to-teal-600 text-white border-0 shadow-2xl">
            <CardContent className="p-10">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-4xl md:text-5xl font-bold mb-2">500+</div>
                  <div className="text-white/80">Projects Completed</div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-bold mb-2">98%</div>
                  <div className="text-white/80">Client Satisfaction</div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-bold mb-2">5+</div>
                  <div className="text-white/80">Years Experience</div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-bold mb-2">24/7</div>
                  <div className="text-white/80">Support Available</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="text-center"
        >
          <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="p-10">
              <h3 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
                Ready to Transform Your Business?
              </h3>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
                Join hundreds of successful businesses who chose WebNaster.com to modernize their digital presence
                and dominate their local market.
              </p>
              <Button
                size="lg"
                onClick={scrollToContact}
                className="group relative overflow-hidden bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Get Your Free Consultation
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}