import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DashboardLayout from '../layout/DashboardLayout';
import '../../styles/CartList.css';

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState('');

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
    alert("You bought the product! 🎉"); 
  };

  return (
    <DashboardLayout className="cart-container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? <p>No items in cart.</p> : (
        <div className="cart-grid">
          {cartItems.map(item => (
            <div className="cart-card" key={item.id}>
              <img src={`http://127.0.0.1:8000${item.product.image}`} alt={item.product.name} />
              <h3>{item.product.name}</h3>
              <p>Price: ₹{item.product.price}</p>
              <p>Qty: {item.quantity}</p>
              <button onClick={() => handleBuy(item.id)}>Buy</button>
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
