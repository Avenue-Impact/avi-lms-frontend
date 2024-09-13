import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const fetchChartData = async (timeframe) => {
  const data = {
    'Today': [200, 400, 600, 800, 1000, 1200, 1400, 1600, 1800, 2000, 2200, 2400],
    'Yesterday': [300, 500, 700, 900, 1100, 1300, 1500, 1700, 1900, 2100, 2300, 2500],
    'Last Week': [500, 800, 1000, 1200, 1500, 1800, 2100, 2400, 2700, 3000, 3300, 3600],
    'This Month': [400, 600, 900, 1200, 1500, 1800, 2100, 2500, 2800, 3100, 3400, 3700],
    'Last Month': [600, 900, 1200, 1600, 1900, 2200, 2500, 2800, 3100, 3500, 3800, 4000],
    'This Year': [700, 1100, 1300, 1700, 2000, 2400, 2700, 3100, 3400, 3800, 4100, 4400],
    'Last Year': [800, 1200, 1500, 1900, 2300, 2600, 2900, 3200, 3500, 3900, 4200, 4500],
  };

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data[timeframe] || data['Today']);
    }, 1000);
  });
};

const LineCharts = () => {
  const [timeframe, setTimeframe] = useState('Today');
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchChartData(timeframe);
      setChartData(data);
    };

    loadData();
  }, [timeframe]);

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: `Amount (${timeframe})`,
        data: chartData,
        borderColor: '#CC1747',
        backgroundColor: 'rgba(204, 23, 71, 0.2)',
        fill: true,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'linear',
        min: 0,
        max: 1000,
        ticks: {
          stepSize: 200,
        },
      },
      y: {
        type: 'category',
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      },
    },
  };

  const handleTimeframeChange = (newTimeframe) => {
    setTimeframe(newTimeframe);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Amount (${timeframe})</h2>
        <div className="flex space-x-2">
          {['Today', 'Yesterday', 'Last Week', 'This Month', 'Last Month', 'This Year', 'Last Year'].map((frame) => (
            <button
              key={frame}
              onClick={() => handleTimeframeChange(frame)}
              className={`px-3 py-1 rounded-lg ${timeframe === frame ? 'bg-[#CC1747] text-white' : 'bg-gray-200 text-gray-700'} `}
            >
              {frame}
            </button>
          ))}
          <input type="date" className="px-3 py-1 rounded-lg bg-gray-200 text-gray-700" />
        </div>
      </div>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineCharts;
