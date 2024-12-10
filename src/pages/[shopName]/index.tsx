import { useRouter } from 'next/router';

export default function Shop() {
  const router = useRouter();
  const { shopName } = router.query;
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
        This is {shopName} shop
      </h1>
      <section className="py-8 bg-white md:py-16 dark:bg-gray-900 antialiased">
        <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
            <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
              <img
                className="w-full dark:hidden"
                src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg"
                alt=""
              />
              <img
                className="w-full hidden dark:block"
                src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg"
                alt=""
              />
            </div>

            <div className="mt-6 sm:mt-8 lg:mt-0">
              <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                {shopName}
              </h1>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">Profile</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Contact: 08123456789</p>
            <p className="mt-1 text-gray-600 dark:text-gray-400">Address: Jln. Apel no. 3, Surabaya</p>
            <p className="mt-1 text-gray-600 dark:text-gray-400">Operational hour: 09:00 - 22:00</p>
          </div>
        </div>
      </section>
    </div>
  );
}