"use server";
import { hash } from "argon2";
import { generateId } from "lucia";
import { cookies } from "next/headers";
import { z } from "zod";
import { lucia } from "@/lib/auth";
import { db } from "@/lib/db";
import { UserTable } from "@/lib/db/schema";

const signupSchema = z.object({
	email: z.string().email(),
	name: z.string().min(1),
	password: z.string().min(8),
});

export async function signup(formData: FormData) {
	const values = Object.fromEntries(formData.entries());
	const parsed = signupSchema.safeParse(values);

	if (!parsed.success) {
		return {
			error: "Invalid form data",
		};
	}

	const { email, name, password } = parsed.data;

	const hashedPassword = await hash(password);
	const userId = generateId(15);

	try {
		await db
			.insert(UserTable)
			.values({
				id: userId,
				email,
				name,
				hashedPassword,
			})
			.returning();

		const session = await lucia.createSession(userId, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		cookies().set(
			sessionCookie.name,
			sessionCookie.value,
			sessionCookie.attributes,
		);
		return {
			success: true,
		};
	} catch (_error) {
		return {
			error: "Failed to create user",
		};
	}
}
