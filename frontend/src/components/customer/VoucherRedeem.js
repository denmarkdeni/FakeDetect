import { useState, useEffect } from 'react';
import DashboardLayout from '../layout/DashboardLayout';
import API from '../../api/api';
import { useNavigate } from 'react-router-dom';

function VoucherRedeem() {
  const [vouchers, setVouchers] = useState([]);
  const [customerPoints, setCustomerPoints] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const [vouchersRes, pointsRes] = await Promise.all([
          API.get('vouchers/'),
          API.get('customer/dashboard/'), // Assuming points are in dashboard data
        ]);
        setVouchers(vouchersRes.data);
        setCustomerPoints(pointsRes.data.credit_points);
      } catch (err) {
        setError('Failed to load data.');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleRedeem = async (voucherId) => {
    if (window.confirm('Are you sure you want to redeem this voucher?')) {
      try {
        const response = await API.post(`vouchers/${voucherId}/redeem/`);
        setSuccess(response.data.message);
        setError('');
        setCustomerPoints(customerPoints - response.data.data.points_cost); // Update points locally
        setVouchers(vouchers.filter(v => v.id !== voucherId)); // Remove redeemed voucher
        setTimeout(() => setSuccess(''), 3000); // Clear success message after 3s
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to redeem voucher.');
        setSuccess('');
        console.error('Error redeeming voucher:', err);
      }
    }
  };

  return (
    <DashboardLayout title="Voucher Redeem"><br />
      <h1 style={{ textAlign: 'center' }}>Redeem Your Vouchers</h1>
      {loading ? (
        <p className="text-center font-bold">Loading vouchers...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <>
          <p className="text-center font-semibold mb-4">Your Points: {customerPoints}</p>
          {success && <p className="text-green-500 text-center">{success}</p>}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto p-4">
            {vouchers.map((voucher) => (
              <div key={voucher.id} className="bg-form p-8 rounded-form shadow-md text-white">
                <h3 className="text-md font-semibold">{voucher.name}</h3>
                <p className="text-sm">Code: {voucher.code}</p>
                <p className="text-sm">Cost: {voucher.points_cost} points</p>
                {voucher.is_available ?
                <button
                  onClick={() => handleRedeem(voucher.id)}
                  disabled={customerPoints < voucher.points_cost}
                  className={`mt-2 px-4 py-2 rounded ${customerPoints < voucher.points_cost ? 'text-red' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
                >
                  Redeem
                </button>
                :'Redeemed✅'
                 }
              </div>
            ))}
          </div>
          {vouchers.length === 0 && <p className="text-center">No vouchers available.</p>}
        </>
      )}
    </DashboardLayout>
  );
}

export default VoucherRedeem;