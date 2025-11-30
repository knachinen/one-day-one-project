import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { format } from 'date-fns';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { JournalService } from '@/database/journalService';
import { Journal } from '@/types';
import { QuestionCard } from '@/components/QuestionCard';

const EMOTION_EMOJIS: Record<string, string> = {
    happy: '😊',
    excited: '🤩',
    calm: '😌',
    anxious: '😰',
    sad: '😢',
};

const EMOTION_LABELS: Record<string, string> = {
    happy: '행복',
    excited: '설렘',
    calm: '평온',
    anxious: '불안',
    sad: '우울',
};

export default function JournalDetailScreen() {
    const { date } = useLocalSearchParams<{ date: string }>();
    const [journal, setJournal] = useState<Journal | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadJournal() {
            if (!date) return;
            try {
                setLoading(true);
                const data = await JournalService.getJournalByDate(date);
                setJournal(data);
            } catch (error) {
                console.error('Failed to load journal:', error);
            } finally {
                setLoading(false);
            }
        }
        loadJournal();
    }, [date]);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        );
    }

    if (!journal) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>기록을 찾을 수 없습니다.</Text>
            </View>
        );
    }

    const emoji = EMOTION_EMOJIS[journal.emotionTag] || '😐';
    const label = EMOTION_LABELS[journal.emotionTag] || journal.emotionTag;

    return (
        <>
            <Stack.Screen
                options={{
                    title: format(new Date(journal.date), 'M월 d일'),
                    headerBackTitle: '뒤로',
                    headerTintColor: Colors.primary,
                }}
            />
            <ScrollView style={styles.container} contentContainerStyle={styles.content}>
                <View style={styles.emotionContainer}>
                    <Text style={styles.emoji}>{emoji}</Text>
                    <Text style={styles.emotionLabel}>{label}</Text>
                </View>

                <View style={styles.questionsContainer}>
                    {journal.questions.map((q, index) => (
                        <View key={index} style={styles.qaPair}>
                            <QuestionCard question={q} index={index} />
                            <View style={styles.answerContainer}>
                                <Text style={styles.answer}>{journal.answers[index]}</Text>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </>
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
        paddingBottom: 40,
    },
    errorText: {
        ...Typography.body,
        textAlign: 'center',
        marginTop: 40,
        color: Colors.text.secondary,
    },
    emotionContainer: {
        alignItems: 'center',
        marginBottom: 30,
        paddingVertical: 20,
        backgroundColor: Colors.cardBackground,
        borderRadius: 16,
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 2,
    },
    emoji: {
        fontSize: 48,
        marginBottom: 8,
    },
    emotionLabel: {
        ...Typography.heading,
        color: Colors.text.primary,
    },
    questionsContainer: {
        gap: 24,
    },
    qaPair: {
        marginBottom: 8,
    },
    answerContainer: {
        backgroundColor: Colors.cardBackground,
        padding: 16,
        borderRadius: 12,
        marginTop: 8,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    answer: {
        ...Typography.body,
        color: Colors.text.primary,
        lineHeight: 24,
    },
});
