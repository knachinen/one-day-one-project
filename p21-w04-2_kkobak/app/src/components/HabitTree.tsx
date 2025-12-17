'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface HabitTreeProps {
  completionPercentage: number
  completedHabitsToday: number // New prop
}

export default function HabitTree({ completionPercentage, completedHabitsToday }: HabitTreeProps) {
  let treeSize = 'text-6xl'
  let flower = null
  const [leaves, setLeaves] = useState<number[]>([]); // To track individual leaves for animation

  // Simple growth based on percentage
  if (completionPercentage >= 30) {
    treeSize = 'text-7xl'
  }
  if (completionPercentage >= 70) {
    treeSize = 'text-8xl'
  }
  if (completionPercentage >= 100) {
    treeSize = 'text-8xl'
    flower = (
      <motion.span
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 500, damping: 20 }}
        role="img"
        aria-label="flower"
        className="text-2xl absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        🌸
      </motion.span>
    )
  }

  // Effect to add leaves based on completedHabitsToday
  useEffect(() => {
    // Only add leaves if completedHabitsToday increases
    if (completedHabitsToday > leaves.length) {
        // Add new leaves up to the completedHabitsToday count
        const newLeavesCount = completedHabitsToday - leaves.length;
        setLeaves(prevLeaves => [...prevLeaves, ...Array(newLeavesCount).fill(0).map((_, i) => prevLeaves.length + i)]);
    }
    // If completedHabitsToday decreases (e.g., unchecking), remove leaves
    else if (completedHabitsToday < leaves.length) {
        setLeaves(prevLeaves => prevLeaves.slice(0, completedHabitsToday));
    }
  }, [completedHabitsToday, leaves.length]);


  // Positions for up to 10 leaves (example, could be more dynamic)
  const leafPositions = [
    { top: '10%', left: '20%' }, { top: '20%', right: '15%' },
    { top: '30%', left: '10%' }, { top: '40%', right: '25%' },
    { top: '50%', left: '25%' }, { top: '60%', right: '10%' },
    { top: '70%', left: '5%' }, { top: '80%', right: '20%' },
    { top: '15%', left: '50%' }, { top: '45%', right: '5%' }
  ];


  return (
    <div className="bg-green-100 p-4 rounded-lg h-48 flex flex-col items-center justify-center relative overflow-hidden">
      <p className="text-lg font-bold text-green-800">
        나의 습관 나무 (달성률: {completionPercentage}%)
      </p>
      <motion.span
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 500, damping: 20 }}
        role="img"
        aria-label="tree"
        className={`${treeSize} mt-2`}
      >
        🌳
      </motion.span>
      {flower}

      <AnimatePresence>
        {leaves.map((_, index) => {
          const position = leafPositions[index % leafPositions.length]; // Cycle through positions
          return (
            <motion.span
              key={index}
              initial={{ opacity: 0, scale: 0, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              role="img"
              aria-label="leaf"
              className="absolute text-xl"
              style={{ top: position.top, left: position.left, right: position.right }}
            >
              🍃
            </motion.span>
          );
        })}
      </AnimatePresence>
    </div>
  )
}
