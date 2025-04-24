import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { prompt, masterId, businessId } = req.body as {
      prompt: string;
      masterId: string;
      businessId: string;
    };
    if (!prompt || !masterId || !businessId) {
      return res.status(400).json({ error: 'Missing prompt or fileIds' });
    }

    // Defensive check for Assistant ID
    const assistantId = process.env.OPENAI_ASSISTANT_ID;
    if (!assistantId) {
      return res.status(500).json({ error: 'OpenAI Assistant ID is not set in environment variables.' });
    }

    // Create a new thread for each query
    const thread = await openai.beta.threads.create();

    // Attach both uploaded files for file_search
    await openai.beta.threads.messages.create(thread.id, {
      role: 'user',
      content: prompt,
      attachments: [
        { file_id: masterId, tools: [{ type: 'file_search' }] },
        { file_id: businessId, tools: [{ type: 'file_search' }] }
      ],
    });

    // Run the assistant on the thread
    let run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: assistantId,
    });

    // Poll until completed (simple loop, max 30s)
    const timeout = Date.now() + 30000;
    while (run.status !== 'completed' && Date.now() < timeout) {
      await new Promise((r) => setTimeout(r, 2000));
      run = await openai.beta.threads.runs.retrieve(thread.id, run.id);
    }

    if (run.status !== 'completed') {
      return res.status(500).json({ error: 'Assistant run timed out' });
    }

    const messages = await openai.beta.threads.messages.list(thread.id, {});
    const assistantMsg = messages.data.find((m) => m.role === 'assistant');
    // content[0] shape: { type: 'text', text: { value: string } }
    const answer = (assistantMsg as any)?.content?.[0]?.text?.value ?? '';

    return res.status(200).json({ answer });
  } catch (err: any) {
    console.error('query error', err);
    return res.status(500).json({ error: err.message });
  }
}
