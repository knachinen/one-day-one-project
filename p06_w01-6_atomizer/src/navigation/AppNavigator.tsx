import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useQuery } from '@realm/react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoalInputScreen, ActionCreateScreen, MainScreen } from '../screens';
import { useActiveGoal } from '../hooks';

export type RootStackParamList = {
    GoalInput: undefined;
    ActionCreate: { goalId: string };
    Main: { actionId: string };
};

const Stack = createStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
    const [initialRoute, setInitialRoute] = useState<keyof RootStackParamList | null>(null);
    const [routeParams, setRouteParams] = useState<any>(null);

    const currentGoal = useActiveGoal();

    useEffect(() => {
        determineInitialRoute();
    }, []);

    const determineInitialRoute = async () => {
        try {
            // AsyncStorage에서 현재 상태 확인
            const currentGoalId = await AsyncStorage.getItem('current_goal_id');
            const currentActionId = await AsyncStorage.getItem('current_action_id');

            // 현재 액션이 있으면 MainScreen으로
            if (currentActionId) {
                setInitialRoute('Main');
                setRouteParams({ actionId: currentActionId });
                return;
            }

            // 현재 목표가 있으면 ActionCreateScreen으로
            if (currentGoalId) {
                setInitialRoute('ActionCreate');
                setRouteParams({ goalId: currentGoalId });
                return;
            }

            // 아무것도 없으면 GoalInputScreen으로
            setInitialRoute('GoalInput');
        } catch (error) {
            console.error('초기 라우트 결정 실패:', error);
            setInitialRoute('GoalInput');
        }
    };

    // 초기 라우트가 결정될 때까지 대기
    if (!initialRoute) {
        return null; // 또는 로딩 스피너
    }

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={initialRoute}
                screenOptions={{
                    headerShown: false,
                    cardStyle: { backgroundColor: 'white' },
                }}
            >
                <Stack.Screen name="GoalInput">
                    {({ navigation }) => (
                        <GoalInputScreen
                            onGoalCreated={() => {
                                // 목표 생성 후 액션 생성 화면으로
                                if (currentGoal) {
                                    navigation.replace('ActionCreate', {
                                        goalId: currentGoal._id.toString(),
                                    });
                                }
                            }}
                        />
                    )}
                </Stack.Screen>

                <Stack.Screen name="ActionCreate">
                    {({ route, navigation }) => (
                        <ActionCreateScreen
                            goalId={(route.params as any)?.goalId || currentGoal?._id.toString() || ''}
                            onActionCreated={async () => {
                                // 액션 생성 후 메인 화면으로
                                const actionId = await AsyncStorage.getItem('current_action_id');
                                if (actionId) {
                                    navigation.replace('Main', { actionId });
                                }
                            }}
                        />
                    )}
                </Stack.Screen>

                <Stack.Screen name="Main">
                    {({ route, navigation }) => (
                        <MainScreen
                            actionId={(route.params as any)?.actionId || ''}
                            onActionCompleted={() => {
                                // 액션 완료 후 다시 액션 생성 화면으로
                                if (currentGoal) {
                                    navigation.replace('ActionCreate', {
                                        goalId: currentGoal._id.toString(),
                                    });
                                }
                            }}
                        />
                    )}
                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
};
