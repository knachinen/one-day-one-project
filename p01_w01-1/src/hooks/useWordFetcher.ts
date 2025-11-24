import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { getCommonWords } from '../services/CommonWordsService'; // Import getCommonWords

export function useWordFetcher() {
  const [webAddress, setWebAddress] = useState('');
  const [randomWord, setRandomWord] = useState('여기에 무작위 단어가 표시됩니다.');
  const [isLoading, setIsLoading] = useState(false);
  const [commonWordsList, setCommonWordsList] = useState<string[]>([]);

  useEffect(() => {
    async function initCommonWords() {
      const words = await getCommonWords();
      setCommonWordsList(words);
    }
    initCommonWords();
  }, []);

  const extractRandomWord = (text: string) => {
    // Basic text cleaning: remove HTML tags and common punctuation, then split into words
    const cleanText = text.replace(/<[^>]*>?/gm, '') // Remove HTML tags
                          .replace(/[.,\/#!$%\^&*;:{}=\-_`~()]/g, '') // Remove punctuation
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

  return {
    webAddress,
    setWebAddress,
    randomWord,
    isLoading,
    fetchRandomWord,
    commonWordsList, // Export commonWordsList for App.tsx if needed elsewhere, though it's mainly used here
  };
}
