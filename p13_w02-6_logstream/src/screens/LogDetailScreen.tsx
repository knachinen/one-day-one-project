import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Share } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { LogEntry } from '../utils/logParser';

export const LogDetailScreen = () => {
    const route = useRoute<any>();
    const navigation = useNavigation();
    const log = route.params?.log as LogEntry;

    if (!log) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>No log data</Text>
            </View>
        );
    }

    const shareLog = async () => {
        try {
            await Share.share({
                message: `${log.timestamp} ${log.level}/${log.tag}: ${log.message}`,
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Log Detail</Text>
                <TouchableOpacity onPress={shareLog} style={styles.shareBtn}>
                    <Text style={styles.shareText}>Share</Text>
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.content}>
                <View style={styles.row}>
                    <Text style={styles.label}>Time:</Text>
                    <Text style={styles.value}>{log.timestamp}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Level:</Text>
                    <Text style={[styles.value, { color: getLevelColor(log.level) }]}>{log.level}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Tag:</Text>
                    <Text style={styles.value}>{log.tag}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>PID:</Text>
                    <Text style={styles.value}>{log.pid}</Text>
                </View>
                <Text style={styles.label}>Message:</Text>
                <View style={styles.messageBox}>
                    <Text style={styles.message}>{log.message}</Text>
                </View>
            </ScrollView>
        </View>
    );
};

const getLevelColor = (level: string) => {
    switch (level) {
        case 'E': return '#ff5252';
        case 'W': return '#ffab40';
        case 'D': return '#448aff';
        default: return '#ccc';
    }
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#1e1e1e', padding: 10 },
    header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
    title: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
    shareBtn: { backgroundColor: '#333', padding: 8, borderRadius: 5 },
    shareText: { color: '#448aff' },
    content: { flex: 1 },
    text: { color: '#fff' },
    row: { flexDirection: 'row', marginBottom: 10 },
    label: { color: '#888', width: 60, fontWeight: 'bold' },
    value: { color: '#fff', flex: 1 },
    messageBox: { backgroundColor: '#2d2d2d', padding: 10, borderRadius: 5, marginTop: 5 },
    message: { color: '#fff', fontFamily: 'monospace' }
});
