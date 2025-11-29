import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, ViewStyle } from 'react-native';
import { Colors } from '../constants/colors';
import { Typography, Spacing } from '../constants/typography';

interface TimerProps {
    timeLeft: number;
    totalTime: number;
    isRunning: boolean;
    style?: ViewStyle;
}

export const Timer: React.FC<TimerProps> = ({
    timeLeft,
    totalTime,
    isRunning,
    style,
}) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const opacityAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        if (isRunning && timeLeft > 0) {
            // 매 초마다 펄스 애니메이션
            Animated.sequence([
                Animated.parallel([
                    Animated.timing(scaleAnim, {
                        toValue: 1.1,
                        duration: 200,
                        useNativeDriver: true,
                    }),
                    Animated.timing(opacityAnim, {
                        toValue: 0.8,
                        duration: 200,
                        useNativeDriver: true,
                    }),
                ]),
                Animated.parallel([
                    Animated.timing(scaleAnim, {
                        toValue: 1,
                        duration: 200,
                        useNativeDriver: true,
                    }),
                    Animated.timing(opacityAnim, {
                        toValue: 1,
                        duration: 200,
                        useNativeDriver: true,
                    }),
                ]),
            ]).start();
        }
    }, [timeLeft, isRunning]);

    const progress = totalTime > 0 ? timeLeft / totalTime : 0;
    const circumference = 2 * Math.PI * 80; // 반지름 80
    const strokeDashoffset = circumference * (1 - progress);

    const getTimerColor = () => {
        if (!isRunning) return Colors.primary;
        if (timeLeft <= 3) return Colors.error;
        return Colors.text;
    };

    return (
        <View style={[styles.container, style]}>
            {/* 원형 프로그레스 바 배경 */}
            <View style={styles.circleContainer}>
                <View style={[styles.circle, { borderColor: Colors.border }]} />
                <View
                    style={[
                        styles.circle,
                        styles.progressCircle,
                        {
                            borderColor: getTimerColor(),
                            borderTopWidth: 8,
                            borderRightWidth: 8,
                            borderBottomWidth: 8,
                            borderLeftWidth: 8,
                            transform: [{ rotate: `${-90 + (1 - progress) * 360}deg` }],
                        },
                    ]}
                />
            </View>

            {/* 타이머 숫자 */}
            <Animated.View
                style={[
                    styles.timerTextContainer,
                    {
                        transform: [{ scale: scaleAnim }],
                        opacity: opacityAnim,
                    },
                ]}
            >
                <Text style={[styles.timerText, { color: getTimerColor() }]}>
                    {timeLeft}
                </Text>
                <Text style={styles.timerLabel}>초</Text>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: Spacing.xl,
    },
    circleContainer: {
        position: 'relative',
        width: 200,
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
    },
    circle: {
        position: 'absolute',
        width: 180,
        height: 180,
        borderRadius: 90,
        borderWidth: 8,
    },
    progressCircle: {
        borderColor: Colors.focus,
    },
    timerTextContainer: {
        position: 'absolute',
        alignItems: 'center',
    },
    timerText: {
        fontSize: Typography.fontSize['5xl'],
        fontWeight: Typography.fontWeight.bold,
        color: Colors.focus,
    },
    timerLabel: {
        fontSize: Typography.fontSize.lg,
        fontWeight: Typography.fontWeight.medium,
        color: Colors.textSecondary,
        marginTop: Spacing.xs,
    },
});
