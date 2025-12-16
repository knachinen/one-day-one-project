"use client";
import { motion, useReducedMotion } from 'framer-motion';
import React from 'react';

interface CardMotionWrapperProps {
  children: React.ReactNode;
  rotate?: number; // Random rotation value for each card
}

export default function CardMotionWrapper({ children, rotate = 0 }: CardMotionWrapperProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      whileHover={shouldReduceMotion ? {} : { y: -4, rotate: rotate }}
      whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.2,
        ease: 'easeOut',
      }}
      style={{ pointerEvents: 'auto' }}
    >
      {children}
    </motion.div>
  );
}