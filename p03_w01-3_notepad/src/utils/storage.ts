import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Note {
    id: string;
    title: string;
    content: string;
    createdAt: number;
    updatedAt: number;
}

const STORAGE_KEY = '@mvp_notepad_notes';

export const saveNotes = async (notes: Note[]): Promise<void> => {
    try {
        const jsonValue = JSON.stringify(notes);
        await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
    } catch (e) {
        console.error('Failed to save notes', e);
    }
};

export const loadNotes = async (): Promise<Note[]> => {
    try {
        const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
        return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
        console.error('Failed to load notes', e);
        return [];
    }
};
