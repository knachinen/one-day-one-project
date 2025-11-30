import { getDB } from './db';
import { Journal, EmotionTag } from '@/types';

export const JournalService = {
    async getJournalByDate(date: string): Promise<Journal | null> {
        const db = await getDB();
        const result = await db.getFirstAsync<any>(
            'SELECT * FROM journals WHERE date = ?',
            [date]
        );

        if (!result) return null;

        return {
            ...result,
            questions: JSON.parse(result.questions),
            answers: JSON.parse(result.answers),
            emotionTag: result.emotion_tag as EmotionTag,
            createdAt: result.created_at,
            updatedAt: result.updated_at,
        };
    },

    async saveJournal(journal: Omit<Journal, 'id' | 'createdAt' | 'updatedAt'>): Promise<void> {
        const db = await getDB();
        const now = new Date().toISOString();

        // Check if exists
        const existing = await db.getFirstAsync('SELECT id FROM journals WHERE date = ?', [journal.date]);

        if (existing) {
            await db.runAsync(
                `UPDATE journals SET 
          emotion_tag = ?, 
          questions = ?, 
          answers = ?, 
          updated_at = ? 
        WHERE date = ?`,
                [
                    journal.emotionTag,
                    JSON.stringify(journal.questions),
                    JSON.stringify(journal.answers),
                    now,
                    journal.date
                ]
            );
        } else {
            await db.runAsync(
                `INSERT INTO journals (date, emotion_tag, questions, answers, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?)`,
                [
                    journal.date,
                    journal.emotionTag,
                    JSON.stringify(journal.questions),
                    JSON.stringify(journal.answers),
                    now,
                    now
                ]
            );
        }
    },

    async getJournals(limit: number = 30, offset: number = 0): Promise<Journal[]> {
        const db = await getDB();
        const results = await db.getAllAsync<any>(
            'SELECT * FROM journals ORDER BY date DESC LIMIT ? OFFSET ?',
            [limit, offset]
        );

        return results.map(row => ({
            ...row,
            questions: JSON.parse(row.questions),
            answers: JSON.parse(row.answers),
            emotionTag: row.emotion_tag as EmotionTag,
            createdAt: row.created_at,
            updatedAt: row.updated_at,
        }));
    }
};
