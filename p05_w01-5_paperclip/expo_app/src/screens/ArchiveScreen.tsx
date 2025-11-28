import React, { useState, useCallback } from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity, RefreshControl, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { StorageService } from '../services/storage';
import { Memo } from '../types';
import { theme } from '../theme';
import MemoItem from '../components/MemoItem';

export default function ArchiveScreen({ navigation }) {
    const [archivedMemos, setArchivedMemos] = useState<Memo[]>([]);
    const [refreshing, setRefreshing] = useState(false);

    useFocusEffect(
        useCallback(() => {
            loadData();
        }, [])
    );

    const loadData = async () => {
        try {
            const data = await StorageService.getArchivedMemos();
            setArchivedMemos(data);
        } catch (error) {
            console.error('Failed to load archived memos', error);
        }
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await loadData();
        setRefreshing(false);
    };

    const handleRestore = async (id: string) => {
        Alert.alert(
            'Restore Memo',
            'Do you want to restore this memo to the active list?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Restore',
                    onPress: async () => {
                        await StorageService.restoreMemo(id);
                        loadData();
                    }
                }
            ]
        );
    };

    const handleDelete = async (id: string) => {
        Alert.alert(
            'Delete Memo',
            'Are you sure you want to permanently delete this memo?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        await StorageService.deleteMemo(id);
                        loadData();
                    }
                }
            ]
        );
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.header}>
                <Text style={styles.title}>Archive</Text>
            </View>

            <FlatList
                data={archivedMemos}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onLongPress={() => handleDelete(item.id)}
                        delayLongPress={500}
                    >
                        <MemoItem
                            memo={item}
                            onPress={() => handleRestore(item.id)}
                        />
                    </TouchableOpacity>
                )}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Ionicons name="archive-outline" size={48} color={theme.colors.textSecondary} />
                        <Text style={styles.emptyText}>No archived memos</Text>
                    </View>
                }
                contentContainerStyle={styles.listContent}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.colors.background },
    header: { padding: theme.spacing.md, borderBottomWidth: 1, borderBottomColor: theme.colors.border },
    title: { fontSize: theme.typography.fontSizeLarge, fontWeight: '700', color: theme.colors.textPrimary },
    listContent: { paddingBottom: 20 },
    emptyContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 100 },
    emptyText: { marginTop: theme.spacing.md, color: theme.colors.textSecondary, fontSize: theme.typography.fontSizeMedium },
});
