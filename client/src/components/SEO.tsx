import { Helmet } from "react-helmet-async"
import { useEffect } from "react"

interface SEOProps {
  title: string
  description: string
  keywords?: string
  canonicalUrl?: string
  ogImage?: string
  ogType?: string
  structuredData?: object
}

export function SEO({
  title,
  description,
  keywords = "web design, web development, UI/UX design, mobile apps, e-commerce, SEO services, digital marketing, Minneapolis, Minnesota",
  canonicalUrl,
  ogImage = "/og-image.jpg",
  ogType = "website",
  structuredData
}: SEOProps) {
  const fullTitle = `${title} | WebNaster.com - Premium Web Design & Development`
  const baseUrl = "https://webnaster.com"
  const fullCanonicalUrl = canonicalUrl ? `${baseUrl}${canonicalUrl}` : baseUrl

  // Fallback for when Helmet fails
  useEffect(() => {
    document.title = fullTitle
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]')
    if (!metaDescription) {
      metaDescription = document.createElement('meta')
      metaDescription.setAttribute('name', 'description')
      document.head.appendChild(metaDescription)
    }
    metaDescription.setAttribute('content', description)

    // Update meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]')
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta')
      metaKeywords.setAttribute('name', 'keywords')
      document.head.appendChild(metaKeywords)
    }
    metaKeywords.setAttribute('content', keywords)
  }, [fullTitle, description, keywords])

  try {
    return (
      <Helmet>
        {/* Basic Meta Tags */}
        <title>{fullTitle}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content="WebNaster.com" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Canonical URL */}
        <link rel="canonical" href={fullCanonicalUrl} />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content={ogType} />
        <meta property="og:url" content={fullCanonicalUrl} />
        <meta property="og:image" content={`${baseUrl}${ogImage}`} />
        <meta property="og:site_name" content="WebNaster.com" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={`${baseUrl}${ogImage}`} />
        <meta name="twitter:site" content="@webnaster" />
        <meta name="twitter:creator" content="@webnaster" />

        {/* Additional SEO Meta Tags */}
        <meta name="theme-color" content="#6366f1" />
        <meta name="msapplication-TileColor" content="#6366f1" />

        {/* Structured Data */}
        {structuredData && (
          <script type="application/ld+json">
            {JSON.stringify(structuredData)}
          </script>
        )}

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Helmet>
    )
  } catch (error) {
    console.warn('Helmet error, using fallback SEO:', error)
    return null
  }
}