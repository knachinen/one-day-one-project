import { create } from 'zustand';
import { shallow } from 'zustand/shallow';

interface FilterState {
  selectedCategoryId: string | null;
  setSelectedCategoryId: (categoryId: string | null) => void;
  searchTerm: string; // For future search functionality
  setSearchTerm: (term: string) => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  selectedCategoryId: null,
  setSelectedCategoryId: (categoryId) => set({ selectedCategoryId: categoryId }),
  searchTerm: '',
  setSearchTerm: (term) => set({ searchTerm: term }),
}));

export { shallow };
