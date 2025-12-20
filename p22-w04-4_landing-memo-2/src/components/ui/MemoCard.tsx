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
      className={`
        bg-white p-6 rounded-2xl shadow-xl
        ${className}
      `}
      whileHover={{ scale: 1.05, boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.1)" }} // Enhanced shadow on hover for depth
      transition={{ duration: 0.3 }} // A slightly slower transition for a smoother effect
    >
      {children}
    </motion.div>
  );
}
