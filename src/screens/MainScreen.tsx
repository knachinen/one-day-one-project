import React, { useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    Alert,
} from 'react-native';
import { useRealm, useQuery } from '@realm/react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BSON } from 'realm';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { Button, Timer } from '../components';
import { Colors } from '../constants/colors';
import { Typography, Spacing } from '../constants/typography';
import { TIMER_DURATION } from '../constants/colors';
import { useTimer, useAction, useGoal, useActionLogic } from '../hooks';

interface MainScreenProps {
    actionId: string;
    onActionCompleted: () => void;
}

export const MainScreen: React.FC<MainScreenProps> = ({
    actionId,
    onActionCompleted,
}) => {
    const realm = useRealm();
    const { timeLeft, isRunning, isCompleted, start, pause, reset } = useTimer();
    const { completeAction } = useActionLogic();

    // 현재 액션 가져오기
    const currentAction = useAction(actionId);

    // 액션의 목표 찾기
    const currentGoal = useGoal(actionId);

    // 타이머 완료 시 처리
    useEffect(() => {
        if (isCompleted) {
            handleComplete();
        }
    }, [isCompleted]);

    const handleComplete = async () => {
        // 햅틱 피드백 - 성공
        ReactNativeHapticFeedback.trigger('notificationSuccess', {
            enableVibrateFallback: true,
            ignoreAndroidSystemSettings: false,
        });

        try {
            await completeAction(actionId);

            // 완료 메시지 표시
            Alert.alert(
                '🎉 완료!',
                '10초 행동을 완료했습니다!\n다음 행동을 만들어보세요.',
                [
                    {
                        text: '확인',
                        onPress: onActionCompleted,
                    },
                ]
            );
        } catch (err) {
            Alert.alert('오류', '완료 처리에 실패했습니다.');
        }
    };

    const handleManualComplete = () => {
        Alert.alert(
            '완료 확인',
            '정말로 이 행동을 완료하셨나요?',
            [
                {
                    text: '취소',
                    style: 'cancel',
                },
                {
                    text: '완료',
                    onPress: handleComplete,
                },
            ]
        );
    };

    const getBackgroundColor = () => {
        if (isCompleted) return Colors.success;
        if (isRunning) return Colors.focus;
        return Colors.background;
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: getBackgroundColor() }]}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* 목표 표시 */}
                {!isRunning && !isCompleted && (
                    <View style={styles.header}>
                        <Text style={styles.goalLabel}>목표</Text>
                        <Text style={styles.goalTitle}>{currentGoal?.title}</Text>
                    </View>
                )}

                {/* 액션 설명 */}
                <View style={styles.actionContainer}>
                    <Text style={[styles.actionLabel, isRunning && styles.textWhite]}>
                        {isCompleted ? '완료한 행동' : '다음 10초 행동'}
                    </Text>
                    <Text style={[styles.actionDescription, isRunning && styles.textWhite]}>
                        {currentAction?.description}
                    </Text>
                </View>

                {/* 타이머 */}
                <View style={styles.timerContainer}>
                    <Timer
                        timeLeft={timeLeft}
                        totalTime={TIMER_DURATION}
                        isRunning={isRunning}
                    />
                </View>

                {/* 버튼 */}
                <View style={styles.buttonContainer}>
                    {!isRunning && !isCompleted && (
                        <>
                            <Button
                                title="10초 시작!"
                                onPress={start}
                                variant="primary"
                                style={styles.button}
                            />
                            <Button
                                title="바로 완료"
                                onPress={handleManualComplete}
                                variant="secondary"
                                style={styles.button}
                            />
                        </>
                    )}

                    {isRunning && (
                        <Button
                            title="일시정지"
                            onPress={pause}
                            variant="secondary"
                            style={styles.button}
                        />
                    )}

                    {isCompleted && (
                        <Button
                            title="다음 행동 만들기"
                            onPress={onActionCompleted}
                            variant="success"
                            style={styles.button}
                        />
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.xl,
        justifyContent: 'center',
    },
    header: {
        alignItems: 'center',
        marginBottom: Spacing.xl,
    },
    goalLabel: {
        fontSize: Typography.fontSize.sm,
        color: Colors.textSecondary,
        marginBottom: Spacing.xs,
    },
    goalTitle: {
        fontSize: Typography.fontSize.lg,
        fontWeight: Typography.fontWeight.semibold,
        color: Colors.primary,
        textAlign: 'center',
    },
    actionContainer: {
        alignItems: 'center',
        marginBottom: Spacing.xl,
    },
    actionLabel: {
        fontSize: Typography.fontSize.sm,
        color: Colors.textSecondary,
        marginBottom: Spacing.sm,
    },
    actionDescription: {
        fontSize: Typography.fontSize['2xl'],
        fontWeight: Typography.fontWeight.bold,
        color: Colors.text,
        textAlign: 'center',
    },
    textWhite: {
        color: Colors.background,
    },
    timerContainer: {
        alignItems: 'center',
        marginBottom: Spacing.xl,
    },
    buttonContainer: {
        marginTop: 'auto',
    },
    button: {
        marginBottom: Spacing.md,
    },
});
