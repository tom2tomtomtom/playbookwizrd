import React from 'react';

export default function LibraryScreen() {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-purple-100 to-teal-50 border-r border-gray-200 p-6 flex flex-col gap-6">
        <h2 className="text-lg font-bold text-gray-700 mb-2">Sections</h2>
        <nav className="flex flex-col gap-2">
          <a className="px-3 py-2 rounded-lg hover:bg-purple-50 text-purple-700 font-semibold transition cursor-pointer">Foundation</a>
          <a className="px-3 py-2 rounded-lg hover:bg-purple-50 text-purple-700 font-semibold transition cursor-pointer">Messaging</a>
          <a className="px-3 py-2 rounded-lg hover:bg-purple-50 text-purple-700 font-semibold transition cursor-pointer">Signature Tactics</a>
          <a className="px-3 py-2 rounded-lg hover:bg-purple-50 text-purple-700 font-semibold transition cursor-pointer">Proof Points</a>
          <a className="px-3 py-2 rounded-lg hover:bg-purple-50 text-purple-700 font-semibold transition cursor-pointer">Funnel</a>
        </nav>
        <div className="mt-8">
          <input className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-purple-200" placeholder="Search or filter..." />
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          <span className="px-2 py-1 bg-purple-200 text-purple-800 rounded-full text-xs font-semibold">Positioning</span>
          <span className="px-2 py-1 bg-teal-200 text-teal-800 rounded-full text-xs font-semibold">Awareness</span>
          <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">Mid-Funnel</span>
        </div>
      </aside>
      {/* Main Preview Panel */}
      <main className="flex-1 p-12 bg-white">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Content Library</h1>
        <div className="bg-gray-50 rounded-xl border border-gray-200 p-8 min-h-[300px]">
          <h2 className="text-xl font-bold text-purple-700 mb-2">Signature Tactics</h2>
          <ul className="space-y-4">
            <li className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="font-semibold text-gray-900">Branded Pop-Up Experience</div>
              <div className="text-gray-600 text-sm mt-1">A traveling activation that brings your brand to life in high-traffic locations.</div>
            </li>
            <li className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="font-semibold text-gray-900">Co-Marketing Partnership</div>
              <div className="text-gray-600 text-sm mt-1">Partner with a complementary brand to reach new audiences together.</div>
            </li>
            <li className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="font-semibold text-gray-900">Interactive Digital Activation</div>
              <div className="text-gray-600 text-sm mt-1">Engage your audience online with a custom interactive experience.</div>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}
