import React, { useEffect, useState } from "react";
import axios from "axios";
import '../styles/CustomerBooking.css';

const CustomerBooking = () => {
  const [drivers, setDrivers] = useState([]);
  const [booking, setBooking] = useState({
    customerName: "",
    customerEmail: "",
    source: "",
    destination: "",
    driverId: null,
  });

  // For demo, using default drivers
  useEffect(() => {
    const defaultDrivers = [
      { id: 1, name: "John Doe", phone: "1234567890", email: "your-email@gmail.com" },
      { id: 2, name: "Jane Smith", phone: "9876543210", email: "your-email@gmail.com" },
      { id: 3, name: "Alex Brown", phone: "5555555555", email: "your-email@gmail.com" }
    ];
    setDrivers(defaultDrivers);
  }, []);

  const handleBook = (driverId) => {
    if (!booking.customerName || !booking.customerEmail || !booking.source || !booking.destination) {
      alert("❌ Please fill all fields!");
      return;
    }

    const payload = {
      ...booking,
      driverId: driverId
    };

    axios.post("http://localhost:8080/api/bookings/book", payload)
      .then(res => {
        alert(`✅ Booking successful! Email sent to driver.`);
        setDrivers(drivers.filter(d => d.id !== driverId));
        setBooking({
          customerName: "",
          customerEmail: "",
          source: "",
          destination: "",
          driverId: null
        });
      })
      .catch(err => {
        console.error(err);
        alert("❌ Booking failed. Try again.");
      });
  };

  return (
    <div className="booking-container">
      <h2>🚖 Customer Booking</h2>

      <input
        type="text"
        placeholder="Your Name"
        value={booking.customerName}
        onChange={(e) => setBooking({ ...booking, customerName: e.target.value })}
      />
      <input
        type="email"
        placeholder="Your Email"
        value={booking.customerEmail}
        onChange={(e) => setBooking({ ...booking, customerEmail: e.target.value })}
      />

      <div className="route-inputs">
        <input
          type="text"
          placeholder="Pickup Location"
          value={booking.source}
          onChange={(e) => setBooking({ ...booking, source: e.target.value })}
        />
        <span className="route-arrow">➡️</span>
        <input
          type="text"
          placeholder="Destination"
          value={booking.destination}
          onChange={(e) => setBooking({ ...booking, destination: e.target.value })}
        />
      </div>

      <h3>Available Drivers</h3>
      {drivers.length === 0 ? (
        <p>No drivers available</p>
      ) : (
        <div className="driver-list">
          {drivers.map(driver => (
            <div key={driver.id} className="driver-card" onClick={() => handleBook(driver.id)}>
              <p><strong>{driver.name}</strong></p>
              <p>📞 {driver.phone}</p>
              <p>📧 {driver.email}</p>
              <button>Book This Driver</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomerBooking;
