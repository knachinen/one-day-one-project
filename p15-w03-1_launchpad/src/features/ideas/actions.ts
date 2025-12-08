'use server';

import { z } from 'zod';
import { generateId } from 'lucia';
import { lucia } from '@/lib/auth';
import { cookies } from 'next/headers';
import { db } from '@/lib/db';
import { ideas, users, comments, votes, tags, ideasToTags, updates } from '@/lib/db/schema'; // Import updates here
import { redirect } from 'next/navigation';
import { eq, and } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

const createIdeaSchema = z.object({
    title: z.string().min(3).max(100),
    tagline: z.string().min(3).max(150),
    description: z.string().min(10),
    category: z.string(),
    tags: z.array(z.string()).optional(), // New: Optional tags array
});

export async function createIdea(prevState: any, formData: FormData) {
    const sessionId = (await cookies()).get(lucia.sessionCookieName)?.value ?? null;
    if (!sessionId) return { error: 'Unauthorized' };
    const { user } = await lucia.validateSession(sessionId);
    if (!user) return { error: 'Unauthorized' };

    const rawData = {
        title: formData.get('title'),
        tagline: formData.get('tagline'),
        description: formData.get('description'),
        category: formData.get('category'),
        tags: formData.getAll('tags[]'), // New: Get all tags
    };

    const parsed = createIdeaSchema.safeParse(rawData);
    if (!parsed.success) {
        return { error: 'Invalid input data' };
    }

    const ideaId = generateId(15);
    try {
        await db.transaction(async (tx) => { // Use transaction for atomicity
            await tx.insert(ideas).values({
                id: ideaId,
                userId: user.id,
                title: parsed.data.title,
                tagline: parsed.data.tagline,
                description: parsed.data.description,
                category: parsed.data.category,
                status: 'IDEA',
            });

            // Insert tags if provided
            if (parsed.data.tags && parsed.data.tags.length > 0) {
                const ideaTags = parsed.data.tags.map(tagId => ({
                    ideaId: ideaId,
                    tagId: tagId,
                }));
                await tx.insert(ideasToTags).values(ideaTags);
            }
        });
    } catch (e) {
        console.error("Failed to create idea:", e);
        return { error: 'Failed to create idea' };
    }

    revalidatePath('/');
    return redirect(`/ideas/${ideaId}`);
}

export async function getIdeas() {
    const allIdeas = await db.select({
        id: ideas.id,
        userId: ideas.userId,
        title: ideas.title,
        tagline: ideas.tagline,
        description: ideas.description,
        category: ideas.category,
        status: ideas.status,
        upvotes: ideas.upvotes,
        createdAt: ideas.createdAt,
        updatedAt: ideas.updatedAt,
        author: users.username,
    })
        .from(ideas)
        .leftJoin(users, eq(ideas.userId, users.id))
        .orderBy(ideas.createdAt);

    return allIdeas;
}

export type IdeaWithAuthor = typeof ideas.$inferSelect & { author: typeof users.$inferSelect.username | null };

export async function getCommentsForIdea(ideaId: string) {
    const allComments = await db.select({
        id: comments.id,
        ideaId: comments.ideaId,
        userId: comments.userId,
        parentId: comments.parentId,
        content: comments.content,
        createdAt: comments.createdAt,
        author: users.username,
        authorAvatarUrl: users.avatar_url,
    })
        .from(comments)
        .leftJoin(users, eq(comments.userId, users.id))
        .where(eq(comments.ideaId, ideaId))
        .orderBy(comments.createdAt);

    return allComments;
}

export type CommentWithAuthor = Awaited<ReturnType<typeof getCommentsForIdea>>[number];

// Define types for form states
export type FormState = {
    success: boolean;
    error: string | null;
};

export async function createComment(prevState: FormState, formData: FormData): Promise<FormState> {
    const ideaId = formData.get('ideaId')?.toString();
    const content = formData.get('content')?.toString();
    const parentId = formData.get('parentId')?.toString() || null;

    if (!ideaId || !content) {
        return { success: false, error: 'Invalid input data' };
    }

    const sessionId = (await cookies()).get(lucia.sessionCookieName)?.value ?? null;
    if (!sessionId) {
        return { success: false, error: 'Unauthorized' };
    }
    const { user } = await lucia.validateSession(sessionId);
    if (!user) {
        return { success: false, error: 'Unauthorized' };
    }

    const commentId = generateId(15);
    try {
        await db.insert(comments).values({
            id: commentId,
            ideaId: ideaId,
            userId: user.id,
            parentId: parentId,
            content: content,
        });
        revalidatePath(`/ideas/${ideaId}`);
    } catch (e) {
        console.error("Error creating comment:", e);
        return { success: false, error: 'Failed to create comment' };
    }

    return { success: true, error: null };
}

export async function getAllTags() {
    const allTags = await db.select().from(tags).orderBy(tags.name);
    return allTags;
}

export async function createUpdate(prevState: FormState, formData: FormData): Promise<FormState> {
    const ideaId = formData.get('ideaId')?.toString();
    const title = formData.get('title')?.toString();
    const content = formData.get('content')?.toString();

    if (!ideaId || !title || !content) {
        return { success: false, error: 'Invalid input data' };
    }

    const sessionId = (await cookies()).get(lucia.sessionCookieName)?.value ?? null;
    if (!sessionId) {
        return { success: false, error: 'Unauthorized' };
    }
    const { user } = await lucia.validateSession(sessionId);
    if (!user) {
        return { success: false, error: 'Unauthorized' };
    }

    const updateId = generateId(15);
    try {
        await db.insert(updates).values({
            id: updateId,
            ideaId: ideaId,
            userId: user.id,
            title: title,
            content: content,
        });
        revalidatePath(`/ideas/${ideaId}`);
    } catch (e) {
        console.error("Failed to create update:", e);
        return { success: false, error: 'Failed to create update' };
    }

    return { success: true, error: null };
}

export async function getUpdatesForIdea(ideaId: string) {
    const allUpdates = await db.select({
        id: updates.id,
        ideaId: updates.ideaId,
        userId: updates.userId,
        title: updates.title,
        content: updates.content,
        createdAt: updates.createdAt,
        updatedAt: updates.updatedAt,
        author: users.username,
        authorAvatarUrl: users.avatar_url,
    })
        .from(updates)
        .leftJoin(users, eq(updates.userId, users.id))
        .where(eq(updates.ideaId, ideaId))
        .orderBy(updates.createdAt);

    return allUpdates;
}

export type UpdateWithAuthor = Awaited<ReturnType<typeof getUpdatesForIdea>>[number];

export async function toggleVote(formData: FormData) {
    const ideaId = formData.get('ideaId')?.toString();
    if (!ideaId) {
        return { error: 'Invalid idea ID' };
    }

    const sessionId = (await cookies()).get(lucia.sessionCookieName)?.value ?? null;
    if (!sessionId) {
        // Redirect to login if not authenticated
        return redirect('/login');
    }
    const { user } = await lucia.validateSession(sessionId);
    if (!user) {
        return redirect('/login');
    }

    try {
        await db.transaction(async (tx) => {
            const existingVote = await tx.query.votes.findFirst({
                where: and(eq(votes.ideaId, ideaId), eq(votes.userId, user.id)),
            });

            const currentIdea = await tx.query.ideas.findFirst({
                where: eq(ideas.id, ideaId),
                columns: { upvotes: true },
            });

            if (!currentIdea) {
                throw new Error('Idea not found');
            }

            if (existingVote) {
                // User has already voted, so remove the vote
                await tx.delete(votes).where(eq(votes.id, existingVote.id));
                await tx.update(ideas)
                    .set({ upvotes: (currentIdea.upvotes ?? 0) - 1 })
                    .where(eq(ideas.id, ideaId));
            } else {
                // User has not voted, so add a new vote
                await tx.insert(votes).values({
                    id: generateId(15),
                    ideaId: ideaId,
                    userId: user.id,
                    type: 'UPVOTE', // Assuming only UPVOTE for now
                });
                await tx.update(ideas)
                    .set({ upvotes: (currentIdea.upvotes ?? 0) + 1 })
                    .where(eq(ideas.id, ideaId));
            }
        });
        revalidatePath('/'); // Revalidate the home page to show updated upvotes
    } catch (error) {
        console.error('Failed to toggle vote:', error);
        return { error: 'Failed to toggle vote' };
    }
}

