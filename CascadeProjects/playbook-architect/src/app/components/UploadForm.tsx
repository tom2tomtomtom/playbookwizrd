'use client';
import React, { useRef, useState } from 'react';

interface UploadFormProps {
  onSuccess: (data: any) => void;
}

export const UploadForm: React.FC<UploadFormProps> = ({ onSuccess }) => {
  const masterRef = useRef<HTMLInputElement>(null);
  const businessRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return; // Prevent double submit
    setLoading(true);
    setError(null);
    try {
      if (!masterRef.current?.files?.[0] || !businessRef.current?.files?.[0]) {
        setError('Please select both Master and Business PDFs.');
        setLoading(false);
        return;
      }
      const formData = new FormData();
      formData.append('master', masterRef.current.files[0]);
      formData.append('business', businessRef.current.files[0]);
      formData.append('userId', 'demo-user');
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      let data: any = {};
      try {
        data = await res.json();
      } catch (err) {
        setError('Server error: Could not parse response.');
        setLoading(false);
        return;
      }
      if (res.ok) {
        onSuccess(data);
      } else {
        setError(data.error || 'Upload failed. Please try again.');
      }
    } catch (e) {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit} encType="multipart/form-data">
      <div>
        <label className="block text-sm font-semibold text-gray-900">Master PDF</label>
        <input type="file" accept="application/pdf" ref={masterRef} required className="mt-1 text-gray-900" />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-900">Business PDF</label>
        <input type="file" accept="application/pdf" ref={businessRef} required className="mt-1 text-gray-900" />
      </div>
      {error && <div className="text-red-700 text-sm font-semibold">{error}</div>}
      <button
        type="submit"
        className="w-full py-3 text-lg bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        disabled={loading}
      >
        {loading ? 'Uploading...' : 'Upload'}
      </button>
    </form>
  );
}
