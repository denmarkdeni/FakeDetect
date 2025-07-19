import { useState } from 'react';
import DashboardLayout from '../layout/DashboardLayout';
import API from '../../api/api';

function VoucherAdd() {
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    points_cost: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post('admin/vouchers/add/', {
        name: formData.name,
        code: formData.code,
        points_cost: parseInt(formData.points_cost),
        is_available: true,
      });
      setSuccess(response.data.message);
      setError('');
      setFormData({ name: '', code: '', points_cost: '' }); // Reset form
      setTimeout(() => setSuccess(''), 3000); // Clear success after 3s
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add voucher.');
      setSuccess('');
      console.error('Error adding voucher:', err);
    }
  };

  return (
    <DashboardLayout title="Add Voucher"><br />
      <h1 style={{ textAlign: 'center' }}>Add New Voucher</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      {success && <p className="text-green-500 text-center">{success}</p>}
      <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-4 p-4 bg-form text-white rounded-form shadow-md">
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Voucher Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded text-white"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Voucher Code</label>
          <input
            type="text"
            name="code"
            value={formData.code}
            onChange={handleChange}
            className="w-full p-2 border rounded text-white"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Points Cost</label>
          <input
            type="number"
            name="points_cost"
            value={formData.points_cost}
            onChange={handleChange}
            className="w-full p-2 border rounded text-white"
            min="1"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Voucher
        </button>
      </form>
    </DashboardLayout>
  );
}

export default VoucherAdd;