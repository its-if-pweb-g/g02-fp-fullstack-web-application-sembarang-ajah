import ProductBox from '@/components/ProductBox';
import placeholderImage from '../../public/placeholder1.jpg';

export default function Products() {
  const productNumber: number = 5;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-8">
      {Array.from({ length: productNumber }).map((_, index) => (
        <ProductBox
          key={index}
          image={placeholderImage.src}
          title="A Poster"
          price="$10"
        />
      ))}
    </div>
  );
}