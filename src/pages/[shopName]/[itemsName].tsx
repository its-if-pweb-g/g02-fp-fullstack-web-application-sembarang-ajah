import { useRouter } from 'next/router';

export default function ItemsName() {
  const router = useRouter();
  const { shopName, itemsName } = router.query;

  return (
    <div>
      <h1>This is {itemsName} from {shopName}.</h1>
    </div>
  );
}