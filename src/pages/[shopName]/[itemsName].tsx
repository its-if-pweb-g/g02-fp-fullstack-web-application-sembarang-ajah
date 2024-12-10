import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/lib/CartContext';

interface Product {
  id: number;
  name: string;
  image: string;
  shop_name: string;
  price: number;
  stock: number;
  description: string;
  createdAt: Date;
}

export default function ItemsName() {
  const router = useRouter();
  const { shopName, itemsName } = router.query;
  const { addToCart } = useCart();

  const [isClient, setIsClient] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsClient(true); // Ensure it's client-side rendering
  }, []);

  function formatPrice(price: number): string {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  useEffect(() => {
    if (shopName && itemsName) {
      fetch(`/api/${shopName}/${itemsName}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          if (data.status === 'success' && data.data.length > 0) {
            setProduct(data.data[0]);
          } else {
            setError(data.error || 'Product not found');
          }
        })
        .catch((error) => {
          setError(error.message);
        });
    }
  }, [shopName, itemsName]);

  if (!product) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const handleAddToCart = () => {
    if (product) {

      const item = {
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image,
        description: product.description,
      };

      addToCart(item);
    }
  };

  if (!isClient || !product) {
    return <p>Loading...</p>;
  }

  return (
    <section className="flex gap-7 flex-col 2xl:flex-row xl:flex-row lg:flex-col md:flex-col sm:flex-col w-auto">
      <div className="p-2 min-w-80 2xl:p-4 xl:p-4 lg:p-4 md:p-2 sm:p-2">
        <Image
          src={product.image}
          alt={product.name}
          width={600}
          height={600}
          layout='responsive'
          objectFit='cover'
          objectPosition='center'
        />
      </div>

      <div className="p-4 w-auto">
        {/* Product Title */}
        <h1 className="text-2xl font-semibold">{product.name}</h1>

        {/* Description */}
        <span className="flex flex-row gap-3">
          <p>Rating: 5</p>
          <p>Category: Electronics</p>
          <p>Brand: {product.shop_name}</p>
        </span>

        {/* Price */}
        <p className="text-4xl font-bold mt-3 mb-4">
          Rp. {formatPrice(product.price)}
        </p>

        {/* CTA */}
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-40"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>

        <div className="mt-5 text-lg">
          <hr className="mb-2 bg-background-card opacity-75" />
          <p className='whitespace-pre-line' >{product.description}</p>
        </div>
      </div>
    </section>
  );
}
