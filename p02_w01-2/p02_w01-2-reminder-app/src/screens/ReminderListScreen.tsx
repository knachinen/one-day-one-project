import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, Button, StyleSheet, ActivityIndicator, Pressable, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getReminders, updateReminder } from '../services/DatabaseService';
import { Reminder } from '../data/ReminderModel';
import { useRouter } from 'expo-router';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated'; // Added Animated imports

type ReminderFilter = 'all' | 'pending' | 'completed';

const ReminderListScreen: React.FC = () => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<ReminderFilter>('all');
  const router = useRouter();

  const fetchReminders = async (currentFilter: ReminderFilter) => {
    try {
      setLoading(true);
      let query = 'SELECT * FROM reminders';
      let params: (number | string)[] = [];

      if (currentFilter === 'pending') {
        query += ' WHERE isCompleted = ?';
        params.push(0);
      } else if (currentFilter === 'completed') {
        query += ' WHERE isCompleted = ?';
        params.push(1);
      }
      query += ' ORDER BY date DESC, time DESC;';

      const fetchedReminders = await getReminders(query, params);
      setReminders(fetchedReminders);
      setError(null);
    } catch (e: any) {
      setError(e.message || 'Failed to fetch reminders');
      console.error('Error fetching reminders:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReminders(filter);
  }, [filter]);

  useFocusEffect(
    useCallback(() => {
      fetchReminders(filter);
    }, [filter])
  );

  const handleToggleComplete = async (reminder: Reminder) => {
    try {
      const updatedStatus = reminder.isCompleted === 0 ? 1 : 0;
      const updatedReminder = { ...reminder, isCompleted: updatedStatus };
      await updateReminder(updatedReminder);
      // Refresh the list after update
      fetchReminders(filter);
    } catch (e: any) {
      Alert.alert('Error', e.message || 'Failed to update reminder status.');
      console.error('Error updating reminder status:', e);
    }
  };

  const AnimatedPressable = Animated.createAnimatedComponent(Pressable); // Create Animated Pressable

  const renderItem = ({ item }: { item: Reminder }) => {
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{ scale: scale.value }],
      };
    });

    const handlePressIn = () => {
      scale.value = withTiming(0.98, { duration: 100 });
    };

    const handlePressOut = () => {
      scale.value = withTiming(1, { duration: 100 });
    };

    return (
      <AnimatedPressable
        style={[styles.reminderItem, item.isCompleted ? styles.completedReminder : {}, animatedStyle]}
        onPress={() => router.push(`/detail/${item.id}`)}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <View style={styles.reminderItemContent}>
          <View>
            <Text style={styles.reminderTitle}>{item.title}</Text>
            <Text>{item.date} {item.time}</Text>
            {item.content && <Text style={styles.reminderContent}>{item.content}</Text>}
            {item.repeatPattern && <Text>Repeat: {item.repeatPattern}</Text>}
            <Text>Status: {item.isCompleted ? 'Completed' : 'Pending'}</Text>
          </View>
          <Button
            title={item.isCompleted ? 'Unmark' : 'Complete'}
            onPress={() => handleToggleComplete(item)}
          />
        </View>
      </AnimatedPressable>
    );
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading reminders...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Error: {error}</Text>
        <Button title="Retry" onPress={() => fetchReminders(filter)} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Button title="Create New Reminder" onPress={() => router.push('/create')} />

      <View style={styles.filterContainer}>
        <Button title="All" onPress={() => setFilter('all')} color={filter === 'all' ? 'blue' : 'gray'} />
        <Button title="Pending" onPress={() => setFilter('pending')} color={filter === 'pending' ? 'blue' : 'gray'} />
        <Button title="Completed" onPress={() => setFilter('completed')} color={filter === 'completed' ? 'blue' : 'gray'} />
      </View>

      {reminders.length === 0 ? (
        <Text style={styles.noRemindersText}>No reminders found. Create one!</Text>
      ) : (
        <FlatList
          data={reminders}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  noRemindersText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#888',
  },
  listContent: {
    paddingBottom: 20,
  },
  reminderItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderLeftWidth: 5,
    borderLeftColor: '#007bff',
  },
  completedReminder: {
    borderLeftColor: '#28a745', // Green for completed
    opacity: 0.7,
  },
  reminderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  reminderContent: {
    fontSize: 14,
    color: '#555',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  reminderItemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default ReminderListScreen;

