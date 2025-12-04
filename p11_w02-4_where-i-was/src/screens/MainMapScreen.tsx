import React, { useEffect, useState, useCallback, useRef } from 'react';
import { View, Text, StyleSheet, Button, Dimensions, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import * as Location from 'expo-location';
import { useFocusEffect } from '@react-navigation/native';
import { getLocations } from '../db/locations';
import { LocationRecord } from '../types/location';
import { startBackgroundUpdate, stopBackgroundUpdate } from '../services/LocationManager';
import { getMapHtml } from '../utils/mapTemplate';

export default function MainMapScreen() {
  console.log('[Map] Rendering MainMapScreen');
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [history, setHistory] = useState<LocationRecord[]>([]);
  const [hasPermission, setHasPermission] = useState(false);
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

        setHasPermission(true);

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
      />

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
