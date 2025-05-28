import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../App.css';
import logo from "../assets/todagologo.png";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Temporary login logic
const handleLogin = (e) => {
  e.preventDefault();
  // Replace with real validation later!
  if (username === "admin" && password === "admin") {
    navigate("/"); // Go to dashboard/home
  } else {
    alert("Invalid credentials!");
  }
};

  return (
    <div className="login-bg">
      <form className="login-box" onSubmit={handleLogin}>
        <img src={logo} alt="TODA Go Logo" style={{ height: "80px", marginBottom: "0px" }} />
        <h2>ADMIN LOGIN</h2>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <div className="btn-row">
          <button type="button" className="btn-cancel" onClick={() => { setUsername(""); setPassword(""); }}>
            Cancel
          </button>
          <button type="submit" className="btn-login">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
