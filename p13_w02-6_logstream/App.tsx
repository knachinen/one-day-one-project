import { StatusBar } from "expo-status-bar";
import "react-native-gesture-handler";
import React from "react";
import { AppNavigator } from "./src/navigation/AppNavigator";
import { useLogStream } from "./src/hooks/useLogStream";

export default function App() {
  useLogStream();
  return (
    <>
      <AppNavigator />
      <StatusBar style="dark" />
    </>
  );
}
