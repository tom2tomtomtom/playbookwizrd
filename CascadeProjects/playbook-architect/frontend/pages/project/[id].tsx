import React, { useState } from 'react';
import { Sidebar } from '../../components/Sidebar';
import { QueryConsole } from '../../components/QueryConsole';
import { CanvasOutput } from '../../components/CanvasOutput';

const mockSections = [
  'Executive Summary',
  'Market Analysis',
  'Signature Tactics',
  'KPIs',
];

const mockResult = [
  {
    name: 'Tactic Alpha',
    rationale: 'Drive customer engagement in Q2.',
    metric: 'Increase NPS by 10%'
  },
  {
    name: 'Tactic Beta',
    rationale: 'Expand market reach via digital.',
    metric: 'Grow leads by 30%'
  },
  {
    name: 'Tactic Gamma',
    rationale: 'Streamline onboarding process.',
    metric: 'Reduce time-to-value by 20%'
  },
  {
    name: 'Tactic Delta',
    rationale: 'Enhance team collaboration.',
    metric: 'Improve project delivery by 2 weeks'
  }
];

const ProjectPage: React.FC = () => {
  const [selected, setSelected] = useState<string | null>(mockSections[0]);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastParams, setLastParams] = useState<any>(null);

  const handleGenerate = async (params: any) => {
    setLoading(true);
    setError(null);
    setLastParams(params);
    try {
      // Simulate API call (replace with real fetch in production)
      await new Promise(res => setTimeout(res, 1200));
      setResult(mockResult);
    } catch (e) {
      setError('Failed to generate response. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    if (lastParams) handleGenerate(lastParams);
  };

  return (
    <div className="flex min-h-screen bg-brand-50">
      <Sidebar sections={mockSections} selected={selected} onSelect={setSelected} />
      <main className="flex-1 p-8">
        <div className="bg-white/90 rounded-xl shadow-lg border border-brand-100 p-8">
          <h1 className="text-2xl font-extrabold mb-4 text-brand-700">Project: Demo Playbook</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <QueryConsole onGenerate={handleGenerate} loading={loading} />
            <div>
              <CanvasOutput result={result} error={error} onRetry={handleRetry} />
              {result && (
                <div className="mt-4 flex gap-2">
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      const blob = new Blob([JSON.stringify(result, null, 2)], { type: 'application/json' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = 'playbook-result.json';
                      a.click();
                      URL.revokeObjectURL(url);
                    }}
                  >
                    Export JSON
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      const csv = Array.isArray(result)
                        ? [Object.keys(result[0]).join(','), ...result.map((row: any) => Object.values(row).join(','))].join('\n')
                        : '';
                      const blob = new Blob([csv], { type: 'text/csv' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = 'playbook-result.csv';
                      a.click();
                      URL.revokeObjectURL(url);
                    }}
                  >
                    Export CSV
                  </button>
                </div>
              )}
              {error && (
                <div className="mt-4 text-red-500 text-sm" role="alert">
                  {error} <button className="underline ml-2" onClick={handleRetry}>Retry</button>
                </div>
              )}
              {loading && <div className="mt-4 text-brand-500 animate-pulse" aria-busy="true">Generating response…</div>}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProjectPage;
