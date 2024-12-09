import { NextApiResponse, NextApiHandler } from 'next';
import jwt from 'jsonwebtoken';
import Cookies from 'cookies';
import { AuthenticatedNextApiRequest } from './types'; // Import the custom type

const JWT_SECRET = process.env.JWT_SECRET as string;

export const authMiddleware = (handler: NextApiHandler, methods: string[]) => {
  return async (req: AuthenticatedNextApiRequest, res: NextApiResponse) => {
    if (!methods.includes(req.method as string)) {
      return handler(req, res);
    }

    const cookies = new Cookies(req, res);
    const token = cookies.get('token');

    if (!token) {
      return res.status(401).json({ status: 'error', error: 'No token provided' });
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
      return handler(req, res);
    } catch (error) {
      return res.status(401).json({ status: 'error', error: 'Invalid token' });
    }
  };
};