import React, { useState } from 'react';
import { UploadForm } from '../components/UploadForm';
import { useRouter } from 'next/router';

const UploadPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-50">
      <div className="w-full max-w-md p-8 bg-white/90 rounded-xl shadow-lg border border-brand-100 flex flex-col items-center">
        <div className="w-14 h-14 mb-4 rounded-full bg-brand-200 flex items-center justify-center text-brand-600 text-2xl font-bold">B</div>
        <h1 className="text-3xl font-extrabold mb-4 text-brand-700">Upload Playbook PDFs</h1>
        <p className="mb-6 text-brand-600">Choose your Master & Business PDFs to get started.</p>
        <UploadForm
          onSuccess={(data) => {
            setLoading(true);
            setTimeout(() => {
              router.push(`/project/demo-project`);
            }, 1200);
          }}
        />
        {loading && <div className="mt-4 text-brand-500 animate-pulse">Processing and indexing…</div>}
      </div>
    </div>
  );
};

export default UploadPage;
