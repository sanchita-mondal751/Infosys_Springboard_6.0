import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Polyline, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "../styles/RouteOptimization.css";

// Fit map bounds to positions
const FitBounds = ({ positions }) => {
  const map = useMap();
  useEffect(() => {
    if (!positions || positions.length === 0) return;
    const latlngs = positions.map(p => [p.lat, p.lng]);
    try {
      map.fitBounds(latlngs, { padding: [40, 40] });
    } catch (e) {
      if (latlngs[0]) map.setView(latlngs[0], 10);
    }
  }, [positions, map]);
  return null;
};

// Geocode a city name to coordinates using OpenStreetMap
const geocodePlace = async (place) => {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(place)}`
    );
    const data = await res.json();
    if (data && data.length > 0) {
      return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
    }
    return null;
  } catch (err) {
    console.error("Geocoding error:", err);
    return null;
  }
};

const RouteOptimization = () => {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [finalSource, setFinalSource] = useState("");
  const [finalDestination, setFinalDestination] = useState("");
  const [result, setResult] = useState(null);
  const [path, setPath] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!source || !destination) {
      setErrorMsg("⚠️ Please enter both source and destination");
      return;
    }

    setLoading(true);
    setResult(null);
    setPath([]);
    setErrorMsg("");

    try {
      const srcCoords = await geocodePlace(source);
      const destCoords = await geocodePlace(destination);

      if (!srcCoords || !destCoords) {
        setErrorMsg("⚠️ Could not find coordinates for one or both cities.");
        setLoading(false);
        return;
      }

      setFinalSource(source);
      setFinalDestination(destination);

      // Send coordinates to backend
      const res = await fetch("http://localhost:8080/api/route/optimize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sourceLat: srcCoords.lat,
          sourceLng: srcCoords.lng,
          destinationLat: destCoords.lat,
          destinationLng: destCoords.lng,
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Server ${res.status}`);
      }

      const data = await res.json();

      if (data && Array.isArray(data.geometry) && data.geometry.length > 0) {
        setPath(data.geometry);
        setResult({
          distance: `${(data.distance || 0).toFixed(2)} km`,
          duration: `${(data.duration || 0).toFixed(1)} mins`,
          summary: data.optimizedRoute || "",
        });
      } else {
        setErrorMsg("⚠️ No route found. Try different inputs.");
      }
    } catch (err) {
      console.error("Error:", err);
      setErrorMsg(err.message || "Unknown error while fetching route");
    } finally {
      setLoading(false);
    }
  };

  const defaultCenter = [20.5937, 78.9629]; // India fallback

  return (
    <div className="route-optimization">
      <h2>📍 AI Route Optimization</h2>

      <form className="route-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter source city (e.g., Bangalore)"
          value={source}
          onChange={(e) => setSource(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter destination city (e.g., Mumbai)"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Computing..." : "Optimize Route"}
        </button>
      </form>

      {errorMsg && (
        <div className="route-error">
          <p style={{ color: "red", fontWeight: "bold" }}>{errorMsg}</p>
        </div>
      )}

      {result && (
        <div className="route-result">
          <h3>🚗 Optimized Route</h3>
          <p><strong>Distance:</strong> {result.distance}</p>
          <p><strong>Duration:</strong> {result.duration}</p>
          <p><strong>Summary:</strong> {result.summary}</p>
        </div>
      )}

      <div style={{ height: "500px", width: "100%", marginTop: "20px" }}>
        <MapContainer
          center={path.length > 0 ? [path[0].lat, path[0].lng] : defaultCenter}
          zoom={path.length > 0 ? 8 : 5}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {path.length > 0 && (
            <>
              <FitBounds positions={path} />

              <Polyline
                positions={path.map(p => [p.lat, p.lng])}
                pathOptions={{ color: "blue", weight: 5 }}
              />

              <Marker
                position={[path[0].lat, path[0].lng]}
                icon={L.icon({
                  iconUrl: "https://maps.gstatic.com/mapfiles/ms2/micons/green-dot.png",
                  iconSize: [32, 32],
                })}
              >
                <Popup>Start: {finalSource}</Popup>
              </Marker>

              <Marker
                position={[path[path.length - 1].lat, path[path.length - 1].lng]}
                icon={L.icon({
                  iconUrl: "https://maps.gstatic.com/mapfiles/ms2/micons/red-dot.png",
                  iconSize: [32, 32],
                })}
              >
                <Popup>Destination: {finalDestination}</Popup>
              </Marker>
            </>
          )}
        </MapContainer>
      </div>
    </div>
  );
};

export default RouteOptimization;
