'use client'

import { Habit } from '@/types'
import { useHabitStore } from '@/stores/habitStore'
import { v4 as uuidv4 } from 'uuid'
import { useEffect, useMemo } from 'react' // Use useMemo for derived state
import { motion, useAnimation } from 'framer-motion'
import Link from 'next/link'
import useSound from '@/hooks/useSound'
import useStreak from '@/hooks/useStreak'

// Helper function to get habit icons
const getHabitIcon = (iconName: string) => {
  switch (iconName) {
    case 'water-drop':
    case '💧': // Fallback for existing emoji
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-400">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M12 3c-1.105 0-2-.895-2-2s.895-2 2-2-.895 2-2 2zM12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zM12 18v3" />
        </svg>
      );
    case 'book':
    case '📚': // Fallback for existing emoji
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-purple-400">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.75V4.5m0 17.25a2.25 2.25 0 002.25-2.25V15m3 0l2.25-2.25m-2.25 2.25l-2.25-2.25m-3-12h2.25m-2.25 0a2.25 2.25 0 012.25-2.25H15M9 6h7.5m-7.5 0c1.105 0 2-.895 2-2s-.895-2-2-2zM12 18c-1.105 0-2-.895-2-2s.895-2 2-2z" />
        </svg>
      );
    case 'movement':
    case '🏃': // Fallback for existing emoji
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-400">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.737L13.122 17.5l4.896-1.551a1.125 1.125 0 011.411 1.096l-.768 3.841a1.125 1.125 0 01-1.002.937h-3.374zm-8.25-13.68L6.87 9.75l-4.896 1.551a1.125 1.125 0 01-1.411-1.096l.768-3.841a1.125 1.125 0 011.002-.937h3.374zm11.25 13.68l.001-.001V7.5M10.5 7.5l-.001-.001M13.5 12.75L12 11.25l-1.5 1.5m4.5-5.25v-1.5m-7.5 7.5V18" />
        </svg>
      );
    default:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-500">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9.75 9.75m0 0a1.125 1.125 0 110-2.25 1.125 1.125 0 010 2.25zm0 0H9m11.25 0c1.314 0 2.502.871 2.91 2.175A9.753 9.753 0 0021.75 12c0 5.385-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12c0-1.284.18-2.518.524-3.682a4.504 4.504 0 012.327-1.472l.334-.148.277-.119c.153-.066.311-.129.473-.19.083-.031.167-.06.25-.088.139-.047.282-.092.427-.133.74-.217 1.536-.328 2.332-.328z" />
        </svg>
      );
  }
};

export default function HabitCard({ habit }: { habit: Habit }) {
  const { records, addRecord, updateRecord, streaks, softDeleteHabit } = useHabitStore()
  const { play } = useSound('/sounds/ding.mp3')
  const currentStreak = useStreak(habit.id)
  const fireAnimationControls = useAnimation()

  // Derive checked status and record ID directly from the store's records
  const todayISO = new Date().toISOString().split('T')[0]
  const currentRecord = useMemo(() => {
    const foundRecord = records.find((r) => r.habit_id === habit.id && r.check_date === todayISO);
    console.log(`  HabitCard: ${habit.name} - useMemo currentRecord:`, foundRecord);
    return foundRecord;
  }, [records, habit.id, todayISO]);

  const isChecked = useMemo(() => {
    const checkedStatus = !!currentRecord?.is_completed;
    console.log(`  HabitCard: ${habit.name} - useMemo isChecked:`, checkedStatus);
    return checkedStatus;
  }, [currentRecord]);

  const recordId = currentRecord?.id || null;
  console.log(`  HabitCard: ${habit.name} - Derived recordId:`, recordId);


  // Get longest streak for this habit
  const habitStreakInfo = streaks.find((s) => s.habit_id === habit.id)
  const longestStreak = habitStreakInfo ? habitStreakInfo.longest_streak : 0

  useEffect(() => {
    // Trigger fire animation when streak increases
    if (currentStreak > 0) {
      fireAnimationControls.start({
        scale: [1, 1.2, 1],
        rotate: [0, 10, -10, 0],
        transition: { duration: 0.5, ease: 'easeOut' },
      })
    }
  }, [currentStreak, fireAnimationControls])


  const handleCheck = () => {
    console.log(`--- handleCheck for ${habit.name} (${habit.id}) ---`);
    console.log(`  Pre-action isChecked: ${isChecked}`);
    console.log(`  Pre-action recordId: ${recordId}`);

    if (isChecked && recordId) {
      console.log('  Action: Unchecking habit');
      updateRecord({
        id: recordId,
        habit_id: habit.id,
        check_date: todayISO,
        is_completed: false,
      })
    } else { // if (!isChecked)
      console.log('  Action: Checking habit');
      const newRecord = {
        id: uuidv4(),
        habit_id: habit.id,
        check_date: todayISO,
        is_completed: true,
        completed_at: new Date().toISOString(),
      }
      addRecord(newRecord)
      play()
    }
    console.log('  Post-action: Store update initiated. UI re-render expected.');
  }

  return (
    <div
      className={`p-4 rounded-lg shadow-md relative group ${
        isChecked ? 'bg-yellow-50' : 'bg-white hover:bg-gray-50'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="text-2xl">{getHabitIcon(habit.icon)}</div>
        <motion.button
          onClick={handleCheck}
          className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
            isChecked ? 'bg-yellow-400 border-yellow-400' : 'border-gray-400'
          }`}
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
          animate={{ scale: isChecked ? 1.2 : 1 }} // Simplified animation to two keyframes for spring
          transition={{ type: 'spring', stiffness: 500, damping: 20 }}
        >
          {isChecked && <span className="text-white">✔</span>}
        </motion.button>
      </div>
      <div className="mt-2">
        <div className="font-bold">{habit.name}</div>
        <div className="flex items-center text-sm text-gray-500">
          {currentStreak > 0 ? (
            <>
              <motion.span animate={fireAnimationControls} className="mr-1">
                🔥
              </motion.span>
              {currentStreak}일째 연속
            </>
          ) : (
            '스트릭 없음'
          )}
        </div>
        {longestStreak > 0 && (
          <div className="text-xs text-gray-400">최고 기록: {longestStreak}일</div>
        )}
      </div>
      <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Link href={`/habit/${habit.id}/edit`}>
          <button className="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
              <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
            </svg>
          </button>
        </Link>
        <button
          onClick={() => {
            if (window.confirm(`'${habit.name}' 습관을 삭제하시겠습니까?`)) {
              softDeleteHabit(habit.id)
            }
          }}
          className="text-red-500 hover:text-red-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
            <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
          </svg>
        </button>
      </div>
    </div>
  )
}

