import React from "react";

function StatusPill({ value }) {
  const raw = (value || "").trim();
  const k = raw.toLowerCase();
  const base = { padding: "2px 8px", borderRadius: 999, fontSize: 12, fontWeight: 700, display: "inline-block" };
  if (k === "active")   return <span style={{ ...base, background:"#d1fae5", color:"#065f46" }}>{raw || "Active"}</span>;
  if (k === "inactive") return <span style={{ ...base, background:"#fee2e2", color:"#991b1b" }}>{raw || "Inactive"}</span>;
  return <span style={{ ...base, background:"#e5e7eb", color:"#374151" }}>{raw || "Unknown"}</span>;
}

export default function PassengerTable({ passengers = [] }) {
  return (
    <table className="driver-table">
      <thead>
        <tr>
          <th>NAME</th>
          <th>REGISTRATION NO.</th>
          <th>CONTACT</th>
          <th>EMAIL</th>
          <th>STATUS</th>
        </tr>
      </thead>
      <tbody>
        {passengers.length === 0 && (
          <tr>
            <td colSpan={5} style={{ padding: "1rem", color: "#6b7280" }}>
              No passengers to display.
            </td>
          </tr>
        )}
        {passengers.map((p, i) => (
          <tr key={p.registrationNo || p.email || i}>
            <td>{p.name || "—"}</td>
            <td>{p.registrationNo || "—"}</td>
            <td>{p.contact || "—"}</td>
            <td>{p.email || "—"}</td>
            <td><StatusPill value={p.status} /></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
