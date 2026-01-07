import { mockNotes } from "@/data/mockNotes";
import { NoteCard } from "@/components/NoteCard";

export default function NotesPage() {
  return (
    <main>
      <div className="space-y-4">
        {mockNotes.map((n) => (
          <NoteCard key={n.id} title={n.title} content={n.content} />
        ))}
      </div>
    </main>
  );
}
