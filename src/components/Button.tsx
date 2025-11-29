import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ActivityIndicator,
    ViewStyle,
    TextStyle,
} from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { Colors } from '../constants/colors';
import { Typography, Spacing, BorderRadius } from '../constants/typography';

interface ButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'success';
    disabled?: boolean;
    loading?: boolean;
    style?: ViewStyle;
}

export const Button: React.FC<ButtonProps> = ({
    title,
    onPress,
    variant = 'primary',
    disabled = false,
    loading = false,
    style,
}) => {
    const handlePress = () => {
        if (!disabled && !loading) {
            // 햅틱 피드백
            ReactNativeHapticFeedback.trigger('impactLight', {
                enableVibrateFallback: true,
                ignoreAndroidSystemSettings: false,
            });
            onPress();
        }
    };

    const getBackgroundColor = () => {
        if (disabled) return Colors.border;
        switch (variant) {
            case 'primary':
                return Colors.primary;
            case 'secondary':
                return Colors.backgroundDark;
            case 'success':
                return Colors.success;
            default:
                return Colors.primary;
        }
    };

    return (
        <TouchableOpacity
            style={[
                styles.button,
                { backgroundColor: getBackgroundColor() },
                disabled && styles.disabled,
                style,
            ]}
            onPress={handlePress}
            disabled={disabled || loading}
            activeOpacity={0.8}
        >
            {loading ? (
                <ActivityIndicator color={Colors.background} />
            ) : (
                <Text style={styles.buttonText}>{title}</Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        paddingVertical: Spacing.md,
        paddingHorizontal: Spacing.lg,
        borderRadius: BorderRadius.lg,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 56,
    },
    buttonText: {
        color: Colors.background,
        fontSize: Typography.fontSize.lg,
        fontWeight: Typography.fontWeight.semibold,
    },
    disabled: {
        opacity: 0.5,
    },
});
