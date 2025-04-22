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
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-medium">Master PDF</label>
        <input type="file" accept="application/pdf" ref={masterRef} required className="mt-1" />
      </div>
      <div>
        <label className="block text-sm font-medium">Business PDF</label>
        <input type="file" accept="application/pdf" ref={businessRef} required className="mt-1" />
      </div>
      {error && <div className="text-red-500 text-sm" role="alert">{error} <button type="button" className="underline ml-2" onClick={() => setError(null)}>Retry</button></div>}
      <button type="submit" className="btn btn-primary" disabled={loading} aria-busy={loading} aria-disabled={loading}>
        {loading ? 'Uploading…' : 'Upload'}
      </button>
    </form>
  );
};
