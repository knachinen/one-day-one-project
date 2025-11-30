import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: true,
    }),
});

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
        return null;
    }

    return true;
}

export async function scheduleDailyNotification(time: string) {
    // Cancel all existing
    await Notifications.cancelAllScheduledNotificationsAsync();

    const [hours, minutes] = time.split(':').map(Number);

    await Notifications.scheduleNotificationAsync({
        content: {
            title: '오늘 하루를 돌아볼 시간이에요! 🌙',
            body: '3가지 질문에 답하며 하루를 정리해보세요.',
            sound: true,
        },
        trigger: {
            hour: hours,
            minute: minutes,
            type: Notifications.SchedulableTriggerInputTypes.DAILY,
        },
    });
}

export async function cancelAllNotifications() {
    await Notifications.cancelAllScheduledNotificationsAsync();
}
