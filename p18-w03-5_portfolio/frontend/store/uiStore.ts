import { create } from 'zustand';
import { shallow } from 'zustand/shallow'; // Zustand v5 uses `shallow` for shallow comparison

interface UIState {
  isDarkMode: boolean;
  isModalOpen: boolean;
  modalContent: React.ReactNode | null;
  toastMessage: string | null;
  toggleDarkMode: () => void;
  openModal: (content: React.ReactNode) => void;
  closeModal: () => void;
  showToast: (message: string) => void;
  clearToast: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isDarkMode: false,
  isModalOpen: false,
  modalContent: null,
  toastMessage: null,
  
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  openModal: (content) => set({ isModalOpen: true, modalContent: content }),
  closeModal: () => set({ isModalOpen: false, modalContent: null }),
  showToast: (message) => set({ toastMessage: message }),
  clearToast: () => set({ toastMessage: null }),
}));

// Export shallow for use in components, as recommended by Zustand v5 for performance
export { shallow };
