// src/components/TripsTable.js
import React from "react";

export default function TripsTable({ trips, onView }) {
  return (
    <table className="driver-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Passenger</th>
          <th>Driver</th>
          <th>Pickup</th>
          <th>Dropoff</th>
          <th>Fare</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {trips.map((t) => (
          <tr key={t.id}>
            <td>{t.date}</td>
            <td>{t.passenger}</td>
            <td>{t.driver}</td>
            <td>{t.pickup}</td>
            <td>{t.dropoff}</td>
            <td>₱{t.fare}</td>
            <td>{t.status}</td>
            <td>
              <button className="btn-login" onClick={() => onView(t)}>
                View
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
