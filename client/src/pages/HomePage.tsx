import { ScrollProgress } from "@/components/common/ScrollProgress"
import { ParticleBackground } from "@/components/common/ParticleBackground"
import { ChatBot } from "@/components/common/ChatBot"
import { HeroSection } from "@/components/home/HeroSection"
import { ServicesSection } from "@/components/home/ServicesSection"
import { DynamicLocalBusinessSection } from "@/components/home/DynamicLocalBusinessSection"
import { PortfolioSection } from "@/components/home/PortfolioSection"
import { WhyChooseUsSection } from "@/components/home/WhyChooseUsSection"
import { ContactSection } from "@/components/home/ContactSection"

export function HomePage() {
  return (
    <div className="relative">
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