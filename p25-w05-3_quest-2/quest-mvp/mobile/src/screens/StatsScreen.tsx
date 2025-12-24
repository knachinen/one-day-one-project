import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../constants/Colors';

const StatsScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  return (
    <ScrollView style={[styles.container, { paddingTop: insets.top, backgroundColor: Colors.background }]}>
      <View style={styles.content}>
        <Text style={styles.title}>Stats Screen</Text>

        {/* Placeholder for stats content */}
        <View style={styles.statsCard}>
          <Text style={styles.statsText}>Focus Time</Text>
          <Text style={styles.statsValue}>12h 30m</Text>
        </View>

        <View style={styles.statsCard}>
          <Text style={styles.statsText}>Completion Rate</Text>
          <Text style={styles.statsValue}>85%</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text.primary,
    marginBottom: 16,
  },
  statsCard: {
    backgroundColor: Colors.card,
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statsText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: 8,
  },
  statsValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
  }
});

export default StatsScreen;
