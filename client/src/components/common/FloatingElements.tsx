import { motion } from "framer-motion"
import { Code, Palette, Smartphone, Globe } from "lucide-react"

const floatingElements = [
  { icon: Code, x: "10%", y: "20%", delay: 0 },
  { icon: Palette, x: "85%", y: "15%", delay: 0.5 },
  { icon: Smartphone, x: "15%", y: "70%", delay: 1 },
  { icon: Globe, x: "80%", y: "75%", delay: 1.5 }
]

export function FloatingElements() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {floatingElements.map((element, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{ left: element.x, top: element.y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ delay: element.delay, duration: 1 }}
        >
          <motion.div
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center"
          >
            <element.icon className="w-8 h-8 text-white/30" />
          </motion.div>
        </motion.div>
      ))}
    </div>
  )
}