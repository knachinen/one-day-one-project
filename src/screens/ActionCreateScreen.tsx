import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
} from 'react-native';
import { useRealm, useQuery } from '@realm/react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BSON } from 'realm';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button, Input } from '../components';
import { Colors } from '../constants/colors';
import { Typography, Spacing } from '../constants/typography';
import { Goal, Action } from '../models';
import { notificationService } from '../services/notification';

interface ActionCreateScreenProps {
    goalId: string;
    onActionCreated: () => void;
}

export const ActionCreateScreen: React.FC<ActionCreateScreenProps> = ({
    goalId,
    onActionCreated,
}) => {
    const realm = useRealm();
    const [description, setDescription] = useState('');
    const [reminderTime, setReminderTime] = useState(new Date(Date.now() + 60000)); // 1분 후
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // 현재 목표 가져오기
    const goals = useQuery(Goal, (goals) => {
        return goals.filtered('_id == $0', new BSON.ObjectId(goalId));
    });
    const currentGoal = goals[0];

    const handleCreateAction = async () => {
        // 유효성 검증
        if (!description.trim()) {
            setError('10초 행동을 입력해주세요');
            return;
        }

        if (description.trim().length < 2) {
            setError('행동은 최소 2글자 이상이어야 합니다');
            return;
        }

        setLoading(true);
        setError('');

        try {
            // Realm에 액션 저장
            const newAction = realm.write(() => {
                const action = realm.create(Action, {
                    _id: new BSON.ObjectId(),
                    description: description.trim(),
                    status: 'pending',
                    createdAt: new Date(),
                    reminderTime,
                });

                // 목표에 액션 추가
                currentGoal?.actions.push(action);
                return action;
            });

            // AsyncStorage에 현재 액션 ID 저장
            await AsyncStorage.setItem('current_action_id', newAction._id.toString());

            // 알림 스케줄링
            try {
                await notificationService.scheduleNotification(
                    newAction._id.toString(),
                    '⚛️ 10초 행동 시간!',
                    description.trim(),
                    reminderTime
                );
            } catch (notiError) {
                console.error('알림 스케줄링 실패:', notiError);
                // 알림 실패해도 액션 생성은 성공으로 처리
            }

            // 성공 후 다음 화면으로
            onActionCreated();
        } catch (err) {
            console.error('액션 생성 실패:', err);
            setError('액션 생성에 실패했습니다. 다시 시도해주세요.');
        } finally {
            setLoading(false);
        }
    };

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('ko-KR', {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                >
                    {/* 헤더 */}
                    <View style={styles.header}>
                        <Text style={styles.goalTitle}>목표: {currentGoal?.title}</Text>
                        <Text style={styles.subtitle}>
                            이 목표를 위한 다음 10초 행동은 무엇인가요?
                        </Text>
                    </View>

                    {/* 입력 폼 */}
                    <View style={styles.form}>
                        <Input
                            label="10초 행동"
                            placeholder="예: 책 펼치기, 운동복 입기"
                            value={description}
                            onChangeText={(text) => {
                                setDescription(text);
                                setError('');
                            }}
                            error={error}
                            autoFocusOnMount
                            maxLength={100}
                            multiline
                            numberOfLines={3}
                        />

                        {/* 리마인더 시간 설정 */}
                        <View style={styles.reminderSection}>
                            <Text style={styles.label}>리마인더 시간</Text>
                            <Button
                                title={`${formatTime(reminderTime)}에 알림`}
                                onPress={() => setShowTimePicker(true)}
                                variant="secondary"
                            />
                        </View>

                        {showTimePicker && (
                            <DateTimePicker
                                value={reminderTime}
                                mode="time"
                                is24Hour={true}
                                display="default"
                                onChange={(event, selectedDate) => {
                                    setShowTimePicker(Platform.OS === 'ios');
                                    if (selectedDate) {
                                        setReminderTime(selectedDate);
                                    }
                                }}
                            />
                        )}
                    </View>

                    {/* 버튼 */}
                    <View style={styles.buttonContainer}>
                        <Button
                            title="10초 행동 시작하기"
                            onPress={handleCreateAction}
                            disabled={!description.trim() || loading}
                            loading={loading}
                        />
                    </View>
                </ScrollView>
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
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.xl,
    },
    header: {
        marginBottom: Spacing.xl,
    },
    goalTitle: {
        fontSize: Typography.fontSize.xl,
        fontWeight: Typography.fontWeight.bold,
        color: Colors.primary,
        marginBottom: Spacing.sm,
    },
    subtitle: {
        fontSize: Typography.fontSize.base,
        color: Colors.textSecondary,
        lineHeight: Typography.lineHeight.relaxed * Typography.fontSize.base,
    },
    form: {
        marginBottom: Spacing.xl,
    },
    reminderSection: {
        marginTop: Spacing.md,
    },
    label: {
        fontSize: Typography.fontSize.sm,
        fontWeight: Typography.fontWeight.medium,
        color: Colors.text,
        marginBottom: Spacing.xs,
    },
    buttonContainer: {
        marginTop: 'auto',
    },
});
