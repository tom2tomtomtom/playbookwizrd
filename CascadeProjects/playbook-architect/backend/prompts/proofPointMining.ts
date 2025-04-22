export function proofPointMiningPrompt({ retrievedChunks, context }: {
  retrievedChunks: string[];
  context: Record<string, string>;
}): string {
  return `You are Brandy’s proof-point mining AI. Using these playbook excerpts:\n\n${retrievedChunks.map((c, i) => `— ${c}`).join('\n')}\n\nClient context:\n${JSON.stringify(context, null, 2)}\n\nExtract 3-5 proof points as JSON:\n[{\n  "quote": "...",\n  "source": "...",\n  "relevance": "..."\n}, ...]`;
}
