import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Button, Alert, Share, Modal, TouchableOpacity, TouchableWithoutFeedback, Platform } from 'react-native';
import { theme } from '../constants/theme';
import * as Clipboard from 'expo-clipboard';
import { RouteProp, useRoute, useNavigation, CommonActions } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import { useStore } from '../store/useStore';
import Markdown from 'react-native-markdown-display';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MenuIcon } from 'lucide-react-native';

type EditorScreenRouteProp = RouteProp<RootStackParamList, 'Editor'>;

// Custom Header Menu Button
const HeaderMenuButton = ({ toggleMenu, color }: { toggleMenu: () => void; color: string }) => (
    <TouchableOpacity onPress={toggleMenu} style={{ paddingHorizontal: theme.spacing.m }}>
        <MenuIcon size={24} color={color} />
    </TouchableOpacity>
);

export default function EditorScreen() {
    const navigation = useNavigation();
    const route = useRoute<EditorScreenRouteProp>();
    const { title, content: initialContent } = route.params;
    const [content, setContent] = useState(initialContent);
    const [isPreview, setIsPreview] = useState(true);
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const addNote = useStore((state) => state.addNote);

    // Toggle menu visibility
    const toggleMenu = useCallback(() => {
        setIsMenuVisible(prev => !prev);
    }, []);

    // Set header options
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => <HeaderMenuButton toggleMenu={toggleMenu} color={theme.colors.text} />,
            headerTitle: title, // Use the note's title as the header title
        });
    }, [navigation, toggleMenu, title]);

    const handleSave = () => {
        addNote({
            id: Date.now().toString(),
            title,
            content,
            createdAt: Date.now(),
        });
        Alert.alert('Success', 'Note saved to Notes!'); // Changed to Notes
        setIsMenuVisible(false);
    };

    const handleCopy = async () => {
        await Clipboard.setStringAsync(content);
        Alert.alert('Success', 'Copied to clipboard!');
        setIsMenuVisible(false);
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
        setIsMenuVisible(false);
    };

    const handleEdit = () => {
        setIsPreview(false);
        setIsMenuVisible(false);
    };

    const handlePreview = () => {
        setIsPreview(true);
        setIsMenuVisible(false);
    };

    const handleNavigateBookmarklet = () => {
        setIsMenuVisible(false);
        // Correct navigation for Stack Navigator. Using CommonActions to navigate to a specific screen
        // from the root of the navigator, preventing issues with nested navigators if they were present.
        navigation.dispatch(
            CommonActions.navigate({
                name: 'Bookmarklet', // Ensure this matches your RootStackParamList key
            })
        );
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.contentContainer}>
                {/* No in-content header or title here */}
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

                {/* Menu Modal */}
                <Modal
                    transparent={true}
                    visible={isMenuVisible}
                    onRequestClose={() => setIsMenuVisible(false)}
                    animationType="fade"
                >
                    <TouchableWithoutFeedback onPress={() => setIsMenuVisible(false)}>
                        <View style={styles.modalBackground}>
                            <View style={styles.menuContainer}>
                                <TouchableOpacity onPress={handleCopy} style={styles.menuItem}>
                                    <Text style={styles.menuItemText}>Copy</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handleShare} style={styles.menuItem}>
                                    <Text style={styles.menuItemText}>Share</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handleSave} style={styles.menuItem}>
                                    <Text style={styles.menuItemText}>Save</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handleEdit} style={styles.menuItem}>
                                    <Text style={styles.menuItemText}>Edit</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handlePreview} style={styles.menuItem}>
                                    <Text style={styles.menuItemText}>Preview</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handleNavigateBookmarklet} style={styles.menuItem}>
                                    <Text style={styles.menuItemText}>Bookmarklet Settings</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
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
    // Removed headerControls and title from here
    // title: {
    //     fontSize: 20,
    //     fontWeight: 'bold',
    //     color: theme.colors.text,
    // },
    // Removed menuButton
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
    // toggleContainer is no longer needed
    // toggleContainer: {
    //     flexDirection: 'row',
    //     justifyContent: 'center',
    //     gap: theme.spacing.m,
    //     marginBottom: theme.spacing.m,
    // },
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        paddingTop: 60, // Adjust this based on header height
        paddingRight: theme.spacing.m,
    },
    menuContainer: {
        backgroundColor: theme.colors.card,
        borderRadius: 8,
        minWidth: 150,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
            },
            android: {
                elevation: 5,
            },
        }),
    },
    menuItem: {
        padding: theme.spacing.m,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
    },
    menuItemText: {
        fontSize: theme.textVariants.body.fontSize,
        color: theme.colors.text,
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