import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_KEY as string
);

interface Product {
  shop_name: string;
  name: string;
  price: number;
  stock: number;
  description: string;
}

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
      const { data: product } = await supabase
        .from('products')
        .select('*')
        .eq('shop_name', shopName)
        .eq('name', productsName);
      
      console.log(productsName);

      if (product) {
        return res.status(200).json({ status: 'success', data: product });
      } else {
        return res
          .status(404)
          .json({ status: 'error', error: 'Product not found' });
      }
    }

    if (req.method === 'POST') {
      const { price, stock, description } = req.body;
      if (!price || !stock || !description) {
        return res
          .status(400)
          .json({ status: 'error', error: 'Missing product details' });
      }

      const { data } = await supabase
        .from('products')
        .insert({
          created_at: new Date().toISOString(),
          shop_name: shopName,
          name: productsName,
          price: price,
          stock: stock,
          description: description,
        })
        .select();

      return res.status(201).json({
        status: 'success',
        message: 'Product created',
        data: data,
      });
    }

    if (req.method === 'PUT') {
      const { price, stock, description } = req.body;
      if (!price && !stock && !description) {
        return res
          .status(400)
          .json({ status: 'error', error: 'No update details provided' });
      }

      const updateFields: Partial<Product> = {};
      if (price) updateFields.price = price;
      if (stock) updateFields.stock = stock;
      if (description) updateFields.description = description;

      const result = await supabase
        .from('products')
        .update(updateFields)
        .match({ shop_name: shopName, name: productsName });

      if (result.error) {
        return res
          .status(404)
          .json({ status: 'error', error: 'Product not found' });
      }

      return res
        .status(200)
        .json({ status: 'success', message: 'Product updated' });
    }

    if (req.method === 'DELETE') {
      const result = await supabase
        .from('products')
        .delete()
        .match({ shop_name: shopName, name: productsName });

      if (result.error) {
        return res
          .status(404)
          .json({ status: 'error', error: 'Product not found' });
      }

      return res
        .status(200)
        .json({ status: 'success', message: 'Product deleted' });
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
