import React from "react";

function StatusPill({ value }) {
  const raw = (value || "").trim();
  const k = raw.toLowerCase();
  const base = { padding:"2px 8px", borderRadius:999, fontSize:12, fontWeight:700 };
  if (k === "open")        return <span style={{ ...base, background:"#fef3c7", color:"#92400e" }}>{raw}</span>;
  if (k === "in progress") return <span style={{ ...base, background:"#e0f2fe", color:"#075985" }}>{raw}</span>;
  if (k === "resolved")    return <span style={{ ...base, background:"#d1fae5", color:"#065f46" }}>{raw}</span>;
  if (k === "dismissed")   return <span style={{ ...base, background:"#e5e7eb", color:"#374151" }}>{raw}</span>;
  return <span style={{ ...base, background:"#e5e7eb", color:"#374151" }}>{raw || "Unknown"}</span>;
}

export default function TripsTable({ trips = [], onView }) {
  return (
    <table className="driver-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Date</th>
          <th>Passeger</th>
          <th>Driver</th>
          <th>Pick-up</th>
          <th>Drop-off</th>
          <th>Status</th>
          <th style={{ textAlign:"right" }}>Action</th>
        </tr>
      </thead>
      <tbody>
        {trips.length === 0 && (
          <tr>
            <td colSpan={7} style={{ padding:"1rem", color:"#6b7280" }}>No reports found.</td>
          </tr>
        )}
        {trips.map((r) => (
          <tr key={r.id}>
            <td>{r.id}</td>
            <td>{r.date}</td>
            <td>{r.passenger}</td>
            <td>{r.driver}</td>
            <td>{r.pickup}</td>
            <td>{r.dropoff}</td>
            <td><StatusPill value={r.status} /></td>
            <td style={{ textAlign:"right" }}>
              <button className="btn-login btn-small" onClick={() => onView(r)}>View</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
