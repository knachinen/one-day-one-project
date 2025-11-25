import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Alert } from "react-native";

import * as eva from "@eva-design/eva";

import {
  ApplicationProvider,
  IconRegistry,
  Layout,
  Text as UIKittenText,
  Input,
  Button as UIKittenButton,
  Spinner,
} from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";

import { useFileSystem } from "./src/hooks/useFileSystem";
import { useWordFetcher } from "./src/hooks/useWordFetcher";
import { SavedFilesList } from "./src/components/SavedFilesList";
import { styles } from "./src/styles/AppStyles";

export default function App() {
  const {
    savedFiles,
    loadFileContent,
    handleSave,
    writingContent,
    setWritingContent,
    isReady,
    loadSavedFiles,
  } = useFileSystem();

  const { webAddress, setWebAddress, randomWord, isLoading, fetchRandomWord } =
    useWordFetcher();

  useEffect(() => {
    if (isReady) {
      loadSavedFiles();
    }
  }, [isReady]);

  // 💡 [수정] isReady 검사를 <ApplicationProvider> 밖에서 제거하고,
  // Provider 내부에서 로딩 상태를 처리합니다.

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <Layout style={styles.container}>
          {/* 💡 [핵심 수정] isReady 검사를 ApplicationProvider 내부에서 수행 */}
          {!isReady ? (
            <Layout style={[styles.container, styles.loadingOverlay]}>
              <Spinner size="large" />
              <UIKittenText style={{ textAlign: "center", marginTop: 10 }}>
                파일 시스템 준비 중...
              </UIKittenText>
            </Layout>
          ) : (
            // 파일 시스템이 준비되면 전체 UI를 렌더링
            <>
              <UIKittenText style={styles.title}>
                1일 1코딩 - p01_w01-1
              </UIKittenText>

              <Input
                placeholder="웹 주소를 입력하세요 (예: https://example.com)"
                value={webAddress}
                onChangeText={setWebAddress}
                keyboardType="url"
                autoCapitalize="none"
                style={styles.input}
                placeholderTextColor={styles.input.color}
              />
              <UIKittenButton onPress={fetchRandomWord} disabled={isLoading}>
                단어 가져오기
              </UIKittenButton>

              {isLoading ? (
                <Spinner size="large" style={{ marginVertical: 20 }} />
              ) : (
                <UIKittenText style={styles.randomWord}>
                  {randomWord}
                </UIKittenText>
              )}

              <Input
                placeholder="여기에 글을 작성하세요..."
                value={writingContent}
                onChangeText={setWritingContent}
                multiline={true}
                textAlignVertical="top"
                style={styles.textArea}
                placeholderTextColor={styles.textArea.color}
              />

              <UIKittenButton onPress={() => handleSave(writingContent)}>
                저장
              </UIKittenButton>

              <SavedFilesList
                savedFiles={savedFiles}
                loadFileContent={loadFileContent}
              />
            </>
          )}

          <StatusBar style="auto" />
        </Layout>
      </ApplicationProvider>
    </>
  );
}
