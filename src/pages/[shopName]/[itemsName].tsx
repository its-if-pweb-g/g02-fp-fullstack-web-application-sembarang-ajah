import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useCart } from '@/lib/CartContext';
import { Product } from '@/lib/fetchProductData';

const ProductSection: React.FC<{ product: Product; handleAddToCart: () => void }> = ({ product, handleAddToCart }) => {
  return (
    <section className="py-8 bg-white md:py-16 dark:bg-gray-900 antialiased">
      <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
          {/* Product Image */}
          <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
            <Image
              className="w-full dark:hidden"
              src={product.image}
              alt={product.product}
              width={300}
              height={300}
            />
          </div>

          {/* Product Details */}
          <div className="mt-6 sm:mt-8 lg:mt-0">
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
              {product.product}
            </h1>
            <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
              <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">
                {product.price}
              </p>
            </div>

            <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
              <button
                title="Add to cart"
                className="text-white mt-4 sm:mt-0 bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 flex items-center justify-center"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            </div>

            <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

            <p className="mb-6 text-gray-500 dark:text-gray-400">
              {product.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default function ItemsName() {
  const router = useRouter();
  const { shopName, itemsName } = router.query;
  const { addToCart } = useCart();

  const [isClient, setIsClient] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (itemsName) {
      fetch(`/api/productsName?shopName=${shopName}&productsName=${itemsName}`, {
        method: 'GET'
      })
        .then(response => response.json())
        .then(data => {
          if (data.status === 'success') {
            setProduct(data.data);
          } else {
            setProduct(null);
          }
        })
        .catch(error => {
          console.error('Failed to fetch product data:', error);
          setProduct(null);
        });
    }
  }, [itemsName]);

  const handleAddToCart = () => {
    if (product) {
      const priceNumber = parseFloat(product.price.replace('Rp. ', '').replace(/\./g, '').trim());

      const item = {
        name: product.product,
        price: priceNumber,
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
    <>
      <ProductSection product={product} handleAddToCart={handleAddToCart} />
      <div className="mt-4 text-center">
        <p>Shop Name: {shopName}</p>
      </div>
    </>
  );
}
