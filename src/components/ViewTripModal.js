import React from "react";
import ReactDOM from "react-dom";

export default function ViewTripModal({ trip, onClose }) {
  if (!trip) return null;

  const modal = (
    <div className="modal-bg" onClick={onClose}>
      <div
        className="modal-box modal-solid"
        onClick={(e)=>e.stopPropagation()}
        style={{ width:"min(92vw, 480px)" }}
      >
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
          <h2 style={{ margin:0 }}>Trip Details</h2>
          <button className="btn-cancel" onClick={onClose} style={{ padding:"6px 10px", fontSize:12 }}>Close</button>
        </div>
        <div style={{ lineHeight:1.6 }}>
          <p><strong>Date:</strong> {trip.date}</p>
          <p><strong>Passenger:</strong> {trip.passenger}</p>
          <p><strong>Driver:</strong> {trip.driver}</p>
          <p><strong>Pickup:</strong> {trip.pickup}</p>
          <p><strong>Dropoff:</strong> {trip.dropoff}</p>
          <p><strong>Fare:</strong> ₱{trip.fare}</p>
          <p><strong>Status:</strong> {trip.status}</p>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modal, document.body);
}
