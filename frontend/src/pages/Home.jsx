import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  const navigate = useNavigate();

  const handleExplore = () => {
    navigate("/dashboard");
  };

  const handleLearnMore = () => {
    const section = document.getElementById("h2");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <header className="hero">
        <div className="hero-content">
          <h1>Welcome to NeuroFleetX AI Powered Urban Fl</h1>
          <p>
            By liberating Artificial Intelligence, IoT, and Geospatial Data, we
            enable smart solutions for the future.
          </p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={handleExplore}>
              Explore Services
            </button>
            <button className="btn-secondary" onClick={handleLearnMore}>
              Learn More
            </button>
          </div>
        </div>
      </header>

      {/* Side by side Section */}
      <div className="content-section">
        <div className="text-content">
          <h2 id="h2">Smart AI-Driven Solutions</h2>
          <p>
            We provide cutting-edge AI and IoT-powered platforms that help
            cities become smarter, safer, and more sustainable. Our solutions
            integrate geospatial data with real-time analytics to optimize urban
            infrastructure and improve everyday living.
            <br />
            <br />
            From intelligent traffic management to predictive maintenance of
            utilities, our systems empower governments and organizations to make
            data-driven decisions. We leverage advanced machine learning models
            to forecast trends, detect anomalies, and enhance operational
            efficiency across multiple sectors.
            <br />
            <br />
            Our solutions are designed to reduce environmental impact, conserve
            resources, and foster innovation in urban development. With seamless
            integration, scalability, and security at the core, we are enabling
            the future of connected, resilient, and adaptive smart cities.
          </p>
        </div>
        <div className="image-content">
          <img
            src="https://miro.medium.com/v2/resize:fit:1400/0*71ooRJaolfQL-PWL.jpg"
            alt="AI Solutions"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
