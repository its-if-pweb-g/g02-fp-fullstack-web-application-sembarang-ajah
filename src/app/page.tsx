import Header from '@/components/Header'
import Carousel from '@/components/index/carousel'
import Products from '@/components/Products'

export default function Home() {
  return (
    <div>
      <Header />
      <section className='p-4 xl:mx-60 lg:mx-40 sm:mx-0 md:mx-10'>
        <Carousel/>
          <h1 className="text-2xl font-semibold tracking-tight pt-10">Browse Trending Products</h1>
        <Products/>
      </section>
    </div>
  )
};