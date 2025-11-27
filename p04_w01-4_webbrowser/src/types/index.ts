export interface Tab {
    id: string;
    url: string;
    title: string;
    favicon?: string;
    canGoBack: boolean;
    canGoForward: boolean;
}

export interface Bookmark {
    id: string;
    url: string;
    title: string;
    favicon?: string;
    createdAt: number;
}

export interface HistoryItem {
    id: string;
    url: string;
    title: string;
    visitedAt: number;
}

export interface Settings {
    defaultSearchEngine: 'google' | 'bing' | 'duckduckgo';
    isDarkMode: boolean;
    clearCacheOnExit: boolean;
}

export type RootTabParamList = {
    Browser: undefined;
    Bookmarks: undefined;
    History: undefined;
    Settings: undefined;
};
