import Carousel from '@/components/index/carousel'
import Products from '@/components/Products'

export default function Home() {
  return (
    <div>
      <Carousel/>
      <h1 className="text-5xl pt-14">An Ecommerce Landing Page.</h1>
      <Products/>
    </div>
  )
};