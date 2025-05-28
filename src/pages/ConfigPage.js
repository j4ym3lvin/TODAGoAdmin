// src/pages/ConfigPage.js
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import LiveMap from "../components/LiveMap";
import 'leaflet/dist/leaflet.css';

export default function ConfigPage() {
  const [colorCode, setColorCode] = useState("green");
  const [fareRate, setFareRate] = useState(20);
  const [drivers, setDrivers] = useState([]);
  const [todaLocations, setTodaLocations] = useState([]);

  useEffect(() => {
    // Dummy drivers
    setDrivers([
      { name: "Juan Dela Cruz", latitude: 13.942, longitude: 121.624, status: "Active" },
      { name: "Maria Clara", latitude: 13.945, longitude: 121.622, status: "Active" },
    ]);

    // Dummy TODA locations
    setTodaLocations([
      { name: "San Roque TODA", latitude: 13.940, longitude: 121.625 },
      { name: "Ibabang Dupay TODA", latitude: 13.943, longitude: 121.621 },
    ]);
  }, []);

  const handleColorChange = (color) => setColorCode(color);
  const handleFareUpdate = () => alert(`Fare updated to Php ${fareRate}`);
  const handleTodaEdit = () => alert("Navigate to Edit TODA form...");
  const handleTodaAdd = () => alert("Navigate to Add TODA form...");

  return (
    <div>
      <Navbar />
      <div className="dashboard-container">
        <h2>Configuration Panel</h2>

        {/* Big map */}
        <div className="full-map">
          <LiveMap drivers={drivers} todaLocations={todaLocations} />
        </div>

        {/* Bottom row */}
        <div className="bottom-controls">
          <div className="config-details">
            <div className="config-detail">
              <strong>Current Color Code:</strong> {colorCode}
            </div>
            <div className="config-detail">
              <strong>Fare Rate:</strong> Php {fareRate}
            </div>
            <div className="color-options">
              <label>
                <input
                  type="radio"
                  name="color"
                  value="green"
                  checked={colorCode === "green"}
                  onChange={() => handleColorChange("green")}
                />
                Green
              </label>
              <label>
                <input
                  type="radio"
                  name="color"
                  value="yellow"
                  checked={colorCode === "yellow"}
                  onChange={() => handleColorChange("yellow")}
                />
                Yellow
              </label>
              <button className="btn-login" onClick={() => alert(`Color updated to ${colorCode}`)}>Update Color</button>
            </div>
            <div className="fare-input">
              <span>Php</span>
              <input
                type="number"
                min="0"
                value={fareRate}
                onChange={(e) => setFareRate(e.target.value)}
              />
              <button className="btn-login" onClick={handleFareUpdate}>Update Fare</button>
            </div>
          </div>

          <div className="config-actions">
            <button className="btn-login" onClick={handleTodaAdd}>Add TODA</button>
            <button className="btn-login" onClick={handleTodaEdit}>Edit TODA</button>
            <button className="btn-cancel" onClick={() => window.history.back()}>Back</button>
          </div>
        </div>
      </div>
    </div>
  );
}
