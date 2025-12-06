import { StatusBar } from "expo-status-bar";
import "react-native-gesture-handler";
import React from "react";
import { AppNavigator } from "./src/navigation/AppNavigator";
import { useLogStream } from "./src/hooks/useLogStream";
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  useLogStream();
  return (
    <SafeAreaProvider>
      <AppNavigator />
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}
