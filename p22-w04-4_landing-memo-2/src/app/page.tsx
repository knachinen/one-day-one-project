import HeroSection from "@/components/sections/HeroSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      {/* Dummy sections for smooth scrolling */}
      <div id="features" className="min-h-screen bg-gray-100 flex items-center justify-center">
        <h2 className="text-4xl text-gray-800">Features Section</h2>
      </div>
      <div id="use-cases" className="min-h-screen bg-gray-200 flex items-center justify-center">
        <h2 className="text-4xl text-gray-800">Use Cases Section</h2>
      </div>
      <div id="pricing" className="min-h-screen bg-gray-100 flex items-center justify-center">
        <h2 className="text-4xl text-gray-800">Pricing Section</h2>
      </div>
      <div id="testimonials" className="min-h-screen bg-gray-200 flex items-center justify-center">
        <h2 className="text-4xl text-gray-800">Testimonials Section</h2>
      </div>
    </main>
  );
}