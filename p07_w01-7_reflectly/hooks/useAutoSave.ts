import { useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EmotionTag } from '@/types';

export function useAutoSave(
    answers: string[],
    emotionTag: EmotionTag | null,
    date: string
) {
    const timeoutRef = useRef<NodeJS.Timeout>(undefined);

    useEffect(() => {
        // 500ms debounce
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(async () => {
            try {
                const draft = {
                    date,
                    answers,
                    emotionTag,
                    timestamp: new Date().toISOString()
                };
                await AsyncStorage.setItem(`draft_${date}`, JSON.stringify(draft));
                // console.log('Auto saved draft for', date);
            } catch (error) {
                console.error('Failed to auto save draft:', error);
            }
        }, 500);

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [answers, emotionTag, date]);
}
