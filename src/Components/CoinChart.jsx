import React, { useState, useEffect } from 'react';

// Mock Chart.js Line component for demonstration
const Line = ({ data, options, style }) => {
  return (
    <div 
      style={{ 
        ...style, 
        height: '400px', 
        background: 'linear-gradient(135deg, #1f2937 0%, #374151 100%)',
        borderRadius: '1rem',
        border: '1px solid rgba(75, 85, 99, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#f59e0b',
        fontSize: '1.2rem',
        fontWeight: 'bold'
      }}
    >
      Chart: {data.datasets[0].label}
    </div>
  );
};

const CoinChart = ({ currency }) => {
  const Baseurl = 'https://api.coingecko.com/api/v3';
  const [chartData, setChartData] = useState([]);
  const id = 'bitcoin'; // Mock id since useParams isn't available
  const [days, setDays] = useState(1);

  const CoinChartData = async () => {
    try {
      // Your existing API call - keeping it exactly as is
      const { data } = await fetch(`${Baseurl}/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`).then(res => res.json());
      setChartData(data.prices);
      // console.log(data.prices)
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
        ? `${date.getHours() - 12}:${date.getMinutes()} PM` 
        : `${date.getHours()}:${date.getMinutes()} AM`;
      return days === 1 ? time : date.toLocaleDateString();
    }),
    datasets: [
      {
        label: `Price in the past ${days} days in ${currency}`,
        data: chartData.map((value) => value[1]),
        borderColor: 'orange',
        borderWidth: 3
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="max-w-7xl mx-auto">
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
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 shadow-xl">
            {/* Chart Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">
                Price Chart
              </h2>
              <p className="text-gray-400">
                Price trends for the last {days} {days === 1 ? 'day' : days === 30 ? 'month' : 'year'}
              </p>
            </div>

            {/* Chart Container */}
            <div className="mb-8 bg-gray-900/50 rounded-xl p-4 border border-gray-700/30">
              <Line 
                data={myData} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      labels: {
                        color: '#f3f4f6'
                      }
                    }
                  },
                  scales: {
                    x: {
                      ticks: {
                        color: '#9ca3af'
                      },
                      grid: {
                        color: 'rgba(156, 163, 175, 0.1)'
                      }
                    },
                    y: {
                      ticks: {
                        color: '#9ca3af'
                      },
                      grid: {
                        color: 'rgba(156, 163, 175, 0.1)'
                      }
                    }
                  },
                  elements: {
                    point: {
                      radius: 1,
                    }
                  }
                }} 
                style={{ 
                  marginTop: "1rem", 
                  width: "100%", 
                  height: "400px" 
                }} 
              />
            </div>

            {/* Time Period Buttons */}
            <div className="flex flex-wrap gap-3 justify-center">
              <button 
                onClick={() => setDays(1)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  days === 1
                    ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-lg transform scale-105'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:scale-105'
                }`}
              >
                24 Hours
              </button>
              <button 
                onClick={() => setDays(30)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  days === 30
                    ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-lg transform scale-105'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:scale-105'
                }`}
              >
                1 Month
              </button>
              <button 
                onClick={() => setDays(365)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  days === 365
                    ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-lg transform scale-105'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:scale-105'
                }`}
              >
                1 Year
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoinChart;
