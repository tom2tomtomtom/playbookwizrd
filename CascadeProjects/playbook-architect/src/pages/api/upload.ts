import type { NextApiRequest, NextApiResponse } from 'next';
import type { File as FormidableFile, Fields, Files } from 'formidable';
const formidable = require('formidable');
import { parsePdf } from '../../../backend/services/pdfService';
import { indexText } from '../../../backend/workers/index';
import { supabase } from '../../../backend/services/supabaseClient';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

function fileToBuffer(file: FormidableFile): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    if (file.filepath) {
      const stream = fs.createReadStream(file.filepath);
      stream.on('data', (chunk: Buffer | string) => {
        if (Buffer.isBuffer(chunk)) {
          chunks.push(chunk);
        } else {
          chunks.push(Buffer.from(chunk));
        }
      });
      stream.on('end', () => resolve(Buffer.concat(chunks)));
      stream.on('error', reject);
    } else if (file.toBuffer) {
      file.toBuffer().then((buf: Buffer) => resolve(buf)).catch(reject);
    } else {
      reject(new Error('No valid file source'));
    }
  });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  const form = new formidable.IncomingForm();
  form.parse(req, async (err: any, fields: Fields, files: Files) => {
    if (err) return res.status(500).json({ error: 'File upload error' });
    const userId = (fields.userId as string) || 'demo-user';
    const masterFile = files.master as FormidableFile;
    const businessFile = files.business as FormidableFile;
    if (!userId || !masterFile || !businessFile) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    // Upload files to Supabase Storage
    const uploadAndProcess = async (file: FormidableFile, type: string) => {
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
        const sections = await parsePdf(Buffer.from(await pdfData.arrayBuffer()));
        await indexText(docInsert.id, sections);
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
