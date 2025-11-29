import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { RealmProvider } from './src/context/RealmContext';
import { AppNavigator } from './src/navigation';
import notifee, { EventType } from '@notifee/react-native';
import { useEffect } from 'react';
import { LogBox } from 'react-native';

// Ignore specific warnings if needed
LogBox.ignoreLogs(['new NativeEventEmitter']);

export default function App() {
  useEffect(() => {
    // Foreground events
    const unsubscribe = notifee.onForegroundEvent(({ type, detail }) => {
      if (type === EventType.PRESS) {
        // Navigation logic will be handled by the navigator if mounted,
        // or we can use a navigation ref if needed.
        // For now, let's rely on the app being open and state updates.
        console.log('Notification pressed:', detail.notification);
      }
    });

    return unsubscribe;
  }, []);

  return (
    <RealmProvider>
      <StatusBar style="auto" />
      <AppNavigator />
    </RealmProvider>
  );
}
