import { useState } from 'react';
import { useRealm } from '@realm/react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BSON } from 'realm';
import { Action, Goal } from '../models';
import { notificationService } from '../services/notification';

export const useActionLogic = () => {
    const realm = useRealm();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const createAction = async (
        goalId: string,
        description: string,
        reminderTime: Date,
        onSuccess?: () => void
    ) => {
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

                const goal = realm.objectForPrimaryKey(Goal, new BSON.ObjectId(goalId));
                goal?.actions.push(action);
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
            }

            if (onSuccess) onSuccess();
        } catch (err) {
            console.error('액션 생성 실패:', err);
            setError('액션 생성에 실패했습니다. 다시 시도해주세요.');
        } finally {
            setLoading(false);
        }
    };

    const completeAction = async (actionId: string, onSuccess?: () => void) => {
        try {
            const action = realm.objectForPrimaryKey(Action, new BSON.ObjectId(actionId));

            realm.write(() => {
                if (action) {
                    action.status = 'completed';
                    action.completedAt = new Date();
                }
            });

            await AsyncStorage.removeItem('current_action_id');
            await notificationService.cancelNotification(actionId);

            if (onSuccess) onSuccess();
        } catch (err) {
            console.error('액션 완료 처리 실패:', err);
            throw err; // UI에서 처리하도록 전파
        }
    };

    return {
        createAction,
        completeAction,
        loading,
        error,
        setError,
    };
};
