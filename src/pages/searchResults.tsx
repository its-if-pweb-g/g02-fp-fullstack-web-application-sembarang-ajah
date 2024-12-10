import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/lib/CartContext';
import { fetchProductData, Product } from '@/lib/fetchProductData';

const SearchResults: React.FC = () => {
  const router = useRouter();
  const { query } = router.query;
  const { addToCart } = useCart();

  const [products, setProducts] = useState<Product[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(true);

  // Ensure it's client-side rendering
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (query) {
      const queryString = Array.isArray(query) ? query[0] : query; // Ensure handle arrays from the query parameter
      const filteredProducts = fetchProductData().filter((product) =>
        product.product.toLowerCase().includes(queryString.toLowerCase())
      );
      setProducts(filteredProducts);
      setLoading(false);
    } else {
      setProducts([]);
      setLoading(false);
    }
  }, [query]);

  const handleAddToCart = (product: Product) => {
    const priceNumber = parseFloat(product.price.replace('Rp. ', '').replace(/\./g, '').trim());

    const item = {
      name: product.product,
      price: priceNumber,
      quantity: 1,
      image: product.image,
      description: product.description,
    };

    addToCart(item);
  };

  if (!isClient || loading) {
    return <p>Loading...</p>;
  }

  return (
    <section>
      <h1 className="text-2xl font-semibold mb-4">Search Results</h1>

      {products.length > 0 ? (
        <div className="grid grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.product} className="border p-4 rounded-lg">
              <Image
                src={product.image}
                alt={product.product}
                width={300}
                height={300}
                className="object-cover"
              />
              <h2 className="text-xl font-bold mt-3">{product.product}</h2>
              <p className="text-lg text-gray-700">{product.description}</p>
              <p className="text-2xl font-semibold mt-3">Rp. {product.price.replace(/\./g, ',')}</p>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No products found.</p>
      )}
    </section>
  );
};

export default SearchResults;
