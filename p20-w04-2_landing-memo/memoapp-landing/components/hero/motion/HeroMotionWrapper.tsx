"use client";
import { motion, useReducedMotion } from 'framer-motion';
import React from 'react';

interface HeroMotionWrapperProps {
  children: React.ReactNode;
  delay?: number;
}

export default function HeroMotionWrapper({ children, delay = 0 }: HeroMotionWrapperProps) {
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
        duration: shouldReduceMotion ? 0 : 0.5, // Disable animation if motion is reduced
        delay: shouldReduceMotion ? 0 : delay, // Disable delay if motion is reduced
        ease: 'easeOut',
      }}
    >
      {children}
    </motion.div>
  );
}