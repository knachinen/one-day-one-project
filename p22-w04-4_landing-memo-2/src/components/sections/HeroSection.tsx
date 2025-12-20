// src/components/sections/HeroSection.tsx
"use client"; // Mark as Client Component
import { motion } from 'framer-motion'; // Import motion from framer-motion
import Link from 'next/link';
import MemoCard from "@/components/ui/MemoCard"; // Import MemoCard

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2 // Stagger children animations by 0.2 seconds
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
  };

  const buttonHoverVariants = {
    hover: {
      scale: 1.02,
      boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.2)", // Subtle shadow expansion
      transition: {
        duration: 0.3,
        repeat: Infinity, // Pulse animation
        repeatType: "reverse",
      },
    },
    initial: {
      scale: 1,
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#E8F0FF] to-[#F3E8FF] overflow-hidden">
      {/* Main Content Container - explicitly establishing stacking context and z-index */}
      <motion.div
        className="relative z-20 flex flex-col items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Auxiliary Message */}
        <span className="px-4 py-1 bg-white/50 text-[#7C4DFF] text-xs font-bold rounded-full mb-6 border border-[#7C4DFF]/20">
          NEW VERSION 2.0
        </span>

        {/* Main Headline */}
        <motion.h1 className="text-5xl font-extrabold text-[#1A1A1A] text-center leading-tight mb-4" variants={itemVariants}>
          생각이 떠오르는 순간, <br/>
          <span className="text-[#7C4DFF]">바로 메모</span>
        </motion.h1>

        {/* Sub-text */}
        <motion.p className="text-gray-600 text-lg text-center mb-10 max-w-xl" variants={itemVariants}>
          회의 중에도, 길을 걷다가도, 침대에 누워서도. <br/>
          당신의 모든 영감을 가장 빠르고 간편하게 기록하세요.
        </motion.p>

        {/* CTA Button Group */}
        <div className="flex flex-col items-center gap-6">
          <div className="flex gap-4">
            <motion.button
              className="flex items-center gap-2 px-8 py-4 bg-[#7C4DFF] text-white font-bold rounded-full shadow-[0_10px_20px_rgba(124,77,255,0.3)] hover:scale-105 transition-transform"
              variants={buttonHoverVariants}
              initial="initial"
              whileHover="hover"
            >
              무료로 시작하기
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </motion.button>
            
            <motion.button
              className="px-8 py-4 bg-white text-gray-700 font-bold rounded-full border border-gray-200 shadow-sm hover:bg-gray-50"
              variants={buttonHoverVariants}
              initial="initial"
              whileHover="hover"
            >
              앱 다운로드
            </motion.button>
          </div>

          <div className="flex gap-6 text-sm text-[#4CAF50] font-medium">
            <span className="flex items-center gap-1">✔ 평생 무료</span>
            <span className="flex items-center gap-1">✔ 모든 기기 동기화</span>
            <span className="flex items-center gap-1">✔ 보안 암호화</span>
          </div>
        </div>
      </motion.div>
      {/* END of Main Content Container */}


      {/* Floating Memo Cards */}
      <MemoCard className="absolute top-[15%] left-[10%] w-64 -rotate-6 hidden md:block">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-400 text-xs font-bold">장보기 리스트</span>
          <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
        </div>
        <ul className="space-y-3 mb-4">
          <li className="flex items-center gap-2 text-sm text-gray-700"><input type="checkbox" checked readOnly className="accent-[#7C4DFF]"/> 유기농 우유</li>
          <li className="flex items-center gap-2 text-sm text-gray-700"><input type="checkbox" readOnly className="accent-[#7C4DFF]"/> 방사유정란</li>
        </ul>
        <span className="px-3 py-1 bg-[#F0EBFF] text-[#7C4DFF] text-xs rounded-lg font-bold">#영감</span>
      </MemoCard>

      <MemoCard className="absolute bottom-[20%] right-[10%] w-72 rotate-3 hidden md:block">
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-blue-100 text-blue-600 p-2 rounded-lg font-bold text-xs text-center">OCT<br/>24</div>
          <div>
            <h4 className="font-bold text-gray-800">팀 주간 회의</h4>
            <p className="text-xs text-gray-500">오후 2:00 - 3:00</p>
          </div>
        </div>
        <div className="flex -space-x-2">
          <div className="w-8 h-8 rounded-full border-2 border-white bg-blue-400"></div>
          <div className="w-8 h-8 rounded-full border-2 border-white bg-green-400"></div>
          <div className="w-8 h-8 rounded-full border-2 border-white bg-yellow-400"></div>
          <div className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-white bg-gray-100 text-[10px] text-gray-500">+2</div>
        </div>
      </MemoCard>

      {/* Scroll for more indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600 animate-bounce">
        <span className="text-sm">Scroll for more</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
