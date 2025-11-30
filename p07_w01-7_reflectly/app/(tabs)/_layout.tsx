import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.text.secondary,
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
            backgroundColor: Colors.cardBackground,
            borderTopColor: Colors.border,
          },
          default: {
            backgroundColor: Colors.cardBackground,
            borderTopColor: Colors.border,
          },
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: '오늘의 저널',
          tabBarIcon: ({ color }) => <Ionicons name="create-outline" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: '기록',
          tabBarIcon: ({ color }) => <Ionicons name="book-outline" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="insights"
        options={{
          title: '회고',
          tabBarIcon: ({ color }) => <Ionicons name="analytics-outline" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: '설정',
          tabBarIcon: ({ color }) => <Ionicons name="settings-outline" size={28} color={color} />,
        }}
      />
    </Tabs>
  );
}
