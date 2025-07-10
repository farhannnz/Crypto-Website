import React from 'react';
import { useState, useEffect } from 'react';

// Mock Header Component
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

// Mock CoinChart Component
const CoinChart = ({ currency, id }) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 shadow-xl">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">
          Price Chart
        </h2>
        <p className="text-gray-400">
          Price trends for {currency.toUpperCase()}
        </p>
      </div>
      <div className="h-96 bg-gray-900/50 rounded-xl p-4 border border-gray-700/30 flex items-center justify-center">
        <div className="text-orange-500 text-lg font-bold">
          Chart Component for {id}
        </div>
      </div>
    </div>
  );
};

const Details = () => {
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const id = 'bitcoin'; // Mock id since useParams isn't available
  const [currency, setCurrency] = useState('inr');
  const currencySymbol = currency === 'inr' ? '₹' : '$';
  const profit = coin?.market_data?.price_change_percentage_24h > 0;

  const Baseurl = 'https://api.coingecko.com/api/v3';

  useEffect(() => {
    const getCoin = async () => {
      try {
        // Your existing API call - keeping it exactly as is
        const { data } = await fetch(`${Baseurl}/coins/${id}`).then(res => res.json());
        setCoin(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    getCoin();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900">
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-gray-700 border-t-orange-500 rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-orange-500 font-bold text-lg">₿</span>
            </div>
          </div>
          <p className="ml-4 text-gray-300 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Coin Info Section */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 shadow-xl">
            {/* Currency Toggle */}
            <div className="flex gap-3 justify-center mb-6">
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

            {/* Last Updated */}
            <div className="text-center mb-6">
              <p className="text-gray-400 text-sm">
                Last Updated: {coin?.last_updated ? new Date(coin.last_updated).toLocaleString() : 'N/A'}
              </p>
            </div>

            {/* Coin Image */}
            <div className="flex justify-center mb-6">
              <div className="relative group">
                <img 
                  height="150px" 
                  width="150px"
                  src={coin?.image?.large} 
                  alt={coin?.name}
                  className="rounded-full shadow-2xl group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-400/20 to-yellow-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>

            {/* Coin Name */}
            <div className="text-center mb-6">
              <h1 className="text-4xl font-bold text-white">
                {coin?.name}
              </h1>
              <p className="text-gray-400 text-lg mt-2">
                {coin?.symbol?.toUpperCase()}
              </p>
            </div>

            {/* Current Price */}
            <div className="text-center mb-6">
              <div className="text-5xl font-bold text-white mb-2">
                {currencySymbol} {coin?.market_data?.current_price[currency]?.toLocaleString()}
              </div>
            </div>

            {/* Price Change */}
            <div className="flex items-center justify-center mb-6">
              <div className={`flex items-center px-4 py-2 rounded-full ${
                profit 
                  ? 'bg-green-500/20 text-green-400' 
                  : 'bg-red-500/20 text-red-400'
              }`}>
                {profit ? (
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )}
                <span className="font-bold text-lg">
                  {coin?.market_data?.price_change_percentage_24h?.toFixed(2)}%
                </span>
              </div>
            </div>

            {/* Market Rank */}
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center bg-orange-500/20 text-orange-400 px-4 py-2 rounded-full">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <span className="font-bold text-lg">
                  Rank #{coin?.market_cap_rank}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700/30">
              <h3 className="text-xl font-bold text-white mb-4">About {coin?.name}</h3>
              <p className="text-gray-300 leading-relaxed">
                {coin?.description?.en.split('.')[0] || 'No description available.'}
              </p>
            </div>
          </div>

          {/* Chart Section */}
          <div>
            <CoinChart currency={currency} id={id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
