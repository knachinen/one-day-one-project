import { useState } from 'react';
import { useRealm } from '@realm/react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BSON } from 'realm';
import { Goal } from '../models';

export const useGoalLogic = () => {
    const realm = useRealm();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const createGoal = async (title: string, onSuccess?: () => void) => {
        if (!title.trim()) {
            setError('목표를 입력해주세요');
            return;
        }

        if (title.trim().length < 3) {
            setError('목표는 최소 3글자 이상이어야 합니다');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const newGoal = realm.write(() => {
                return realm.create(Goal, {
                    _id: new BSON.ObjectId(),
                    title: title.trim(),
                    createdAt: new Date(),
                    status: 'active',
                    actions: [],
                });
            });

            await AsyncStorage.setItem('current_goal_id', newGoal._id.toString());

            if (onSuccess) onSuccess();
        } catch (err) {
            console.error('목표 생성 실패:', err);
            setError('목표 생성에 실패했습니다. 다시 시도해주세요.');
        } finally {
            setLoading(false);
        }
    };

    return {
        createGoal,
        loading,
        error,
        setError,
    };
};
