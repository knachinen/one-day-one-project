import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { RealmProvider } from './src/context/RealmContext';
import { AppNavigator } from './src/navigation';

export default function App() {
  return (
    <RealmProvider>
      <StatusBar style="auto" />
      <AppNavigator />
    </RealmProvider>
  );
}
