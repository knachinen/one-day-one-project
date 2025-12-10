"use server";
import { verify } from "argon2";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { z } from "zod";
import { lucia } from "@/lib/auth";
import { db } from "@/lib/db";
import { UserTable } from "@/lib/db/schema";

const loginSchema = z.object({
	email: z.string().email(),
	password: z.string(),
});

export async function login(formData: FormData) {
	const values = Object.fromEntries(formData.entries());
	const parsed = loginSchema.safeParse(values);

	if (!parsed.success) {
		return {
			error: "Invalid form data",
		};
	}

	const { email, password } = parsed.data;

	const existingUser = await db.query.UserTable.findFirst({
		where: eq(UserTable.email, email),
	});

	if (!existingUser) {
		return {
			error: "Incorrect email or password",
		};
	}

	const validPassword = await verify(existingUser.hashedPassword, password);
	if (!validPassword) {
		return {
			error: "Incorrect email or password",
		};
	}

	const session = await lucia.createSession(existingUser.id, {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	cookies().set(
		sessionCookie.name,
		sessionCookie.value,
		sessionCookie.attributes,
	);
	return {
		success: true,
	};
}
