import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { ArrowDown, Sparkles, Zap, Palette } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TypedText } from "@/components/common/TypedText"
import { FloatingElements } from "@/components/common/FloatingElements"

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    console.log("HeroSection mounted")
  }, [])

  const scrollToNext = () => {
    const nextSection = document.getElementById("services")
    nextSection?.scrollIntoView({ behavior: "smooth" })
  }

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact")
    contactSection?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pb-4">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-teal-900/20 z-10" />
        <div className="w-full h-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 opacity-90" />
      </div>

      <FloatingElements />

      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
            >
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-white/90">Award-Winning Design Agency</span>
            </motion.div>

            <h1 className="text-6xl md:text-8xl font-bold text-white leading-tight">
              We Create
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Digital Magic
              </span>
            </h1>

            <div className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto">
              <TypedText
                strings={[
                  "Transforming ideas into stunning digital experiences",
                  "Building the future of web design",
                  "Creating brands that inspire and engage"
                ]}
              />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              size="lg"
              onClick={scrollToContact}
              className="group relative overflow-hidden bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Start Your Project
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="group bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300"
            >
              <Palette className="w-5 h-5 mr-2" />
              View Our Work
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="flex justify-center items-center gap-8 text-white/60 text-sm"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span>500+ Projects Delivered</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              <span>98% Client Satisfaction</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
              <span>Award-Winning Team</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <button
          onClick={scrollToNext}
          className="group flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors duration-300"
        >
          <span className="text-sm">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-white/60 rounded-full mt-2"
            />
          </div>
          <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform duration-300" />
        </button>
      </motion.div>
    </section>
  )
}