import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../constants/theme';
import { processUrl, convertToMarkdown } from '../utils/converter';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';

export default function HomeScreen() {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const [inputMode, setInputMode] = useState<'url' | 'html'>('url');
    const [url, setUrl] = useState('');
    const [htmlText, setHtmlText] = useState('');
    const [loading, setLoading] = useState(false);

    const handleConvert = async () => {
        if (inputMode === 'url') {
            if (!url) {
                Alert.alert('Error', 'Please enter a URL');
                return;
            }

            setLoading(true);
            try {
                const { title, content } = await processUrl(url);
                navigation.navigate('Editor', { title, content });
            } catch (error) {
                Alert.alert('Error', 'Failed to convert URL. Try using HTML text mode instead.');
            } finally {
                setLoading(false);
            }
        } else {
            if (!htmlText) {
                Alert.alert('Error', 'Please paste HTML content');
                return;
            }

            setLoading(true);
            try {
                const titleMatch = htmlText.match(/<title>(.*?)<\/title>/i);
                const title = titleMatch ? titleMatch[1] : 'Pasted Content';
                const content = convertToMarkdown(htmlText);
                navigation.navigate('Editor', { title, content });
            } catch (error) {
                Alert.alert('Error', 'Failed to convert HTML');
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Markify</Text>

            <View style={styles.toggleContainer}>
                <Button
                    title="URL"
                    onPress={() => setInputMode('url')}
                    color={inputMode === 'url' ? theme.colors.primary : '#999'}
                />
                <Button
                    title="HTML Text"
                    onPress={() => setInputMode('html')}
                    color={inputMode === 'html' ? theme.colors.primary : '#999'}
                />
            </View>

            {inputMode === 'url' ? (
                <TextInput
                    style={styles.input}
                    placeholder="Enter URL to convert"
                    value={url}
                    onChangeText={setUrl}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
            ) : (
                <TextInput
                    style={[styles.input, styles.htmlInput]}
                    placeholder="Paste HTML content here"
                    value={htmlText}
                    onChangeText={setHtmlText}
                    multiline
                    numberOfLines={6}
                    textAlignVertical="top"
                />
            )}

            {loading ? (
                <ActivityIndicator size="large" color={theme.colors.primary} />
            ) : (
                <Button title="Convert to Markdown" onPress={handleConvert} />
            )}

            <View style={styles.spacer} />
            <Button title="Go to History" onPress={() => navigation.navigate('History')} />
            <View style={styles.smallSpacer} />
            <Button title="북마클릿 설정" onPress={() => navigation.navigate('Bookmarklet')} color="#666" />
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
    smallSpacer: {
        height: theme.spacing.s,
    },
    toggleContainer: {
        flexDirection: 'row',
        gap: theme.spacing.m,
        marginBottom: theme.spacing.m,
    },
    htmlInput: {
        height: 150,
        paddingTop: theme.spacing.m,
    },
});
