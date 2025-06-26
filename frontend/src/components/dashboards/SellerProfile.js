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
    <DashboardLayout className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="margin-lt font-bold text-center mt-10">Seller Profile Loading ...</div>
    </DashboardLayout>
  }

  return (
    <DashboardLayout title={"Seller Profile"} className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-form text-white p-8 rounded-form shadow-md max-w-lg margin-lt">
        <h2 className="text-2xl font-bold mb-6 text-center">Edit Seller Profile</h2>
        
        {success && <p className="text-green-600 mb-4 text-center">Profile updated successfully!</p>}
        {error && <p className="text-red-600 mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Company Name */}
          <div>
            <label className="block text-blue">Company Name</label>
            <input
              type="text"
              name="company_name"
              value={formData.company_name}
              onChange={handleChange}
              required
              className="text-white w-full mt-1 p-2 border rounded-md "
            />
          </div>

          {/* Company Address */}
          <div>
            <label className="block text-blue">Company Address</label>
            <textarea
              name="company_address"
              value={formData.company_address}
              onChange={handleChange}
              required
              rows="3"
              className="bg-form text-white w-full mt-1 p-2 border rounded-md "
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-blue">Phone Number</label>
            <input
              type="text"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              required
              className="text-white w-full mt-1 p-2 border rounded-md "
            />
          </div>

          {/* Website */}
          <div>
            <label className="block text-blue">Website (optional)</label>
            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="text-white w-full mt-1 p-2 border rounded-md "
            />
          </div><br />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-violet-500 hover:bg-violet-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
          >
            Save Profile
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}

export default SellerProfileForm;
