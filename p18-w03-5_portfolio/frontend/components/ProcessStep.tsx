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
  return (
    <div className="relative flex items-start gap-4">
      <div className="flex flex-col items-center">
        <div className="flex items-center justify-center w-10 h-10 bg-accent-gradient text-white rounded-full text-lg font-black z-10">
          {step}
        </div>
        {!isLast && (
          <motion.div
            className="w-0.5 h-full bg-accent-gradient absolute top-10 left-1/2 -translate-x-1/2"
            initial={{ height: 0 }}
            animate={isInView ? { height: '100%' } : { height: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: step * 0.2 }}
          ></motion.div>
        )}
      </div>
      <div className="flex-1 pb-10">
        <h4 className="text-xl font-bold text-foreground mb-1">{title}</h4>
        <p className="text-md text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default ProcessStep;
