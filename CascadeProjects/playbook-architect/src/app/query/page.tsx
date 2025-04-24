'use client';

import React from 'react';
import { QueryForm } from '../components/QueryForm';

export default function QueryPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-8">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-md border border-gray-200 p-10">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6">Ask Brandy</h1>
        <QueryForm />
      </div>
    </div>
  );
}
