import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { PermissionScreen } from '../screens/PermissionScreen';
import { MainScreen } from '../screens/MainScreen';
import { LogDetailScreen } from '../screens/LogDetailScreen';
import { SettingsScreen } from '../screens/SettingsScreen';

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Permission">
                <Stack.Screen name="Permission" component={PermissionScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }} />
                <Stack.Screen name="LogDetail" component={LogDetailScreen} />
                <Stack.Screen name="Settings" component={SettingsScreen} options={{ presentation: 'modal' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
