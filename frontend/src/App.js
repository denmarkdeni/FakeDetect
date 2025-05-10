import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
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
      </Routes>
    </Router>
  );
}

export default App;
