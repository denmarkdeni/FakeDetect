import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../layout/DashboardLayout';
import 'animate.css';

export default function SellerProfile() {
  const [seller, setSeller] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSellerProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log(token);
        if (!token) {
          throw new Error('No authentication token found. Please log in.');
        }

        const response = await fetch('http://127.0.0.1:8000/api/seller/profile/', {
          headers: {
            'Authorization': `token ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('Unauthorized. Please log in again.');
          }
          throw new Error('Failed to fetch profile');
        }

        const data = await response.json();
        setSeller(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        if (err.message.includes('Unauthorized') || err.message.includes('token')) {
          localStorage.clear();
          navigate('/login');
        }
      }
    };
    fetchSellerProfile();
  }, [navigate]);

  if (loading) {
    return (
      <DashboardLayout title="Seller Profile">
        <div className="p-4 animate__animated animate__fadeIn">
          <p className="text-gray-600">Loading...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout title="Seller Profile">
        <div className="p-4 animate__animated animate__fadeIn">
          <p className="text-red-600">Error: {error}</p>
        </div>
      </DashboardLayout>
    );
  }

  const trustRating = seller.trust_rating || 0;
  const isVerified = !seller.is_blacklisted && trustRating >= 80;

  return (
    <DashboardLayout title="Seller Profile">
      <div className="p-4 space-y-4 animate__animated animate__fadeIn">
        {/* Profile Card */}
        <div className="bg-white p-4 rounded-lg shadow-sm animate__animated animate__slideInUp">
          <div className="flex items-center space-x-4 mb-4">
            <div className="relative w-8 h-8">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                  className="text-gray-200"
                  strokeWidth="4"
                  stroke="currentColor"
                  fill="transparent"
                  r="45"
                  cx="50"
                  cy="50"
                />
                <circle
                  className="text-blue-500 transition-all duration-1000 ease-in-out"
                  strokeWidth="4"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="45"
                  cx="50"
                  cy="50"
                  strokeDasharray={`${trustRating * 2.83} 283`}
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-800 z-10">
                {trustRating}
              </div>
            </div>
            <div>
              <h2 className="text-lg font-semibold">{seller.company_name}</h2>
              <p className="text-sm text-gray-500">@{seller.username}</p>
            </div>
          </div>

          {/* Verification Status */}
          <div className="mb-4">
            <p className={`text-sm font-semibold ${isVerified ? 'text-green-600' : 'text-red-600'}`}>
              {isVerified ? '✅ Verified Seller' : '⚠️ Verification Pending'}
            </p>
            <p className="text-xs text-gray-500">
              {isVerified
                ? 'Your high trust rating and clean record verify your reliability!'
                : 'Improve your trust rating or resolve blacklisting to get verified.'}
            </p>
          </div>

          {/* Seller Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-700">Company Address</p>
              <p className="text-sm text-gray-500">{seller.company_address}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Phone Number</p>
              <p className="text-sm text-gray-500">{seller.phone_number}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Website</p>
              <a
                href={seller.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-500 hover:underline"
              >
                {seller.website || 'N/A'}
              </a>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Total Products</p>
              <p className="text-sm text-gray-500">{seller.total_products}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Fake Flags</p>
              <p className="text-sm text-gray-500">{seller.fake_flags}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Blacklisted</p>
              <p className="text-sm text-gray-500">{seller.is_blacklisted ? 'Yes' : 'No'}</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}