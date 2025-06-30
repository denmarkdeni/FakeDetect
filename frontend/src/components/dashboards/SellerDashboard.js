import React, { useState, useEffect } from 'react';
import DashboardLayout from '../layout/DashboardLayout';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import 'animate.css';
import CircularProgress from '../layout/CircularProgress';
import API from '../../api/api';
import axios from 'axios';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function SellerDashboard() {
  // Mock data for sales and credit score
  const [salesData, setSalesData] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Sales ($)',
        data: [0, 0, 0, 0, 0, 0],
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgb(8, 40, 90)',
        borderWidth: 1,
      },
    ],
  });

  // Chart options for animation
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top', labels: { color: 'white' } },
      title: { display: true, text: 'Monthly Sales Performance', color: 'white' },
    },
    scales: {
      x: { ticks: { color: 'white' } },
      y: { ticks: { color: 'white' } },
    },
    animation: {
      duration: 2000,
      easing: 'easeOutBounce',
    },
  };

  // Chart options for animation
  // const chartOptions = {
  //   responsive: true,
  //   plugins: {
  //     legend: { position: 'top' },
  //     title: { display: true, text: 'Monthly Sales Performance' },
  //   },
  //   animation: {
  //     duration: 2000,
  //     easing: 'easeOutBounce',
  //   }, 
  // };

  const [creditScore, setCreditScore] = useState(0);
  const [isTrusted, setIsTrusted] = useState(creditScore >= 80);

  // Animation for credit score
  useEffect(() => {
    const token = localStorage.getItem('token');

    axios.get('http://127.0.0.1:8000/api/seller/profile/',{
      headers:{
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json',
      }
    })
    .then(response => { 
      console.log(response.data);
      
      setCreditScore(response.data.trust_rating || 0);
      setIsTrusted(response.data.trust_rating >= 80);
      setSalesData({
        labels: response.data.monthly_sales.labels,
        datasets: [
          {
            label: 'Sales (₹)',
            data: response.data.monthly_sales.sales,
            backgroundColor: 'rgba(59, 130, 246, 0.5)',
            borderColor: 'rgb(8, 40, 90)',
            borderWidth: 1,
          },
        ],
      });
    })
    .catch(error => {
      console.error('Error In Fake Detect:' , error);
    })
    
  }, []);


  return (
    <DashboardLayout title="Seller Dashboard">
      <div className="p-4 space-y-4 animate__animated animate__fadeIn">

        <h2 className="text-lg font-semibold">Your Credit Score</h2><br />

        {/* Credit Score Section */}
        <div className="credit-score flex-col-reverse">
          
          <div className="flex flex-col space-y-2 justify-center">
            <div className="text-sm text-gray-600">
              {creditScore >= 80 
                ? '✅ You are a trusted seller! 🚀' 
                : '❌ Boost your score to become trusted.'}
            </div>
            <div>
              <CircularProgress value={creditScore} />
            </div>
            <p className="text-gray-500 text-xs">
                {isTrusted
                  ? '😎 Your high score reflects reliability!'
                  : '😎 Fulfill orders with honesty to improve.'}
            </p>
          </div>


        </div><br />

        {/* Sales Chart */}
        <div className="bg-form p-8 rounded-form shadow-md animate__animated animate__slideInLeft">
          <h2 className="text-white font-semibold mb-3">Your Sales Overview</h2>
          <Bar data={salesData} options={chartOptions} />
        </div>

      </div>
    </DashboardLayout>
  );
}