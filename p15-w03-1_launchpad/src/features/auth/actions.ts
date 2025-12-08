"use server";

import { z } from "zod";
import { generateId } from "lucia";
import { Argon2id } from "oslo/password";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { lucia } from "@/lib/auth";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

const signupSchema = z.object({
    username: z.string().min(3).max(31),
    password: z.string().min(6).max(255),
});

export async function signup(prevState: any, formData: FormData) {
    const username = formData.get("username");
    const password = formData.get("password");

    const parsed = signupSchema.safeParse({ username, password });
    if (!parsed.success) {
        return { error: "Invalid input" };
    }

    // Check if user exists
    const existingUser = await db.select().from(users).where(eq(users.username, parsed.data.username)).get();
    if (existingUser) {
        return { error: "Username already taken" };
    }

    const hashedPassword = await new Argon2id().hash(parsed.data.password);
    const userId = generateId(15);

    try {
        console.log("Creating user in DB...");
        await db.insert(users).values({
            id: userId,
            username: parsed.data.username,
            password_hash: hashedPassword,
        });
        console.log("User created. Creating session...");

        const session = await lucia.createSession(userId, {});
        console.log("Session created:", session.id);
        const sessionCookie = lucia.createSessionCookie(session.id);
        (await cookies()).set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
        console.log("Cookie set.");
    } catch (e) {
        console.error("Signup error:", e);
        return { error: (e as Error).message };
    }
    return redirect("/");
}

export async function login(prevState: any, formData: FormData) {
    const username = formData.get("username");
    const password = formData.get("password");

    const parsed = signupSchema.safeParse({ username, password });
    if (!parsed.success) {
        return { error: "Invalid input" };
    }

    const existingUser = await db.select().from(users).where(eq(users.username, parsed.data.username)).get();
    if (!existingUser || !existingUser.password_hash) {
        return { error: "Incorrect username or password" };
    }

    const validPassword = await new Argon2id().verify(existingUser.password_hash, parsed.data.password);
    if (!validPassword) {
        return { error: "Incorrect username or password" };
    }

    const session = await lucia.createSession(existingUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    (await cookies()).set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    return redirect("/");
}

export async function logout() {
    const sessionCookie = lucia.createBlankSessionCookie();
    (await cookies()).set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    return redirect("/login");
}
