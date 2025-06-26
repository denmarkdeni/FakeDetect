import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DashboardLayout from '../layout/DashboardLayout';
import '../../styles/CartList.css';
import { useNavigate } from 'react-router-dom';

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/cart/', {
      headers: { Authorization: `Token ${token}` }
    })
    .then(res => setCartItems(res.data))
    .catch(err => setError("Couldn't load cart."));
  }, []);

  const handleRemove = (id) => {
    axios.delete(`http://127.0.0.1:8000/api/remove_cart/${id}/`, {
      headers: { Authorization: `Token ${token}` }
    })
    .then(() => {
      setCartItems(cartItems.filter(item => item.id !== id));
    });
  };

  const handleBuy = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <DashboardLayout title={"Cart List"} className="cart-container">
      <br /><h2>Your Cart List</h2>
      <button className="back-button" onClick={() => navigate(-1)}>Back</button><br />
      {cartItems.length === 0 ? <p>No items in cart.</p> : (
        <div className="cart-grid">
          {cartItems.map(item => (
            <div className="cart-card" key={item.id}>
              <img src={`http://127.0.0.1:8000${item.product.image}`} alt={item.product.name} />
              <h3>{item.product.name}</h3>
              <p>Price: ₹{item.product.price}</p>
              <p>Qty: {item.quantity}</p>
              <button onClick={() => handleBuy(item.product.id)}>More Details</button>
              <button onClick={() => handleRemove(item.id)}>Remove</button>
            </div>
          ))}
        </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </DashboardLayout>
  );
}

export default CartPage;
