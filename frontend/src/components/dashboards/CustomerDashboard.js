import React, { useState, useEffect } from 'react';
import DashboardLayout from '../layout/DashboardLayout';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import 'animate.css';
import API from '../../api/api';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function CustomerDashboard() {
  const [dashboardData, setDashboardData] = useState({
    report_count: 0,
    flag_count: 0,
    bought_products_count: 0,
    credit_points: 0,
    product_reports: { labels: [], counts: [] },
    flag_trends: { labels: [], counts: [] },
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const res = await API.get('customer/dashboard/');
      setDashboardData(res.data);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    }
  };

  const chartData = {
    labels: dashboardData.product_reports.labels,
    datasets: [
      {
        label: 'Product Reports',
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
    <DashboardLayout title="Customer Dashboard">
      <div className="p-4 space-y-4 animate__animated animate__fadeIn">
        <h2 className="text-lg font-semibold">Dashboard Overview</h2><br />

        {/* Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-form p-4 rounded-form shadow-md text-white">
            <h3 className="text-md font-semibold">Reports</h3>
            <p className="text-2xl">{dashboardData.report_count}</p>
          </div>
          <div className="bg-form p-4 rounded-form shadow-md text-white">
            <h3 className="text-md font-semibold">Flags</h3>
            <p className="text-2xl">{dashboardData.flag_count}</p>
          </div>
          <div className="bg-form p-4 rounded-form shadow-md text-white">
            <h3 className="text-md font-semibold">Bought Products</h3>
            <p className="text-2xl">{dashboardData.bought_products_count}</p>
          </div>
          <div className="bg-form p-4 rounded-form shadow-md text-white">
            <h3 className="text-md font-semibold">Credit Points</h3>
            <p className="text-2xl">{dashboardData.credit_points}</p>
          </div>
        </div><br />

        {/* Chart Section */}
        <div className="bg-form p-8 rounded-form shadow-md animate__animated animate__slideInLeft">
          <h2 className="text-white font-semibold mb-3">Product Reports vs Flags</h2>
          <Bar data={chartData} options={chartOptions} />
        </div><br />

        {/* Tips Section */}
        <div className=" bg-form p-8 rounded-form shadow-md text-white animate__animated animate__slideInRight">
          <h3 className="text-md font-semibold">📰 Tips to Avoid Fakes</h3>
          <ul className="mt-4 ml-4">
            <li className="text-sm mt-2">Always check trust scores before buying.</li>
            <li className="text-sm mt-2">Avoid products without verified sources.</li>
            <li className="text-sm mt-2">Report suspicious listings immediately.</li>
            <li className="text-sm mt-2">Verify seller ratings and reviews.</li>
            <li className="text-sm mt-2">Look for official brand logos or holograms.</li>
            <li className="text-sm mt-2">Check product packaging for inconsistencies.</li>
            <li className="text-sm mt-2">Purchase only from trusted, authenticated platforms.</li>
            <li className="text-sm mt-2">Avoid deals that seem too good to be true.</li>
            <li className="text-sm mt-2">Cross-check product details with the official website.</li>
            <li className="text-sm mt-2">Contact customer support for verification if unsure.</li>
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
}