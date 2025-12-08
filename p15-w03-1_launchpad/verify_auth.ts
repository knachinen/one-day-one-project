import { db } from "./src/lib/db";
import { users } from "./src/lib/db/schema";
import { eq } from "drizzle-orm";

async function main() {
    const user = await db.select().from(users).where(eq(users.username, "testuser")).get();
    console.log("User found:", user ? "YES" : "NO");
    if (user) {
        console.log("User ID:", user.id);
        console.log("Username:", user.username);
    }
}

main();
