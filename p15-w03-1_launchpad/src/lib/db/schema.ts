import { sqliteTable, text, integer, AnySQLiteColumn } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
    id: text('id').primaryKey(),
    email: text('email').unique(), // Optional if you want to allow username only login
    username: text('username').unique(),
    password_hash: text('password_hash'),
    avatar_url: text('avatar_url'),
    bio: text('bio'),
    points: integer('points').default(0),
    created_at: integer('created_at', { mode: 'timestamp' }).notNull().default(new Date()),
});

export const sessions = sqliteTable('sessions', {
    id: text('id').primaryKey(),
    userId: text('user_id')
        .notNull()
        .references(() => users.id),
    expiresAt: integer('expires_at').notNull()
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export const ideas = sqliteTable('ideas', {
    id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
    userId: text('user_id').notNull().references(() => users.id),
    title: text('title').notNull(),
    tagline: text('tagline').notNull(),
    description: text('description').notNull(), // Problem & Solution
    category: text('category').notNull(),
    status: text('status').notNull().default('IDEA'), // IDEA, BUILDING, LAUNCHED, DROPPED
    upvotes: integer('upvotes').default(0),
    createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(new Date()),
    updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().default(new Date()),
});

export const tags = sqliteTable('tags', {
    id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
    name: text('name').unique().notNull(),
});

export const ideasToTags = sqliteTable('ideas_to_tags', {
    ideaId: text('idea_id').notNull().references(() => ideas.id),
    tagId: text('tag_id').notNull().references(() => tags.id),
});

export const votes = sqliteTable('votes', {
    id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
    ideaId: text('idea_id').notNull().references(() => ideas.id),
    userId: text('user_id').notNull().references(() => users.id),
    type: text('type').notNull(), // INTERESTED, UPVOTE
});

export const comments = sqliteTable('comments', {
    id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
    ideaId: text('idea_id').notNull().references(() => ideas.id),
    userId: text('user_id').notNull().references(() => users.id),
    parentId: text('parent_id').references((): AnySQLiteColumn => comments.id), // For nested comments
    content: text('content').notNull(),
    createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(new Date()),
});

export const updates = sqliteTable('updates', {
    id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
    ideaId: text('idea_id').notNull().references(() => ideas.id),
    userId: text('user_id').notNull().references(() => users.id),
    title: text('title').notNull(),
    content: text('content').notNull(),
    createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(new Date()),
    updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().default(new Date()),
});

