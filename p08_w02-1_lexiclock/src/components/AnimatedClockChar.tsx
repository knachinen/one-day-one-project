import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeOut, ZoomIn, ZoomOut } from 'react-native-reanimated';
import { ClockText } from './ClockText';

interface AnimatedClockCharProps {
    char: string;
    size: number;
    color: string;
    glow?: boolean;
    style?: any;
}

export const AnimatedClockChar: React.FC<AnimatedClockCharProps> = ({ char, size, color, glow, style }) => {
    return (
        <View style={[styles.container, { width: size * 1.5, height: size * 1.5 }, style]}>
            <Animated.View
                key={char}
                entering={ZoomIn.duration(400)}
                exiting={ZoomOut.duration(400)}
                style={styles.absolute}
            >
                <ClockText size={size} color={color} glow={glow}>
                    {char}
                </ClockText>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    absolute: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
