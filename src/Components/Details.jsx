import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { BiSolidUpArrow, BiSolidDownArrow } from 'react-icons/bi';
import { IoPulseOutline } from 'react-icons/io5';
import Header from './Header';

import CoinChart from './CoinChart'; // Assuming you have a CoinChart component

const Details = () => {
  const [coin, setCoin] = useState(null); // Initialize coin as null
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
    return <p>Loading...</p> ;
  }

  return (
    <>
    <Header/>
    <div className='coin-detail'>
      <div className='coin-info'>
        <div className='btn'>
          <button onClick={() => setCurrency('inr')}>INR</button>
          <button onClick={() => setCurrency('usd')}>USD</button>
        </div>
        <div className='time'>{coin?.last_updated}</div>
        <div className='coin-image'>
          <img height={"150px"} src={coin?.image?.large} alt={coin?.name} />
        </div>
        <div className='coin-name'>{coin?.name}</div>
        <div className='coin-price'>
          {currencySymbol} {coin?.market_data?.current_price[currency]}
        </div>
        <div className='coin-profit'>
          {profit ? <BiSolidUpArrow color='green' /> : <BiSolidDownArrow color='red' />}
          {coin?.market_data?.price_change_percentage_24h} %
        </div>
        <div className='market-rank'>
          <IoPulseOutline color='orange' />
          #{coin?.market_cap_rank}
        </div>
        <div className='coin-desc'>
          <p>{coin?.description?.en.split('.')[0]}</p>
        </div>
      </div>
      <CoinChart currency={currency} id={id} />
    </div>
    </>
  );
};

export default Details;
