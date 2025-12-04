import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../types/navigation';
import MainMapScreen from '../screens/MainMapScreen';
import LocationListScreen from '../screens/LocationListScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
    console.log('[Nav] Rendering AppNavigator');
    return (
        <Stack.Navigator initialRouteName="MainMap">
            <Stack.Screen
                name="MainMap"
                component={MainMapScreen}
                options={{
                    title: 'Where I Was',
                    headerTransparent: true,
                    headerBackground: () => (
                        <View style={{
                            flex: 1,
                            backgroundColor: 'rgba(255, 255, 255, 0.5)'
                        }} />
                    ),
                    headerRight: () => null, // Will be set from MainMapScreen
                }}
            />
            <Stack.Screen name="LocationList" component={LocationListScreen} options={{ title: 'History' }} />
            <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings' }} />
        </Stack.Navigator>
    );
}
