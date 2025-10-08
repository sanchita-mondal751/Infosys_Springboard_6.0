import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import '../styles/PredictiveMaintenance.css';

const PredictiveMaintenance = () => {
  const [healthData, setHealthData] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const email = user?.email;

  useEffect(() => {
    if (!email) return;
    fetch(`http://localhost:8080/api/health/${email}`)
      .then(res => res.json())
      .then(data => setHealthData(data))
      .catch(console.error);
  }, [email]);

  const getHealthScore = (car) => {
    let score = 100;
    if (car.fuelLevel < 25) score -= 20;
    if (!car.brakesWorking) score -= 25;
    if (!car.acceleratorWorking) score -= 15;
    if (!car.engineHealthy) score -= 40;
    return Math.max(score, 0);
  };

  return (
    <div className="predictive-container">
      <h2>🔧 Predictive Maintenance Dashboard</h2>
      {healthData.length === 0 ? (
        <p>No vehicle health data found. Run a health check first.</p>
      ) : (
        <div className="vehicle-health-list">
          {healthData.map(car => (
            <div key={car.vehicleId} className="car-health-card">
              <h3>{car.vehicleName}</h3>
              <p><strong>Status:</strong> {car.status}</p>
              <p className="health-score"><span>Health: {getHealthScore(car)}%</span></p>

              <div className="chart-wrapper">
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={[
                    { name: "Fuel", value: car.fuelLevel },
                    { name: "Brakes", value: car.brakesWorking ? 100 : 0 },
                    { name: "Accelerator", value: car.acceleratorWorking ? 100 : 0 },
                    { name: "Engine", value: car.engineHealthy ? 100 : 0 }
                  ]}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#00C49F" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <p className={`service-suggestion ${getHealthScore(car) >= 70 ? 'good' : getHealthScore(car) >= 40 ? 'warning' : 'critical'}`}>
                {getHealthScore(car) < 70 ? "🧰 Schedule Maintenance Soon" : "✅ Vehicle in Good Condition"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PredictiveMaintenance;
