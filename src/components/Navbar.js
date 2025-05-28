import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import logo from "../assets/todagologo.png";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo-container">
        <img src={logo} alt="TODA Go Logo" className="logo-img" />
        <span className="logo-text">Admin</span>
      </div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/drivers">Drivers</Link>
        <Link to="/passengers">Passengers</Link>
        <Link to="/trips">Trips</Link>
        <Link to="/reports">Reports</Link>
        <Link to="/login">Logout</Link>
      </div>
    </nav>
  );
}
