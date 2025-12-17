'use client'

import React from 'react'

export default function KkobagiCharacter() {
  // For now, a static image and message.
  // Dynamic expression and message based on daily completion will be implemented later.
  return (
    <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-blue-100 text-blue-800">
      <div className="text-6xl mb-2">😀</div> {/* Placeholder for Kkobagi character image/animation */}
      <p className="text-lg font-semibold">오늘도 새로운 시작! 꼬바기가 응원할게요.</p>
    </div>
  )
}
