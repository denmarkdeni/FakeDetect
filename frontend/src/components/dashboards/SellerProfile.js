import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DashboardLayout from '../layout/DashboardLayout';
import '../../styles/tail.css';

function SellerProfileForm() {
  const [formData, setFormData] = useState({
    company_name: '',
    company_address: '',
    phone_number: '',
    website: '',
  });

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // ✨ On page load, fetch seller data
  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('Fetched token:', token);
  
    if (!token) {
      throw new Error('No authentication token found. Please log in.');
    }
  
    fetch('http://127.0.0.1:8000/api/seller/profile/', {
      method: 'GET',
      headers: {
        'Authorization': `Token ${token}`, // Small correction: Capital "T" in Token
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch seller profile');
        }
        return response.json(); // <<< Convert response to JSON
      })
      .then(data => {
        console.log('Fetched data:', data);
        setFormData({
          company_name: data.company_name || '',
          company_address: data.company_address || '',
          phone_number: data.phone_number || '',
          website: data.website || '',
        });
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching seller data:', err);
        setLoading(false);
      });
  }, []);  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ✨ Submit updated seller profile
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting:', formData);
  
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No authentication token found. Please log in.');
      setError('Authentication error. Please log in again.');
      return;
    }
  
    axios.put('http://127.0.0.1:8000/api/seller/profile/', formData, {
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json',
      }
    })
      .then(response => {
        console.log('Update successful:', response.data);
        setSuccess(true);
        setError('');
      })
      .catch(err => {
        console.error('Update failed:', err);
        setError('Failed to update profile. Please try again.');
        setSuccess(false);
      });
  };  

  if (loading) {
    return <div className="text-center mt-10">Loading seller profile...</div>;
  }

  return (
    <DashboardLayout className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md margin-lt">
        <h2 className="text-2xl font-bold mb-6 text-center">Edit Seller Profile</h2>
        
        {success && <p className="text-green-600 mb-4 text-center">Profile updated successfully!</p>}
        {error && <p className="text-red-600 mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Company Name */}
          <div>
            <label className="block text-gray-700">Company Name</label>
            <input
              type="text"
              name="company_name"
              value={formData.company_name}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Company Address */}
          <div>
            <label className="block text-gray-700">Company Address</label>
            <textarea
              name="company_address"
              value={formData.company_address}
              onChange={handleChange}
              required
              rows="3"
              className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-gray-700">Phone Number</label>
            <input
              type="text"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Website */}
          <div>
            <label className="block text-gray-700">Website (optional)</label>
            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div><br />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
          >
            Save Profile
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}

export default SellerProfileForm;
