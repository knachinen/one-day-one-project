import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Note } from '../types/note';

interface StoreState {
    notes: Note[];
    addNote: (note: Note) => void;
    deleteNote: (id: string) => void;
    updateNote: (id: string, content: string) => void;
}

export const useStore = create<StoreState>()(
    persist(
        (set) => ({
            notes: [],
            addNote: (note) =>
                set((state) => ({
                    notes: [note, ...state.notes],
                })),
            deleteNote: (id) =>
                set((state) => ({
                    notes: state.notes.filter((n) => n.id !== id),
                })),
            updateNote: (id, content) =>
                set((state) => ({
                    notes: state.notes.map((n) =>
                        n.id === id ? { ...n, content } : n
                    ),
                })),
        }),
        {
            name: 'markify-storage',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
