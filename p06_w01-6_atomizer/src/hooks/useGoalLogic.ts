import { useState } from 'react';
import { useRealm } from '@realm/react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BSON } from 'realm';
import { Goal } from '../models';

export const useGoalLogic = () => {
    const realm = useRealm();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const createGoal = async (title: string, onSuccess?: (goalId: string) => void) => {
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
            let newGoalId: string = '';
            realm.write(() => {
                // Deactivate all existing goals
                realm.objects(Goal).forEach(goal => {
                    if (goal.isActive) {
                        goal.isActive = false;
                    }
                });

                const newGoal = realm.create(Goal, {
                    _id: new BSON.ObjectId(),
                    title: title.trim(),
                    createdAt: new Date(),
                    status: 'active',
                    isActive: true, // Set the new goal as active
                    actions: [],
                });
                newGoalId = newGoal._id.toHexString();
            });

            if (onSuccess) onSuccess(newGoalId);
        } catch (err) {
            console.error('목표 생성 실패:', err);
            setError('목표 생성에 실패했습니다. 다시 시도해주세요.');
        } finally {
            setLoading(false);
        }
    };

    const updateGoal = async (goalId: string, newTitle: string, onSuccess?: (goalId: string) => void) => {
        if (!newTitle.trim()) {
            setError('목표를 입력해주세요');
            return;
        }

        if (newTitle.trim().length < 3) {
            setError('목표는 최소 3글자 이상이어야 합니다');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const goalToUpdate = realm.objectForPrimaryKey(Goal, new BSON.ObjectId(goalId));
            if (goalToUpdate) {
                realm.write(() => {
                    goalToUpdate.title = newTitle.trim();
                });
                if (onSuccess) onSuccess(goalId);
            } else {
                setError('목표를 찾을 수 없습니다.');
            }
        } catch (err) {
            console.error('목표 업데이트 실패:', err);
            setError('목표 업데이트에 실패했습니다. 다시 시도해주세요.');
        } finally {
            setLoading(false);
        }
    };

    const deleteGoal = async (goalId: string, onSuccess?: () => void) => {
        setLoading(true);
        setError('');

        try {
            const goalToDelete = realm.objectForPrimaryKey(Goal, new BSON.ObjectId(goalId));
            if (goalToDelete) {
                realm.write(() => {
                    realm.delete(goalToDelete);
                });
                if (onSuccess) onSuccess();
            } else {
                setError('목표를 찾을 수 없습니다.');
            }
        } catch (err) {
            console.error('목표 삭제 실패:', err);
            setError('목표 삭제에 실패했습니다. 다시 시도해주세요.');
        } finally {
            setLoading(false);
        }
    };


    return {
        createGoal,
        updateGoal,
        deleteGoal,
        loading,
        error,
        setError,
    };
};
