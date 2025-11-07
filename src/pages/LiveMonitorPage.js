import React, { useEffect, useMemo, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import { API_BASE_URL } from "../config.ts";
import LiveMap from "../components/LiveMap";

export default function LiveMonitorPage() {
  const [drivers, setDrivers] = useState([]);
  const [todaLocations, setTodaLocations] = useState([]);

  const [onlyActive, setOnlyActive] = useState(true);
  const [polling, setPolling] = useState(true);
  const timerRef = useRef(null);

  // seed demo data instantly to avoid blank map on first paint
  useEffect(() => {
    setDrivers([
      { name: "Juan Dela Cruz", latitude: 13.942, longitude: 121.624, status: "Active", toda: "San Roque" },
      { name: "Maria Clara",    latitude: 13.945, longitude: 121.622, status: "Active", toda: "Ibabang Dupay" },
    ]);
    setTodaLocations([
      { name: "San Roque TODA",     latitude: 13.940, longitude: 121.625, street: "F. Gomez", barangay: "San Roque" },
      { name: "Ibabang Dupay TODA", latitude: 13.943, longitude: 121.621, street: "Maharlika Hwy", barangay: "Ibabang Dupay" },
    ]);
  }, []);

  async function fetchLive() {
    try {
      // Drivers
      const r1 = await fetch(`${API_BASE_URL}/api/drivers/active`, { cache: "no-store" });
      if (r1.ok) {
        const d = await r1.json();
        if (Array.isArray(d)) setDrivers(d);
      }
      // TODA locations
      const r2 = await fetch(`${API_BASE_URL}/api/toda/locations`, { cache: "no-store" });
      if (r2.ok) {
        const t = await r2.json();
        if (Array.isArray(t)) setTodaLocations(t);
      }
    } catch (e) {
      console.error("LiveMonitor fetch error:", e);
    }
  }

  // initial load
  useEffect(() => {
    fetchLive();
  }, []);

  // polling every 10s (safe stop/start)
  useEffect(() => {
    if (!polling) {
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = null;
      return;
    }
    timerRef.current = setInterval(fetchLive, 10000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = null;
    };
  }, [polling]);

  const shownDrivers = useMemo(() => {
    if (!onlyActive) return drivers;
    return drivers.filter(d => (d.status || "").toLowerCase() === "active");
  }, [drivers, onlyActive]);

  return (
    <div>
      <Navbar />

      <div className="dashboard-container">
        <div className="dashboard-card" style={{ marginBottom: 12 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
            <h2 style={{ margin: 0 }}>Live Monitor</h2>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <label style={{ display: "inline-flex", gap: 6, alignItems: "center" }}>
                <input
                  type="checkbox"
                  checked={onlyActive}
                  onChange={(e) => setOnlyActive(e.target.checked)}
                />
                Show active drivers only
              </label>
              <label style={{ display: "inline-flex", gap: 6, alignItems: "center" }}>
                <input
                  type="checkbox"
                  checked={polling}
                  onChange={(e) => setPolling(e.target.checked)}
                />
                Auto-refresh (10s)
              </label>
              <button className="btn-login" onClick={fetchLive}>Refresh now</button>
            </div>
          </div>
          <div style={{ fontSize: 12, color: "#6b7280", marginTop: 6 }}>
            Drivers: {shownDrivers.length} / {drivers.length} • TODAs: {todaLocations.length}
          </div>
        </div>

        <div className="dashboard-card">
          <LiveMap drivers={shownDrivers} todaLocations={todaLocations} />
        </div>
      </div>
    </div>
  );
}
