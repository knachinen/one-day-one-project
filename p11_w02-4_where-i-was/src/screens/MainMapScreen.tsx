import React, { useEffect, useState, useCallback, useRef } from 'react';
import { View, StyleSheet, Button, Dimensions, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import * as Location from 'expo-location';
import * as Crypto from 'expo-crypto';
import { useFocusEffect } from '@react-navigation/native';
import { getLocations, insertLocation } from '../db/locations';
import { LocationRecord } from '../types/location';
import { getMapHtml } from '../utils/mapTemplate';
import { getPlaceName } from '../utils/geocoding';

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';

type MainMapScreenNavigationProp = StackNavigationProp<RootStackParamList, 'MainMap'>;

type Props = {
  navigation: MainMapScreenNavigationProp;
};

export default function MainMapScreen({ navigation }: Props) {
  console.log('[Map] Rendering MainMapScreen');
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [history, setHistory] = useState<LocationRecord[]>([]);
  const webViewRef = useRef<WebView>(null);

  const fetchHistory = async () => {
    console.log('[Map] fetchHistory started');
    try {
      const data = await getLocations();
      console.log('[Map] fetchHistory success, count:', data.length);
      setHistory(data);
      // Send history to WebView
      if (webViewRef.current) {
        webViewRef.current.postMessage(JSON.stringify({
          type: 'SET_HISTORY',
          payload: data
        }));
      }
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

  useEffect(() => {
    console.log('[Map] useEffect mounted');
    (async () => {
      try {
        console.log('[Map] Requesting permissions...');
        let { status } = await Location.requestForegroundPermissionsAsync();
        console.log('[Map] Permission status:', status);

        if (status !== 'granted') {
          Alert.alert('Permission to access location was denied');
          return;
        }

        console.log('[Map] Getting current position...');
        let location = await Location.getCurrentPositionAsync({});
        console.log('[Map] Got location:', location.coords.latitude, location.coords.longitude);
        setLocation(location);
      } catch (e) {
        console.error('[Map] Error in location setup:', e);
      }
    })();
  }, []);

  // Update WebView when location changes
  useEffect(() => {
    if (location && webViewRef.current) {
      webViewRef.current.postMessage(JSON.stringify({
        type: 'UPDATE_USER_LOCATION',
        payload: { lat: location.coords.latitude, lon: location.coords.longitude }
      }));
    }
  }, [location]);

  // Update WebView when history changes (initial load)
  useEffect(() => {
    if (history.length > 0 && webViewRef.current) {
      webViewRef.current.postMessage(JSON.stringify({
        type: 'SET_HISTORY',
        payload: history
      }));
    }
  }, [history]);

  const handleWebViewLoad = () => {
    console.log('[Map] WebView loaded');
    if (location) {
      webViewRef.current?.postMessage(JSON.stringify({
        type: 'UPDATE_USER_LOCATION',
        payload: { lat: location.coords.latitude, lon: location.coords.longitude }
      }));
      webViewRef.current?.postMessage(JSON.stringify({
        type: 'CENTER_MAP',
        payload: { lat: location.coords.latitude, lon: location.coords.longitude }
      }));
    }
    if (history.length > 0) {
      webViewRef.current?.postMessage(JSON.stringify({
        type: 'SET_HISTORY',
        payload: history
      }));
    }
  };

  const handleSaveLocation = async () => {
    if (!location) {
      Alert.alert('Location not found', 'Please wait for location to be detected.');
      return;
    }

    try {
      const lat = location.coords.latitude;
      const lon = location.coords.longitude;
      const placeName = await getPlaceName(lat, lon);
      const id = Crypto.randomUUID();

      const newRecord: LocationRecord = {
        id,
        name: placeName,
        lat,
        lon,
        duration: 0, // Manual entry has 0 duration initially
        startTime: Date.now(),
        userNote: null,
      };

      await insertLocation(newRecord);
      Alert.alert('Saved', `Location saved: ${placeName || 'Unknown Place'}`);
      fetchHistory(); // Refresh map
    } catch (error) {
      console.error('Failed to save location:', error);
      Alert.alert('Error', 'Failed to save location.');
    }
  };

  const initialLat = location?.coords.latitude || 37.5665;
  const initialLon = location?.coords.longitude || 126.9780;

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        originWhitelist={['*']}
        source={{ html: getMapHtml(initialLat, initialLon) }}
        style={styles.map}
        onLoadEnd={handleWebViewLoad}
        onMessage={(event) => {
          try {
            const data = JSON.parse(event.nativeEvent.data);
            if (data.type === 'LOG') {
              console.log('[WebView]', data.payload);
            }
          } catch (e) {
            console.log('[WebView] Raw message:', event.nativeEvent.data);
          }
        }}
      />

      <View style={styles.buttonContainer}>
        <Button title="Save" onPress={handleSaveLocation} />
        <Button title="History" onPress={() => navigation.navigate('LocationList')} />
        <Button title="Resend" onPress={() => {
          console.log('[Map] Resending data to WebView');
          if (webViewRef.current) {
            webViewRef.current.postMessage(JSON.stringify({
              type: 'SET_HISTORY',
              payload: history
            }));
            if (location) {
              webViewRef.current.postMessage(JSON.stringify({
                type: 'UPDATE_USER_LOCATION',
                payload: { lat: location.coords.latitude, lon: location.coords.longitude }
              }));
            }
          }
        }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  map: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: 'rgba(255,255,255,0.8)',
    padding: 10,
    marginHorizontal: 20,
    borderRadius: 10,
  },
});
