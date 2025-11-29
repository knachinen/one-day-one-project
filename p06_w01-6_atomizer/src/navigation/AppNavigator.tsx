import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useQuery } from '@realm/react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoalInputScreen, ActionCreateScreen, MainScreen, GoalSelectionScreen } from '../screens';
import { useActiveGoal } from '../hooks';
import Realm from 'realm'; // Import Realm for flags
import { Goal } from '../models'; // Import Goal model for useQuery

export type RootStackParamList = {
    GoalInput: { goalId?: string };
    GoalSelection: undefined;
    ActionCreate: { goalId: string };
    Main: { actionId: string; goalId: string };
};

const Stack = createStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
    const [initialRoute, setInitialRoute] = useState<keyof RootStackParamList | null>(null);
    const [routeParams, setRouteParams] = useState<any>(null);

    const activeGoal = useActiveGoal();
    const goals = useQuery(Goal); // Use useQuery to get all goals

    useEffect(() => {
        // Set the flag at the earliest possible point if not already set globally
        // This is a global flag, so setting it multiple times is fine, but it needs to be set before Realm.open
        Realm.flags.THROW_ON_GLOBAL_REALM = true;

        determineInitialRoute();
    }, [activeGoal, goals.length]); // Add goals.length to dependencies

    const determineInitialRoute = async () => {
        try {
            // Check for an active goal first
            if (activeGoal) {
                // If there's an active action for this goal, go to MainScreen
                const currentActionId = await AsyncStorage.getItem(`current_action_id_for_${activeGoal._id.toHexString()}`);
                if (currentActionId) {
                    setInitialRoute('Main');
                    setRouteParams({ actionId: currentActionId, goalId: activeGoal._id.toHexString() });
                    return;
                }
                // Otherwise, go to ActionCreateScreen for the active goal
                setInitialRoute('ActionCreate');
                setRouteParams({ goalId: activeGoal._id.toHexString() });
                return;
            }

            // If no active goal, check if any goals exist using the useQuery result
            if (goals.length > 0) {
                setInitialRoute('GoalSelection'); // If goals exist but none are active, go to selection
                return;
            }

            // If no goals at all, go to GoalInputScreen
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
                <Stack.Screen name="GoalSelection" component={GoalSelectionScreen} />
                <Stack.Screen name="GoalInput">
                    {({ navigation, route }) => (
                        <GoalInputScreen
                            navigation={navigation}
                            route={route}
                            onGoalCreated={(goalId?: string) => {
                                // 목표 생성 후 목표 선택 화면으로
                                navigation.replace('GoalSelection');
                            }}
                        />
                    )}
                </Stack.Screen>

                <Stack.Screen name="ActionCreate"
                    initialParams={initialRoute === 'ActionCreate' ? routeParams : undefined}
                >
                    {({ navigation }) => (
                        <ActionCreateScreen
                            navigation={navigation}
                            goalId={routeParams?.goalId || activeGoal?._id.toHexString() || ''}
                            onActionCreated={async () => {
                                // 액션 생성 후 메인 화면으로
                                if (activeGoal) {
                                    const actionId = await AsyncStorage.getItem(`current_action_id_for_${activeGoal._id.toHexString()}`);
                                    if (actionId) {
                                        navigation.replace('Main', { actionId, goalId: activeGoal._id.toHexString() });
                                    }
                                }
                            }}
                        />
                    )}
                </Stack.Screen>

                <Stack.Screen name="Main"
                    initialParams={initialRoute === 'Main' ? routeParams : undefined}
                >
                    {({ route, navigation }) => (
                        <MainScreen
                            actionId={(route.params as any)?.actionId || ''}
                            goalId={(route.params as any)?.goalId || ''}
                            onActionCompleted={() => {
                                // 액션 완료 후 다시 액션 생성 화면으로
                                if (activeGoal) {
                                    navigation.replace('ActionCreate', {
                                        goalId: activeGoal._id.toHexString(),
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
