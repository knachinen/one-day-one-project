import * as SQLite from 'expo-sqlite';

let db: SQLite.SQLiteDatabase | null = null;

export const getDB = async () => {
  if (!db) {
    db = await SQLite.openDatabaseAsync('where_i_was.db');
  }
  return db;
};

export const initDB = async () => {
  console.log('[DB] initDB started');
  try {
    const database = await getDB();
    console.log('[DB] Database opened');
    await database.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS locations (
        id TEXT PRIMARY KEY NOT NULL,
        name TEXT,
        lat REAL NOT NULL,
        lon REAL NOT NULL,
        duration INTEGER,
        startTime REAL NOT NULL,
        userNote TEXT
      );
    `);
    console.log('[DB] Database initialized successfully');
  } catch (error) {
    console.error('[DB] initDB failed:', error);
    throw error;
  }
};
