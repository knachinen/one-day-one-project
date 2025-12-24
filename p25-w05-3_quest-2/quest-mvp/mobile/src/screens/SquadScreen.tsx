import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../constants/Colors';

const SquadScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  return (
    <ScrollView style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom, backgroundColor: Colors.background }]}>
      <View style={styles.content}>
        <Text style={styles.title}>My Squad</Text>

        {/* Placeholder for squad content */}
        <View style={styles.squadCard}>
          <Text style={styles.squadText}>Squad Members</Text>
          <Text style={styles.squadSubtext}>No squads yet</Text>
        </View>

        <View style={styles.squadCard}>
          <Text style={styles.squadText}>Squad Activity</Text>
          <Text style={styles.squadSubtext}>No activity yet</Text>
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
  squadCard: {
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
  squadText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text.primary,
    marginBottom: 8,
  },
  squadSubtext: {
    fontSize: 14,
    color: Colors.text.secondary,
  }
});

export default SquadScreen;
