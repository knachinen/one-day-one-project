import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Note } from '../utils/storage';
import { COLORS, COMMON_STYLES } from '../styles/theme';

interface NoteListProps {
    notes: Note[];
    onSelectNote: (note: Note) => void;
    onDeleteNote: (id: string) => void;
    onCreateNote: () => void;
}

export const NoteList: React.FC<NoteListProps> = ({ notes, onSelectNote, onDeleteNote, onCreateNote }) => {
    const renderItem = ({ item }: { item: Note }) => (
        <TouchableOpacity
            style={[COMMON_STYLES.glassContainer, styles.itemContainer]}
            onPress={() => onSelectNote(item)}
        >
            <View style={styles.textContainer}>
                <Text style={styles.itemTitle} numberOfLines={1}>{item.title || 'Untitled'}</Text>
                <Text style={styles.itemContent} numberOfLines={2}>{item.content || 'No content'}</Text>
                <Text style={styles.itemDate}>{new Date(item.updatedAt).toLocaleDateString()}</Text>
            </View>
            <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => onDeleteNote(item.id)}
            >
                <Text style={styles.deleteButtonText}>×</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={COMMON_STYLES.title}>My Notes</Text>
            <FlatList
                data={notes}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>No notes yet. Create one!</Text>
                }
            />
            <TouchableOpacity style={styles.fab} onPress={onCreateNote}>
                <Text style={styles.fabText}>+</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    listContent: {
        paddingBottom: 80,
    },
    itemContainer: {
        marginBottom: 16,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    textContainer: {
        flex: 1,
        marginRight: 10,
    },
    itemTitle: {
        color: COLORS.text,
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 4,
    },
    itemContent: {
        color: COLORS.textSecondary,
        fontSize: 14,
        marginBottom: 8,
    },
    itemDate: {
        color: COLORS.textSecondary,
        fontSize: 12,
    },
    deleteButton: {
        padding: 8,
    },
    deleteButtonText: {
        color: COLORS.danger,
        fontSize: 24,
        fontWeight: 'bold',
    },
    fab: {
        position: 'absolute',
        bottom: 24,
        right: 24,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
    },
    fabText: {
        color: '#FFF',
        fontSize: 32,
        marginTop: -4,
    },
    emptyText: {
        color: COLORS.textSecondary,
        textAlign: 'center',
        marginTop: 40,
        fontSize: 16,
    },
});
