'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Lock, Mail } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [logs, setLogs] = useState<string[]>([]); // New log state
  const router = useRouter();

  const addLog = (msg: string) => setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${msg}`]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    addLog("Attempting login...");
    addLog(`Supabase URL present: ${!!process.env.NEXT_PUBLIC_SUPABASE_URL}`);
    
    setLoading(true);
    setError(null);

    try {
      addLog("Calling signInWithPassword...");
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        addLog(`Login failed: ${error.message}`);
        console.error("Login failed:", error);
        setError(error.message);
        setLoading(false);
      } else {
        addLog("Login successful! User authenticated.");
        
        // Refresh session explicitly
        const { data: { session } } = await supabase.auth.getSession();
        addLog(session ? "Session retrieved." : "No session found.");

        // Force a hard navigation to ensure cookies are sent to the server for middleware verification
        addLog("Redirecting to /admin/projects...");
        window.location.href = '/admin/projects';
      }
    } catch (err: any) {
      addLog(`Unexpected error: ${err.message || err}`);
      console.error("Unexpected error during login:", err);
      setError("An unexpected error occurred");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center gap-8">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 w-full max-w-md">
        {/* ... form content ... */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Admin Login</h1>
          <p className="text-slate-500 text-sm mt-2">Enter your credentials to access the CMS</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="admin@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-xs mt-2 bg-red-50 p-2 rounded border border-red-100">
              {error}
            </p>
          )}

          <Button type="submit" className="w-full py-3" disabled={loading}>
            {loading ? 'Logging in...' : 'Sign In'}
          </Button>
        </form>
      </div>

      {/* Debug Logs Area */}
      <div className="w-full max-w-md bg-slate-900 text-green-400 p-4 rounded-xl font-mono text-xs overflow-auto max-h-40">
        <p className="text-slate-500 border-b border-slate-700 pb-2 mb-2">Debug Logs:</p>
        {logs.length === 0 ? <p className="opacity-50">Ready...</p> : logs.map((log, i) => (
          <div key={i}>{log}</div>
        ))}
      </div>
    </div>
  );
}
