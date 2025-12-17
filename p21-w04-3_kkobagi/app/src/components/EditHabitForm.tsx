'use client'

import React, { useState, useEffect } from 'react'
import { useHabitStore } from '@/stores/habitStore'
import { useRouter } from 'next/navigation'
import { Habit } from '@/types'

interface EditHabitFormProps {
  habitId: string
}

// Dummy icons for now (should be consistent with NewHabitForm)
const icons = [
  '💧', '📖', '🏃‍♂️', '🧘‍♀️', '🍎', '🥕', '🥦', '🌶️',
  '🎉', '✨', '💖', '👍', '💪', '🚀', '🔥', '🌟',
];


export default function EditHabitForm({ habitId }: EditHabitFormProps) {
  const router = useRouter()
  const { habits, updateHabit } = useHabitStore()
  const habitToEdit = habits.find(h => h.id === habitId);

  const [name, setName] = useState('')
  const [icon, setIcon] = useState('')
  const [repeatDays, setRepeatDays] = useState<number[]>([])

  useEffect(() => {
    if (habitToEdit) {
      setName(habitToEdit.name);
      setIcon(habitToEdit.icon);
      setRepeatDays(habitToEdit.repeat_days);
    }
  }, [habitToEdit]);


  const handleDayClick = (day: number) => {
    setRepeatDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) {
      alert('습관 이름을 입력해주세요.')
      return
    }
    if (!habitToEdit) {
        alert('수정할 습관을 찾을 수 없습니다.');
        return;
    }

    const updatedHabit: Habit = {
      ...habitToEdit,
      name,
      icon,
      repeat_days: repeatDays,
    }
    updateHabit(updatedHabit)
    router.push('/')
  }

  if (!habitToEdit) {
      return <p>수정할 습관을 불러오는 중...</p>
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="name" className="block text-lg font-bold mb-2">
          뭘 기를까요?
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={30}
          className="w-full p-2 border rounded"
          placeholder="예: 매일 물 2L 마시기"
        />
        <div className="text-right text-sm text-gray-500">{name.length}/30</div>
      </div>

      <div className="mb-4">
        <div className="text-lg font-bold mb-2">🏆 아이콘 선택</div>
        <div className="grid grid-cols-4 gap-2">
          {icons.map((i) => (
            <button
              type="button"
              key={i}
              onClick={() => setIcon(i)}
              className={`text-2xl p-4 rounded-full ${
                icon === i ? 'bg-yellow-300' : 'bg-gray-200'
              }`}
            >
              {i}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <div className="text-lg font-bold mb-2">반복 요일</div>
        <div className="flex justify-between">
          {['일', '월', '화', '수', '목', '금', '토'].map((day, index) => (
            <button
              type="button"
              key={day}
              onClick={() => handleDayClick(index)}
              className={`p-2 rounded-full w-10 h-10 ${
                repeatDays.includes(index) ? 'bg-yellow-300' : 'bg-gray-200'
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-yellow-400 text-white p-4 rounded-lg font-bold"
      >
        ✅ 습관 수정 완료
      </button>
    </form>
  )
}
