import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

const MONGO_URI = process.env.MONGO_URI || "mongodb://user-g:g-for-goodluck@db.nafkhanzam.com/pweb-g";
const client = new MongoClient(MONGO_URI);
const dbName = "pweb-g";

type Product =
{
    shopName: string;
    productsName: string;
    price: number;
    stock: number;
    description: string;
    createdAt: Date;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse)
{
    const { shopName, productsName } = req.query;

    if(!shopName || !productsName)
    {
        return res.status(400).json({ status: "error", error: "The shop or product is not available" });
    }

    try
    {
        const db = (await client.connect()).db(dbName);
        const collection = db.collection('products');

        if(req.method == "GET")
        {
            const product = await collection.findOne({ shopName, productsName });
            if(product)
            {
                return res.status(200).json({ status: "success", data: product});
            }
            else
            {
                return res.status(404).json({ status: "error", error: "Product not found" });
            }
        }

        if(req.method === "POST")
        {
            const { price, stock, description } = req.body;
            if(!price || !stock || !description)
            {
                return res.status(400).json({ status: "error", error: "Missing product details" });
            }

            const newProduct = 
            {
                shopName,
                productsName,
                price,
                stock,
                description,
                createdAt: new Date(),
            };

            const result = await collection.insertOne(newProduct);
            return res.status(201).json
            ({
                status: "success",
                message: "Product created",
                data:
                { 
                    _id: result.insertedId, 
                    ...newProduct 
                } 
            });
        }

        if(req.method === "PUT")
        {
            const { price, stock, description } = req.body;
            if(!price && !stock && !description)
            {
                return res.status(400).json({ status: "error", error: "No update details provided" });
            }

            const updateFields: Partial<Product> = {};
            if(price) updateFields.price = price;
            if(stock) updateFields.stock = stock;
            if(description) updateFields.description = description;

            const result = await collection.updateOne
            (
                { shopName, productsName },
                { $set: updateFields }
            );

            if(result.matchedCount === 0)
            {
                return res.status(404).json({ status: "error", error: "Product not found" });
            }

            return res.status(200).json({ status: "success", message: "Product updated" });
        }

        if(req.method === "DELETE")
        {
            const result = await collection.deleteOne({ shopName, productsName });
            
            if(result.deletedCount === 0)
            {
                return res.status(404).json({ status: "error", error: "Product not found" });
            }

            return res.status(200).json({ status: "success", message: "Product deleted" });
        }

        return res.status(405).json({ status: "error", error: `Method ${req.method} not allowed` });
    }
    catch(error)
    {
        console.error(error);
        return res.status(500).json({ status: "error", error: "Internal server error" });
    }
}