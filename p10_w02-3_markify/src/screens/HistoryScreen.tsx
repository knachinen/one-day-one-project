import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { theme } from '../constants/theme';
import { useStore } from '../store/useStore';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import { Note } from '../types/note';

export default function HistoryScreen() {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const notes = useStore((state) => state.notes);
    const deleteNote = useStore((state) => state.deleteNote);

    const handlePress = (note: Note) => {
        navigation.navigate('Editor', { title: note.title, content: note.content });
    };

    const handleDelete = (id: string) => {
        Alert.alert('Delete Note', 'Are you sure?', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Delete', style: 'destructive', onPress: () => deleteNote(id) },
        ]);
    };

    const renderItem = ({ item }: { item: Note }) => (
        <TouchableOpacity
            style={styles.item}
            onPress={() => handlePress(item)}
            onLongPress={() => handleDelete(item.id)}
        >
            <Text style={styles.itemTitle} numberOfLines={1}>
                {item.title}
            </Text>
            <Text style={styles.itemDate}>
                {new Date(item.createdAt).toLocaleDateString()}
            </Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>History</Text>
            <FlatList
                data={notes}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={<Text style={styles.emptyText}>No saved notes</Text>}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.background,
        padding: theme.spacing.m,
    },
    title: {
        fontSize: theme.textVariants.header.fontSize,
        fontWeight: 'bold',
        color: theme.colors.text,
        marginBottom: theme.spacing.m,
    },
    listContent: {
        paddingBottom: theme.spacing.xl,
    },
    item: {
        backgroundColor: theme.colors.card,
        padding: theme.spacing.m,
        borderRadius: 8,
        marginBottom: theme.spacing.s,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    itemTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: theme.colors.text,
        marginBottom: 4,
    },
    itemDate: {
        fontSize: 14,
        color: '#666',
    },
    emptyText: {
        textAlign: 'center',
        color: '#999',
        marginTop: theme.spacing.xl,
    },
});
