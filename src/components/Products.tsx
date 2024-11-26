// components/Products.tsx
import ProductBox from '@/components/ProductBox';

interface Product {
  product: string;
  price: string;
  description: string;
  seller: string;
  image: string;
}

interface ProductsProps {
  products: Product[];
}

export default function Products({ products }: ProductsProps) {
  return (
    <div className="overflow-x-auto p-1">
      <div className="flex gap-4 mt-2">
        {products.map((product, index) => (
          <div key={index} className="min-w-[13rem]">
            <ProductBox
              image={product.image}
              product={product.product}
              price={product.price}
              description={product.description}
              seller={product.seller}
            />
          </div>
        ))}
      </div>
    </div>
  );
}