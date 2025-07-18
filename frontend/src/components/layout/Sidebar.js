import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/Styles.css';
import 'animate.css';
import { FiHome, FiUser, FiShoppingBag, FiBox, FiLogOut, FiSearch, FiUsers } from 'react-icons/fi';
import { FaFlag, FaListAlt, FaPercent, FaProductHunt, FaUsers } from 'react-icons/fa';
import { MdShoppingCart } from "react-icons/md";

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
    const hasAnimated = sessionStorage.getItem('sidebarAnimated');
    if (!hasAnimated) {
      setAnimate(true);
      sessionStorage.setItem('sidebarAnimated', 'true');
    }
  }, []);

  return (
    <div className={`sidebar ${animate ? 'animate__animated animate__slideInLeft' : ''}`}>
      <Link to="/" className="sidebar-title-link">
        <h2 className="sidebar-title" ><img src="/assets/images/crediscan.png" alt="" style={{ width:'40px' }} /> CrediScan</h2>
      </Link>
      <ul className="sidebar-list">
        {role === 'customer' && (
          <>
            <li>
              <Link to="/customer-dashboard" className="sidebar-link">
                <FiHome className="sidebar-icon" /> Home
              </Link>
            </li>
            <li>
              <Link to="/customer-profile" className="sidebar-link">
                <FiUser className="sidebar-icon" /> Profile
              </Link>
            </li>
            <li>
              <Link to="/customer-products" className="sidebar-link">
                <FiSearch className="sidebar-icon" /> Check Products
              </Link>
            </li>
            <li>
              <Link to="/my-orders" className="sidebar-link">
                <FiShoppingBag className="sidebar-icon" /> My Orders
              </Link>
            </li>
            <li>
              <Link to="/cart" className="sidebar-link">
                <MdShoppingCart className="sidebar-icon" /> Cart List
              </Link>
            </li>
            <li>
              <Link to="/vouchers" className="sidebar-link">
                <FaPercent className="sidebar-icon" /> Vouchers
              </Link>
            </li>
          </>
        )}
        {role === 'seller' && (
          <>
            <li>
              <Link to="/seller-dashboard" className="sidebar-link">
                <FiHome className="sidebar-icon" /> Home
              </Link>
            </li>
            <li>
              <Link to="/seller-profile" className="sidebar-link">
                <FiUser className="sidebar-icon" /> Profile
              </Link>
            </li>
            <li>
              <Link to="/product-upload" className="sidebar-link">
                <FiBox className="sidebar-icon" /> Upload Product
              </Link>
            </li>
            <li>
              <Link to="/product-list" className="sidebar-link">
                <FiShoppingBag className="sidebar-icon" /> My Products
              </Link>
            </li>
          </>
        )}
        {role === 'admin' && (
          <>
            <li>
              <Link to="/admin-dashboard" className="sidebar-link">
                <FiHome className="sidebar-icon" /> Home
              </Link>
            </li>
            <li>
              <Link to="/admin/users" className="sidebar-link">
                <FaUsers className="sidebar-icon" /> Users
              </Link>
            </li>
            <li>
              <Link to="/admin/products" className="sidebar-link">
                <FaListAlt className="sidebar-icon" /> Products
              </Link>
            </li>
            <li>
              <Link to="/admin/flags" className="sidebar-link">
                <FaFlag className="sidebar-icon" /> Reports
              </Link>
            </li>
            <li>
              <Link to="/admin/vouchers/add" className="sidebar-link">
                <FaPercent className="sidebar-icon" /> Voucher
              </Link>
            </li>
          </>
        )}
        <li>
          <Link onClick={handleLogout} to="/auth" className="sidebar-link logout-link">
            <FiLogOut className="sidebar-icon" /> Logout
          </Link>
        </li>
      </ul>
    </div>
  );
}
