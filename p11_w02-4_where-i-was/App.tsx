import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { initDB } from './src/db';
// import './src/services/LocationTask'; // Background task disabled for manual mode

export default function App() {
  console.log('[App] Rendering App component');

  useEffect(() => {
    console.log('[App] useEffect mounted');
    initDB()
      .then(() => console.log('[App] initDB completed'))
      .catch((e) => console.error('[App] initDB error:', e));
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
