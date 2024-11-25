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
      <div className='rounded-md shadow-md dark:bg-zinc-800 overflow-hidden'>
        <Image
          height={192}
          width={256}
          src={image}
          alt={product}
          className="w-full h-48 object-cover" />
        <div className="p-4">
          <p className="text-base font-regular leading-snug line-clamp-2">{product}</p>
          <p className="text-lg font-semibold">{price}</p>
          <p className="">{ description }</p>
        </div>
      </div>
    </Link>
  )
}

export default ProductBox;