import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default function App() {
  const [webAddress, setWebAddress] = useState('');
  const [randomWord, setRandomWord] = useState('여기에 무작위 단어가 표시됩니다.');
  const [writingContent, setWritingContent] = useState('');

  const handleSave = () => {
    console.log('웹 주소:', webAddress);
    console.log('작성 내용:', writingContent);
    // 여기에 저장 로직 추가
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

      <Text style={styles.randomWord}>{randomWord}</Text>

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
