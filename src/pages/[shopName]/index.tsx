import { useRouter } from 'next/router';
import Image from 'next/image';

export default function Shop() {
  const router = useRouter();
  const { shopName } = router.query;

  // Ensure that the `shopName` is available before rendering
  if (!shopName) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
          Loading shop...
        </h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-900 sm:text-3xl dark:text-white">
        Welcome to {shopName} Shop
      </h1>
      <section className="py-8 bg-white md:py-16 dark:bg-gray-900 antialiased w-full">
        <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
            <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
              {/* Light mode image */}
              <div className="dark:hidden">
                <Image
                  src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg"
                  alt="Shop display"
                  width={500}
                  height={500}
                  className="w-full"
                />
              </div>

              {/* Dark mode image */}
              <div className="hidden dark:block">
                <Image
                  src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg"
                  alt="Shop display in dark mode"
                  width={500}
                  height={500}
                  className="w-full"
                />
              </div>
            </div>

            <div className="mt-6 sm:mt-8 lg:mt-0 text-center lg:text-left">
              <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                {shopName}
              </h2>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">Profile</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Contact: 08123456789</p>
            <p className="mt-1 text-gray-600 dark:text-gray-400">Address: Jln. Apel no. 3, Surabaya</p>
            <p className="mt-1 text-gray-600 dark:text-gray-400">Operational hours: 09:00 AM - 10:00 PM</p>
          </div>
        </div>
      </section>
    </div>
  );
}
