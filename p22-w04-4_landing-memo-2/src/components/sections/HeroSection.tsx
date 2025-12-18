// src/components/sections/HeroSection.tsx
export default function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen text-center px-4 py-20">
      {/* Auxiliary Message */}
      <p className="text-sm text-primary mb-2">NEW VERSION 2.0</p>

      {/* Main Headline */}
      <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-4 max-w-4xl">
        생각이 떠오르는 순간, 바로 메모
      </h1>

      {/* Sub-text */}
      <p className="text-lg md:text-xl text-gray-700 max-w-3xl">
        회의 중에도, 길을 걷다가, 침대에 누워서도 당신의 모든 영감을 가장 빠르고 간편하게 기록하세요.
      </p>
    </section>
  );
}
