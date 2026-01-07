"use client";
import { useState } from "react";

export default function NoteForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  return (
    <form className="space-y-4">
      <input
        className="w-full border border-neutral-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-accent"
        placeholder="제목 입력"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="w-full border border-neutral-300 rounded-lg p-3 h-40 resize-none focus:outline-none focus:ring-2 focus:ring-accent"
        placeholder="내용 입력"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button
        type="button"
        onClick={() => console.log({ title, content })}
        className="bg-black text-white px-6 py-3 rounded-lg hover:bg-neutral-800 transition-colors duration-200"
      >
        저장
      </button>
    </form>
  );
}
