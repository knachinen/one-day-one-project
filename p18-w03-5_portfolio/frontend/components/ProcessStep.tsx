"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface ProcessStepProps {
  step: number;
  title: string;
  description: string;
  icon: string;
  isLast: boolean; // To control the vertical line visibility
  isInView: boolean; // To trigger animation
}

const ProcessStep: React.FC<ProcessStepProps> = ({ step, title, description, isLast, isInView }) => {
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
        delay: isInView ? step * 0.1 : 0, // Staggered delay only when entering view
      },
    },
  };

  return (
    <div className="relative flex items-start gap-9 group">
      <div className="flex flex-col items-start pr-4">
        {/* Step number/icon */}
        <motion.div
          className="absolute top-0 left-5 -translate-x-1/2 flex items-center justify-center w-10 h-10 bg-accent-gradient text-white rounded-full text-lg font-black z-10 group-hover:brightness-110 transition-all duration-300"
          variants={contentVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {step}
        </motion.div>
        {/* Static Dotted Line (background) */}
        {!isLast && (
          <div className="absolute top-10 left-5 h-full w-0.5 border-l-2 border-dashed border-border z-0"></div>
        )}
        {/* Animated Filling Line (foreground) */}
        {!isLast && (
          <motion.div
            className="absolute top-10 left-5 w-0.5 bg-accent-gradient z-10 group-hover:brightness-110 transition-all duration-300"
            initial={{ height: 0 }}
            animate={isInView ? { height: '100%' } : { height: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: step * 0.2 }}
          ></motion.div>
        )}
      </div>
      <motion.div
        className="flex-1 pb-10"
        variants={contentVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <h4 className="text-xl font-bold text-foreground mb-1">{title}</h4>
        <p className="text-md text-muted-foreground">{description}</p>
      </motion.div>
    </div>
  );
};

export default ProcessStep;
