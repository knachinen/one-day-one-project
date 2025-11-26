import * as SQLite from 'expo-sqlite';
import { Reminder } from '../data/ReminderModel';

const databaseName = 'reminder.db';
let db: SQLite.SQLiteDatabase;

export const initDatabase = async () => {
  console.log('SQLite object:', SQLite);
  db = await SQLite.openDatabaseAsync(databaseName);

  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS reminders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT,
      date TEXT NOT NULL,
      time TEXT NOT NULL,
      repeatPattern TEXT,
      isCompleted INTEGER DEFAULT 0
    );
  `);
};

export const getDatabase = () => {
  if (!db) {
    throw new Error('Database not initialized. Call initDatabase first.');
  }
  return db;
};

export const addReminder = async (reminder: Omit<Reminder, 'id'>): Promise<number> => {
  try {
    const result = await db.runAsync(
      'INSERT INTO reminders (title, content, date, time, repeatPattern, isCompleted) VALUES (?, ?, ?, ?, ?, ?);',
      [reminder.title, reminder.content || null, reminder.date, reminder.time, reminder.repeatPattern || null, reminder.isCompleted]
    );
    return result.lastInsertRowId;
  } catch (error) {
    console.error('Failed to add reminder:', error);
    throw error;
  }
};

export const getReminders = async (query: string = 'SELECT * FROM reminders', params: (number | string)[] = []): Promise<Reminder[]> => {
  try {
    const rows = await db.getAllAsync<Reminder>(query, params);
    // Ensure isCompleted is 0 or 1, as SQLite can return 0/1 or false/true
    const reminders: Reminder[] = rows.map(row => ({
      ...row,
      isCompleted: row.isCompleted === 1 ? 1 : 0,
    }));
    return reminders;
  } catch (error) {
    console.error('Failed to get reminders:', error);
    throw error;
  }
};

export const updateReminder = async (reminder: Reminder): Promise<number> => {
  try {
    const result = await db.runAsync(
      'UPDATE reminders SET title = ?, content = ?, date = ?, time = ?, repeatPattern = ?, isCompleted = ? WHERE id = ?;',
      [reminder.title, reminder.content || null, reminder.date, reminder.time, reminder.repeatPattern || null, reminder.isCompleted, reminder.id]
    );
    return result.changes;
  } catch (error) {
    console.error('Failed to update reminder:', error);
    throw error;
  }
};

export const deleteReminder = async (id: number): Promise<number> => {
  try {
    const result = await db.runAsync(
      'DELETE FROM reminders WHERE id = ?;',
      [id]
    );
    return result.changes;
  } catch (error) {
    console.error('Failed to delete reminder:', error);
    throw error;
  }
};