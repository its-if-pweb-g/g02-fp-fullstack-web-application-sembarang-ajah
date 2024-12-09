import type { GetServerSideProps } from 'next';
import Carousel from '@/components/index/carousel';
import ProductsPage from '@/components/Products';
import { verifyToken } from '@/lib/auth';
import Cookies from 'cookies';

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  description: string;
  shop_name: string;
  image: string;
}

interface MappedProduct {
  id: number;
  product: string;
  price: number;
  stock: number;
  description: string;
  seller: string;
  image: string;
}

interface HomeProps {
  products: MappedProduct[];
  isAuthenticated: boolean;
}

const Home: React.FC<HomeProps> = ({ products }) => {
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
  const text = await response.text(); // Get the response as text
  console.log('API Response:', text); // Log the response

  try {
    const data = JSON.parse(text); // Parse the response as JSON
    if (data.status === 'success') {
      const mappedProducts = data.data.map((product: Product) => ({
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
  } catch (error) {
    console.error('Error parsing JSON:', error);
    return {
      props: {
        products: [],
        isAuthenticated,
      },
    };
  }
};