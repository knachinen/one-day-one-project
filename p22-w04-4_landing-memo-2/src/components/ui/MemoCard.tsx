// src/components/ui/MemoCard.tsx
"use client"; // Mark as Client Component
import React from 'react';
import { motion } from 'framer-motion'; // Import motion from framer-motion

interface MemoCardProps {
  title: string;
  content: string;
  className?: string;
}

export default function MemoCard({ title, content, className }: MemoCardProps) {
  return (
    <motion.div // Use motion.div for animation
      className={`
        relative p-4 rounded-xl shadow-lg
        bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg
        border border-white border-opacity-30
        ${className}
      `}
      whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)" }} // Scale and shadow on hover
      transition={{ duration: 0.2 }} // Smooth transition
    >
      <h3 className="font-semibold text-gray-800 text-base sm:text-lg mb-2">{title}</h3>
      <p className="text-sm text-gray-700">{content}</p>
    </motion.div>
  );
}
