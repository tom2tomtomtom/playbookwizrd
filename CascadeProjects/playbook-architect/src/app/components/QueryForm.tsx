'use client';
import React, { useState, useEffect } from 'react';

interface Suggestion {
  title: string;
  description: string;
}

export const QueryForm: React.FC = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const [masterId, setMasterId] = useState<string | null>(null);
  const [businessId, setBusinessId] = useState<string | null>(null);

  // On mount, read OpenAI fileIds stored after upload
  useEffect(() => {
    setMasterId(localStorage.getItem('masterOpenAIId'));
    setBusinessId(localStorage.getItem('businessOpenAIId'));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) {
      setError('Please enter a prompt.');
      return;
    }
    if (!masterId || !businessId) {
      setError('Missing uploaded documents, please upload first.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: query, masterId, businessId }),
      });
      if (!res.ok) {
        const err = await res.json();
        setError(err.error || 'Query failed.');
      } else {
        const data = await res.json();
        setAnswer(data.answer || '');
      }
    } catch (e) {
      setError('Network error. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="w-full max-w-2xl bg-white p-8 rounded-xl shadow border border-gray-200">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-800">Your Prompt</label>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask Brandy about your playbook…"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900"
          />
        </div>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow transition"
        >
          {loading ? 'Generating…' : 'Generate'}
        </button>
      </form>
      {answer && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200 text-gray-900 whitespace-pre-wrap">
          {answer}
        </div>
      )}
    </div>
  );
};
