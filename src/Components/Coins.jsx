import React, { useEffect, useState } from 'react';

// Header Component (keeping your existing header structure)
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-gradient-to-r from-gray-900 via-gray-800 to-black shadow-lg sticky top-0 z-50 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
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
      <div className="h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-50"></div>
    </header>
  );
};

const Coins = () => {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [currency, setCurrency] = useState('usd');
  const currencySymbol = currency === 'inr' ? '₹' : '$';
  const [search, setSearch] = useState('');

  useEffect(() => {
    const getCoinsData = async () => {
      try {
        // Your existing API call - keeping it exactly as is
        const { data } = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}`).then(res => res.json());
        console.log(data);
        setCoins(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    getCoinsData();
  }, [currency]);

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      {loading ? (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-gray-700 border-t-orange-500 rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-orange-500 font-bold text-lg">₿</span>
            </div>
          </div>
          <p className="ml-4 text-gray-300 text-lg">Loading...</p>
        </div>
      ) : (
        <>
          <div className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700/50 sticky top-16 z-40">
            <div className="container mx-auto px-4 py-6">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                {/* Search Bar */}
                <div className="relative flex-1 max-w-md">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search Coin"
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-800/80 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                  />
                </div>

                {/* Currency Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrency('inr')}
                    className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                      currency === 'inr'
                        ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-lg'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    INR
                  </button>
                  <button
                    onClick={() => setCurrency('usd')}
                    className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                      currency === 'usd'
                        ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-lg'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    USD
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Coins Grid */}
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {coins
                .filter((data) => {
                  if (search === '') {
                    return data;
                  } else if (data.name.toLowerCase().includes(search.toLowerCase())) {
                    return data;
                  }
                  return null;
                })
                .map((coindata, i) => (
                  <CoinCard
                    key={i}
                    coindata={coindata}
                    id={coindata.id}
                    i={i}
                    currencySymbol={currencySymbol}
                  />
                ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const CoinCard = ({ coindata, currencySymbol, i, id }) => {
  const profit = coindata.price_change_percentage_24h > 0;
  
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:bg-gray-800/70 transition-all duration-300 hover:scale-105 hover:shadow-2xl group">
      {/* Coin Image */}
      <div className="flex justify-center mb-4">
        <div className="relative">
          <img 
            height="80px" 
            width="80px"
            src={coindata.image} 
            alt={coindata.name}
            className="rounded-full group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-400/20 to-yellow-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </div>
      
      {/* Coin Name */}
      <div className="text-center mb-4">
        <a href={`/coins/${id}`} className="text-white hover:text-orange-400 transition-colors duration-200">
          <h4 className="text-xl font-bold">{coindata.name}</h4>
        </a>
      </div>
      
      {/* Price */}
      <div className="text-center mb-4">
        <p className="text-2xl font-bold text-gray-100">
          {currencySymbol} {coindata.current_price.toFixed(0)}
        </p>
      </div>
      
      {/* 24h Change */}
      <div className="text-center">
        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
          profit 
            ? 'bg-green-500/20 text-green-400' 
            : 'bg-red-500/20 text-red-400'
        }`}>
          {profit ? (
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          ) : (
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          )}
          {profit ? "+" : ""}{coindata.price_change_percentage_24h.toFixed(2)}%
        </div>
      </div>
    </div>
  );
};

export default Coins;
