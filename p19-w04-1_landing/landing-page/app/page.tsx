import HeroSection from "@/components/hero-section";
import ProblemStatementSection from "@/components/problem-statement-section";
import FinalCtaSection from "@/components/final-cta-section";
import ClientSectionsWrapper from "@/components/client-sections-wrapper"; // Import the new wrapper

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ProblemStatementSection />
      <ClientSectionsWrapper /> {/* Render the wrapper */}
      <FinalCtaSection />
    </main>
  );
}
