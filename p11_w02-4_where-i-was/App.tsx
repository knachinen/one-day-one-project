import './src/utils/disableConsole'; // Disable console logs (set ENABLE_LOGS to true to re-enable)
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { initDB } from './src/db';
// import './src/services/LocationTask'; // Background task disabled for manual mode

export default function App() {
  console.log('[App] Rendering App component');

  React.useEffect(() => {
    console.log('[App] useEffect mounted');
    initDB()
      .then(() => console.log('[App] initDB completed'))
      .catch((err) => console.error('[App] initDB failed:', err));
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
