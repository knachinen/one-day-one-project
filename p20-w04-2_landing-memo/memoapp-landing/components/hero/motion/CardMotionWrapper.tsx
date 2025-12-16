"use client";
import { motion, useReducedMotion } from 'framer-motion';
import React from 'react';

interface CardMotionWrapperProps {
  children: React.ReactNode;
  rotate?: number; // Random rotation value for each card
  className?: string; // Add className prop
  'aria-hidden'?: boolean; // Add aria-hidden prop
}

export default function CardMotionWrapper({ children, rotate = 0, className, 'aria-hidden': ariaHidden }: CardMotionWrapperProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className} // Pass className here
      aria-hidden={ariaHidden} // Pass aria-hidden here
      animate={{ y: [0, -5, 0], rotate: [0, rotate, 0] }} // Add continuous animation
      transition={{
        duration: shouldReduceMotion ? 0 : 3, // Longer duration for continuous animation
        repeat: Infinity, // Loop indefinitely
        ease: 'easeInOut',
      }}
      whileHover={shouldReduceMotion ? {} : { y: -4, rotate: rotate }}
      whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
      style={{ pointerEvents: 'auto' }}
    >
      {children}
    </motion.div>
  );
}
