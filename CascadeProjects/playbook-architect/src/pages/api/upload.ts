import type { NextApiRequest, NextApiResponse } from 'next';
import formidable, { File } from 'formidable';
import fs from 'fs';
import supabaseServiceRole from '../../lib/supabaseServiceRole';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const config = {
  api: {
    bodyParser: false,
  },
};

async function parseForm(req: NextApiRequest): Promise<{ fields: formidable.Fields; files: formidable.Files }> {
  return new Promise((resolve, reject) => {
    const form = formidable({
      multiples: false,
      filename: (name, ext, part, form) => {
        // Use the original filename (with extension) if available
        return part.originalFilename || `${name}${ext}`;
      }
    });
    form.parse(req, (err: Error | null, fields: formidable.Fields, files: formidable.Files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
}

async function uploadToOpenAI(file: File) {
  const fileStream = fs.createReadStream(file.filepath);
  const upload = await openai.files.create({
    file: fileStream,
    purpose: 'assistants',
  });
  return upload.id;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { files } = await parseForm(req);
    // Support both array and single file
    const masterFile = Array.isArray(files.master) ? files.master[0] : files.master as File;
    const businessFile = Array.isArray(files.business) ? files.business[0] : files.business as File;
    if (!masterFile || !businessFile) {
      return res.status(400).json({ error: 'Both master and business PDFs are required.' });
    }
    if (!masterFile.filepath || !businessFile.filepath) {
      return res.status(400).json({ error: 'File upload failed: missing file path.' });
    }

    // Helper to upload a file buffer to Supabase Storage
    async function uploadToSupabase(file: File, bucket: string, keyPrefix: string) {
      const fileBuffer = fs.readFileSync(file.filepath);
      const fileExt = file.originalFilename?.split('.').pop() || 'pdf';
      const fileName = `${keyPrefix}_${Date.now()}.${fileExt}`;
      const { data, error } = await supabaseServiceRole.storage.from(bucket).upload(fileName, fileBuffer, {
        contentType: file.mimetype || 'application/pdf',
        upsert: false,
      });
      if (error) throw error;
      return data?.path || fileName;
    }

    const bucket = 'playbooks'; // Make sure this bucket exists in your Supabase project
    // 1. Upload to Supabase Storage
    const masterSupabaseId = await uploadToSupabase(masterFile, bucket, 'master');
    const businessSupabaseId = await uploadToSupabase(businessFile, bucket, 'business');
    // 2. Upload to OpenAI
    const masterOpenAIId = await uploadToOpenAI(masterFile);
    const businessOpenAIId = await uploadToOpenAI(businessFile);

    return res.status(200).json({
      masterSupabaseId,
      businessSupabaseId,
      masterOpenAIId,
      businessOpenAIId
    });
  } catch (err: any) {
    console.error('Upload error', err);
    return res.status(500).json({ error: err.message || 'Upload failed' });
  }
}

