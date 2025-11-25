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
import { styles, Colors } from "./src/styles/AppStyles";

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

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <Layout level="2" style={styles.container}>
          {!isReady ? (
            <Layout style={[styles.container, styles.loadingOverlay]}>
              <Spinner size="large" />
              <UIKittenText
                category="s1"
                style={{ textAlign: "center", marginTop: 10 }}
              >
                파일 시스템 준비 중...
              </UIKittenText>
            </Layout>
          ) : (
            // 파일 시스템이 준비되면 전체 UI를 렌더링
            <>
              <UIKittenButton
                onPress={fetchRandomWord}
                disabled={isLoading}
                status="basic"
                // appearance="outline"
                size="large"
              >
                {isLoading ? (
                  <Spinner size="small" status="control" /> // Use a small spinner inside button
                ) : (
                  randomWord || "단어 가져오기" // Display randomWord if available, else default text
                )}
              </UIKittenButton>

              {/* Random word display moved to button */}

              <Input
                placeholder="여기에 글을 작성하세요..."
                value={writingContent}
                onChangeText={setWritingContent}
                multiline={true}
                textAlignVertical="top"
                size="large"
                status="basic"
                style={styles.textArea}
              />

              <UIKittenButton
                onPress={() => handleSave(writingContent)}
                style={{
                  backgroundColor: Colors.text, // 배경색을 검은색(Colors.text)으로
                  borderColor: Colors.text, // 테두리도 검은색으로
                  marginTop: 10, // 상단 여백 추가
                }}
              >
                저장
              </UIKittenButton>

              <Layout style={styles.fileListContainer}>
                <SavedFilesList
                  savedFiles={savedFiles}
                  loadFileContent={loadFileContent}
                />
              </Layout>
            </>
          )}

          <StatusBar style="auto" />
        </Layout>
      </ApplicationProvider>
    </>
  );
}
