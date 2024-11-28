import Link from 'next/link';

export default function Login() {
  return (
    <section>
      <h1>Login Page</h1>
      <Link href="/register">Register</Link>
    </section>
  )
}