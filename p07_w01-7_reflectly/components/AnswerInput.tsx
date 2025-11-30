import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';

interface Props {
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    editable?: boolean;
}

export function AnswerInput({ value, onChangeText, placeholder, editable = true }: Props) {
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor={Colors.text.disabled}
                multiline
                editable={editable}
                textAlignVertical="top"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 24,
    },
    input: {
        ...Typography.body,
        color: Colors.text.primary,
        backgroundColor: Colors.cardBackground,
        borderRadius: 12,
        padding: 16,
        minHeight: 100,
        borderWidth: 1,
        borderColor: Colors.border,
    },
});
