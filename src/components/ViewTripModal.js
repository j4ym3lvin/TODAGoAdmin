// src/components/ViewTripModal.js
import React from "react";

export default function ViewTripModal({ trip, onClose }) {
  if (!trip) return null;

  return (
    <div className="modal-bg">
      <div className="modal-box">
        <h2>Trip Details</h2>
        <p><strong>Date:</strong> {trip.date}</p>
        <p><strong>Passenger:</strong> {trip.passenger}</p>
        <p><strong>Driver:</strong> {trip.driver}</p>
        <p><strong>Pickup:</strong> {trip.pickup}</p>
        <p><strong>Dropoff:</strong> {trip.dropoff}</p>
        <p><strong>Fare:</strong> ₱{trip.fare}</p>
        <p><strong>Status:</strong> {trip.status}</p>
        <div className="btn-row" style={{ marginTop: 20 }}>
          <button className="btn-cancel" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
