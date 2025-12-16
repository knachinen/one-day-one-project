"use client";
import dynamic from 'next/dynamic';

const DynamicFloatingNotes = dynamic(() => import('./FloatingNotes'), { ssr: false });

export default function FloatingNotesClientWrapper() {
  return <DynamicFloatingNotes />;
}
