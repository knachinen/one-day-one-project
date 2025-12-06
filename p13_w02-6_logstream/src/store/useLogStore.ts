import { create } from 'zustand';
import { LogEntry, LogLevel } from '../utils/logParser';

interface LogState {
    logs: LogEntry[];
    isCapturing: boolean;
    filterLevel: LogLevel | null; // null means all
    filterTag: string;
    filterText: string;

    addLog: (log: LogEntry) => void;
    addLogs: (newLogs: LogEntry[]) => void;
    clearLogs: () => void;
    setCapturing: (capturing: boolean) => void;
    setFilterLevel: (level: LogLevel | null) => void;
    setFilterTag: (tag: string) => void;
    setFilterText: (text: string) => void;
}

export const useLogStore = create<LogState>((set) => ({
    logs: [],
    isCapturing: false, // Default to not capturing until permission checked
    filterLevel: null,
    filterTag: '',
    filterText: '',

    addLog: (log) => set((state) => {
        if (!state.isCapturing) return state;
        const newLogs = [...state.logs, log];
        if (newLogs.length > 5000) {
            return { logs: newLogs.slice(newLogs.length - 5000) };
        }
        return { logs: newLogs };
    }),

    addLogs: (newLogs) => set((state) => {
        if (!state.isCapturing) return state;
        let updatedLogs = [...state.logs, ...newLogs];
        if (updatedLogs.length > 5000) {
            updatedLogs = updatedLogs.slice(updatedLogs.length - 5000);
        }
        return { logs: updatedLogs };
    }),

    clearLogs: () => set({ logs: [] }),
    setCapturing: (capturing) => set({ isCapturing: capturing }),
    setFilterLevel: (level) => set({ filterLevel: level }),
    setFilterTag: (tag) => set({ filterTag: tag }),
    setFilterText: (text) => set({ filterText: text }),
}));
