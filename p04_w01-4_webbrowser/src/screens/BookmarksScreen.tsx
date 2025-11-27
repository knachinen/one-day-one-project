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
import { BookmarkItem } from '../components/BookmarkItem';
import { COLORS, SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS, SHADOWS } from '../constants/theme';
import { Bookmark } from '../types';
import { getBookmarks, deleteBookmark } from '../utils/storage';

interface BookmarksScreenProps {
    isDarkMode: boolean;
    onNavigate?: (url: string) => void;
}

export const BookmarksScreen: React.FC<BookmarksScreenProps> = ({ isDarkMode, onNavigate }) => {
    const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

    useEffect(() => {
        loadBookmarks();
    }, []);

    const loadBookmarks = async () => {
        const data = await getBookmarks();
        setBookmarks(data);
    };

    const handleDeleteBookmark = (id: string) => {
        Alert.alert(
            'Delete Bookmark',
            'Are you sure you want to delete this bookmark?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        await deleteBookmark(id);
                        loadBookmarks();
                    },
                },
            ]
        );
    };

    const handleBookmarkPress = (url: string) => {
        if (onNavigate) {
            onNavigate(url);
        }
    };

    const renderEmpty = () => (
        <View style={styles.emptyContainer}>
            <Ionicons
                name="bookmark-outline"
                size={64}
                color={isDarkMode ? COLORS.textSecondaryDark : COLORS.textSecondary}
            />
            <Text
                style={[
                    styles.emptyText,
                    { color: isDarkMode ? COLORS.textSecondaryDark : COLORS.textSecondary },
                ]}
            >
                No bookmarks yet
            </Text>
            <Text
                style={[
                    styles.emptySubtext,
                    { color: isDarkMode ? COLORS.textSecondaryDark : COLORS.textSecondary },
                ]}
            >
                Bookmark your favorite pages to access them quickly
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
                        styles.title,
                        { color: isDarkMode ? COLORS.textDark : COLORS.text },
                    ]}
                >
                    Bookmarks
                </Text>
            </View>

            <FlatList
                data={bookmarks}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <BookmarkItem
                        bookmark={item}
                        onPress={() => handleBookmarkPress(item.url)}
                        onDelete={() => handleDeleteBookmark(item.id)}
                        isDarkMode={isDarkMode}
                    />
                )}
                ListEmptyComponent={renderEmpty}
                contentContainerStyle={bookmarks.length === 0 ? styles.emptyList : undefined}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.md,
        borderBottomWidth: 1,
    },
    title: {
        fontSize: FONT_SIZES.xxl,
        fontWeight: FONT_WEIGHTS.bold,
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
        marginBottom: SPACING.sm,
    },
    emptySubtext: {
        fontSize: FONT_SIZES.md,
        textAlign: 'center',
    },
});
