'use client'

import React, { useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'

interface KkobagiCharacterProps {
  completionPercentage: number
  totalHabitsToday: number
  completedHabitsToday: number
  weeklyCompletionRate: number // New prop
}

export default function KkobagiCharacter({
  completionPercentage,
  totalHabitsToday,
  completedHabitsToday,
  weeklyCompletionRate, // Accept new prop
}: KkobagiCharacterProps) {
  // The emoji variable and its logic, and the useEffect for animation are removed for the placeholder character.
  const userName = "민지님"; // Placeholder for user name
  let welcomeMessage = `좋은 아침이에요, ${userName}!`;
  let encouragementMessage = '';

  // Generate encouragement message based on completionPercentage
  if (completionPercentage === 100 && totalHabitsToday > 0) {
    encouragementMessage = '오늘 할 일을 몽땅 해냈어요! 정말 대단해요!';
  } else if (completionPercentage >= 70) {
    encouragementMessage = '거의 다 왔어요! 조금만 더 힘내요!';
  } else if (completionPercentage >= 30) {
    encouragementMessage = '벌써 절반이나 해냈어요! 힘내요! 🔥';
  } else {
    encouragementMessage = '오늘도 새로운 시작! 꼬바기가 응원할게요.';
  }

  // Animation controls removed as the character is now a static placeholder.


  return (
    <div className="bg-yellow-100 p-4 rounded-lg mb-4">
      <div className="flex justify-between items-center mb-2">
        {/* Completion Rate Chip */}
        <span className="bg-yellow-200 text-yellow-800 text-sm font-semibold px-2.5 py-0.5 rounded-full">
          오늘 달성률 {completionPercentage}%
        </span>
        {/* Placeholder for 3D Kkobagi Character Image */}
        {/* The actual 3D character will be integrated here later. */}
        <div className="w-20 h-20 bg-yellow-300 rounded-full flex items-center justify-center text-xl font-bold">
          Kko
        </div>
      </div>

      <p className="text-xl font-bold">{welcomeMessage}</p>
      <p className="text-base text-gray-700 mt-1">{encouragementMessage}</p>

      {totalHabitsToday > 0 && (
        <p className="text-sm text-gray-600">
          ({completedHabitsToday} / {totalHabitsToday} 완료)
        </p>
      )}
      {/* Weekly retrospection message removed from here as per design spec for KkobagiCharacter */}
    </div>
  )
}
