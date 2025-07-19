import { useState, useEffect } from 'react';
import DashboardLayout from '../layout/DashboardLayout';
import API from '../../api/api';
import { useParams, useNavigate } from 'react-router-dom';

function ReviewPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    // Fetch order details if needed (optional)
  }, [orderId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post(`my-orders/${orderId}/review/`, {
        rating,
        comment,
      });
      setSuccess(response.data.message);
      setError('');
      setTimeout(() => navigate('/my-orders'), 1000); // Redirect after 1 second
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to submit review.');
      setSuccess('');
      console.error('Error submitting review:', err);
    }
  };

  return (
    <DashboardLayout title="Submit Review"><br />
      <h1 style={{ textAlign: 'center' }}>Review Your Product</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      {success && <p className="text-green-500 text-center">{success}</p>}
      <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-4 p-4 bg-form text-white rounded-form shadow-md">
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Rating (1-5)</label>
          <input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Comment</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit Review
        </button>
      </form>
    </DashboardLayout>
  );
}

export default ReviewPage;