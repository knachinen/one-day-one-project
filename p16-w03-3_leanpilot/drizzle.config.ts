import { defineConfig } from "drizzle-kit";
import { env } from "./src/env";

export default defineConfig({
	schema: "./src/lib/db/schema.ts",
	out: "./src/lib/db/migrations",
	dialect: "sqlite",
	driver: "turso",
	dbCredentials: {
		url: env.DATABASE_URL,
	},
	verbose: true,
	strict: true,
});
