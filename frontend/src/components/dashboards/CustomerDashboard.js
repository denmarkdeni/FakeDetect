import React, { useEffect, useState } from 'react';
import DashboardLayout from '../layout/DashboardLayout';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../styles/customer.css';

export default function CustomerDashboard() {
  const [recentOrders, setRecentOrders] = useState([]);
  const [checkedProducts, setCheckedProducts] = useState([]);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    // Fetch customer data
    const fetchData = async () => {
      try {
        const ordersRes = await axios.get('/api/customer/recent-orders/');
        const checksRes = await axios.get('/api/customer/recent-checks/');
        const alertsRes = await axios.get('/api/customer/fake-alerts/');

        setRecentOrders(ordersRes.data);
        setCheckedProducts(checksRes.data);
        setAlerts(alertsRes.data);
      } catch (err) {
        console.error('Error loading dashboard:', err);
      }
    };
    fetchData();
  }, []);

  return (
    <DashboardLayout title="Customer Dashboard">
      <div className="dashboard-container">
        <h2 className="dashboard-title">Welcome back! 🧑‍💼</h2>
        <p className="dashboard-subtext">
          Track your orders, check product trust scores, and stay alert for counterfeit items.
        </p>
      </div>

      {/* ⚠️ Fake Product Alerts */}
      {alerts.length > 0 && (
        <div className="alert-box">
          <h3 className="text-lg font-semibold text-red-700">⚠️ Fake Product Alerts</h3>
          <ul className="list-disc ml-5 mt-2 text-sm text-red-800">
            {alerts.map((alert, idx) => (
              <li key={idx}>
                <Link to={`/product/${alert.id}`} className="underline hover:text-red-600">
                  {alert.name}
                </Link>{' '}
                flagged as <strong>Fake</strong>!
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 📦 Recent Orders */}
      <div className="card">
        <h3 className="card-title">📦 Recent Orders</h3>
        <ul className="card-text">
          {recentOrders.length > 0 ? (
            recentOrders.map((order) => (
              <li key={order.id} className="p-3 border rounded-md shadow-sm">
                <p><strong>{order.product_name}</strong> — {order.status}</p>
              </li>
            ))
          ) : (
            <p className="card-text">No recent orders yet.</p>
          )}
        </ul>
      </div><br />

      {/* 🔍 Recently Checked Products */}
      <div className="card">
        <h3 className="card-title">🔍 Recently Checked Products</h3>
        <ul className="card-text">
          {checkedProducts.length > 0 ? (
            checkedProducts.map((prod) => (
              <li key={prod.id} className="p-3 border rounded-md">
                <p><strong>{prod.name}</strong> — Trust Score: {prod.trust_score}</p>
              </li>
            ))
          ) : (
            <p className="card-text">No products checked recently.</p>
          )}
        </ul>
      </div><br />

      {/* 🧠 Quick Product Check */}
      <div className="card">
        <h3 className="card-title">🧠 Check a Product</h3>
        <Link
          to="/check-product"
          className="card-text"
        >
          Check Now
        </Link>
      </div><br />

      {/* 📰 Safety Tips */}
      <div className="card">
        <h3 className="card-title">📰 Tips to Avoid Fakes</h3>
        <ul className="card-text">
          <li>Always check trust scores before buying.</li>
          <li>Avoid products without verified sources.</li>
          <li>Report suspicious listings.</li>
        </ul>
      </div>
    </DashboardLayout>
  );
}
