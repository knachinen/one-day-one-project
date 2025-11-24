import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, ActivityIndicator, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';

export default function App() {
  const [webAddress, setWebAddress] = useState('');
  const [randomWord, setRandomWord] = useState('여기에 무작위 단어가 표시됩니다.');
  const [writingContent, setWritingContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
      Alert.alert('오류', '웹 주소를 입력해주세요.');
      return;
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

  const handleSave = async () => {
    if (!writingContent.trim()) {
      Alert.alert('알림', '저장할 내용이 없습니다.');
      return;
    }

    try {
      const filename = `writing_${Date.now()}.md`;
      const directory = FileSystem.documentDirectory + 'writings/';
      
      // Ensure the directory exists
      await FileSystem.makeDirectoryAsync(directory, { intermediates: true });

      const fileUri = directory + filename;
      await FileSystem.writeAsStringAsync(fileUri, writingContent);
      Alert.alert('성공', `글이 ${filename} 파일로 저장되었습니다.`);
      setWritingContent(''); // Clear content after saving
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

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    paddingTop: 50, // 상단 패딩 추가
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  randomWord: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
  },
  textArea: {
    width: '100%',
    height: 200,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
});
