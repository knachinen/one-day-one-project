import prompts from '@/constants/prompts.json';
import { DailyPrompt } from '@/types';
import { format } from 'date-fns';

export function getDailyPrompt(date: Date): DailyPrompt {
    const dateString = format(date, 'yyyy-MM-dd');
    const hash = hashString(dateString);
    const index = hash % prompts.length;

    return {
        questions: prompts[index].questions as [string, string, string]
    };
}

function hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
}
