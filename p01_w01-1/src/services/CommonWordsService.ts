import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import { Alert } from 'react-native';

export async function getCommonWords(): Promise<string[]> {
  try {
    const [{ localUri }] = await Asset.loadAsync(require('../../commonWords.txt')); // Adjust path
    const text = await FileSystem.readAsStringAsync(localUri);
    const words = text.split('\n').map(word => word.trim()).filter(word => word.length > 0);
    return words;
  } catch (error) {
    console.error("자주 쓰이는 단어 파일 불러오기 실패:", error);
    Alert.alert('오류', '자주 쓰이는 단어 파일을 불러오지 못했습니다.');
    return [];
  }
}
