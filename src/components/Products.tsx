import ProductBox from '@/components/ProductBox';
import placeholderImage from '../../public/placeholder1.jpg';

export default function Products() {
  const productNumber: number = 6;

  return (
    <div className="overflow-x-auto p-1">
      <div className="flex gap-4 mt-2">
        {Array.from({ length: productNumber }).map((_, index) => (
          <div key={index} className="min-w-[10rem]">
            <ProductBox
              image={placeholderImage.src}
              product="Air Mineral Cleo Manis"
              price="Rp. 4.500,00"
              description='Jakarta'
              seller="Cleo"
            />
          </div>
        ))}
      </div>
    </div>
  );
}