import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface TagChipProps {
    label: string;
    onPress?: () => void;
    selected?: boolean;
}

export default function TagChip({ label, onPress, selected = false }: TagChipProps) {
    return (
        <TouchableOpacity
            style={[styles.container, selected && styles.selectedContainer]}
            onPress={onPress}
            disabled={!onPress}
        >
            <Text style={[styles.text, selected && styles.selectedText]}>#{label}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#E0E0E0',
        borderRadius: 16,
        paddingHorizontal: 12,
        paddingVertical: 6,
        marginRight: 8,
        marginBottom: 8,
    },
    selectedContainer: {
        backgroundColor: '#1A73E8',
    },
    text: {
        fontSize: 12,
        color: '#333',
        fontWeight: '500',
    },
    selectedText: {
        color: '#FFF',
    },
});
