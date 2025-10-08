import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/VehicleManager.css";

const VehicleManager = () => {
  const [vehicles, setVehicles] = useState([]);
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const email = user?.email;

  // Fetch vehicles whenever component mounts or email changes
  useEffect(() => {
    if (!email) return;

    const fetchVehicles = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/vehicles/${email}`);
        const data = await res.json();
        setVehicles(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching vehicles:", err);
      }
    };

    fetchVehicles();
  }, [email]);

  // Add a new vehicle
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!brand || !model || !year) return;

    try {
      const res = await fetch(`http://localhost:8080/api/vehicles/add/${email}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ brand, model, year: Number(year) }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Failed to add vehicle: ${text}`);
      }

      const newVehicle = await res.json();

      // Update state with new vehicle from backend
      setVehicles((prev) => (Array.isArray(prev) ? [...prev, newVehicle] : [newVehicle]));

      // Reset form
      setBrand("");
      setModel("");
      setYear("");
    } catch (err) {
      console.error(err);
      alert("Error adding vehicle. Check console for details.");
    }
  };

  // Delete a vehicle with optimistic UI update
  const handleDelete = async (id) => {
    // Optimistically remove vehicle from state
    setVehicles((prev) => prev.filter((v) => v.id !== id));

    try {
      const res = await fetch(`http://localhost:8080/api/vehicles/${email}/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Failed to delete vehicle: ${text}`);
      }
      // Successful delete; UI already updated
    } catch (err) {
      console.error("Error deleting vehicle:", err);
      alert("Error deleting vehicle. Rolling back...");

      // Rollback: refetch vehicles from backend
      try {
        const res = await fetch(`http://localhost:8080/api/vehicles/${email}`);
        const data = await res.json();
        setVehicles(Array.isArray(data) ? data : []);
      } catch (fetchErr) {
        console.error("Error refetching vehicles after delete failure:", fetchErr);
      }
    }
  };

  return (
    <div className="vehicle-manager">
      <h2>🚗 Vehicle Health Management</h2>

      <form onSubmit={handleAdd} className="add-form">
        <input
          type="text"
          placeholder="Brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required
        />
        <button type="submit">➕ Add Vehicle</button>
      </form>

      <div className="vehicle-list">
        {vehicles.length > 0 ? (
          vehicles.map((v) => (
            <div key={v.id} className="vehicle-card">
              <div
                onClick={() =>
                  navigate("/health", {
                    state: {
                      car: {
                        id: v.id,
                        name: `${v.brand} ${v.model}`,
                        year: v.year,
                      },
                    },
                  })
                }
              >
                <h3>
                  {v.brand} {v.model}
                </h3>
                <p>Year: {v.year}</p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(v.id);
                }}
              >
                ❎ Remove
              </button>
            </div>
          ))
        ) : (
          <p>No vehicles added yet.</p>
        )}
      </div>
    </div>
  );
};

export default VehicleManager;
