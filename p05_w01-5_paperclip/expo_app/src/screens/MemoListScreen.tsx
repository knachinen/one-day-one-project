
import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { StorageService } from '../services/storage';
import { SearchService } from '../services/search';
import { Memo } from '../types';
import { theme } from '../theme';
import { useDebounce } from '../hooks/useDebounce';

import SearchBar from '../components/SearchBar';
import TagChip from '../components/TagChip';
import MemoItem from '../components/MemoItem';

export default function MemoListScreen({ navigation }) {
  const [memos, setMemos] = useState<Memo[]>([]);
  const [filteredMemos, setFilteredMemos] = useState<Memo[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [allTags, setAllTags] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Load data when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  // Filter memos when query or tags change
  useEffect(() => {
    const results = SearchService.search(memos, debouncedSearchQuery, selectedTags);
    setFilteredMemos(results);
  }, [debouncedSearchQuery, selectedTags, memos]);

  const loadData = async () => {
    try {
      const [activeMemos, tags] = await Promise.all([
        StorageService.getActiveMemos(),
        StorageService.getAllTags(),
      ]);
      setMemos(activeMemos);
      setAllTags(tags);
    } catch (error) {
      console.error('Failed to load data', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleArchive = async (id: string) => {
    await StorageService.archiveMemo(id);
    loadData(); // Reload to remove archived item from list
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          onClear={() => setSearchQuery('')}
        />
      </View>

      {allTags.length > 0 && (
        <View style={styles.tagFilterContainer}>
          <FlatList
            data={allTags}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item}
            renderItem={({ item }) => (
              <TagChip
                label={item}
                selected={selectedTags.includes(item)}
                onPress={() => toggleTag(item)}
              />
            )}
            contentContainerStyle={styles.tagListContent}
          />
        </View>
      )}

      <FlatList
        data={filteredMemos}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <MemoItem
            memo={item}
            onPress={() => navigation.navigate('MemoDetail', { memoId: item.id })}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {searchQuery || selectedTags.length > 0
                ? 'No memos match your search.'
                : 'No memos yet. Tap + to create one.'}
            </Text>
          </View>
        }
        contentContainerStyle={styles.listContent}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('CreateMemo')}
      >
        <Ionicons name="add" size={30} color="#FFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  header: { paddingHorizontal: theme.spacing.md, paddingTop: theme.spacing.sm },
  tagFilterContainer: { paddingLeft: theme.spacing.md, marginBottom: theme.spacing.sm },
  tagListContent: { paddingRight: theme.spacing.md },
  listContent: { paddingBottom: 80 },
  emptyContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 50 },
  emptyText: { color: theme.colors.textSecondary, fontSize: theme.typography.fontSizeMedium },
  fab: {
    position: 'absolute',
    right: theme.spacing.lg,
    bottom: theme.spacing.lg,
    backgroundColor: theme.colors.primary,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
