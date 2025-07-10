import React, { useState } from 'react';

// Responsive Crypto Header Component with Modern UI

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-gradient-to-r from-gray-900 via-gray-800 to-black shadow-lg sticky top-0 z-50 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 group cursor-pointer">
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-orange-500/50 transition-all duration-300 group-hover:scale-110">
                <span className="text-white font-bold text-lg">₿</span>
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-yellow-500 rounded-full blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent">
              Crypto
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a 
              href="/" 
              className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-all duration-200 hover:bg-gray-700/50 rounded-lg relative group"
            >
              HOME
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-yellow-500 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a 
              href="/exchanges" 
              className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-all duration-200 hover:bg-gray-700/50 rounded-lg relative group"
            >
              TRADE
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-yellow-500 group-hover:w-full transition-all duration-300"></span>
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden flex items-center justify-center w-10 h-10 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-200"
            aria-label="Toggle menu"
          >
            <svg
              className={`w-6 h-6 transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
          <nav className="py-4 space-y-2">
            <a 
              href="/" 
              className="block text-gray-300 hover:text-white px-4 py-3 text-sm font-medium transition-all duration-200 hover:bg-gray-700/50 rounded-lg mx-2"
              onClick={() => setIsMenuOpen(false)}
            >
              HOME
            </a>
            <a 
              href="/exchanges" 
              className="block text-gray-300 hover:text-white px-4 py-3 text-sm font-medium transition-all duration-200 hover:bg-gray-700/50 rounded-lg mx-2"
              onClick={() => setIsMenuOpen(false)}
            >
              TRADE
            </a>
          </nav>
        </div>
      </div>

      {/* Animated border bottom */}
      <div className="h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-50"></div>
    </header>
  );
};

export default Header;
