import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import Header from "@/components/Header";
import "@/app/styles/globals.css";
import { CartProvider } from "@/lib/CartContext";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // Exclude route from having a header
  const noHeaderRoutes = ["/login", "/register"];

  return (
        <CartProvider>  {/* Wrap the application in CartProvider */}
        <div>
          {!noHeaderRoutes.includes(router.pathname) && <Header />}
          <Component {...pageProps} />
        </div>
      </CartProvider>
  );
}
