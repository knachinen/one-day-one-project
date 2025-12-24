import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const HomeScreen: React.FC = () => {
  return (
    <ScrollView style={styles.scrollViewContainer}>
      <View style={styles.container}>
        {/* Top Dashboard Section */}
        <View style={styles.dashboardCard}>
          <View style={styles.focusTimeContainer}>
            <Text style={styles.focusTime}>03h 45m</Text>
            {/* Placeholder for Increase/Decrease Badge */}
            <View style={styles.badge}>
              <Text style={styles.badgeText}>+12%</Text>
            </View>
          </View>
          {/* Placeholder for Progress Bar */}
          <View style={styles.progressBarBackground}>
            <View style={styles.progressBarFill} />
          </View>
          <Text style={styles.goalText}>Goal: 05h 00m</Text>
        </View>

        {/* My Squads Card Section */}
        <View style={styles.squadCard}>
          <Text style={styles.squadTitle}>My Squads</Text>
          {/* Placeholder for squad image and online status */}
          <View style={styles.squadContent}>
            <Text style={styles.squadOnline}>● 4 members online</Text>
          </View>
        </View>

        {/* Announcements List Section */}
        <View style={styles.announcementsCard}>
          <Text style={styles.announcementsTitle}>Announcements</Text>
          {/* Placeholder for announcement items */}
          <View style={styles.announcementItem}>
            <Text style={styles.announcementText}>New update released!</Text>
          </View>
          <View style={styles.announcementItem}>
            <Text style={styles.announcementText}>Meeting tomorrow at 10 AM.</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flex: 1,
    backgroundColor: '#F7F8F9', // Background (Light Gray)
  },
  container: {
    padding: 16,
  },
  dashboardCard: {
    backgroundColor: '#FFFFFF', // Card Background
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  focusTimeContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  focusTime: {
    fontSize: 36, // Dashboard Timer size
    fontWeight: '800', // Extra-Bold
    color: '#111111', // Primary (Black/Dark Gray)
  },
  badge: {
    backgroundColor: '#4CAF50', // Success Indicator
    borderRadius: 15,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  progressBarBackground: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E0E0E0',
    marginBottom: 8,
  },
  progressBarFill: {
    width: '60%', // Example fill
    height: '100%',
    backgroundColor: '#66CC66', // Brand Primary (Quest Green)
    borderRadius: 4,
  },
  goalText: {
    fontSize: 14,
    color: '#666666', // Secondary (Medium Gray)
  },
  squadCard: {
    backgroundColor: '#FFFFFF', // Card Background
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  squadTitle: {
    fontSize: 18, // Heading size
    fontWeight: 'bold',
    color: '#111111', // Primary (Black/Dark Gray)
    marginBottom: 8,
  },
  squadContent: {
    // Placeholder for image and avatars
  },
  squadOnline: {
    fontSize: 14,
    color: '#666666', // Secondary (Medium Gray)
  },
  announcementsCard: {
    backgroundColor: '#FFFFFF', // Card Background
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  announcementsTitle: {
    fontSize: 18, // Heading size
    fontWeight: 'bold',
    color: '#111111', // Primary (Black/Dark Gray)
    marginBottom: 8,
  },
  announcementItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F7F8F9',
  },
  announcementText: {
    fontSize: 14,
    color: '#111111', // Primary (Black/Dark Gray)
  },
});

export default HomeScreen;