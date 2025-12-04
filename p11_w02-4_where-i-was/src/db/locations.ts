import { getDB } from './index';
import { LocationRecord } from '../types/location';

export const insertLocation = async (location: LocationRecord) => {
    const db = await getDB();
    await db.runAsync(
        'INSERT INTO locations (id, name, lat, lon, duration, startTime, userNote) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [
            location.id,
            location.name,
            location.lat,
            location.lon,
            location.duration,
            location.startTime,
            location.userNote,
        ]
    );
};

export const getLocations = async (): Promise<LocationRecord[]> => {
    const db = await getDB();
    const result = await db.getAllAsync<LocationRecord>(
        'SELECT * FROM locations ORDER BY startTime DESC'
    );
    return result;
};

export const deleteLocation = async (id: string) => {
    const db = await getDB();
    await db.runAsync('DELETE FROM locations WHERE id = ?', [id]);
};

export const updateLocationNote = async (id: string, note: string) => {
    const db = await getDB();
    await db.runAsync('UPDATE locations SET userNote = ? WHERE id = ?', [note, id]);
};

export const updateLocationName = async (id: string, name: string) => {
    const db = await getDB();
    await db.runAsync('UPDATE locations SET name = ? WHERE id = ?', [name, id]);
};

export const updateLocationDuration = async (id: string, duration: number) => {
    const db = await getDB();
    await db.runAsync('UPDATE locations SET duration = ? WHERE id = ?', [duration, id]);
};
