import { useQuery } from '@tanstack/react-query';

interface Project {
  id: string;
  name: string;
  thumbnail: string;
  lastEdited: string;
}

export function useProjects() {
  return useQuery<Project[], Error>({
    queryKey: ['projects'],
    queryFn: async () => {
      const res = await fetch('/api/projects');
      if (!res.ok) throw new Error('Error fetching projects');
      return (await res.json()) as Project[];
    },
  });
}
