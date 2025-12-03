import React, { createRef } from 'react';
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HistoryScreen from '../screens/HistoryScreen';
import EditorScreen from '../screens/EditorScreen';
import BookmarkletScreen from '../screens/BookmarkletScreen';
import { RootStackParamList } from '../types/navigation';

const Stack = createStackNavigator<RootStackParamList>();

// Create a ref for navigation
export const navigationRef = createRef<NavigationContainerRef<RootStackParamList>>();

export function navigate(name: keyof RootStackParamList, params?: any) {
    if (navigationRef.current) {
        navigationRef.current.navigate(name, params);
    }
}

export default function AppNavigator() {
    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator initialRouteName="Notes">
                <Stack.Screen name="Notes" component={HistoryScreen} />
                <Stack.Screen name="Editor" component={EditorScreen} />
                <Stack.Screen name="Bookmarklet" component={BookmarkletScreen} options={{ title: '북마클릿 설정' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
