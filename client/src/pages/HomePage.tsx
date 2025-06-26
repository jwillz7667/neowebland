import { ScrollProgress } from "@/components/common/ScrollProgress"
import { ParticleBackground } from "@/components/common/ParticleBackground"
import { ChatBot } from "@/components/common/ChatBot"
import { HeroSection } from "@/components/home/HeroSection"
import { ServicesSection } from "@/components/home/ServicesSection"
import { DynamicLocalBusinessSection } from "@/components/home/DynamicLocalBusinessSection"
import { PortfolioSection } from "@/components/home/PortfolioSection"
import { WhyChooseUsSection } from "@/components/home/WhyChooseUsSection"
import { ContactSection } from "@/components/home/ContactSection"
import { SEO } from "@/components/SEO"
import { pagesSEO, businessSchema } from "@/data/seoData"

export function HomePage() {
  const homePageSchema = [
    businessSchema,
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "WebNaster.com",
      "url": "https://webnaster.com",
      "description": pagesSEO.home.description,
      "publisher": {
        "@type": "Organization",
        "name": "WebNaster.com"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://webnaster.com/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    }
  ]

  return (
    <div className="relative">
      <SEO
        title={pagesSEO.home.title}
        description={pagesSEO.home.description}
        keywords={pagesSEO.home.keywords}
        canonicalUrl="/"
        ogType={pagesSEO.home.ogType}
        structuredData={homePageSchema}
      />
      <ScrollProgress />
      <ParticleBackground />
      <HeroSection />
      <ServicesSection />
      <DynamicLocalBusinessSection />
      <PortfolioSection />
      <WhyChooseUsSection />
      <ContactSection />
      <ChatBot />
    </div>
  )
}