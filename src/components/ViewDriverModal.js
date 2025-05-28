import React from "react";
import "../App.css";

export default function ViewDriverModal({ driver, open, onClose }) {
  if (!open) return null;

  return (
    <div className="modal-bg">
      <div className="modal-box" style={{ maxWidth: "500px" }}>
        <h2>Driver Details</h2>
        <p><strong>Name:</strong> {driver.name}</p>
        <p><strong>Registration No.:</strong> {driver.registrationNo}</p>
        <p><strong>Plate No.:</strong> {driver.plateNo}</p>
        <p><strong>TODA:</strong> {driver.toda}</p>

        <div style={{ marginTop: "1rem" }}>
          <strong>Selfie:</strong><br />
          <img
            src={driver.selfie || "/placeholder-selfie.png"} // Add real image URLs later!
            alt="Driver Selfie"
            style={{ width: "100%", borderRadius: "8px", marginBottom: "1rem" }}
          />

          <strong>License:</strong><br />
          <img
            src={driver.license || "/placeholder-license.png"}
            alt="Driver License"
            style={{ width: "100%", borderRadius: "8px" }}
          />
        </div>

        <div className="btn-row" style={{ marginTop: "1rem" }}>
          <button className="btn-cancel" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
