import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// import '@/app/styles/globals.css';

interface ProductBoxProps {
  product: string;
  image: string;
  price: number;
  description: string;
  seller: string;
}

function formatPrice(price: number): string {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

const ProductBox: React.FC<ProductBoxProps> = ({ product, image, price, description, seller }) => {
  const encodedProduct = encodeURIComponent(product);
  const encodedSeller = encodeURIComponent(seller);
  const href = `/${encodedSeller}/${encodedProduct}`;
  return (
    <Link href={href}>
      <div className='rounded-md shadow-md bg-background-card overflow-hidden h-80 w-[13rem]'>
        <Image
          height={192}
          width={256}
          src={image}
          alt={product}
          className="w-full h-48 object-cover" />
        <div className="p-4">
          <p className="text-base font-regular leading-snug line-clamp-2 max-h-12 overflow-hidden">{product}</p>
          <p className="text-lg font-semibold">Rp. {formatPrice(price)}</p>
          <p className="tracking-normal text-sm mt-2">{ description }</p>
        </div>
      </div>
    </Link>
  )
}

export default ProductBox;