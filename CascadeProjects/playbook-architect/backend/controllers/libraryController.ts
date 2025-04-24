import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../services/supabaseClient';

// Returns document chunks (index + text) for a given project/document ID
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
    const { projectId } = req.query;
    if (!projectId || typeof projectId !== 'string') {
      return res.status(400).json({ error: 'Missing projectId' });
    }
    const { data, error } = await supabase
      .from('embeddings')
      .select('chunk_index, chunk_text')
      .eq('document_id', projectId)
      .order('chunk_index', { ascending: true });
    if (error) throw error;
    return res.status(200).json({ sections: data });
  } catch (err: any) {
    console.error('Library controller error:', err);
    return res.status(500).json({ error: err.message });
  }
}
