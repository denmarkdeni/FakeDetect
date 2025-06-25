import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DashboardLayout from '../layout/DashboardLayout';
import '../../styles/tail.css';

function CustomerProfile() {
  const [formData, setFormData] = useState({
    address1: '',
    address2: '',
    city: '',
    state: '',
    pincode: '',
    country: '',
    phone: '',
  });

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // 🚀 On Component Mount - Fetch Customer Data
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No authentication token found. Please log in.');
      setError('Authentication error. Please log in again.');
      return;
    }

    axios.get('http://127.0.0.1:8000/api/customer/profile/', {
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json',
      }
    })
    .then(response => {
      const data = response.data;
      setFormData({
        address1: data.address1 || '',
        address2: data.address2 || '',
        city: data.city || '',
        state: data.state || '',
        pincode: data.pincode || '',
        country: data.country || '',
        phone: data.phone || '',
      });
      setLoading(false);
    })
    .catch(err => {
      console.error('Error fetching customer profile:', err);
      setError('Failed to load customer profile.');
      setLoading(false);
    });
  }, []);

  // ✍️ Handle Form Input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 📤 Handle Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Authentication error. Please log in again.');
      return;
    }

    axios.put('http://127.0.0.1:8000/api/customer/profile/', formData, {
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json',
      }
    })
    .then(response => {
      console.log('Profile updated:', response.data);
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
    return (
    <DashboardLayout className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="margin-lt font-bold text-center mt-10">Loading customer profile...</div>
    </DashboardLayout>
    );
  }

  return (
    <DashboardLayout className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-form p-8 rounded-form shadow-md margin-lt">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Edit Customer Profile</h2>

        {success && <p className="text-green-600 mb-4 text-center">Profile updated successfully!</p>}
        {error && <p className="text-red-600 mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            {/* <label className="block text-gray-700">Address Line 1</label> */}
            <input type="text" name="address1" value={formData.address1} onChange={handleChange} placeholder='Address Line 1' required className="text-white w-full mt-1 p-2 border rounded-md" />
          </div><br />

          <div>
            {/* <label className="block text-gray-700">Address Line 2 (optional)</label> */}
            <input type="text" name="address2" value={formData.address2} onChange={handleChange} placeholder='Address Line 2' className="text-white w-full mt-1 p-2 border rounded-md" />
          </div><br />

          <div>
            {/* <label className="block text-gray-700">City</label> */}
            <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder='city' required className="text-white w-full mt-1 p-2 border rounded-md" />
          </div><br />

          <div>
            {/* <label className="block text-gray-700">State</label> */}
            <input type="text" name="state" value={formData.state} onChange={handleChange} placeholder='state' required className="text-white w-full mt-1 p-2 border rounded-md" />
          </div><br />

          <div>
            {/* <label className="block text-gray-700">Pincode</label> */}
            <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} placeholder='pincode' required className="text-white w-full mt-1 p-2 border rounded-md" />
          </div><br />

          <div>
            {/* <label className="block text-gray-700">Country</label> */}
            <input type="text" name="country" value={formData.country} onChange={handleChange} placeholder='country' required className="text-white w-full mt-1 p-2 border rounded-md" />
          </div><br />

          <div>
            {/* <label className="block text-gray-700">Phone</label> */}
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder='phone' required className="text-white w-full mt-1 p-2 border rounded-md" />
          </div><br />

          <button type="submit" className="w-full bg-violet-500 hover:bg-violet-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300">
            Save Profile
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}

export default CustomerProfile;
