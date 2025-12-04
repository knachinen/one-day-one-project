import React, { useEffect, useState, useCallback, useRef, useLayoutEffect } from 'react';
import { View, StyleSheet, Dimensions, Alert, TouchableOpacity, TextInput, FlatList, Text, Keyboard } from 'react-native';
import { WebView } from 'react-native-webview';
import * as Location from 'expo-location';
import * as Crypto from 'expo-crypto';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { getLocations, insertLocation } from '../db/locations';
import { LocationRecord } from '../types/location';
import { getMapHtml } from '../utils/mapTemplate';
import { getPlaceName } from '../utils/geocoding';
import { searchLocation, SearchResult } from '../utils/search';

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
  const [mapCenter, setMapCenter] = useState<{ lat: number; lon: number } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const webViewRef = useRef<WebView>(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.headerButtons}>
          <TouchableOpacity onPress={handleSaveLocation} style={styles.headerButton}>
            <Ionicons name="bookmark" size={24} color="#007AFF" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('LocationList')} style={styles.headerButton}>
            <Ionicons name="list" size={24} color="#007AFF" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            if (location && webViewRef.current) {
              webViewRef.current.postMessage(JSON.stringify({
                type: 'CENTER_MAP',
                payload: { lat: location.coords.latitude, lon: location.coords.longitude }
              }));
            }
          }} style={styles.headerButton}>
            <Ionicons name="locate" size={24} color="#007AFF" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, location, mapCenter, webViewRef]);

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
        setMapCenter({ lat: location.coords.latitude, lon: location.coords.longitude });
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
    if (!mapCenter) {
      Alert.alert('Location not found', 'Please wait for the map to load.');
      return;
    }

    try {
      const lat = mapCenter.lat;
      const lon = mapCenter.lon;
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
      Alert.alert('Saved', `Location saved: ${placeName || 'Unknown Place'} `);
      fetchHistory(); // Refresh map
    } catch (error) {
      console.error('Failed to save location:', error);
      Alert.alert('Error', 'Failed to save location.');
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      return;
    }

    try {
      Keyboard.dismiss();
      const results = await searchLocation(searchQuery);
      setSearchResults(results);
      setShowSearchResults(true);
    } catch (error) {
      console.error('Search failed:', error);
      Alert.alert('Error', 'Failed to search location.');
    }
  };

  const handleSelectSearchResult = (result: SearchResult) => {
    const lat = parseFloat(result.lat);
    const lon = parseFloat(result.lon);

    setMapCenter({ lat, lon });
    setShowSearchResults(false);
    setSearchQuery('');

    // Move map to selected location
    if (webViewRef.current) {
      webViewRef.current.postMessage(JSON.stringify({
        type: 'CENTER_MAP',
        payload: { lat, lon }
      }));
    }
  };

  const initialLat = location?.coords.latitude || 37.5665;
  const initialLon = location?.coords.longitude || 126.9780;

  return (
    <View style={styles.container}>
      <View style={styles.statusBarSpacer} />

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search location..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => {
              setSearchQuery('');
              setShowSearchResults(false);
            }}>
              <Ionicons name="close-circle" size={20} color="#666" />
            </TouchableOpacity>
          )}
        </View>

        {/* Search Results */}
        {showSearchResults && searchResults.length > 0 && (
          <View style={styles.searchResults}>
            <FlatList
              data={searchResults}
              keyExtractor={(item) => item.place_id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.searchResultItem}
                  onPress={() => handleSelectSearchResult(item)}
                >
                  <Ionicons name="location-outline" size={20} color="#007AFF" />
                  <Text style={styles.searchResultText} numberOfLines={2}>
                    {item.display_name}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
      </View>

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
            } else if (data.type === 'MAP_CENTER_CHANGED') {
              setMapCenter(data.payload);
              console.log('[Map] Center changed to:', data.payload.lat, data.payload.lon);
            }
          } catch (e) {
            console.log('[WebView] Raw message:', event.nativeEvent.data);
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  statusBarSpacer: {
    height: 88, // Approximate height for status bar + header
  },
  searchContainer: {
    position: 'absolute',
    top: 100,
    left: 10,
    right: 10,
    zIndex: 1000,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  searchResults: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 5,
    maxHeight: 200,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  searchResultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  searchResultText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
  },
  map: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  headerButtons: {
    flexDirection: 'row',
    marginRight: 10,
  },
  headerButton: {
    marginLeft: 15,
  },
});
