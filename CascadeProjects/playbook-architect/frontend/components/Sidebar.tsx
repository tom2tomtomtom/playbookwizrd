import React from 'react';

interface SidebarProps {
  sections: string[];
  selected: string | null;
  onSelect: (section: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ sections, selected, onSelect }) => (
  <aside className="w-60 bg-gradient-to-b from-brand-100 to-brand-200 p-4 h-full">
    <div className="font-bold text-lg mb-4">Sections</div>
    <ul className="space-y-2">
      {sections.map((section) => (
        <li
          key={section}
          className={`cursor-pointer px-2 py-1 rounded hover:bg-brand-300 ${selected === section ? 'bg-brand-400 text-white' : ''}`}
          onClick={() => onSelect(section)}
        >
          {section}
        </li>
      ))}
    </ul>
  </aside>
);
