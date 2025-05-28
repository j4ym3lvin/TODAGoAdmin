// src/pages/TripsPage.js
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import TripsTable from "../components/TripsTable";
import ViewTripModal from "../components/ViewTripModal"; // Modal to view trip details

const initialTrips = [
  {
    id: 1,
    date: "2024-05-28",
    passenger: "Pedro Santos",
    driver: "Juan Dela Cruz",
    pickup: "SM Lucena",
    dropoff: "Pacific Mall",
    fare: 50,
    status: "Completed"
  },
  {
    id: 2,
    date: "2024-05-27",
    passenger: "Ana Lopez",
    driver: "Maria Clara",
    pickup: "Perez Park",
    dropoff: "Diversion Road",
    fare: 40,
    status: "Cancelled"
  },
  // ...add more sample trips as needed
];

export default function TripsPage() {
  const [trips, setTrips] = useState(initialTrips);
  const [selectedTrip, setSelectedTrip] = useState(null);

  const handleView = (trip) => setSelectedTrip(trip);
  const handleClose = () => setSelectedTrip(null);

  return (
    <div>
      <Navbar />
      <div style={{ padding: "2rem" }}>
        <h2>Trips History</h2>
        <TripsTable trips={trips} onView={handleView} />
      </div>
      <ViewTripModal trip={selectedTrip} onClose={handleClose} />
    </div>
  );
}
