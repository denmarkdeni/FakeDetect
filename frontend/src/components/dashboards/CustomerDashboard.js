import React from 'react';
import DashboardLayout from '../layout/DashboardLayout';

export default function CustomerDashboard() {
  return (
    <DashboardLayout title="Customer Dashboard">
      <h2>Welcome, Customer</h2>
      <p>This is your personalized dashboard to track purchases, check product authenticity, and manage your account.</p>
    </DashboardLayout>
  );
}