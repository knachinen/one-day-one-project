import { useQuery } from '@tanstack/react-query';
import { IProject } from '@/types';
import { mockProjects } from '@/data/mockData';
import { useFilterStore, shallow } from '@/store/filterStore';
import { useMemo } from 'react';

// Function to simulate API call (now accepts filters for query key invalidation)
const fetchProjects = async (selectedCategoryId: string | null, searchTerm: string): Promise<IProject[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filteredProjects = mockProjects;

      if (selectedCategoryId) {
        filteredProjects = filteredProjects.filter(project =>
          project.categories.some(cat => cat.id === selectedCategoryId)
        );
      }

      if (searchTerm) {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        filteredProjects = filteredProjects.filter(project =>
          project.name.toLowerCase().includes(lowerCaseSearchTerm) ||
          project.description.toLowerCase().includes(lowerCaseSearchTerm)
        );
      }
      resolve(filteredProjects);
    }, 500); // Simulate network delay
  });
};

export const useProjects = () => {
  const { selectedCategoryId, searchTerm } = useFilterStore(
    (state) => ({
      selectedCategoryId: state.selectedCategoryId,
      searchTerm: state.searchTerm,
    }),
    shallow
  );

  const queryResult = useQuery<IProject[], Error>({
    queryKey: ['projects', { category: selectedCategoryId, search: searchTerm }],
    queryFn: () => fetchProjects(selectedCategoryId, searchTerm),
    staleTime: 1000 * 60 * 5, // Data is fresh for 5 minutes
  });

  return queryResult;
};
