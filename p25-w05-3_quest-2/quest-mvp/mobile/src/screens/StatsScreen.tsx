import React from 'react';
import { View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../constants/Colors';

const StatsScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  return (
    <View className="flex-1 justify-center items-center" style={{ paddingTop: insets.top, backgroundColor: Colors.background }}>
      <Text className="text-lg font-pretendard-bold text-text-primary">Stats Screen</Text>
    </View>
  );
};

export default StatsScreen;
