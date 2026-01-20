import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function Home() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] p-8 gap-8 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-6 items-center text-center max-w-2xl">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
          Next.js + Supabase CRUD
        </h1>
        
        <p className="text-xl text-gray-600 dark:text-gray-300">
          A full-stack example with Authentication, Database, and Row Level Security.
        </p>

        <div className="flex gap-4 mt-4">
          {user ? (
            <Link 
              href="/posts"
              className="px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-lg hover:shadow-xl"
            >
              Go to My Posts
            </Link>
          ) : (
            <>
              <Link 
                href="/login"
                className="px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-lg hover:shadow-xl"
              >
                Get Started
              </Link>
              <a 
                href="https://supabase.com/docs" 
                target="_blank" 
                rel="noreferrer"
                className="px-6 py-3 text-blue-600 bg-white border border-blue-200 rounded-lg hover:bg-blue-50 dark:bg-gray-800 dark:border-gray-700 dark:text-blue-400 dark:hover:bg-gray-700 transition-colors font-medium"
              >
                Read Docs
              </a>
            </>
          )}
        </div>

        <div className="mt-12 p-6 bg-white rounded-xl shadow-sm border border-gray-100 dark:bg-gray-900 dark:border-gray-800 text-left w-full">
          <h3 className="font-semibold mb-2">Project Status</h3>
          <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
            <li className="flex items-center gap-2">✅ Project Setup</li>
            <li className="flex items-center gap-2">✅ Authentication (Login/Signup)</li>
            <li className="flex items-center gap-2">✅ CRUD (Posts)</li>
            <li className="flex items-center gap-2">✅ Database Security (RLS)</li>
            <li className="flex items-center gap-2">✅ Middleware Protection</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
