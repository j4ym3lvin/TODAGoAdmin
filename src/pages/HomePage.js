// src/pages/HomePage.js
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { API_BASE_URL } from "../config.ts";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import LiveMap from "../components/LiveMap";
import { useNavigate } from "react-router-dom";


const driverIcon = new L.Icon({
  iconUrl: "/driver-icon.png", // use your own icon
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});


export default function HomePage() {
  const [stats, setStats] = useState({ driverCount: 0, passengerCount: 0 });
  const [drivers, setDrivers] = useState([]);
  const [todaLocations, setTodaLocations] = useState([]);
  const navigate = useNavigate();

  const handleLiveMonitorClick = () => {
    navigate("/config");
  };

  useEffect(() => {
      setDrivers([
    { name: "Juan Dela Cruz", latitude: 13.942, longitude: 121.624, status: "Active" },
    { name: "Maria Clara", latitude: 13.945, longitude: 121.622, status: "Active" },
  ]);

  setTodaLocations([
    { name: "San Roque TODA", latitude: 13.940, longitude: 121.625 },
    { name: "Ibabang Dupay TODA", latitude: 13.943, longitude: 121.621 },
  ]);
  
    fetch(`${API_BASE_URL}/api/stats/counts`)
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error(err));
    fetch(`${API_BASE_URL}/api/drivers/active`) // Your backend route for live driver locations
      .then(res => res.json())
      .then(data => setDrivers(data))
      .catch(err => console.error(err));

    fetch(`${API_BASE_URL}/api/toda/locations`) // Your backend route for TODA pins
      .then(res => res.json())
      .then(data => setTodaLocations(data))
      .catch(err => console.error(err));

    fetch(`${API_BASE_URL}/api/drivers/active`)
      .then(res => res.json())
      .then(data => setDrivers(data))
      .catch(err => console.error(err));

    fetch(`${API_BASE_URL}/api/toda/locations`)
      .then(res => res.json())
      .then(data => setTodaLocations(data))
      .catch(err => console.error(err));
  }, []);
  return (
    <div>
      <Navbar />
      <div className="dashboard-container">
        <h2 style={{ marginTop: 0 }}>
          Welcome, <b>Admin!</b>
        </h2>
        <div className="dashboard-main">
          <div className="dashboard-top">
            <div
              className="dashboard-live"
              onClick={handleLiveMonitorClick}
              style={{ cursor: "pointer" }}>
                  <b>LIVE MONITOR</b>
              <LiveMap drivers={drivers} todaLocations={todaLocations} />
            </div>
            <div className="dashboard-stats">
              <div className="dashboard-stat">
                <div className="stat-label">NUMBER OF<br />REGISTERED DRIVERS</div>
                <div className="stat-number">{stats.driverCount}</div>
              </div>
              <div className="dashboard-stat">
                <div className="stat-label">NUMBER OF<br />REGISTERED USERS</div>
                <div className="stat-number">{stats.passengerCount}</div>
              </div>
            </div>
          </div>
          <div className="dashboard-bottom">
            <div className="dashboard-card" style={{ marginBottom: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <b>DRIVERS MONITORING</b>
                <Link to="/drivers" className="btn-login" style={{ fontSize: 14 }}>VIEW ALL</Link>
              </div>
              <div className="dashboard-table-header" style={{ marginTop: 10 }}>
              <span>NAME</span>
              <span>REGISTRATION NO.</span>
              <span>PLATE NO.</span>
              <span>TODA</span>
              <span>STATUS</span>
            </div>
            </div>
            <div className="dashboard-card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <b>REPORTS</b>
                <Link to="/reports" className="btn-login" style={{ fontSize: 14 }}>VIEW ALL</Link>
              </div>
              <div className="dashboard-table-header" style={{ marginTop: 10 }}>
                <span>NAME</span>
                <span>REPORT</span>
                <span>DATE</span>
                <span>STATUS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
