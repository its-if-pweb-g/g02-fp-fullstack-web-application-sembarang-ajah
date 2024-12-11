import "@/app/styles/globals.css";
import { useState } from "react";
import Image from 'next/image';

export default function Carousel() {
  const images = [
    "/bag1.jpeg",
    "/bag2.jpeg",
    "/bag3.jpeg"
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className="p-4 min-h-96 w-full bg-background-card bg-zinc-100 rounded-md">
      {/* Carousel display */}
      <div className="relative z-0"> {/* Set z-index to 0 to make sure it's behind the header */}
        {/* Gambar dengan ukuran yang responsif */}
        <Image
          src={images[currentImageIndex]}
          alt={`Product ${currentImageIndex + 1}`}
          width={600} // Set ukuran yang sesuai
          height={400} // Set ukuran yang sesuai
          className="w-full h-72 md:h-96 object-cover rounded-md"
        />
        {/* Tombol navigasi */}
        <div className="absolute top-1/2 left-0 right-0 flex justify-between">
          <button
            onClick={prevImage}
            className="bg-gray-600 text-white p-2 rounded-full"
          >
            &#10094;
          </button>
          <button
            onClick={nextImage}
            className="bg-gray-600 text-white p-2 rounded-full"
          >
            &#10095;
          </button>
        </div>
      </div>
    </div>
  );
}
