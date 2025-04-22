export function localiseFoundationPrompt({ retrievedChunks, context }: {
  retrievedChunks: string[];
  context: Record<string, string>;
}): string {
  return `You are Brandy’s localise foundation AI. Using these playbook excerpts:\n\n${retrievedChunks.map((c, i) => `— ${c}`).join('\n')}\n\nClient context:\n${JSON.stringify(context, null, 2)}\n\nSummarise the local foundation as a JSON object:\n{\n  "core_message": "...",\n  "opportunity": "...",\n  "challenge": "..."\n}`;
}
