import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_KEY as string
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { shopName, productsName } = req.query;

  if (!shopName || !productsName) {
    return res
      .status(400)
      .json({ status: 'error', error: 'The shop or product is not available' });
  }

  try {
    if (req.method == 'GET') {
      const { data: product } = await supabase.from('products').select('*');

      if (product) {
        return res.status(200).json({ status: 'success', data: product });
      } else {
        return res
          .status(404)
          .json({ status: 'error', error: 'Product not found' });
      }
    }

    return res
      .status(405)
      .json({ status: 'error', error: `Method ${req.method} not allowed` });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: 'error', error: 'Internal server error' });
  }
}
