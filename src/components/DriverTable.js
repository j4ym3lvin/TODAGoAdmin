import React from "react";
import "../App.css";

export default function DriverTable({ drivers, onVerify, onReject, onView }) {
  return (
    <table className="driver-table">
      <thead>
        <tr>
          <th>NAME</th>
          <th>REGISTRATION NO.</th>
          <th>PLATE NO.</th>
          <th>TODA</th>
          <th>STATUS</th>
          <th>ACTIONS</th>
        </tr>
      </thead>
      <tbody>
        {drivers.map((d, i) => (
          <tr key={i}>
            <td>{d.name}</td>
            <td>{d.registrationNo}</td>
            <td>{d.plateNo}</td>
            <td>{d.toda}</td>
            <td
              style={{
                color: d.status === "Pending" ? "orange" :
                      d.status === "Verified" ? "green" :
                      "red",
                fontWeight: "bold",
              }}
            >
              {d.status}
            </td>
            <td>
            {d.status === "Pending" && (
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button
                  className="btn-login"
                  style={{ fontSize: "0.8rem", padding: "0.2rem 0.6rem" }}
                  onClick={() => onVerify(i)}
                >
                  Verify
                </button>
                <button
                  className="btn-cancel"
                  style={{ fontSize: "0.8rem", padding: "0.2rem 0.6rem" }}
                  onClick={() => onReject(i)}
                >
                  Reject
                </button>
                <button
                  className="btn-login"
                  style={{ fontSize: "0.8rem", padding: "0.2rem 0.6rem", background: "#333" }}
                  onClick={() => onView(d)}
                >
                  View
                </button>
              </div>
            )}
          </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
