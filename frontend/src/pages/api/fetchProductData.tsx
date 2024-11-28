// src/pages/api/fetchProductData.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchProductData } from '../../lib/fetchProductData';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const dummyData = fetchProductData();
  res.status(200).json(dummyData);
}