import * as SQLite from 'expo-sqlite';

export const dbName = 'reflectly.db';

export async function getDB() {
    return await SQLite.openDatabaseAsync(dbName);
}

export async function initDatabase() {
    try {
        const db = await getDB();
        await db.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS journals (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date TEXT UNIQUE NOT NULL,
        emotion_tag TEXT NOT NULL,
        questions TEXT NOT NULL,
        answers TEXT NOT NULL,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS settings (
        id INTEGER PRIMARY KEY CHECK (id = 1),
        notification_time TEXT,
        notification_enabled INTEGER DEFAULT 1,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      );
    `);
        console.log('Database initialized successfully');
    } catch (error) {
        console.error('Error initializing database:', error);
        throw error;
    }
}
