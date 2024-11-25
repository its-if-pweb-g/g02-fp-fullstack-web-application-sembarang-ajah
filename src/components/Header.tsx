import React from 'react';
import ToggleTheme from './ToggleTheme';

const Header: React.FC = () => {
  return (
    <header className=" p-4 flex justify-between items-center">
      <h1 className="m-0">E Commerce</h1>
      <nav>
        <ul className="list-none flex m-0 p-0">
          <li className="ml-5"><a href="#home" className=" no-underline">Home</a></li>
          <li className="ml-5"><a href="#about" className="no-underline">About</a></li>
          <li className="ml-5"><a href="#contact" className="no-underline">Contact</a></li>
          <li className="ml-5"><ToggleTheme /></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;