import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, Modal, TouchableWithoutFeedback, Platform } from 'react-native';
import { theme } from '../constants/theme';
import { useStore } from '../store/useStore';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import { Note } from '../types/note';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SettingsIcon } from 'lucide-react-native';

// Custom Header Settings Button
const HeaderSettingsButton = ({ toggleMenu, color }: { toggleMenu: () => void; color: string }) => (
    <TouchableOpacity onPress={toggleMenu} style={{ paddingHorizontal: theme.spacing.m }}>
        <SettingsIcon size={24} color={color} />
    </TouchableOpacity>
);

export default function HistoryScreen() {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const notes = useStore((state) => state.notes);
    const deleteNote = useStore((state) => state.deleteNote);
    const [isMenuVisible, setIsMenuVisible] = useState(false);

    // Toggle menu visibility
    const toggleMenu = useCallback(() => {
        setIsMenuVisible(prev => !prev);
    }, []);

    // Set header options
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => <HeaderSettingsButton toggleMenu={toggleMenu} color={theme.colors.text} />,
            headerTitle: 'Notes', // Use the screen's title as the header title
        });
    }, [navigation, toggleMenu]);


    const handlePress = (note: Note) => {
        navigation.navigate('Editor', { title: note.title, content: note.content });
    };

    const handleDelete = (id: string) => {
        Alert.alert('Delete Note', 'Are you sure?', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Delete', style: 'destructive', onPress: () => deleteNote(id) },
        ]);
    };

    const renderItem = ({ item }: { item: Note }) => (
        <TouchableOpacity
            style={styles.item}
            onPress={() => handlePress(item)}
            onLongPress={() => handleDelete(item.id)}
        >
            <Text style={styles.itemTitle} numberOfLines={1}>
                {item.title}
            </Text>
            <Text style={styles.itemDate}>
                {new Date(item.createdAt).toLocaleDateString()}
            </Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.contentContainer}>
                {/* Removed in-content headerContainer */}
                <FlatList
                    data={notes}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    contentContainerStyle={styles.flatListContent}
                    ListEmptyComponent={<Text style={styles.emptyText}>No saved notes</Text>}
                />

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
                                <TouchableOpacity
                                    onPress={() => {
                                        setIsMenuVisible(false);
                                        navigation.navigate('Bookmarklet');
                                    }}
                                    style={styles.menuItem}
                                >
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.background,
        padding: theme.spacing.m,
    },
    // Removed headerContainer and its contents
    // headerContainer: {
    //     flexDirection: 'row',
    //     justifyContent: 'space-between',
    //     alignItems: 'center',
    //     width: '100%',
    //     marginBottom: theme.spacing.m,
    //     paddingHorizontal: theme.spacing.m, // Added for spacing
    // },
    // title: {
    //     fontSize: theme.textVariants.header.fontSize,
    //     fontWeight: 'bold',
    //     color: theme.colors.text,
    // },
    // Removed settingsButton
    flatListContent: {
        flexGrow: 1,
        width: '100%',
        paddingBottom: theme.spacing.xl,
    },
    item: {
        backgroundColor: theme.colors.card,
        padding: theme.spacing.m,
        borderRadius: 8,
        marginBottom: theme.spacing.s,
        borderWidth: 1,
        borderColor: theme.colors.border,
        width: '100%',
    },
    itemTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: theme.colors.text,
        marginBottom: 4,
    },
    itemDate: {
        fontSize: 14,
        color: '#666',
    },
    emptyText: {
        textAlign: 'center',
        color: '#999',
        marginTop: theme.spacing.xl,
    },
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-start', // Align to top
        alignItems: 'flex-end',      // Align to right
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