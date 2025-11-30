import React, { useCallback, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Keyboard,
    TouchableWithoutFeedback
} from 'react-native';
import { useFocusEffect } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { SettingsService } from '@/database/settingsService';
import { Settings } from '@/types';
import {
    cancelAllNotifications,
    registerForPushNotificationsAsync,
    scheduleDailyNotification,
} from '@/hooks/useNotifications';

export default function SettingsScreen() {
    const [settings, setSettings] = useState<Settings | null>(null);
    const [loading, setLoading] = useState(true);
    const [timeInput, setTimeInput] = useState('');

    const loadSettings = useCallback(async () => {
        try {
            setLoading(true);
            const data = await SettingsService.getSettings();
            setSettings(data);
            setTimeInput(data.notificationTime);
        } catch (error) {
            console.error('Failed to load settings:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            loadSettings();
        }, [loadSettings])
    );

    const handleToggleNotification = async (value: boolean) => {
        if (!settings) return;

        try {
            if (value) {
                const hasPermission = await registerForPushNotificationsAsync();
                if (!hasPermission) {
                    Alert.alert('권한 필요', '알림을 받으려면 설정에서 권한을 허용해주세요.');
                    return;
                }
                await scheduleDailyNotification(settings.notificationTime);
            } else {
                await cancelAllNotifications();
            }

            await SettingsService.updateSettings({ notificationEnabled: value });
            setSettings({ ...settings, notificationEnabled: value });
        } catch (error) {
            console.error('Failed to toggle notifications:', error);
            Alert.alert('오류', '설정을 저장하는데 실패했습니다.');
        }
    };

    const handleTimeSave = async () => {
        if (!settings) return;

        // Validate HH:mm format
        const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
        if (!timeRegex.test(timeInput)) {
            Alert.alert('형식 오류', '올바른 시간 형식(HH:mm)으로 입력해주세요. (예: 22:00)');
            setTimeInput(settings.notificationTime); // Reset
            return;
        }

        try {
            await SettingsService.updateSettings({ notificationTime: timeInput });
            setSettings({ ...settings, notificationTime: timeInput });

            if (settings.notificationEnabled) {
                await scheduleDailyNotification(timeInput);
            }

            Keyboard.dismiss();
            Alert.alert('저장 완료', '알림 시간이 변경되었습니다.');
        } catch (error) {
            console.error('Failed to save time:', error);
            Alert.alert('오류', '시간을 저장하는데 실패했습니다.');
        }
    };

    if (loading || !settings) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        );
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>설정</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>알림 설정</Text>

                    <View style={styles.row}>
                        <Text style={styles.label}>일일 알림 받기</Text>
                        <Switch
                            value={settings.notificationEnabled}
                            onValueChange={handleToggleNotification}
                            trackColor={{ false: Colors.border, true: Colors.primary }}
                            thumbColor={'white'}
                        />
                    </View>

                    {settings.notificationEnabled && (
                        <View style={styles.row}>
                            <Text style={styles.label}>알림 시간</Text>
                            <View style={styles.timeInputContainer}>
                                <TextInput
                                    style={styles.timeInput}
                                    value={timeInput}
                                    onChangeText={setTimeInput}
                                    placeholder="22:00"
                                    keyboardType="numbers-and-punctuation"
                                    maxLength={5}
                                    returnKeyType="done"
                                    onSubmitEditing={handleTimeSave}
                                />
                                <TouchableOpacity style={styles.saveButton} onPress={handleTimeSave}>
                                    <Text style={styles.saveButtonText}>저장</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>앱 정보</Text>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>버전</Text>
                        <Text style={styles.value}>1.0.0 (MVP)</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>개발자</Text>
                        <Text style={styles.value}>Reflectly Team</Text>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.background,
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 20,
    },
    title: {
        ...Typography.title,
        color: Colors.text.primary,
    },
    section: {
        backgroundColor: Colors.cardBackground,
        marginHorizontal: 20,
        marginBottom: 20,
        borderRadius: 16,
        padding: 20,
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 2,
    },
    sectionTitle: {
        ...Typography.heading,
        fontSize: 18,
        marginBottom: 20,
        color: Colors.text.primary,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    label: {
        ...Typography.body,
        color: Colors.text.primary,
    },
    timeInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    timeInput: {
        ...Typography.body,
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 6,
        width: 80,
        textAlign: 'center',
        marginRight: 10,
    },
    saveButton: {
        backgroundColor: Colors.primary,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
    },
    saveButtonText: {
        ...Typography.caption,
        color: 'white',
        fontWeight: '600',
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    value: {
        ...Typography.body,
        color: Colors.text.secondary,
    },
});
