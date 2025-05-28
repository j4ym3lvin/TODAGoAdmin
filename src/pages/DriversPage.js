import React, { useState } from "react";
import Navbar from "../components/Navbar";
import DriverTable from "../components/DriverTable";
import AddEditDriver from "../components/AddEditDriver";
import ViewDriverModal from "../components/ViewDriverModal";

const initialDrivers = [
  {
    name: "Juan Abad",
    registrationNo: "DR-001",
    plateNo: "ABC-1234",
    toda: "San Roque",
    status: "Pending",
    selfie: "/assets/juan-selfie.png",
    license: "/assets/juan-license.png"
  },
  {
    name: "Maria Flores",
    registrationNo: "RD-002",
    plateNo: "XYZ-5678",
    toda: "Ibabang Dupay",
    status: "Verified",
    selfie: "/assets/maria-selfie.png",
    license: "/assets/maria-license.png"
  },
  { name: "Jay Iyak",
    registrationNo: "DR-002",
    plateNo: "ABC-7678",
    toda: "Ibabang Dupay",
    status: "Pending  ",
    selfie: "/assets/maria-selfie.png",
    license: "/assets/maria-license.png"
  },
];


export default function DriversPage() {
  const [drivers, setDrivers] = useState(initialDrivers);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);

  const handleAddDriver = (newDriver) => {
    setDrivers([...drivers, newDriver]);
  };

  const handleVerifyDriver = (index) => {
    const updated = [...drivers];
    updated[index].status = "Verified";
    setDrivers(updated);
  };

  const handleRejectDriver = (index) => {
    const updated = [...drivers];
    updated[index].status = "Rejected";
    setDrivers(updated);
  };

  const handleViewDriver = (driver) => {
    setSelectedDriver(driver);
  };

  return (
    <div>
      <Navbar />
      <div style={{ padding: "2rem" }}>
        <h2>Drivers Monitoring</h2>
        <DriverTable
          drivers={drivers}
          onVerify={handleVerifyDriver}
          onReject={handleRejectDriver}
          onView={handleViewDriver}
        />
        <div style={{ marginTop: "2rem", display: "flex", justifyContent: "flex-end", gap: "1rem" }}>
          <button className="btn-cancel" onClick={() => window.history.back()}>Back</button>
          <button className="btn-login" onClick={() => setShowRegisterModal(true)}>
            Register New Driver
          </button>
        </div>
      </div>

      {/* Separate modals */}
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
