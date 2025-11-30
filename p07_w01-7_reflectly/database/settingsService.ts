import { getDB } from './db';
import { Settings } from '@/types';

export const SettingsService = {
    async getSettings(): Promise<Settings> {
        const db = await getDB();
        let result = await db.getFirstAsync<any>('SELECT * FROM settings WHERE id = 1');

        if (!result) {
            // Create default settings
            const now = new Date().toISOString();
            await db.runAsync(
                'INSERT INTO settings (id, notification_time, notification_enabled, created_at, updated_at) VALUES (1, ?, ?, ?, ?)',
                ['22:00', 1, now, now]
            );
            result = await db.getFirstAsync<any>('SELECT * FROM settings WHERE id = 1');
        }

        return {
            id: result.id,
            notificationTime: result.notification_time,
            notificationEnabled: Boolean(result.notification_enabled),
            createdAt: result.created_at,
            updatedAt: result.updated_at,
        };
    },

    async updateSettings(settings: Partial<Settings>): Promise<void> {
        const db = await getDB();
        const now = new Date().toISOString();

        const updates: string[] = [];
        const values: any[] = [];

        if (settings.notificationTime !== undefined) {
            updates.push('notification_time = ?');
            values.push(settings.notificationTime);
        }
        if (settings.notificationEnabled !== undefined) {
            updates.push('notification_enabled = ?');
            values.push(settings.notificationEnabled ? 1 : 0);
        }

        if (updates.length === 0) return;

        updates.push('updated_at = ?');
        values.push(now);

        await db.runAsync(
            `UPDATE settings SET ${updates.join(', ')} WHERE id = 1`,
            values
        );
    }
};
