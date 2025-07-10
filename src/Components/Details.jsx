import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { BiSolidUpArrow, BiSolidDownArrow } from 'react-icons/bi';
import { IoPulseOutline } from 'react-icons/io5';
import Header from './Header';
import CoinChart from './CoinChart'; // You must create this or mock it

const Details = () => {
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [currency, setCurrency] = useState('inr');
  const currencySymbol = currency === 'inr' ? '₹' : '$';
  const profit = coin?.market_data?.price_change_percentage_24h > 0;

  const Baseurl = 'https://api.coingecko.com/api/v3';

  useEffect(() => {
    const getCoin = async () => {
      try {
        const { data } = await axios.get(`${Baseurl}/coins/${id}`);
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
      <div className="min-h-screen bg-gray-900 flex justify-center items-center">
        <Header />
        <p className="text-white text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <div className="container mx-auto px-4 py-10">
        <div className="grid xl:grid-cols-2 gap-8">
          {/* Coin Info Card */}
          <div className="bg-gray-800/50 p-6 rounded-2xl shadow-xl">
            <div className="flex justify-center gap-4 mb-6">
              <button
                onClick={() => setCurrency('inr')}
                className={`px-6 py-2 rounded-xl font-semibold ${
                  currency === 'inr'
                    ? 'bg-orange-500 text-white shadow-lg'
                    : 'bg-gray-700 text-gray-300'
                }`}
              >
                INR
              </button>
              <button
                onClick={() => setCurrency('usd')}
                className={`px-6 py-2 rounded-xl font-semibold ${
                  currency === 'usd'
                    ? 'bg-orange-500 text-white shadow-lg'
                    : 'bg-gray-700 text-gray-300'
                }`}
              >
                USD
              </button>
            </div>

            <p className="text-gray-400 text-center text-sm mb-4">
              Last Updated: {new Date(coin?.last_updated).toLocaleString()}
            </p>

            <div className="flex justify-center mb-6">
              <img
                src={coin?.image?.large}
                alt={coin?.name}
                className="w-32 h-32 rounded-full shadow-lg"
              />
            </div>

            <h1 className="text-center text-4xl font-bold">{coin?.name}</h1>
            <p className="text-center text-gray-400 text-lg uppercase mb-4">{coin?.symbol}</p>

            <p className="text-center text-3xl font-bold mb-4">
              {currencySymbol} {coin?.market_data?.current_price[currency]?.toLocaleString()}
            </p>

            <div className="flex justify-center mb-4">
              <span
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold ${
                  profit ? 'text-green-400 bg-green-500/10' : 'text-red-400 bg-red-500/10'
                }`}
              >
                {profit ? <BiSolidUpArrow /> : <BiSolidDownArrow />}
                {coin?.market_data?.price_change_percentage_24h.toFixed(2)}%
              </span>
            </div>

            <div className="flex justify-center items-center gap-2 mb-4 text-orange-400 font-semibold">
              <IoPulseOutline />
              Rank #{coin?.market_cap_rank}
            </div>

            <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
              <h3 className="text-xl font-bold mb-2">About {coin?.name}</h3>
              <p className="text-gray-300 text-sm">
                {coin?.description?.en?.split('.')[0] || 'No description available.'}
              </p>
            </div>
          </div>

          {/* Coin Chart */}
          <CoinChart currency={currency} id={id} />
        </div>
      </div>
    </div>
  );
};

export default Details;
