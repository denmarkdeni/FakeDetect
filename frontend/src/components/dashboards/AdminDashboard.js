import React, { useState, useEffect } from 'react';
import DashboardLayout from '../layout/DashboardLayout';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import 'animate.css';
import CircularProgress from '../layout/CircularProgress';
import API from '../../api/api';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState({
    customer_count: 0,
    seller_count: 0,
    product_count: 0,
    flag_count: 0,
    product_reports: { labels: [], counts: [] },
    flag_trends: { labels: [], counts: [] },
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const res = await API.get('admin/dashboard/');
      setDashboardData(res.data);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    }
  };

  const chartData = {
    labels: dashboardData.product_reports.labels,
    datasets: [
      {
        label: 'Total Products',
        data: dashboardData.product_reports.counts,
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgb(8, 40, 90)',
        borderWidth: 1,
      },
      {
        label: 'Total Flags',
        data: dashboardData.flag_trends.counts,
        backgroundColor: 'rgba(220, 53, 69, 0.5)',
        borderColor: 'rgb(90, 8, 8)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top', labels: { color: 'white' } },
      title: { display: true, text: 'Product Reports vs Flags (Last 6 Months)', color: 'white' },
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

  return (
    <DashboardLayout title="Admin Dashboard">
      <div className="p-4 space-y-4 animate__animated animate__fadeIn">
        <h2 className="text-lg font-semibold">Dashboard Overview</h2><br />

        {/* Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-form p-4 rounded-form shadow-md text-white">
            <h3 className="text-md font-semibold">Customers</h3>
            <p className="text-2xl">{dashboardData.customer_count}</p>
          </div>
          <div className="bg-form p-4 rounded-form shadow-md text-white">
            <h3 className="text-md font-semibold">Sellers</h3>
            <p className="text-2xl">{dashboardData.seller_count}</p>
          </div>
          <div className="bg-form p-4 rounded-form shadow-md text-white">
            <h3 className="text-md font-semibold">Products</h3>
            <p className="text-2xl">{dashboardData.product_count}</p>
          </div>
          <div className="bg-form p-4 rounded-form shadow-md text-white">
            <h3 className="text-md font-semibold">Flags</h3>
            <p className="text-2xl">{dashboardData.flag_count}</p>
          </div>
        </div><br />

        {/* Chart Section */}
        <div className="bg-form p-8 rounded-form shadow-md animate__animated animate__slideInLeft">
          <h2 className="text-white font-semibold mb-3">Product Reports vs Flags</h2>
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
    </DashboardLayout>
  );
}