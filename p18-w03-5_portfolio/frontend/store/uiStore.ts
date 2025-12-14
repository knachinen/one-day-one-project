import { create } from 'zustand';
import { shallow } from 'zustand/shallow'; // Zustand v5 uses `shallow` for shallow comparison

interface UIState {
  isDarkMode: boolean;
  isModalOpen: boolean;
  modalContent: React.ReactNode | null;
  toastMessage: string | null;
  activeSection: string; // New: To track the currently active section for micro-branding
  toggleDarkMode: () => void;
  openModal: (content: React.ReactNode) => void;
  closeModal: () => void;
  showToast: (message: string) => void;
  clearToast: () => void;
  setActiveSection: (sectionId: string) => void; // New: Function to set active section
}

export const useUIStore = create<UIState>((set) => ({
  isDarkMode: false,
  isModalOpen: false,
  modalContent: null,
  toastMessage: null,
  activeSection: 'hero', // New: Default active section
  
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  openModal: (content) => set({ isModalOpen: true, modalContent: content }),
  closeModal: () => set({ isModalOpen: false, modalContent: null }),
  showToast: (message) => set({ toastMessage: message }),
  clearToast: () => set({ toastMessage: null }),
  setActiveSection: (sectionId: string) => set({ activeSection: sectionId }), // New: Set active section
}));

// Export shallow for use in components, as recommended by Zustand v5 for performance
export { shallow };
