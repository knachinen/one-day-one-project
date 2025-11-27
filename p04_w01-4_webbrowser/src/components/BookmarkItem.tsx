import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS, FONT_WEIGHTS } from '../constants/theme';
import { Bookmark } from '../types';
import { extractDomain } from '../utils/urlUtils';

interface BookmarkItemProps {
    bookmark: Bookmark;
    onPress: () => void;
    onDelete: () => void;
    isDarkMode: boolean;
}

export const BookmarkItem: React.FC<BookmarkItemProps> = ({
    bookmark,
    onPress,
    onDelete,
    isDarkMode,
}) => {
    return (
        <TouchableOpacity
            style={[
                styles.container,
                {
                    backgroundColor: isDarkMode ? COLORS.cardDark : COLORS.card,
                    borderBottomColor: isDarkMode ? COLORS.borderDark : COLORS.border,
                },
            ]}
            onPress={onPress}
        >
            <View style={styles.iconContainer}>
                <Ionicons
                    name="bookmark"
                    size={24}
                    color={COLORS.primary}
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
                    {bookmark.title}
                </Text>
                <Text
                    style={[
                        styles.url,
                        { color: isDarkMode ? COLORS.textSecondaryDark : COLORS.textSecondary },
                    ]}
                    numberOfLines={1}
                >
                    {extractDomain(bookmark.url)}
                </Text>
            </View>

            <TouchableOpacity
                style={styles.deleteButton}
                onPress={onDelete}
            >
                <Ionicons
                    name="trash-outline"
                    size={20}
                    color={COLORS.error}
                />
            </TouchableOpacity>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
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
    },
    deleteButton: {
        padding: SPACING.sm,
    },
});
