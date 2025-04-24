import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../services/supabaseClient';

interface Project {
  id: string;
  name: string;
  thumbnail: string | null;
  updated_at: string | null;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  try {
    // If we are in bypass mode, return static sample data
    if (process.env.NEXT_PUBLIC_BYPASS_AUTH === 'true') {
      const mock: Project[] = [
        {
          id: 'demo-project',
          name: 'Demo Playbook',
          thumbnail: null,
          updated_at: new Date().toISOString(),
        },
      ];
      return res.status(200).json(mock);
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return res.status(401).json({ error: 'Not authenticated' });

    const { data, error } = await supabase
      .from('projects')
      .select('id, name, thumbnail, updated_at')
      .eq('user_id', user.id);

    if (error) throw error;
    return res.status(200).json(data as Project[]);
  } catch (err: any) {
    console.error('projects error', err);
    return res.status(500).json({ error: err.message });
  }
}
