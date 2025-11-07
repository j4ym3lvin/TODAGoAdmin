import React from "react";
import "../App.css";

function StatusPill({ value }) {
  const raw = (value || "").trim();               // handles "Pending  "
  const key = raw.toLowerCase();
  const style = {
    padding: "2px 8px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 700,
    display: "inline-block",
  };

  if (key === "verified") {
    return <span style={{ ...style, background: "#d1fae5", color: "#065f46" }}>{raw}</span>;
  }
  if (key === "pending") {
    return <span style={{ ...style, background: "#fef3c7", color: "#92400e" }}>{raw}</span>;
  }
  // rejected / anything else
  return <span style={{ ...style, background: "#fee2e2", color: "#991b1b" }}>{raw || "Unknown"}</span>;
}

export default function DriverTable({ drivers = [], onVerify, onReject, onView }) {
  const cell = { padding: "0.8rem 1rem", fontSize: 14 };

  return (
    <table className="driver-table">
      <thead>
        <tr>
          <th>NAME</th>
          <th>REGISTRATION NO.</th>
          <th>PLATE NO.</th>
          <th>TODA</th>
          <th>STATUS</th>
          <th style={{ textAlign: "right" }}>ACTIONS</th>
        </tr>
      </thead>

      <tbody>
        {drivers.length === 0 && (
          <tr>
            <td colSpan={6} style={{ padding: "1rem", color: "#6b7280", fontSize: 14 }}>
              No drivers to display.
            </td>
          </tr>
        )}

        {drivers.map((d, i) => {
          const statusRaw = (d.status || "").trim();
          const isPending = statusRaw.toLowerCase() === "pending";
          return (
            <tr key={d.registrationNo || d.plateNo || i}>
              <td style={cell}>{d.name || "—"}</td>
              <td style={cell}>{d.registrationNo || "—"}</td>
              <td style={cell}>{d.plateNo || "—"}</td>
              <td style={cell}>{d.toda || "—"}</td>
              <td style={cell}><StatusPill value={statusRaw} /></td>
              <td style={{ ...cell, textAlign: "right" }}>
                <div style={{ display: "inline-flex", gap: 8 }}>
                  {isPending && (
                    <>
                      <button
                        className="btn-login"
                        style={{ fontSize: 12, padding: "6px 10px" }}
                        onClick={() => onVerify(i)}
                      >
                        Verify
                      </button>
                      <button
                        className="btn-cancel"
                        style={{ fontSize: 12, padding: "6px 10px" }}
                        onClick={() => onReject(i)}
                      >
                        Reject
                      </button>
                    </>
                  )}
                  <button
                    className="btn-login"
                    style={{ fontSize: 12, padding: "6px 10px", background: "#333" }}
                    onClick={() => onView(d)}
                  >
                    View
                  </button>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
