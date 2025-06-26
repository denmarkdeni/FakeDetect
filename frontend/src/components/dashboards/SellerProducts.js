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
   <DashboardLayout className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="margin-lt font-bold text-center mt-10">Loading ...</div>
    </DashboardLayout>
  }

  if (error) {
    <DashboardLayout className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="margin-lt font-bold text-center mt-10">{error}</div>
    </DashboardLayout>
  }

  return (
    <DashboardLayout title={"Products List"} className="container mx-auto p-6 bg-gray"><br />
        <h2 className="text-2xl font-bold mb-6">Product List</h2>

            <table className="w-full bg-form text-white rounded-form shadow-md">
            <thead>
                <tr>
                <th className="py-4 px-4 text-left text-sm font-semibold ">Product Name</th>
                <th className="py-4 px-4 text-left text-sm font-semibold">Brand</th>
                <th className="py-4 px-4 text-left text-sm font-semibold">Category</th>
                <th className="py-4 px-4 text-left text-sm font-semibold">Price</th>
                <th className="py-4 px-4 text-left text-sm font-semibold">Trust Score</th>
                <th className="py-4 px-4 text-left text-sm font-semibold">Fake Flags</th>
                <th className="py-4 px-4 text-left text-sm font-semibold">Verified Source</th>
                <th className="py-4 px-4 text-left text-sm font-semibold">Actions</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product) => (
                <tr key={product.id} className="border-t">
                    <td className="py-4 px-4 text-sm text-gray-700">{product.name}</td>
                    <td className="py-4 px-4 text-sm text-gray-700">{product.brand || 'N/A'}</td>
                    <td className="py-4 px-4 text-sm text-gray-700">{product.category}</td>
                    <td className="py-4 px-4 text-sm text-gray-700">₹{product.price}</td>
                    <td className="py-4 px-4 text-sm text-gray-700">{product.trust_score}</td>
                    <td className="py-4 px-4 text-sm text-gray-700">
                    {product.fake_flags} {product.is_fake ? '(Fake)' : ''}
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-700">
                    {product.verified_source ? (
                        <span className="text-green-500">(Verified)</span>
                    ) : (
                        <span className="text-red-500">(Not Verified)</span>
                    )}
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-700">
                    <a
                        href={`/product/${product.id}`}
                        className="text-blue-500 hover:text-blue-700"
                    >
                        View Details
                    </a>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
    </DashboardLayout>
  );
};

export default ProductListPage;
