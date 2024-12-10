/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextApiResponse, NextApiHandler, NextApiRequest } from 'next';
import jwt from 'jsonwebtoken';
import Cookies from 'cookies';

const JWT_SECRET = process.env.JWT_SECRET as string;

interface DecodedToken {
  id: string;
  email: string;
  // Add other properties as needed
}

export const authMiddleware = (handler: NextApiHandler, methods: string[]) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    if (!methods.includes(req.method as string)) {
      return handler(req, res);
    }

    const cookies = new Cookies(req, res);
    const token = cookies.get('token');

    if (!token) {
      return res.status(401).json({ status: 'error', error: 'No token provided' });
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken; // Use custom type for decoded token
      (req as any).user = decoded; // Cast req to any to bypass type safety for user property
      return handler(req, res);
    } catch (error) {
      console.error(error);
      return res.status(401).json({ status: 'error', error: 'Invalid token' });
    }
  };
};

/* eslint-enable @typescript-eslint/no-explicit-any */