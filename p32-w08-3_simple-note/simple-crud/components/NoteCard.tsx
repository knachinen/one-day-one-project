export function NoteCard({ title, content }: { title: string; content: string }) {
  return (
    <div className="border border-neutral-200 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
      <h2 className="font-semibold text-base mb-2">{title}</h2>
      <p className="text-sm text-neutral-600 line-clamp-2">{content}</p>
    </div>
  );
}
