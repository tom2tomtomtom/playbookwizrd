export function personaBuilderPrompt({ retrievedChunks, context }: {
  retrievedChunks: string[];
  context: Record<string, string>;
}): string {
  return `You are Brandy’s persona builder AI. Given these playbook excerpts:\n\n${retrievedChunks.map((c, i) => `— ${c}`).join('\n')}\n\nClient context:\n${JSON.stringify(context, null, 2)}\n\nGenerate a persona as JSON:\n{\n  "name": "...",\n  "bio": "...",\n  "goals": ["..."],\n  "pain_points": ["..."],\n  "signature_trait": "..."\n}`;
}
