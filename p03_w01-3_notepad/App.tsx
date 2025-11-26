import React, { useState, useEffect } from 'react';
import { StatusBar, StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { NoteList } from './src/components/NoteList';
import { NoteEditor } from './src/components/NoteEditor';
import { Note, loadNotes, saveNotes, loadTheme, saveTheme } from './src/utils/storage';
import { THEMES, ThemeMode } from './src/styles/theme';

function MainContent() {
    const [notes, setNotes] = useState<Note[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentNote, setCurrentNote] = useState<Note | undefined>(undefined);
    const [themeMode, setThemeMode] = useState<ThemeMode>('dark');
    const insets = useSafeAreaInsets();

    const theme = THEMES[themeMode];

    useEffect(() => {
        loadNotes().then(setNotes);
        loadTheme().then(setThemeMode);
    }, []);

    const toggleTheme = async () => {
        const newMode = themeMode === 'dark' ? 'light' : 'dark';
        setThemeMode(newMode);
        await saveTheme(newMode);
    };

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
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
            <StatusBar barStyle={theme.statusBar} backgroundColor={theme.background} />
            <View style={styles.header}>
                {!isEditing && (
                    <TouchableOpacity onPress={toggleTheme} style={styles.themeButton}>
                        <Text style={{ fontSize: 24 }}>{themeMode === 'dark' ? '☀️' : '🌙'}</Text>
                    </TouchableOpacity>
                )}
            </View>
            <View style={styles.content}>
                {isEditing ? (
                    <NoteEditor
                        note={currentNote}
                        onSave={handleSaveNote}
                        onCancel={handleCancelEdit}
                        theme={theme}
                    />
                ) : (
                    <NoteList
                        notes={notes}
                        onSelectNote={handleSelectNote}
                        onDeleteNote={handleDeleteNote}
                        onCreateNote={handleCreateNote}
                        theme={theme}
                    />
                )}
            </View>
        </SafeAreaView>
    );
}

export default function App() {
    return (
        <SafeAreaProvider>
            <MainContent />
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    themeButton: {
        padding: 8,
    },
    content: {
        flex: 1,
    },
});
