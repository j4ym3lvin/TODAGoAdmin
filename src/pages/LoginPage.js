import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import logo from "../assets/todagologo.png";
import { API_BASE_URL } from "../config.ts"; // keep if you already have it

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [remember, setRemember] = useState(true);
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setBusy(true);

    // ---- DEMO fallback: "admin"/"admin" still works
    if (username === "admin" && password === "admin") {
      if (remember) {
        try { localStorage.setItem("tga_admin", JSON.stringify({ u: "admin" })); } catch {}
      }
      setBusy(false);
      return navigate("/");
    }

    // ---- Backend (optional; safe if API isn’t ready yet)
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const text = await res.text(); // tolerate non-JSON
      let data = {};
      try { data = JSON.parse(text); } catch {}

      if (!res.ok) {
        const msg = data?.message || data?.error || "Invalid credentials.";
        throw new Error(msg);
      }

      // expected: { token, admin: { name, role, ... } }
      if (remember) {
        try { localStorage.setItem("tga_admin", JSON.stringify({ token: data.token, admin: data.admin })); } catch {}
      }
      navigate("/");
    } catch (err) {
      setError(err.message || "Login failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="login-bg">
      <form className="login-box" onSubmit={handleLogin}>
        <img src={logo} alt="TODA Go Logo" style={{ height: 80, marginBottom: 0 }} />
        <h2>ADMIN LOGIN</h2>

        {error && (
          <div className="auth-error">
            {error}
          </div>
        )}

        <label>Username:</label>
        <input
          type="text"
          style={{ width: "94.5%" }}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoFocus
          autoComplete="username"
          required
        />

        <label>Password:</label>
        <div style={{ position: "relative", width: "100%" }}>
          <input
            type={showPw ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
            style={{  marginBottom: 0, width: "94.5%" }}
          />
          <button
            type="button"
            onClick={() => setShowPw((s) => !s)}
            style={{
              position: "absolute",
              right: 2,
              top: "50%",
              transform: "translateY(-50%)",
              border: "none",
              background: "transparent",
              cursor: "pointer",
              fontSize: 13,
              color: "#1476a7",
            }}
            aria-label={showPw ? "Hide password" : "Show password"}
          >
            {showPw ? "Hide" : "Show"}
          </button>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6, justifyContent: "flex-end"}}>
          <input
            id="remember"
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            style={{width: 10, padding: 0, margin: 0}}

          />
          <label htmlFor="remember" style={{ margin: 0, fontSize: 14, color: "#444" }}>
            Remember me
          </label>
        </div>

        <div className="btn-row">
          <button
            type="button"
            className="btn-cancel"
            onClick={() => {
              setUsername("");
              setPassword("");
              setError("");
            }}
            disabled={busy}
          >
            Cancel
          </button>
          <button type="submit" className="btn-login" disabled={busy}>
            {busy ? "Signing in…" : "Login"}
          </button>
        </div>

        <div style={{ marginTop: 10, fontSize: 12, color: "#6b7280", textAlign: "center" }}>
          Tip: demo login is <b>admin / admin</b>
        </div>
      </form>
    </div>
  );
}
