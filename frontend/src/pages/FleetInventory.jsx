import React, { useEffect, useState } from "react";
import "../styles/FleetInventory.css";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const FleetInventory = () => {
  const [vehicles, setVehicles] = useState([]);
  const [healthData, setHealthData] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [bookings, setBookings] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  const email = user?.email;

  // Default demo drivers (same as CustomerBooking)
  const defaultDrivers = [
    { id: 1, name: "John Doe", phone: "1234567890", email: "your-email@gmail.com" },
    { id: 2, name: "Jane Smith", phone: "9876543210", email: "your-email@gmail.com" },
    { id: 3, name: "Alex Brown", phone: "5555555555", email: "your-email@gmail.com" },
  ];

  useEffect(() => {
    if (!email) return;

    fetch(`http://localhost:8080/api/vehicles/${email}`)
      .then((res) => res.json())
      .then((data) => setVehicles(Array.isArray(data) ? data : []))
      .catch((err) => console.error("Error fetching vehicles:", err));

    fetch(`http://localhost:8080/api/health/${email}`)
      .then((res) => res.json())
      .then((data) => setHealthData(Array.isArray(data) ? data : []))
      .catch((err) => console.error("Error fetching health data:", err));

    // If backend has no drivers, use default 3
    fetch(`http://localhost:8080/api/driver/${email}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setDrivers(data);
        else setDrivers(defaultDrivers);
      })
      .catch(() => setDrivers(defaultDrivers));

    fetch(`http://localhost:8080/api/bookings/${email}`)
      .then((res) => res.json())
      .then((data) => setBookings(Array.isArray(data) ? data : []))
      .catch((err) => console.error("Error fetching bookings:", err));
  }, [email]);

  // Health stats
  const healthyVehicles = healthData.filter(
    (car) =>
      car.engineHealthy &&
      car.brakesWorking &&
      car.acceleratorWorking &&
      car.fuelLevel >= 25
  ).length;
  const maintenanceVehicles = vehicles.length - healthyVehicles;

  // Driver availability stats
  const bookedDriverIds = bookings.map((b) => b.driverId);
  const availableDrivers = drivers.filter(
    (d) => !bookedDriverIds.includes(d.id)
  ).length;
  const bookedDrivers = drivers.length - availableDrivers;

  // Vehicle Health Chart Data
  const fleetChartData = [
    { name: "Healthy", value: healthyVehicles },
    { name: "Needs Maintenance", value: maintenanceVehicles },
  ];

  // Driver Availability Chart Data
  const driverChartData = [
    { name: "Available", value: availableDrivers },
    { name: "Booked", value: bookedDrivers },
  ];

  const COLORS_VEHICLE = ["#28a745", "#dc3545"]; // Green, Red
  const COLORS_DRIVER = ["#007bff", "#ffc107"]; // Blue, Yellow

  return (
    <div className="fleet-overview-enhanced">
      <h2>🚘 Fleet & Resource Overview</h2>

      {/* Stat Cards */}
      <div className="stat-cards-container">
        <div className="stat-card total">
          <h3>Total Vehicles</h3>
          <p>{vehicles.length}</p>
        </div>
        <div className="stat-card healthy">
          <h3>Healthy Vehicles</h3>
          <p>{healthyVehicles}</p>
        </div>
        <div className="stat-card maintenance">
          <h3>Needs Maintenance</h3>
          <p>{maintenanceVehicles}</p>
        </div>
        <div className="stat-card available">
          <h3>Available Drivers</h3>
          <p>{availableDrivers}</p>
        </div>
        <div className="stat-card booked">
          <h3>Booked Drivers</h3>
          <p>{bookedDrivers}</p>
        </div>
      </div>

      {/* Charts Section - Side by Side */}
      <div className="charts-summary-container">
        {/* Vehicle Health Chart */}
        <div className="chart-box">
          <h3>🚗 Vehicle Health Distribution</h3>
          {vehicles.length === 0 ? (
            <p>No vehicle data available</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={fleetChartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {fleetChartData.map((entry, index) => (
                    <Cell key={`vcell-${index}`} fill={COLORS_VEHICLE[index % COLORS_VEHICLE.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Driver Availability Chart */}
        <div className="chart-box">
          <h3>🧍‍♂️ Driver Availability</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={driverChartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {driverChartData.map((entry, index) => (
                  <Cell key={`dcell-${index}`} fill={COLORS_DRIVER[index % COLORS_DRIVER.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Summary Section */}
      <div className="summary-box">
        <h3>📊 Quick Summary</h3>
        <ul>
          <li><strong>Total Vehicles:</strong> {vehicles.length}</li>
          <li><strong>Healthy Vehicles:</strong> {healthyVehicles}</li>
          <li><strong>Needs Maintenance:</strong> {maintenanceVehicles}</li>
          <li><strong>Total Drivers:</strong> {drivers.length}</li>
          <li><strong>Available Drivers:</strong> {availableDrivers}</li>
          <li><strong>Booked Drivers:</strong> {bookedDrivers}</li>
          <li><strong>Total Bookings:</strong> {bookings.length}</li>
        </ul>
      </div>
    </div>
  );
};

export default FleetInventory;
