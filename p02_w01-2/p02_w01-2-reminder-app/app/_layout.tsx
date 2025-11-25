import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import React, { useEffect, useState, useRef } from 'react';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { initDatabase } from '../src/services/DatabaseService';
import { registerForPushNotificationsAsync } from '../src/services/NotificationService';
import { ActivityIndicator, View, Text } from 'react-native';
import * as Notifications from 'expo-notifications';

export const unstable_settings = {
  initialRouteName: 'index',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [appReady, setAppReady] = useState(false);
  const [initError, setInitError] = useState<string | null>(null);

  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  useEffect(() => {
    const initializeApp = async () => {
      try {
        await initDatabase();
        await registerForPushNotificationsAsync();

        Notifications.setNotificationHandler({
          handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: true,
            shouldSetBadge: false,
          }),
        });

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
          console.log('Notification received in foreground:', notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
          console.log('Notification response received:', response);
          const { notification } = response;
          const { data } = notification.request.content;
          if (data && data.reminderId) {
            console.log(`User tapped on reminder ID: ${data.reminderId}`);
            // TODO: Navigate to detail page.
          }
        });

        setAppReady(true);
      } catch (e: any) {
        setInitError(e.message || 'Unknown initialization error');
        console.error('Failed to initialize app:', e);
      }
    };
    initializeApp();

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current!);
      Notifications.removeNotificationSubscription(responseListener.current!);
    };
  }, []);

  if (initError) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'red' }}>Error during app initialization: {initError}</Text>
      </View>
    );
  }

  if (!appReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading app...</Text>
      </View>
    );
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" redirect={false} options={{ headerShown: false }} />
        <Stack.Screen name="create" options={{ title: 'Create Reminder' }} />
        <Stack.Screen name="detail/[id]" options={{ title: 'Reminder Details' }} />
        <Stack.Screen name="completed" options={{ title: 'Completed Reminders' }} /> {/* Added completed screen */}
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
