import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MAPTILER_KEY = "7yQg8w68otDEssrPk9wU";
const LUCENA_CENTER = [13.9417, 121.6236];

// Click handler: updates parent state with [lat, lng]
function ClickToPlace({ onPick }) {
  useMapEvents({
    click(e) {
      onPick([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
}

// Prefer barangay-like fields in PH
function pickBarangay(props = {}) {
  return (
    props.neighbourhood ||
    props.locality ||
    props.suburb ||
    props.quarter ||
    props.borough ||
    ""
  );
}

export default function AddEditToda({ open, mode = "add", initialData, onClose, onSave }) {
  const [name, setName]       = useState(initialData?.name || "");
  const [pos, setPos]         = useState(
    initialData
      ? [Number(initialData.latitude), Number(initialData.longitude)]
      : LUCENA_CENTER
  );
  const [street, setStreet]   = useState(initialData?.street || "");
  const [barangay, setBarangay] = useState(initialData?.barangay || "");
  const [loadingAddr, setLoadingAddr] = useState(false);
  const [addrError, setAddrError] = useState("");

  // Lock scroll while open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev || ""; };
  }, [open]);

  // Reverse geocode Street + Barangay on marker move/tap
useEffect(() => {
  if (!open || !pos) return;
  let cancelled = false;

  async function reverseGeocode() {
    setLoadingAddr(true);
    setAddrError("");
    try {
      const [lat, lon] = pos; // pos=[lat,lng]
      // Ask for several candidates; sometimes #2 or #3 has the street context
      const url = `https://api.maptiler.com/geocoding/${lon},${lat}.json?key=${MAPTILER_KEY}&language=en&limit=8&country=ph`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (cancelled) return;

      const feats = data?.features || [];
      if (!feats.length) throw new Error("No features");

      // helper: find in context array by prefix (e.g., "street:", "neighbourhood:")
      const ctxFind = (ctx = [], prefix) => {
        const hit = ctx.find((c) => (c.id || "").startsWith(prefix));
        return hit?.text || hit?.name || "";
        };

      // Choose the best feature to read from:
      // prefer address/street, else fall back to the first feature
      const byType = (f, t) =>
        (f.place_type || f.properties?.feature_type || []).includes(t);
      const pick =
        feats.find((f) => byType(f, "address")) ||
        feats.find((f) => byType(f, "street")) ||
        feats[0];

      const p = pick?.properties || {};
      const ctx = pick?.context || [];

      // STREET: try props, then feature text, then context "street:"
      const streetGuess =
        (p.street || "").trim() ||
        (pick?.text || "").trim() ||
        ctxFind(ctx, "street:");

      // BARANGAY: try common PH buckets in props or context
      const barangayGuess =
        (p.neighbourhood || p.locality || p.suburb || p.quarter || "").trim() ||
        ctxFind(ctx, "neighbourhood:") ||
        ctxFind(ctx, "locality:") ||
        ctxFind(ctx, "suburb:") ||
        ctxFind(ctx, "quarter:");

      setStreet(streetGuess || "");
      setBarangay(barangayGuess || "");

      // TEMP DEBUG: if still blank, log payload once
      if ((!streetGuess || !barangayGuess) && !window.__mt_debugged) {
        window.__mt_debugged = true;
        console.log("[MapTiler reverse] raw data:", data);
      }
    } catch (e) {
      if (!cancelled) {
        setAddrError("Address lookup failed. You can fill Street/Barangay manually.");
        console.log("[MapTiler reverse] error:", e);
      }
    } finally {
      if (!cancelled) setLoadingAddr(false);
    }
  }

  reverseGeocode();
  return () => { cancelled = true; };
}, [pos, open]);

  if (!open) return null;

  const handleSave = () => {
    const payload = {
      id: initialData?.id, // keep if editing; page handles IDs for new records
      name: name.trim(),
      latitude: Number(pos[0]),
      longitude: Number(pos[1]),
      street: street.trim(),
      barangay: barangay.trim(),
    };
    if (!payload.name) return alert("Please enter TODA name.");
    onSave?.(payload);
  };

  const modal = (
    <div className="modal-bg" onClick={onClose}>
      <div
        className="modal-box modal-solid"
        onClick={(e) => e.stopPropagation()}
        style={{ width: "min(92vw, 680px)" }} // balanced width
      >
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ margin: 0 }}>{mode === "edit" ? "Edit TODA" : "Add TODA"}</h2>
          <button className="btn-cancel" onClick={onClose} style={{ padding: "6px 10px", fontSize: 12 }}>
            Close
          </button>
        </div>

        {/* Form (no lat/lon, no search) */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 12 }}>
          <div style={{ gridColumn: "1 / -1" }}>
            <label style={{ fontWeight: 600 }}>TODA Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. San Roque TODA"
              style={{
                padding: "10px 12px",
                border: "1px solid #d1d5db",
                borderRadius: 8,
                maxWidth: 420,
                width: "100%",
              }}
            />
          </div>

          <div>
            <label style={{ fontWeight: 600 }}>Street</label>
            <input
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              placeholder="e.g. F. Gomez St."
              style={{
                padding: "10px 12px",
                border: "1px solid #d1d5db",
                borderRadius: 8,
                maxWidth: 320,
                width: "70%",
              }}
            />
          </div>

          <div>
            <label style={{ fontWeight: 600 }}>Barangay</label>
            <input
              value={barangay}
              onChange={(e) => setBarangay(e.target.value)}
              placeholder="e.g. San Roque"
              style={{
                padding: "10px 12px",
                border: "1px solid #d1d5db",
                borderRadius: 8,
                maxWidth: 260,
                width: "100%",
              }}
            />
          </div>
        </div>

        {/* Map */}
        <div style={{ marginTop: 12 }}>
          <label style={{ fontWeight: 600, display: "block", marginBottom: 6 }}>
            Pick on Map {loadingAddr ? "(resolving address…)" : ""}
          </label>
          <MapContainer
            center={pos || LUCENA_CENTER}
            zoom={15}
            style={{ height: 340, width: "100%", borderRadius: 12 }}
          >
            <TileLayer
              attribution='&copy; OpenStreetMap contributors, © MapTiler'
              url={`https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}.png?key=${MAPTILER_KEY}`}
            />
            <ClickToPlace onPick={(p) => setPos(p)} />
            <Marker
              position={pos}
              draggable
              eventHandlers={{
                dragend: (e) => {
                  const { lat, lng } = e.target.getLatLng();
                  setPos([lat, lng]);
                },
              }}
            />
          </MapContainer>
          {!!addrError && (
            <div style={{ marginTop: 6, color: "#b45309", fontSize: 12 }}>
              {addrError}
            </div>
          )}
        </div>

        <div className="btn-row" style={{ marginTop: 16 }}>
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-login" onClick={handleSave}>
            {mode === "edit" ? "Save Changes" : "Add TODA"}
          </button>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modal, document.body);
}
