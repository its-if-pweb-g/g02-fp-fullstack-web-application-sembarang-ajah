import {useRouter} from 'next/router';

export default function Shop() {
  const router = useRouter();
  const {shopName} = router.query;
  return (
    <div>
      <h1>This is {shopName} shop</h1>
    </div>
  )
}