import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Register() {
  const router = useRouter();
  const [role, setRole] = useState('penjual');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRole(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const data = { email, name, password, roles: role };

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Registration successful! You can now log in.');
        router.push('/login'); // Redirect to login page
      } else {
        setError(result.error || 'An error occurred');
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Failed to submit the form');
      }
    }
  };

  return (
    <section className="font-sans text-gray-900 antialiased">
      <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
        <div>
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
                autoComplete="username"
              />
            </div>

            <div className="mt-4">
              <label className="block font-medium text-sm text-gray-700 mb-1" htmlFor="name">
                Name
              </label>
              <input
                className="px-3 py-2 border border-gray-300 focus:border-indigo-500 focus:outline-indigo-500 rounded-md shadow-sm block w-full"
                id="name"
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="name"
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>

            <div className="mt-4">
              <label className="block font-medium text-sm text-gray-700 mb-1" htmlFor="confirm_password">
                Confirm Password
              </label>
              <input
                className="px-3 py-2 border border-gray-300 focus:border-indigo-500 focus:outline-indigo-500 rounded-md shadow-sm block w-full"
                id="confirm_password"
                type="password"
                name="confirm_password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                autoComplete="confirm-password"
              />
            </div>

            <div className="mt-4">
              <label className="block font-medium text-sm text-gray-700 mb-1" htmlFor="role">
                Role
              </label>
              <select
                id="role"
                name="role"
                value={role}
                onChange={handleRoleChange}
                className="px-3 py-2 border border-gray-300 focus:border-indigo-500 focus:outline-indigo-500 rounded-md shadow-sm block w-full"
              >
                <option value="penjual">Penjual</option>
                <option value="pembeli">Pembeli</option>
              </select>
            </div>

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

            <div className="flex items-center justify-end mt-4">
              <button
                type="submit"
                className="inline-flex items-center px-4 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 ml-4 bg-indigo-600 hover:bg-indigo-500 py-3"
              >
                Register
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <span className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link href="/login" className="text-indigo-600 hover:text-indigo-500">
                Log in
              </Link>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
