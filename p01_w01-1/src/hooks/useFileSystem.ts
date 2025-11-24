import { useState, useEffect } from 'react';
import * as FileSystem from 'expo-file-system';
import { Alert } from 'react-native';

export type SavedFile = {
  name: string;
  uri: string;
};

export function useFileSystem() {
  const [documentDirectoryUri, setDocumentDirectoryUri] = useState<string | null>(null);
  const [savedFiles, setSavedFiles] = useState<SavedFile[]>([]);
  const [writingContent, setWritingContent] = useState(''); // Added to facilitate handleSave

  useEffect(() => {
    async function initializeFileSystem() {
      console.log('useEffect - FileSystem.documentDirectory:', FileSystem.documentDirectory); // Debug log
      if (FileSystem.documentDirectory) {
        setDocumentDirectoryUri(FileSystem.documentDirectory);
      } else {
        console.warn('FileSystem.documentDirectory is not available in useEffect.'); // Debug warn
      }
    }
    initializeFileSystem();
  }, []);

  const loadSavedFiles = async () => {
    console.log('loadSavedFiles - documentDirectoryUri:', documentDirectoryUri); // Debug log
    if (!documentDirectoryUri) {
      Alert.alert('오류', '문서 디렉토리를 찾을 수 없습니다.');
      return;
    }
    try {
      const writingsDirUri = documentDirectoryUri + 'writings/';
      const writingsDirectory = new FileSystem.Directory(documentDirectoryUri, 'writings');
      await writingsDirectory.create(); // Ensure directory exists
      const files = await FileSystem.readDirectoryAsync(writingsDirUri);
      const fileList = files.map(name => ({
        name: name,
        uri: writingsDirUri + name,
      })).sort((a, b) => b.name.localeCompare(a.name)); // Sort by name descending (newest first)
      setSavedFiles(fileList);
    } catch (error) {
      console.error("저장된 파일 목록 가져오기 실패:", error);
      Alert.alert('오류', '저장된 파일을 불러오는 데 실패했습니다.');
    }
  };

  const loadFileContent = async (fileUri: string) => {
    try {
      const content = await FileSystem.readAsStringAsync(fileUri);
      setWritingContent(content);
      Alert.alert('성공', '파일 내용이 불러와졌습니다.');
    } catch (error) {
      console.error("파일 내용 불러오기 실패:", error);
      Alert.alert('오류', '파일 내용을 불러오는 데 실패했습니다.');
    }
  };

  const handleSave = async (contentToSave: string) => {
    console.log('handleSave - documentDirectoryUri:', documentDirectoryUri); // Debug log
    if (!contentToSave.trim()) {
      Alert.alert('알림', '저장할 내용이 없습니다.');
      return;
    }

    if (!documentDirectoryUri) {
      Alert.alert('오류', '문서 디렉토리를 찾을 수 없습니다.');
      return;
    }

    try {
      const filename = `writing_${Date.now()}.md`;
      const writingsDirUri = documentDirectoryUri + 'writings/';
      const writingsDirectory = new FileSystem.Directory(documentDirectoryUri, 'writings');
      await writingsDirectory.create(); // Ensure directory exists
      const fileUri = writingsDirUri + filename;
      await FileSystem.writeAsStringAsync(fileUri, contentToSave);
      Alert.alert('성공', `글이 ${filename} 파일로 저장되었습니다.`);
      // setWritingContent(''); // This should be handled by the component using the hook
      loadSavedFiles(); // Reload saved files list
    } catch (error) {
      console.error("파일 저장 실패:", error);
      Alert.alert('오류', '글 저장에 실패했습니다.');
    }
  };

  return {
    documentDirectoryUri,
    savedFiles,
    loadSavedFiles,
    loadFileContent,
    handleSave,
    writingContent, // Export writingContent for App.tsx to use
    setWritingContent, // Export setWritingContent for App.tsx to use
  };
}