import React, { useState } from "react";
import "../styles/auth.css";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

const AuthForm = () => {
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsSignup((prev) => !prev);
  };

  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
    role: "customer",
  });

  // Handlers for both forms
  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  // Login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("login/", loginData);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("username", res.data.username);

      if (!res.data.isVerified) {
        navigate("/verify-email-prompt");
        alert("⚠️ Please verify your email to continue.");
        return;
      }

      alert("✅ Logged in successfully!");
      
      if (res.data.role === "customer") {
        navigate("/customer-dashboard");
      } else if (res.data.role === "seller") {
        navigate("/seller-dashboard");
      } else if (res.data.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        alert("❌ Invalid role. Please contact support.");
      }
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 403) {
        navigate("/verify-email-prompt");
        alert("⚠️ " + err.response.data.error);
      } else {
        alert("❌ Login failed. Please check your credentials.");
      }
    }
  };

  // Register handler
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("register/", registerData);
      localStorage.setItem("token", res.data.token);
      alert("✅ Registered successfully! Please check your email to verify your account.");
      setRegisterData({
        username: "",
        email: "",
        password: "",
        role: "customer",
      })
      setIsSignup(false); // Switch to login view
    } catch (err) {
      console.error(err);
      alert("❌ Registration failed. Try again.");
    }
  };

  return (
    <div className="auth-container">
      <div className={`cont ${isSignup ? "s-signup" : ""}`}>
        <form className="form sign-in" onSubmit={handleLogin}>
          <h2>Sign In</h2><br /> <br />
          <label>
            <span>User Name </span>
            <input
              name="username"
              value={loginData.username}
              onChange={handleLoginChange}
              required
            />
          </label>
          <label>
            <span>Password</span>
            <input
              name="password"
              type="password"
              value={loginData.password}
              onChange={handleLoginChange}
              required
            />
          </label>
          <button className="submit" type="submit">
            Sign In
          </button>

          {/* <div className="social-media">
            <ul>
              <li>
                <img src="assets/images/envelope-blue.png" alt="facebook" />
              </li>
              <li>
                <img src="assets/images/email.png" alt="twitter" />
              </li>
              <li>
                <img src="assets/images/email.png" alt="linkedin" />
              </li>
              <li>
                <img src="assets/images/email.png" alt="instagram" />
              </li>
            </ul>
          </div> */}
        </form>

        <div className="sub-cont">
          <div className="img">
            <div className="img-text m-up">
              <h1>New here?</h1>
              <p>sign up and discover</p>
            </div>
            <div className="img-text m-in">
              <h1>One of us?</h1>
              <p>just sign in</p>
            </div>
            <div className="img-btn" onClick={toggleForm}>
              <span className="m-up">Sign Up</span>
              <span className="m-in">Sign In</span>
            </div>
          </div>
          <form className="form sign-up" onSubmit={handleRegister}>
            <h2>Sign Up</h2>
            <label>
              <span>Name</span>
              <input
                name="username"
                value={registerData.username}
                onChange={handleRegisterChange}
                required
              />
            </label>
            <label>
              <span>Email</span>
              <input
                name="email"
                type="email"
                value={registerData.email}
                onChange={handleRegisterChange}
                required
              />
            </label>
            <label>
              <span>Password</span>
              <input
                name="password"
                type="password"
                value={registerData.password}
                onChange={handleRegisterChange}
                required
              />
            </label>
            <label>
              <span>Role</span>
              <select
                name="role"
                value={registerData.role}
                onChange={handleRegisterChange}
              >
                <option value="customer">Customer</option>
                <option value="seller">Seller</option>
              </select>
            </label>
            <button type="submit" className="submit">
              Sign Up Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
