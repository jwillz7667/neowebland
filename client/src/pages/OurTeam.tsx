import { useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Github, Linkedin, Twitter, Mail, Award, Coffee, Code, Palette } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SEO } from "@/components/SEO"
import { useNavigate } from "react-router-dom"

const teamMembers = [
  {
    name: "Sarah Johnson",
    role: "Creative Director & Co-Founder",
    image: "/team/sarah.jpg",
    bio: "With over 10 years of experience in digital design, Sarah leads our creative vision and ensures every project exceeds client expectations.",
    skills: ["UI/UX Design", "Brand Strategy", "Creative Direction", "Team Leadership"],
    social: {
      linkedin: "https://linkedin.com/in/sarahjohnson",
      twitter: "https://twitter.com/sarahdesigns",
      email: "sarah@webnaster.com"
    },
    achievements: ["Adobe Certified Expert", "Webby Award Winner", "Design Leadership Certificate"]
  },
  {
    name: "Michael Chen",
    role: "Lead Developer & Co-Founder",
    image: "/team/michael.jpg",
    bio: "Full-stack developer passionate about creating scalable, performant web applications using cutting-edge technologies.",
    skills: ["React", "Node.js", "TypeScript", "Cloud Architecture"],
    social: {
      github: "https://github.com/michaelchen",
      linkedin: "https://linkedin.com/in/michaelchen",
      email: "michael@webnaster.com"
    },
    achievements: ["AWS Solutions Architect", "Google Cloud Professional", "Open Source Contributor"]
  },
  {
    name: "Emily Rodriguez",
    role: "Senior UX Designer",
    image: "/team/emily.jpg",
    bio: "User experience specialist who transforms complex problems into intuitive, delightful digital experiences.",
    skills: ["User Research", "Prototyping", "Interaction Design", "Usability Testing"],
    social: {
      linkedin: "https://linkedin.com/in/emilyrodriguez",
      twitter: "https://twitter.com/emilyux",
      email: "emily@webnaster.com"
    },
    achievements: ["UX Certification from Google", "Design Thinking Workshop Leader", "Accessibility Advocate"]
  },
  {
    name: "David Kim",
    role: "Senior Frontend Developer",
    image: "/team/david.jpg",
    bio: "Frontend specialist who brings designs to life with pixel-perfect precision and smooth animations.",
    skills: ["React", "Vue.js", "CSS/SASS", "Animation Libraries"],
    social: {
      github: "https://github.com/davidkim",
      linkedin: "https://linkedin.com/in/davidkim",
      email: "david@webnaster.com"
    },
    achievements: ["Frontend Masters Instructor", "CSS Grid Expert", "Performance Optimization Specialist"]
  },
  {
    name: "Jessica Thompson",
    role: "Project Manager",
    image: "/team/jessica.jpg",
    bio: "Experienced project manager who ensures smooth delivery and exceptional client communication throughout every project.",
    skills: ["Agile Methodology", "Client Relations", "Team Coordination", "Quality Assurance"],
    social: {
      linkedin: "https://linkedin.com/in/jessicathompson",
      email: "jessica@webnaster.com"
    },
    achievements: ["PMP Certified", "Scrum Master", "Client Success Champion"]
  },
  {
    name: "Alex Martinez",
    role: "Backend Developer",
    image: "/team/alex.jpg",
    bio: "Backend engineer focused on building robust, scalable server architectures and API integrations.",
    skills: ["Python", "Django", "PostgreSQL", "API Development"],
    social: {
      github: "https://github.com/alexmartinez",
      linkedin: "https://linkedin.com/in/alexmartinez",
      email: "alex@webnaster.com"
    },
    achievements: ["Database Optimization Expert", "Security Best Practices", "Microservices Architecture"]
  }
]

const stats = [
  { icon: Code, label: "Lines of Code", value: "2M+", color: "from-blue-500 to-cyan-500" },
  { icon: Coffee, label: "Cups of Coffee", value: "10K+", color: "from-amber-500 to-orange-500" },
  { icon: Award, label: "Awards Won", value: "25+", color: "from-purple-500 to-pink-500" },
  { icon: Palette, label: "Designs Created", value: "500+", color: "from-green-500 to-teal-500" }
]

export function OurTeam() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "WebNaster.com",
    "url": "https://webnaster.com",
    "employee": teamMembers.map(member => ({
      "@type": "Person",
      "name": member.name,
      "jobTitle": member.role,
      "description": member.bio,
      "worksFor": {
        "@type": "Organization",
        "name": "WebNaster.com"
      }
    }))
  }

  return (
    <>
      <SEO
        title="Our Team - Meet the Creative Minds Behind WebNaster"
        description="Meet the talented team of designers, developers, and digital strategists at WebNaster.com. Learn about our expertise and passion for creating exceptional web experiences."
        keywords="WebNaster team, web design team Minneapolis, creative directors, developers, UX designers, project managers"
        canonicalUrl="/team"
        structuredData={structuredData}
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
                Our Amazing Team
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                The Creative Minds
                <br />
                <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 bg-clip-text text-transparent">
                  Behind Your Success
                </span>
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-400 max-w-4xl mx-auto">
                Meet the passionate professionals who bring your digital visions to life. Our diverse team combines
                creativity, technical expertise, and strategic thinking to deliver exceptional results.
              </p>
            </motion.div>

            {/* Team Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
            >
              {stats.map((stat, index) => (
                <Card key={stat.label} className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg text-center">
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} p-3 mx-auto mb-4`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Team Members */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
                Meet Our Team
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                Each team member brings unique skills and perspectives to create the perfect blend of creativity and technical excellence
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
                >
                  <Card className="group h-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                    <CardHeader className="text-center pb-4">
                      <div className="relative w-32 h-32 mx-auto mb-4">
                        <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-500 via-blue-500 to-teal-500 p-1">
                          <div className="w-full h-full rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                            <div className="text-4xl font-bold text-slate-600 dark:text-slate-400">
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </div>
                          </div>
                        </div>
                      </div>
                      <CardTitle className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                        {member.name}
                      </CardTitle>
                      <Badge variant="secondary" className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                        {member.role}
                      </Badge>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                        {member.bio}
                      </p>

                      {/* Skills */}
                      <div>
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-2 text-sm">Expertise</h4>
                        <div className="flex flex-wrap gap-1">
                          {member.skills.map((skill) => (
                            <Badge key={skill} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Achievements */}
                      <div>
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-2 text-sm">Achievements</h4>
                        <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                          {member.achievements.map((achievement) => (
                            <li key={achievement} className="flex items-center gap-2">
                              <Award className="w-3 h-3 text-yellow-500" />
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Social Links */}
                      <div className="flex justify-center gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
                        {member.social.github && (
                          <a
                            href={member.social.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-full bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                          >
                            <Github className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                          </a>
                        )}
                        {member.social.linkedin && (
                          <a
                            href={member.social.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-full bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                          >
                            <Linkedin className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                          </a>
                        )}
                        {member.social.twitter && (
                          <a
                            href={member.social.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-full bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                          >
                            <Twitter className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                          </a>
                        )}
                        <a
                          href={`mailto:${member.social.email}`}
                          className="p-2 rounded-full bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                        >
                          <Mail className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Culture Section */}
        <section className="py-16 px-6 bg-white/50 dark:bg-slate-800/50">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
                Our Culture & Values
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                We believe in fostering a collaborative, innovative environment where creativity thrives
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 p-4 mx-auto mb-6">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">Excellence</h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    We strive for excellence in every project, pushing boundaries and setting new standards in digital design and development.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 p-4 mx-auto mb-6">
                    <Coffee className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">Collaboration</h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Great ideas come from great teamwork. We foster an environment where everyone's voice is heard and valued.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-teal-500 p-4 mx-auto mb-6">
                    <Code className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">Innovation</h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    We embrace new technologies and methodologies, constantly learning and evolving to stay ahead of the curve.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.4 }}
            >
              <Card className="bg-gradient-to-br from-purple-600 via-blue-600 to-teal-600 text-white border-0 shadow-2xl">
                <CardContent className="p-10">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Want to Join Our Team?
                  </h2>
                  <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
                    We're always looking for talented individuals who share our passion for creating
                    exceptional digital experiences. Check out our open positions!
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      size="lg"
                      onClick={() => navigate('/careers')}
                      className="bg-white text-purple-600 hover:bg-slate-100 font-semibold"
                    >
                      View Open Positions
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      onClick={() => navigate('/contact')}
                      className="border-white text-white hover:bg-white/10"
                    >
                      Get In Touch
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  )
}