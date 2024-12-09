import type { GetServerSideProps } from 'next';
import Carousel from '@/components/index/carousel';
import ProductsPage from '@/components/Products';
import { Product } from '@/lib/fetchProductData';
import { verifyToken } from '@/lib/auth';
import Cookies from 'cookies';

interface HomeProps {
  products: Product[];
  isAuthenticated: boolean;
}

const Home: React.FC<HomeProps> = ({ products, isAuthenticated }) => {
  return (
    <div>
      <section className="p-4">
        <Carousel />
        <h1 className="text-2xl font-semibold tracking-tight pt-10">
          Trending Products
        </h1>
        <ProductsPage products={products} />
      </section>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const cookies = new Cookies(req, res);
  const token = cookies.get('token');
  const isTokenValid = token ? verifyToken(token) : null;
  const isAuthenticated = !!isTokenValid;

  console.log(isAuthenticated);

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products`);
  const data = await response.json();

  if (data.status === 'success') {
    const mappedProducts = data.data.map((product: any) => ({
      id: product.id,
      productName: product.name,
      price: product.price,
      stock: product.stock,
      description: product.description,
      shopName: product.shop_name,
      image: product.image,
    }));

    return {
      props: {
        products: mappedProducts,
        isAuthenticated,
      },
    };
  } else {
    return {
      props: {
        products: [],
        isAuthenticated,
      },
    };
  }
};