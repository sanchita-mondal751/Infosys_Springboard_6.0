import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HealthChecking from "./pages/HealthChecking"; 
import "./styles/App.css";

// Layout with Navbar + Footer (for Home)
function LayoutWithFooter() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

// Layout with only Navbar (for app pages like Dashboard/Login/Health)
function LayoutWithoutFooter() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

function App() {
  return (
    <Routes>
      {/* Public Home page with footer */}
      <Route element={<LayoutWithFooter />}>
        <Route path="/" element={<Home />} />
      </Route>

      {/* Authenticated/functional pages (no footer) */}
      <Route element={<LayoutWithoutFooter />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/health" element={<HealthChecking />} />
      </Route>
    </Routes>
  );
}

export default App;
