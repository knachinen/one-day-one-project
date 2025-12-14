"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface SkillCubeProps {
  percentage: number;
  colorClass: string; // e.g., 'bg-accent-gradient'
  isInView: boolean;
  delay: number; // For staggered animation
}

const SkillCube: React.FC<SkillCubeProps> = ({ percentage, colorClass, isInView, delay }) => {
  return (
    <div className="relative w-12 h-12" style={{ transformStyle: 'preserve-3d', perspective: '100px' }}> {/* Pseudo 3D Container */}
      <motion.div
        className={`absolute inset-0 ${colorClass} rounded-md`}
        initial={{ scale: 0, rotateX: 0, rotateY: 0 }}
        animate={isInView ? { scale: percentage / 100, rotateX: 20, rotateY: -20 } : { scale: 0, rotateX: 0, rotateY: 0 }}
        transition={{ duration: 1.5, ease: 'easeOut', delay: delay }}
        style={{ transformOrigin: 'bottom left' }} // Animate from bottom-left
      />
      <div className="absolute inset-0 border border-gray-300 rounded-md" style={{ transform: 'translateZ(-1px)' }}></div> {/* Outline of the "cube" */}
    </div>
  );
};

export default SkillCube;
