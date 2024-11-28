// src/lib/fetchProductData.ts
export interface Product {
  product: string;
  price: string;
  description: string;
  seller: string;
  image: string;
}

export const fetchProductData = (): Product[] => {
  return [
    {
      product: "Air Mineral Cleo",
      price: "Rp. 4.500",
      description: "Jakarta",
      seller: "Cleo",
      image: "/placeholder1.jpg",
    },
    {
      product: "Poster JKT 50",
      price: "Rp. 99.100.500",
      description: "Bandung",
      seller: "Cleo",
      image: "/placeholder1.jpg",
    },
    {
      product: "Action Figure Hatsune Miku",
      price: "Rp. 10.999.000",
      description: "Bandung",
      seller: "Kyou",
      image: "/placeholder1.jpg",
    },
    {
      product: "PC Gaming Ngebut Real no fek",
      price: "Rp. 999.999.999",
      description: "Jakarta",
      seller: "Kentank Tech",
      image: "/placeholder1.jpg",
    },
    {
      product: "Matras Yoga",
      price: "Rp. 994.500",
      description: "Jakarta",
      seller: "Cleo",
      image: "/placeholder1.jpg",
    },
    {
      product: "Monitor 24inchi",
      price: "Rp. 1.099.000",
      description: "Jakarta",
      seller: "AOC",
      image: "/placeholder1.jpg",
    },
  ];
};