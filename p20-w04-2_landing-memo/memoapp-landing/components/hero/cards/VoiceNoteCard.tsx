// components/hero/cards/VoiceNoteCard.tsx
import NoteCard from '../NoteCard';

export default function VoiceNoteCard({ className }: { className?: string }) {
  return (
    <NoteCard className={`w-[210px] ${className}`}> {/* Example width */}
      <div className="flex items-center mb-2">
        {/* Play icon - simple placeholder SVG */}
        <svg className="w-5 h-5 text-primary mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path></svg>
        <span className="text-sm font-medium text-gray-800">음성 메모</span>
      </div>
      {/* Waveform placeholder SVG */}
      <svg className="w-full h-8" fill="none" stroke="currentColor" viewBox="0 0 100 20" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M1 10 Q 10 5 20 10 T 40 10 T 60 10 T 80 10 T 99 10" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M1 10 Q 10 15 20 10 T 40 10 T 60 10 T 80 10 T 99 10" />
      </svg>
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>0:45</span>
        <span>2:30</span>
      </div>
    </NoteCard>
  );
}
