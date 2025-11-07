import React, { useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import PassengerTable from "../components/PassengerTable";
import AddEditPassenger from "../components/AddEditPassenger";

const initialPassengers = [
  { name: "Pedro Santos", registrationNo: "PS-001", contact: "09123456789", email: "pedro@email.com", status: "Active" },
  { name: "Ana Lopez",   registrationNo: "PS-002", contact: "09987654321", email: "ana@email.com",   status: "Inactive" },
];

export default function PassengersPage() {
  const [passengers, setPassengers] = useState(initialPassengers);
  const [showModal, setShowModal] = useState(false);
  const [q, setQ] = useState("");          // <-- search text
  const [status, setStatus] = useState(""); // <-- status filter (optional)

  const handleAddPassenger = (p) => setPassengers((old) => [...old, p]);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return passengers.filter((p) => {
      if (status && (p.status || "").toLowerCase() !== status) return false;
      if (!term) return true;
      return [
        p.name, p.registrationNo, p.contact, p.email, p.status
      ].some((v) => (v || "").toString().toLowerCase().includes(term));
    });
  }, [passengers, q, status]);

  return (
    <div>
      <Navbar />

      <div className="dashboard-container">
        {/* Header + Actions */}
        <div className="dashboard-card" style={{ marginBottom: 12 }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", justifyContent: "space-between" }}>
            <h2 style={{ margin: 0 }}>Passengers Monitoring</h2>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              {/* Search box */}
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search name / reg no / contact / email"
                className="input-search"
                style={{
                  padding: "0.55rem 0.75rem",
                  border: "1px solid #d1d5db",
                  borderRadius: 8,
                  minWidth: 260,
                }}
              />
              {/* Status filter (optional) */}
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                style={{
                  padding: "0.55rem 0.75rem",
                  border: "1px solid #d1d5db",
                  borderRadius: 8,
                  background: "white",
                }}
              >
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>

              <button className="btn-login btn-small" onClick={() => setShowModal(true)}>
                Register New Passenger
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="dashboard-card">
          <PassengerTable passengers={filtered} />
          {/* Tiny footer showing counts */}
          <div style={{ marginTop: 8, fontSize: 12, color: "#6b7280" }}>
            Showing {filtered.length} of {passengers.length}
          </div>
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
