import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SearchBarProps {
    value: string;
    onChangeText: (text: string) => void;
    onClear?: () => void;
    placeholder?: string;
}

export default function SearchBar({ value, onChangeText, onClear, placeholder = 'Search...' }: SearchBarProps) {
    return (
        <View style={styles.container}>
            <Ionicons name="search" size={20} color="#666" style={styles.icon} />
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor="#999"
            />
            {value.length > 0 && (
                <TouchableOpacity onPress={onClear} style={styles.clearBtn}>
                    <Ionicons name="close-circle" size={20} color="#666" />
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F0F0F0',
        borderRadius: 8,
        paddingHorizontal: 8,
        marginVertical: 8,
    },
    icon: { marginRight: 4 },
    input: { flex: 1, height: 40, color: '#000' },
    clearBtn: { padding: 4 },
});
