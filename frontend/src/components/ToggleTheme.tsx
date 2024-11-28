'use client';
import React, { useState, useEffect } from 'react';

// icons and css
import '@/app/styles/extras.css'
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";

const ToggleTheme: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check localStorage for the theme preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode ? 'dark' : 'light';
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('theme', newTheme); // Save theme preference

    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 bg-background-card2 rounded-md"
    >
      {isDarkMode ? <MdOutlineLightMode size={30}/> : <MdOutlineDarkMode size={30}/>}
    </button>
  );
};

export default ToggleTheme;