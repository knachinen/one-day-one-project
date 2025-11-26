import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Note } from '../utils/storage';
import { ThemeColors } from '../styles/theme';

interface NoteEditorProps {
    note?: Note;
    onSave: (title: string, content: string) => void;
    onCancel: () => void;
    theme: ThemeColors;
}

export const NoteEditor: React.FC<NoteEditorProps> = ({ note, onSave, onCancel, theme }) => {
    const [title, setTitle] = useState(note?.title || '');
    const [content, setContent] = useState(note?.content || '');

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={[styles.container, { backgroundColor: theme.background }]}
        >
            <View style={styles.header}>
                <TouchableOpacity onPress={onCancel}>
                    <Text style={[styles.cancelButton, { color: theme.textSecondary }]}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.saveButton, { backgroundColor: theme.primary }]}
                    onPress={() => onSave(title, content)}
                >
                    <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
            </View>

            <TextInput
                style={[styles.titleInput, { color: theme.text }]}
                placeholder="Title"
                placeholderTextColor={theme.textSecondary}
                value={title}
                onChangeText={setTitle}
            />

            <TextInput
                style={[styles.contentInput, { color: theme.text }]}
                placeholder="Start typing..."
                placeholderTextColor={theme.textSecondary}
                value={content}
                onChangeText={setContent}
                multiline
                textAlignVertical="top"
            />
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        paddingTop: 10,
    },
    cancelButton: {
        fontSize: 16,
    },
    saveButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
    },
    saveButtonText: {
        color: '#FFF',
        fontWeight: '600',
        fontSize: 16,
    },
    titleInput: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        padding: 0,
    },
    contentInput: {
        flex: 1,
        fontSize: 16,
        lineHeight: 24,
        padding: 0,
    },
});
