import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ChatroomScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Chatroom Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F8F9', // Use the background color from design system
  },
});

export default ChatroomScreen;
