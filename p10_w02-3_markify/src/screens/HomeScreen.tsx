import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../constants/theme';
import { processUrl } from '../utils/converter';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';

export default function HomeScreen() {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);

    const handleConvert = async () => {
        if (!url) {
            Alert.alert('Error', 'Please enter a URL');
            return;
        }

        setLoading(true);
        try {
            const { title, content } = await processUrl(url);
            navigation.navigate('Editor', { title, content });
        } catch (error) {
            Alert.alert('Error', 'Failed to convert URL');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Markify</Text>

            <TextInput
                style={styles.input}
                placeholder="Enter URL to convert"
                value={url}
                onChangeText={setUrl}
                autoCapitalize="none"
                autoCorrect={false}
            />

            {loading ? (
                <ActivityIndicator size="large" color={theme.colors.primary} />
            ) : (
                <Button title="Convert to Markdown" onPress={handleConvert} />
            )}

            <View style={styles.spacer} />
            <Button title="Go to History" onPress={() => navigation.navigate('History')} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.background,
    },
    title: {
        fontSize: theme.textVariants.header.fontSize,
        fontWeight: 'bold',
        marginBottom: theme.spacing.l,
        color: theme.colors.text,
    },
    input: {
        width: '80%',
        height: 50,
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: 8,
        paddingHorizontal: theme.spacing.m,
        marginBottom: theme.spacing.l,
        backgroundColor: theme.colors.card,
    },
    spacer: {
        height: theme.spacing.xl,
    },
});
