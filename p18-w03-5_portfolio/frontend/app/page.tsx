import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import PortfolioSection from '@/components/PortfolioSection';
import ServicesSection from '@/components/ServicesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ContactSection from '@/components/ContactSection';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <PortfolioSection />
      <ServicesSection />
      <TestimonialsSection />
      <ContactSection />
    </main>
  );
}
