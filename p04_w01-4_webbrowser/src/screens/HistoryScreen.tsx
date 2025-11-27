import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS } from '../constants/theme';
import { HistoryItem } from '../types';
import { getHistory, clearHistory } from '../utils/storage';
import { extractDomain } from '../utils/urlUtils';

interface HistoryScreenProps {
    isDarkMode: boolean;
    onNavigate?: (url: string) => void;
}

export const HistoryScreen: React.FC<HistoryScreenProps> = ({ isDarkMode, onNavigate }) => {
    const [history, setHistory] = useState<HistoryItem[]>([]);

    useEffect(() => {
        loadHistory();
    }, []);

    const loadHistory = async () => {
        const data = await getHistory();
        setHistory(data);
    };

    const handleClearHistory = () => {
        Alert.alert(
            'Clear History',
            'Are you sure you want to clear all browsing history?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Clear',
                    style: 'destructive',
                    onPress: async () => {
                        await clearHistory();
                        loadHistory();
                    },
                },
            ]
        );
    };

    const handleHistoryPress = (url: string) => {
        if (onNavigate) {
            onNavigate(url);
        }
    };

    const formatDate = (timestamp: number) => {
        const date = new Date(timestamp);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        if (date.toDateString() === today.toDateString()) {
            return 'Today';
        } else if (date.toDateString() === yesterday.toDateString()) {
            return 'Yesterday';
        } else {
            return date.toLocaleDateString();
        }
    };

    const renderHistoryItem = ({ item }: { item: HistoryItem }) => (
        <TouchableOpacity
            style={[
                styles.historyItem,
                {
                    backgroundColor: isDarkMode ? COLORS.cardDark : COLORS.card,
                    borderBottomColor: isDarkMode ? COLORS.borderDark : COLORS.border,
                },
            ]}
            onPress={() => handleHistoryPress(item.url)}
        >
            <View style={styles.iconContainer}>
                <Ionicons
                    name="time-outline"
                    size={24}
                    color={isDarkMode ? COLORS.textSecondaryDark : COLORS.textSecondary}
                />
            </View>

            <View style={styles.content}>
                <Text
                    style={[
                        styles.title,
                        { color: isDarkMode ? COLORS.textDark : COLORS.text },
                    ]}
                    numberOfLines={1}
                >
                    {item.title}
                </Text>
                <Text
                    style={[
                        styles.url,
                        { color: isDarkMode ? COLORS.textSecondaryDark : COLORS.textSecondary },
                    ]}
                    numberOfLines={1}
                >
                    {extractDomain(item.url)}
                </Text>
                <Text
                    style={[
                        styles.time,
                        { color: isDarkMode ? COLORS.textSecondaryDark : COLORS.textSecondary },
                    ]}
                >
                    {formatDate(item.visitedAt)}
                </Text>
            </View>
        </TouchableOpacity>
    );

    const renderEmpty = () => (
        <View style={styles.emptyContainer}>
            <Ionicons
                name="time-outline"
                size={64}
                color={isDarkMode ? COLORS.textSecondaryDark : COLORS.textSecondary}
            />
            <Text
                style={[
                    styles.emptyText,
                    { color: isDarkMode ? COLORS.textSecondaryDark : COLORS.textSecondary },
                ]}
            >
                No browsing history
            </Text>
        </View>
    );

    return (
        <SafeAreaView
            style={[
                styles.container,
                { backgroundColor: isDarkMode ? COLORS.backgroundDark : COLORS.background },
            ]}
            edges={['top', 'left', 'right']}
        >
            <View
                style={[
                    styles.header,
                    { borderBottomColor: isDarkMode ? COLORS.borderDark : COLORS.border },
                ]}
            >
                <Text
                    style={[
                        styles.headerTitle,
                        { color: isDarkMode ? COLORS.textDark : COLORS.text },
                    ]}
                >
                    History
                </Text>
                {history.length > 0 && (
                    <TouchableOpacity
                        style={[
                            styles.clearButton,
                            { backgroundColor: COLORS.error },
                        ]}
                        onPress={handleClearHistory}
                    >
                        <Text style={styles.clearButtonText}>Clear All</Text>
                    </TouchableOpacity>
                )}
            </View>

            <FlatList
                data={history}
                keyExtractor={(item) => item.id}
                renderItem={renderHistoryItem}
                ListEmptyComponent={renderEmpty}
                contentContainerStyle={history.length === 0 ? styles.emptyList : undefined}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.md,
        borderBottomWidth: 1,
    },
    headerTitle: {
        fontSize: FONT_SIZES.xxl,
        fontWeight: FONT_WEIGHTS.bold,
    },
    clearButton: {
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.sm,
        borderRadius: BORDER_RADIUS.md,
    },
    clearButtonText: {
        color: COLORS.background,
        fontSize: FONT_SIZES.sm,
        fontWeight: FONT_WEIGHTS.semibold,
    },
    historyItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: SPACING.md,
        paddingHorizontal: SPACING.lg,
        borderBottomWidth: 1,
    },
    iconContainer: {
        marginRight: SPACING.md,
    },
    content: {
        flex: 1,
    },
    title: {
        fontSize: FONT_SIZES.md,
        fontWeight: FONT_WEIGHTS.medium,
        marginBottom: SPACING.xs,
    },
    url: {
        fontSize: FONT_SIZES.sm,
        marginBottom: 2,
    },
    time: {
        fontSize: FONT_SIZES.xs,
    },
    emptyList: {
        flex: 1,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: SPACING.xl,
    },
    emptyText: {
        fontSize: FONT_SIZES.lg,
        fontWeight: FONT_WEIGHTS.semibold,
        marginTop: SPACING.lg,
    },
});
