import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import PortfolioSection from '@/components/PortfolioSection';
import ServicesSection from '@/components/ServicesSection';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <PortfolioSection />
      <ServicesSection />
    </main>
  );
}
