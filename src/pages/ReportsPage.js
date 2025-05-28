// src/pages/ReportsPage.js
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import ReportsTable from "../components/ReportsTable";
import ViewResolveReport from "../components/ViewResolveReports"; // Modal for viewing/resolving a report

const initialReports = [
  {
    id: 1,
    date: "2024-05-28",
    reporter: "Pedro Santos",
    reportedUser: "Juan Dela Cruz",
    type: "Driver Complaint",
    details: "Driver was late and rude.",
    status: "Pending",
  },
  {
    id: 2,
    date: "2024-05-27",
    reporter: "Ana Lopez",
    reportedUser: "Maria Clara",
    type: "Passenger Complaint",
    details: "Passenger did not pay the correct fare.",
    status: "Resolved",
  },
  // ...add more as needed
];

export default function ReportsPage() {
  const [reports, setReports] = useState(initialReports);
  const [selectedReport, setSelectedReport] = useState(null);

  const handleView = (report) => setSelectedReport(report);
  const handleClose = () => setSelectedReport(null);
  const handleResolve = (id) => {
    setReports(reports.map(r =>
      r.id === id ? { ...r, status: "Resolved" } : r
    ));
    handleClose();
  };

  return (
    <div>
      <Navbar />
      <div style={{ padding: "2rem" }}>
        <h2>Reports</h2>
        <ReportsTable reports={reports} onView={handleView} />
      </div>
      <ViewResolveReport
        report={selectedReport}
        onClose={handleClose}
        onResolve={handleResolve}
      />
    </div>
  );
}
