import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LOCATION_TASK_NAME } from '../constants/tasks';
import { insertLocation, updateLocationDuration } from '../db/locations';
import { LocationRecord } from '../types/location';
import * as Crypto from 'expo-crypto';

const STORAGE_KEY_LAST_LOC = '@where_i_was/last_location';
const STAY_RADIUS_METERS = 50;
const MIN_STAY_DURATION_MS = 30 * 60 * 1000; // 30 minutes

interface LocationState {
    lastLat: number;
    lastLon: number;
    arrivalTimestamp: number;
    isStayRecorded: boolean;
    currentStayId: string | null;
}

// Haversine formula to calculate distance
const getDistanceFromLatLonInMeters = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371e3; // Radius of the earth in meters
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d;
};

const deg2rad = (deg: number) => {
    return deg * (Math.PI / 180);
};

console.log('[Task] Defining location task:', LOCATION_TASK_NAME);

TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
    if (error) {
        console.error('Location task error:', error);
        return;
    }

    if (data) {
        const { locations } = data as { locations: Location.LocationObject[] };
        if (!locations || locations.length === 0) return;

        const newLoc = locations[locations.length - 1]; // Use the most recent location
        const now = Date.now();

        try {
            const stateJson = await AsyncStorage.getItem(STORAGE_KEY_LAST_LOC);
            let state: LocationState;

            if (stateJson) {
                state = JSON.parse(stateJson);
            } else {
                // Initial state
                state = {
                    lastLat: newLoc.coords.latitude,
                    lastLon: newLoc.coords.longitude,
                    arrivalTimestamp: now,
                    isStayRecorded: false,
                    currentStayId: null,
                };
                await AsyncStorage.setItem(STORAGE_KEY_LAST_LOC, JSON.stringify(state));
                return; // Just initialized, wait for next update
            }

            const distance = getDistanceFromLatLonInMeters(
                state.lastLat,
                state.lastLon,
                newLoc.coords.latitude,
                newLoc.coords.longitude
            );

            if (distance < STAY_RADIUS_METERS) {
                // Still at the same place
                const duration = now - state.arrivalTimestamp;

                if (duration >= MIN_STAY_DURATION_MS) {
                    if (!state.isStayRecorded) {
                        // New stay detected!
                        const id = Crypto.randomUUID();

                        // Attempt to reverse geocode
                        let placeName: string | null = null;
                        try {
                            const geocodeResult = await Location.reverseGeocodeAsync({
                                latitude: state.lastLat,
                                longitude: state.lastLon
                            });
                            if (geocodeResult.length > 0) {
                                const { name, street, city } = geocodeResult[0];
                                if (name && name !== street) {
                                    placeName = name;
                                } else if (street) {
                                    placeName = `${street}, ${city || ''}`;
                                } else {
                                    placeName = city || 'Unknown Location';
                                }
                            }
                        } catch (e) {
                            console.log('Geocoding failed in background:', e);
                        }

                        const newRecord: LocationRecord = {
                            id,
                            name: placeName,
                            lat: state.lastLat,
                            lon: state.lastLon,
                            duration: Math.floor(duration / 1000),
                            startTime: state.arrivalTimestamp,
                            userNote: null,
                        };
                        await insertLocation(newRecord);

                        state.isStayRecorded = true;
                        state.currentStayId = id;
                        console.log('New stay recorded:', id, placeName);
                    } else if (state.currentStayId) {
                        // Update existing stay duration
                        const durationSec = Math.floor(duration / 1000);
                        await updateLocationDuration(state.currentStayId, durationSec);
                        console.log('Updated stay duration:', durationSec);
                    }
                }
            } else {
                // Moved to a new place
                console.log('Moved > 50m. Resetting stay state.');
                state = {
                    lastLat: newLoc.coords.latitude,
                    lastLon: newLoc.coords.longitude,
                    arrivalTimestamp: now,
                    isStayRecorded: false,
                    currentStayId: null,
                };
            }

            await AsyncStorage.setItem(STORAGE_KEY_LAST_LOC, JSON.stringify(state));

        } catch (err) {
            console.error('Error in location task:', err);
        }
    }
});
