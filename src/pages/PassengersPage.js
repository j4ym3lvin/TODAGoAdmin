// src/pages/PassengersPage.js
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import PassengerTable from "../components/PassengerTable";
import AddEditPassenger from "../components/AddEditPassenger"; // Create this like the driver modal

const initialPassengers = [
  {
    name: "Pedro Santos",
    registrationNo: "PS-001",
    contact: "09123456789",
    email: "pedro@email.com",
    status: "Active",
  },
  {
    name: "Ana Lopez",
    registrationNo: "PS-002",
    contact: "09987654321",
    email: "ana@email.com",
    status: "Inactive",
  },
  // ...add more if you want
];

export default function PassengersPage() {
  const [passengers, setPassengers] = useState(initialPassengers);
  const [showModal, setShowModal] = useState(false);

  const handleAddPassenger = (newPassenger) => {
    setPassengers([...passengers, newPassenger]);
  };

  return (
    <div>
      <Navbar />
      <div style={{ padding: "2rem" }}>
        <h2>Passengers Monitoring</h2>
        <PassengerTable passengers={passengers} />
        <div style={{ marginTop: "2rem", display: "flex", justifyContent: "flex-end", gap: "1rem" }}>
          <button className="btn-cancel" onClick={() => window.history.back()}>Back</button>
          <button className="btn-login" onClick={() => setShowModal(true)}>
            Register New Passenger
          </button>
        </div>
      </div>
      <AddEditPassenger
        open={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleAddPassenger}
      />
    </div>
  );
}
