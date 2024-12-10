import { useCart } from '@/lib/CartContext';
import Image from 'next/image';
import { useRouter } from 'next/router';

const Checkout = () => {
  const { cart } = useCart();
  const router = useRouter();

  // Calculate total amount
  const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const lastProduct = cart[cart.length - 1];

  const handlePayment = () => {
    if (lastProduct) {
      router.push(`/products/${lastProduct.name}`);
    }
  };

  return (
    <div className="font-[sans-serif] bg-white p-4">
      <div className="md:max-w-5xl max-w-xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 max-md:order-1">
            <h2 className="text-3xl font-extrabold text-gray-800">Make a Payment</h2>
            <p className="text-gray-800 text-sm mt-4">
              Complete your transaction swiftly and securely with our easy-to-use payment process.
            </p>

            <form className="mt-8 max-w-lg">
              <div className="grid gap-4">
                <div>
                  <input
                    type="text"
                    placeholder="Cardholder's Name"
                    className="px-4 py-3.5 bg-gray-100 text-gray-800 w-full text-sm border rounded-md focus:border-purple-500 focus:bg-transparent outline-none"
                  />
                </div>

                <div className="flex bg-gray-100 border rounded-md focus-within:border-purple-500 focus-within:bg-transparent overflow-hidden">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 ml-3" viewBox="0 0 32 20">
                    <circle cx="10" cy="10" r="10" fill="#f93232" />
                    <path
                      fill="#fed049"
                      d="M22 0c-2.246 0-4.312.75-5.98 2H16v.014c-.396.298-.76.634-1.107.986h2.214c.308.313.592.648.855 1H14.03a9.932 9.932 0 0 0-.667 1h5.264c.188.324.365.654.518 1h-6.291a9.833 9.833 0 0 0-.377 1h7.044c.104.326.186.661.258 1h-7.563c-.067.328-.123.66-.157 1h7.881c.039.328.06.661.06 1h-8c0 .339.027.67.06 1h7.882c-.038.339-.093.672-.162 1h-7.563c.069.341.158.673.261 1h7.044a9.833 9.833 0 0 1-.377 1h-6.291c.151.344.321.678.509 1h5.264a9.783 9.783 0 0 1-.669 1H14.03c.266.352.553.687.862 1h2.215a10.05 10.05 0="
                    />
                  </svg>
                  <input
                    type="number"
                    placeholder="Card Number"
                    className="px-4 py-3.5 text-gray-800 w-full text-sm outline-none bg-transparent"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input
                      type="number"
                      placeholder="EXP."
                      className="px-4 py-3.5 bg-gray-100 text-gray-800 w-full text-sm border rounded-md focus:border-purple-500 focus:bg-transparent outline-none"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      placeholder="CVV"
                      className="px-4 py-3.5 bg-gray-100 text-gray-800 w-full text-sm border rounded-md focus:border-purple-500 focus:bg-transparent outline-none"
                    />
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="mt-8 w-40 py-3.5 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 tracking-wide"
                onClick={handlePayment}
              >
                Pay
              </button>
            </form>
          </div>

          {/* Cart Summary */}
          <div className="bg-gray-100 p-6 rounded-md">
            <h2 className="text-3xl font-extrabold text-gray-800">Summary</h2>

            <ul className="text-gray-800 mt-8 space-y-4">
              {cart.map((item) => (
                <li key={item.name} className="flex flex-wrap gap-4 text-sm">
                  <Image
                    src={item.image || '/placeholder1.jpg'}
                    alt={item.name}
                    width={50}
                    height={50}
                  />
                  {item.name} <span className="ml-auto font-bold">Rp. {item.price.toLocaleString()}</span>
                </li>
              ))}
              <li className="flex flex-wrap gap-4 text-sm font-bold border-t-2 pt-4">
                Total <span className="ml-auto">Rp. {totalAmount.toLocaleString()}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
