import React from 'react';
import { Text, FlatList, TouchableOpacity, StyleSheet, View } from 'react-native';
import { SavedFile } from '../hooks/useFileSystem'; // Import SavedFile type

type SavedFilesListProps = {
  savedFiles: SavedFile[];
  loadFileContent: (uri: string) => void;
  styles: any; // Ideally, define a more specific type for styles
};

export function SavedFilesList({ savedFiles, loadFileContent, styles }: SavedFilesListProps) {
  return (
    <View>
      <Text style={styles.savedFilesTitle}>저장된 파일</Text>
      <FlatList
        data={savedFiles}
        keyExtractor={(item) => item.uri}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => loadFileContent(item.uri)} style={styles.fileItem}>
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
        style={styles.fileList}
      />
    </View>
  );
}