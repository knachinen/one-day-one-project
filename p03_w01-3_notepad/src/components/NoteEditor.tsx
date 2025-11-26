import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Note } from '../utils/storage';
import { COLORS, COMMON_STYLES } from '../styles/theme';

interface NoteEditorProps {
    note?: Note;
    onSave: (title: string, content: string) => void;
    onCancel: () => void;
}

export const NoteEditor: React.FC<NoteEditorProps> = ({ note, onSave, onCancel }) => {
    const [title, setTitle] = useState(note?.title || '');
    const [content, setContent] = useState(note?.content || '');

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <View style={styles.header}>
                <TouchableOpacity onPress={onCancel}>
                    <Text style={styles.cancelButton}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.saveButton}
                    onPress={() => onSave(title, content)}
                >
                    <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
            </View>

            <TextInput
                style={styles.titleInput}
                placeholder="Title"
                placeholderTextColor={COLORS.textSecondary}
                value={title}
                onChangeText={setTitle}
            />

            <TextInput
                style={styles.contentInput}
                placeholder="Start typing..."
                placeholderTextColor={COLORS.textSecondary}
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
        backgroundColor: COLORS.background,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        paddingTop: 10,
    },
    cancelButton: {
        color: COLORS.textSecondary,
        fontSize: 16,
    },
    saveButton: {
        backgroundColor: COLORS.primary,
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
        color: COLORS.text,
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        padding: 0,
    },
    contentInput: {
        flex: 1,
        color: COLORS.text,
        fontSize: 16,
        lineHeight: 24,
        padding: 0,
    },
});
