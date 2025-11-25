import * as SQLite from 'expo-sqlite';
import { Reminder } from '../data/ReminderModel';

const databaseName = 'reminder.db';
let db: SQLite.WebSQLDatabase;

export const initDatabase = async () => {
  db = SQLite.openDatabase(databaseName);

  return new Promise<void>((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS reminders (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, content TEXT, date TEXT NOT NULL, time TEXT NOT NULL, repeatPattern TEXT, isCompleted INTEGER DEFAULT 0);',
        [],
        () => resolve(),
        (_, error) => {
          console.error('Failed to create table:', error);
          reject(error);
          return true; // Indicate that the error was handled
        }
      );
    });
  });
};

export const getDatabase = () => {
  if (!db) {
    throw new Error('Database not initialized. Call initDatabase first.');
  }
  return db;
};

export const addReminder = (reminder: Omit<Reminder, 'id'>): Promise<SQLite.SQLResultSet> => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO reminders (title, content, date, time, repeatPattern, isCompleted) VALUES (?, ?, ?, ?, ?, ?);',
        [reminder.title, reminder.content || null, reminder.date, reminder.time, reminder.repeatPattern || null, reminder.isCompleted],
        (_, result) => resolve(result),
        (_, error) => {
          console.error('Failed to add reminder:', error);
          reject(error);
          return true;
        }
      );
    });
  });
};

export const getReminders = (query: string = 'SELECT * FROM reminders', params: (number | string)[] = []): Promise<Reminder[]> => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        query,
        params,
        (_, { rows }) => {
          const reminders: Reminder[] = rows._array.map(row => ({
            ...row,
            isCompleted: row.isCompleted === 1 ? 1 : 0, // Ensure isCompleted is 0 or 1
          }));
          resolve(reminders);
        },
        (_, error) => {
          console.error('Failed to get reminders:', error);
          reject(error);
          return true;
        }
      );
    });
  });
};

export const updateReminder = (reminder: Reminder): Promise<SQLite.SQLResultSet> => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE reminders SET title = ?, content = ?, date = ?, time = ?, repeatPattern = ?, isCompleted = ? WHERE id = ?;',
        [reminder.title, reminder.content || null, reminder.date, reminder.time, reminder.repeatPattern || null, reminder.isCompleted, reminder.id],
        (_, result) => resolve(result),
        (_, error) => {
          console.error('Failed to update reminder:', error);
          reject(error);
          return true;
        }
      );
    });
  });
};

export const deleteReminder = (id: number): Promise<SQLite.SQLResultSet> => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM reminders WHERE id = ?;',
        [id],
        (_, result) => resolve(result),
        (_, error) => {
          console.error('Failed to delete reminder:', error);
          reject(error);
          return true;
        }
      );
    });
  });
};