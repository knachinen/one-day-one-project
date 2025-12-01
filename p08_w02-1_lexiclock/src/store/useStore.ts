import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AppState {
    is24Hour: boolean;
    toggle24Hour: () => void;
}

export const useStore = create<AppState>()(
    persist(
        (set) => ({
            is24Hour: true,
            toggle24Hour: () => set((state) => ({ is24Hour: !state.is24Hour })),
        }),
        {
            name: 'lexiclock-storage',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
