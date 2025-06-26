import { useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { MapPin, Clock, Users, Briefcase, Heart, Zap, Award, ArrowRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SEO } from "@/components/SEO"
import { useNavigate } from "react-router-dom"

const benefits = [
  {
    icon: Heart,
    title: "Health & Wellness",
    description: "Comprehensive health insurance, dental, vision, and mental health support programs.",
    color: "from-red-500 to-pink-500"
  },
  {
    icon: Clock,
    title: "Work-Life Balance",
    description: "Flexible hours, remote work options, and unlimited PTO to maintain your well-being.",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Zap,
    title: "Growth & Learning",
    description: "Professional development budget, conference attendance, and continuous learning opportunities.",
    color: "from-yellow-500 to-orange-500"
  },
  {
    icon: Users,
    title: "Amazing Team",
    description: "Work with passionate, talented individuals in a collaborative and supportive environment.",
    color: "from-green-500 to-teal-500"
  },
  {
    icon: Award,
    title: "Recognition",
    description: "Performance bonuses, peer recognition programs, and opportunities for advancement.",
    color: "from-purple-500 to-indigo-500"
  },
  {
    icon: Briefcase,
    title: "Modern Workspace",
    description: "State-of-the-art equipment, ergonomic workstations, and a beautiful office environment.",
    color: "from-indigo-500 to-purple-500"
  }
]

const openPositions = [
  {
    title: "Senior Full Stack Developer",
    department: "Engineering",
    location: "Minneapolis, MN / Remote",
    type: "Full-time",
    experience: "5+ years",
    description: "Lead development of complex web applications using React, Node.js, and modern technologies.",
    requirements: [
      "5+ years of full-stack development experience",
      "Expert knowledge of React, TypeScript, and Node.js",
      "Experience with cloud platforms (AWS, Azure, or GCP)",
      "Strong understanding of database design and optimization",
      "Leadership and mentoring experience"
    ]
  },
  {
    title: "UI/UX Designer",
    department: "Design",
    location: "Minneapolis, MN / Hybrid",
    type: "Full-time",
    experience: "3+ years",
    description: "Create beautiful, user-centered designs that solve complex problems and delight users.",
    requirements: [
      "3+ years of UI/UX design experience",
      "Proficiency in Figma, Adobe Creative Suite",
      "Strong portfolio demonstrating design thinking",
      "Experience with user research and testing",
      "Understanding of web development constraints"
    ]
  },
  {
    title: "Digital Marketing Specialist",
    department: "Marketing",
    location: "Minneapolis, MN / Remote",
    type: "Full-time",
    experience: "2+ years",
    description: "Drive growth through strategic digital marketing campaigns and SEO optimization.",
    requirements: [
      "2+ years of digital marketing experience",
      "Google Ads and Analytics certification",
      "SEO and content marketing expertise",
      "Social media management experience",
      "Data analysis and reporting skills"
    ]
  },
  {
    title: "Project Manager",
    department: "Operations",
    location: "Minneapolis, MN / Hybrid",
    type: "Full-time",
    experience: "4+ years",
    description: "Lead client projects from conception to delivery, ensuring quality and timeline adherence.",
    requirements: [
      "4+ years of project management experience",
      "PMP or Agile certification preferred",
      "Experience managing web development projects",
      "Excellent communication and leadership skills",
      "Client relationship management experience"
    ]
  }
]

const companyPerks = [
  "Competitive salary and equity packages",
  "Comprehensive health, dental, and vision insurance",
  "401(k) with company matching",
  "Flexible PTO and sabbatical options",
  "Professional development budget ($2,000/year)",
  "Latest MacBook Pro and equipment",
  "Catered lunches and premium coffee",
  "Team building events and company retreats",
  "Gym membership reimbursement",
  "Commuter benefits and parking"
]

export function Careers() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "hiringOrganization": {
      "@type": "Organization",
      "name": "WebNaster.com",
      "sameAs": "https://webnaster.com"
    },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "18234 80th Pl N",
        "addressLocality": "Maple Grove",
        "addressRegion": "MN",
        "postalCode": "55311",
        "addressCountry": "US"
      }
    },
    "employmentType": "FULL_TIME",
    "industry": "Web Design and Development"
  }

  return (
    <>
      <SEO
        title="Careers - Join Our Award-Winning Team"
        description="Join WebNaster.com's talented team of designers and developers. Explore exciting career opportunities in web development, UI/UX design, and digital marketing in Minneapolis."
        keywords="careers WebNaster, web developer jobs Minneapolis, UI UX designer jobs, digital marketing careers, remote work opportunities"
        canonicalUrl="/careers"
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
                Join Our Team
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                Build Your Career
                <br />
                <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 bg-clip-text text-transparent">
                  With Purpose
                </span>
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-400 max-w-4xl mx-auto">
                Join a team of passionate creators, innovators, and problem-solvers who are shaping the future
                of digital experiences. Grow your skills, make an impact, and love what you do.
              </p>
            </motion.div>

            {/* Culture Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20"
            >
              <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">Our Culture</h2>
                  <div className="space-y-4 text-slate-600 dark:text-slate-400">
                    <p>
                      At WebNaster.com, we believe that great work comes from great people who feel valued,
                      challenged, and inspired. Our culture is built on collaboration, creativity, and continuous learning.
                    </p>
                    <p>
                      We foster an environment where everyone's voice is heard, ideas are celebrated, and
                      innovation thrives. Whether you're a seasoned professional or just starting your career,
                      you'll find opportunities to grow and make a meaningful impact.
                    </p>
                    <p>
                      Work-life balance isn't just a buzzword here – it's a core value that shapes how we
                      operate and support our team members in achieving their personal and professional goals.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-600 via-blue-600 to-teal-600 text-white border-0 shadow-lg">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold mb-6">Why Choose WebNaster?</h2>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                      <p>Work on cutting-edge projects for diverse, exciting clients</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                      <p>Collaborate with award-winning designers and developers</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                      <p>Flexible work arrangements and unlimited growth potential</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                      <p>Competitive compensation and comprehensive benefits</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 px-6 bg-white/50 dark:bg-slate-800/50">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
                Benefits & Perks
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                We invest in our people because they're our greatest asset
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
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

            {/* Additional Perks */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white text-center">
                    Additional Perks
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {companyPerks.map((perk, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex-shrink-0"></div>
                        <span className="text-slate-600 dark:text-slate-400">{perk}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Open Positions */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
                Open Positions
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Find your next opportunity and join our growing team
              </p>
            </motion.div>

            <div className="space-y-6">
              {openPositions.map((position, index) => (
                <motion.div
                  key={position.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 1.6 + index * 0.1 }}
                >
                  <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-8">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                        <div>
                          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                            {position.title}
                          </h3>
                          <div className="flex flex-wrap gap-3">
                            <Badge variant="secondary">{position.department}</Badge>
                            <Badge variant="outline" className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {position.location}
                            </Badge>
                            <Badge variant="outline">{position.type}</Badge>
                            <Badge variant="outline">{position.experience}</Badge>
                          </div>
                        </div>
                        <Button
                          onClick={() => navigate('/contact')}
                          className="mt-4 lg:mt-0 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                        >
                          Apply Now
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>

                      <p className="text-slate-600 dark:text-slate-400 mb-6">
                        {position.description}
                      </p>

                      <div>
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-3">
                          Requirements:
                        </h4>
                        <ul className="space-y-2">
                          {position.requirements.map((req, reqIndex) => (
                            <li key={reqIndex} className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-slate-600 dark:text-slate-400">{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-6 bg-white/50 dark:bg-slate-800/50">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 2 }}
            >
              <Card className="bg-gradient-to-br from-purple-600 via-blue-600 to-teal-600 text-white border-0 shadow-2xl">
                <CardContent className="p-10">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Don't See Your Perfect Role?
                  </h2>
                  <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
                    We're always looking for talented individuals to join our team. Send us your resume
                    and let us know how you'd like to contribute to our mission.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      size="lg"
                      onClick={() => navigate('/contact')}
                      className="bg-white text-purple-600 hover:bg-slate-100 font-semibold"
                    >
                      Send Your Resume
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      onClick={() => navigate('/about')}
                      className="border-white text-white hover:bg-white/10"
                    >
                      Learn More About Us
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