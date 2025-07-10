import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CoinChart = ({ currency }) => {
  const Baseurl = 'https://api.coingecko.com/api/v3';
  const [chartData, setChartData] = useState([]);
  const { id } = useParams();
  const [days, setDays] = useState(1);

  const CoinChartData = async () => {
    try {
      const { data } = await axios.get(
        `${Baseurl}/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`
      );
      setChartData(data.prices);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    CoinChartData();
  }, [currency, id, days]);

  const myData = {
    labels: chartData.map((value) => {
      const date = new Date(value[0]);
      const time = date.getHours() > 12
        ? `${date.getHours() - 12}:${String(date.getMinutes()).padStart(2, '0')} PM`
        : `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')} AM`;
      return days === 1 ? time : date.toLocaleDateString();
    }),
    datasets: [
      {
        label: `Price in last ${days === 1 ? '24H' : days === 30 ? '1 Month' : '1 Year'} (${currency.toUpperCase()})`,
        data: chartData.map((value) => value[1]),
        borderColor: 'orange',
        borderWidth: 2,
        pointRadius: 0,
        fill: false,
        tension: 0.3
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { color: '#f3f4f6' }
      }
    },
    scales: {
      x: {
        ticks: { color: '#9ca3af' },
        grid: { color: 'rgba(156, 163, 175, 0.1)' }
      },
      y: {
        ticks: { color: '#9ca3af' },
        grid: { color: 'rgba(156, 163, 175, 0.1)' }
      }
    }
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 shadow-xl">
      {/* Chart Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Price Chart</h2>
        <p className="text-gray-400">
          Price trends for the last {days === 1 ? '24 hours' : days === 30 ? '1 month' : '1 year'}
        </p>
      </div>

      {/* Chart Body */}
      {chartData.length === 0 ? (
        <div className="flex items-center justify-center min-h-96">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-gray-700 border-t-orange-500 rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-orange-500 font-bold text-lg">₿</span>
            </div>
          </div>
          <p className="ml-4 text-gray-300 text-lg">Loading...</p>
        </div>
      ) : (
        <div className="mb-8 bg-gray-900/50 rounded-xl p-4 border border-gray-700/30 h-[400px]">
          <Line data={myData} options={chartOptions} />
        </div>
      )}

      {/* Days Toggle Buttons */}
      <div className="flex flex-wrap gap-3 justify-center">
        <button
          onClick={() => setDays(1)}
          className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
            days === 1
              ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-lg scale-105'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:scale-105'
          }`}
        >
          24 Hours
        </button>
        <button
          onClick={() => setDays(30)}
          className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
            days === 30
              ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-lg scale-105'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:scale-105'
          }`}
        >
          1 Month
        </button>
        <button
          onClick={() => setDays(365)}
          className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
            days === 365
              ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-lg scale-105'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:scale-105'
          }`}
        >
          1 Year
        </button>
      </div>
    </div>
  );
};

export default CoinChart;
