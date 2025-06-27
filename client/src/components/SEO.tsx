import { Helmet } from "react-helmet-async"
import { useEffect } from "react"
import { siteConfig } from "@/data/seoData"

interface SEOProps {
  title: string
  description: string
  keywords?: string
  canonicalUrl?: string
  ogImage?: string
  ogType?: string
  structuredData?: object | object[]
  noIndex?: boolean
  breadcrumbs?: Array<{name: string, url: string}>
}

export function SEO({
  title,
  description,
  keywords = siteConfig.keywords.join(", "),
  canonicalUrl,
  ogImage = "/og-image.jpg",
  ogType = "website",
  structuredData,
  noIndex = false,
  breadcrumbs
}: SEOProps) {
  const fullTitle = title.includes(siteConfig.name) ? title : `${title} | ${siteConfig.name}`
  const fullCanonicalUrl = canonicalUrl ? `${siteConfig.url}${canonicalUrl}` : siteConfig.url
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${siteConfig.url}${ogImage}`

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

  // Generate breadcrumb structured data
  const breadcrumbSchema = breadcrumbs ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `${siteConfig.url}${item.url}`
    }))
  } : null

  try {
    return (
      <Helmet>
        {/* Basic Meta Tags */}
        <title>{fullTitle}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={siteConfig.name} />
        <meta name="robots" content={noIndex ? "noindex, nofollow" : "index, follow"} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />

        {/* Canonical URL */}
        <link rel="canonical" href={fullCanonicalUrl} />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content={ogType} />
        <meta property="og:url" content={fullCanonicalUrl} />
        <meta property="og:image" content={fullOgImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={title} />
        <meta property="og:site_name" content={siteConfig.name} />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={fullOgImage} />
        <meta name="twitter:image:alt" content={title} />
        <meta name="twitter:site" content={siteConfig.twitterHandle} />
        <meta name="twitter:creator" content={siteConfig.twitterHandle} />

        {/* Additional SEO Meta Tags */}
        <meta name="theme-color" content="#6366f1" />
        <meta name="msapplication-TileColor" content="#6366f1" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="application-name" content={siteConfig.name} />
        <meta name="apple-mobile-web-app-title" content={siteConfig.name} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="mobile-web-app-capable" content="yes" />

        {/* DNS Prefetch and Preconnect */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />

        {/* Structured Data */}
        {structuredData && (
          Array.isArray(structuredData) ? 
            structuredData.map((data, index) => (
              <script key={index} type="application/ld+json">
                {JSON.stringify(data)}
              </script>
            )) :
            <script type="application/ld+json">
              {JSON.stringify(structuredData)}
            </script>
        )}

        {/* Breadcrumb Structured Data */}
        {breadcrumbSchema && (
          <script type="application/ld+json">
            {JSON.stringify(breadcrumbSchema)}
          </script>
        )}

        {/* Favicon and App Icons */}
        <link rel="icon" type="image/svg+xml" href="/my-favicon/favicon.svg" />
        <link rel="icon" type="image/x-icon" href="/my-favicon/favicon.ico" />
        <link rel="icon" type="image/png" sizes="96x96" href="/my-favicon/favicon-96x96.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/my-favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/my-favicon/web-app-manifest-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/my-favicon/web-app-manifest-512x512.png" />
        <link rel="manifest" href="/my-favicon/site.webmanifest" />
      </Helmet>
    )
  } catch (error) {
    console.warn('Helmet error, using fallback SEO:', error)
    return null
  }
}