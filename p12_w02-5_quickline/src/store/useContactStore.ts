import { create } from 'zustand';
import { Contact, addContactToDB, getContactsFromDB, deleteContactFromDB, updateContactToDB } from '../utils/db';

interface ContactState {
    contacts: Contact[];
    loading: boolean;
    loadContacts: () => Promise<void>;
    addContact: (name: string, phone: string) => Promise<void>;
    removeContact: (id: number) => Promise<void>;
    updateContact: (id: number, name: string, phone: string) => Promise<void>;
}

export const useContactStore = create<ContactState>((set, get) => ({
    contacts: [],
    loading: false,
    loadContacts: async () => {
        set({ loading: true });
        try {
            const contacts = await getContactsFromDB();
            set({ contacts, loading: false });
        } catch (error) {
            console.error('Failed to load contacts', error);
            set({ loading: false });
        }
    },
    addContact: async (name: string, phone: string) => {
        try {
            const id = await addContactToDB(name, phone);
            const newContact = { id, name, phone };
            set((state) => ({ contacts: [...state.contacts, newContact] }));
        } catch (error) {
            console.error('Failed to add contact', error);
        }
    },
    removeContact: async (id: number) => {
        try {
            await deleteContactFromDB(id);
            set((state) => ({
                contacts: state.contacts.filter((c) => c.id !== id),
            }));
        } catch (error) {
            console.error('Failed to remove contact', error);
        }
    },
    updateContact: async (id: number, name: string, phone: string) => {
        try {
            await updateContactToDB(id, name, phone);
            set((state) => ({
                contacts: state.contacts.map((c) => (c.id === id ? { ...c, name, phone } : c)),
            }));
        } catch (error) {
            console.error('Failed to update contact', error);
        }
    },
}));
