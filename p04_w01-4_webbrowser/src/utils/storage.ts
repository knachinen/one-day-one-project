import AsyncStorage from '@react-native-async-storage/async-storage';
import { Bookmark, HistoryItem, Settings, Tab } from '../types';

const STORAGE_KEYS = {
    BOOKMARKS: '@browser_bookmarks',
    HISTORY: '@browser_history',
    SETTINGS: '@browser_settings',
    TABS: '@browser_tabs',
    ACTIVE_TAB: '@browser_active_tab',
};

// Bookmarks
export const getBookmarks = async (): Promise<Bookmark[]> => {
    try {
        const data = await AsyncStorage.getItem(STORAGE_KEYS.BOOKMARKS);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('Error loading bookmarks:', error);
        return [];
    }
};

export const saveBookmarks = async (bookmarks: Bookmark[]): Promise<void> => {
    try {
        await AsyncStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarks));
    } catch (error) {
        console.error('Error saving bookmarks:', error);
    }
};

export const addBookmark = async (bookmark: Omit<Bookmark, 'id' | 'createdAt'>): Promise<void> => {
    const bookmarks = await getBookmarks();
    const newBookmark: Bookmark = {
        ...bookmark,
        id: Date.now().toString(),
        createdAt: Date.now(),
    };
    await saveBookmarks([newBookmark, ...bookmarks]);
};

export const deleteBookmark = async (id: string): Promise<void> => {
    const bookmarks = await getBookmarks();
    await saveBookmarks(bookmarks.filter(b => b.id !== id));
};

// History
export const getHistory = async (): Promise<HistoryItem[]> => {
    try {
        const data = await AsyncStorage.getItem(STORAGE_KEYS.HISTORY);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('Error loading history:', error);
        return [];
    }
};

export const saveHistory = async (history: HistoryItem[]): Promise<void> => {
    try {
        await AsyncStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history));
    } catch (error) {
        console.error('Error saving history:', error);
    }
};

export const addHistoryItem = async (item: Omit<HistoryItem, 'id' | 'visitedAt'>): Promise<void> => {
    const history = await getHistory();
    const newItem: HistoryItem = {
        ...item,
        id: Date.now().toString(),
        visitedAt: Date.now(),
    };
    // Keep only last 100 items
    const updatedHistory = [newItem, ...history].slice(0, 100);
    await saveHistory(updatedHistory);
};

export const clearHistory = async (): Promise<void> => {
    await AsyncStorage.removeItem(STORAGE_KEYS.HISTORY);
};

// Settings
const DEFAULT_SETTINGS: Settings = {
    defaultSearchEngine: 'google',
    isDarkMode: false,
    clearCacheOnExit: false,
};

export const getSettings = async (): Promise<Settings> => {
    try {
        const data = await AsyncStorage.getItem(STORAGE_KEYS.SETTINGS);
        return data ? { ...DEFAULT_SETTINGS, ...JSON.parse(data) } : DEFAULT_SETTINGS;
    } catch (error) {
        console.error('Error loading settings:', error);
        return DEFAULT_SETTINGS;
    }
};

export const saveSettings = async (settings: Settings): Promise<void> => {
    try {
        await AsyncStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch (error) {
        console.error('Error saving settings:', error);
    }
};

// Tabs
export const getTabs = async (): Promise<Tab[]> => {
    try {
        const data = await AsyncStorage.getItem(STORAGE_KEYS.TABS);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('Error loading tabs:', error);
        return [];
    }
};

export const saveTabs = async (tabs: Tab[]): Promise<void> => {
    try {
        await AsyncStorage.setItem(STORAGE_KEYS.TABS, JSON.stringify(tabs));
    } catch (error) {
        console.error('Error saving tabs:', error);
    }
};

export const getActiveTabId = async (): Promise<string | null> => {
    try {
        return await AsyncStorage.getItem(STORAGE_KEYS.ACTIVE_TAB);
    } catch (error) {
        console.error('Error loading active tab:', error);
        return null;
    }
};

export const saveActiveTabId = async (tabId: string): Promise<void> => {
    try {
        await AsyncStorage.setItem(STORAGE_KEYS.ACTIVE_TAB, tabId);
    } catch (error) {
        console.error('Error saving active tab:', error);
    }
};
