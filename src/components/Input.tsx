import React, { useRef, useEffect } from 'react';
import {
    TextInput,
    StyleSheet,
    View,
    Text,
    TextInputProps,
    ViewStyle,
} from 'react-native';
import { Colors } from '../constants/colors';
import { Typography, Spacing, BorderRadius } from '../constants/typography';

interface InputProps extends TextInputProps {
    label?: string;
    error?: string;
    autoFocusOnMount?: boolean;
    containerStyle?: ViewStyle;
}

export const Input: React.FC<InputProps> = ({
    label,
    error,
    autoFocusOnMount = false,
    containerStyle,
    ...textInputProps
}) => {
    const inputRef = useRef<TextInput>(null);

    useEffect(() => {
        if (autoFocusOnMount) {
            // 약간의 지연을 두고 포커스 (화면 전환 애니메이션 고려)
            setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
        }
    }, [autoFocusOnMount]);

    return (
        <View style={[styles.container, containerStyle]}>
            {label && <Text style={styles.label}>{label}</Text>}
            <TextInput
                ref={inputRef}
                style={[
                    styles.input,
                    error && styles.inputError,
                ]}
                placeholderTextColor={Colors.textSecondary}
                {...textInputProps}
            />
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: Spacing.md,
    },
    label: {
        fontSize: Typography.fontSize.sm,
        fontWeight: Typography.fontWeight.medium,
        color: Colors.text,
        marginBottom: Spacing.xs,
    },
    input: {
        backgroundColor: Colors.background,
        borderWidth: 2,
        borderColor: Colors.border,
        borderRadius: BorderRadius.lg,
        paddingVertical: Spacing.md,
        paddingHorizontal: Spacing.md,
        fontSize: Typography.fontSize.base,
        color: Colors.text,
        minHeight: 56,
    },
    inputError: {
        borderColor: Colors.error,
    },
    errorText: {
        fontSize: Typography.fontSize.xs,
        color: Colors.error,
        marginTop: Spacing.xs,
    },
});
