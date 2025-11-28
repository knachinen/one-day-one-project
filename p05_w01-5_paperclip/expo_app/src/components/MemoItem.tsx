import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import TagChip from './TagChip';

// Temporary interface until we define the full Memo type in src/types/index.ts
interface Memo {
    id: string;
    content: string;
    tags: string[];
    createdAt: string;
}

interface MemoItemProps {
    memo: Memo;
    onPress: () => void;
}

export default function MemoItem({ memo, onPress }: MemoItemProps) {
    // Format date simply for now
    const dateStr = new Date(memo.createdAt).toLocaleDateString();

    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Text style={styles.content} numberOfLines={2}>
                {memo.content}
            </Text>
            <View style={styles.footer}>
                <View style={styles.tagContainer}>
                    {memo.tags.map((tag, index) => (
                        <TagChip key={index} label={tag} />
                    ))}
                </View>
                <Text style={styles.date}>{dateStr}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    content: {
        fontSize: 16,
        color: '#212121',
        marginBottom: 12,
        lineHeight: 22,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    tagContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex: 1,
    },
    date: {
        fontSize: 12,
        color: '#999',
        marginLeft: 8,
    },
});
