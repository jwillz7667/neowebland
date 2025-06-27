import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Send, Mail, Phone, MapPin, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { useToast } from "@/hooks/useToast"
import { submitContactForm } from "@/api/contact"

interface ContactFormData {
  name: string
  email: string
  company: string
  message: string
}

const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    content: "info@webnaster.com",
    description: "Send us an email anytime"
  },
  {
    icon: Phone,
    title: "Call Us",
    content: "612-930-1390",
    description: "Mon-Fri from 8am to 6pm"
  },
  {
    icon: MapPin,
    title: "Visit Us",
    content: "18234 80th Pl N, Maple Grove, MN 55311",
    description: "Come say hello at our office"
  },
  {
    icon: Clock,
    title: "Working Hours",
    content: "Mon-Fri: 8am-6pm",
    description: "Weekend support available"
  }
]

export function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactFormData>()

  useEffect(() => {
    console.log("ContactSection mounted")
  }, [])

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    console.log("=== CONTACT FORM SUBMISSION START ===")
    console.log("Form data being submitted:", {
      name: data.name,
      email: data.email,
      company: data.company || 'Not provided',
      messageLength: data.message.length
    })
    console.log("Timestamp:", new Date().toISOString())

    try {
      console.log("Calling submitContactForm API...")
      const response = await submitContactForm(data)
      console.log("API Response received:", response)
      console.log("Contact ID from response:", response.contactId)
      
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      })
      console.log("Success toast displayed")
      reset()
      console.log("Form reset completed")
    } catch (error) {
      console.error("=== CONTACT FORM SUBMISSION ERROR ===")
      console.error("Error type:", error instanceof Error ? error.constructor.name : typeof error)
      console.error("Error message:", error instanceof Error ? error.message : String(error))
      console.error("Full error object:", error)
      console.error("Timestamp:", new Date().toISOString())
      
      toast({
        title: "Error sending message",
        description: "Please try again later or contact us directly.",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
      console.log("=== CONTACT FORM SUBMISSION END ===")
    }
  }

  return (
    <section id="contact" className="py-20 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <Badge variant="secondary" className="mb-4 px-4 py-2 bg-white/10 text-white border-white/20">
            Get In Touch
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            Let's Create Something
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Amazing Together
            </span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Ready to transform your digital presence? Let's discuss your project and bring your vision to life.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-white">
                  Send us a message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-white/90">
                        Name *
                      </Label>
                      <Input
                        id="name"
                        {...register("name", { required: "Name is required" })}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400"
                        placeholder="Your name"
                      />
                      {errors.name && (
                        <p className="text-red-400 text-sm">{errors.name.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white/90">
                        Email *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^\S+@\S+$/i,
                            message: "Invalid email address"
                          }
                        })}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400"
                        placeholder="your@email.com"
                      />
                      {errors.email && (
                        <p className="text-red-400 text-sm">{errors.email.message}</p>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company" className="text-white/90">
                      Company
                    </Label>
                    <Input
                      id="company"
                      {...register("company")}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400"
                      placeholder="Your company name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-white/90">
                      Message *
                    </Label>
                    <Textarea
                      id="message"
                      {...register("message", { required: "Message is required" })}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400 min-h-[120px]"
                      placeholder="Tell us about your project..."
                    />
                    {errors.message && (
                      <p className="text-red-400 text-sm">{errors.message.message}</p>
                    )}
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 text-lg font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Send className="w-5 h-5" />
                        Send Message
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              >
                <Card className="bg-white/10 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                        <info.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-1">
                          {info.title}
                        </h3>
                        <p className="text-white/90 font-medium mb-1">
                          {info.content}
                        </p>
                        <p className="text-white/60 text-sm">
                          {info.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}