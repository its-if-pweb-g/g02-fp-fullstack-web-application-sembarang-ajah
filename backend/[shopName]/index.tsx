import { MongoClient } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

const MONGO_URI = process.env.MONGO_URI || "mongodb://user-g:g-for-goodluck@db.nafkhanzam.com/pweb-g";
const client = new MongoClient(MONGO_URI);
const dbName = "pweb-g";

export default async function handler(req: NextApiRequest, res: NextApiResponse)
{
    const { shopName } = req.query;

    if(!shopName)
    {
        return res.status(400).json({ status: "error", error: "Shop name is required" });
    }

    try
    {
        const db = (await client.connect()).db(dbName);
        const collection = db.collection("products");

        if(req.method === "GET")
        {
            const shopInfo = await collection.find({ shopName }).toArray();
            if(shopInfo.length === 0)
            {
                return res.status(404).json({ status: "error", error: "Shop not found" });
            }
            return res.status(200).json({ status: "success", shopName, products: shopInfo });
        }

        return res.status(405).json({ status: "error", error: `Method ${req.method} not allowed` });
    }
    catch(error)
    {
        console.error(error);
        return res.status(500).json({ status: "error", error: "Internal server error" });
    }
    finally
    {
        await client.close();
    }
}