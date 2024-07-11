import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './Header';
import { Link } from 'react-router-dom';

const Coins = () => {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [currency, setCurrency] = useState('usd');
  const currencySymbol = currency === 'inr' ? '₹' : '$';
  const [search, setSearch] = useState('');

  useEffect(() => {
    const getCoinsData = async () => {
      try {
        const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}`);
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
    <div>
      <Header />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="search">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search Coin"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="btn">
            <button  onClick={() => setCurrency('inr')}>INR</button>
            <button onClick={() => setCurrency('usd')}>USD</button>
          </div>
          </div>
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
              <div className="excs">
              <CoinCard
                key={i}
                coindata={coindata}
                id={coindata.id}
                i={i}
                currencySymbol={currencySymbol}
              />
              </div>
            ))}
        </>
      )}
    </div>
  );
};

const CoinCard = ({ coindata, currencySymbol, i, id }) => {
  const profit = coindata.price_change_percentage_24h > 0;
  return (
    
      <div className="coin-card">
        <div className="image">
          <img height={"80px"} src={coindata.image} alt="" />
        </div>
        <div className="name">
        <Link to={`/coins/${id}`}> <h4> {coindata.name}</h4> </Link>
        </div>
        <div className="price">
          {currencySymbol} {coindata.current_price.toFixed(0)}
        </div>
        <div style={profit ? { color: "green" } : { color: "red" }} className="rank">
          {profit ? "+" + coindata.price_change_percentage_24h.toFixed(2) : coindata.price_change_percentage_24h.toFixed(2)}
        </div>

      </div>
    
  );
};

export default Coins;
