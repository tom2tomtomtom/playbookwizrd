"use client";
import React from 'react';
import { ProjectCard, NewProjectCard } from '../components/ProjectCard';
import { useProjects } from '../../hooks/useProjects';

export default function DashboardPage() {
  const { data: projects, isLoading, isError } = useProjects();
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <span>Loading...</span>
      </div>
    );
  }
  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <span className="text-red-600">Error loading projects.</span>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-10 text-center">Your Playbook Projects</h1>
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <NewProjectCard />
        {projects?.map((proj) => (
          <ProjectCard key={proj.id} {...proj} />
        ))}
      </div>
    </div>
  );
}
