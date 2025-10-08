import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/HealthChecking.css";

const HealthChecking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { car } = location.state || {};

  const [fuelLevel, setFuelLevel] = useState("");
  const [brakesWorking, setBrakesWorking] = useState(false);
  const [acceleratorWorking, setAcceleratorWorking] = useState(false);
  const [engineHealthy, setEngineHealthy] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (!car) return;

    // Fetch existing health record if any
    fetch(`http://localhost:8080/api/health/${car.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) {
          const vh = data[0];
          setFuelLevel(vh.fuelLevel);
          setBrakesWorking(vh.brakesWorking);
          setAcceleratorWorking(vh.acceleratorWorking);
          setEngineHealthy(vh.engineHealthy);
          setStatus(vh.status);
        }
      })
      .catch((err) => console.error("Error fetching health:", err));
  }, [car]);

  if (!car) return <h2>No car selected!</h2>;

  const handleSubmit = async (e) => {
    e.preventDefault();

    let issues = [];
    if (Number(fuelLevel) < 25) issues.push("⚠️ Low fuel");
    if (!brakesWorking) issues.push("❌ Brakes not working");
    if (!acceleratorWorking) issues.push("❌ Accelerator not working");
    if (!engineHealthy) issues.push("❌ Engine issue detected");

    const healthStatus = issues.length > 0 ? issues.join(", ") : "✅ All systems OK!";

    const payload = {
      vehicleId: car.id,
      vehicleName: car.name,
      fuelLevel: Number(fuelLevel),
      brakesWorking,
      acceleratorWorking,
      engineHealthy,
      status: healthStatus,
      email: JSON.parse(localStorage.getItem("user"))?.email
    };

    try {
      const res = await fetch("http://localhost:8080/api/health/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to save health data");
      setStatus(healthStatus);
      alert("✅ Health data saved successfully!");

      navigate("/predictive"); // redirect to predictive maintenance
    } catch (err) {
      console.error(err);
      alert("❌ Failed to save health data");
    }
  };

  return (
    <div className="Health-container">
      <h2>Health Check: {car.name} 🚗</h2>
      <form onSubmit={handleSubmit} className="car-form">
        <input
          type="number"
          placeholder="Fuel Level (%)"
          value={fuelLevel}
          onChange={(e) => setFuelLevel(e.target.value)}
          required
        />
        <label>
          <input
            type="checkbox"
            checked={brakesWorking}
            onChange={(e) => setBrakesWorking(e.target.checked)}
          />
          Brakes Working
        </label>
        <label>
          <input
            type="checkbox"
            checked={acceleratorWorking}
            onChange={(e) => setAcceleratorWorking(e.target.checked)}
          />
          Accelerator Working
        </label>
        <label>
          <input
            type="checkbox"
            checked={engineHealthy}
            onChange={(e) => setEngineHealthy(e.target.checked)}
          />
          Engine Healthy
        </label>
        <button type="submit">Check Health</button>
      </form>
      {status && <h3 className="status-message">{car.name} Status: {status}</h3>}
    </div>
  );
};

export default HealthChecking;
