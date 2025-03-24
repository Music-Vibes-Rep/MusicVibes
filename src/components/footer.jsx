
import React, { useState } from 'react';

function Footer() {
  return (
    <nav className="bg-gray-100 p-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold">
          MusicVibes
        </div>

        {/* Enlaces del Footer (para desktop) */}
        <div className="md:flex space-x-4 ">
          <a href="#pp" className="hover:text-blue-500">Politica de privacidad</a>
	        <br />
          <a href="#pc" className="hover:text-blue-500">Politica de cookies</a>
	        <br />
          <a href="#sn" className="hover:text-blue-500">Sobre nosotros</a>
        </div>
      </div>
    </nav>
  );
}

export default Footer;
