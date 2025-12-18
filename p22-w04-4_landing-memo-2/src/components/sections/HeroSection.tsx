// src/components/sections/HeroSection.tsx
import Link from 'next/link'; // Import Link for navigation
import MemoCard from "@/components/ui/MemoCard"; // Import MemoCard

export default function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen text-center px-4 py-20 overflow-hidden">
      {/* Main Content Container - explicitly establishing stacking context and z-index */}
      <div className="relative z-20 flex flex-col items-center"> {/* THIS IS THE KEY CHANGE */}
        {/* Auxiliary Message */}
        <p className="text-sm text-primary mb-2">NEW VERSION 2.0</p>

        {/* Main Headline */}
        <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-4 max-w-4xl">
          생각이 떠오르는 순간, 바로 메모
        </h1>

        {/* Sub-text */}
        <p className="text-lg md:text-xl text-gray-700 max-w-3xl mb-8">
          회의 중에도, 길을 걷다가, 침대에 누워서도 당신의 모든 영감을 가장 빠르고 간편하게 기록하세요.
        </p>

        {/* CTA Button Group */}
        <div className="flex flex-col sm:flex-row gap-4"> {/* z-index not needed here, handled by parent */}
          {/* Primary CTA */}
          <Link href="#get-started">
            <button className="px-8 py-3 bg-primary text-white text-base md:text-lg rounded-full shadow-lg hover:bg-primary-dark transition-colors">
              무료로 시작하기
            </button>
          </Link>
          {/* Secondary CTA */}
          <Link href="#download">
            <button className="px-8 py-3 border border-gray-300 text-gray-800 text-base md:text-lg rounded-full shadow-md hover:bg-gray-100 transition-colors">
              앱 다운로드
            </button>
          </Link>
        </div>
      </div> {/* END of Main Content Container */}

      {/* Floating Memo Cards (Static positioning for now) */}
      {/* Cards container implicitly has z-index lower than Main Content Container due to structural order and z-index properties */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Card 1: Top Left */}
        <MemoCard
          title="정보 리스트"
          content="체크리스트, 태그 #영감"
          className="absolute top-[15%] left-[15%] w-32 h-24 md:w-48 md:h-32 z-10 -rotate-6 transform -translate-x-1/2 -translate-y-1/2" // Adjusted position and z-index for responsive size
        />
        {/* Card 2: Top Right */}
        <MemoCard
          title="새로운 아이디어"
          content="3D 아이콘 (혹은 추상적 이미지)"
          className="absolute top-[10%] right-[15%] w-36 h-28 md:w-56 md:h-36 z-10 rotate-3 transform translate-x-1/2 -translate-y-1/2" // Adjusted position and z-index for responsive size
        />
        {/* Card 3: Bottom Left */}
        <MemoCard
          title="음성 메모"
          content="마이크 아이콘, 웨이브 형태의 사운드 바"
          className="absolute bottom-[10%] left-[20%] w-34 h-26 md:w-52 md:h-34 z-10 rotate-3 transform -translate-x-1/2 translate-y-1/2" // Adjusted position and z-index for responsive size
        />
        {/* Card 4: Bottom Right */}
        <MemoCard
          title="팀 주간 회의"
          content="날짜 표시 (OCT 24), 태그 #할 일"
          className="absolute bottom-[15%] right-[10%] w-32 h-24 md:w-48 md:h-32 z-10 -rotate-12 transform translate-x-1/2 translate-y-1/2" // Adjusted position and z-index for responsive size
        />
      </div>
    </section>
  );
}
