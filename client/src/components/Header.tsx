import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "./ui/button"
import { ThemeToggle } from "./ui/theme-toggle"
import { useNavigate, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"

const navigationItems = [
  { name: "Home", href: "/" },
  { name: "Services", href: "#services" },
  { name: "Local Business", href: "#local-business" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Team", href: "#team" },
  { name: "Contact", href: "#contact" },
]

export function Header() {
  const navigate = useNavigate()
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleNavClick = (href: string) => {
    if (href.startsWith("#")) {
      // Scroll to section
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    } else {
      // Navigate to route
      navigate(href)
    }
    setIsMobileMenuOpen(false)
  }

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/"
    return false
  }

  return (
    <>
      <header className="fixed top-0 z-50 w-full border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-slate-900/60">
        <div className="flex h-16 items-center justify-between px-6 max-w-7xl mx-auto">
          {/* Logo */}
          <div
            className="text-2xl font-bold cursor-pointer bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
            onClick={() => handleNavClick("/")}
          >
            webnaster.com
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className={`text-sm font-medium transition-colors duration-200 hover:text-purple-600 dark:hover:text-purple-400 ${
                  isActive(item.href)
                    ? "text-purple-600 dark:text-purple-400"
                    : "text-slate-700 dark:text-slate-300"
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            <Button
              onClick={() => handleNavClick("#contact")}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Mobile Menu */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 z-50 h-full w-80 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-l border-slate-200 dark:border-slate-700 shadow-2xl md:hidden"
            >
              <div className="flex flex-col h-full">
                {/* Mobile Menu Header */}
                <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
                  <div className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    webnaster.com
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                {/* Mobile Navigation */}
                <nav className="flex-1 px-6 py-8">
                  <div className="space-y-6">
                    {navigationItems.map((item, index) => (
                      <motion.button
                        key={item.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => handleNavClick(item.href)}
                        className={`block w-full text-left text-lg font-medium transition-all duration-200 hover:text-purple-600 dark:hover:text-purple-400 hover:translate-x-2 ${
                          isActive(item.href)
                            ? "text-purple-600 dark:text-purple-400"
                            : "text-slate-700 dark:text-slate-300"
                        }`}
                      >
                        {item.name}
                      </motion.button>
                    ))}
                  </div>
                </nav>

                {/* Mobile Menu Footer */}
                <div className="p-6 border-t border-slate-200 dark:border-slate-700">
                  <Button
                    onClick={() => handleNavClick("#contact")}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 rounded-full transition-all duration-300 transform hover:scale-105"
                  >
                    Get Started
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}