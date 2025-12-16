"use client";
// components/hero/HeroTitle.tsx
import { motion, useReducedMotion } from 'framer-motion';

export default function HeroTitle() {
  const shouldReduceMotion = useReducedMotion();

  const variants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.h1
      variants={variants}
      initial="hidden"
      animate="visible"
      transition={{
        duration: shouldReduceMotion ? 0 : 0.5,
        delay: shouldReduceMotion ? 0 : 0.0,
        ease: 'easeOut',
      }}
      className="text-[36px] font-bold leading-[1.2] tracking-[-0.01em] md:text-[56px]"
    >
      생각이 떠오르는 순간,
      <br />
      <span className="text-primary">바로 메모</span>
    </motion.h1>
  );
}
