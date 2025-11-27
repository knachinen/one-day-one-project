import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { BrowserScreen } from './src/screens/BrowserScreen';
import { BookmarksScreen } from './src/screens/BookmarksScreen';
import { HistoryScreen } from './src/screens/HistoryScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';
import { COLORS } from './src/constants/theme';
import { Settings } from './src/types';
import { getSettings, saveSettings } from './src/utils/storage';

const Tab = createBottomTabNavigator();

export default function App() {
    const [settings, setSettings] = useState<Settings>({
        defaultSearchEngine: 'google',
        isDarkMode: false,
        clearCacheOnExit: false,
    });

    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        const savedSettings = await getSettings();
        setSettings(savedSettings);
    };

    const handleUpdateSettings = async (newSettings: Settings) => {
        setSettings(newSettings);
        await saveSettings(newSettings);
    };

    const isDarkMode = settings.isDarkMode;

    return (
        <SafeAreaProvider>
            <TabNavigator isDarkMode={isDarkMode} settings={settings} onUpdateSettings={handleUpdateSettings} />
        </SafeAreaProvider>
    );
}

function TabNavigator({ isDarkMode, settings, onUpdateSettings }: { isDarkMode: boolean; settings: Settings; onUpdateSettings: (settings: Settings) => void }) {
    const insets = useSafeAreaInsets();

    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName: keyof typeof Ionicons.glyphMap;

                        if (route.name === 'Browser') {
                            iconName = focused ? 'globe' : 'globe-outline';
                        } else if (route.name === 'Bookmarks') {
                            iconName = focused ? 'bookmark' : 'bookmark-outline';
                        } else if (route.name === 'History') {
                            iconName = focused ? 'time' : 'time-outline';
                        } else if (route.name === 'Settings') {
                            iconName = focused ? 'settings' : 'settings-outline';
                        } else {
                            iconName = 'help-outline';
                        }

                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: COLORS.primary,
                    tabBarInactiveTintColor: isDarkMode ? COLORS.textSecondaryDark : COLORS.textSecondary,
                    tabBarStyle: {
                        backgroundColor: isDarkMode ? COLORS.surfaceDark : COLORS.surface,
                        borderTopColor: isDarkMode ? COLORS.borderDark : COLORS.border,
                        borderTopWidth: 1,
                        paddingBottom: Math.max(insets.bottom + 8, 13),
                        paddingTop: 5,
                        height: 60 + Math.max(insets.bottom + 8, 8),
                    },
                    headerShown: false,
                    tabBarLabelStyle: {
                        fontSize: 12,
                        fontWeight: '600',
                    },
                })}
            >
                <Tab.Screen name="Browser">
                    {() => (
                        <BrowserScreen
                            isDarkMode={isDarkMode}
                            searchEngine={settings.defaultSearchEngine}
                        />
                    )}
                </Tab.Screen>
                <Tab.Screen name="Bookmarks">
                    {() => <BookmarksScreen isDarkMode={isDarkMode} />}
                </Tab.Screen>
                <Tab.Screen name="History">
                    {() => <HistoryScreen isDarkMode={isDarkMode} />}
                </Tab.Screen>
                <Tab.Screen name="Settings">
                    {() => (
                        <SettingsScreen
                            settings={settings}
                            onUpdateSettings={onUpdateSettings}
                            isDarkMode={isDarkMode}
                        />
                    )}
                </Tab.Screen>
            </Tab.Navigator>
        </NavigationContainer>
    );
}
