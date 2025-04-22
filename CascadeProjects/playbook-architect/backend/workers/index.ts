import { createEmbedding } from '../services/embeddingService';
import { supabase } from '../services/supabaseClient';
import type { ParsedSection } from '../services/pdfService';

/**
 * Indexes parsed PDF sections: chunk by section, then by ~500 chars if needed.
 * Stores section heading in metadata for each chunk.
 */
export async function indexText(documentId: string, sections: ParsedSection[]) {
  for (const section of sections) {
    // Further chunk section text if >500 chars
    const rawChunks = section.text.match(/(.|\n){1,500}/g) || [];
    for (const chunk of rawChunks) {
      const embedding = await createEmbedding(chunk);
      await supabase.from('embeddings').upsert({
        document_id: documentId,
        chunk,
        section_heading: section.heading,
        embedding,
      });
    }
  }
}
