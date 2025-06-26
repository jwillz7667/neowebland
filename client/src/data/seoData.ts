// SEO Data Configuration for WebNaster.com
export const siteConfig = {
  name: "WebNaster.com",
  description: "Premium web design and development agency creating stunning digital experiences. Custom websites, mobile apps, UI/UX design, and e-commerce solutions.",
  url: "https://webnaster.com",
  ogImage: "/og-image.jpg",
  twitterHandle: "@webnaster",
  keywords: [
    "web design",
    "web development", 
    "UI/UX design",
    "mobile apps",
    "e-commerce",
    "SEO services",
    "digital marketing",
    "responsive design",
    "custom websites",
    "Minnesota web design",
    "Minneapolis web development"
  ]
}

export const businessSchema = {
  "@context": "https://schema.org",
  "@type": "WebDesignCompany",
  "name": "WebNaster.com",
  "alternateName": "WebNaster",
  "description": siteConfig.description,
  "url": siteConfig.url,
  "logo": `${siteConfig.url}/logo.png`,
  "image": `${siteConfig.url}/og-image.jpg`,
  "telephone": "+1-555-123-4567",
  "email": "info@webnaster.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Main Street",
    "addressLocality": "Minneapolis",
    "addressRegion": "MN",
    "postalCode": "55401",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "44.9778",
    "longitude": "-93.2650"
  },
  "openingHours": "Mo-Fr 09:00-18:00",
  "priceRange": "$$",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "127"
  },
  "sameAs": [
    "https://www.facebook.com/webnaster",
    "https://www.twitter.com/webnaster",
    "https://www.linkedin.com/company/webnaster",
    "https://www.instagram.com/webnaster"
  ],
  "makesOffer": [
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "Web Design",
        "description": "Custom website design and development services"
      }
    },
    {
      "@type": "Offer", 
      "itemOffered": {
        "@type": "Service",
        "name": "Mobile App Development",
        "description": "iOS and Android mobile application development"
      }
    },
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service", 
        "name": "UI/UX Design",
        "description": "User interface and user experience design services"
      }
    },
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "E-commerce Development",
        "description": "Online store and e-commerce platform development"
      }
    },
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "SEO Services", 
        "description": "Search engine optimization and digital marketing"
      }
    }
  ]
}

export const pagesSEO = {
  home: {
    title: "Premium Web Design & Development Agency",
    description: "Transform your digital presence with WebNaster.com's award-winning web design and development services. Custom websites, mobile apps, and digital solutions that drive results.",
    keywords: "web design agency, custom websites, mobile app development, UI/UX design, Minneapolis web design",
    ogType: "website"
  },
  about: {
    title: "About Us - Award-Winning Web Design Team", 
    description: "Meet the creative minds behind WebNaster.com. Our passionate team of designers and developers creates exceptional digital experiences that help businesses thrive online.",
    keywords: "web design team, about webnaster, Minneapolis web designers, creative agency team",
    ogType: "website"
  },
  services: {
    title: "Web Design & Development Services",
    description: "Comprehensive web design and development services including custom websites, mobile apps, UI/UX design, e-commerce solutions, and SEO optimization.",
    keywords: "web design services, web development, mobile apps, UI/UX design, e-commerce, SEO services",
    ogType: "website"
  },
  webDevelopment: {
    title: "Custom Web Development Services",
    description: "Professional web development services using cutting-edge technologies. From simple websites to complex web applications, we build scalable, secure, and fast websites.",
    keywords: "web development, custom websites, React development, Node.js, full-stack development",
    ogType: "service"
  },
  uiuxDesign: {
    title: "UI/UX Design Services - User-Centered Design",
    description: "Expert UI/UX design services that create intuitive, beautiful, and conversion-focused digital experiences. User research, wireframing, prototyping, and testing.",
    keywords: "UI design, UX design, user experience, interface design, wireframing, prototyping",
    ogType: "service"
  },
  mobileApps: {
    title: "Mobile App Development - iOS & Android",
    description: "Professional mobile app development for iOS and Android. Native and cross-platform mobile applications that engage users and drive business growth.",
    keywords: "mobile app development, iOS apps, Android apps, React Native, mobile development",
    ogType: "service"
  },
  ecommerce: {
    title: "E-commerce Development & Online Stores",
    description: "Custom e-commerce solutions that drive sales. From small online stores to enterprise-level platforms, we build secure, scalable, and conversion-optimized e-commerce websites.",
    keywords: "e-commerce development, online store, Shopify, WooCommerce, custom e-commerce",
    ogType: "service"
  },
  seoServices: {
    title: "SEO Services & Digital Marketing",
    description: "Comprehensive SEO and digital marketing services that increase your online visibility, drive organic traffic, and boost conversions. Local SEO, technical SEO, and content marketing.",
    keywords: "SEO services, search engine optimization, digital marketing, local SEO, Minneapolis SEO",
    ogType: "service"
  },
  contact: {
    title: "Contact Us - Let's Build Something Amazing",
    description: "Ready to transform your digital presence? Contact WebNaster.com today for a free consultation. Let's discuss your project and bring your vision to life.",
    keywords: "contact web design agency, get quote, web design consultation, Minneapolis web design",
    ogType: "website"
  },
  team: {
    title: "Our Team - Meet the WebNaster Experts",
    description: "Get to know the talented designers, developers, and digital strategists who make WebNaster.com's success possible. Passionate professionals dedicated to your success.",
    keywords: "web design team, our team, Minneapolis web designers, creative professionals",
    ogType: "website"
  },
  careers: {
    title: "Careers - Join the WebNaster Team",
    description: "Looking for a career in web design and development? Join our growing team of creative professionals. Current openings and opportunities at WebNaster.com.",
    keywords: "web design jobs, developer careers, Minneapolis web design jobs, creative careers",
    ogType: "website"
  },
  blog: {
    title: "Web Design Blog - Tips, Trends & Insights",
    description: "Stay updated with the latest web design trends, development tips, and digital marketing insights. Expert advice from the WebNaster.com team.",
    keywords: "web design blog, development tips, design trends, digital marketing insights",
    ogType: "website"
  },
  privacy: {
    title: "Privacy Policy - WebNaster.com",
    description: "WebNaster.com privacy policy. Learn how we collect, use, and protect your personal information when you use our website and services.",
    keywords: "privacy policy, data protection, website privacy",
    ogType: "website"
  },
  terms: {
    title: "Terms of Service - WebNaster.com", 
    description: "Terms of service for WebNaster.com. Legal terms and conditions for using our website and web design services.",
    keywords: "terms of service, legal terms, website terms",
    ogType: "website"
  }
}

export const generateBreadcrumbSchema = (breadcrumbs: Array<{name: string, url: string}>) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `${siteConfig.url}${item.url}`
    }))
  }
}

export const generateServiceSchema = (service: {
  name: string
  description: string
  price?: string
  duration?: string
}) => {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.name,
    "description": service.description,
    "provider": {
      "@type": "Organization",
      "name": "WebNaster.com",
      "url": siteConfig.url
    },
    "areaServed": {
      "@type": "Place",
      "name": "Minneapolis, MN"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": service.name,
      "itemListElement": [
        {
          "@type": "Service",
          "name": service.name,
          "description": service.description
        }
      ]
    }
  }
} 