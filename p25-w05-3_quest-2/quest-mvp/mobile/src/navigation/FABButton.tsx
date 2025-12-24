import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';

interface FABButtonProps {
  onPress: () => void;
}

const FABButton: React.FC<FABButtonProps> = ({ onPress }) => (
  <TouchableOpacity
    style={styles.container}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View style={styles.fab}>
      <Ionicons name="play" size={24} color={Colors.card} />
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    top: -30, // Adjust this value to control how much it floats above the tab bar
    justifyContent: 'center',
    alignItems: 'center',
  },
  fab: {
    width: 65,
    height: 65,
    borderRadius: 32.5, // Make it circular
    backgroundColor: Colors.primary, // Green background
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
});

export default FABButton;