"use client";

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Prisma } from '@prisma/client';

type Note = Prisma.NoteGetPayload<{
  include: {
    author: { select: { id: true, name: true, email: true } };
  };
}>;

export default function NotesPage() {
  const router = useRouter();
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [groupId, setGroupId] = useState<string>('test-group-id'); // TODO: Replace with dynamic group ID

  const [isEditingNote, setIsEditingNote] = useState<string | null>(null); // ID of the note being edited
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [editedNoteTitle, setEditedNoteTitle] = useState('');
  const [editedNoteContent, setEditedNoteContent] = useState('');

  const fetchNotes = useCallback(async () => {
    if (!groupId) {
      setError('Please select a group first.');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`/api/groups/${groupId}/notes`);
      if (!res.ok) {
        if (res.status === 401) {
          router.push('/login');
        }
        throw new Error('Failed to fetch notes');
      }
      const data: Note[] = await res.json();
      setNotes(data);
    } catch (err: any) {
      setError(err.message || 'Error loading notes.');
    } finally {
      setLoading(false);
    }
  }, [groupId, router]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const handleCreateNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteTitle.trim() || !newNoteContent.trim() || !groupId) return;

    try {
      const res = await fetch(`/api/groups/${groupId}/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: newNoteTitle, content: newNoteContent }),
      });

      if (!res.ok) {
        throw new Error('Failed to create note');
      }
      setNewNoteTitle('');
      setNewNoteContent('');
      fetchNotes(); // Refresh notes
    } catch (err: any) {
      setError(err.message || 'Error creating note.');
    }
  };

  const handleEditNote = (note: Note) => {
    setIsEditingNote(note.id);
    setEditedNoteTitle(note.title);
    setEditedNoteContent(note.content);
  };

  const handleSaveEdit = async (noteId: string) => {
    if (!editedNoteTitle.trim() || !editedNoteContent.trim() || !groupId) return;

    try {
      const res = await fetch(`/api/groups/${groupId}/notes/${noteId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: editedNoteTitle, content: editedNoteContent }),
      });

      if (!res.ok) {
        throw new Error('Failed to update note');
      }
      setIsEditingNote(null);
      fetchNotes(); // Refresh notes
    } catch (err: any) {
      setError(err.message || 'Error updating note.');
    }
  };

  const handleDeleteNote = async (noteId: string) => {
    if (!confirm('Are you sure you want to delete this note?')) return;

    try {
      const res = await fetch(`/api/groups/${groupId}/notes/${noteId}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Failed to delete note');
      }
      fetchNotes(); // Refresh notes
    } catch (err: any) {
      setError(err.message || 'Error deleting note.');
    }
  };


  if (loading) return <div className="text-center mt-8">Loading notes...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">Error: {error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-6">Group Notes</h2>

      {/* New Note Form */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-semibold mb-4">Create New Note</h3>
        <form onSubmit={handleCreateNote}>
          <div className="mb-4">
            <label htmlFor="newNoteTitle" className="block text-gray-700 text-sm font-bold mb-2">Title</label>
            <input
              type="text"
              id="newNoteTitle"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={newNoteTitle}
              onChange={(e) => setNewNoteTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="newNoteContent" className="block text-gray-700 text-sm font-bold mb-2">Content</label>
            <textarea
              id="newNoteContent"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={newNoteContent}
              onChange={(e) => setNewNoteContent(e.target.value)}
              rows={4}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Note
          </button>
        </form>
      </div>

      {/* List of Notes */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">All Notes</h3>
        {notes.length === 0 ? (
          <p>No notes found for this group.</p>
        ) : (
          <div className="space-y-4">
            {notes.map(note => (
              <div key={note.id} className="border p-4 rounded-lg shadow-sm">
                {isEditingNote === note.id ? (
                  <div>
                    <input
                      type="text"
                      value={editedNoteTitle}
                      onChange={(e) => setEditedNoteTitle(e.target.value)}
                      className="text-lg font-semibold w-full border rounded p-1 mb-2"
                    />
                    <textarea
                      value={editedNoteContent}
                      onChange={(e) => setEditedNoteContent(e.target.value)}
                      className="w-full border rounded p-2 mb-2"
                      rows={4}
                    />
                    <div className="flex gap-2">
                      <button onClick={() => handleSaveEdit(note.id)} className="bg-green-500 text-white px-3 py-1 rounded">Save</button>
                      <button onClick={() => setIsEditingNote(null)} className="bg-gray-300 text-gray-800 px-3 py-1 rounded">Cancel</button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h4 className="text-lg font-semibold">{note.title}</h4>
                    <p className="text-gray-700 mb-2">{note.content}</p>
                    <p className="text-xs text-gray-500">
                      by {note.author.name || note.author.email} on {new Date(note.createdAt).toLocaleString()}
                    </p>
                    <div className="mt-2 flex gap-2">
                      <button onClick={() => handleEditNote(note)} className="bg-blue-500 text-white px-3 py-1 rounded text-sm">Edit</button>
                      <button onClick={() => handleDeleteNote(note.id)} className="bg-red-500 text-white px-3 py-1 rounded text-sm">Delete</button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
