import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, Users, Award, ArrowRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SEO } from "@/components/SEO"
import { useToast } from "@/hooks/useToast"
import { pagesSEO, businessSchema } from "@/data/seoData"

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    value: "+1 (612) 930-1390",
    description: "Mon-Fri 9AM-6PM CST",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Mail,
    title: "Email",
    value: "hello@webnaster.com",
    description: "We'll respond within 24 hours",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Minneapolis, MN",
    description: "Serving clients nationwide",
    color: "from-green-500 to-teal-500"
  },
  {
    icon: Clock,
    title: "Business Hours",
    value: "Mon-Fri 9AM-6PM",
    description: "CST (UTC-6)",
    color: "from-orange-500 to-red-500"
  }
]

const services = [
  "Web Development",
  "UI/UX Design",
  "Mobile App Development",
  "E-commerce Solutions",
  "SEO Services",
  "Digital Marketing",
  "Brand Identity",
  "Consulting",
  "Other"
]

const budgetRanges = [
  "Under $5,000",
  "$5,000 - $10,000",
  "$10,000 - $25,000",
  "$25,000 - $50,000",
  "$50,000+",
  "Not sure yet"
]

export function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    service: "",
    budget: "",
    timeline: "",
    message: ""
  })

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all required fields"
      })
      return
    }

    try {
      setIsSubmitting(true)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      console.log("Contact form submitted:", formData)
      
      toast({
        title: "Message Sent Successfully!",
        description: "Thank you for contacting us. We'll get back to you within 24 hours."
      })
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        company: "",
        phone: "",
        service: "",
        budget: "",
        timeline: "",
        message: ""
      })
      
    } catch (error) {
      console.error("Contact form error:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send message. Please try again or contact us directly."
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Contact", url: "/contact" }
  ]

  const contactSchema = [
    businessSchema,
    {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": pagesSEO.contact.title,
      "description": pagesSEO.contact.description,
      "url": "https://webnaster.com/contact",
      "mainEntity": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "email": "info@webnaster.com",
        "telephone": "+1-555-123-4567",
        "areaServed": "US",
        "availableLanguage": "English"
      }
    }
  ]

  return (
    <>
      <SEO
        title={pagesSEO.contact.title}
        description={pagesSEO.contact.description}
        keywords={pagesSEO.contact.keywords}
        canonicalUrl="/contact"
        ogType={pagesSEO.contact.ogType}
        structuredData={contactSchema}
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
                Let's Work Together
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                Ready to Transform
                <br />
                <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 bg-clip-text text-transparent">
                  Your Digital Presence?
                </span>
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-400 max-w-4xl mx-auto">
                Get in touch with our team of experts for a free consultation. We're here to help bring
                your vision to life with cutting-edge web solutions.
              </p>
            </motion.div>

            {/* Contact Info Cards */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
            >
              {contactInfo.map((info, index) => (
                <Card key={info.title} className="group bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${info.color} p-4 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <info.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                      {info.title}
                    </h3>
                    <p className="text-slate-900 dark:text-white font-semibold mb-1">
                      {info.value}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {info.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <MessageSquare className="w-6 h-6 text-purple-600" />
                      Send Us a Message
                    </CardTitle>
                    <p className="text-slate-600 dark:text-slate-400">
                      Fill out the form below and we'll get back to you within 24 hours.
                    </p>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                            placeholder="John Doe"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            placeholder="john@example.com"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="company">Company</Label>
                          <Input
                            id="company"
                            value={formData.company}
                            onChange={(e) => handleInputChange("company", e.target.value)}
                            placeholder="Your Company"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                            placeholder="+1 (555) 123-4567"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="service">Service Needed</Label>
                          <Select value={formData.service} onValueChange={(value) => handleInputChange("service", value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a service" />
                            </SelectTrigger>
                            <SelectContent>
                              {services.map((service) => (
                                <SelectItem key={service} value={service}>
                                  {service}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="budget">Project Budget</Label>
                          <Select value={formData.budget} onValueChange={(value) => handleInputChange("budget", value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select budget range" />
                            </SelectTrigger>
                            <SelectContent>
                              {budgetRanges.map((range) => (
                                <SelectItem key={range} value={range}>
                                  {range}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="timeline">Project Timeline</Label>
                        <Input
                          id="timeline"
                          value={formData.timeline}
                          onChange={(e) => handleInputChange("timeline", e.target.value)}
                          placeholder="e.g., ASAP, 2-3 months, flexible"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Project Details *</Label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) => handleInputChange("message", e.target.value)}
                          placeholder="Tell us about your project, goals, and any specific requirements..."
                          rows={5}
                          required
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Sending Message...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Why Choose Us */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="space-y-8"
              >
                <Card className="bg-gradient-to-br from-purple-600 via-blue-600 to-teal-600 text-white border-0 shadow-xl">
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                      <Award className="w-6 h-6" />
                      Why Choose WebNaster.com?
                    </h2>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-white/90">
                          <strong>Free Consultation:</strong> We start every project with a comprehensive consultation to understand your needs and goals.
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-white/90">
                          <strong>Award-Winning Team:</strong> Our designers and developers have won multiple industry awards for excellence.
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-white/90">
                          <strong>Fast Turnaround:</strong> We deliver high-quality results on time, every time.
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-white/90">
                          <strong>Ongoing Support:</strong> We provide continued support and maintenance after project completion.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardContent className="p-8">
                    <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white flex items-center gap-2">
                      <Users className="w-5 h-5 text-purple-600" />
                      What Happens Next?
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                          1
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900 dark:text-white">Initial Response</h4>
                          <p className="text-slate-600 dark:text-slate-400 text-sm">We'll respond to your inquiry within 24 hours</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                          2
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900 dark:text-white">Discovery Call</h4>
                          <p className="text-slate-600 dark:text-slate-400 text-sm">Schedule a free consultation to discuss your project</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                          3
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900 dark:text-white">Custom Proposal</h4>
                          <p className="text-slate-600 dark:text-slate-400 text-sm">Receive a detailed proposal tailored to your needs</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                          4
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900 dark:text-white">Project Kickoff</h4>
                          <p className="text-slate-600 dark:text-slate-400 text-sm">Begin bringing your vision to life</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardContent className="p-6 text-center">
                    <h3 className="text-lg font-bold mb-2 text-slate-900 dark:text-white">
                      Prefer to Call?
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-4">
                      Speak directly with our team
                    </p>
                    <a
                      href="tel:+16129301390"
                      className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-semibold"
                    >
                      <Phone className="w-4 h-4" />
                      +1 (612) 930-1390
                    </a>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}