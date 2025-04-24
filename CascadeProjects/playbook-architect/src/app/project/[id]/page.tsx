'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function ProjectPage() {
  const params = useParams();
  const id = params?.id as string;
  const [sections, setSections] = useState<{ chunk_index: number; chunk_text: string }[]>([]);
  const [queryType, setQueryType] = useState('signature');
  const [clientContext, setClientContext] = useState('');
  const [userPrompt, setUserPrompt] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchSections() {
      const res = await fetch(`/api/library?projectId=${id}`);
      const data = await res.json();
      setSections(data.sections || []);
    }
    if (id) fetchSections();
  }, [id]);

  const handleQuery = async () => {
    setLoading(true);
    const res = await fetch('/api/query', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ projectId: id, queryType, clientContext, userPrompt }),
    });
    const data = await res.json();
    setResult(data.result);
    setLoading(false);
  };

  return (
    <div className="flex h-screen">
      <aside className="w-1/4 p-4 border-r overflow-auto">
        <h2 className="font-semibold mb-2">Sections</h2>
        <ul className="space-y-2 text-sm">
          {sections.map((s) => (
            <li key={s.chunk_index} className="whitespace-pre-wrap">
              {s.chunk_text}
            </li>
          ))}
        </ul>
      </aside>
      <main className="flex-1 p-4 overflow-auto">
        <h2 className="text-xl font-semibold mb-4">Query</h2>
        <div className="flex flex-col space-y-2 max-w-xl">
          <select value={queryType} onChange={(e) => setQueryType(e.target.value)} className="border p-2 rounded">
            <option value="signature">Signature Tactics</option>
          </select>
          <textarea
            placeholder="Client context"
            value={clientContext}
            onChange={(e) => setClientContext(e.target.value)}
            className="border p-2 rounded h-24"
          />
          <textarea
            placeholder="Your prompt"
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
            className="border p-2 rounded h-24"
          />
          <button
            onClick={handleQuery}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {loading ? 'Generating...' : 'Generate'}
          </button>
        </div>
        {result && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Results</h3>
            <pre className="bg-gray-100 p-4 rounded max-h-96 overflow-auto">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </main>
    </div>
  );
}
