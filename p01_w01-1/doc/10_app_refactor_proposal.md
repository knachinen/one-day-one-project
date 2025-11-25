# App.tsx Refactoring Proposal for UI Kitten Context Issue

## Problem Explanation

The recurring error "Layout: unsupported configuration" and "TypeError: Cannot read property 'appearances' of undefined" arises because UI Kitten components (like `Layout`, `Spinner`, `UIKittenText`) require a specific context to be present in the React component tree. This context is provided by `ApplicationProvider`, which in turn depends on `IconRegistry`.

In the previous structure of `App.tsx`, when `isReady` was `false`, the code would execute an early `return` statement that rendered UI Kitten components *before* `IconRegistry` and `ApplicationProvider` had a chance to render and set up this essential context.

Essentially, UI Kitten components were trying to access configuration that simply wasn't available yet in that part of the component tree.

## Proposed Solution

The solution is to ensure that `IconRegistry` and `ApplicationProvider` are *always* rendered unconditionally at the very root of your `App` component's render tree. All other content, including the conditional rendering for the loading state (`!isReady`) and the main application, should be placed *inside* the `ApplicationProvider`.

This guarantees that any UI Kitten component, regardless of when it's rendered, will have access to the necessary context.

## Proposed `App.tsx` Code

Here is the proposed refactored content for `p01_w01-1/App.tsx`. Please replace the entire content of your existing `App.tsx` file with this code.

```typescript
// App.tsx
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet } from "react-native";
import * as FileSystem from "expo-file-system";

// UI Kitten Imports
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@eva-design/eva-icons";
import * as eva from "@eva-design/eva"; // Make sure this import is correct

// UI Kitten Component Imports
import {
  Layout,
  Text as UIKittenText,
  Input,
  Button as UIKittenButton,
  Spinner,
} from "@ui-kitten/components";

// Custom Hooks and Services
import { useWordFetcher } from "./src/hooks/useWordFetcher";
import { useFileSystem } from "./src/hooks/useFileSystem";
import { CommonWordsService } from "./src/services/CommonWordsService";
import { getDateUtils } from "./src/utils/getDateUtils";
import SavedFilesList from "./src/components/SavedFilesList";

// Styles (assuming AppStyles.ts still defines relevant styles)
import { AppStyles } from "./src/styles/AppStyles";

export default function App() {
  const [webAddress, setWebAddress] = useState<string>("");
  const [randomWord, setRandomWord] = useState<string>("");
  const [writingContent, setWritingContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [savedFiles, setSavedFiles] = useState<string[]>([]);
  const [isReady, setIsReady] = useState<boolean>(false); // State to track file system readiness

  // Custom hooks
  const { fetchRandomWord: fetchWord, isLoading: isWordLoading } = useWordFetcher();
  const { loadFile, saveFile, deleteFile, listFiles } = useFileSystem();

  // Load common words on component mount
  useEffect(() => {
    async function prepareFileSystem() {
      try {
        await CommonWordsService.loadCommonWords();
        setIsReady(true);
      } catch (error) {
        console.error("파일 시스템 준비 중 오류 발생:", error);
      }
    }
    prepareFileSystem();
  }, []);

  // Load saved files when file system is ready
  useEffect(() => {
    if (isReady) {
      loadSavedFiles(); // Load files once file system is ready
    }
  }, [isReady]);

  // Function to fetch and set a random word
  const fetchRandomWord = useCallback(async () => {
    setIsLoading(true);
    const word = await fetchWord(webAddress);
    setRandomWord(word);
    setIsLoading(false);
  }, [webAddress, fetchWord]);

  // Function to save content to a file
  const handleSave = useCallback(
    async (content: string) => {
      if (!content.trim()) {
        alert("저장할 내용이 없습니다!");
        return;
      }
      try {
        const fileName = `note_${getDateUtils.getFormattedDate()}.md`;
        await saveFile(fileName, content);
        alert("파일이 저장되었습니다!");
        setWritingContent(""); // Clear content after saving
        loadSavedFiles(); // Refresh the list of saved files
      } catch (error) {
        alert("파일 저장 실패: " + error);
        console.error("파일 저장 실패:", error);
      }
    },
    [saveFile]
  );

  // Function to load content from a file
  const loadFileContent = useCallback(
    async (fileName: string) => {
      try {
        const content = await loadFile(fileName);
        setWritingContent(content);
        alert(`'${fileName}' 파일 로드됨.`);
      } catch (error) {
        alert("파일 로드 실패: " + error);
        console.error("파일 로드 실패:", error);
      }
    },
    [loadFile]
  );

  // Function to load the list of saved files
  const loadSavedFiles = useCallback(async () => {
    try {
      const files = await listFiles();
      setSavedFiles(files);
    } catch (error) {
      console.error("저장된 파일 목록 로드 실패:", error);
    }
  }, [listFiles]);

  // Use the styles defined in AppStyles.ts
  const styles = AppStyles;

  // --- START OF PROPOSED CHANGES ---

  return (
    // STEP 1: IconRegistry and ApplicationProvider MUST wrap all UI Kitten components.
    // They are now moved to the very root of the App component's return.
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider mapping={eva.mapping} theme={eva.light}>
        {/* STEP 2: Conditional rendering now happens *inside* ApplicationProvider. */}
        {/* This ensures that even the loading state uses UI Kitten components with context. */}
        {
          !isReady ? (
            <Layout style={styles.container}>
              <Spinner size="large" style={{ flex: 1, justifyContent: "center" }} />
              <UIKittenText style={{ textAlign: "center", marginTop: 10 }}>
                파일 시스템 준비 중...
              </UIKittenText>
            </Layout>
          ) : (
            // This is the main application content, rendered once file system is ready
            <Layout style={styles.container}>
              <UIKittenText style={styles.title}>1일 1코딩 - p01_w01-1</UIKittenText>

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
                <UIKittenText style={styles.randomWord}>{randomWord}</UIKittenText>
              )}

              <Input
                placeholder="여기에 글을 작성하세요..."
                value={writingContent}
                onChangeText={setWritingContent}
                multiline={true}
                textAlignVertical="top"
                style={styles.textArea}
                placeholderTextColor={styles.input.color}
              />

              <UIKittenButton onPress={() => handleSave(writingContent)}>
                저장
              </UIKittenButton>

              <SavedFilesList
                savedFiles={savedFiles}
                loadFileContent={loadFileContent}
              />

              <StatusBar style="auto" />
            </Layout>
          )
        }
      </ApplicationProvider>
    </>
  );
  // --- END OF PROPOSED CHANGES ---
}
```
## How to Apply These Changes

1.  Open your `p01_w01-1/App.tsx` file.
2.  **Replace the entire content of `App.tsx`** with the "Proposed `App.tsx` Code" provided above.
3.  Save the file.
4.  Run your Expo application (`npx expo start`) and check if the error is resolved.

This new structure will ensure that UI Kitten components are always rendered within their required context.
