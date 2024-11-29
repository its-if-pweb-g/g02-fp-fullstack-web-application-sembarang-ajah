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
  const { shopName } = req.query;

  if (!shopName) {
    return res
      .status(400)
      .json({ status: 'error', error: 'Shop name is required' });
  }

  try {
    if (req.method === 'GET') {
      const { data: shopInfo } = await supabase
        .from('products')
        .select('*')
        .eq('shop_name', shopName);

      if (!shopInfo || shopInfo.length === 0) {
        return res
          .status(404)
          .json({ status: 'error', error: 'Shop not found' });
      }
      return res
        .status(200)
        .json({ status: 'success', shopName, products: shopInfo });
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
