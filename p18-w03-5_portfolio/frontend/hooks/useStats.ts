import { useQuery } from '@tanstack/react-query';
import { IStats } from '@/types';
import { mockStats } from '@/data/mockData';

// Function to simulate API call for stats
const fetchStats = async (): Promise<IStats[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockStats);
    }, 300); // Simulate network delay
  });
};

export const useStats = () => {
  return useQuery<IStats[], Error>({
    queryKey: ['stats'],
    queryFn: fetchStats,
    staleTime: 1000 * 60 * 60, // Stats can be fresh for longer
  });
};
