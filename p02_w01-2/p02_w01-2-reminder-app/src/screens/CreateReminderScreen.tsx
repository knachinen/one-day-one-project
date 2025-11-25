import React, { useState, useLayoutEffect } from 'react'; // Added useLayoutEffect
import { View, Text, TextInput, Button, StyleSheet, Platform, Alert } from 'react-native'; // Added Alert
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { addReminder } from '../services/DatabaseService';
import { Reminder } from '../data/ReminderModel';
import { useRouter, Stack } from 'expo-router'; // Import Stack

const CreateReminderScreen: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [repeatPattern, setRepeatPattern] = useState<Reminder['repeatPattern']>('none');
  const router = useRouter();

  useLayoutEffect(() => {
    // Dynamically set header options for this screen
    router.setOptions({
      headerRight: () => (
        <Button onPress={handleSaveReminder} title="Done" />
      ),
    });
  }, [title, content, date, time, repeatPattern]); // Dependencies to re-render header if state changes

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

  const handleSaveReminder = async () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Reminder title cannot be empty.');
      return;
    }

    const newReminder: Omit<Reminder, 'id'> = {
      title,
      content: content.trim() || undefined,
      date: date.toISOString().split('T')[0], // YYYY-MM-DD
      time: time.toTimeString().split(' ')[0].substring(0, 5), // HH:MM
      repeatPattern: repeatPattern === 'none' ? undefined : repeatPattern,
      isCompleted: 0,
    };

    try {
      // TODO: Schedule notification here (single/recurring)
      await addReminder(newReminder);
      Alert.alert('Success', 'Reminder saved successfully!');
      router.back();
    } catch (error) {
      console.error('Error saving reminder:', error);
      Alert.alert('Error', 'Failed to save reminder.');
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Create Reminder' }} /> {/* Set static title for screen */}
      <Text style={styles.label}>Title:</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter reminder title"
      />

      <Text style={styles.label}>Content (Optional):</Text>
      <TextInput
        style={styles.input}
        value={content}
        onChangeText={setContent}
        placeholder="Enter reminder content"
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
});

export default CreateReminderScreen;
