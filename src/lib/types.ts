import { NextApiRequest } from 'next';

interface User {
  email: string;
  // Add other properties as needed
}

export interface AuthenticatedNextApiRequest extends NextApiRequest {
  user?: User;
}