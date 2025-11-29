import notifee, {
    AuthorizationStatus,
    EventType,
    TimestampTrigger,
    TriggerType,
    AndroidImportance,
} from '@notifee/react-native';
import { Platform } from 'react-native';

class NotificationService {
    constructor() {
        this.createChannel();
    }

    async createChannel() {
        if (Platform.OS === 'android') {
            await notifee.createChannel({
                id: 'atomizer-reminders',
                name: 'Atomizer Reminders',
                importance: AndroidImportance.HIGH,
                sound: 'default',
            });
        }
    }

    async requestPermission(): Promise<boolean> {
        const settings = await notifee.requestPermission();
        return settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED;
    }

    async scheduleNotification(
        actionId: string,
        title: string,
        body: string,
        date: Date
    ) {
        const hasPermission = await this.requestPermission();
        if (!hasPermission) {
            console.log('Notification permission denied');
            return;
        }

        // Create a time-based trigger
        const trigger: TimestampTrigger = {
            type: TriggerType.TIMESTAMP,
            timestamp: date.getTime(),
        };

        await notifee.createTriggerNotification(
            {
                id: actionId,
                title,
                body,
                android: {
                    channelId: 'atomizer-reminders',
                    pressAction: {
                        id: 'default',
                        launchActivity: 'default',
                    },
                    actions: [
                        {
                            title: '지금 실행하기',
                            pressAction: {
                                id: 'start-action',
                                launchActivity: 'default',
                            },
                        },
                    ],
                },
                ios: {
                    categoryId: 'atomizer-action',
                    sound: 'default',
                },
                data: {
                    actionId,
                    type: 'action-reminder',
                },
            },
            trigger
        );
    }

    async cancelNotification(notificationId: string) {
        await notifee.cancelNotification(notificationId);
    }

    async getScheduledNotifications() {
        return await notifee.getTriggerNotificationIds();
    }
}

export const notificationService = new NotificationService();
