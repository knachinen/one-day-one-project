import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Platform, ActivityIndicator, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Reminder } from '../data/ReminderModel';
import { getReminders, updateReminder, deleteReminder } from '../services/DatabaseService';
import { scheduleSnoozeNotification } from '../services/NotificationService'; // Import snooze function

const ReminderDetailScreen: React.FC = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [reminder, setReminder] = useState<Reminder | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [repeatPattern, setRepeatPattern] = useState<Reminder['repeatPattern']>('none');
  const [isCompleted, setIsCompleted] = useState<0 | 1>(0);

  useEffect(() => {
    const fetchReminder = async () => {
      try {
        setLoading(true);
        if (id) {
          const fetchedReminders = await getReminders('SELECT * FROM reminders WHERE id = ?;', [Number(id)]);
          if (fetchedReminders.length > 0) {
            const fetchedReminder = fetchedReminders[0];
            setReminder(fetchedReminder);
            setTitle(fetchedReminder.title);
            setContent(fetchedReminder.content || '');
            setDate(new Date(`${fetchedReminder.date}T${fetchedReminder.time}`));
            setTime(new Date(`${fetchedReminder.date}T${fetchedReminder.time}`));
            setRepeatPattern(fetchedReminder.repeatPattern || 'none');
            setIsCompleted(fetchedReminder.isCompleted);
          } else {
            setError('Reminder not found.');
          }
        } else {
          setError('Reminder ID is missing.');
        }
      } catch (e: any) {
        setError(e.message || 'Failed to fetch reminder details.');
        console.error('Error fetching reminder details:', e);
      } finally {
        setLoading(false);
      }
    };
    fetchReminder();
  }, [id]);

  const onDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const onTimeChange = (event: any, selectedTime?: Date) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(Platform.OS === 'ios');
    setTime(currentTime);
  };

  const handleUpdateReminder = async () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Reminder title cannot be empty.');
      return;
    }
    if (!reminder) return;

    const updatedReminder: Reminder = {
      id: reminder.id,
      title,
      content: content.trim() || undefined,
      date: date.toISOString().split('T')[0],
      time: time.toTimeString().split(' ')[0].substring(0, 5),
      repeatPattern: repeatPattern === 'none' ? undefined : repeatPattern,
      isCompleted,
    };

    try {
      await updateReminder(updatedReminder);
      Alert.alert('Success', 'Reminder updated successfully!');
      router.back(); // Go back to the list
    } catch (e: any) {
      Alert.alert('Error', e.message || 'Failed to update reminder.');
      console.error('Error updating reminder:', e);
    }
  };

  const handleDeleteReminder = async () => {
    if (!reminder) return;

    Alert.alert(
      'Delete Reminder',
      'Are you sure you want to delete this reminder?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteReminder(reminder.id);
              Alert.alert('Success', 'Reminder deleted successfully!');
              router.back(); // Go back to the list
            } catch (e: any) {
              Alert.alert('Error', e.message || 'Failed to delete reminder.');
              console.error('Error deleting reminder:', e);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleSnooze = async (minutes: number) => {
    if (!reminder) return;
    try {
      await scheduleSnoozeNotification(reminder, minutes);
      Alert.alert('Snoozed', `Reminder snoozed for ${minutes} minutes.`);
      router.back(); // Go back to the list after snoozing
    } catch (e: any) {
      Alert.alert('Error', e.message || 'Failed to snooze reminder.');
      console.error('Error snoozing reminder:', e);
    }
  };


  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading reminder details...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Error: {error}</Text>
        <Button title="Go Back" onPress={() => router.back()} />
      </View>
    );
  }

  if (!reminder) {
    return (
      <View style={styles.centered}>
        <Text>No reminder data available.</Text>
        <Button title="Go Back" onPress={() => router.back()} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title:</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Content (Optional):</Text>
      <TextInput
        style={styles.input}
        value={content}
        onChangeText={setContent}
        multiline
      />

      <Text style={styles.label}>Date:</Text>
      <Button onPress={() => setShowDatePicker(true)} title="Select Date" />
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}

      <Text style={styles.label}>Time:</Text>
      <Button onPress={() => setShowTimePicker(true)} title="Select Time" />
      {showTimePicker && (
        <DateTimePicker
          value={time}
          mode="time"
          display="default"
          onChange={onTimeChange}
        />
      )}

      <Text style={styles.label}>Repeat Pattern:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={repeatPattern}
          onValueChange={(itemValue) => setRepeatPattern(itemValue)}
        >
          <Picker.Item label="None" value="none" />
          <Picker.Item label="Daily" value="daily" />
          <Picker.Item label="Weekly" value="weekly" />
          <Picker.Item label="Monthly" value="monthly" />
        </Picker>
      </View>

      <Text style={styles.label}>Status:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={isCompleted}
          onValueChange={(itemValue: 0 | 1) => setIsCompleted(itemValue)}
        >
          <Picker.Item label="Pending" value={0} />
          <Picker.Item label="Completed" value={1} />
        </Picker>
      </View>

      <Button title="Update Reminder" onPress={handleUpdateReminder} />
      <Button title="Delete Reminder" onPress={handleDeleteReminder} color="red" />

      <View style={styles.snoozeContainer}>
        <Text style={styles.label}>Snooze:</Text>
        <Button title="5 min" onPress={() => handleSnooze(5)} />
        <Button title="10 min" onPress={() => handleSnooze(10)} />
        <Button title="30 min" onPress={() => handleSnooze(30)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#fff',
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
  snoozeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 20,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
});

export default ReminderDetailScreen;

