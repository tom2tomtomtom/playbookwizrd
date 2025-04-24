import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Bulk embedding helper – much faster than calling one-by-one
export async function createEmbeddings(texts: string[]): Promise<number[][]> {
  if (!texts.length) return [];
  const response = await openai.embeddings.create({
    model: 'text-embedding-ada-002',
    input: texts,
  });
  return response.data.map((d) => d.embedding);
}

// Legacy single-text helper kept for convenience
export async function createEmbedding(text: string): Promise<number[]> {
  const [embedding] = await createEmbeddings([text]);
  return embedding;
}
