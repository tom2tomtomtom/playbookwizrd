export function signatureTacticsPrompt({ retrievedChunks, context }: {
  retrievedChunks: string[];
  context: Record<string, string>;
}): string {
  return `You are a business playbook AI. Given these context chunks and user context, return a JSON array of 4 signature tactics. Each tactic must have: name, rationale, metric.\n\nCONTEXT:\n${retrievedChunks.join('\n\n')}\n\nUSER CONTEXT:\n${JSON.stringify(context, null, 2)}\n\nFormat your response as:\n[{\n  "name": "...",\n  "rationale": "...",\n  "metric": "..."\n}, ...]`;
}
