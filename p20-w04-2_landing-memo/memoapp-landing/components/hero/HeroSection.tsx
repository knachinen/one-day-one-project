// components/hero/HeroSection.tsx
import HeroTitle from './HeroTitle';
import HeroSubtitle from './HeroSubtitle';
import HeroCTA from './HeroCTA';
import FloatingNotes from './FloatingNotes'; // Import FloatingNotes

export default function HeroSection() {
  return (
    <section className="relative min-h-[100svh] flex flex-col items-center justify-center text-center px-4 md:px-5 lg:px-6 md:text-left overflow-hidden">
      <div className="max-w-[1200px] mx-auto z-10"> {/* Added z-10 to ensure text is above floating notes */}
        <HeroTitle />
        <HeroSubtitle />
        <HeroCTA />
      </div>
      <FloatingNotes /> {/* Add FloatingNotes component */}
    </section>
  );
}
