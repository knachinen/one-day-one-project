import React from 'react';
import { FlatList, TouchableOpacity, StyleSheet, View } from 'react-native';
import { SavedFile } from '../hooks/useFileSystem'; // Import SavedFile type
import { Text as UIKittenText, Layout, List, ListItem } from '@ui-kitten/components'; // Import UI Kitten components

type SavedFilesListProps = {
  savedFiles: SavedFile[];
  loadFileContent: (uri: string) => void;
};

export function SavedFilesList({ savedFiles, loadFileContent }: SavedFilesListProps) {
  return (
    <Layout style={componentStyles.container}>
      <UIKittenText category='h6' style={componentStyles.savedFilesTitle}>저장된 파일</UIKittenText>
      <List
        data={savedFiles}
        keyExtractor={(item) => item.uri}
        renderItem={({ item }) => (
          <ListItem
            title={item.name}
            onPress={() => loadFileContent(item.uri)}
            style={componentStyles.fileItem}
          />
        )}
        style={componentStyles.fileList}
      />
    </Layout>
  );
}

const componentStyles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 25,
    marginBottom: 20,
    backgroundColor: 'transparent', // Make background transparent if Layout has default color
  },
  savedFilesTitle: {
    marginTop: 0, // Reset margin since Layout padding handles it
    marginBottom: 15,
    textAlign: 'center',
  },
  fileList: {
    width: '100%',
    maxHeight: 180,
    borderColor: '#eee',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  fileItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
});