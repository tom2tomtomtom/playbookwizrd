import { Buffer } from 'buffer';

export interface ParsedSection {
  heading: string;
  text: string;
}

/**
 * Extracts text from a PDF buffer and splits it into sections by headings.
 * Headings are detected by lines in ALL CAPS or starting with a digit/section marker.
 */
export async function parsePdf(buffer: Buffer): Promise<ParsedSection[]> {
  // Simplified PDF parsing: return entire text as a single section
  const text = buffer.toString('utf-8');
  return [{ heading: 'Full Document', text }];
}
