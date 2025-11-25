import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, Button, StyleSheet, ActivityIndicator, Pressable } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getReminders } from '../services/DatabaseService';
import { Reminder } from '../data/ReminderModel';
import { useRouter } from 'expo-router';

const CompletedRemindersScreen: React.FC = () => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchCompletedReminders = async () => {
    try {
      setLoading(true);
      const fetchedReminders = await getReminders('SELECT * FROM reminders WHERE isCompleted = ? ORDER BY date DESC, time DESC;', [1]);
      setReminders(fetchedReminders);
      setError(null);
    } catch (e: any) {
      setError(e.message || 'Failed to fetch completed reminders');
      console.error('Error fetching completed reminders:', e);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchCompletedReminders();
    }, [])
  );

  const renderItem = ({ item }: { item: Reminder }) => (
    <Pressable
      style={styles.reminderItem}
      onPress={() => router.push(`/detail/${item.id}`)}
    >
      <View>
        <Text style={styles.reminderTitle}>{item.title}</Text>
        <Text>{item.date} {item.time}</Text>
        {item.content && <Text style={styles.reminderContent}>{item.content}</Text>}
        {item.repeatPattern && <Text>Repeat: {item.repeatPattern}</Text>}
      </View>
    </Pressable>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading completed reminders...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Error: {error}</Text>
        <Button title="Retry" onPress={fetchCompletedReminders} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {reminders.length === 0 ? (
        <Text style={styles.noRemindersText}>No completed reminders found.</Text>
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
    borderLeftColor: '#28a745', // Green for completed
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
});

export default CompletedRemindersScreen;
