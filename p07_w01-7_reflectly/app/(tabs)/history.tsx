import React, { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { JournalService } from '@/database/journalService';
import { Journal } from '@/types';
import { JournalCard } from '@/components/JournalCard';

export default function HistoryScreen() {
    const router = useRouter();
    const [journals, setJournals] = useState<Journal[]>([]);
    const [loading, setLoading] = useState(true);

    const loadJournals = useCallback(async () => {
        try {
            setLoading(true);
            const data = await JournalService.getJournals(50, 0);
            setJournals(data);
        } catch (error) {
            console.error('Failed to load journals:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            loadJournals();
        }, [loadJournals])
    );

    const handlePress = (journal: Journal) => {
        router.push(`/journal/${journal.date}`);
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>기록 보관함</Text>
            </View>

            <FlatList
                data={journals}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <JournalCard journal={item} onPress={() => handlePress(item)} />
                )}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>아직 작성된 기록이 없습니다.</Text>
                    </View>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.background,
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 20,
        backgroundColor: Colors.background,
    },
    title: {
        ...Typography.title,
        color: Colors.text.primary,
    },
    listContent: {
        padding: 20,
        paddingTop: 0,
    },
    emptyContainer: {
        padding: 40,
        alignItems: 'center',
    },
    emptyText: {
        ...Typography.body,
        color: Colors.text.secondary,
    },
});
