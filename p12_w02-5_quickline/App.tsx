import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, Pressable, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { MainScreen } from "./src/screens/MainScreen";
import { ContactsScreen } from "./src/screens/ContactsScreen";
import { ProfileScreen } from "./src/screens/ProfileScreen";
import { OnboardingScreen } from "./src/screens/OnboardingScreen";
import { initDatabase } from "./src/utils/db";
import { COLORS } from "./src/constants/theme";

const Stack = createStackNavigator();

export default function App() {
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);
  const [dbInitialized, setDbInitialized] = useState<boolean>(false);
  const [dbError, setDbError] = useState<string | null>(null);

  useEffect(() => {
    const initialize = async () => {
      try {
        await initDatabase();
        setDbInitialized(true);
        const hasLaunched = await AsyncStorage.getItem("hasLaunched");
        setIsFirstLaunch(hasLaunched === null);
      } catch (err: any) {
        console.error("Init Failed", err);
        setDbError(err.message || "Failed to initialize database");
        setIsFirstLaunch(false); // Fallback to main screen on error, but also show db error
      }
    };
    initialize();
  }, []);

  if (!dbInitialized) {
    if (dbError) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: COLORS.background,
          }}
        >
          <Ionicons name="warning-outline" size={50} color={COLORS.error} />
          <Text
            style={{
              color: COLORS.error,
              fontSize: 18,
              textAlign: "center",
              marginTop: 10,
            }}
          >
            Error: {dbError}
          </Text>
          <Text
            style={{
              color: COLORS.textSecondary,
              fontSize: 14,
              textAlign: "center",
              marginTop: 5,
            }}
          >
            Please restart the app.
          </Text>
        </View>
      );
    }
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  // Rest of the App component rendering logic follows
  // ...

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={isFirstLaunch ? "Onboarding" : "Main"}
          screenOptions={{
            headerStyle: {
              backgroundColor: COLORS.background,
              elevation: 0,
              shadowOpacity: 0,
            },
            headerTintColor: COLORS.text,
            headerTitleStyle: {
              fontWeight: "bold",
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
            options={({ navigation }) => ({
              title: "Emergency Contacts",
              headerRight: () => (
                <Pressable
                  onPress={() => navigation.navigate("Onboarding")}
                  style={{ marginRight: 15 }}
                >
                  <Ionicons
                    name="information-circle-outline"
                    size={24}
                    color={COLORS.text}
                  />
                </Pressable>
              ),
            })}
          />
          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{ title: "Medical Profile" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
