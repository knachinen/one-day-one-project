import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
} from 'react-native';
import { useRealm } from '@realm/react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BSON } from 'realm';
import { Button, Input } from '../components';
import { Colors } from '../constants/colors';
import { Typography, Spacing } from '../constants/typography';
import { useGoalLogic } from '../hooks';

interface GoalInputScreenProps {
    onGoalCreated: () => void;
}

export const GoalInputScreen: React.FC<GoalInputScreenProps> = ({ onGoalCreated }) => {
    const [goalTitle, setGoalTitle] = useState('');
    const { createGoal, loading, error, setError } = useGoalLogic();

    const handleCreateGoal = () => {
        createGoal(goalTitle, onGoalCreated);
    };

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
                        <Text style={styles.title}>Atomizer</Text>
                        <Text style={styles.subtitle}>
                            큰 목표를 10초 단위로 쪼개어{'\n'}실행하는 습관을 만들어보세요
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
                            onSubmitEditing={handleCreateGoal}
                        />
                    </View>

                    {/* 버튼 */}
                    <View style={styles.buttonContainer}>
                        <Button
                            title="시작하기"
                            onPress={handleCreateGoal}
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
