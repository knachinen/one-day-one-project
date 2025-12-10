import { createClient } from "@libsql/client";
import { sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/libsql";
import { env } from "../src/env";
import * as schema from "../src/lib/db/schema"; // Import all schema

async function main() {
	const client = createClient({
		url: env.DATABASE_URL,
	});

	const db = drizzle(client, { schema });

	console.log("Attempting to create tables...");

	try {
		await db.transaction(async (tx) => {
			// Create UserTable
			await tx.run(sql`
        CREATE TABLE IF NOT EXISTS users (
          id TEXT PRIMARY KEY NOT NULL,
          email TEXT UNIQUE NOT NULL,
          name TEXT,
          hashed_password TEXT NOT NULL,
          created_at TEXT NOT NULL
        );
      `);
			console.log('Table "users" ensured.');

			// Create SessionTable
			await tx.run(sql`
        CREATE TABLE IF NOT EXISTS sessions (
          id TEXT PRIMARY KEY NOT NULL,
          user_id TEXT NOT NULL,
          expires_at INTEGER NOT NULL,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        );
      `);
			console.log('Table "sessions" ensured.');

			// Create ProjectTable
			await tx.run(sql`
        CREATE TABLE IF NOT EXISTS projects (
          id TEXT PRIMARY KEY NOT NULL,
          user_id TEXT NOT NULL,
          title TEXT NOT NULL,
          industry TEXT NOT NULL,
          status TEXT DEFAULT 'Draft' NOT NULL,
          current_stage INTEGER DEFAULT 1 NOT NULL,
          completion_rate INTEGER DEFAULT 0 NOT NULL,
          created_at TEXT NOT NULL,
          updated_at TEXT NOT NULL,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        );
      `);
			console.log('Table "projects" ensured.');

			// Create StageResponseTable
			await tx.run(sql`
        CREATE TABLE IF NOT EXISTS stage_responses (
          id TEXT PRIMARY KEY NOT NULL,
          project_id TEXT NOT NULL,
          stage_number INTEGER NOT NULL,
          question_id TEXT NOT NULL,
          answer TEXT NOT NULL,
          created_at TEXT NOT NULL,
          FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
        );
      `);
			console.log('Table "stage_responses" ensured.');

			// Create GeneratedDocumentTable
			await tx.run(sql`
        CREATE TABLE IF NOT EXISTS generated_documents (
          id TEXT PRIMARY KEY NOT NULL,
          project_id TEXT NOT NULL,
          type TEXT NOT NULL,
          content TEXT NOT NULL,
          created_at TEXT NOT NULL,
          FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
        );
      `);
			console.log('Table "generated_documents" ensured.');
		});

		console.log("Schema synchronization completed successfully.");
	} catch (err) {
		console.error("Error during schema synchronization:", err);
		throw err; // Rethrow to ensure process exits with error
	} finally {
		client.close(); // Close client connection
	}
}

main().catch((err) => {
	console.error("Unhandled error in main:", err);
	process.exit(1);
});
