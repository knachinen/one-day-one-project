import AsyncStorage from '@react-native-async-storage/async-storage';
import { Memo, CreateMemoDto, UpdateMemoDto } from '../types';

const MEMO_STORAGE_KEY = '@paperclip_memos';

// Helper to generate unique ID
const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
};

export const StorageService = {
    // Create a new memo
    async createMemo(data: CreateMemoDto): Promise<Memo> {
        try {
            const newMemo: Memo = {
                id: generateId(),
                content: data.content,
                tags: data.tags || [],
                sourceUrl: data.sourceUrl,
                isArchived: false,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };

            const storedMemos = await this.getMemos();
            const updatedMemos = [newMemo, ...storedMemos]; // Add to top

            await AsyncStorage.setItem(MEMO_STORAGE_KEY, JSON.stringify(updatedMemos));
            return newMemo;
        } catch (error) {
            console.error('Failed to create memo:', error);
            throw error;
        }
    },

    // Get all memos (active and archived)
    async getMemos(): Promise<Memo[]> {
        try {
            const jsonValue = await AsyncStorage.getItem(MEMO_STORAGE_KEY);
            return jsonValue != null ? JSON.parse(jsonValue) : [];
        } catch (error) {
            console.error('Failed to fetch memos:', error);
            return [];
        }
    },

    // Get active memos only
    async getActiveMemos(): Promise<Memo[]> {
        const allMemos = await this.getMemos();
        return allMemos.filter(memo => !memo.isArchived);
    },

    // Get archived memos only
    async getArchivedMemos(): Promise<Memo[]> {
        const allMemos = await this.getMemos();
        return allMemos.filter(memo => memo.isArchived);
    },

    // Get a single memo by ID
    async getMemoById(id: string): Promise<Memo | undefined> {
        const allMemos = await this.getMemos();
        return allMemos.find(memo => memo.id === id);
    },

    // Update a memo
    async updateMemo(id: string, updates: UpdateMemoDto): Promise<Memo | null> {
        try {
            const allMemos = await this.getMemos();
            const index = allMemos.findIndex(memo => memo.id === id);

            if (index === -1) return null;

            const updatedMemo = {
                ...allMemos[index],
                ...updates,
                updatedAt: new Date().toISOString(),
            };

            allMemos[index] = updatedMemo;
            await AsyncStorage.setItem(MEMO_STORAGE_KEY, JSON.stringify(allMemos));
            return updatedMemo;
        } catch (error) {
            console.error('Failed to update memo:', error);
            throw error;
        }
    },

    // Archive a memo (helper wrapper around updateMemo)
    async archiveMemo(id: string): Promise<boolean> {
        const result = await this.updateMemo(id, { isArchived: true });
        return result !== null;
    },

    // Restore a memo (helper wrapper around updateMemo)
    async restoreMemo(id: string): Promise<boolean> {
        const result = await this.updateMemo(id, { isArchived: false });
        return result !== null;
    },

    // Delete a memo (permanently - optional for MVP but good for cleanup)
    async deleteMemo(id: string): Promise<boolean> {
        try {
            const allMemos = await this.getMemos();
            const filteredMemos = allMemos.filter(memo => memo.id !== id);

            if (allMemos.length === filteredMemos.length) return false;

            await AsyncStorage.setItem(MEMO_STORAGE_KEY, JSON.stringify(filteredMemos));
            return true;
        } catch (error) {
            console.error('Failed to delete memo:', error);
            throw error;
        }
    },

    // Get all unique tags from active memos
    async getAllTags(): Promise<string[]> {
        const memos = await this.getActiveMemos();
        const tags = new Set<string>();
        memos.forEach(memo => {
            memo.tags.forEach(tag => tags.add(tag));
        });
        return Array.from(tags).sort();
    }
};
