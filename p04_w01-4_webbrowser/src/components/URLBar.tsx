import React, { useState, useEffect } from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Animated,
    Keyboard,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS, SHADOWS } from '../constants/theme';
import { processInput, isSecureUrl } from '../utils/urlUtils';

interface URLBarProps {
    url: string;
    onNavigate: (url: string) => void;
    isDarkMode: boolean;
    searchEngine: 'google' | 'bing' | 'duckduckgo';
    onBookmark?: () => void;
    isBookmarked?: boolean;
}

export const URLBar: React.FC<URLBarProps> = ({ url, onNavigate, isDarkMode, searchEngine, onBookmark, isBookmarked = false }) => {
    const [inputValue, setInputValue] = useState(url);
    const [isFocused, setIsFocused] = useState(false);
    const focusAnim = new Animated.Value(0);

    useEffect(() => {
        setInputValue(url);
    }, [url]);

    useEffect(() => {
        Animated.timing(focusAnim, {
            toValue: isFocused ? 1 : 0,
            duration: 200,
            useNativeDriver: false,
        }).start();
    }, [isFocused]);

    const handleSubmit = () => {
        const processedUrl = processInput(inputValue, searchEngine);
        onNavigate(processedUrl);
        Keyboard.dismiss();
    };

    const borderColor = focusAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [
            isDarkMode ? COLORS.borderDark : COLORS.border,
            COLORS.primary,
        ],
    });

    const isSecure = isSecureUrl(url);

    return (
        <Animated.View
            style={[
                styles.container,
                {
                    backgroundColor: isDarkMode ? COLORS.cardDark : COLORS.card,
                    borderColor,
                },
                isDarkMode ? SHADOWS.md : SHADOWS.lg,
            ]}
        >
            <View style={styles.iconContainer}>
                <Ionicons
                    name={isSecure ? 'lock-closed' : 'globe-outline'}
                    size={18}
                    color={isSecure ? COLORS.success : (isDarkMode ? COLORS.textSecondaryDark : COLORS.textSecondary)}
                />
            </View>

            <TextInput
                style={[
                    styles.input,
                    { color: isDarkMode ? COLORS.textDark : COLORS.text },
                ]}
                value={inputValue}
                onChangeText={setInputValue}
                onSubmitEditing={handleSubmit}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Search or enter URL"
                placeholderTextColor={isDarkMode ? COLORS.textSecondaryDark : COLORS.textSecondary}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="url"
                returnKeyType="go"
                selectTextOnFocus
            />

            {onBookmark && url && (
                <TouchableOpacity
                    style={styles.iconContainer}
                    onPress={onBookmark}
                >
                    <Ionicons
                        name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
                        size={24}
                        color={isBookmarked ? COLORS.primary : (isDarkMode ? COLORS.textSecondaryDark : COLORS.textSecondary)}
                    />
                </TouchableOpacity>
            )}

            {inputValue !== url && (
                <TouchableOpacity
                    style={styles.iconContainer}
                    onPress={handleSubmit}
                >
                    <Ionicons
                        name="arrow-forward-circle"
                        size={24}
                        color={COLORS.primary}
                    />
                </TouchableOpacity>
            )}
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: SPACING.md,
        marginVertical: SPACING.sm,
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.sm,
        borderRadius: BORDER_RADIUS.lg,
        borderWidth: 2,
    },
    iconContainer: {
        marginRight: SPACING.sm,
    },
    input: {
        flex: 1,
        fontSize: FONT_SIZES.md,
        paddingVertical: SPACING.xs,
    },
});
