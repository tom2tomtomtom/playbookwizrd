import type { NextApiRequest, NextApiResponse } from 'next';
import { createEmbedding } from '../services/embeddingService';
import { supabase } from '../services/supabaseClient';
import { chatCompletion } from '../services/openaiService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  const { projectId, queryType, clientContext, userPrompt } = req.body;
  if (!projectId || !queryType || !userPrompt) return res.status(400).json({ error: 'Missing fields' });
  // 1. Create embedding for user prompt
  const embedding = await createEmbedding(userPrompt);
  // 2. Call Supabase RPC to match embeddings
  const { data: chunks } = await supabase.rpc('match_embeddings', {
    query_embedding: embedding,
    match_threshold: 0.78,
    match_count: 5,
    project_id: projectId,
  });
  // 3. Import prompt template
  let promptTemplate;
  if (queryType === 'signatureTactics') {
    promptTemplate = (await import('../prompts/signatureTactics')).signatureTacticsPrompt;
  } else {
    return res.status(400).json({ error: 'Unknown queryType' });
  }
  // 4. Build system prompt
  const systemPrompt = promptTemplate({
    retrievedChunks: chunks?.map((c: any) => c.chunk) || [],
    context: clientContext || {},
  });
  // 5. Call OpenAI chat
  const result = await chatCompletion([
    { role: 'system', content: systemPrompt },
    { role: 'user', content: userPrompt },
  ]);
  try {
    const parsed = JSON.parse(result);
    res.status(200).json({ result: parsed });
  } catch {
    res.status(200).json({ result });
  }
}
