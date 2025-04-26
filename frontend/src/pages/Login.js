import { useState } from 'react';
import API from '../api/api';
import { useNavigate } from 'react-router-dom';
import '../styles/Styles.css';
 
export default function Login() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('login/', credentials);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);
      localStorage.setItem('username', res.data.username);
      alert("✅ Logged in successfully!");
      
      if (res.data.role === 'customer') {
        navigate('/customer-dashboard');
      } else if (res.data.role === 'seller') {
        navigate('/seller-dashboard');
      } else {
        alert("❌ Invalid role. Please contact support.");
      }
    } catch (err) {
      console.error(err);
      alert(`❌ Login failed. Check your credentials ${err}`); 
    }
  };

  return (
    <form onSubmit={handleLogin} style={{ padding: "2rem" }} className="form-container">
      <h2>Login</h2>
      <input name="username" placeholder="Username" onChange={handleChange} required /><br/>
      <input name="password" type="password" placeholder="Password" onChange={handleChange} required /><br/>
      <button type="submit">Login</button>
      <p>Don't have an account? <a href="/register"><b>Register</b></a></p>
    </form>
  );
}
