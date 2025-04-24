import React from 'react';

export default function InsightsScreen() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 py-12">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Feedback & Insights</h1>
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg border border-gray-200 p-10">
        <div className="flex gap-4 items-center mb-8">
          <button className="flex-1 py-3 bg-teal-100 text-teal-700 font-bold rounded-lg hover:bg-teal-200 transition">👍 Thumbs Up</button>
          <button className="flex-1 py-3 bg-purple-100 text-purple-700 font-bold rounded-lg hover:bg-purple-200 transition">👎 Thumbs Down</button>
        </div>
        <textarea className="w-full min-h-[80px] p-3 rounded-md border border-gray-300 bg-gray-50 mb-6" placeholder="What worked? What didn’t?" />
        <button className="w-full py-3 bg-gradient-to-tr from-purple-500 to-teal-400 text-white font-bold rounded-lg shadow hover:from-purple-600 hover:to-teal-500 transition">Submit Feedback</button>
        <div className="mt-10">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Usage Dashboard</h2>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="text-2xl font-extrabold text-purple-600 mb-1">42</div>
              <div className="text-gray-600 text-sm">Top Queries</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="text-2xl font-extrabold text-teal-600 mb-1">9.2/10</div>
              <div className="text-gray-600 text-sm">Avg. Rating</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="text-2xl font-extrabold text-purple-600 mb-1">5 min</div>
              <div className="text-gray-600 text-sm">Time to Value</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="text-2xl font-extrabold text-teal-600 mb-1">3</div>
              <div className="text-gray-600 text-sm">Content Gaps</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
