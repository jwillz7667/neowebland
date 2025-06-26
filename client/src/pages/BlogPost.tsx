import { useParams, Link, Navigate } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { ArrowLeft, Calendar, Clock, User, Tag } from "lucide-react"
import { blogPosts } from "../data/blogPosts"

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  
  if (!slug) {
    console.error("No slug provided in URL parameters")
    return <Navigate to="/blog" replace />
  }

  const post = blogPosts.find(p => p.slug === slug)
  
  if (!post) {
    console.error(`Blog post not found for slug: ${slug}`)
    return <Navigate to="/blog" replace />
  }

  console.log(`Rendering blog post: ${post.title}`)

  return (
    <>
      <Helmet>
        <title>{post.title} | WebNaster.com Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta name="keywords" content={post.tags.join(", ")} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={post.image} />
        <meta property="article:author" content={post.author} />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:section" content={post.category} />
        {post.tags.map(tag => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}
        <link rel="canonical" href={`https://webnaster.com/blog/${post.slug}`} />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-6 py-12">
          {/* Back to Blog Link */}
          <Link 
            to="/blog" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Blog
          </Link>

          {/* Article Header */}
          <article className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Hero Image */}
            <div className="aspect-video bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center">
              <div className="text-white text-center p-8">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                  {post.title}
                </h1>
                <p className="text-xl opacity-90 max-w-3xl">
                  {post.excerpt}
                </p>
              </div>
            </div>

            {/* Article Meta */}
            <div className="p-8 border-b border-slate-200">
              <div className="flex flex-wrap items-center gap-6 text-slate-600">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(post.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{post.readTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                    {post.category}
                  </span>
                </div>
              </div>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-4">
                {post.tags.map(tag => (
                  <span 
                    key={tag}
                    className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm hover:bg-slate-200 transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Article Content */}
            <div className="p-8">
              <div 
                className="prose prose-lg max-w-none prose-headings:text-slate-900 prose-p:text-slate-700 prose-a:text-blue-600 prose-strong:text-slate-900 prose-ul:text-slate-700 prose-ol:text-slate-700"
                dangerouslySetInnerHTML={{ 
                  __html: post.content
                    .split('\n')
                    .map(line => {
                      // Handle headers
                      if (line.startsWith('# ')) {
                        return `<h1 class="text-3xl font-bold mt-8 mb-4 text-slate-900">${line.substring(2)}</h1>`
                      }
                      if (line.startsWith('## ')) {
                        return `<h2 class="text-2xl font-bold mt-6 mb-3 text-slate-900">${line.substring(3)}</h2>`
                      }
                      if (line.startsWith('### ')) {
                        return `<h3 class="text-xl font-semibold mt-5 mb-2 text-slate-900">${line.substring(4)}</h3>`
                      }
                      
                      // Handle bold text
                      line = line.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-slate-900">$1</strong>')
                      
                      // Handle italic text
                      line = line.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
                      
                      // Handle empty lines
                      if (line.trim() === '') {
                        return '<br>'
                      }
                      
                      // Handle regular paragraphs
                      return `<p class="mb-4 text-slate-700 leading-relaxed">${line}</p>`
                    })
                    .join('')
                }}
              />
            </div>

            {/* Article Footer */}
            <div className="p-8 bg-slate-50 border-t border-slate-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    {post.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{post.author}</p>
                    <p className="text-slate-600 text-sm">Content Writer at WebNaster.com</p>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Share Article
                  </button>
                </div>
              </div>
            </div>
          </article>

          {/* Related Articles */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Related Articles</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {blogPosts
                .filter(p => p.id !== post.id && (
                  p.category === post.category || 
                  p.tags.some(tag => post.tags.includes(tag))
                ))
                .slice(0, 2)
                .map(relatedPost => (
                  <Link
                    key={relatedPost.id}
                    to={`/blog/${relatedPost.slug}`}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group"
                  >
                    <div className="aspect-video bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center">
                      <div className="text-white text-center p-4">
                        <h3 className="font-bold text-lg group-hover:scale-105 transition-transform">
                          {relatedPost.title}
                        </h3>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-slate-600 mb-4">{relatedPost.excerpt}</p>
                      <div className="flex items-center justify-between text-sm text-slate-500">
                        <span>{relatedPost.author}</span>
                        <span>{relatedPost.readTime}</span>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}