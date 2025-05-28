// src/components/PassengerTable.js
import React from "react";

export default function PassengerTable({ passengers }) {
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
        {passengers.map((p, i) => (
          <tr key={i}>
            <td>{p.name}</td>
            <td>{p.registrationNo}</td>
            <td>{p.contact}</td>
            <td>{p.email}</td>
            <td>{p.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
