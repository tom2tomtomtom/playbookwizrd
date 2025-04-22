import React from 'react';
import Link from 'next/link';

const IndexPage: React.FC = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-brand-50">
    <div className="flex flex-col items-center bg-white/80 rounded-xl shadow-lg px-10 py-12 border border-brand-100">
      <div className="w-16 h-16 mb-4 rounded-full bg-brand-200 flex items-center justify-center text-brand-600 text-3xl font-bold">
        B
      </div>
      <h1 className="text-4xl font-extrabold mb-2 text-brand-700 tracking-tight">Brandy Playbook Architect</h1>
      <p className="mb-8 text-brand-600 text-lg">Upload and query your business playbooks with AI.</p>
      <Link href="/upload" className="btn btn-primary text-lg px-6 py-3">Upload Playbook</Link>
    </div>
  </div>
);

export default IndexPage;
