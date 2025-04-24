import React from 'react';
import { FiCopy, FiArchive, FiArrowRight, FiPlus, FiCalendar } from 'react-icons/fi';

export function ProjectCard({ name, thumbnail, lastEdited }: { name: string; thumbnail: string; lastEdited: string }) {
  return (
    <div
      className="relative bg-white/90 rounded-3xl border-2 border-transparent hover:border-gradient-to-tr hover:from-purple-400 hover:to-teal-300 shadow-md flex flex-col items-center p-8 group transition-all duration-300 hover:scale-105 hover:shadow-2xl before:absolute before:inset-0 before:rounded-3xl before:bg-gradient-to-tr before:from-purple-100 before:to-teal-50 before:opacity-0 group-hover:before:opacity-100 before:-z-10"
      style={{ minHeight: 280 }}
    >
      <img src={thumbnail} alt={name} className="w-28 h-28 rounded-xl object-cover mb-5 border-2 border-white shadow-sm" />
      <h2 className="text-xl font-extrabold text-gray-900 mb-2 text-center tracking-tight drop-shadow-sm">{name}</h2>
      <div className="flex items-center gap-1 text-xs text-gray-500 mb-5">
        <FiCalendar className="inline-block text-purple-400" />
        <span>Last edited: {lastEdited}</span>
      </div>
      <div className="flex gap-3 mt-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button className="flex items-center gap-1 px-4 py-2 bg-gradient-to-tr from-purple-500 to-teal-400 text-white rounded-full text-sm font-semibold shadow hover:from-purple-600 hover:to-teal-500 transition"><FiArrowRight /> Open</button>
        <button className="flex items-center gap-1 px-3 py-2 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-full text-sm font-semibold transition"><FiCopy /> Duplicate</button>
        <button className="flex items-center gap-1 px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-full text-sm font-semibold transition"><FiArchive /> Archive</button>
      </div>
    </div>
  );
}

export function NewProjectCard() {
  return (
    <div className="relative bg-gradient-to-tr from-purple-200 via-teal-100 to-white rounded-3xl border-2 border-dashed border-teal-300 flex flex-col items-center justify-center p-8 cursor-pointer hover:shadow-2xl hover:border-teal-500 transition-all duration-300 min-h-[280px] group overflow-hidden">
      <span className="absolute inset-0 bg-gradient-to-tr from-purple-100 via-teal-50 to-white opacity-40 group-hover:opacity-60 transition" />
      <FiPlus className="text-teal-500 text-5xl mb-3 group-hover:animate-spin-slow transition-all duration-500" />
      <div className="text-teal-700 font-extrabold text-xl tracking-tight drop-shadow">New Project</div>
      <div className="text-xs text-teal-400 mt-2">Start a fresh playbook</div>
    </div>
  );
}
