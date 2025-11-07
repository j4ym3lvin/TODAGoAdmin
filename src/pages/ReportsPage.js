import React, { useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import ReportsTable from "../components/ReportsTable";
import ViewResolveReports from "../components/ViewResolveReports";

const initialReports = [
  {
    id: "RPT-1001",
    date: "2024-05-28",
    reporter: "Pedro Santos",
    reportedUser: "Juan Dela Cruz",
    type: "Complaint",
    subject: "Overcharging",
    details: "Driver charged ₱30 extra.",
    status: "Open",
  },
  {
    id: "RPT-1002",
    date: "2024-05-27",
    reporter: "Ana Lopez",
    reportedUser: "Maria Clara",
    type: "Feedback",
    subject: "Clean vehicle",
    details: "Very clean and driver was polite.",
    status: "Resolved",
  },
];

export default function ReportsPage() {
  const [reports, setReports] = useState(initialReports);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("");
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return reports.filter((r) => {
      const st = (r.status || "").toLowerCase();
      if (status && st !== status) return false;
      if (!term) return true;
      return [
        r.id, r.reporter, r.reportedUser, r.type, r.subject, r.details, r.date, r.status,
      ].some((v) => (v || "").toString().toLowerCase().includes(term));
    });
  }, [reports, q, status]);

  const handleResolve = (id) => {
    setReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "Resolved" } : r))
    );
    setSelected(null);
  };

  return (
    <div>
      <Navbar />

      <div className="dashboard-container">
        {/* Header + search/filter */}
        <div className="dashboard-card" style={{ marginBottom: 16 }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", justifyContent: "space-between" }}>
            <h2 style={{ margin: 0 }}>Feedback & Complaints</h2>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search id / reporter / reported user / subject / details"
                className="input-search"
                style={{ padding: "0.55rem 0.75rem", border: "1px solid #d1d5db", borderRadius: 8, minWidth: 280 }}
              />
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                style={{ padding: "0.55rem 0.75rem", border: "1px solid #d1d5db", borderRadius: 8, background: "white" }}
              >
                <option value="">All Status</option>
                <option value="open">Open</option>
                <option value="in progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="dismissed">Dismissed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="dashboard-card">
          <ReportsTable reports={filtered} onView={setSelected} />
          <div style={{ marginTop: 8, fontSize: 12, color: "#6b7280" }}>
            Showing {filtered.length} of {reports.length}
          </div>
        </div>
      </div>

      <ViewResolveReports
        report={selected}
        onClose={() => setSelected(null)}
        onResolve={handleResolve}
      />
    </div>
  );
}
