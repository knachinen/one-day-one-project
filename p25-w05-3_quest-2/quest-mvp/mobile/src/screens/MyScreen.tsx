import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../constants/Colors';

const MyScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  return (
    <ScrollView style={[styles.container, { paddingTop: insets.top, backgroundColor: Colors.background }]}>
      <View style={styles.content}>
        <Text style={styles.title}>My Profile</Text>

        {/* Placeholder for profile content */}
        <View style={styles.profileCard}>
          <Text style={styles.profileText}>User Settings</Text>
          <Text style={styles.profileSubtext}>Manage your account</Text>
        </View>

        <View style={styles.profileCard}>
          <Text style={styles.profileText}>Achievements</Text>
          <Text style={styles.profileSubtext}>View your progress</Text>
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
  profileCard: {
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
  profileText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: 8,
  },
  profileSubtext: {
    fontSize: 14,
    color: Colors.text.secondary,
  }
});

export default MyScreen;
