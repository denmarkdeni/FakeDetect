import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AdminDashboard from "./components/dashboards/AdminDashboard";
import CustomerDashboard from "./components/dashboards/CustomerDashboard";
import SellerDashboard from "./components/dashboards/SellerDashboard";
import SellerProfile from "./components/dashboards/SellerProfile";
import ProductUpload from "./components/dashboards/ProductUpload";
import ProductList from "./components/dashboards/SellerProducts";
import CustomerProfile from "./components/dashboards/CustomerProfile";
import CustomerProducts from "./components/dashboards/CustomerProducts";
import ProductDetails from "./components/dashboards/ProductDetails";
import CartPage from "./components/dashboards/CartList";
import PaymentPage from "./components/dashboards/PaymentPage";
import AuthForm from "./pages/auth";
import MyOrders from "./components/customer/MyOrders";
import VerifyEmailPrompt from "./pages/VerifyEmailPrompt";
import EmailVerified from "./pages/EmailVerified";
import UserDetail from "./components/admin/UserDetail";
import UserManagement from "./components/admin/UserManagement";
import ProductManagement from "./components/admin/ProductManagement";
import FlagList from "./components/admin/FlagList";
import ReviewPage from "./components/customer/ReviewPage";
import VoucherRedeem from "./components/customer/VoucherRedeem";
import VoucherAdd from "./components/admin/VoucherAdd";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<AuthForm />} />
        <Route path="/verify-email-prompt" element={<VerifyEmailPrompt />} />
        <Route path="/email-verified" element={<EmailVerified />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/customer-dashboard" element={<CustomerDashboard />} />
        <Route path="/seller-dashboard" element={<SellerDashboard />} />
        <Route path="/seller-profile" element={<SellerProfile />} />
        <Route path="/product-upload" element={<ProductUpload />} />
        <Route path="/product-list" element={<ProductList />} />
        <Route path="/customer-profile" element={<CustomerProfile />} />
        <Route path="/customer-products" element={<CustomerProducts />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/payment-page/:id" element={<PaymentPage />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/my-orders/:orderId/review" element={<ReviewPage />} />
        <Route path="/admin/users" element={<UserManagement />} />
        <Route path="/admin/user/:userId" element={<UserDetail />} />
        <Route path="/admin/products" element={<ProductManagement />} />
        <Route path="/admin/flags" element={<FlagList />} />
        <Route path="/vouchers" element={<VoucherRedeem />} />
        <Route path="/admin/vouchers/add" element={<VoucherAdd />} />
      </Routes>
    </Router>
  );
}

export default App;
