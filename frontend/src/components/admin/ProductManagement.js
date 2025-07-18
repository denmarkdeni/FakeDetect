import React, { useState, useEffect } from 'react';
import DashboardLayout from '../layout/DashboardLayout';
import API from '../../api/api';
import { useNavigate } from 'react-router-dom';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await API.get('admin/products/');
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await API.delete(`admin/products/${productId}/`);
        fetchProducts(); // Refresh list
      } catch (err) {
        console.error(err);
      }
    }
  };

  const verifyProduct = async (productId) => {
    try {
      await API.post(`admin/products/${productId}/`);
      fetchProducts(); // Refresh list
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <DashboardLayout title="Product Management" className="container mx-auto p-6 bg-gray">
      <br />
      <h2 className="text-2xl font-bold mb-6">Product Management</h2>
      <table className="w-full bg-form text-white rounded-form shadow-md">
        <thead>
          <tr>
            <th className="py-4 px-4 text-left text-sm font-semibold">Product Name</th>
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
              <td className="py-4 px-4 text-sm text-gray">
                <button
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="mr-2 text-blue hover:text-red-700"
                >
                  Details
                </button>
                <button
                  onClick={() => deleteProduct(product.id)}
                  className="mr-2 text-red hover:text-red-700"
                >
                  Delete
                </button>
                <button
                  onClick={() => verifyProduct(product.id)}
                  className={product.verified_source ? 'text-gray' : 'text-green hover:text-green-700'}
                  disabled={product.verified_source}
                >
                  {product.verified_source ? 'Verified' : 'Verify'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </DashboardLayout>
  );
};

export default ProductManagement;