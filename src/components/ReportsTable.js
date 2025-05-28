// src/components/ReportsTable.js
import React from "react";

export default function ReportsTable({ reports, onView }) {
  return (
    <table className="driver-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Reporter</th>
          <th>Reported User</th>
          <th>Type</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {reports.map((r) => (
          <tr key={r.id}>
            <td>{r.date}</td>
            <td>{r.reporter}</td>
            <td>{r.reportedUser}</td>
            <td>{r.type}</td>
            <td>{r.status}</td>
            <td>
              <button className="btn-login" onClick={() => onView(r)}>
                View
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
