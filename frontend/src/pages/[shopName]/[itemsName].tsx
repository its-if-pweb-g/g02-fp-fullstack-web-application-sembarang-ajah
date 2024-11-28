import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import '@/app/styles/globals.css';

export default function ItemsName() {
  const router = useRouter();
  const { shopName, itemsName } = router.query;

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <section className="flex flex-row gap-7">
      <div>
        <Image 
          src="/placeholder1.jpg"
          alt='placeholder'
          width={300}
          height={300}
        />
      </div>

      <div className="p-4">
        {/* Product Title */}
        <h1 className="text-2xl font-semibold" >{itemsName}</h1>

        {/* Description */}
        <span className="flex flex-row gap-3">
          <p>Rating: 5</p>
          <p>Category: Electronics</p>
          <p>Brand: Apple</p>
        </span>

        {/* Price */}
        <p className="text-4xl font-bold mt-3 mb-4">Rp. 150.000</p>

        {/* CTA */}
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add to Cart
        </button>
        <p>{ shopName }</p>
      </div>
    </section>
  );
}