import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import * as Location from 'expo-location';
import { getPlaceName } from '../utils/geocoding';

export default function SettingsScreen() {
    const [testResult, setTestResult] = useState<string>('');

    const handleTestGeocoding = async () => {
        try {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission denied');
                return;
            }

            const loc = await Location.getCurrentPositionAsync({});
            const name = await getPlaceName(loc.coords.latitude, loc.coords.longitude);
            setTestResult(name || 'Geocoding returned null');
        } catch (error) {
            setTestResult('Error: ' + error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Settings</Text>
            <View style={styles.section}>
                <Button title="Test Reverse Geocoding" onPress={handleTestGeocoding} />
                {testResult ? <Text style={styles.result}>Result: {testResult}</Text> : null}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    section: {
        marginBottom: 20,
    },
    result: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
    },
});
