export function funnelMapPrompt({ retrievedChunks, context }: {
  retrievedChunks: string[];
  context: Record<string, string>;
}): string {
  return `You are Brandy’s AI strategist. Using the following playbook excerpts:\n\n${retrievedChunks.map((c, i) => `— ${c}`).join('\n')}\n\nClient context:\n${JSON.stringify(context, null, 2)}\n\nGenerate a funnel map as a JSON array. Each stage must have: name, description, and a key metric.\n\nFormat:\n[{\n  "stage": "...",\n  "description": "...",\n  "metric": "..."\n}, ...]`;
}
