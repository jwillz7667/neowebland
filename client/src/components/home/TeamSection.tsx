import { useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Github, Linkedin, Twitter, Award, Users, Coffee } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getTeamMembers } from "@/api/team"

const teamMembers = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Creative Director",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    bio: "10+ years of experience in digital design and brand strategy",
    skills: ["UI/UX Design", "Brand Strategy", "Creative Direction"],
    social: {
      linkedin: "#",
      twitter: "#",
      github: "#"
    }
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Lead Developer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    bio: "Full-stack developer passionate about creating scalable solutions",
    skills: ["React", "Node.js", "Cloud Architecture"],
    social: {
      linkedin: "#",
      twitter: "#",
      github: "#"
    }
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "UX Researcher",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    bio: "Data-driven designer focused on user-centered design principles",
    skills: ["User Research", "Prototyping", "Data Analysis"],
    social: {
      linkedin: "#",
      twitter: "#",
      github: "#"
    }
  },
  {
    id: 4,
    name: "David Kim",
    role: "Mobile Developer",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    bio: "Specialist in cross-platform mobile development and native apps",
    skills: ["React Native", "Flutter", "iOS/Android"],
    social: {
      linkedin: "#",
      twitter: "#",
      github: "#"
    }
  }
]

const stats = [
  { icon: Users, label: "Team Members", value: "25+" },
  { icon: Award, label: "Awards Won", value: "15+" },
  { icon: Coffee, label: "Cups of Coffee", value: "10k+" }
]

export function TeamSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  useEffect(() => {
    console.log("TeamSection mounted")
    // Load team data
    getTeamMembers().then((data) => {
      console.log("Team data loaded:", data)
    }).catch((error) => {
      console.error("Error loading team:", error)
    })
  }, [])

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement
    // Use a more reliable fallback image
    target.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop&crop=face"
  }

  return (
    <section id="team" className="py-16 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-blue-900/20 dark:to-slate-900" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <Badge variant="secondary" className="mb-4 px-4 py-2">
            Our Team
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
            Meet the Creators
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Our diverse team of designers, developers, and strategists work together to bring your vision to life
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
        >
          {stats.map((stat, index) => (
            <div key={stat.label} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 mb-4">
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                {stat.value}
              </div>
              <div className="text-slate-600 dark:text-slate-400">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Team Members */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <Card className="group overflow-hidden bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={handleImageError}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex justify-center gap-2">
                      <Button size="sm" variant="secondary" className="rounded-full p-2">
                        <Linkedin className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="secondary" className="rounded-full p-2">
                        <Twitter className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="secondary" className="rounded-full p-2">
                        <Github className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-1 text-slate-900 dark:text-white">
                    {member.name}
                  </h3>
                  <p className="text-purple-600 dark:text-purple-400 font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                    {member.bio}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {member.skills.map((skill, skillIndex) => (
                      <Badge key={skillIndex} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}