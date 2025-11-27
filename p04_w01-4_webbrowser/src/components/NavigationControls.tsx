import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS } from '../constants/theme';

interface NavigationControlsProps {
    canGoBack: boolean;
    canGoForward: boolean;
    onBack: () => void;
    onForward: () => void;
    onReload: () => void;
    onHome: () => void;
    onTabSwitch: () => void;
    isDarkMode: boolean;
    isLoading: boolean;
}

export const NavigationControls: React.FC<NavigationControlsProps> = ({
    canGoBack,
    canGoForward,
    onBack,
    onForward,
    onReload,
    onHome,
    onTabSwitch,
    isDarkMode,
    isLoading,
}) => {
    const iconColor = isDarkMode ? COLORS.textDark : COLORS.text;
    const disabledColor = isDarkMode ? COLORS.textSecondaryDark : COLORS.textSecondary;

    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor: isDarkMode ? COLORS.surfaceDark : COLORS.surface,
                    borderTopColor: isDarkMode ? COLORS.borderDark : COLORS.border,
                },
            ]}
        >
            <TouchableOpacity
                style={styles.button}
                onPress={onBack}
                disabled={!canGoBack}
            >
                <Ionicons
                    name="arrow-back"
                    size={24}
                    color={canGoBack ? iconColor : disabledColor}
                />
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={onForward}
                disabled={!canGoForward}
            >
                <Ionicons
                    name="arrow-forward"
                    size={24}
                    color={canGoForward ? iconColor : disabledColor}
                />
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={onReload}
            >
                <Ionicons
                    name={isLoading ? 'close-circle-outline' : 'reload'}
                    size={24}
                    color={iconColor}
                />
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={onHome}
            >
                <Ionicons
                    name="home-outline"
                    size={24}
                    color={iconColor}
                />
            </TouchableOpacity>

            <TouchableOpacity
                style={[
                    styles.button,
                    styles.tabButton,
                    {
                        backgroundColor: isDarkMode ? COLORS.cardDark : COLORS.card,
                    },
                    SHADOWS.sm,
                ]}
                onPress={onTabSwitch}
            >
                <Ionicons
                    name="albums-outline"
                    size={24}
                    color={COLORS.primary}
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: SPACING.sm,
        paddingHorizontal: SPACING.md,
        borderTopWidth: 1,
    },
    button: {
        padding: SPACING.sm,
        borderRadius: BORDER_RADIUS.md,
    },
    tabButton: {
        paddingHorizontal: SPACING.md,
    },
});
