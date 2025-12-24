import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import FABButton from './FABButton'; // Import FABButton

const CustomTabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={styles.tabBarContainer}>
      <View style={styles.tabBar}>
        {/* First tab (Home) */}
        {state.routes[0] && (() => {
          const route = state.routes[0];
          const { options } = descriptors[route.key];
          const isFocused = state.index === 0;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
              activeOpacity={0.6} // Add interactive feedback
            >
              {options.tabBarIcon && options.tabBarIcon({ focused: isFocused, color: isFocused ? Colors.primary : Colors.text.tertiary, size: 24 })}
            </TouchableOpacity>
          );
        })()}

        {/* Second tab (Stats) */}
        {state.routes[1] && (() => {
          const route = state.routes[1];
          const { options } = descriptors[route.key];
          const isFocused = state.index === 1;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
              activeOpacity={0.6} // Add interactive feedback
            >
              {options.tabBarIcon && options.tabBarIcon({ focused: isFocused, color: isFocused ? Colors.primary : Colors.text.tertiary, size: 24 })}
            </TouchableOpacity>
          );
        })()}

        {/* Empty space for FAB */}
        <View style={{ flex: 1.5 }} />

        {/* Third tab (Squad) */}
        {state.routes[2] && (() => {
          const route = state.routes[2];
          const { options } = descriptors[route.key];
          const isFocused = state.index === 2;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
              activeOpacity={0.6} // Add interactive feedback
            >
              {options.tabBarIcon && options.tabBarIcon({ focused: isFocused, color: isFocused ? Colors.primary : Colors.text.tertiary, size: 24 })}
            </TouchableOpacity>
          );
        })()}

        {/* Fourth tab (MY) */}
        {state.routes[3] && (() => {
          const route = state.routes[3];
          const { options } = descriptors[route.key];
          const isFocused = state.index === 3;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
              activeOpacity={0.6} // Add interactive feedback
            >
              {options.tabBarIcon && options.tabBarIcon({ focused: isFocused, color: isFocused ? Colors.primary : Colors.text.tertiary, size: 24 })}
            </TouchableOpacity>
          );
        })()}
      </View>
      <View style={styles.fabContainer}>
        <FABButton onPress={() => console.log('Start button pressed')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 0,
    height: 80, // Tab bar height + floating amount
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: Colors.card,
    borderTopWidth: 0,
    elevation: 10, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    height: 70, // Actual tab bar height
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  fabContainer: {
    position: 'absolute',
    alignSelf: 'center',
    top: -15, // Position above the tab bar
    zIndex: 10, // Ensure FAB is above the tab bar
  },
});

export default CustomTabBar;