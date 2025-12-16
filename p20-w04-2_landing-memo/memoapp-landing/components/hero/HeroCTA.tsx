"use client";
// components/hero/HeroCTA.tsx
import { motion, useReducedMotion } from 'framer-motion';

export default function HeroCTA() {
  const shouldReduceMotion = useReducedMotion();

  const variants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      transition={{
        duration: shouldReduceMotion ? 0 : 0.5,
        delay: shouldReduceMotion ? 0 : 0.2,
        ease: 'easeOut',
      }}
      className="flex flex-col items-center justify-center gap-3 mt-8 md:flex-row md:gap-4"
    >
      {/* Primary Button */}
      <button className="h-14 px-6 rounded-lg bg-primary text-text-light font-medium text-lg">
        무료로 시작하기
      </button>

      {/* Secondary Button */}
      <button className="h-14 px-6 rounded-lg border border-border-gray bg-white text-text-dark font-medium text-lg">
        앱 다운로드
      </button>
    </motion.div>
  );
}
