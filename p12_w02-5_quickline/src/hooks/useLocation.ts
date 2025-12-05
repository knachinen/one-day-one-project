import { useState, useEffect, useCallback } from 'react';
import * as Location from 'expo-location';
import { Alert } from 'react-native';

interface LocationState {
    coords: {
        latitude: number;
        longitude: number;
    } | null;
    address: string | null;
    loading: boolean;
    error: string | null;
    accuracy: 'high' | 'low' | null;
}

export const useLocation = () => {
    const [locationState, setLocationState] = useState<LocationState>({
        coords: null,
        address: null,
        loading: true,
        error: null,
        accuracy: null,
    });

    const fetchLocation = useCallback(async () => {
        setLocationState((prev) => ({ ...prev, loading: true, error: null }));

        try {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setLocationState((prev) => ({
                    ...prev,
                    loading: false,
                    error: 'Location permission denied. Please enable it in settings.',
                }));
                return;
            }

            // Try to get high accuracy location with 5s timeout
            try {
                const location = await Promise.race([
                    Location.getCurrentPositionAsync({
                        accuracy: Location.Accuracy.Highest,
                    }),
                    new Promise<never>((_, reject) =>
                        setTimeout(() => reject(new Error('Timeout')), 5000)
                    ),
                ]) as Location.LocationObject;

                await updateLocationState(location, 'high');
            } catch (e) {
                console.log('High accuracy location timed out or failed, trying last known...');
                // Fallback to last known location
                const lastKnown = await Location.getLastKnownPositionAsync();
                if (lastKnown) {
                    await updateLocationState(lastKnown, 'low');
                } else {
                    throw new Error('Could not fetch location');
                }
            }
        } catch (error: any) {
            let errorMessage = 'Failed to get location';
            if (error.message === 'Could not fetch location') {
                errorMessage = 'GPS signal not found. Please move to an open area.';
            } else if (error.message === 'Timeout') {
                errorMessage = 'GPS request timed out.';
            }

            setLocationState((prev) => ({
                ...prev,
                loading: false,
                error: errorMessage,
            }));
        }
    }, []);

    const updateLocationState = async (location: Location.LocationObject, accuracy: 'high' | 'low') => {
        let addressStr = 'Unknown Location';
        try {
            const [address] = await Location.reverseGeocodeAsync({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            });

            if (address) {
                addressStr = [
                    address.region,
                    address.city,
                    address.street,
                    address.name
                ].filter(Boolean).join(' ');
            }
        } catch (e) {
            console.log('Reverse geocoding failed');
            addressStr = 'Address unavailable (Network Error)';
        }

        setLocationState({
            coords: {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            },
            address: addressStr,
            loading: false,
            error: null,
            accuracy,
        });
    };

    useEffect(() => {
        fetchLocation();
    }, [fetchLocation]);

    return { ...locationState, refreshLocation: fetchLocation };
};
