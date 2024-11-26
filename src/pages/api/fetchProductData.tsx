// src/pages/api/fetchProductData.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const dummyData = [
    {
      product: "Air Mineral Cleo",
      price: "Rp. 4.500,00",
      description: "Jakarta",
      seller: "Cleo",
      image: "/placeholder1.jpg"
    },
    {
      product: "Poster JKT 50",
      price: "Rp. 99.100.500,00",
      description: "Bandung",
      seller: "Cleo",
      image: "/placeholder1.jpg"
    },
    {
      product: "Action Figure Hatsune Miku",
      price: "Rp. 10.999.000,90",
      description: "Bandung",
      seller: "Kyou",
      image: "/placeholder1.jpg"
    },
    {
      product: "PC Gamink Ngebut Real no fek",
      price: "Rp. 999.999.999,99",
      description: "Jakarta",
      seller: "Kentank Tech",
      image: "/placeholder1.jpg"
    },
    {
      product: "Matras Yoga",
      price: "Rp. 994.500,00",
      description: "Jakarta",
      seller: "Cleo",
      image: "/placeholder1.jpg"
    },
    {
      product: "Monitor 24inchi",
      price: "Rp. 1.099.000,82",
      description: "Jakarta",
      seller: "AOC",
      image: "/placeholder1.jpg"
    }
  ];

  res.status(200).json(dummyData);
}