import React from 'react';
import Image from 'next/image';

interface ProductBoxProps {
  title: string;
  image: string;
  price: string;
}

const ProductBox: React.FC<ProductBoxProps> = ({ title, image, price }) => {
  return (
    <div className="bg-slate-900 rounded-md shadow-md p-4">
      <Image
        height={192}
        width={256}
        src={image}
        alt={title}
        className="w-full h-48 object-cover" />
      <h1 className="text-lg font-semibold mt-4">{title}</h1>
      <p className="text-gray-500 mt-2">{price}</p>
    </div>
  )
}

export default ProductBox;