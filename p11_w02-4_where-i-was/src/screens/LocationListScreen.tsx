import React, { useState, useCallback, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, TextInput, ScrollView, Alert } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as DocumentPicker from 'expo-document-picker';
import { Ionicons } from '@expo/vector-icons';
import { getLocations, updateLocationNote, updateLocationName, deleteLocation, insertLocation } from '../db/locations';
import { LocationRecord } from '../types/location';
import { RootStackParamList } from '../types/navigation';

type LocationListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'LocationList'>;

export default function LocationListScreen() {
    const navigation = useNavigation<LocationListScreenNavigationProp>();
    const [history, setHistory] = useState<LocationRecord[]>([]);
    const [selectedLocation, setSelectedLocation] = useState<LocationRecord | null>(null);
    const [nameText, setNameText] = useState('');
    const [noteText, setNoteText] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);

    const fetchHistory = async () => {
        try {
            const data = await getLocations();
            setHistory(data);
        } catch (error) {
            console.error('Failed to fetch history:', error);
        }
    };

    const handleExport = async () => {
        try {
            if (history.length === 0) {
                Alert.alert('No Data', 'There are no location records to export.');
                return;
            }

            const jsonData = JSON.stringify(history, null, 2);
            const fileName = `where-i-was-export-${new Date().toISOString().split('T')[0]}.json`;

            // Use new FileSystem API with Paths
            const cacheDir = new FileSystem.Directory(FileSystem.Paths.cache);
            const file = new FileSystem.File(cacheDir, fileName);

            // Write data to file
            await file.write(jsonData);

            // Verify file exists
            if (!file.exists) {
                throw new Error('File was not created successfully');
            }

            const canShare = await Sharing.isAvailableAsync();
            if (canShare) {
                await Sharing.shareAsync(file.uri);
            } else {
                Alert.alert('Success', `Data exported to ${fileName}`);
            }
        } catch (error) {
            console.error('Export failed:', error);
            Alert.alert('Error', `Failed to export data: ${error}`);
        }
    };

    const handleImport = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: 'application/json',
                copyToCacheDirectory: true,
            });

            if (result.canceled) {
                return;
            }

            const fileUri = result.assets[0].uri;
            const file = new FileSystem.File(fileUri);
            const content = await file.text();
            const importedData: LocationRecord[] = JSON.parse(content);

            if (!Array.isArray(importedData)) {
                throw new Error('Invalid file format');
            }

            // Get existing records to check for duplicates
            const existingRecords = await getLocations();
            const existingIds = new Set(existingRecords.map(r => r.id));

            // Import each location record
            let importCount = 0;
            let skipCount = 0;
            for (const record of importedData) {
                try {
                    // Skip if already exists
                    if (existingIds.has(record.id)) {
                        skipCount++;
                        continue;
                    }

                    await insertLocation(record);
                    importCount++;
                } catch (error) {
                    console.error('Failed to import record:', record.id, error);
                }
            }

            const message = `Imported ${importCount} new records.${skipCount > 0 ? ` Skipped ${skipCount} duplicates.` : ''}`;
            Alert.alert('Success', message);
            fetchHistory();
        } catch (error) {
            console.error('Import failed:', error);
            Alert.alert('Error', `Failed to import data: ${error}`);
        }
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View style={{ flexDirection: 'row', marginRight: 10 }}>
                    <TouchableOpacity onPress={handleImport} style={{ marginRight: 15 }}>
                        <Ionicons name="download-outline" size={24} color="#007AFF" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleExport} style={{ marginRight: 5 }}>
                        <Ionicons name="share-outline" size={24} color="#007AFF" />
                    </TouchableOpacity>
                </View>
            ),
        });
    }, [navigation, history]);

    useFocusEffect(
        useCallback(() => {
            fetchHistory();
        }, [])
    );

    const handlePressItem = (item: LocationRecord) => {
        setSelectedLocation(item);
        setNameText(item.name || '');
        setNoteText(item.userNote || '');
        setModalVisible(true);
    };

    const handleSave = async () => {
        if (selectedLocation) {
            await updateLocationName(selectedLocation.id, nameText);
            await updateLocationNote(selectedLocation.id, noteText);
            setModalVisible(false);
            fetchHistory();
        }
    };

    const handleDelete = async (id: string) => {
        await deleteLocation(id);
        fetchHistory();
    };

    const renderItem = ({ item }: { item: LocationRecord }) => (
        <TouchableOpacity style={styles.item} onPress={() => handlePressItem(item)}>
            <View style={styles.itemHeader}>
                <Text style={styles.itemTitle}>{item.name || 'Unknown Place'}</Text>
                <Text style={styles.itemDate}>{new Date(item.startTime).toLocaleString()}</Text>
            </View>
            <Text style={styles.coordinates}>📍 {item.lat.toFixed(5)}, {item.lon.toFixed(5)}</Text>
            {item.userNote ? <Text style={styles.note}>📝 {item.userNote}</Text> : null}
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={history}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={<Text style={styles.emptyText}>No history yet.</Text>}
            />

            <Modal visible={isModalVisible} animationType="slide" transparent>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <ScrollView>
                            <View style={styles.modalHeader}>
                                <Text style={styles.modalTitle}>Edit Location</Text>
                                <View style={styles.modalHeaderButtons}>
                                    <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.iconButton}>
                                        <Ionicons name="close-outline" size={28} color="#666" />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <Text style={styles.label}>Place Name</Text>
                            <TextInput
                                style={styles.input}
                                value={nameText}
                                onChangeText={setNameText}
                                placeholder="Enter place name..."
                            />

                            <Text style={styles.label}>Note</Text>
                            <TextInput
                                style={[styles.input, styles.multilineInput]}
                                value={noteText}
                                onChangeText={setNoteText}
                                placeholder="Add a note..."
                                multiline
                            />

                            <View style={styles.modalFooter}>
                                <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
                                    <Ionicons name="checkmark-circle" size={24} color="white" />
                                    <Text style={styles.saveButtonText}>Save</Text>
                                </TouchableOpacity>

                                {selectedLocation && (
                                    <TouchableOpacity
                                        onPress={() => {
                                            handleDelete(selectedLocation.id);
                                            setModalVisible(false);
                                        }}
                                        style={styles.deleteButton}
                                    >
                                        <Ionicons name="trash-outline" size={24} color="white" />
                                        <Text style={styles.deleteButtonText}>Delete</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    listContent: {
        padding: 16,
    },
    item: {
        backgroundColor: 'white',
        padding: 16,
        marginBottom: 12,
        borderRadius: 8,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
    },
    itemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    itemTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        flex: 1,
    },
    itemDate: {
        color: '#666',
        fontSize: 12,
    },
    note: {
        marginTop: 8,
        fontStyle: 'italic',
        color: '#444',
    },
    coordinates: {
        fontSize: 12,
        color: '#666',
        marginTop: 4,
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 50,
        color: '#888',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: '85%',
        maxHeight: '80%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        flex: 1,
    },
    modalHeaderButtons: {
        flexDirection: 'row',
    },
    iconButton: {
        padding: 5,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        marginTop: 10,
        marginBottom: 5,
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
    },
    multilineInput: {
        minHeight: 80,
        textAlignVertical: 'top',
    },
    modalFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        gap: 10,
    },
    saveButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#007AFF',
        padding: 12,
        borderRadius: 8,
        gap: 8,
    },
    saveButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    deleteButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FF3B30',
        padding: 12,
        borderRadius: 8,
        gap: 8,
    },
    deleteButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
});
