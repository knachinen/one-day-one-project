'use server';

import { z } from 'zod';
import { generateId } from 'lucia';
import { lucia } from '@/lib/auth';
import { cookies } from 'next/headers';
import { db } from '@/lib/db';
import { ideas, users } from '@/lib/db/schema';
import { redirect } from 'next/navigation';
import { eq } from 'drizzle-orm';

const createIdeaSchema = z.object({
    title: z.string().min(3).max(100),
    tagline: z.string().min(3).max(150),
    description: z.string().min(10),
    category: z.string(),
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
    };

    const parsed = createIdeaSchema.safeParse(rawData);
    if (!parsed.success) {
        return { error: 'Invalid input data' };
    }

    const ideaId = generateId(15);
    try {
        await db.insert(ideas).values({
            id: ideaId,
            userId: user.id,
            title: parsed.data.title,
            tagline: parsed.data.tagline,
            description: parsed.data.description,
            category: parsed.data.category,
            status: 'IDEA',
        });
    } catch (e) {
        return { error: 'Failed to create idea' };
    }

    return redirect(`/ideas/${ideaId}`);
}

export async function getIdeas() {
    const allIdeas = await db.select({
        ...ideas,
        author: users.username,
    })
        .from(ideas)
        .leftJoin(users, eq(ideas.userId, users.id))
        .orderBy(ideas.createdAt);

    return allIdeas;
}
