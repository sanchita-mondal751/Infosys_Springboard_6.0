import React, { useState } from "react";
import "../styles/Dashboard.css";
import VehicleManager from "./VehicleManager";
import Placeholder from "./Placeholder";
import RouteOptimization from "./RouteOptimization";
import FleetInventory from "./FleetInventory";
import CustomerBooking from "./CustomerBooking";
import PredictiveMaintenance from "./PredictiveMaintenance"; // ✅ New Module

const Dashboard = () => {
  const [activeModule, setActiveModule] = useState("health"); // default module

  const renderContent = () => {
    switch (activeModule) {
      case "health":
        return <VehicleManager />;
      case "route":
        return <RouteOptimization />; // ✅ AI Route Optimization
      case "booking":
        return <CustomerBooking />;
      case "predictive":
        return <PredictiveMaintenance />;
      case "fleet":
        return <FleetInventory />;
      default:
        return <Placeholder title="Select a Module from Sidebar" />;
    }
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>🚘 Customer Dashboard</h2>
        <ul>
          <li
            className={activeModule === "fleet" ? "active" : ""}
            onClick={() => setActiveModule("fleet")}
          >
            🚗 Fleet Inventory
          </li>
          <li
            className={activeModule === "route" ? "active" : ""}
            onClick={() => setActiveModule("route")}
          >
            📍 AI Route Optimization
          </li>
          <li
            className={activeModule === "predictive" ? "active" : ""}
            onClick={() => setActiveModule("predictive")}
          >
            🛠 Predictive Maintenance
          </li>
          <li
            className={activeModule === "booking" ? "active" : ""}
            onClick={() => setActiveModule("booking")}
          >
            📅 Customer Booking
          </li>
          <li
            className={activeModule === "health" ? "active" : ""}
            onClick={() => setActiveModule("health")}
          >
            ❤️ Health Care
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="dashboard-content">{renderContent()}</main>
    </div>
  );
};

export default Dashboard;
