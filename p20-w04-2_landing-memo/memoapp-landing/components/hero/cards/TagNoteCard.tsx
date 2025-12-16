// components/hero/cards/TagNoteCard.tsx
import NoteCard from '../NoteCard';

export default function TagNoteCard({ className }: { className?: string }) {
  return (
    <NoteCard className={`w-[190px] ${className}`}> {/* Example width */}
      <p className="text-sm text-gray-800 mb-2">영감 받은 글귀</p>
      <div className="flex flex-wrap gap-1">
        <span className="text-xs text-primary bg-primary/10 rounded-full px-2 py-0.5">#생산성</span>
        <span className="text-xs text-primary bg-primary/10 rounded-full px-2 py-0.5">#아이디어</span>
        <span className="text-xs text-primary bg-primary/10 rounded-full px-2 py-0.5">#기록</span>
      </div>
    </NoteCard>
  );
}
