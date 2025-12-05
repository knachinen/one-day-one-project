import * as SQLite from 'expo-sqlite';

let db: SQLite.SQLiteDatabase | null = null;

export const initDatabase = async () => {
    db = await SQLite.openDatabaseAsync('quickline.db');

    await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      phone TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS profile (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      medicalInfo TEXT
    );
  `);
};

export const getDB = () => {
    if (!db) {
        throw new Error('Database not initialized');
    }
    return db;
};

export interface Contact {
    id: number;
    name: string;
    phone: string;
}

export const addContactToDB = async (name: string, phone: string) => {
    const database = getDB();
    const result = await database.runAsync(
        'INSERT INTO contacts (name, phone) VALUES (?, ?)',
        name,
        phone
    );
    return result.lastInsertRowId;
};

export const getContactsFromDB = async (): Promise<Contact[]> => {
    const database = getDB();
    return await database.getAllAsync<Contact>('SELECT * FROM contacts');
};

export const deleteContactFromDB = async (id: number) => {
    const database = getDB();
    await database.runAsync('DELETE FROM contacts WHERE id = ?', id);
};

export const updateContactToDB = async (id: number, name: string, phone: string) => {
    const database = getDB();
    await database.runAsync('UPDATE contacts SET name = ?, phone = ? WHERE id = ?', name, phone, id);
};

export const saveProfileToDB = async (medicalInfo: string) => {
    const database = getDB();
    await database.runAsync(
        'INSERT OR REPLACE INTO profile (id, medicalInfo) VALUES (1, ?)',
        medicalInfo
    );
};

export const getProfileFromDB = async (): Promise<{ medicalInfo: string } | null> => {
    const database = getDB();
    const result = await database.getFirstAsync<{ medicalInfo: string }>(
        'SELECT medicalInfo FROM profile WHERE id = 1'
    );
    return result;
};
