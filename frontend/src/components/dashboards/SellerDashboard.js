import React, { useState, useEffect } from 'react';
import DashboardLayout from '../layout/DashboardLayout';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import 'animate.css';
import CircularProgress from '../layout/CircularProgress';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function SellerDashboard() {
  // Mock data for sales and credit score
  const [salesData, setSalesData] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Sales ($)',
        data: [1200, 1900, 3000, 2500, 4000, 3500],
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgb(8, 40, 90)',
        borderWidth: 1,
      },
    ],
  });

  const [creditScore, setCreditScore] = useState(85);
  const [isTrusted, setIsTrusted] = useState(creditScore >= 80);

  // Animation for credit score
  useEffect(() => {
    const interval = setInterval(() => {
      setCreditScore((prev) => {
        const newScore = prev >= 85 ? prev : prev + 1;
        setIsTrusted(newScore >= 80);
        return newScore;
      });
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Chart options for animation
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Monthly Sales Performance' },
    },
    animation: {
      duration: 2000,
      easing: 'easeOutBounce',
    },
  };

  return (
    <DashboardLayout title="Seller Dashboard">
      <div className="p-4 space-y-4 animate__animated animate__fadeIn">

        {/* Credit Score Section */}
        <div className="credit-score">
          
          <div className="flex flex-col space-y-2">
            <h2 className="text-lg font-semibold">Your Credit Score</h2>
            <div className="text-sm text-gray-600">
              {creditScore >= 80 
                ? '✅ You are a trusted seller! 🚀' 
                : '❌ Boost your score to become trusted.'}
            </div>
            <p className="text-gray-500 text-xs">
                {isTrusted
                  ? 'Your high score reflects reliability!'
                  : 'Fulfill orders on time to improve.'}
              </p>
          </div>

          <div style={{ marginTop: '1rem' }}>
            <CircularProgress value={creditScore} />
          </div>

        </div>

        {/* Sales Chart */}
        <div className="bg-white p-8 rounded-lg shadow-md animate__animated animate__slideInLeft">
          <h2 className="text-lg font-semibold mb-3">Your Sales Overview</h2>
          <Bar data={salesData} options={chartOptions} />
        </div>

      </div>
    </DashboardLayout>
  );
}