// components/hero/cards/CalendarNoteCard.tsx
import NoteCard from '../NoteCard';

export default function CalendarNoteCard({ className }: { className?: string }) {
  return (
    <NoteCard className={`w-[180px] ${className}`}> {/* Example width */}
      <div className="text-center mb-2">
        <p className="text-xs text-gray-500">2025년 10월</p>
        <p className="text-3xl font-bold text-primary leading-none">24</p>
        <p className="text-sm text-gray-700">금요일</p>
      </div>
      <p className="text-sm font-medium text-gray-800 text-center">팀 주간 회의</p>
    </NoteCard>
  );
}
