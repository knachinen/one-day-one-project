import { Linking, Platform } from 'react-native';

export const sendEmergencySMS = async (phoneNumber: string, message: string) => {
    const separator = Platform.OS === 'ios' ? '&' : '?';
    const url = `sms:${phoneNumber}${separator}body=${encodeURIComponent(message)}`;

    try {
        const supported = await Linking.canOpenURL(url);
        if (supported) {
            await Linking.openURL(url);
        } else {
            console.error('SMS not supported');
        }
    } catch (error) {
        console.error('An error occurred', error);
    }
};

export const callEmergencyNumber = async (phoneNumber: string) => {
    const url = `tel:${phoneNumber}`;
    try {
        const supported = await Linking.canOpenURL(url);
        if (supported) {
            await Linking.openURL(url);
        } else {
            console.error('Phone calls not supported');
        }
    } catch (error) {
        console.error('An error occurred', error);
    }
};

export const generateEmergencyMessage = (
    coords: { latitude: number; longitude: number } | null,
    address: string | null
) => {
    let message = 'SOS! I need help!\n';

    if (coords) {
        message += `\nMy Location: https://www.google.com/maps/search/?api=1&query=${coords.latitude},${coords.longitude}`;
        message += `\nLat: ${coords.latitude}, Lon: ${coords.longitude}`;
    }

    if (address) {
        message += `\nApprox. Address: ${address}`;
    }

    return message;
};
