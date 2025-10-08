import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // added useNavigate
import '../styles/Auth.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // initialize navigate

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const result = await response.text();

      if (result === "success") {
        toast.success("✅ Logged in successfully!", { position: "top-center" });
        localStorage.setItem("user", JSON.stringify({ email }));

        // Redirect to Home page after 1 second to show toast
        setTimeout(() => {
          navigate("/"); // <-- sends user to Home
        }, 1000);
      } else {
        toast.error("❌ Invalid credentials!", { position: "top-center" });
      }
    } catch (error) {
      toast.error("⚠️ Server not reachable!", { position: "top-center" });
      console.error(error);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>
        New User?{' '}
        <Link to="/register" className="login-link-btn">Sign up</Link>
      </p>
      <ToastContainer />
    </div>
  );
};

export default Login;
