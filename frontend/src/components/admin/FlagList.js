import React, { useState, useEffect } from 'react';
import DashboardLayout from '../layout/DashboardLayout';
import API from '../../api/api';

const FlagList = () => {
  const [flags, setFlags] = useState([]);

  useEffect(() => {
    fetchFlags();
  }, []);

  const fetchFlags = async () => {
    try {
      const res = await API.get('admin/flags/');
      setFlags(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAction = async (flagId, action) => {
    if (window.confirm(`Are you sure you want to ${action} this flag?`)) {
      try {
        await API.post(`admin/flags/${flagId}/`, { action });
        fetchFlags(); // Refresh list
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <DashboardLayout title="Flag Management" className="container mx-auto p-6 bg-gray">
      <br />
      <h2 className="text-2xl font-bold mb-6">Flag Management</h2>
      <table className="w-full bg-form text-white rounded-form shadow-md">
        <thead>
          <tr>
            <th className="py-4 px-4 text-left text-sm font-semibold">ID</th>
            <th className="py-4 px-4 text-left text-sm font-semibold">Username</th>
            <th className="py-4 px-4 text-left text-sm font-semibold">Product</th>
            <th className="py-4 px-4 text-left text-sm font-semibold">Reason</th>
            <th className="py-4 px-4 text-left text-sm font-semibold">Created At</th>
            <th className="py-4 px-4 text-left text-sm font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {flags.map((flag) => (
            <tr key={flag.id} className="border-t">
              <td className="py-4 px-4 text-sm text-gray-700">{flag.id}</td>
              <td className="py-4 px-4 text-sm text-gray-700">{flag.username}</td>
              <td className="py-4 px-4 text-sm text-gray-700">{flag.product_name}</td>
              <td className="py-4 px-4 text-sm text-gray-700">{flag.reason}</td>
              <td className="py-4 px-4 text-sm text-gray-700">{new Date(flag.created_at).toLocaleString()}</td>
              <td className="py-4 px-4 text-sm text-gray-700">
                <button
                  onClick={() => handleAction(flag.id, 'approve')}
                  className={flag.status ? 'mr-2 text-gray' : 'mr-2 text-green hover:text-green-700'}
                >
                 {flag.status ? 'Approved': 'Approve'}
                </button>
                <button
                  onClick={() => handleAction(flag.id, 'remove')}
                  className="text-red hover:text-red-700"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </DashboardLayout>
  );
};

export default FlagList;