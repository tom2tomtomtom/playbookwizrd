import React from 'react';

export default function OutputScreen() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 py-12">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Output Canvas</h1>
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Tactic Card Example */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 flex flex-col items-start">
          <div className="flex items-center mb-2">
            <span className="inline-block w-10 h-10 bg-gradient-to-tr from-purple-400 to-teal-300 rounded-full mr-3"></span>
            <span className="text-lg font-bold text-gray-900">Branded Pop-Up Experience</span>
          </div>
          <div className="text-gray-600 mb-2">A traveling activation that brings your brand to life in high-traffic locations.</div>
          <div className="flex gap-2 mt-auto">
            <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-semibold">Reach</span>
            <span className="bg-teal-100 text-teal-700 px-2 py-1 rounded-full text-xs font-semibold">Engagement</span>
          </div>
          <div className="flex gap-2 mt-4">
            <button className="px-4 py-1 bg-gradient-to-tr from-purple-500 to-teal-400 text-white rounded-full text-xs font-bold shadow hover:from-purple-600 hover:to-teal-500 transition">Regenerate</button>
            <button className="px-4 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-bold hover:bg-gray-200 transition">Annotate</button>
            <button className="px-4 py-1 bg-teal-100 text-teal-700 rounded-full text-xs font-bold hover:bg-teal-200 transition">Approve</button>
          </div>
        </div>
        {/* Funnel Table Example */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Funnel Map</h2>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="px-2 py-1 text-xs text-gray-500">Stage</th>
                <th className="px-2 py-1 text-xs text-gray-500">Tactic</th>
                <th className="px-2 py-1 text-xs text-gray-500">Metric</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-2 py-1">Awareness</td>
                <td className="px-2 py-1">Pop-Up Event</td>
                <td className="px-2 py-1">Footfall</td>
              </tr>
              <tr className="border-b">
                <td className="px-2 py-1">Consideration</td>
                <td className="px-2 py-1">Digital Activation</td>
                <td className="px-2 py-1">Engagement Rate</td>
              </tr>
              <tr>
                <td className="px-2 py-1">Conversion</td>
                <td className="px-2 py-1">Partner Offer</td>
                <td className="px-2 py-1">Redemptions</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
