import React from 'react';

export interface CanvasOutputProps {
  result: any;
  error?: string | null;
  onRetry?: () => void;
}

export const CanvasOutput: React.FC<CanvasOutputProps> = ({ result, error, onRetry }) => {
  if (error) {
    return (
      <div className="text-red-500 text-sm" role="alert">
        {error} {onRetry && <button className="underline ml-2" onClick={onRetry}>Retry</button>}
      </div>
    );
  }
  if (!result) return <div className="text-gray-400">No output yet.</div>;
  if (Array.isArray(result)) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {result.map((item, i) => (
          <div key={i} className="bg-white rounded shadow p-4 border border-brand-200">
            <div className="font-bold text-lg mb-2">{item.name}</div>
            <div><span className="font-semibold">Rationale:</span> {item.rationale}</div>
            <div><span className="font-semibold">Metric:</span> {item.metric}</div>
          </div>
        ))}
      </div>
    );
  }
  return <pre className="bg-gray-100 p-4 rounded overflow-x-auto">{JSON.stringify(result, null, 2)}</pre>;
};
