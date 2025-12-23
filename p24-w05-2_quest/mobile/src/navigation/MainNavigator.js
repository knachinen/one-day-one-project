import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
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
  return <Text style={[styles.icon, { color: focused ? COLORS.PRIMARY : COLORS.TEXT_SUB }]}>{mockIcons[iconName]}</Text>;
};

export default function MainNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false, // Hiding header for all screens as per new design
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 25,
          left: 20,
          right: 20,
          elevation: 0,
          backgroundColor: COLORS.WHITE,
          borderRadius: 15,
          height: 70,
          // 목업 수준의 부드러운 그림자 적용
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.05,
          shadowRadius: 10,
          elevation: 3,
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

const styles = StyleSheet.create({
  icon: {
    fontSize: 24,
  },
  fabContainer: {
    top: -30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fab: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: COLORS.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.lg,
  },
  fabIcon: {
    fontSize: 24,
    color: COLORS.WHITE,
  },
});