import Header from '@/components/Header';
import Carousel from '@/components/index/carousel';
import ProductsPage from '@/components/Products';
import { fetchProductData, Product } from '@/lib/fetchProductData';

export default async function Home() {
  // Fetch data directly from the shared module
  const products: Product[] = fetchProductData();

  return (
    <div>
      <Header />
      <Carousel />
      <ProductsPage products={products} />
    </div>
  );
}