// src/components/ui/MemoCard.tsx
"use client"; // Mark as Client Component
import React from 'react';
import { motion } from 'framer-motion'; // Import motion from framer-motion

interface MemoCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function MemoCard({ children, className }: MemoCardProps) {
  return (
    <motion.div // Use motion.div for animation
      className={className}
      transition={{ duration: 0.5 }} // A slightly slower transition for a smoother effect
    >
      {children}
    </motion.div>
  );
}
