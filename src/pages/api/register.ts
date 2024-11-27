import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { connectToDatabase } from '../../lib/user';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Username, email, and password are required' });
        }

        try {
            const collection = await connectToDatabase();

            const existingUser = await collection.findOne({ $or: [{ username }, { email }] });
            if (existingUser) {
                return res.status(400).json({ message: 'User with this email or username already exists' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await collection.insertOne({
                username,
                email,
                password: hashedPassword,
            });

            const token = jwt.sign(
                { id: newUser.insertedId.toString(), username, email },
                'secretKey',
                { expiresIn: '1h' }
            );

            return res.status(200).json({
                token,
                message: 'User created successfully',
            });
        } catch (error) {
            console.error("Error during user registration:", error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
