import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';

interface Props {
    question: string;
    index: number;
}

export function QuestionCard({ question, index }: Props) {
    return (
        <View style={styles.container}>
            <Text style={styles.index}>Q{index + 1}</Text>
            <Text style={styles.question}>{question}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 12,
    },
    index: {
        ...Typography.caption,
        color: Colors.primary,
        fontWeight: '700',
        marginBottom: 4,
    },
    question: {
        ...Typography.heading,
        color: Colors.text.primary,
    },
});
