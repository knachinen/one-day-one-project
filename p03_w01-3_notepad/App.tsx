import React, { useState, useEffect } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import { NoteList } from './src/components/NoteList';
import { NoteEditor } from './src/components/NoteEditor';
import { Note, loadNotes, saveNotes } from './src/utils/storage';
import { COLORS } from './src/styles/theme';

export default function App() {
    const [notes, setNotes] = useState<Note[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentNote, setCurrentNote] = useState<Note | undefined>(undefined);

    useEffect(() => {
        loadNotes().then(setNotes);
    }, []);

    const handleSaveNote = async (title: string, content: string) => {
        const newNote: Note = {
            id: currentNote?.id || Date.now().toString(),
            title,
            content,
            createdAt: currentNote?.createdAt || Date.now(),
            updatedAt: Date.now(),
        };

        let updatedNotes;
        if (currentNote) {
            updatedNotes = notes.map((n) => (n.id === currentNote.id ? newNote : n));
        } else {
            updatedNotes = [newNote, ...notes];
        }

        setNotes(updatedNotes);
        await saveNotes(updatedNotes);
        setIsEditing(false);
        setCurrentNote(undefined);
    };

    const handleDeleteNote = async (id: string) => {
        const updatedNotes = notes.filter((n) => n.id !== id);
        setNotes(updatedNotes);
        await saveNotes(updatedNotes);
    };

    const handleSelectNote = (note: Note) => {
        setCurrentNote(note);
        setIsEditing(true);
    };

    const handleCreateNote = () => {
        setCurrentNote(undefined);
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setCurrentNote(undefined);
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
            <View style={styles.content}>
                {isEditing ? (
                    <NoteEditor
                        note={currentNote}
                        onSave={handleSaveNote}
                        onCancel={handleCancelEdit}
                    />
                ) : (
                    <NoteList
                        notes={notes}
                        onSelectNote={handleSelectNote}
                        onDeleteNote={handleDeleteNote}
                        onCreateNote={handleCreateNote}
                    />
                )}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    content: {
        flex: 1,
    },
});
