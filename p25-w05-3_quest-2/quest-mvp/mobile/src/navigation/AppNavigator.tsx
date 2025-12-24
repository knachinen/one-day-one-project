import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/Home';
import StatsScreen from '../screens/StatsScreen';
import SquadScreen from '../screens/SquadScreen';
import MyScreen from '../screens/MyScreen';

const Tab = createBottomTabNavigator();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Stats" component={StatsScreen} />
        <Tab.Screen name="Squad" component={SquadScreen} />
        <Tab.Screen name="MY" component={MyScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
