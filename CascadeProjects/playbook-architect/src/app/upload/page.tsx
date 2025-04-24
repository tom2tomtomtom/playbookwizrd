'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { UploadForm } from '../components/UploadForm';

export default function UploadPage() {
  const router = useRouter();
  const [success, setSuccess] = useState(false);

  const handleSuccess = (data: { masterOpenAIId: string; businessOpenAIId: string }) => {
    localStorage.setItem('masterOpenAIId', data.masterOpenAIId);
    localStorage.setItem('businessOpenAIId', data.businessOpenAIId);
    setSuccess(true);
    router.push('/query');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-lg p-10 bg-white rounded-2xl shadow-md border border-gray-200 flex flex-col items-center space-y-8">
        <div className="w-16 h-16 mb-2 rounded-full bg-brand-600 flex items-center justify-center text-white text-3xl font-extrabold">B</div>
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Upload Playbook PDFs</h1>
        <p className="text-gray-600 text-lg mb-2">Choose your Master & Business PDFs to get started.</p>
        <UploadForm onSuccess={handleSuccess} />
        {success && <div className="mt-4 text-green-600 text-center">Upload successful! Redirecting…</div>}
      </div>
    </div>
  );
}
