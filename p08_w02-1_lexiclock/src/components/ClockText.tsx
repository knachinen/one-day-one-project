import React from 'react';
import { Text, TextStyle, StyleSheet } from 'react-native';
import { COLORS } from '../constants/theme';

interface ClockTextProps {
    children: React.ReactNode;
    style?: TextStyle;
    size?: number;
    color?: string;
    glow?: boolean;
}

export const ClockText: React.FC<ClockTextProps> = ({
    children,
    style,
    size = 24,
    color = COLORS.text,
    glow = false
}) => {
    return (
        <Text style={[
            styles.text,
            { fontSize: size, color },
            glow && {
                textShadowColor: color,
                textShadowOffset: { width: 0, height: 0 },
                textShadowRadius: 10,
            },
            style
        ]}>
            {children}
        </Text>
    );
};

const styles = StyleSheet.create({
    text: {
        // fontFamily: 'System', // Will update when custom fonts are loaded
        fontWeight: 'bold',
    },
});
