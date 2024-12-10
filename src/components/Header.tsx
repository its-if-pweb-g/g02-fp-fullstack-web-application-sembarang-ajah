import React, { useState } from 'react';
import Link from 'next/link';
import { FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';
import ToggleTheme from './ToggleTheme';
// import '@/app/globals.css';

// icons and css
import { FaShoppingCart } from "react-icons/fa";
import '@/app/styles/extras.css';

const Header: React.FC = () => {
  return (
    <header className="p-4 flex justify-between items-center">
      <Link href="/" className="flex flex-row items-center gap-2">
        <FaShoppingCart size={30} />
        <h1 className="m-0 text-xl font-semibold tracking-tight">Sembarang Ajah</h1>
      </Link>
      <nav>
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
    </header>
  );
};

export default Header;