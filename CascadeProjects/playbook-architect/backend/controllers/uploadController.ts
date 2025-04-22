import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import { supabase } from '../services/supabaseClient';
import { parsePdf } from '../services/pdfService';
import { indexText } from '../workers/index';
import { v4 as uuidv4 } from 'uuid';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ error: 'File upload error' });
    const userId = fields.userId as string;
    const masterFile = files.master as formidable.File;
    const businessFile = files.business as formidable.File;
    if (!userId || !masterFile || !businessFile) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    // Upload files to Supabase Storage
    const uploadAndProcess = async (file: formidable.File, type: string) => {
      const fileBuffer = await fileToBuffer(file);
      const filePath = `${userId}/${uuidv4()}-${type}.pdf`;
      await supabase.storage.from('playbooks').upload(filePath, fileBuffer, { contentType: 'application/pdf' });
      const { data: docInsert } = await supabase.from('documents').insert({
        user_id: userId,
        file_path: filePath,
        type,
      }).select().single();
      // Download back, extract text, index
      const { data: pdfData } = await supabase.storage.from('playbooks').download(filePath);
      if (pdfData) {
        const text = await parsePdf(Buffer.from(await pdfData.arrayBuffer()));
        await indexText(docInsert.id, text);
      }
      return docInsert;
    };
    try {
      const masterDoc = await uploadAndProcess(masterFile, 'master');
      const businessDoc = await uploadAndProcess(businessFile, 'business');
      res.status(200).json({ master: masterDoc, business: businessDoc });
    } catch (e) {
      res.status(500).json({ error: 'Processing failed' });
    }
  });
}

async function fileToBuffer(file: formidable.File): Promise<Buffer> {
  return await new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    const stream = file.filepath ? require('fs').createReadStream(file.filepath) : file.toBuffer();
    stream.on('data', (chunk: Buffer) => chunks.push(chunk));
    stream.on('end', () => resolve(Buffer.concat(chunks)));
    stream.on('error', reject);
  });
}
