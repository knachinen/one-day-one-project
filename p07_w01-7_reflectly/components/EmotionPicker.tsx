import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { EmotionTag } from '@/types';

interface Props {
    selected: EmotionTag | null;
    onSelect: (tag: EmotionTag) => void;
}

const EMOTIONS: { tag: EmotionTag; emoji: string; label: string; color: string }[] = [
    { tag: 'happy', emoji: '😊', label: '행복', color: Colors.emotions.happy },
    { tag: 'excited', emoji: '🤩', label: '설렘', color: Colors.emotions.excited },
    { tag: 'calm', emoji: '😌', label: '평온', color: Colors.emotions.calm },
    { tag: 'anxious', emoji: '😰', label: '불안', color: Colors.emotions.anxious },
    { tag: 'sad', emoji: '😢', label: '우울', color: Colors.emotions.sad },
];

export function EmotionPicker({ selected, onSelect }: Props) {
    return (
        <View style={styles.container}>
            {EMOTIONS.map((item) => {
                const isSelected = selected === item.tag;
                return (
                    <TouchableOpacity
                        key={item.tag}
                        style={[
                            styles.item,
                            isSelected && { backgroundColor: item.color, borderColor: item.color },
                        ]}
                        onPress={() => onSelect(item.tag)}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.emoji}>{item.emoji}</Text>
                        <Text style={[styles.label, isSelected && styles.selectedLabel]}>
                            {item.label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 16,
    },
    item: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
        height: 70,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: Colors.border,
        backgroundColor: Colors.cardBackground,
    },
    emoji: {
        fontSize: 24,
        marginBottom: 4,
    },
    label: {
        ...Typography.caption,
        fontSize: 12,
        color: Colors.text.secondary,
    },
    selectedLabel: {
        color: Colors.text.primary,
        fontWeight: '600',
    },
});
