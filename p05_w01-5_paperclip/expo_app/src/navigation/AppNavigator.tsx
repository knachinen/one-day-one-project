import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme';

import MemoListScreen from '../screens/MemoListScreen';
import CreateMemoScreen from '../screens/CreateMemoScreen';
import MemoDetailScreen from '../screens/MemoDetailScreen';
import ArchiveScreen from '../screens/ArchiveScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="MemoList" component={MemoListScreen} />
            <Stack.Screen name="CreateMemo" component={CreateMemoScreen} />
            <Stack.Screen name="MemoDetail" component={MemoDetailScreen} />
        </Stack.Navigator>
    );
}

export default function AppNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: theme.colors.primary,
                tabBarInactiveTintColor: theme.colors.textSecondary,
                tabBarStyle: {
                    borderTopColor: theme.colors.border,
                    backgroundColor: theme.colors.background,
                    paddingBottom: 4,
                    paddingTop: 4,
                },
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName: keyof typeof Ionicons.glyphMap = 'home';

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Archive') {
                        iconName = focused ? 'archive' : 'archive-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
        >
            <Tab.Screen name="Home" component={MainStack} />
            <Tab.Screen name="Archive" component={ArchiveScreen} />
        </Tab.Navigator>
    );
}
