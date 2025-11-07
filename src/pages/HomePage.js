import React, { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import { API_BASE_URL } from "../config.ts";
import { Link } from "react-router-dom";
import {
  LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
} from "recharts";

function EmptyState({ text }) {
  return <div style={{ padding: "16px 0", color: "#6b7280", fontSize: 14 }}>{text}</div>;
}

export default function HomePage() {
  const [stats, setStats] = useState({ driverCount: 0, passengerCount: 0 });
  const [drivers, setDrivers] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [loading, setLoading] = useState({ stats: true, drivers: true, monthly: true });
  const [error, setError] = useState({ stats: "", drivers: "", monthly: "" });

  useEffect(() => {
    const ctrl = new AbortController();

    Promise.allSettled([
      fetch(`${API_BASE_URL}/api/stats/counts`, { signal: ctrl.signal })
        .then(r => (r.ok ? r.json() : Promise.reject(r.statusText)))
        .then(setStats)
        .catch(e => setError(p => ({ ...p, stats: String(e) })))
        .finally(() => setLoading(p => ({ ...p, stats: false }))),

      fetch(`${API_BASE_URL}/api/drivers/active`, { signal: ctrl.signal })
        .then(r => (r.ok ? r.json() : Promise.reject(r.statusText)))
        .then(d => setDrivers(Array.isArray(d) ? d.slice(0, 5) : []))
        .catch(e => setError(p => ({ ...p, drivers: String(e) })))
        .finally(() => setLoading(p => ({ ...p, drivers: false }))),

      fetch(`${API_BASE_URL}/api/stats/monthly`, { signal: ctrl.signal })
        .then(r => (r.ok ? r.json() : Promise.reject(r.statusText)))
        .then(d => setMonthlyData(Array.isArray(d) ? d : []))
        .catch(e => setError(p => ({ ...p, monthly: String(e) })))
        .finally(() => setLoading(p => ({ ...p, monthly: false }))),
    ]);

    return () => ctrl.abort();
  }, []);

  const chartData = useMemo(
    () => (monthlyData.length ? monthlyData : [{ month: "—", trips: 0, users: 0, drivers: 0 }]),
    [monthlyData]
  );

  const btnStyle = {
    background: "#1e88e5",
    color: "#fff",
    padding: "6px 12px",
    borderRadius: 8,
    fontSize: 12,
    fontWeight: 600,
    display: "inline-block",
  };

  const cardStyle = {
    background: "#fff",
    borderRadius: 16,
    boxShadow: "0 8px 22px rgba(0,0,0,0.06)",
    padding: 24,
  };

  const statLabel = { color: "#6b7280", fontWeight: 600, lineHeight: 1.2, whiteSpace: "pre-line" };
  const statNumberBlue = { fontSize: 36, fontWeight: 800, color: "#0ea5e9", marginTop: 8 };
  const statNumberGreen = { fontSize: 36, fontWeight: 800, color: "#10b981", marginTop: 8 };

  return (
    <div className="dashboard-container">
      <Navbar />

      <div className="dashboard-container" style={{ padding: 24, maxWidth: 1200, margin: "0 auto" }}>
        <div className="dashboard-main" style={{ display: "grid", gap: 24 }}>

          {/* Top Stats */}
          <div className="dashboard-stats" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            <div className="dashboard-stat" style={cardStyle}>
              <div style={statLabel}>NUMBER OF{"\n"}REGISTERED DRIVERS</div>
              <div style={statNumberBlue}>{loading.stats ? "…" : stats.driverCount}</div>
            </div>

            <div className="dashboard-stat" style={cardStyle}>
              <div style={statLabel}>NUMBER OF{"\n"}REGISTERED USERS</div>
              <div style={statNumberGreen}>{loading.stats ? "…" : stats.passengerCount}</div>
            </div>
          </div>

          {/* Visualization */}
          <div className="dashboard-card" style={cardStyle}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <b>MONTHLY VISUALIZATION</b>
              <span style={{ color: "#6b7280", fontSize: 12 }}>Trips, Users, Drivers</span>
            </div>

            <div style={{ width: "100%", height: 320 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="trips" stroke="#3b82f6" name="Trips" dot={false} />
                  <Line type="monotone" dataKey="users" stroke="#10b981" name="Users" dot={false} />
                  <Line type="monotone" dataKey="drivers" stroke="#f59e0b" name="Drivers" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {!monthlyData.length && !loading.monthly && (
              <EmptyState text="No monthly data yet." />
            )}
            {error.monthly && <div style={{ color: "#dc2626", fontSize: 12, marginTop: 8 }}>Chart error: {error.monthly}</div>}
          </div>

          {/* Bottom: Drivers & Reports */}
          <div className="dashboard-bottom" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            {/* Drivers */}
            <div className="dashboard-card" style={cardStyle}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <b>DRIVERS MONITORING</b>
                <Link to="/drivers" style={btnStyle}>VIEW ALL</Link>
              </div>

              <div className="dashboard-table-header" style={{ marginTop: 16, display: "grid", gridTemplateColumns: "2fr 1.5fr 1.5fr 1fr 1fr", fontWeight: 600, color: "#6b7280", fontSize: 14 }}>
                <span>NAME</span>
                <span>REGISTRATION NO.</span>
                <span>PLATE NO.</span>
                <span>TODA</span>
                <span>STATUS</span>
              </div>

              <div>
                {loading.drivers && <EmptyState text="Loading drivers…" />}
                {!loading.drivers && !drivers.length && <EmptyState text="No active drivers right now." />}

                {!loading.drivers && drivers.map((d, i) => (
                  <div key={i} style={{ display: "grid", gridTemplateColumns: "2fr 1.5fr 1.5fr 1fr 1fr", padding: "10px 0", borderTop: "1px solid #f1f5f9", fontSize: 14 }}>
                    <span title={d.driverName}>{d.driverName || `${d.firstName || ""} ${d.lastName || ""}`}</span>
                    <span>{d.franchiseNumber || d.registrationNo || "—"}</span>
                    <span>{d.plateNumber || d.plateNo || "—"}</span>
                    <span>{d.todaName || d.toda || "—"}</span>
                    <span>
                      <span style={{
                        padding: "2px 8px",
                        borderRadius: 999,
                        fontSize: 12,
                        fontWeight: 600,
                        background: (d.status || d.online) ? "#d1fae5" : "#e5e7eb",
                        color: (d.status || d.online) ? "#065f46" : "#374151",
                      }}>
                        {(d.status || (d.online ? "online" : "offline"))}
                      </span>
                    </span>
                  </div>
                ))}

                {error.drivers && <div style={{ color: "#dc2626", fontSize: 12, marginTop: 8 }}>Drivers error: {error.drivers}</div>}
              </div>
            </div>

            {/* Reports (placeholder) */}
            <div className="dashboard-card" style={cardStyle}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <b>REPORTS</b>
                <Link to="/reports" style={btnStyle}>VIEW ALL</Link>
              </div>

              <div className="dashboard-table-header" style={{ marginTop: 16, display: "grid", gridTemplateColumns: "2fr 2fr 1fr 1fr", fontWeight: 600, color: "#6b7280", fontSize: 14 }}>
                <span>NAME</span>
                <span>REPORT</span>
                <span>DATE</span>
                <span>STATUS</span>
              </div>

              <EmptyState text="Reports feed will be connected next step." />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
