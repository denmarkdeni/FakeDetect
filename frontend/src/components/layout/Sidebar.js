import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Styles.css';
import 'animate.css';

export default function Sidebar() {
  const role = localStorage.getItem('role');
  return (
    <div className="sidebar animate__animated animate__slideInLeft">
      <h2 className="sidebar-title">FakeDetect</h2>
      <ul>
        {role === 'customer' && (
          <>
            <li>
              <Link to="/customer-dashboard" className="sidebar-link">
                <span className="icon">🏠</span> Home
              </Link>
            </li>
            <li>
              <Link to="/profile" className="sidebar-link">
                <span className="icon">👤</span> Profile
              </Link>
            </li>
            <li>
              <Link to="/check-product" className="sidebar-link">
                <span className="icon">🕵️</span> Check Product
              </Link>
            </li>
            <li>
              <Link to="/orders" className="sidebar-link">
                <span className="icon">🛍️</span> My Orders
              </Link>
            </li>
          </>
        )}
        {role === 'seller' && (
          <>
            <li>
              <Link to="/seller-dashboard" className="sidebar-link">
                <span className="icon">🏠</span> Home
              </Link>
            </li>
            <li>
              <Link to="/seller-profile" className="sidebar-link">
                <span className="icon">👤</span> Profile
              </Link>
            </li>
            <li>
              <Link to="/upload-product" className="sidebar-link">
                <span className="icon">📦</span> Upload Product
              </Link>
            </li>
            <li>
              <Link to="/my-products" className="sidebar-link">
                <span className="icon">📊</span> My Products
              </Link>
            </li>
            <li>
              <Link to="/product-feedbacks" className="sidebar-link">
                <span className="icon">💢</span> Fake Flags
              </Link>
            </li>
          </>
        )}
        <li>
          <Link to="/logout" className="sidebar-link logout-link">
            <span className="icon">❌</span> Logout
          </Link>
        </li>
      </ul>
    </div>
  );
}