import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import '@/app/globals.css';
import Header from '@/components/Header';

export default function ItemsName() {
  const router = useRouter();
  const { shopName, itemsName } = router.query;

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div>
      <Header />
      <h1>This is {itemsName} from {shopName}.</h1>
    </div>
  );
}