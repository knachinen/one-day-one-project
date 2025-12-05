import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Pressable,
    Image,
    Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import { COLORS, SPACING, FONT_SIZE, LAYOUT } from '../constants/theme';

export const OnboardingScreen = () => {
    const navigation = useNavigation<any>();

    const handleGetStarted = async () => {
        try {
            // Request Location Permission
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert(
                    'Permission Required',
                    'Location permission is needed to send your coordinates in an emergency.'
                );
                return;
            }

            // Mark onboarding as completed
            await AsyncStorage.setItem('hasLaunched', 'true');

            // Navigate to Contacts to set up ICE contacts immediately
            navigation.replace('Contacts');
        } catch (error) {
            console.error('Error during onboarding:', error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.iconContainer}>
                    <Text style={styles.icon}>🚨</Text>
                </View>

                <Text style={styles.title}>Welcome to QuickLine</Text>

                <Text style={styles.description}>
                    Your one-tap emergency assistant.
                </Text>

                <View style={styles.featureList}>
                    <FeatureItem
                        icon="📍"
                        text="Share your exact location instantly."
                    />
                    <FeatureItem
                        icon="📞"
                        text="Call emergency contacts with one tap."
                    />
                    <FeatureItem
                        icon="🏥"
                        text="Store critical medical information."
                    />
                </View>

                <Text style={styles.note}>
                    We need Location access to help you in emergencies.
                </Text>
            </View>

            <View style={styles.footer}>
                <Pressable style={styles.button} onPress={handleGetStarted}>
                    <Text style={styles.buttonText}>Get Started</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
};

const FeatureItem = ({ icon, text }: { icon: string; text: string }) => (
    <View style={styles.featureItem}>
        <Text style={styles.featureIcon}>{icon}</Text>
        <Text style={styles.featureText}>{text}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: SPACING.l,
    },
    iconContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#FFEBEE', // Light red
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: SPACING.xl,
    },
    icon: {
        fontSize: 48,
    },
    title: {
        fontSize: FONT_SIZE.xxl,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: SPACING.s,
        textAlign: 'center',
    },
    description: {
        fontSize: FONT_SIZE.l,
        color: COLORS.textSecondary,
        marginBottom: SPACING.xl,
        textAlign: 'center',
    },
    featureList: {
        width: '100%',
        marginBottom: SPACING.xl,
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SPACING.m,
        backgroundColor: COLORS.white,
        padding: SPACING.m,
        borderRadius: 12,
        elevation: 1,
    },
    featureIcon: {
        fontSize: 24,
        marginRight: SPACING.m,
    },
    featureText: {
        fontSize: FONT_SIZE.m,
        color: COLORS.text,
        flex: 1,
    },
    note: {
        fontSize: FONT_SIZE.s,
        color: COLORS.textSecondary,
        textAlign: 'center',
        marginTop: SPACING.m,
    },
    footer: {
        padding: SPACING.l,
        paddingBottom: SPACING.xl,
    },
    button: {
        backgroundColor: COLORS.primary,
        height: LAYOUT.actionButtonHeight,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
    },
    buttonText: {
        color: COLORS.white,
        fontSize: FONT_SIZE.l,
        fontWeight: 'bold',
    },
});
