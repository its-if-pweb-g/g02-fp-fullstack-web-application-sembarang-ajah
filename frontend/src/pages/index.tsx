import Carousel from '@/components/index/carousel';
import ProductsPage from '@/components/Products';
import { fetchProductData, Product } from '@/lib/fetchProductData';

interface HomeProps {
  products: Product[];
}

const Home: React.FC<HomeProps> = ({ products }) => {
  return (
    <div>
      <section className='p-4'>
        <Carousel />
        <h1 className="text-2xl font-semibold tracking-tight pt-10">Trending Products</h1>
        <ProductsPage products={products} />
      </section>
    </div>
  );
};

export default Home;

export async function getServerSideProps() {
  // Fetch data directly from the shared module
  const products: Product[] = fetchProductData();

  return {
    props: {
      products,
    },
  };
}