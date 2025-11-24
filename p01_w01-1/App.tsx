import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, ActivityIndicator, Alert, FlatList, TouchableOpacity } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset'; // Import Asset



export default function App() {
  const [webAddress, setWebAddress] = useState('');
  const [randomWord, setRandomWord] = useState('여기에 무작위 단어가 표시됩니다.');
  const [writingContent, setWritingContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [savedFiles, setSavedFiles] = useState<{ name: string, uri: string }[]>([]);
  const [commonWordsList, setCommonWordsList] = useState<string[]>([]); // New state for common words

  // Load common words on component mount
  useEffect(() => {
    async function loadCommonWords() {
      try {
        const [{ localUri }] = await Asset.loadAsync(require('./commonWords.txt'));
        const text = await FileSystem.readAsStringAsync(localUri);
        const words = text.split('\n').map(word => word.trim()).filter(word => word.length > 0);
        setCommonWordsList(words);
      } catch (error) {
        console.error("자주 쓰이는 단어 파일 불러오기 실패:", error);
        Alert.alert('오류', '자주 쓰이는 단어 파일을 불러오지 못했습니다.');
      }
    }
    loadCommonWords();
    loadSavedFiles(); // Also load saved files
  }, []);

  const extractRandomWord = (text: string) => {
    // Basic text cleaning: remove HTML tags and common punctuation, then split into words
    const cleanText = text.replace(/<[^>]*>?/gm, '') // Remove HTML tags
                          .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '') // Remove punctuation
                          .replace(/\s\s+/g, ' ') // Replace multiple spaces with a single space
                          .trim();
    const words = cleanText.split(' ').filter(word => word.length > 2); // Filter out very short words

    if (words.length > 0) {
      const randomIndex = Math.floor(Math.random() * words.length);
      setRandomWord(words[randomIndex]);
    } else {
      setRandomWord('단어를 찾을 수 없습니다.');
    }
  };

  const fetchRandomWord = async () => {
    if (!webAddress) {
      // If webAddress is empty, use common words
      if (commonWordsList.length > 0) {
        const randomIndex = Math.floor(Math.random() * commonWordsList.length);
        setRandomWord(commonWordsList[randomIndex]);
        return;
      } else {
        Alert.alert('알림', '웹 주소를 입력하거나, 미리 정의된 단어 목록이 없습니다.');
        return;
      }
    }

    setIsLoading(true);
    try {
      const response = await fetch(webAddress);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const text = await response.text();
      extractRandomWord(text);
    } catch (error) {
      console.error("웹 콘텐츠 가져오기 실패:", error);
      Alert.alert('오류', '웹 콘텐츠를 가져오지 못했습니다. 주소를 확인하거나 다른 주소를 시도해주세요.');
      setRandomWord('단어를 가져오는 데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const loadSavedFiles = async () => {
    try {
      if (!FileSystem.documentDirectory) {
        Alert.alert('오류', '문서 디렉토리를 찾을 수 없습니다.');
        return;
      }
      const writingsDirUri = FileSystem.documentDirectory + 'writings/';
      const writingsDirectory = new FileSystem.Directory(FileSystem.documentDirectory, 'writings');
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

  const handleSave = async () => {
    if (!writingContent.trim()) {
      Alert.alert('알림', '저장할 내용이 없습니다.');
      return;
    }

    try {
      const filename = `writing_${Date.now()}.md`;
      if (!FileSystem.documentDirectory) {
        Alert.alert('오류', '문서 디렉토리를 찾을 수 없습니다.');
        return;
      }
      const writingsDirUri = FileSystem.documentDirectory + 'writings/';
      const writingsDirectory = new FileSystem.Directory(FileSystem.documentDirectory, 'writings');
      await writingsDirectory.create(); // Ensure directory exists
      const fileUri = writingsDirUri + filename;
      await FileSystem.writeAsStringAsync(fileUri, writingContent);
      Alert.alert('성공', `글이 ${filename} 파일로 저장되었습니다.`);
      setWritingContent(''); // Clear content after saving
      loadSavedFiles(); // Reload saved files list
    } catch (error) {
      console.error("파일 저장 실패:", error);
      Alert.alert('오류', '글 저장에 실패했습니다.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>1일 1코딩 - p01_w01-1</Text>

      <TextInput
        style={styles.input}
        placeholder="웹 주소를 입력하세요 (예: https://example.com)"
        value={webAddress}
        onChangeText={setWebAddress}
        keyboardType="url"
        autoCapitalize="none"
      />
      <Button title="단어 가져오기" onPress={fetchRandomWord} disabled={isLoading} />

      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" style={{ marginVertical: 20 }} />
      ) : (
        <Text style={styles.randomWord}>{randomWord}</Text>
      )}

      <TextInput
        style={styles.textArea}
        placeholder="여기에 글을 작성하세요..."
        value={writingContent}
        onChangeText={setWritingContent}
        multiline
        textAlignVertical="top"
      />

      <Button title="저장" onPress={handleSave} />

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

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0', // Lighter background
    alignItems: 'center',
    justifyContent: 'flex-start', // Align to top for better content flow
    padding: 20,
    paddingTop: 60, // More top padding for status bar
  },
  title: {
    fontSize: 28, // Slightly larger title
    fontWeight: '600', // Medium bold
    color: '#333',
    marginBottom: 25,
  },
  input: {
    width: '100%',
    height: 45, // Slightly taller input
    borderColor: '#ccc', // Lighter border
    borderWidth: 1,
    borderRadius: 8, // Slightly more rounded corners
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#fff', // White background for inputs
    fontSize: 16,
  },
  randomWord: {
    fontSize: 20, // Slightly larger random word
    fontWeight: 'bold',
    color: '#555',
    marginVertical: 25,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  textArea: {
    width: '100%',
    height: 180, // Slightly smaller text area
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  savedFilesTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginTop: 25,
    marginBottom: 15,
  },
  fileList: {
    width: '100%',
    maxHeight: 180, // Adjusted height
    borderColor: '#eee', // Lighter border for list
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  fileItem: {
    paddingVertical: 12, // More vertical padding
    paddingHorizontal: 15,
    borderBottomColor: '#f0f0f0', // Lighter separator
    borderBottomWidth: 1,
  },
});
