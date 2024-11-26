import Header from '@/components/Header'
import Carousel from '@/components/index/carousel'
import ProductsPage from '@/components/Products'

interface Product {
  product: string;
  price: string;
  description: string;
  seller: string;
  image: string;
}

export default async function Home() {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/fetchProductData`);
  const products: Product[] = await data.json();
  return (
    <div>
      <Header />
      <section className='p-4 2xl:mx-80 xl:mx-52 lg:mx-60 md:mx-32 sm:mx-12'>
        <Carousel/>
        <h1 className="text-2xl font-semibold tracking-tight pt-10">Trending Products</h1>
        <ProductsPage products={products}/>
      </section>
    </div>
  )
};