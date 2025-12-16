// components/hero/NoteCard.tsx
import React from 'react';
import CardMotionWrapper from './motion/CardMotionWrapper'; // Import CardMotionWrapper

interface NoteCardProps {
  children: React.ReactNode;
  className?: string; // To allow overriding width or adding custom positioning
  rotate?: number; // Add rotate prop
}

export default function NoteCard({ children, className, rotate = 0 }: NoteCardProps) {
  return (
    <CardMotionWrapper
      rotate={rotate}
      className={`rounded-2xl bg-white/90 p-4 shadow-[0_10px_30px_rgba(0,0,0,0.08)] ${className}`}
      aria-hidden="true"
    >
      {children}
    </CardMotionWrapper>
  );
}