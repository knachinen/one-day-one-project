import Link from 'next/link'
import HabitList from '@/components/HabitList'

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Kkobagi</h1>
        {/* User profile icon can go here */}
      </header>
      <main>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <div className="bg-yellow-100 p-4 rounded-lg mb-4">
              <p className="text-lg">오늘 달성률 0%</p>
              <h2 className="text-3xl font-bold">좋은 아침이에요!</h2>
              <p>오늘도 새로운 시작! 꼬바기가 응원할게요.</p>
            </div>
            <HabitList />
          </div>
          <div>
            {/* "My Habit Tree" and "Weekly Achievement" can go here */}
          </div>
        </div>
      </main>
      <Link href="/new-habit" className="fixed bottom-16 right-4 bg-yellow-400 text-white p-4 rounded-full shadow-lg">
        + 습관 추가
      </Link>
    </div>
  )
}
