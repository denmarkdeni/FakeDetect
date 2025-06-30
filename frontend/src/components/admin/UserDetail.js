import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import API from '../../api/api';
import DashboardLayout from '../layout/DashboardLayout';

const UserDetail = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUserDetails();
  }, [userId]);

  const fetchUserDetails = async () => {
    try {
      const res = await API.get(`admin/users/${userId}/`);
      setUser(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <DashboardLayout title="User Details" className="container mx-auto p-6 bg-gray">
      <h2 className="text-2xl font-bold mb-6">User Details - {user.username}</h2>
      <div className="bg-form text-white rounded-form shadow-md p-6">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
        <p><strong>Status:</strong> {user.is_active ? 'Active' : 'Inactive'}</p>
        <p><strong>Verified:</strong> {user.is_verified ? 'Yes' : 'No'}</p>
        {user.customer_details && (
          <div className="mt-4">
            <h3 className="text-xl font-semibold">Customer Details</h3>
            <p><strong>Address:</strong> {user.customer_details.address1}, {user.customer_details.city}, {user.customer_details.state} - {user.customer_details.pincode}</p>
            <p><strong>Country:</strong> {user.customer_details.country}</p>
            <p><strong>Phone:</strong> {user.customer_details.phone}</p>
            <p><strong>Points:</strong> {user.customer_details.points}</p>
          </div>
        )}
        {user.seller_details && (
          <div className="mt-4">
            <h3 className="text-xl font-semibold">Seller Details</h3>
            <p><strong>Company:</strong> {user.seller_details.company_name}</p>
            <p><strong>Credit Score:</strong> {user.seller_details.credit_score}</p>
            <p><strong>Total Products:</strong> {user.seller_details.total_products}</p>
            <p><strong>Fake Flags:</strong> {user.seller_details.fake_flags}</p>
            <p><strong>Trust Rating:</strong> {user.seller_details.trust_rating}</p>
            <p><strong>Blacklisted:</strong> {user.seller_details.is_blacklisted ? 'Yes' : 'No'}</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default UserDetail;