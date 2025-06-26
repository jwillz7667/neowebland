import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Calendar, Clock, User, ArrowRight, Search, Tag } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SEO } from "@/components/SEO"
import { useNavigate } from "react-router-dom"

const blogPosts = [
  {
    id: 1,
    title: "The Future of Web Design: AI-Powered Design Tools",
    excerpt: "Discover how artificial intelligence is revolutionizing the web design industry and what it means for designers and businesses.",
    content: "Artificial intelligence is transforming every industry, and web design is no exception. From automated layout generation to intelligent color palette suggestions, AI tools are becoming indispensable for modern designers...",
    author: "Sarah Johnson",
    date: "2024-01-15",
    readTime: "8 min read",
    category: "Design Trends",
    tags: ["AI", "Web Design", "Technology", "Future"],
    image: "/blog/ai-web-design.jpg",
    featured: true
  },
  {
    id: 2,
    title: "Mobile-First Design: Why It's More Important Than Ever",
    excerpt: "Learn why mobile-first design approach is crucial for modern websites and how to implement it effectively.",
    content: "With mobile traffic accounting for over 60% of web traffic globally, designing for mobile devices first has become a necessity rather than an option...",
    author: "Mike Chen",
    date: "2024-01-10",
    readTime: "6 min read",
    category: "Mobile Design",
    tags: ["Mobile", "Responsive Design", "UX"],
    image: "/blog/mobile-first.jpg",
    featured: false
  },
  {
    id: 3,
    title: "SEO Best Practices for Modern Websites in 2024",
    excerpt: "Stay ahead of the competition with the latest SEO strategies and techniques that actually work.",
    content: "Search engine optimization continues to evolve, with new algorithms and ranking factors being introduced regularly. Here's what you need to know...",
    author: "Emily Rodriguez",
    date: "2024-01-05",
    readTime: "10 min read",
    category: "SEO",
    tags: ["SEO", "Digital Marketing", "Google"],
    image: "/blog/seo-2024.jpg",
    featured: true
  },
  {
    id: 4,
    title: "The Psychology of Color in Web Design",
    excerpt: "Understanding how colors affect user behavior and conversion rates on your website.",
    content: "Color psychology plays a crucial role in web design, influencing user emotions, behaviors, and decision-making processes...",
    author: "David Kim",
    date: "2023-12-28",
    readTime: "7 min read",
    category: "Design Psychology",
    tags: ["Color Theory", "Psychology", "Conversion"],
    image: "/blog/color-psychology.jpg",
    featured: false
  },
  {
    id: 5,
    title: "Building High-Performance React Applications",
    excerpt: "Tips and techniques for optimizing React applications for better performance and user experience.",
    content: "React applications can become slow and unresponsive if not optimized properly. Here are proven strategies to boost performance...",
    author: "Alex Thompson",
    date: "2023-12-20",
    readTime: "12 min read",
    category: "Development",
    tags: ["React", "Performance", "JavaScript"],
    image: "/blog/react-performance.jpg",
    featured: false
  },
  {
    id: 6,
    title: "E-commerce UX Design: Converting Visitors to Customers",
    excerpt: "Essential UX principles for e-commerce websites that drive sales and improve customer satisfaction.",
    content: "E-commerce success depends heavily on user experience. A well-designed online store can significantly increase conversion rates...",
    author: "Lisa Wang",
    date: "2023-12-15",
    readTime: "9 min read",
    category: "E-commerce",
    tags: ["E-commerce", "UX Design", "Conversion"],
    image: "/blog/ecommerce-ux.jpg",
    featured: false
  }
]

const categories = ["All", "Design Trends", "Mobile Design", "SEO", "Design Psychology", "Development", "E-commerce"]

export function Blog() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [filteredPosts, setFilteredPosts] = useState(blogPosts)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    let filtered = blogPosts

    if (selectedCategory !== "All") {
      filtered = filtered.filter(post => post.category === selectedCategory)
    }

    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    setFilteredPosts(filtered)
  }, [searchTerm, selectedCategory])

  const featuredPosts = blogPosts.filter(post => post.featured)
  const regularPosts = filteredPosts.filter(post => !post.featured)

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "WebNaster.com Blog",
    "description": "Latest insights on web design, development, SEO, and digital marketing trends",
    "url": "https://webnaster.com/blog",
    "publisher": {
      "@type": "Organization",
      "name": "WebNaster.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://webnaster.com/logo.png"
      }
    },
    "blogPost": blogPosts.map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "author": {
        "@type": "Person",
        "name": post.author
      },
      "datePublished": post.date,
      "url": `https://webnaster.com/blog/${post.id}`
    }))
  }

  return (
    <>
      <SEO
        title="Blog - Web Design & Development Insights"
        description="Stay updated with the latest trends in web design, development, SEO, and digital marketing. Expert insights and tips from WebNaster.com's team of professionals."
        keywords="web design blog, development tutorials, SEO tips, digital marketing insights, design trends, UX best practices"
        canonicalUrl="/blog"
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
                WebNaster Blog
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                Insights & Inspiration
                <br />
                <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 bg-clip-text text-transparent">
                  for Digital Success
                </span>
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-400 max-w-4xl mx-auto">
                Stay ahead of the curve with expert insights on web design, development, SEO, and digital marketing trends
                from our team of industry professionals.
              </p>
            </motion.div>

            {/* Search and Filter */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-4xl mx-auto mb-12"
            >
              <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <Input
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-2 justify-center">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={selectedCategory === category 
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700" 
                      : "bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-sm"
                    }
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Featured Posts */}
        {selectedCategory === "All" && (
          <section className="py-16 px-6">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white text-center">
                  Featured Articles
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-400 text-center max-w-3xl mx-auto">
                  Our most popular and impactful articles, handpicked for you
                </p>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                {featuredPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
                  >
                    <Card className="group h-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer">
                      <div className="aspect-video bg-gradient-to-br from-purple-500 to-blue-500 rounded-t-lg relative overflow-hidden">
                        <div className="absolute inset-0 bg-black/20" />
                        <Badge className="absolute top-4 left-4 bg-white/90 text-slate-900 hover:bg-white">
                          Featured
                        </Badge>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-white text-center p-6">
                            <h3 className="text-2xl font-bold mb-2">{post.title}</h3>
                            <p className="text-white/90">{post.category}</p>
                          </div>
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4 mb-4 text-sm text-slate-500 dark:text-slate-400">
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {post.author}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(post.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {post.readTime}
                          </div>
                        </div>
                        <p className="text-slate-600 dark:text-slate-400 mb-4">
                          {post.excerpt}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              <Tag className="w-3 h-3 mr-1" />
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <Button variant="ghost" className="group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-blue-600 group-hover:text-white transition-all duration-300">
                          Read More
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* All Posts */}
        <section className="py-16 px-6 bg-white/50 dark:bg-slate-800/50">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white text-center">
                {selectedCategory === "All" ? "Latest Articles" : `${selectedCategory} Articles`}
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 text-center">
                {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} found
              </p>
            </motion.div>

            {filteredPosts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-slate-600 dark:text-slate-400 mb-4">
                  No articles found matching your criteria.
                </p>
                <Button
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedCategory("All")
                  }}
                  variant="outline"
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {(selectedCategory === "All" ? regularPosts : filteredPosts).map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 1 + index * 0.1 }}
                  >
                    <Card className="group h-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer">
                      <div className="aspect-video bg-gradient-to-br from-slate-400 to-slate-600 rounded-t-lg relative overflow-hidden">
                        <div className="absolute inset-0 bg-black/20" />
                        <Badge className="absolute top-4 left-4 bg-white/90 text-slate-900 hover:bg-white">
                          {post.category}
                        </Badge>
                      </div>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                          {post.title}
                        </h3>
                        <div className="flex items-center gap-4 mb-4 text-sm text-slate-500 dark:text-slate-400">
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {post.author}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(post.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {post.readTime}
                          </div>
                        </div>
                        <p className="text-slate-600 dark:text-slate-400 mb-4">
                          {post.excerpt}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              <Tag className="w-3 h-3 mr-1" />
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <Button variant="ghost" className="group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-blue-600 group-hover:text-white transition-all duration-300">
                          Read More
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Newsletter Section */}
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
                    Stay Updated with Our Newsletter
                  </h2>
                  <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
                    Get the latest insights, tips, and trends delivered straight to your inbox.
                    Join thousands of professionals who trust our content.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                    <Input
                      placeholder="Enter your email"
                      className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                    />
                    <Button
                      size="lg"
                      className="bg-white text-purple-600 hover:bg-white/90 font-semibold"
                    >
                      Subscribe
                    </Button>
                  </div>
                  <p className="text-sm text-white/70 mt-4">
                    No spam, unsubscribe at any time.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-6 bg-white/50 dark:bg-slate-800/50">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
                Ready to Transform Your Digital Presence?
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
                Let's apply these insights to your project. Get in touch with our team of experts
                and start building something amazing today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  onClick={() => navigate('/contact')}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  Start Your Project
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate('/about')}
                  className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-sm"
                >
                  Learn More About Us
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  )
}