'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';

export default function TestDBPage() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [projects, setProjects] = useState<any[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    async function checkConnection() {
      try {
        // Attempt to fetch from the 'projects' table
        const { data, error } = await supabase.from('projects').select('*');

        if (error) {
          throw error;
        }

        setProjects(data || []);
        setStatus('success');
      } catch (err: any) {
        console.error('Supabase connection error:', err);
        setStatus('error');
        setErrorMessage(err.message || 'Unknown error occurred');
      }
    }

    checkConnection();
  }, []);

  return (
    <div className="p-10 max-w-2xl mx-auto font-sans">
      <h1 className="text-2xl font-bold mb-6">Supabase Connection Test</h1>

      {status === 'loading' && (
        <div className="p-4 bg-blue-50 text-blue-700 rounded-lg">
          Running connection check...
        </div>
      )}

      {status === 'success' && (
        <div className="space-y-6">
          <div className="p-4 bg-green-50 text-green-700 rounded-lg border border-green-200">
            ✅ <strong>Connected Successfully!</strong>
            <p className="mt-1 text-sm">Read operation on 'projects' table was successful.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Projects Found: {projects.length}</h2>
            {projects.length === 0 ? (
              <p className="text-gray-500 italic">
                No projects found. (This is normal if the table is empty)
              </p>
            ) : (
              <pre className="bg-slate-100 p-4 rounded text-xs overflow-auto max-h-60 border border-slate-200">
                {JSON.stringify(projects, null, 2)}
              </pre>
            )}
          </div>
        </div>
      )}

      {status === 'error' && (
        <div className="p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
          ❌ <strong>Connection Failed</strong>
          <p className="mt-2 font-mono text-sm break-all">{errorMessage}</p>
          <div className="mt-4 text-sm text-slate-600">
            <p className="font-semibold">Troubleshooting Tips:</p>
            <ul className="list-disc list-inside mt-1 space-y-1">
              <li>Check if <code>.env.local</code> exists in the root.</li>
              <li>Verify <code>NEXT_PUBLIC_SUPABASE_URL</code> and Key are correct.</li>
              <li>Ensure you created the tables in Supabase SQL Editor.</li>
              <li>Check browser console for more details.</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
