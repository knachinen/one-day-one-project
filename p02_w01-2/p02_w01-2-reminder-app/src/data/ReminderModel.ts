export interface Reminder {
  id: number;
  title: string;
  content?: string; // Optional
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  repeatPattern?: 'none' | 'daily' | 'weekly' | 'monthly'; // Optional
  isCompleted: 0 | 1; // SQLite stores booleans as integers
  // Future expansion: location data
  latitude?: number;
  longitude?: number;
  radius?: number;
}
