import { MongoClient } from 'mongodb';

const client = new MongoClient('mongodb://user-g:g-for-goodluck@db.nafkhanzam.com/pweb-g');

export async function connectToDatabase() {
    await client.connect();

    const db = client.db('pweb-g');
    return db.collection('usersrl');
}
