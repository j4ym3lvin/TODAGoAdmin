import React, { useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import TripsTable from "../components/TripsTable";
import ViewTripModal from "../components/ViewTripModal";

const initialTrips = [
  { id: 1, date: "2024-05-28", passenger: "Pedro Santos", driver: "Juan Dela Cruz", pickup: "SM Lucena", dropoff: "Pacific Mall", fare: 50, status: "Completed" },
  { id: 2, date: "2024-05-27", passenger: "Ana Lopez", driver: "Maria Clara", pickup: "Perez Park", dropoff: "Diversion Road", fare: 40, status: "Cancelled" },
];

export default function TripsPage() {
  const [trips, setTrips] = useState(initialTrips);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("");

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return trips.filter((t) => {
      const st = (t.status || "").toLowerCase();
      if (status && st !== status) return false;
      if (!term) return true;
      return [
        t.passenger, t.driver, t.pickup, t.dropoff, t.status, t.date
      ].some((v) => (v || "").toString().toLowerCase().includes(term));
    });
  }, [trips, q, status]);

  return (
    <div>
      <Navbar />
      <div className="dashboard-container">
        {/* Header + search */}
        <div className="dashboard-card" style={{ marginBottom: 16 }}>
          <div style={{ display:"flex", flexWrap:"wrap", gap:12, alignItems:"center", justifyContent:"space-between" }}>
            <h2 style={{ margin:0 }}>Trips History</h2>
            <div style={{ display:"flex", gap:10, alignItems:"center" }}>
              <input
                value={q}
                onChange={(e)=>setQ(e.target.value)}
                placeholder="Search passenger / driver / pickup / dropoff"
                className="input-search"
                style={{ padding:"0.55rem 0.75rem", border:"1px solid #d1d5db", borderRadius:8, minWidth:260 }}
              />
              <select
                value={status}
                onChange={(e)=>setStatus(e.target.value)}
                style={{ padding:"0.55rem 0.75rem", border:"1px solid #d1d5db", borderRadius:8, background:"white" }}
              >
                <option value="">All Status</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
                <option value="pending">Pending</option>
                <option value="enroute">Enroute</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="dashboard-card">
          <TripsTable trips={filtered} onView={setSelectedTrip} />
          <div style={{ marginTop:8, fontSize:12, color:"#6b7280" }}>
            Showing {filtered.length} of {trips.length}
          </div>
        </div>
      </div>

      <ViewTripModal trip={selectedTrip} onClose={()=>setSelectedTrip(null)} />
    </div>
  );
}
  