import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Button, Alert, Share } from 'react-native';
import { theme } from '../constants/theme';
import * as Clipboard from 'expo-clipboard';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import { useStore } from '../store/useStore';
import Markdown from 'react-native-markdown-display';
import { SafeAreaView } from 'react-native-safe-area-context';

type EditorScreenRouteProp = RouteProp<RootStackParamList, 'Editor'>;

export default function EditorScreen() {
    const navigation = useNavigation();
    const route = useRoute<EditorScreenRouteProp>();
    const { title, content: initialContent } = route.params;
    const [content, setContent] = useState(initialContent);
    const [isPreview, setIsPreview] = useState(false);
    const addNote = useStore((state) => state.addNote);

    const handleSave = () => {
        const newNote = {
            id: Date.now().toString(),
            title,
            content,
            createdAt: Date.now(),
        };
        addNote(newNote);
        Alert.alert('Success', 'Note saved to History!');
    };

    const handleCopy = async () => {
        await Clipboard.setStringAsync(content);
        Alert.alert('Success', 'Copied to clipboard!');
    };

    const handleShare = async () => {
        try {
            await Share.share({
                message: content,
                title: title,
            });
        } catch (error) {
            Alert.alert('Error', 'Failed to share content');
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.contentContainer}>
                <Text style={styles.title}>{title}</Text>
                <View style={styles.buttonContainer}>
                    <Button title="Copy" onPress={handleCopy} />
                    <Button title="Share" onPress={handleShare} />
                    <Button title="Save" onPress={handleSave} />
                </View>
                <View style={styles.toggleContainer}>
                    <Button
                        title="Edit"
                        onPress={() => setIsPreview(false)}
                        color={!isPreview ? theme.colors.primary : '#999'}
                    />
                    <Button
                        title="Preview"
                        onPress={() => setIsPreview(true)}
                        color={isPreview ? theme.colors.primary : '#999'}
                    />
                </View>
                <ScrollView style={styles.scrollView}>
                    {isPreview ? (
                        <Markdown style={markdownStyles}>{content}</Markdown>
                    ) : (
                        <TextInput
                            style={styles.editor}
                            multiline
                            value={content}
                            onChangeText={setContent}
                            textAlignVertical="top"
                        />
                    )}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    contentContainer: {
        flex: 1,
        backgroundColor: theme.colors.background,
        padding: theme.spacing.m,
    },
    title: {
        fontSize: theme.textVariants.header.fontSize,
        fontWeight: 'bold',
        color: theme.colors.text,
        marginBottom: theme.spacing.m,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: theme.spacing.m,
    },
    scrollView: {
        flex: 1,
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: 8,
        padding: theme.spacing.s,
    },
    editor: {
        fontSize: theme.textVariants.body.fontSize,
        color: theme.colors.text,
        textAlignVertical: 'top',
    },
    toggleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: theme.spacing.m,
        marginBottom: theme.spacing.m,
    },
});

const markdownStyles = {
    body: {
        color: theme.colors.text,
        fontSize: theme.textVariants.body.fontSize,
    },
    heading1: {
        fontSize: 28,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
    },
    heading2: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 16,
        marginBottom: 8,
    },
    heading3: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 12,
        marginBottom: 6,
    },
    code_inline: {
        backgroundColor: '#f0f0f0',
        padding: 2,
        borderRadius: 4,
        fontFamily: 'monospace',
    },
    code_block: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 4,
        fontFamily: 'monospace',
    },
    link: {
        color: '#0066cc',
    },
};