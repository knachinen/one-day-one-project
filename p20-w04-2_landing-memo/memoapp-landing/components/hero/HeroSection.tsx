// components/hero/HeroSection.tsx
import HeroTitle from './HeroTitle';
import HeroSubtitle from './HeroSubtitle';
import HeroCTA from './HeroCTA';

export default function HeroSection() {
  return (
    <section className="min-h-[100svh] flex flex-col items-center justify-center text-center px-4 md:px-5 lg:px-6 md:text-left">
      <div className="max-w-[1200px] mx-auto">
        <HeroTitle />
        <HeroSubtitle />
        <HeroCTA />
      </div>
    </section>
  );
}
