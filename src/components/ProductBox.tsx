import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ProductBoxProps {
  product: string;
  image: string;
  price: string;
  description: string;
  seller: string;
}

const ProductBox: React.FC<ProductBoxProps> = ({ product, image, price, description, seller }) => {
  const href = `/${seller}/${product}`;
  return (
    <Link href={href}>
      <div className='rounded-md shadow-md overflow-hidden'>
        <Image
          height={192}
          width={256}
          src={image}
          alt={product}
          className="w-full h-48 object-cover" />
        <div className=" p-4">
          <h1 className="text-lg font-semibold">{product}</h1>
          <p className="mt-2">{price}</p>
          <p className="text-foreground">{ description }</p>
        </div>
      </div>
    </Link>
  )
}

export default ProductBox;