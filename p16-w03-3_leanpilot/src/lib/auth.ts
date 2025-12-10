import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle";
import { Lucia } from "lucia";
import { cookies } from "next/headers";
import { cache } from "react";
import { db } from "./db";
import { SessionTable, UserTable } from "./db/schema";

const adapter = new DrizzleSQLiteAdapter(db, SessionTable, UserTable);

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		expires: false,
		attributes: {
			secure: process.env.NODE_ENV === "production",
		},
	},
	getUserAttributes: (attributes) => {
		return {
			email: attributes.email,
			name: attributes.name,
		};
	},
});

export const validateRequest = cache(async () => {
	const sessionId = (await cookies()).get(lucia.sessionCookieName)?.value ?? null;
	if (!sessionId) {
		return {
			user: null,
			session: null,
		};
	}

	const result = await lucia.validateSession(sessionId);
	// next.js throws when you attempt to set a cookie when rendering page
	try {
		if (result.session?.fresh) {
			const sessionCookie = lucia.createSessionCookie(result.session.id);
			(await cookies()).set(
				sessionCookie.name,
				sessionCookie.value,
				sessionCookie.attributes,
			);
		}
		if (!result.session) {
			const sessionCookie = lucia.createBlankSessionCookie();
			(await cookies()).set(
				sessionCookie.name,
				sessionCookie.value,
				sessionCookie.attributes,
			);
		}
	} catch {}

	return result;
});

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: DatabaseUserAttributes;
	}
}

interface DatabaseUserAttributes {
	email: string;
	name: string | null;
}
