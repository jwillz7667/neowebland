import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, X, Calendar, Users, Award } from "lucide-react"
import { motion } from "framer-motion"

interface Project {
  id: number
  title: string
  category: string
  image: string
  description: string
  technologies: string[]
  liveUrl: string
  githubUrl: string
  client?: {
    name: string
    role: string
    feedback: string
    avatar: string
  }
  features?: string[]
  duration?: string
  teamSize?: string
  rating?: string
}

interface ProjectModalProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  if (!project) return null

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement
    target.src = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop&crop=entropy"
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 border-0 shadow-2xl">
        <DialogHeader className="relative">
          <DialogTitle className="sr-only">{project.title}</DialogTitle>
          <DialogDescription className="sr-only">
            Detailed view of {project.title} project including overview, features, and technologies used.
          </DialogDescription>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute -top-2 -right-2 h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 shadow-lg border-2 border-white dark:border-slate-600 z-10"
          >
            <X className="h-5 w-5" />
          </Button>
        </DialogHeader>

        <div className="space-y-6">
          {/* Project Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="relative overflow-hidden rounded-2xl"
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-64 md:h-80 object-cover"
              onError={handleImageError}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <Badge variant="secondary" className="mb-2 bg-white/90 text-slate-900">
                {project.category}
              </Badge>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                {project.title}
              </h2>
            </div>
          </motion.div>

          {/* Project Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-white">
                  Project Overview
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {project.description}. This project showcases our expertise in modern web development
                  and design principles. We focused on creating a user-centric experience that balances
                  functionality with aesthetic appeal, ensuring optimal performance across all devices.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-white">
                  Key Features
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {(project.features || [
                    "Responsive Design",
                    "Performance Optimized",
                    "SEO Friendly",
                    "Cross-browser Compatible",
                    "Accessibility Compliant",
                    "Modern UI/UX"
                  ]).map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500" />
                      <span className="text-slate-700 dark:text-slate-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-white">
                  Technologies Used
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="px-3 py-1 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-purple-200 dark:border-purple-700"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Project Stats */}
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">
                  Project Stats
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Duration</p>
                      <p className="font-semibold text-slate-900 dark:text-white">{project.duration || "3 months"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Team Size</p>
                      <p className="font-semibold text-slate-900 dark:text-white">{project.teamSize || "4 members"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center">
                      <Award className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Client Rating</p>
                      <p className="font-semibold text-slate-900 dark:text-white">{project.rating || "5.0/5.0"}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
                  onClick={() => window.open(project.liveUrl, '_blank')}
                >
                  <ExternalLink className="w-5 h-5 mr-2" />
                  View Live Project
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-2 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 py-3 rounded-xl transition-all duration-300"
                  onClick={() => window.open(project.githubUrl, '_blank')}
                >
                  <Github className="w-5 h-5 mr-2" />
                  View Source Code
                </Button>
              </div>

              {/* Client Testimonial */}
              {project.client && (
                <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-2xl p-6 border border-purple-100 dark:border-purple-800">
                  <h3 className="text-lg font-semibold mb-3 text-slate-900 dark:text-white">
                    Client Feedback
                  </h3>
                  <blockquote className="text-slate-600 dark:text-slate-400 italic mb-4">
                    "{project.client.feedback}"
                  </blockquote>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                      <span className="text-white text-sm font-semibold">{project.client.avatar}</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">{project.client.name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{project.client.role}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  )
}