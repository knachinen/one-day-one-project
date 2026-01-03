import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-secondary via-background to-background opacity-50 -z-10" />

      <Navbar />

      <section className="flex-1 flex items-center justify-center">
        <div className="text-center space-y-6">
          <h1 className="font-header text-5xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white via-gray-200 to-gray-500 animate-pulse">
            NEXT SENSES
          </h1>
          <p className="font-mono text-accent-cyan text-sm md:text-base tracking-[0.2em] uppercase">
            Futurist Artist Portfolio
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
