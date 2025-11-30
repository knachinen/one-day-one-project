import { addDays, format, subDays } from 'date-fns';
import { EmotionTag, Journal } from '@/types';

export interface EmotionDataPoint {
    date: string;
    value: number | null;
    label: string;
}

const EMOTION_VALUES: Record<EmotionTag, number> = {
    happy: 5,
    excited: 4,
    calm: 3,
    anxious: 2,
    sad: 1,
};

export function getEmotionTrend(
    journals: Journal[],
    days: 7 | 30
): EmotionDataPoint[] {
    const endDate = new Date();
    const startDate = subDays(endDate, days - 1);

    const dataPoints: EmotionDataPoint[] = [];

    for (let i = 0; i < days; i++) {
        const currentDate = addDays(startDate, i);
        const dateStr = format(currentDate, 'yyyy-MM-dd');
        const journal = journals.find(j => j.date === dateStr);

        dataPoints.push({
            date: dateStr,
            value: journal ? EMOTION_VALUES[journal.emotionTag] : null,
            label: format(currentDate, 'M/d'),
        });
    }

    return dataPoints;
}

export function getEmotionStats(journals: Journal[]) {
    const stats: Record<string, number> = {};
    journals.forEach(j => {
        stats[j.emotionTag] = (stats[j.emotionTag] || 0) + 1;
    });
    return stats;
}
