import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../constants/Colors'; // Import Colors

const HomeScreen: React.FC = () => {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView style={[styles.scrollViewContainer, { paddingTop: insets.top }]}>
      {/* Top Profile Bar Placeholder */}
      <View style={styles.profileBar}>
        <Text style={styles.profileGreeting}>Hello, User!</Text>
        {/* Placeholder for settings/notifications icon */}
        <View style={styles.profileIconPlaceholder} />
      </View>

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
          <View style={styles.squadImageArea}>
            {/* Placeholder for squad image */}
            <View style={styles.squadImage} />
            {/* Placeholder for user avatars */}
            <View style={styles.avatarStack}>
              <View style={[styles.avatar, { left: 0 }]} />
              <View style={[styles.avatar, { left: 15, backgroundColor: '#FFD700' }]} />
              <Text style={styles.moreUsers}>+2</Text>
            </View>
          </View>
          <Text style={styles.squadOnline}>● 4 members online</Text>
        </View>

        {/* Announcements List Section */}
        <View style={styles.announcementsCard}>
          <Text style={styles.announcementsTitle}>Announcements</Text>
          {/* Placeholder for announcement items */}
          <View style={styles.announcementItem}>
            <View style={[styles.announcementIcon, { backgroundColor: 'blue' }]} />
            <Text style={styles.announcementText}>New update released!</Text>
          </View>
          <View style={styles.announcementItem}>
            <View style={[styles.announcementIcon, { backgroundColor: 'orange' }]} />
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
    backgroundColor: Colors.background, // Background (Light Gray)
  },
  container: {
    padding: 16,
  },
  profileBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: Colors.background, // Assuming the profile bar will be part of the general background
  },
  profileGreeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text.primary,
  },
  profileIconPlaceholder: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.text.tertiary, // Placeholder color
  },
  dashboardCard: {
    backgroundColor: Colors.card, // Card Background
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
    color: Colors.text.primary, // Primary (Black/Dark Gray)
  },
  badge: {
    backgroundColor: Colors.accent.successIndicator, // Success Indicator
    borderRadius: 15,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  badgeText: {
    color: Colors.card,
    fontSize: 12,
    fontWeight: 'bold',
  },
  progressBarBackground: {
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.background, // E0E0E0 is close to background
    marginBottom: 8,
  },
  progressBarFill: {
    width: '60%', // Example fill
    height: '100%',
    backgroundColor: Colors.primary, // Brand Primary (Quest Green)
    borderRadius: 4,
  },
  goalText: {
    fontSize: 14,
    color: Colors.text.secondary, // Secondary (Medium Gray)
  },
  squadCard: {
    backgroundColor: Colors.card, // Card Background
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
    color: Colors.text.primary, // Primary (Black/Dark Gray)
    marginBottom: 8,
  },
  squadImageArea: {
    height: 100, // Placeholder height
    backgroundColor: Colors.background, // Placeholder for image, using background color
    borderRadius: 8,
    marginBottom: 8,
    justifyContent: 'flex-end',
    position: 'relative',
  },
  squadImage: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.text.tertiary, // Placeholder image color, using tertiary
    borderRadius: 8,
  },
  avatarStack: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 8,
    left: 8,
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.primary, // Example avatar color
    borderWidth: 1.5,
    borderColor: Colors.card,
    marginRight: -10, // Overlap avatars
  },
  moreUsers: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.text.tertiary, // Tertiary color for more users
    textAlign: 'center',
    lineHeight: 24,
    fontSize: 10,
    color: Colors.card,
    borderWidth: 1.5,
    borderColor: Colors.card,
    marginLeft: 5,
  },
  squadOnline: {
    fontSize: 14,
    color: Colors.text.secondary, // Secondary (Medium Gray)
  },
  announcementsCard: {
    backgroundColor: Colors.card, // Card Background
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
    color: Colors.text.primary, // Primary (Black/Dark Gray)
    marginBottom: 8,
  },
  announcementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.background, // Using background for light gray separator
  },
  announcementIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  announcementText: {
    fontSize: 14,
    color: Colors.text.primary, // Primary (Black/Dark Gray)
  },
});

export default HomeScreen;