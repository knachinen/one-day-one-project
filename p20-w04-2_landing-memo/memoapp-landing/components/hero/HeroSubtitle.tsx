"use client";
// components/hero/HeroSubtitle.tsx
import { motion, useReducedMotion } from 'framer-motion';

export default function HeroSubtitle() {
  const shouldReduceMotion = useReducedMotion();

  const variants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.p
      variants={variants}
      initial="hidden"
      animate="visible"
      transition={{
        duration: shouldReduceMotion ? 0 : 0.5,
        delay: shouldReduceMotion ? 0 : 0.1,
        ease: 'easeOut',
      }}
      className="text-lg text-text-dark max-w-[640px] mt-6" // Updated color
    >
      생각을 놓치지 않도록, 가장 빠르고 가벼운 메모 경험
    </motion.p>
  );
}
