import { useCart } from '@/lib/CartContext';
import Image from 'next/image';
import { useRouter } from 'next/router';

const CartPage = () => {
  const { cart, removeFromCart } = useCart();
  const router = useRouter();

  // Calculate total amount
  const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleRemoveItem = (name: string) => {
    removeFromCart(name);
  };

  return (
    <section className="p-6">
      <h2 className="text-3xl font-bold">Your Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.name} className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center">
                <Image
                  src={item.image || '/placeholder1.jpg'}
                  alt={item.name}
                  width={100}
                  height={100}
                  className="rounded-md"
                />
                <div className="ml-4">
                  <h3 className="text-xl font-semibold">{item.name}</h3>
                  <p>{item.description}</p>
                  <p>
                    {item.quantity} x Rp. {item.price.toLocaleString()}
                  </p>
                </div>
              </div>
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => handleRemoveItem(item.name)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="mt-6 text-xl font-semibold">
        <p>Total: Rp. {totalAmount.toLocaleString()}</p>
      </div>
      {cart.length > 0 && (
        <div className="mt-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
            onClick={() => router.push('/checkout')}
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </section>
  );
};

export default CartPage;
