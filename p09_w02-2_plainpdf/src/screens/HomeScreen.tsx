import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

interface HomeScreenProps {
    onPickDocument: (uri: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onPickDocument }) => {
    const pickDocument = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: 'application/pdf',
                copyToCacheDirectory: true,
            });

            if (result.canceled) {
                return;
            }

            if (result.assets && result.assets.length > 0) {
                onPickDocument(result.assets[0].uri);
            }
        } catch (err) {
            Alert.alert('Error', 'Failed to pick document');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Plain PDF</Text>
            <TouchableOpacity style={styles.button} onPress={pickDocument}>
                <Text style={styles.buttonText}>Open PDF</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 40,
        color: '#333',
    },
    button: {
        backgroundColor: '#007AFF',
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
});
