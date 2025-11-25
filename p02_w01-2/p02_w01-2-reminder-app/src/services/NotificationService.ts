import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { Reminder } from '../data/ReminderModel';

export async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
    alert('Failed to get push token for push notification! Make sure notifications are enabled for the app.');
    return;
  }
  token = (await Notifications.getExpoPushTokenAsync()).data;
  console.log(token); // Log token for debugging, not strictly necessary for local notifications

  return token;
}

export async function scheduleSingleReminderNotification(reminder: Reminder) {
  const trigger = new Date(`${reminder.date}T${reminder.time}`);
  if (trigger.getTime() < Date.now()) {
    console.log('Reminder is in the past, not scheduling notification.');
    return;
  }

  const identifier = await Notifications.scheduleNotificationAsync({
    content: {
      title: reminder.title,
      body: reminder.content || 'Time to remember!',
      data: { reminderId: reminder.id, type: 'single' },
    },
    trigger,
  });
  console.log(`Scheduled notification for reminder: ${reminder.title} at ${trigger} (ID: ${identifier})`);
  return identifier;
}

export async function scheduleRecurringReminderNotification(reminder: Reminder) {
  if (!reminder.repeatPattern || reminder.repeatPattern === 'none') {
    console.log('No repeat pattern specified for recurring notification.');
    return;
  }

  const triggerDate = new Date(`${reminder.date}T${reminder.time}`);
  if (triggerDate.getTime() < Date.now()) {
    console.log('Reminder is in the past, scheduling recurring notification from now.');
    // This is a simplification; a more robust solution would calculate the next valid date.
  }

  let interval: Notifications.NotificationTriggerInput = {
    hour: triggerDate.getHours(),
    minute: triggerDate.getMinutes(),
    second: 0,
    repeats: true,
  };

  switch (reminder.repeatPattern) {
    case 'daily':
      // interval is already set for daily
      break;
    case 'weekly':
      interval.weekday = triggerDate.getDay() + 1; // Sunday - Saturday : 1 - 7 (where Sunday is 1)
      break;
    case 'monthly':
      interval.day = triggerDate.getDate();
      break;
    default:
      console.warn(`Unsupported repeat pattern: ${reminder.repeatPattern}`);
      return;
  }

  const identifier = await Notifications.scheduleNotificationAsync({
    content: {
      title: reminder.title,
      body: reminder.content || 'Time to remember!',
      data: { reminderId: reminder.id, type: 'recurring', pattern: reminder.repeatPattern },
    },
    trigger: interval,
  });
  console.log(`Scheduled recurring notification for reminder: ${reminder.title} with pattern ${reminder.repeatPattern} (ID: ${identifier})`);
  return identifier;
}

export async function cancelScheduledReminderNotification(identifier: string) {
  await Notifications.cancelScheduledNotificationAsync(identifier);
  console.log(`Cancelled notification with ID: ${identifier}`);
}

export async function scheduleSnoozeNotification(reminder: Reminder, snoozeMinutes: number) {
  const trigger = new Date(Date.now() + snoozeMinutes * 60 * 1000); // Snooze for snoozeMinutes from now

  const identifier = await Notifications.scheduleNotificationAsync({
    content: {
      title: `${reminder.title} (Snoozed)`,
      body: reminder.content || 'Time to remember!',
      data: { reminderId: reminder.id, type: 'snooze', originalTrigger: new Date(`${reminder.date}T${reminder.time}`).toISOString() },
    },
    trigger,
  });
  console.log(`Scheduled snooze notification for reminder: ${reminder.title} in ${snoozeMinutes} minutes (ID: ${identifier})`);
  return identifier;
}

export async function getAllScheduledNotifications() {
  return await Notifications.getAllScheduledNotificationsAsync();
}

// In development, you might want to call this function early in your App.tsx or _layout.tsx
// to ensure permissions are requested when the app starts.