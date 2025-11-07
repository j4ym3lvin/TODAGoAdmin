import React, { useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import DriverTable from "../components/DriverTable";
import AddEditDriver from "../components/AddEditDriver";
import ViewDriverModal from "../components/ViewDriverModal";

const initialDrivers = [
  { name: "Juan Abad",  registrationNo: "DR-001", plateNo: "ABC-1234", toda: "San Roque",     status: "Pending",   selfie: "/assets/juan-selfie.png",  license: "/assets/juan-license.png" },
  { name: "Maria Flores", registrationNo: "RD-002", plateNo: "XYZ-5678", toda: "Ibabang Dupay", status: "Verified",  selfie: "/assets/maria-selfie.png", license: "/assets/maria-license.png" },
  { name: "Jay Iyak",     registrationNo: "DR-002", plateNo: "ABC-7678", toda: "Ibabang Dupay", status: "Pending  ", selfie: "/assets/maria-selfie.png", license: "/assets/maria-license.png" },
];

export default function DriversPage() {
  const [drivers, setDrivers] = useState(initialDrivers);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [q, setQ] = useState("");          // search
  const [status, setStatus] = useState(""); // status filter

  const handleAddDriver = (newDriver) => {
    setDrivers((prev) => [...prev, newDriver]);
    setShowRegisterModal(false);
  };

  const handleVerifyDriver = (index) => {
    setDrivers((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], status: "Verified" };
      return next;
    });
  };

  const handleRejectDriver = (index) => {
    setDrivers((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], status: "Rejected" };
      return next;
    });
  };

  const handleViewDriver = (driver) => setSelectedDriver(driver);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return drivers.filter((d) => {
      const st = (d.status || "").trim().toLowerCase();
      if (status && st !== status) return false;
      if (!term) return true;
      return [
        d.name, d.registrationNo, d.plateNo, d.toda, d.status
      ].some((v) => (v || "").toString().toLowerCase().includes(term));
    });
  }, [drivers, q, status]);

  return (
    <div>
      <Navbar />

      <div className="dashboard-container">
        {/* Header + actions + search */}
        <div className="dashboard-card" style={{ marginBottom: 16 }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", justifyContent: "space-between" }}>
            <h2 style={{ margin: 0 }}>Drivers Monitoring</h2>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search name / reg no / plate / TODA / status"
                className="input-search"
                style={{ padding: "0.55rem 0.75rem", border: "1px solid #d1d5db", borderRadius: 8, minWidth: 280 }}
              />
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                style={{ padding: "0.55rem 0.75rem", border: "1px solid #d1d5db", borderRadius: 8, background: "white" }}
              >
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="verified">Verified</option>
                <option value="rejected">Rejected</option>
              </select>
              <button className="btn-login btn-small" onClick={() => setShowRegisterModal(true)}>
                Register New Driver
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="dashboard-card">
          <DriverTable
            drivers={filtered}
            onVerify={handleVerifyDriver}
            onReject={handleRejectDriver}
            onView={handleViewDriver}
          />
          <div style={{ marginTop: 8, fontSize: 12, color: "#6b7280" }}>
            Showing {filtered.length} of {drivers.length}
          </div>
        </div>
      </div>

      {/* Modals */}
      <AddEditDriver
        open={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        onSave={handleAddDriver}
      />
      <ViewDriverModal
        open={!!selectedDriver}
        onClose={() => setSelectedDriver(null)}
        driver={selectedDriver}
      />
    </div>
  );
}
