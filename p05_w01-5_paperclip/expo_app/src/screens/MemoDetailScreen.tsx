import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { StorageService } from '../services/storage';
import { Memo } from '../types';
import { theme } from '../theme';
import TagChip from '../components/TagChip';

export default function MemoDetailScreen({ route, navigation }) {
    const { memoId } = route.params || {};
    const [memo, setMemo] = useState<Memo | null>(null);

    useEffect(() => {
        loadMemo();
    }, [memoId]);

    const loadMemo = async () => {
        if (!memoId) return;
        const data = await StorageService.getMemoById(memoId);
        if (data) {
            setMemo(data);
        } else {
            Alert.alert('Error', 'Memo not found', [{ text: 'OK', onPress: () => navigation.goBack() }]);
        }
    };

    const handleArchive = async () => {
        if (!memo) return;
        await StorageService.archiveMemo(memo.id);
        navigation.goBack();
    };

    if (!memo) return null;

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Ionicons name="arrow-back" size={24} color={theme.colors.textPrimary} />
                </TouchableOpacity>
                <View style={styles.actions}>
                    <TouchableOpacity onPress={handleArchive} style={styles.actionBtn}>
                        <Ionicons name="archive-outline" size={24} color={theme.colors.textPrimary} />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView style={styles.contentContainer}>
                <Text style={styles.date}>
                    {new Date(memo.createdAt).toLocaleString()}
                </Text>

                <Text style={styles.content}>{memo.content}</Text>

                {memo.tags.length > 0 && (
                    <View style={styles.tagContainer}>
                        {memo.tags.map((tag, index) => (
                            <TagChip key={index} label={tag} />
                        ))}
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.colors.background },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: theme.spacing.md },
    backBtn: { padding: theme.spacing.xs },
    actions: { flexDirection: 'row' },
    actionBtn: { padding: theme.spacing.xs, marginLeft: theme.spacing.sm },
    contentContainer: { flex: 1, paddingHorizontal: theme.spacing.md },
    date: { fontSize: 12, color: theme.colors.textSecondary, marginBottom: theme.spacing.md },
    content: { fontSize: 18, color: theme.colors.textPrimary, lineHeight: 28, marginBottom: theme.spacing.lg },
    tagContainer: { flexDirection: 'row', flexWrap: 'wrap', marginTop: theme.spacing.md },
});
