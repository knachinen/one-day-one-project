import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Pressable,
    FlatList,
    Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useContactStore } from '../store/useContactStore';
import { COLORS, SPACING, FONT_SIZE } from '../constants/theme';

export const ContactsScreen = () => {
    const navigation = useNavigation<any>();
    const { contacts, addContact, removeContact, loadContacts } = useContactStore();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    useEffect(() => {
        loadContacts();
    }, []);

    const handleAddContact = async () => {
        if (contacts.length >= 3) {
            Alert.alert('Limit Reached', 'You can only add up to 3 emergency contacts.');
            return;
        }
        if (!name.trim() || !phone.trim()) {
            Alert.alert('Invalid Input', 'Please enter both name and phone number.');
            return;
        }
        await addContact(name, phone);
        setName('');
        setPhone('');
    };

    const handleRemoveContact = (id: number) => {
        Alert.alert(
            'Remove Contact',
            'Are you sure you want to remove this contact?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Remove', style: 'destructive', onPress: () => removeContact(id) },
            ]
        );
    };

    const renderItem = ({ item }: { item: { id: number; name: string; phone: string } }) => (
        <View style={styles.contactCard}>
            <View style={styles.contactInfo}>
                <Text style={styles.contactName}>{item.name}</Text>
                <Text style={styles.contactPhone}>{item.phone}</Text>
            </View>
            <Pressable onPress={() => handleRemoveContact(item.id)} style={styles.deleteButton}>
                <Ionicons name="trash-outline" size={24} color={COLORS.error} />
            </Pressable>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerTop}>
                    <Text style={styles.title}>Emergency Contacts</Text>
                    <Pressable onPress={() => navigation.navigate('Profile')} style={styles.profileLink}>
                        <Text style={styles.profileLinkText}>Medical Profile</Text>
                        <Ionicons name="chevron-forward" size={16} color={COLORS.primary} />
                    </Pressable>
                </View>
                <Text style={styles.subtitle}>Add up to 3 contacts to call quickly.</Text>
            </View>

            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder="Name (e.g., Mom)"
                    value={name}
                    onChangeText={setName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Phone Number"
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                />
                <Pressable
                    style={[
                        styles.addButton,
                        contacts.length >= 3 && styles.disabledButton,
                    ]}
                    onPress={handleAddContact}
                    disabled={contacts.length >= 3}
                >
                    <Text style={styles.addButtonText}>
                        {contacts.length >= 3 ? 'Limit Reached' : 'Add Contact'}
                    </Text>
                </Pressable>
            </View>

            <FlatList
                data={contacts}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.list}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>No contacts added yet.</Text>
                }
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        padding: SPACING.m,
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    profileLink: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileLinkText: {
        color: COLORS.primary,
        fontWeight: '600',
        marginRight: 4,
    },
    title: {
        fontSize: FONT_SIZE.xl,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    subtitle: {
        fontSize: FONT_SIZE.m,
        color: COLORS.textSecondary,
        marginTop: SPACING.xs,
    },
    form: {
        padding: SPACING.m,
        backgroundColor: COLORS.white,
        margin: SPACING.m,
        borderRadius: 12,
        elevation: 2,
    },
    input: {
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 8,
        padding: SPACING.m,
        marginBottom: SPACING.m,
        fontSize: FONT_SIZE.m,
    },
    addButton: {
        backgroundColor: COLORS.primary,
        padding: SPACING.m,
        borderRadius: 8,
        alignItems: 'center',
    },
    disabledButton: {
        backgroundColor: COLORS.textSecondary,
    },
    addButtonText: {
        color: COLORS.white,
        fontWeight: 'bold',
        fontSize: FONT_SIZE.m,
    },
    list: {
        padding: SPACING.m,
    },
    contactCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        padding: SPACING.m,
        borderRadius: 12,
        marginBottom: SPACING.m,
        elevation: 1,
    },
    contactInfo: {
        flex: 1,
    },
    contactName: {
        fontSize: FONT_SIZE.l,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    contactPhone: {
        fontSize: FONT_SIZE.m,
        color: COLORS.textSecondary,
        marginTop: SPACING.xs,
    },
    deleteButton: {
        padding: SPACING.s,
    },
    emptyText: {
        textAlign: 'center',
        color: COLORS.textSecondary,
        marginTop: SPACING.xl,
    },
});
