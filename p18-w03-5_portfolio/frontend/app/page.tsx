import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import PortfolioSection from '@/components/PortfolioSection';
import ServicesSection from '@/components/ServicesSection';
import TestimonialsSection from '@/components/TestimonialsSection';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <PortfolioSection />
      <ServicesSection />
      <TestimonialsSection />
    </main>
  );
}
