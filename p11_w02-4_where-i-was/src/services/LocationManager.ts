import * as Location from 'expo-location';
import { LOCATION_TASK_NAME } from '../constants/tasks';

export const requestPermissions = async () => {
    const { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync();
    if (foregroundStatus !== 'granted') {
        console.log('Foreground permission denied');
        return false;
    }

    const { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync();
    if (backgroundStatus !== 'granted') {
        console.log('Background permission denied');
        return false;
    }

    return true;
};

export const startBackgroundUpdate = async () => {
    const hasPermissions = await requestPermissions();
    if (!hasPermissions) return;

    const hasStarted = await Location.hasStartedLocationUpdatesAsync(LOCATION_TASK_NAME);
    if (hasStarted) {
        console.log('Location task already started');
        return;
    }

    await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        accuracy: Location.Accuracy.Balanced,
        distanceInterval: 50, // Update every 50 meters
        deferredUpdatesInterval: 1000 * 60 * 5, // Minimum 5 minutes between updates (battery saving)
        deferredUpdatesDistance: 50, // Minimum 50 meters
        foregroundService: {
            notificationTitle: "Where I Was",
            notificationBody: "Tracking your location in background",
        },
    });
    console.log('Background location task started');
};

export const stopBackgroundUpdate = async () => {
    const hasStarted = await Location.hasStartedLocationUpdatesAsync(LOCATION_TASK_NAME);
    if (hasStarted) {
        await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
        console.log('Background location task stopped');
    }
};
