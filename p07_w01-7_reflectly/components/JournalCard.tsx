import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { format } from 'date-fns';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { Journal } from '@/types';

interface Props {
    journal: Journal;
    onPress: () => void;
}

const EMOTION_EMOJIS: Record<string, string> = {
    happy: '😊',
    excited: '🤩',
    calm: '😌',
    anxious: '😰',
    sad: '😢',
};

export function JournalCard({ journal, onPress }: Props) {
    const emoji = EMOTION_EMOJIS[journal.emotionTag] || '😐';
    const previewText = journal.answers[0] || '작성된 내용이 없습니다.';

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <View style={styles.header}>
                <Text style={styles.date}>
                    {format(new Date(journal.date), 'M월 d일 EEEE')}
                </Text>
                <Text style={styles.emoji}>{emoji}</Text>
            </View>
            <Text style={styles.preview} numberOfLines={2}>
                {previewText}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.cardBackground,
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 8,
        elevation: 2,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    date: {
        ...Typography.heading,
        fontSize: 18,
        color: Colors.text.primary,
    },
    emoji: {
        fontSize: 24,
    },
    preview: {
        ...Typography.body,
        color: Colors.text.secondary,
        lineHeight: 22,
    },
});
