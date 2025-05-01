import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/Styles.css';
import 'animate.css';

export default function Sidebar() {
  const [animate, setAnimate] = useState(false);
  const role = localStorage.getItem('role');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    alert("👋 Logged out!");
    navigate('/login');
  };

  useEffect(() => {
    // Check if the animation has already been applied for the current session
    const hasAnimated = sessionStorage.getItem('sidebarAnimated');

    if (!hasAnimated) {
      // If not, apply the animation and set the session storage flag
      setAnimate(true);
      sessionStorage.setItem('sidebarAnimated', 'true');
    }
  }, []);

  return (
    <div className={`sidebar ${animate ? 'animate__animated animate__slideInLeft' : ''}`}>
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
              <Link to="/customer-profile" className="sidebar-link">
                <span className="icon">👤</span> Profile
              </Link>
            </li>
            <li>
              <Link to="/customer-products" className="sidebar-link">
                <span className="icon">🕵️</span> Check Products
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
              <Link to="/product-upload" className="sidebar-link">
                <span className="icon">📦</span> Upload Product
              </Link>
            </li>
            <li>
              <Link to="/product-list" className="sidebar-link">
                <span className="icon">📊</span> My Products
              </Link>
            </li>
            {/* <li>
              <Link to="/product-feedbacks" className="sidebar-link">
                <span className="icon">💢</span> Fake Flags
              </Link>
            </li> */}
          </>
        )}
        <li>
          <Link onClick={handleLogout} to="/login" className="sidebar-link logout-link">
            <span className="icon">❌</span> Logout
          </Link>
        </li>
      </ul>
    </div>
  );
}
