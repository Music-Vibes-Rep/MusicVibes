import React, { useState } from 'react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-100 p-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold">
          MusicVibes
        </div>

        {/* Menú hamburguesa (para móvil) */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            <div className="w-6 h-0.5 bg-gray-800 mb-1"></div>
            <div className="w-6 h-0.5 bg-gray-800 mb-1"></div>
            <div className="w-6 h-0.5 bg-gray-800"></div>
          </button>
        </div>

        {/* Enlaces del Navbar (para desktop) */}
        <div className={`md:flex space-x-4 ${isOpen ? 'block' : 'hidden'}`}>
          <a href="#home" className="hover:text-blue-500">Home</a>
          <a href="#explore" className="hover:text-blue-500">Explore</a>
          <a href="#about" className="hover:text-blue-500">About</a>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Sign In
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
