"use client";
// components/hero/FloatingNotes.tsx
import ChecklistCard from './cards/ChecklistCard';
import TagNoteCard from './cards/TagNoteCard';
import TextNoteCard from './cards/TextNoteCard';
import CalendarNoteCard from './cards/CalendarNoteCard';
import VoiceNoteCard from './cards/VoiceNoteCard';

export default function FloatingNotes() {
  return (
    <div className="hidden md:block absolute inset-0">
      <ChecklistCard className="absolute top-[10%] left-[20%] w-[200px]" rotate={-1} /> {/* Rotate -1 degree */}
      <TagNoteCard className="absolute top-[15%] left-[65%] w-[190px]" rotate={1} /> {/* Rotate 1 degree */}
      <TextNoteCard className="absolute top-[75%] left-[18%] w-[220px]" rotate={0.5} /> {/* Rotate 0.5 degree */}
      <CalendarNoteCard className="absolute top-[70%] left-[45%] w-[180px]" rotate={-0.5} /> {/* Rotate -0.5 degree */}
      <VoiceNoteCard className="absolute top-[45%] left-[70%] w-[210px]" rotate={1} /> {/* Rotate 1 degree */}
    </div>
  );
}
