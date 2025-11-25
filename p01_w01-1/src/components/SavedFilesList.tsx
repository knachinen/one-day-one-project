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
    <Layout level="1" style={componentStyles.container}>
      <UIKittenText category='h6' style={componentStyles.savedFilesTitle}>저장된 파일</UIKittenText>
      <List
        data={savedFiles}
        keyExtractor={(item) => item.uri}
        renderItem={({ item }) => (
          <ListItem
            title={item.name}
            onPress={() => loadFileContent(item.uri)}
            status="basic"
            size="large"
            style={componentStyles.fileItem}
          />
        )}
        style={componentStyles.fileList}
      />
    </Layout>
  );
}

// Mimicking Eva Design System Light Theme Colors (copied from AppStyles.ts for consistency)
const Colors = {
  primary: "#3366FF",
  background: "#F2F4F7", // A slightly off-white for background
  surface: "#FFFFFF", // White for cards/inputs
  text: "#222B45", // Dark text
  textLight: "#8F9BB3", // Lighter text for placeholders/secondary info
  border: "#E4E9F2", // Light border
  gray500: "#8F9BB3", // Medium gray
  gray300: "#C5CEE0", // Lighter gray
};

const componentStyles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 25,
    marginBottom: 20,
    // background is handled by Layout's level prop
  },
  savedFilesTitle: {
    marginTop: 0,
    marginBottom: 15,
    textAlign: 'center',
    color: Colors.text, // Ensure text color is from theme
  },
  fileList: {
    width: '100%',
    maxHeight: 180,
    borderColor: Colors.border, // Use theme border color
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: Colors.surface, // Use theme surface color
  },
  fileItem: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border, // Use theme border color
  },
});