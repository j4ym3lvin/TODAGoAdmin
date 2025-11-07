import React, { useEffect, useCallback } from "react";
import ReactDOM from "react-dom";
import "../App.css";

function StatusPill({ value }) {
  const raw = (value || "").trim();
  const k = raw.toLowerCase();
  const base = { padding:"2px 8px", borderRadius:999, fontSize:12, fontWeight:700 };
  if (k === "verified") return <span style={{...base,background:"#d1fae5",color:"#065f46"}}>{raw}</span>;
  if (k === "pending")  return <span style={{...base,background:"#fef3c7",color:"#92400e"}}>{raw}</span>;
  if (!raw)            return <span style={{...base,background:"#e5e7eb",color:"#374151"}}>Unknown</span>;
  return <span style={{...base,background:"#fee2e2",color:"#991b1b"}}>{raw}</span>;
}

export default function ViewDriverModal({ driver = {}, open, onClose }) {
  // close on Esc
  const onKey = useCallback((e) => { if (e.key === "Escape") onClose?.(); }, [onClose]);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow || "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onKey]);

  if (!open) return null;

  const onImgError = (e) => { e.currentTarget.src = "/placeholder.png"; };

  const modal =
    <div className="modal-bg" onClick={onClose}>
      <div
        className="modal-box modal-solid"
        onClick={(e) => e.stopPropagation()}
        role="dialog" aria-modal="true" aria-labelledby="driver-title"
        style={{ width: "min(92vw, 760px)" }}
      >
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom: 8 }}>
          <h2 id="driver-title" style={{ margin: 0 }}>Driver Details</h2>
          <button className="btn-cancel" onClick={onClose} autoFocus style={{ padding:"6px 10px", fontSize:12 }}>
            Close
          </button>
        </div>

        {/* Info grid */}
        <div style={{
          display:"grid",
          gridTemplateColumns:"1fr 1fr",
          gap: "10px 16px",
          padding:"12px 0",
          borderTop:"1px solid rgba(0,0,0,.06)",
          borderBottom:"1px solid rgba(0,0,0,.06)",
          marginBottom: 14
        }}>
          <div><strong>Name:</strong> {driver.name || "—"}</div>
          <div><strong>Status:</strong> <StatusPill value={driver.status} /></div>
          <div><strong>Registration No.:</strong> {driver.registrationNo || "—"}</div>
          <div><strong>Plate No.:</strong> {driver.plateNo || "—"}</div>
          <div style={{ gridColumn:"1 / -1" }}><strong>TODA:</strong> {driver.toda || "—"}</div>
        </div>

        {/* Images */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
          <div>
            <div style={{ fontWeight:600, marginBottom:6 }}>Selfie</div>
            <div className="img-frame">
              <img
                src={driver.selfie || "/placeholder-selfie.png"}
                alt="Driver Selfie"
                onError={onImgError}
                className="img-fill"
              />
            </div>
          </div>
          <div>
            <div style={{ fontWeight:600, marginBottom:6 }}>License</div>
            <div className="img-frame">
              <img
                src={driver.license || "/placeholder-license.png"}
                alt="Driver License"
                onError={onImgError}
                className="img-fill"
              />
            </div>
          </div>
        </div>
      </div>
    </div>;

  // Render above everything to avoid z-index glitches
  return ReactDOM.createPortal(modal, document.body);
}
