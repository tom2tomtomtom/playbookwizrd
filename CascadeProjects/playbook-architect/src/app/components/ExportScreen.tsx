import React from 'react';

export default function ExportScreen() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 py-12">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Export & Share</h1>
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg border border-gray-200 p-10 flex flex-col gap-6 items-center">
        <button className="w-full py-3 bg-gradient-to-tr from-purple-500 to-teal-400 text-white font-bold rounded-lg shadow hover:from-purple-600 hover:to-teal-500 transition">Download as PPTX</button>
        <button className="w-full py-3 bg-gradient-to-tr from-purple-500 to-teal-400 text-white font-bold rounded-lg shadow hover:from-purple-600 hover:to-teal-500 transition">Download as DOCX</button>
        <button className="w-full py-3 bg-gradient-to-tr from-purple-500 to-teal-400 text-white font-bold rounded-lg shadow hover:from-purple-600 hover:to-teal-500 transition">Download as CSV</button>
        <div className="w-full flex flex-col items-center mt-6">
          <div className="text-gray-700 mb-2">Share Link</div>
          <div className="flex gap-2 w-full">
            <input className="flex-1 px-3 py-2 rounded-md border border-gray-300 bg-gray-50" value="https://brandys.app/share/abc123" readOnly />
            <button className="px-4 py-2 bg-teal-500 text-white rounded-lg font-bold hover:bg-teal-600 transition">Copy</button>
          </div>
        </div>
      </div>
    </div>
  );
}
