import { useQuery, useRealm } from '@realm/react';
import { BSON } from 'realm';
import { Goal, Action } from '../models';

// 활성 목표 가져오기 (가장 최근 것)
export const useActiveGoal = () => {
    const goals = useQuery(Goal, (collection) => {
        return collection.filtered('status == "active"').sorted('createdAt', true);
    });
    return goals[0] || null;
};

// 특정 목표 가져오기
export const useGoal = (goalId: string) => {
    const goal = useQuery(Goal, (collection) => {
        try {
            return collection.filtered('_id == $0', new BSON.ObjectId(goalId));
        } catch (e) {
            return collection.filtered('false == true'); // 빈 결과 반환
        }
    })[0];
    return goal || null;
};

// 특정 액션 가져오기
export const useAction = (actionId: string) => {
    const action = useQuery(Action, (collection) => {
        try {
            return collection.filtered('_id == $0', new BSON.ObjectId(actionId));
        } catch (e) {
            return collection.filtered('false == true');
        }
    })[0];
    return action || null;
};

// 완료된 액션 목록 가져오기 (히스토리용)
export const useCompletedActions = (goalId?: string) => {
    if (goalId) {
        const goal = useGoal(goalId);
        return goal?.actions.filtered('status == "completed"').sorted('completedAt', true) || [];
    }

    // 전체 완료된 액션
    return useQuery(Action, (collection) => {
        return collection.filtered('status == "completed"').sorted('completedAt', true);
    });
};

// 데이터 삭제 헬퍼
export const useDataActions = () => {
    const realm = useRealm();

    const deleteGoal = (goal: Goal) => {
        realm.write(() => {
            // 연관된 액션들도 함께 삭제됨 (Realm의 cascade delete 설정에 따라 다르지만, 여기선 명시적 삭제 권장)
            // 현재 모델 설정상 cascade는 아니므로 수동 삭제 필요할 수 있음
            // 하지만 Realm.List에 포함된 객체는 부모 삭제시 자동 삭제되지 않으므로 주의
            realm.delete(goal.actions);
            realm.delete(goal);
        });
    };

    const deleteAction = (action: Action) => {
        realm.write(() => {
            realm.delete(action);
        });
    };

    return { deleteGoal, deleteAction };
};
