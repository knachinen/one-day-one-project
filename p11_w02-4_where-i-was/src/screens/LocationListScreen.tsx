import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, TextInput, Button } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getLocations, updateLocationNote, deleteLocation } from '../db/locations';
import { LocationRecord } from '../types/location';

export default function LocationListScreen() {
    const [history, setHistory] = useState<LocationRecord[]>([]);
    const [selectedLocation, setSelectedLocation] = useState<LocationRecord | null>(null);
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

    useFocusEffect(
        useCallback(() => {
            fetchHistory();
        }, [])
    );

    const handlePressItem = (item: LocationRecord) => {
        setSelectedLocation(item);
        setNoteText(item.userNote || '');
        setModalVisible(true);
    };

    const handleSaveNote = async () => {
        if (selectedLocation) {
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
                        <Text style={styles.modalTitle}>Edit Note</Text>
                        <TextInput
                            style={styles.input}
                            value={noteText}
                            onChangeText={setNoteText}
                            placeholder="Add a note..."
                            multiline
                        />
                        <View style={styles.modalButtons}>
                            <Button title="Cancel" onPress={() => setModalVisible(false)} />
                            <Button title="Save" onPress={handleSaveNote} />
                        </View>
                        {selectedLocation && (
                            <Button title="Delete Record" color="red" onPress={() => {
                                handleDelete(selectedLocation.id);
                                setModalVisible(false);
                            }} />
                        )}
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
        width: '80%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        padding: 10,
        minHeight: 80,
        marginBottom: 20,
        textAlignVertical: 'top',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
    },
});
