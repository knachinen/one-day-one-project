import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  TextInput,
  Button,
  ActivityIndicator,
  Alert,
} from "react-native";

import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";

import { useFileSystem } from "./src/hooks/useFileSystem";
import { useWordFetcher } from "./src/hooks/useWordFetcher";
import { SavedFilesList } from "./src/components/SavedFilesList";
import { styles } from "./src/styles/AppStyles"; // Import styles

export default function App() {
  const {
    savedFiles,
    loadFileContent,
    handleSave,
    writingContent,
    setWritingContent,
    isReady, // Destructure isReady
    loadSavedFiles, // Destructure loadSavedFiles
  } = useFileSystem();

  const { webAddress, setWebAddress, randomWord, isLoading, fetchRandomWord } =
    useWordFetcher();

  useEffect(() => {
    if (isReady) {
      loadSavedFiles(); // Load files once file system is ready
    }
  }, [isReady]);

  if (!isReady) {
    return (
      <View style={styles.container}>
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={{ flex: 1, justifyContent: "center" }}
        />
        <Text style={{ textAlign: "center", marginTop: 10 }}>
          파일 시스템 준비 중...
        </Text>
      </View>
    );
  }

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
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
          <Button
            title="단어 가져오기"
            onPress={fetchRandomWord}
            disabled={isLoading}
          />

          {isLoading ? (
            <ActivityIndicator
              size="large"
              color="#0000ff"
              style={{ marginVertical: 20 }}
            />
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

          <Button title="저장" onPress={() => handleSave(writingContent)} />

          <SavedFilesList
            savedFiles={savedFiles}
            loadFileContent={loadFileContent}
            styles={styles}
          />

          <StatusBar style="auto" />
        </View>
      </ApplicationProvider>
    </>
  );
}
