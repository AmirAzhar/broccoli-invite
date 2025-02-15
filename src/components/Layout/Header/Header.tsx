import React from "react";

// Lib
import { FiSun, FiMoon } from "react-icons/fi";

// Hooks
import useDarkMode from "../../../hooks/useDarkMode";

const Header: React.FC = () => {
  const [darkMode, setDarkMode] = useDarkMode(false);

  return (
    <header className="fixed top-0 z-10 w-full bg-gray-100 shadow-md dark:bg-gray-900">
      <div className="flex items-center justify-between px-4 py-4 mx-auto max-w-7xl">
        <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">Broccoli & Co.</h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="cursor-pointer focus:outline-none"
          aria-label="Toggle Dark Mode"
        >
          {darkMode ? <FiMoon size={24} /> : <FiSun size={24} />}
        </button>
      </div>
    </header>
  );
};

export default Header;
