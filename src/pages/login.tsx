import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Handle successful login
        console.log('Login successful', data);
        router.push('/'); // Redirect to home page or another page
      } else {
        // Handle login error
        setError(data.error);
      }
    } catch (error) {
      // Log detailed error information
      console.error('Fetch error:', error);
      setError('An unexpected error occurred');
    }
  };

  return (
    <section className="font-sans text-gray-900 antialiased">
      <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
        <div>
          {/*Icon SVG*/}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-24 w-24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 6H2V2h4M18 6h4V2h-4M16 18h-8V9h8M3 6l2 12h14l2-12H3z" />
          </svg>
        </div>

        <div className="w-full sm:max-w-md mt-6 px-8 py-6 bg-white shadow-md overflow-hidden sm:rounded-lg">
          <form onSubmit={handleSubmit}>
            <div>
              <label className="block font-medium text-sm text-gray-700 mb-1" htmlFor="email">
                Email
              </label>
              <input
                className="px-3 py-2 border border-gray-300 focus:border-indigo-500 focus:outline-indigo-500 rounded-md shadow-sm block w-full"
                id="email"
                type="email"
                name="email"
                required
                autoFocus
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mt-4">
              <label className="block font-medium text-sm text-gray-700 mb-1" htmlFor="password">
                Password
              </label>
              <input
                className="px-3 py-2 border border-gray-300 focus:border-indigo-500 focus:outline-indigo-500 rounded-md shadow-sm block w-full"
                id="password"
                type="password"
                name="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && <p className="text-red-500 mt-2">{error}</p>}

            <div className="mt-4">
              <button
                type="submit"
                className="w-full px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                Login
              </button>
            </div>
          </form>

          <div className="mt-4 text-center">
            <Link href="/register">
              <p className="text-indigo-500 hover:text-indigo-700">Dont have an account? Register</p>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}