import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "../../styles/PaymentPage.css";
import DashboardLayout from "../layout/DashboardLayout";
import API from "../../api/api";

const PaymentPage = () => {
  const { id } = useParams();
  const [paymentMethod, setPaymentMethod] = useState("");
  const [success, setSuccess] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation();
  const { product } = location.state || {};

  const handlePayment = async () => {
    if (!paymentMethod) {
      alert("Please select a payment method!");
      return;
    }

    if (!token) {
      alert("Please log in to proceed with the payment.");
      return;
    }
    const response = await API.post(`payment/${id}/`, {
      payment_method: paymentMethod,
    });
    if (response.status !== 200) {
      alert("Payment failed. Please try again.");
      return;
    }
    alert(response.data.message);

    setSuccess(true);
  };
 
  return (
    <DashboardLayout>
      <div className="payment-container">
        <h2>Payment for {product?.name}</h2>
        <h3>Price: ₹{product?.price}.00</h3>

        <h4>Select Payment Method</h4>

        <div className="payment-options">
          <label>
            <input
              type="radio"
              value="cash"
              name="payment_method"
              onChange={() => setPaymentMethod("Cash on Delivery")}
            />
            Cash on Delivery
          </label>
          <label>
            <input
              type="radio"
              value="card"
              name="payment_method"
              onChange={() => setPaymentMethod("Card Payment")}
            />
            Credit/Debit Card
          </label>
          <label>
            <input
              type="radio"
              value="upi"
              name="payment_method"
              onChange={() => setPaymentMethod("UPI Payment")}
            />
            UPI Payment
          </label>
        </div>

        <button className="pay-btn" onClick={handlePayment}>
          Confirm Payment
        </button><br /><br />
        <button className="pay-btn" onClick={() => navigate(-1)}>
          Back
        </button>

        {success && (
          <div className="success-msg">
            <h3>Payment Successful!</h3>
            <p>
              You chose: <strong>{paymentMethod}</strong>
            </p>
            <p>Thank you for your purchase 😊</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default PaymentPage;
