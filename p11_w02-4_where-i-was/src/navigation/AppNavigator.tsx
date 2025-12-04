import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import MainMapScreen from '../screens/MainMapScreen';
import LocationListScreen from '../screens/LocationListScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
    console.log('[Nav] Rendering AppNavigator');
    return (
        <Stack.Navigator initialRouteName="MainMap">
            <Stack.Screen name="MainMap" component={MainMapScreen} options={{ title: 'Where I Was' }} />
            <Stack.Screen name="LocationList" component={LocationListScreen} options={{ title: 'History' }} />
            <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings' }} />
        </Stack.Navigator>
    );
}
