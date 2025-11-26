import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Note } from '../utils/storage';
import { COLORS, createCommonStyles, ThemeColors } from '../styles/theme';

interface NoteListProps {
    notes: Note[];
    onSelectNote: (note: Note) => void;
    onDeleteNote: (id: string) => void;
    onCreateNote: () => void;
    theme: ThemeColors;
}

export const NoteList: React.FC<NoteListProps> = ({ notes, onSelectNote, onDeleteNote, onCreateNote, theme }) => {
    const insets = useSafeAreaInsets();

    const renderItem = ({ item }: { item: Note }) => (
        <TouchableOpacity
            style={[
                createCommonStyles(theme).glassContainer,
                styles.itemContainer,
                { backgroundColor: theme.glass, borderColor: theme.glassBorder }
            ]}
            onPress={() => onSelectNote(item)}
        >
            <View style={styles.textContainer}>
                <Text style={[styles.itemTitle, { color: theme.text }]} numberOfLines={1}>{item.title || 'Untitled'}</Text>
                <Text style={[styles.itemContent, { color: theme.textSecondary }]} numberOfLines={2}>{item.content || 'No content'}</Text>
                <Text style={[styles.itemDate, { color: theme.textSecondary }]}>{new Date(item.updatedAt).toLocaleDateString()}</Text>
            </View>
            <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => {
                    Alert.alert(
                        "Delete Note",
                        "Are you sure you want to delete this note?",
                        [
                            { text: "Cancel", style: "cancel" },
                            {
                                text: "Delete",
                                style: "destructive",
                                onPress: () => onDeleteNote(item.id)
                            }
                        ]
                    );
                }}
            >
                <Text style={[styles.deleteButtonText, { color: theme.danger }]}>×</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={[createCommonStyles(theme).title, { color: theme.text }]}>My Notes</Text>
            <FlatList
                data={notes}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={[styles.listContent, { paddingBottom: 80 + insets.bottom }]}
                ListEmptyComponent={
                    <Text style={[styles.emptyText, { color: theme.textSecondary }]}>No notes yet. Create one!</Text>
                }
            />
            <TouchableOpacity
                style={[styles.fab, { bottom: 24 + insets.bottom, backgroundColor: theme.primary }]}
                onPress={onCreateNote}
            >
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
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 4,
    },
    itemContent: {
        fontSize: 14,
        marginBottom: 8,
    },
    itemDate: {
        fontSize: 12,
    },
    deleteButton: {
        padding: 8,
    },
    deleteButtonText: {
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
        textAlign: 'center',
        marginTop: 40,
        fontSize: 16,
    },
});
