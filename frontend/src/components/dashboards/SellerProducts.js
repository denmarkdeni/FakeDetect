import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DashboardLayout from '../layout/DashboardLayout';
import image from '../../assets/images/product.png'; 

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please log in to view products.');
      setLoading(false);
      return;
    }

    axios
      .get('http://127.0.0.1:8000/api/products/list/', {
        headers: {
          'Authorization': `Token ${token}`,
        },
      })
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching product data:', err);
        setError('Failed to load products.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <DashboardLayout className="container mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">Product List</h2>

        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
            <thead>
                <tr className="bg-gray-100">
                <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">Product Name</th>
                <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">Brand</th>
                <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">Category</th>
                <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">Price</th>
                <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">Trust Score</th>
                <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">Fake Flags</th>
                <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">Verified Source</th>
                <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">Actions</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product) => (
                <tr key={product.id} className="border-t">
                    <td className="py-2 px-4 text-sm text-gray-700">{product.name}</td>
                    <td className="py-2 px-4 text-sm text-gray-700">{product.brand || 'N/A'}</td>
                    <td className="py-2 px-4 text-sm text-gray-700">{product.category}</td>
                    <td className="py-2 px-4 text-sm text-gray-700">₹{product.price}</td>
                    <td className="py-2 px-4 text-sm text-gray-700">{product.trust_score}</td>
                    <td className="py-2 px-4 text-sm text-gray-700">
                    {product.fake_flags} {product.is_fake ? '(Fake)' : ''}
                    </td>
                    <td className="py-2 px-4 text-sm text-gray-700">
                    {product.verified_source ? (
                        <span className="text-green-500">(Verified)</span>
                    ) : (
                        <span className="text-red-500">(Not Verified)</span>
                    )}
                    </td>
                    <td className="py-2 px-4 text-sm text-gray-700">
                    <a
                        href={`/products/${product.id}`}
                        className="text-blue-500 hover:text-blue-700"
                    >
                        View Details
                    </a>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
    </DashboardLayout>
  );
};

export default ProductListPage;
