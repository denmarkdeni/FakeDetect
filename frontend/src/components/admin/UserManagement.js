import React, { useState, useEffect } from 'react';
import DashboardLayout from '../layout/DashboardLayout';
import API from '../../api/api';

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await API.get('admin/users/');
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const toggleUserStatus = async (userId) => {
    try {
      await API.post(`admin/users/${userId}/toggle/`);
      fetchUsers(); // Refresh list
    } catch (err) {
      console.error(err);
    }
  };

  const viewDetails = (userId) => {
    window.location.href = `/admin/user/${userId}`; // Navigate to detail page
  };

  return (
    <DashboardLayout title="User Management" className="container mx-auto p-6 bg-gray">
      <br />
      <h2 className="text-2xl font-bold mb-6">User Management</h2>
      <table className="w-full bg-form text-white rounded-form shadow-md">
        <thead>
          <tr>
            <th className="py-4 px-4 text-left text-sm font-semibold">Username</th>
            <th className="py-4 px-4 text-left text-sm font-semibold">Email</th>
            <th className="py-4 px-4 text-left text-sm font-semibold">Role</th>
            <th className="py-4 px-4 text-left text-sm font-semibold">Verified</th>
            <th className="py-4 px-4 text-left text-sm font-semibold">Status</th>
            <th className="py-4 px-4 text-left text-sm font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-t">
              <td className="py-4 px-4 text-sm text-gray-700">{user.username}</td>
              <td className="py-4 px-4 text-sm text-gray-700">{user.email}</td>
              <td className="py-4 px-4 text-sm text-gray-700">{user.role}</td>
              <td className="py-4 px-4 text-sm text-gray-700">
                {user.is_verified ? (
                  <span className="text-green-500">(Verified)</span>
                ) : (
                  <span className="text-red-500">(Not Verified)</span>
                )}
              </td>
              <td className="py-4 px-4 text-sm text-gray-700">
                {user.is_active ? (
                  <span className="text-green-500">Active</span>
                ) : (
                  <span className="text-red-500">Inactive</span>
                )}
              </td>
              <td className="py-4 px-4 text-sm text-gray-700">
                <button
                  onClick={() => toggleUserStatus(user.id)}
                  className="mr-2 text-blue-500 hover:text-blue-700"
                >
                  {user.is_active ? 'Deactivate' : 'Activate'}
                </button>
                <button
                  onClick={() => viewDetails(user.id)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  More
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </DashboardLayout>
  );
};

export default UserManagement;