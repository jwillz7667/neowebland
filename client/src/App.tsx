import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { HelmetProvider } from "react-helmet-async"
import { ThemeProvider } from "./components/ui/theme-provider"
import { Toaster } from "./components/ui/toaster"
import { Layout } from "./components/Layout"
import { HomePage } from "./pages/HomePage"
import { BlankPage } from "./pages/BlankPage"
import { PrivacyPolicy } from "./pages/PrivacyPolicy"
import { TermsOfService } from "./pages/TermsOfService"
import { AboutUs } from "./pages/AboutUs"
import { OurTeam } from "./pages/OurTeam"
import { Careers } from "./pages/Careers"
import { Contact } from "./pages/Contact"
import { Blog } from "./pages/Blog"
import { BlogPost } from "./pages/BlogPost"
import { WebDevelopment } from "./pages/services/WebDevelopment"
import { UIUXDesign } from "./pages/services/UIUXDesign"
import { MobileApps } from "./pages/services/MobileApps"
import { ECommerce } from "./pages/services/ECommerce"
import { SEOServices } from "./pages/services/SEOServices"

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider defaultTheme="light" storageKey="ui-theme">
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="about" element={<AboutUs />} />
              <Route path="team" element={<OurTeam />} />
              <Route path="careers" element={<Careers />} />
              <Route path="contact" element={<Contact />} />
              <Route path="blog" element={<Blog />} />
              <Route path="blog/:slug" element={<BlogPost />} />
              <Route path="services/web-development" element={<WebDevelopment />} />
              <Route path="services/ui-ux-design" element={<UIUXDesign />} />
              <Route path="services/mobile-apps" element={<MobileApps />} />
              <Route path="services/ecommerce" element={<ECommerce />} />
              <Route path="services/seo" element={<SEOServices />} />
              <Route path="privacy" element={<PrivacyPolicy />} />
              <Route path="terms" element={<TermsOfService />} />
            </Route>
            <Route path="*" element={<BlankPage />} />
          </Routes>
        </Router>
        <Toaster />
      </ThemeProvider>
    </HelmetProvider>
  )
}

export default App