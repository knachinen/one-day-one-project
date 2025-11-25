import { useState, useEffect } from "react";
// 💡 수정: FileSystem 네임스페이스 대신 필요한 클래스 (File, Directory, Paths)를 임포트합니다.
import { File, Directory, Paths } from "expo-file-system";
import { Alert } from "react-native";

import { getFormattedDateTime } from "../utils/getDateUtils";

export type SavedFile = {
  name: string;
  uri: string;
};

export function useFileSystem() {
  // 💡 수정: Paths.document를 사용하여 기본 경로를 설정합니다.
  // FileSystem.documentDirectory는 새로운 API에서 Paths.document로 대체됩니다.
  // documentDirectoryUri 대신 baseDirectory를 사용합니다.
  const [baseDirectory, setBaseDirectory] = useState<Directory | null>(null);
  const [savedFiles, setSavedFiles] = useState<SavedFile[]>([]);
  const [writingContent, setWritingContent] = useState("");
  const [isReady, setIsReady] = useState<boolean>(false);

  // 'writings' 서브 디렉토리를 나타내는 인스턴스
  const writingsDirectory = baseDirectory
    ? new Directory(baseDirectory, "writings")
    : null;

  useEffect(() => {
    async function initializeFileSystem() {
      // 💡 수정: Paths는 Promise가 아니므로 await가 필요 없습니다.
      // 새로운 API에서는 Paths.document 또는 Paths.cache를 사용합니다.
      let dir: Directory | null = null;

      // Paths.document가 가장 이상적인 영구 저장소입니다.
      if (Paths.document) {
        dir = new Directory(Paths.document);
        setBaseDirectory(dir);
        setIsReady(true);
      } else if (Paths.cache) {
        dir = new Directory(Paths.cache);
        setBaseDirectory(dir);
        setIsReady(true);
        console.warn(
          "Paths.document is not available. Falling back to Paths.cache."
        );
      } else {
        console.error("Neither Paths.document nor Paths.cache is available.");
        Alert.alert("치명적 오류", "장치 저장소에 접근할 수 없습니다.");
        // isReady는 false로 유지
      }
    }
    initializeFileSystem();
  }, []);

  const loadSavedFiles = async () => {
    if (!writingsDirectory) {
      Alert.alert("오류", "저장소 디렉토리가 준비되지 않았습니다.");
      return;
    }

    try {
      // 💡 [최종 수정] 디렉토리의 exists 속성을 확인하여,
      // 존재하지 않을 때만 create()를 호출합니다. (오류 발생 회피)
      if (!writingsDirectory.exists) {
        await writingsDirectory.create();
      }

      const contents = await writingsDirectory.list();
      console.log(
        "저장된 파일 디렉토리 (writingsDirectory): ",
        writingsDirectory.uri
      );
      console.log("저장된 파일 목록 (contents): ", contents);

      // 1. 필요한 데이터로 변환
      const unSortedFileList = contents
        .filter((item) => item instanceof File)
        .map((item) => ({
          name: item.name,
          uri: item.uri,
        }));

      // 2. 타입 단언(Type Assertion)을 별도의 변수에 적용
      const fileList: SavedFile[] = unSortedFileList as SavedFile[];

      // 3. 타입이 명확해진 변수에 .sort() 메서드 적용
      fileList.sort((a, b) => b.name.localeCompare(a.name));

      setSavedFiles(fileList);
    } catch (error) {
      console.error("저장된 파일 목록 가져오기 실패:", error);
      Alert.alert("오류", "저장된 파일을 불러오는 데 실패했습니다.");
    }
  };

  const loadFileContent = async (fileUri: string) => {
    try {
      // 💡 수정: File 인스턴스를 URI로 생성하고 text() 메서드를 사용하여 내용 읽기
      const fileToLoad = new File(fileUri);
      // text()는 파일 내용을 비동기적으로 읽어 문자열로 반환합니다.
      const content = await fileToLoad.text();
      setWritingContent(content);
      Alert.alert("성공", "파일 내용이 불러와졌습니다.");
    } catch (error) {
      console.error("파일 내용 불러오기 실패:", error);
      Alert.alert("오류", "파일 내용을 불러오는 데 실패했습니다.");
    }
  };

  const handleSave = async (contentToSave: string) => {
    if (!contentToSave.trim()) {
      Alert.alert("알림", "저장할 내용이 없습니다.");
      return;
    }

    if (!writingsDirectory) {
      Alert.alert("오류", "저장소 디렉토리가 준비되지 않았습니다.");
      return;
    }

    try {
      // 💡 [최종 수정] 디렉토리의 exists 속성을 확인하여,
      // 존재하지 않을 때만 create()를 호출합니다.
      if (!writingsDirectory.exists) {
        await writingsDirectory.create();
      }

      const timestamp = getFormattedDateTime();
      const filename = `writing_${timestamp}.md`;

      // 2. 파일의 최종 URI를 명시적으로 구성
      const fileUri = writingsDirectory.uri + filename; // '.../files/writings/' + 'writing_...'

      // 3. 구성된 URI를 사용하여 File 인스턴스 생성
      const newFile = new File(fileUri);
      await newFile.write(contentToSave);

      Alert.alert("성공", `글이 ${filename} 파일로 저장되었습니다.`);
      loadSavedFiles();
    } catch (error) {
      console.error("파일 저장 실패:", error);
      Alert.alert("오류", "글 저장에 실패했습니다.");
    }
  };

  return {
    // documentDirectoryUri 대신 baseDirectoryUri를 노출하거나, writingsDirectoryUri를 노출할 수 있습니다.
    // 여기서는 기존과 유사하게 URI를 노출하도록 수정
    documentDirectoryUri: writingsDirectory?.uri ?? null,
    savedFiles,
    loadSavedFiles,
    loadFileContent,
    handleSave,
    writingContent,
    setWritingContent,
    isReady,
  };
}
