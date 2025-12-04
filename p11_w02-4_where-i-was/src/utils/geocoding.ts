import * as Location from 'expo-location';

export const getPlaceName = async (lat: number, lon: number): Promise<string | null> => {
    try {
        const result = await Location.reverseGeocodeAsync({ latitude: lat, longitude: lon });
        if (result.length > 0) {
            const { name, street, city, region, country } = result[0];
            // Construct a meaningful name
            // Priority: Name (e.g. "Starbucks") > Street > City
            if (name && name !== street) {
                return name;
            }
            if (street) {
                return `${street}, ${city || ''}`;
            }
            return city || region || country || 'Unknown Location';
        }
        return null;
    } catch (error) {
        console.error('Reverse geocoding failed:', error);
        return null;
    }
};
