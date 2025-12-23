import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HomeScreen from '../screens/HomeScreen';
import StatsScreen from '../screens/StatsScreen';
import SquadScreen from '../screens/SquadScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { COLORS, spacing, shadows } from '../constants/theme';

const Tab = createBottomTabNavigator();

// Custom TabBarButton for the central FAB
const CustomTabBarButton = ({ children, onPress }) => (
  <TouchableOpacity
    style={styles.fabContainer}
    onPress={onPress}
  >
    <View style={styles.fab}>
      {children}
    </View>
  </TouchableOpacity>
);

// Updated icon components
const TabIcon = ({ name, focused }) => {
  const iconName = focused ? name : `${name}-outline`;
  // This is a placeholder for a real icon library like Ionicons or Feather
  const mockIcons = {
    'Home': '🏠', 'Home-outline': '🏡',
    'Stats': '📊', 'Stats-outline': '📈',
    'Squad': '👥', 'Squad-outline': '👤',
    'Profile': '⚙️', 'Profile-outline': '🔧',
  };
  return (
    <View style={styles.iconContainer}>
      <Text style={[styles.icon, { color: focused ? COLORS.PRIMARY : COLORS.TEXT_SUB }]}>
        {mockIcons[iconName]}
      </Text>
    </View>
  );
};

export default function MainNavigator() {
  const insets = useSafeAreaInsets();
  const tabBarHeight = 80; // Increased height for icon space

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: COLORS.WHITE,
          borderRadius: 0,
          height: tabBarHeight + insets.bottom,
          paddingBottom: insets.bottom,
          paddingTop: 0,
          borderWidth: 0,
          borderTopWidth: 0,
          ...shadows.md,
        },
        tabBarItemStyle: {
          paddingTop: 12,
          paddingBottom: 18, // Ensure space at bottom to prevent cutoff
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon name="Home" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Stats"
        component={StatsScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon name="Stats" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Start"
        component={() => null} // Dummy component
        options={{
          tabBarIcon: () => <Text style={styles.fabIcon}>▶</Text>,
          tabBarButton: (props) => (
            <CustomTabBarButton {...props} onPress={() => alert('Start Session!')} />
          ),
        }}
      />
      <Tab.Screen
        name="Squad"
        component={SquadScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon name="Squad" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon name="Profile" focused={focused} />,
        }}
      />
    </Tab.Navigator>
  );
}

// Constants for consistent sizing
const TAB_BAR_HEIGHT = 70;
const FAB_SIZE = 70;

const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50, // Explicit height to contain icons
  },
  icon: {
    fontSize: 22, // Slightly smaller for better fit
  },
  fabContainer: {
    top: -30,
    flex: 1,
    width: 90,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fab: {
    width: FAB_SIZE,
    height: FAB_SIZE,
    borderRadius: FAB_SIZE / 2,
    backgroundColor: COLORS.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.lg,
  },
  fabIcon: {
    fontSize: 28,
    color: COLORS.WHITE,
    lineHeight: 28,
    textAlign: 'center',
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
});