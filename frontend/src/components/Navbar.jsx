import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import Logo from "../assets/logo.png";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={Logo} alt="NeuroFleet Logo" className="logo" />
        <span className="brand">NeuroFleetX</span>
      </div>

      <ul className="navbar-center">
        <li><Link to="/">Home</Link></li>

        {user ? (
          <>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li>
              <button onClick={handleLogout} className="login-btn">Logout</button>
            </li>
          </>
        ) : (
          <div className="navbar-right">
            <Link to="/login" className="login-btn">Login</Link>
          </div>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
