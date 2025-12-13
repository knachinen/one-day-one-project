import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useProjects } from '../useProjects';
import { useFilterStore } from '../../store/filterStore';
import { mockProjects, mockCategories } from '../../data/mockData';
import { ReactNode } from 'react';

// Create a client for tests
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false, // Disable retries for tests
    },
  },
});

// Wrapper component for renderHook
const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useProjects', () => {
  beforeEach(() => {
    // Clear any active queries before each test
    queryClient.clear();
    // Reset the filter store before each test
    useFilterStore.setState({ selectedCategoryId: null, searchTerm: '' });
  });

  it('fetches all projects when no filter is applied', async () => {
    const { result } = renderHook(() => useProjects(), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 1000 });

    expect(result.current.data).toEqual(mockProjects);
  });

  it('filters projects correctly by category ID', async () => {
    const webDevCategory = mockCategories.find(cat => cat.name === 'Web Development');
    if (!webDevCategory) throw new Error('Web Development category not found in mock data');

    // Set filter in the store
    useFilterStore.getState().setSelectedCategoryId(webDevCategory.id);

    const { result } = renderHook(() => useProjects(), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 1000 });

    const expectedProjects = mockProjects.filter(project =>
      project.categories.some(cat => cat.id === webDevCategory.id)
    );
    expect(result.current.data).toEqual(expectedProjects);
  });

  it('filters projects correctly by search term', async () => {
    const searchTerm = 'portfolio';

    // Set search term in the store
    useFilterStore.getState().setSearchTerm(searchTerm);

    const { result } = renderHook(() => useProjects(), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 1000 });

    const expectedProjects = mockProjects.filter(project =>
      project.name.toLowerCase().includes(searchTerm) ||
      project.description.toLowerCase().includes(searchTerm)
    );
    expect(result.current.data).toEqual(expectedProjects);
  });

  it('filters projects correctly by both category ID and search term', async () => {
    const uiUxCategory = mockCategories.find(cat => cat.name === 'UI/UX Design');
    if (!uiUxCategory) throw new Error('UI/UX Design category not found in mock data');
    const searchTerm = 'mobile';

    // Set filters in the store
    useFilterStore.getState().setSelectedCategoryId(uiUxCategory.id);
    useFilterStore.getState().setSearchTerm(searchTerm);

    const { result } = renderHook(() => useProjects(), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 1000 });

    const expectedProjects = mockProjects.filter(project =>
      project.categories.some(cat => cat.id === uiUxCategory.id) &&
      (project.name.toLowerCase().includes(searchTerm) ||
       project.description.toLowerCase().includes(searchTerm))
    );
    expect(result.current.data).toEqual(expectedProjects);
  });
});
