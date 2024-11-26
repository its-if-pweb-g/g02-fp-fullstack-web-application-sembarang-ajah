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
      <section className='p-4 2xl:mx-80 xl:mx-52 lg:mx-60 md:mx-32 sm:mx-12'>
        <Carousel/>
        <h1 className="text-2xl font-semibold tracking-tight pt-10">Trending Products</h1>
        <ProductsPage products={products}/>
      </section>
    </div>
  );
}