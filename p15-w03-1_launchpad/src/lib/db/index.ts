import * as betterSqlite3 from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import * as schema from './schema';

const sqlite = new betterSqlite3.default('sqlite.db');
export const db = drizzle(sqlite, { schema });
