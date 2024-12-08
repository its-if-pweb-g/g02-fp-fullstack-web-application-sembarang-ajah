import type { NextApiRequest, NextApiResponse } from 'next';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_KEY as string
);

const JWT_SECRET = process.env.JWT_SECRET as string;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res
      .status(405)
      .json({ status: 'error', error: 'Method not allowed' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ status: 'error', error: 'Email and password are required' });
  }

  try {
    const { data: user } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (user.length < 1) {
      return res
        .status(401)
        .json({ status: 'error', error: 'Invalid email or password' });
    }

    const isPasswordValid = await argon2.verify(user.password, password);

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ status: 'error', error: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, roles: user.roles },
      JWT_SECRET,
      {
        expiresIn: '1h',
      }
    );

    res.setHeader(
      'Set-Cookie',
      `token=${token}; HttpOnly; Path=/; Max-Age=3600`
    );

    // Authentication successful
    return res
      .status(200)
      .json({ status: 'success', message: 'Login successful', token });
  } catch (error) {
    return res.status(500).json({ status: 'error', error: error });
  }
}