import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Button, Alert, Share } from 'react-native';
import { theme } from '../constants/theme';
import * as Clipboard from 'expo-clipboard';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import { useStore } from '../store/useStore';

type EditorScreenRouteProp = RouteProp<RootStackParamList, 'Editor'>;

export default function EditorScreen() {
    const navigation = useNavigation();
    const route = useRoute<EditorScreenRouteProp>();
    const { title, content: initialContent } = route.params;
    const [content, setContent] = useState(initialContent);
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
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.buttonContainer}>
                <Button title="Copy" onPress={handleCopy} />
                <Button title="Share" onPress={handleShare} />
                <Button title="Save" onPress={handleSave} />
            </View>
            <ScrollView style={styles.scrollView}>
                <TextInput
                    style={styles.editor}
                    multiline
                    value={content}
                    onChangeText={setContent}
                    textAlignVertical="top"
                />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
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
});
