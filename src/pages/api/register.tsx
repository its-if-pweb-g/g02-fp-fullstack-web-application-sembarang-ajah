import argon2 from 'argon2';
import { createClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_KEY as string
)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') return res.status(405).json({ status: 'error', error: 'Method not allowed' });

  const { email, name, password, roles } = req.body;

  if (!email || !password || !roles) return res.status(400).json({ status: 'error', error: 'Email and password are required' });
  if(roles !== 'penjual' && roles !== 'pembeli') return res.status(400).json({ status: 'error', error: 'Invalid role' });

  try {
    const { data: user } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
    
    console.log(user);

    if (user && user.length > 0) return res.status(401).json({ status: 'error', error: 'Email already registered' });

    const hashedPassword = await argon2.hash(password);

    const { data: newUser } = await supabase
      .from('users')
      .insert({
        created_at: new Date().toISOString(),
        name: name,
        email: email,
        password: hashedPassword,
        roles: roles
      })
      .select();

    // console.log(newUser);
    if (newUser && newUser.length < 1) return res.status(500).json({ status: 'error', error: 'Failed to register user' });

    return res.status(200).json({ status: 'success', message: 'User registered successfully', data: newUser });
  } catch (error) {
    return res.status(500).json({ status: 'error', error: error });
  }
}