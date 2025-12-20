// src/components/sections/HeroSection.tsx
"use client"; // Mark as Client Component
import MemoCard from "@/components/ui/MemoCard"; // Import MemoCard

export default function HeroSection() {
  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-[#E8F0FF] via-[#F3E8FF] to-[#EBF9EE] overflow-hidden font-sans">
      
      <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-blue-200/30 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-green-200/30 blur-[120px] rounded-full"></div>

      <div className="z-10 mb-6 px-4 py-1.5 bg-white/60 backdrop-blur-md border border-white/20 rounded-full shadow-sm">
        <span className="text-[#7C4DFF] text-xs font-black tracking-widest uppercase italic">New Version 2.0</span>
      </div>

      <div className="z-10 text-center px-4">
        <h1 className="text-5xl md:text-6xl font-extrabold text-[#1A1A1A] leading-[1.2] mb-6">
          생각이 떠오르는 순간, <br/>
          <span className="text-[#7C4DFF]">바로 메모</span>
        </h1>
        <p className="text-gray-500 text-lg md:text-xl font-medium mb-10 leading-relaxed max-w-2xl mx-auto">
          회의 중에도, 길을 걷다가도, 침대에 누워서도. <br/>
          당신의 모든 영감을 가장 빠르고 간편하게 기록하세요.
        </p>

        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-wrap justify-center gap-4">
            <button className="group flex items-center gap-2 px-10 py-4 bg-[#7C4DFF] text-white font-bold rounded-full shadow-[0_15px_30px_rgba(124,77,255,0.4)] hover:scale-105 hover:shadow-[0_20px_40px_rgba(124,77,255,0.5)] transition-all duration-300">
              무료로 시작하기
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </button>
            <button className="px-10 py-4 bg-white text-gray-700 font-bold rounded-full border border-gray-100 shadow-sm hover:bg-gray-50 transition-colors">
              앱 다운로드
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm font-bold text-[#4CAF50]">
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
              평생 무료
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
              모든 기기 동기화
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
              보안 암호화
            </span>
          </div>
        </div>
      </div>

      {/* Floating Memo Cards */}
      <MemoCard className="absolute hidden lg:block top-[12%] left-[8%] w-60 bg-white/90 backdrop-blur-sm p-6 rounded-[24px] shadow-[0_20px_40px_rgba(0,0,0,0.06)] -rotate-6 transition-transform hover:rotate-0 duration-500">
        <p className="text-[10px] font-bold text-gray-400 mb-3 uppercase tracking-tighter">장보기 리스트</p>
        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-[#7C4DFF] rounded flex items-center justify-center bg-[#7C4DFF]"><svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg></div><span className="text-sm font-semibold text-gray-700">두유</span></div>
          <div className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-gray-200 rounded"></div><span className="text-sm font-semibold text-gray-700">청경채</span></div>
          <div className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-gray-200 rounded"></div><span className="text-sm font-semibold text-gray-700">사과 3개</span></div>
        </div>
        <span className="inline-block px-3 py-1 bg-[#F0EBFF] text-[#7C4DFF] text-[10px] font-black rounded-lg">#영감</span>
      </MemoCard>

      <MemoCard className="absolute hidden lg:block top-[15%] right-[10%] w-52 bg-white p-4 rounded-[24px] shadow-[0_20px_40px_rgba(0,0,0,0.08)] rotate-6 transition-transform hover:rotate-0 duration-500">
        <div className="aspect-square bg-gray-50 rounded-xl mb-3 flex items-center justify-center border border-gray-100 relative">
          <div className="w-16 h-16 border-2 border-gray-200 rounded-full flex items-center justify-center">
            <div className="w-8 h-8 border border-gray-300 rounded-full animate-spin-slow"></div>
          </div>
          <div className="absolute bottom-2 right-2 p-1.5 bg-white shadow-sm rounded-md border border-gray-100"><svg className="w-3 h-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path></svg></div>
        </div>
        <h4 className="text-sm font-bold text-gray-800">새 로고 아이디어</h4>
        <p className="text-[10px] text-gray-400">미니멀한 스타일로...</p>
      </MemoCard>

      <MemoCard className="absolute hidden lg:block bottom-[18%] left-[12%] w-64 bg-white/95 p-5 rounded-[24px] shadow-[0_20px_40px_rgba(0,0,0,0.06)] rotate-2 transition-transform hover:rotate-0 duration-500">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-red-50 text-red-500 rounded-full flex items-center justify-center shadow-inner">
            <svg className="w-5 h-5 animate-pulse" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clip-rule="evenodd"></path></svg>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-1 mb-1">
              <div className="h-1 w-2 bg-gray-200 rounded-full"></div>
              <div className="h-3 w-1.5 bg-red-400 rounded-full"></div>
              <div className="h-5 w-1.5 bg-red-400 rounded-full"></div>
              <div className="h-2 w-1.5 bg-red-400 rounded-full"></div>
              <div className="h-4 w-1.5 bg-red-400 rounded-full"></div>
              <div className="h-2 w-1.5 bg-gray-200 rounded-full"></div>
            </div>
            <p className="text-[10px] font-bold text-gray-700">00:45 • 마케팅 아이디어</p>
          </div>
        </div>
      </MemoCard>

      <MemoCard className="absolute hidden lg:block bottom-[15%] right-[12%] w-64 bg-white p-6 rounded-[24px] shadow-[0_20px_40px_rgba(0,0,0,0.1)] -rotate-3 transition-transform hover:rotate-0 duration-500">
        <div className="flex items-center gap-3 mb-4">
          <div className="px-2 py-1 bg-blue-50 text-[#7C4DFF] rounded-lg text-center">
            <p className="text-[8px] font-black uppercase">Oct</p>
            <p className="text-sm font-bold">24</p>
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-800 tracking-tight text-nowrap">팀 주간 회의</h4>
            <p className="text-[10px] text-gray-400 font-medium">오후 2:00 - 3:00</p>
          </div>
          <span className="ml-auto inline-block px-2 py-0.5 bg-purple-50 text-[#7C4DFF] text-[8px] font-bold rounded-md">#할일</span>
        </div>
        <div className="flex -space-x-2">
          <div className="w-7 h-7 rounded-full border-2 border-white bg-blue-400"></div>
          <div className="w-7 h-7 rounded-full border-2 border-white bg-green-400"></div>
          <div className="w-7 h-7 rounded-full border-2 border-white bg-yellow-400"></div>
          <div className="w-7 h-7 flex items-center justify-center rounded-full border-2 border-white bg-gray-100 text-[8px] font-bold text-gray-500">+2</div>
        </div>
      </MemoCard>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <span className="text-[10px] font-black tracking-[0.2em] uppercase text-gray-500">Scroll for more</span>
        <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M19 9l-7 7-7-7"></path></svg>
      </div>
    </section>
  );
}
