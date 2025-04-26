import { useState } from 'react';
import API from '../api/api';
import { useNavigate } from 'react-router-dom';
import '../styles/Styles.css';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'customer',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('register/', formData);
      localStorage.setItem('token', res.data.token);
      alert("✅ Registered Successfully!");
      navigate('/login');
    } catch (err) {
      console.error(err);
      alert("❌ Registration Failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: "2rem" }} className="form-container">
      <h2>Register</h2>
      <input name="username" placeholder="Username" onChange={handleChange} required /><br/>
      <input name="email" type="email" placeholder="Email" onChange={handleChange} required /><br/>
      <input name="password" type="password" placeholder="Password" onChange={handleChange} required /><br/>
      <select name="role" onChange={handleChange}>
        <option value="customer">Customer</option>
        <option value="seller">Seller</option>
      </select><br/>
      <button type="submit">Register</button>
      <p>Already have an account? <a href="/login"><b>Login</b></a></p>
    </form>
  );
}
