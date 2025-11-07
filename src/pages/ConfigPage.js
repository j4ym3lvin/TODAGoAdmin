import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import AddEditToda from "../components/AddEditToda"; // ⬅️ new modal

export default function ConfigPage() {
  const [colorCode, setColorCode]   = useState("green");
  const [fareRate, setFareRate]     = useState(20);
  const [todas, setTodas]           = useState([]);
  const [editing, setEditing]       = useState(null); // {mode:'add'|'edit', data?:item}

  useEffect(() => {
    setTodas([
      { id: "T-001", name: "San Roque TODA", latitude: 13.940, longitude: 121.625 },
      { id: "T-002", name: "Ibabang Dupay TODA", latitude: 13.943, longitude: 121.621 },
    ]);
  }, []);

  const handleColorUpdate = () => alert(`Color updated to ${colorCode}`);
  const handleFareUpdate  = () => alert(`Fare updated to ₱${fareRate}`);

  const handleSaveToda = (payload) => {
    if (editing?.mode === "edit") {
      setTodas(prev => prev.map(t => t.id === payload.id ? payload : t));
    } else {
      const id = `T-${String(prevIdCounter++)}`; // simple local id
    }
  };

  // simple id generator
  let prevIdCounter = Math.max(3, todas.length + 1);
  const saveNewToda = (data) => {
    const next = {
      id: `T-${String(Date.now()).slice(-4)}`,
      ...data,
    };
    setTodas(prev => [...prev, next]);
  };

  return (
    <div className="dashboard-container">
      <Navbar />
      <div className="dashboard-container" style={{ padding: 34, maxWidth: 1200, margin: "0 auto" }}>
        <div className="dashboard-main" style={{ display: "grid", gap: 24 }}></div>
        <h2>Configuration Panel</h2>

        {/* Settings cards */}
        <div className="dashboard-bottom" style={{ marginTop: 12 }}>
          {/* Fare & color */}
          <div className="dashboard-card" style={{ maxWidth: 680 }}>
            <h3 style={{ marginTop: 0 }}>Tricycle Color & Fare</h3>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 300}}>
              <div>
                <label style={{ fontWeight: 600 }}>Tricycle Color</label>
                <div className="color-options" style={{ marginTop: 8, display: "flex", gap: 16, alignItems: "center" }}>
                  <label>
                    <input
                      type="radio"
                      name="color"
                      value="green"
                      checked={colorCode === "green"}
                      onChange={() => setColorCode("green")}
                    />{" "}
                    Green
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="color"
                      value="yellow"
                      checked={colorCode === "yellow"}
                      onChange={() => setColorCode("yellow")}
                    />{" "}
                    Yellow
                  </label>
                  <button className="btn-login" onClick={handleColorUpdate}>Update Color</button>
                </div>
              </div>

              <div>
                <label style={{ fontWeight: 600 }}>Fare (₱ per km)</label>
                <div className="fare-input" style={{ marginTop: 8 }}>
                  <span>₱</span>
                  <input
                    type="number"
                    min="0"
                    value={fareRate}
                    onChange={(e) => setFareRate(e.target.value)}
                  />
                  <button className="btn-login" onClick={handleFareUpdate}>Update Fare</button>
                </div>
              </div>
            </div>
          </div>

          {/* TODA management */}
          <div className="dashboard-card" style={{ flex: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ marginTop: 0 }}>TODA Locations</h3>
              <button
                className="btn-login"
                onClick={() => setEditing({ mode: "add" })}
              >
                Add TODA
              </button>
            </div>

            <table className="driver-table" style={{ marginTop: 8 }}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Latitude</th>
                  <th>Longitude</th>
                  <th>Address</th>
                  <th style={{ textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {todas.length === 0 && (
                  <tr>
                    <td colSpan={5} style={{ padding: "1rem", color: "#6b7280" }}>
                      No TODA locations yet.
                    </td>
                  </tr>
                )}
                {todas.map((t) => (
                  <tr key={t.id}>
                    <td>{t.id}</td>
                    <td>{t.name}</td>
                    <td>{t.latitude.toFixed(6)}</td>
                    <td>{t.longitude.toFixed(6)}</td>
                    <td>{[t.street, t.barangay].filter(Boolean).join(", ")}</td>
                    <td style={{ textAlign: "right" }}>
                      <button
                        className="btn-login btn-small"
                        onClick={() => setEditing({ mode: "edit", data: t })}
                      >
                        Edit
                      </button>
                      <button
                        className="btn-cancel btn-small"
                        style={{ marginLeft: 8 }}
                        onClick={() => setTodas(prev => prev.filter(x => x.id !== t.id))}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Map picker modal */}
      {editing && (
        <AddEditToda
          open
          mode={editing.mode}
          initialData={editing.data}
          onClose={() => setEditing(null)}
          onSave={(payload) => {
            if (editing.mode === "edit") {
              setTodas(prev => prev.map(t => (t.id === payload.id ? payload : t)));
            } else {
              saveNewToda(payload);
            }
            setEditing(null);
          }}
        />
      )}
    </div>
  );
}
