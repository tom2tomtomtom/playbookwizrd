import pdfParse from 'pdf-parse';

export interface ParsedSection {
  heading: string;
  text: string;
}

/**
 * Extracts text from a PDF buffer and splits it into sections by headings.
 * Headings are detected by lines in ALL CAPS or starting with a digit/section marker.
 */
export async function parsePdf(buffer: Buffer): Promise<ParsedSection[]> {
  const data = await pdfParse(buffer);
  const lines = data.text.split(/\r?\n/);
  const sections: ParsedSection[] = [];
  let current: ParsedSection | null = null;
  for (const line of lines) {
    // Heading: ALL CAPS, or starts with digit/section marker
    if (/^(\d+\.|[A-Z][A-Z\s\-]{5,})$/.test(line.trim())) {
      if (current) sections.push(current);
      current = { heading: line.trim(), text: '' };
    } else if (current) {
      current.text += (current.text ? '\n' : '') + line;
    }
  }
  if (current) sections.push(current);
  // Fallback: if no headings found, return whole text as one section
  if (sections.length === 0) {
    return [{ heading: 'Full Document', text: data.text }];
  }
  return sections;
}
