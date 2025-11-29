

import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';

interface GoalInputScreenProps extends StackScreenProps<RootStackParamList, 'GoalInput'> {
    onGoalCreated: (goalId?: string) => void;
}

import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRealm } from '@realm/react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BSON } from 'realm';
import { Button, Input } from '../components';
import { Colors } from '../constants/colors';
import { Typography, Spacing } from '../constants/typography';
import { useGoalLogic, useGoal } from '../hooks'; // Import useGoal

export const GoalInputScreen: React.FC<GoalInputScreenProps> = ({ navigation, route, onGoalCreated }) => {
    const goalId = route.params?.goalId; // Get goalId from route params
    const existingGoal = useGoal(goalId); // Fetch existing goal if goalId is provided

    const [goalTitle, setGoalTitle] = useState(existingGoal ? existingGoal.title : '');
    const { createGoal, updateGoal, loading, error, setError } = useGoalLogic(); // Destructure updateGoal

    useEffect(() => {
        if (existingGoal) {
            setGoalTitle(existingGoal.title);
        }
    }, [existingGoal]);

    const handleSaveGoal = React.useCallback(() => {
        if (goalId) {
            updateGoal(goalId, goalTitle, onGoalCreated);
        } else {
            createGoal(goalTitle, onGoalCreated);
        }
    }, [createGoal, updateGoal, goalId, goalTitle, onGoalCreated]);

    const buttonText = goalId ? "목표 수정하기" : "시작하기";

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <View style={styles.content}>
                    {/* 헤더 */}
                    <View style={styles.header}>
                        <Text style={styles.emoji}>⚛️</Text>
                        <Text style={styles.title}>{goalId ? "목표 수정" : "Atomizer"}</Text>
                        <Text style={styles.subtitle}>
                            {goalId ? "목표를 수정해주세요" : "큰 목표를 10초 단위로 쪼개어\n실행하는 습관을 만들어보세요"}
                        </Text>
                    </View>

                    {/* 입력 폼 */}
                    <View style={styles.form}>
                        <Input
                            label="당신의 큰 목표는 무엇인가요?"
                            placeholder="예: 책 한 권 읽기, 운동 시작하기"
                            value={goalTitle}
                            onChangeText={(text) => {
                                setGoalTitle(text);
                                setError('');
                            }}
                            error={error}
                            autoFocusOnMount
                            maxLength={100}
                            returnKeyType="done"
                            onSubmitEditing={handleSaveGoal}
                        />
                    </View>

                    {/* 버튼 */}
                    <View style={styles.buttonContainer}>
                        <Button
                            title={buttonText}
                            onPress={handleSaveGoal}
                            disabled={!goalTitle.trim() || loading}
                            loading={loading}
                        />
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    keyboardView: {
        flex: 1,
    },
    content: {
        flex: 1,
        paddingHorizontal: Spacing.lg,
        justifyContent: 'center',
    },
    header: {
        alignItems: 'center',
        marginBottom: Spacing['3xl'],
    },
    emoji: {
        fontSize: Typography.fontSize['5xl'],
        marginBottom: Spacing.md,
    },
    title: {
        fontSize: Typography.fontSize['3xl'],
        fontWeight: Typography.fontWeight.bold,
        color: Colors.text,
        marginBottom: Spacing.sm,
    },
    subtitle: {
        fontSize: Typography.fontSize.base,
        color: Colors.textSecondary,
        textAlign: 'center',
        lineHeight: Typography.lineHeight.relaxed * Typography.fontSize.base,
    },
    form: {
        marginBottom: Spacing.xl,
    },
    buttonContainer: {
        marginTop: Spacing.md,
    },
});
