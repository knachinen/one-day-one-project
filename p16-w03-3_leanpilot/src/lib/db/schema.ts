import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const UserTable = sqliteTable("users", {
	id: text("id").primaryKey(),
	email: text("email").unique().notNull(),
	name: text("name"),
	hashedPassword: text("hashed_password").notNull(),
	createdAt: text("created_at").notNull(),
});

export const SessionTable = sqliteTable("sessions", {
	id: text("id").primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => UserTable.id, { onDelete: "cascade" }),
	expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
});

export const ProjectTable = sqliteTable("projects", {
	id: text("id").primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => UserTable.id, { onDelete: "cascade" }),
	title: text("title").notNull(),
	industry: text("industry").notNull(),
	status: text("status").notNull().default("Draft"),
	currentStage: integer("current_stage").notNull().default(1),
	completionRate: integer("completion_rate").notNull().default(0),
	createdAt: text("created_at").notNull(),
	updatedAt: text("updated_at").notNull(),
});

export const StageResponseTable = sqliteTable("stage_responses", {
	id: text("id").primaryKey(),
	projectId: text("project_id")
		.notNull()
		.references(() => ProjectTable.id, { onDelete: "cascade" }),
	stageNumber: integer("stage_number").notNull(),
	questionId: text("question_id").notNull(),
	answer: text("answer").notNull(),
	createdAt: text("created_at").notNull(),
});

export const GeneratedDocumentTable = sqliteTable("generated_documents", {
	id: text("id").primaryKey(),
	projectId: text("project_id")
		.notNull()
		.references(() => ProjectTable.id, { onDelete: "cascade" }),
	type: text("type").notNull(), // e.g., 'PRD', 'LeanCanvas', 'Roadmap'
	content: text("content").notNull(), // Markdown content
	createdAt: text("created_at").notNull(),
});
