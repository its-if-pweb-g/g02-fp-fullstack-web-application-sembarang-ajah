import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/lib/CartContext';
import { fetchProductData, Product } from '@/lib/fetchProductData';

export default function ItemsName() {
  const router = useRouter();
  const { shopName, itemsName } = router.query;
  const { addToCart } = useCart();

  const [isClient, setIsClient] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    setIsClient(true); // Ensure it's client-side rendering
  }, []);

  useEffect(() => {
    if (itemsName) {
      // Find the product based on the itemsName
      const fetchedProduct = fetchProductData().find(
        (product) => product.product === itemsName
      );
      setProduct(fetchedProduct || null);
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

  // Format price with proper currency formatting for display
  const formattedPrice = product.price.replace(/\./g, ',');

  return (
    <section className="flex flex-row gap-7">
      <div>
        <Image
          src={product.image}
          alt={product.product}
          width={300}
          height={300}
        />
      </div>

      <div className="p-4">
        {/* Product Title */}
        <h1 className="text-2xl font-semibold">{product.product}</h1>

        {/* Description */}
        <span className="flex flex-row gap-3">
          <p>Rating: 5</p>
          <p>Category: Electronics</p>
          <p>Brand: {product.seller}</p>
        </span>

        {/* Price */}
        <p className="text-4xl font-bold mt-3 mb-4">Rp. {formattedPrice}</p>

        {/* CTA */}
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
        <p>{shopName}</p>
      </div>
    </section>
  );
}
