import React, { useEffect, useState } from 'react';
import Header from './Header';
import axios from 'axios';

const Exchange = () => {
  const [loading, setLoading] = useState(true);
  const [exchanges, setExchanges] = useState([]);

  useEffect(() => {
    const getExchange = async () => {
      const { data } = await axios.get('https://api.coingecko.com/api/v3/exchanges');
      console.log(data);
      setExchanges(data);
      setLoading(false);
    };

    getExchange();
  }, []);

  return (
    <>
      <Header />
      {loading ? (
        <>
        <p>Loading...</p>
        </>
      ) : (
      <div className='excs'>
        {
          exchanges.map((item, i) => (
            <div className='exc-card' key={i}>
              <div className='image'>
                 <img height={"80px"} src={item.image} alt="" />
              </div>
              <div className='name'>
                <h4>{item.name}</h4>
              </div>
              <div className="price">
                <b>Price : </b>{item.trade_volume_24h_btc.toFixed(0)}
              </div>
              <div className="rank">
                <b>Rank :</b> {item.trust_score_rank} <a href={item.url}>Visit</a>
              </div>
            </div>
          ))
        }
      </div>
      )
}
    </>
  );
};

export default Exchange;

