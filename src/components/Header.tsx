import React, { useState } from 'react';
import Link from 'next/link';
import { FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';
import ToggleTheme from './ToggleTheme';
import { useRouter } from 'next/router';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/searchResults?query=${searchTerm}`);
    }
  };

  return (
    <header className="p-4 flex justify-between items-center shadow-md">
      <Link href="/">
        <h1 className="m-0 text-xl font-semibold tracking-tight">Sembarang Ajah</h1>
      </Link>
      <nav className="hidden md:flex items-center gap-4">
        <ul className="list-none flex m-0 p-0 items-center">
          <li className="ml-5"><a href="#home" className="no-underline">Home</a></li>
          <li className="ml-5"><a href="#about" className="no-underline">About</a></li>
          <li className="ml-5 bg-background-card2 hover:bg-zinc-500 transition-colors p-3 rounded-md">
            <Link href="/login" className="font-semibold tracking-tight">
              Login
            </Link>
          </li>
          <li className="ml-5"><ToggleTheme /></li>
          <li className="ml-5">
            <Link href="/cart" className="flex items-center gap-2 hover:text-indigo-600 transition-all">
              <FaShoppingCart size={24} />
              <span className="font-semibold">Cart</span>
            </Link>
          </li>
        </ul>
        {/* Search Feature */}
        <form className="flex items-center ml-5" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            className="border rounded-l-lg px-3 py-1 text-sm"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-3 py-1 rounded-r-lg hover:bg-blue-600"
          >
            Search
          </button>
        </form>
      </nav>
      <div className="md:hidden">
        <button onClick={toggleMobileMenu} className="focus:outline-none">
          {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>
      {isMobileMenuOpen && (
        <nav className="absolute top-16 left-0 w-full bg-background shadow-md md:hidden">
          <ul className="list-none flex flex-col m-0 p-4 items-center">
            <li className="mb-4"><a href="#home" className="no-underline">Home</a></li>
            <li className="mb-4"><a href="#about" className="no-underline">About</a></li>
            <li className="mb-4 bg-background-card2 hover:bg-zinc-500 transition-colors p-2 text-center rounded-md w-full">
              <Link href="/login" className="font-semibold tracking-tight w-full">
                Login
              </Link>
            </li>
            <li className="mb-4 w-full flex justify-center items-center">
              <Link href="/cart" className="flex gap-2 items-center hover:text-indigo-600 transition-all w-full justify-center">
                <FaShoppingCart size={24} />
                <span className="font-semibold">Cart</span>
              </Link>
            </li>
            <li className="mb-4 flex flex-row">
              <ToggleTheme />
            </li>
            {/* Mobile Search Feature */}
            <li className="mb-4 w-full">
              <form className="flex items-center" onSubmit={handleSearchSubmit}>
                <input
                  type="text"
                  className="border rounded-l-lg px-3 py-1 w-full text-black placeholder-grey"
                  placeholder="Search Products"
                  value={searchTerm}
                  onChange={handleSearch}
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-3 py-1 rounded-r-lg hover:bg-blue-600"
                >
                  Search
                </button>
              </form>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
