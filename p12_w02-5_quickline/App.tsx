import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MainScreen } from './src/screens/MainScreen';
import { ContactsScreen } from './src/screens/ContactsScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { OnboardingScreen } from './src/screens/OnboardingScreen';
import { initDatabase } from './src/utils/db';
import { COLORS } from './src/constants/theme';

const Stack = createStackNavigator();

export default function App() {
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);

  useEffect(() => {
    const initialize = async () => {
      try {
        await initDatabase();
        const hasLaunched = await AsyncStorage.getItem('hasLaunched');
        setIsFirstLaunch(hasLaunched === null);
      } catch (err) {
        console.error('Init Failed', err);
        setIsFirstLaunch(false); // Fallback to main screen on error
      }
    };
    initialize();
  }, []);

  if (isFirstLaunch === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
        initialRouteName={isFirstLaunch ? 'Onboarding' : 'Main'}
        screenOptions={{
          headerStyle: {
            backgroundColor: COLORS.background,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTintColor: COLORS.text,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="Onboarding"
          component={OnboardingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Contacts"
          component={ContactsScreen}
          options={{ title: 'Emergency Contacts' }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ title: 'Medical Profile' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaProvider>
  );
}
