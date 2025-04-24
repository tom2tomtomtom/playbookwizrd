'use client';
import Link from 'next/link';
import React from 'react';

export default function Header() {
  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40 w-full">
      <div className="max-w-4xl mx-auto flex items-center justify-between px-4 py-4">
        <Link href="/" className="text-2xl font-extrabold text-gray-900">
          Playbook Architect
        </Link>
        <div className="flex space-x-4">
          <Link href="/dashboard" className="text-sm font-medium text-gray-600 hover:text-gray-800">
            Dashboard
          </Link>
          <Link href="/upload" className="text-sm font-medium text-gray-600 hover:text-gray-800">
            Upload
          </Link>
          <Link href="/library" className="text-sm font-medium text-gray-600 hover:text-gray-800">
            Library
          </Link>
          <Link href="/query" className="text-sm font-medium text-gray-600 hover:text-gray-800">
            Query
          </Link>
          <Link href="/output" className="text-sm font-medium text-gray-600 hover:text-gray-800">
            Output
          </Link>
          <Link href="/export" className="text-sm font-medium text-gray-600 hover:text-gray-800">
            Export
          </Link>
          <Link href="/insights" className="text-sm font-medium text-gray-600 hover:text-gray-800">
            Insights
          </Link>
        </div>
      </div>
    </nav>
  );
}
