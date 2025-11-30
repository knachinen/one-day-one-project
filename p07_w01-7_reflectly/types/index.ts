export interface Journal {
    id: number;
    date: string;              // YYYY-MM-DD
    emotionTag: EmotionTag;
    questions: string[];
    answers: string[];
    createdAt: string;
    updatedAt: string;
}

export type EmotionTag = 'happy' | 'sad' | 'calm' | 'anxious' | 'excited';

export interface Settings {
    id: number;
    notificationTime: string;  // HH:mm
    notificationEnabled: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface DailyPrompt {
    questions: [string, string, string];
}
