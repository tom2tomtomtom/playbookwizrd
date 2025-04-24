import { createEmbeddings } from '../services/embeddingService';
import { supabase } from '../services/supabaseClient';
import type { ParsedSection } from '../services/pdfService';

/**
 * Indexes parsed PDF sections: chunk by section, then by ~500 chars if needed.
 * Stores section heading in metadata for each chunk.
 */
export async function indexText(documentId: string, sections: ParsedSection[]) {
  let globalIndex = 0;
  const BATCH_SIZE = 100;
  for (const section of sections) {
    const rawChunks = (section.text.match(/(.|\n){1,500}/g) || []).map((c) =>
      c.replace(/[\x00-\x1F\x7F\uD800-\uDFFF]/g, '').trim()
    ).filter(Boolean);

    const safeHeading = section.heading?.replace(/[\x00-\x1F\x7F\uD800-\uDFFF]/g, '').trim() || '';

    for (let i = 0; i < rawChunks.length; i += BATCH_SIZE) {
      const batchChunks = rawChunks.slice(i, i + BATCH_SIZE);
      const embeddings = await createEmbeddings(batchChunks);

      const rows = batchChunks.map((chunk, idx) => ({
        document_id: documentId,
        chunk_text: chunk,
        chunk_index: globalIndex + idx,
        section_heading: safeHeading,
        embedding: embeddings[idx],
      }));

      const { error } = await supabase.from('embeddings').insert(rows);
      if (error) {
        console.error('[indexText] Supabase bulk insert error:', error);
        throw error;
      }

      globalIndex += batchChunks.length;
      console.log(`[indexText] processed ${globalIndex} chunks`);
    }
  }
}
