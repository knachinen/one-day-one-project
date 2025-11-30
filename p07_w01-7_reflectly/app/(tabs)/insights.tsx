import React, { useCallback, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { JournalService } from '@/database/journalService';
import { Journal } from '@/types';
import { EmotionChart } from '@/components/EmotionChart';
import { getEmotionStats, getEmotionTrend } from '@/utils/emotionAnalytics';

const EMOTION_LABELS: Record<string, string> = {
    happy: '행복',
    excited: '설렘',
    calm: '평온',
    anxious: '불안',
    sad: '우울',
};

const EMOTION_EMOJIS: Record<string, string> = {
    happy: '😊',
    excited: '🤩',
    calm: '😌',
    anxious: '😰',
    sad: '😢',
};

export default function InsightsScreen() {
    const [journals, setJournals] = useState<Journal[]>([]);
    const [loading, setLoading] = useState(true);
    const [period, setPeriod] = useState<7 | 30>(7);

    const loadData = useCallback(async () => {
        try {
            setLoading(true);
            // Load enough data for 30 days
            const data = await JournalService.getJournals(30, 0);
            setJournals(data);
        } catch (error) {
            console.error('Failed to load insights data:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            loadData();
        }, [loadData])
    );

    const chartData = getEmotionTrend(journals, period);
    const stats = getEmotionStats(journals);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        );
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <View style={styles.header}>
                <Text style={styles.title}>회고 및 통계</Text>
            </View>

            <View style={styles.toggleContainer}>
                <TouchableOpacity
                    style={[styles.toggleButton, period === 7 && styles.toggleButtonActive]}
                    onPress={() => setPeriod(7)}
                >
                    <Text style={[styles.toggleText, period === 7 && styles.toggleTextActive]}>
                        최근 7일
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.toggleButton, period === 30 && styles.toggleButtonActive]}
                    onPress={() => setPeriod(30)}
                >
                    <Text style={[styles.toggleText, period === 30 && styles.toggleTextActive]}>
                        최근 30일
                    </Text>
                </TouchableOpacity>
            </View>

            <EmotionChart data={chartData} period={period} />

            <View style={styles.statsContainer}>
                <Text style={styles.statsTitle}>감정 통계</Text>
                <View style={styles.statsGrid}>
                    {Object.entries(EMOTION_LABELS).map(([key, label]) => (
                        <View key={key} style={styles.statItem}>
                            <Text style={styles.statEmoji}>{EMOTION_EMOJIS[key]}</Text>
                            <Text style={styles.statLabel}>{label}</Text>
                            <Text style={styles.statCount}>{stats[key] || 0}회</Text>
                        </View>
                    ))}
                </View>
            </View>
        </ScrollView>
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
    content: {
        padding: 20,
        paddingTop: 60,
    },
    header: {
        marginBottom: 20,
    },
    title: {
        ...Typography.title,
        color: Colors.text.primary,
    },
    toggleContainer: {
        flexDirection: 'row',
        backgroundColor: Colors.cardBackground,
        borderRadius: 12,
        padding: 4,
        marginBottom: 20,
    },
    toggleButton: {
        flex: 1,
        paddingVertical: 8,
        alignItems: 'center',
        borderRadius: 8,
    },
    toggleButtonActive: {
        backgroundColor: Colors.primary,
    },
    toggleText: {
        ...Typography.caption,
        fontSize: 14,
        color: Colors.text.secondary,
    },
    toggleTextActive: {
        color: 'white',
        fontWeight: '600',
    },
    statsContainer: {
        backgroundColor: Colors.cardBackground,
        borderRadius: 16,
        padding: 20,
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 2,
    },
    statsTitle: {
        ...Typography.heading,
        marginBottom: 16,
        color: Colors.text.primary,
    },
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    statItem: {
        width: '30%',
        alignItems: 'center',
        marginBottom: 16,
        padding: 10,
        backgroundColor: Colors.background,
        borderRadius: 12,
    },
    statEmoji: {
        fontSize: 24,
        marginBottom: 4,
    },
    statLabel: {
        ...Typography.caption,
        color: Colors.text.secondary,
        marginBottom: 2,
    },
    statCount: {
        ...Typography.heading,
        fontSize: 16,
        color: Colors.text.primary,
    },
});
