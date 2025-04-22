import React, { useState } from 'react';

const queryTypes = [
  { value: 'signatureTactics', label: 'Signature Tactics' },
];

export interface QueryConsoleProps {
  onGenerate: (params: {
    queryType: string;
    userPrompt: string;
    context: Record<string, string>;
  }) => void;
  loading: boolean;
}

export const QueryConsole: React.FC<QueryConsoleProps> = ({ onGenerate, loading }) => {
  const [queryType, setQueryType] = useState(queryTypes[0].value);
  const [userPrompt, setUserPrompt] = useState('');
  const [context, setContext] = useState({ location: '', audience: '', season: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate({ queryType, userPrompt, context });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded shadow">
      <div>
        <label className="block text-sm font-medium">Query Type</label>
        <select className="mt-1" value={queryType} onChange={e => setQueryType(e.target.value)}>
          {queryTypes.map(q => <option key={q.value} value={q.value}>{q.label}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium">Prompt</label>
        <input className="mt-1 w-full border rounded px-2 py-1" value={userPrompt} onChange={e => setUserPrompt(e.target.value)} required />
      </div>
      <div className="grid grid-cols-3 gap-2">
        <div>
          <label className="block text-xs">Location</label>
          <input className="w-full border rounded px-1 py-0.5" value={context.location} onChange={e => setContext(c => ({ ...c, location: e.target.value }))} />
        </div>
        <div>
          <label className="block text-xs">Audience</label>
          <input className="w-full border rounded px-1 py-0.5" value={context.audience} onChange={e => setContext(c => ({ ...c, audience: e.target.value }))} />
        </div>
        <div>
          <label className="block text-xs">Season</label>
          <input className="w-full border rounded px-1 py-0.5" value={context.season} onChange={e => setContext(c => ({ ...c, season: e.target.value }))} />
        </div>
      </div>
      <button type="submit" className="btn btn-primary w-full" disabled={loading}>
        {loading ? 'Generating...' : 'Generate'}
      </button>
    </form>
  );
};
