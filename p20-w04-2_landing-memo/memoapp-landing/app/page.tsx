import HeroSection from '@/components/hero/HeroSection'

export default function Home() {
  return (
    <main>
      <HeroSection />
      <section id="features" className="min-h-[100svh] bg-blue-100 flex items-center justify-center text-2xl">Features Section Placeholder</section>
      <section id="use-cases" className="min-h-[100svh] bg-green-100 flex items-center justify-center text-2xl">Use Cases Section Placeholder</section>
      <section id="social-proof" className="min-h-[100svh] bg-yellow-100 flex items-center justify-center text-2xl">Social Proof Section Placeholder</section>
      <section id="cta" className="min-h-[100svh] bg-purple-100 flex items-center justify-center text-2xl">CTA Section Placeholder</section>
    </main>
  )
}
