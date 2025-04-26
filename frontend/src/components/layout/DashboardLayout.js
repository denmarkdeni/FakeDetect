import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import '../../styles/Styles.css';

export default function DashboardLayout({ children, title }) {
  return (
    <div className="dashboard-wrapper">
      <Sidebar />
      <div className="main-content">
        <Header title={title} />
        {children}
      </div>
    </div>
  );
}
