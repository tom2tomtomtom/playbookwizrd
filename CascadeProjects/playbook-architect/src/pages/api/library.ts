import type { NextApiRequest, NextApiResponse } from 'next';

// Mock endpoint for document sections
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  // Return mock sections for the given project id
  res.status(200).json({
    sections: [
      'Executive Summary',
      'Market Analysis',
      'Signature Tactics',
      'KPIs',
    ],
  });
}
