// src/components/ui/MemoCard.tsx
import React from 'react';

interface MemoCardProps {
  title: string;
  content: string;
  className?: string;
}

export default function MemoCard({ title, content, className }: MemoCardProps) {
  return (
    <div className={`
      relative p-4 rounded-xl shadow-lg
      bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg
      border border-white border-opacity-30
      ${className}
    `}>
      <h3 className="font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-sm text-gray-700">{content}</p>
    </div>
  );
}
