import { lucia } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { logout } from "@/features/auth/actions";
import { IdeaList } from '@/components/features/idea-list'; // Import IdeaList

async function getSession() {
  const sessionId = (await cookies()).get(lucia.sessionCookieName)?.value ?? null;
  if (!sessionId) return null;
  const { user, session } = await lucia.validateSession(sessionId);
  try {
    if (session && session.fresh) {
      const sessionCookie = lucia.createSessionCookie(session.id);
      (await cookies()).set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    }
    if (!session) {
      const sessionCookie = lucia.createBlankSessionCookie();
      (await cookies()).set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    }
  } catch {
    // Next.js throws when you attempt to set cookie when rendering page
  }
  return { user, session };
}

export default async function Home() {
  const sessionData = await getSession();

  if (!sessionData?.user) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <h1 className="text-4xl font-bold mb-8">LaunchPad MVP</h1>
        <div className="flex gap-4">
          <a href="/login" className="px-4 py-2 bg-blue-500 text-white rounded">Login</a>
          <a href="/signup" className="px-4 py-2 bg-green-500 text-white rounded">Sign Up</a>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p>Welcome, {sessionData.user.username}</p>
        <form action={logout}>
          <button type="submit" className="px-4 py-2 bg-red-500 text-white rounded">Logout</button>
        </form>
      </div>
      <section className="container mx-auto py-8">
        <h2 className="text-2xl font-bold mb-6">Latest Ideas</h2>
        <IdeaList />
      </section>
    </main>
  );
}
