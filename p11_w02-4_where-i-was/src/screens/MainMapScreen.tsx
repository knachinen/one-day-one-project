import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, Button, Dimensions, Alert } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import { useFocusEffect } from '@react-navigation/native';
import { getLocations } from '../db/locations';
import { LocationRecord } from '../types/location';
import { startBackgroundUpdate, stopBackgroundUpdate } from '../services/LocationManager';

export default function MainMapScreen() {
  console.log('[Map] Rendering MainMapScreen');
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [history, setHistory] = useState<LocationRecord[]>([]);
  const [hasPermission, setHasPermission] = useState(false);
  const [showMap, setShowMap] = useState(false);

  const fetchHistory = async () => {
    console.log('[Map] fetchHistory started');
    try {
      const data = await getLocations();
      console.log('[Map] fetchHistory success, count:', data.length);
      setHistory(data);
    } catch (error) {
      console.error('[Map] Failed to fetch history:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      console.log('[Map] useFocusEffect triggered');
      fetchHistory();
    }, [])
  );

  const requestPermission = async () => {
    try {
      console.log('[Map] Requesting permissions manually...');
      let { status } = await Location.requestForegroundPermissionsAsync();
      console.log('[Map] Permission status:', status);

      if (status === 'granted') {
        setHasPermission(true);
        console.log('[Map] Getting current position...');
        let location = await Location.getCurrentPositionAsync({});
        console.log('[Map] Got location:', location.coords.latitude, location.coords.longitude);
        setLocation(location);
      } else {
        Alert.alert('Permission denied');
      }
    } catch (e) {
      console.error('[Map] Error in permission request:', e);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 20, marginTop: 50, zIndex: 10 }}>
        <Button title="1. Request Permission" onPress={requestPermission} />
        <Button title="2. Show Map" onPress={() => setShowMap(true)} />
      </View>

      {showMap ? (
        <MapView
          style={styles.map}
          showsUserLocation={hasPermission}
          initialRegion={{
            latitude: 37.5665,
            longitude: 126.9780,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          region={location ? {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          } : undefined}
        >
          {history.map((record) => (
            <Marker
              key={record.id}
              coordinate={{ latitude: record.lat, longitude: record.lon }}
              title={record.name || 'Unknown Place'}
              description={`Stayed: ${Math.floor((record.duration || 0) / 60)} mins`}
              pinColor="blue"
            />
          ))}
        </MapView>
      ) : (
        <Text>Map is hidden. Press 'Show Map' to render.</Text>
      )}

      <View style={styles.buttonContainer}>
        <Button title="Start Tracking" onPress={startBackgroundUpdate} />
        <Button title="Stop Tracking" onPress={stopBackgroundUpdate} />
        <Button title="Refresh" onPress={fetchHistory} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    flexDirection: 'row',
    gap: 10,
    backgroundColor: 'rgba(255,255,255,0.8)',
    padding: 10,
    borderRadius: 10,
  },
});
