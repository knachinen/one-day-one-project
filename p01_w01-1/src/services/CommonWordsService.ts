import { File } from "expo-file-system";
import { Asset } from "expo-asset";
import { Alert } from "react-native";

// 👈 [추가] error 객체의 타입을 좁히기 위한 타입 가드 함수
function isError(error: any): error is Error {
  return error instanceof Error;
}

export async function getCommonWords(): Promise<string[]> {
  try {
    const assets = await Asset.loadAsync(require("../../assets/commonWords.txt"));

    const localUri = assets[0]?.localUri;

    if (!localUri) {
      throw new Error("Asset load failed: localUri is null or undefined.");
    }

    const file = new File(localUri);
    const text = await file.text();

    const words = text
      .split("\n")
      .map((word) => word.trim())
      .filter((word) => word.length > 0);
    return words;
  } catch (error) {
    console.error("자주 쓰이는 단어 파일 불러오기 실패:", error);

    // 👈 [수정] 타입 가드를 사용하여 error.message에 안전하게 접근
    Alert.alert(
      "오류",
      `자주 쓰이는 단어 파일을 불러오지 못했습니다. (${
        isError(error) ? error.message : String(error)
      })`
    );

    return [];
  }
}

export default getCommonWords;
