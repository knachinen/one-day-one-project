import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../constants/Colors';
import { useTailwind } from 'nativewind';

const SquadScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { tw } = useTailwind();
  return (
    <View style={[tw('flex-1 justify-center items-center'), { paddingTop: insets.top, backgroundColor: Colors.background }]}>
      <Text style={tw('text-lg font-pretendard-bold text-text-primary')}>Squad Screen</Text>
    </View>
  );
};

export default SquadScreen;
