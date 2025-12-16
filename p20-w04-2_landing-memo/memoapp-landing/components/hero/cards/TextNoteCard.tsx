// components/hero/cards/TextNoteCard.tsx
import NoteCard from '../NoteCard';

export default function TextNoteCard({ className }: { className?: string }) {
  return (
    <NoteCard className={`w-[220px] ${className}`}> {/* Example width */}
      <p className="text-sm text-gray-800 leading-tight">
        새로운 아이디어가 떠올랐을 때,<br />
        놓치지 않고 바로 기록하세요.<br />
        간결하게 핵심만!
      </p>
    </NoteCard>
  );
}
