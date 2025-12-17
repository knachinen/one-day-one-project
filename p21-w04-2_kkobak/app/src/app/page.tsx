import Link from 'next/link'
import HabitList from '@/components/HabitList'
import KkobagiCharacter from '@/components/KkobagiCharacter'

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
            <KkobagiCharacter />

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
