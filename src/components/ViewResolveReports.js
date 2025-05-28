// src/components/ViewResolveReport.js
import React from "react";

export default function ViewResolveReport({ report, onClose, onResolve }) {
  if (!report) return null;

  return (
    <div className="modal-bg">
      <div className="modal-box">
        <h2>Report Details</h2>
        <p><strong>Date:</strong> {report.date}</p>
        <p><strong>Reporter:</strong> {report.reporter}</p>
        <p><strong>Reported User:</strong> {report.reportedUser}</p>
        <p><strong>Type:</strong> {report.type}</p>
        <p><strong>Details:</strong> {report.details}</p>
        <p><strong>Status:</strong> {report.status}</p>
        <div className="btn-row" style={{ marginTop: 20 }}>
          <button className="btn-cancel" onClick={onClose}>Close</button>
          {report.status !== "Resolved" && (
            <button className="btn-login" onClick={() => onResolve(report.id)}>
              Mark as Resolved
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
