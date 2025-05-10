import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import '../../styles/PaymentPage.css';
import DashboardLayout from '../layout/DashboardLayout';

const PaymentPage = () => {
  const { id } = useParams();
  const [paymentMethod, setPaymentMethod] = useState('');
  const [success, setSuccess] = useState(false);

  const handlePayment = () => {
    if (!paymentMethod) {
      alert("Please select a payment method!");
      return;
    }

    // You can simulate saving order/payment here
    setSuccess(true);
  };

  return (
    <DashboardLayout className="payment-container">
      <h2>Select Payment Method</h2>

      <div className="payment-options">
        <label>
          <input type="radio" value="cash" onChange={() => setPaymentMethod("Cash on Delivery")} />
          Cash on Delivery
        </label>
        <label>
          <input type="radio" value="card" onChange={() => setPaymentMethod("Card Payment")} />
          Credit/Debit Card
        </label>
        <label>
          <input type="radio" value="upi" onChange={() => setPaymentMethod("UPI Payment")} />
          UPI (Google Pay, PhonePe, etc.)
        </label>
      </div>

      <button className="pay-btn" onClick={handlePayment}>Confirm Payment</button>

      {success && (
        <div className="success-msg">
          <h3>Payment Successful!</h3>
          <p>You chose: <strong>{paymentMethod}</strong></p>
          <p>Thank you for your purchase 😊</p>
        </div>
      )}
    </DashboardLayout>
  );
};

export default PaymentPage;
