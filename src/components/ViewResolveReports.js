import React, { useEffect, useCallback } from "react";
import ReactDOM from "react-dom";

export default function ViewResolveReports({ report, onClose, onResolve }) {
  const onKey = useCallback((e) => { if (e.key === "Escape") onClose?.(); }, [onClose]);

  useEffect(() => {
    if (!report) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev || "";
      window.removeEventListener("keydown", onKey);
    };
  }, [report, onKey]);

  if (!report) return null;

  const modal = (
    <div className="modal-bg" onClick={onClose}>
      <div
        className="modal-box modal-solid"
        onClick={(e) => e.stopPropagation()}
        style={{ width: "min(92vw, 560px)" }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <h2 style={{ margin: 0 }}>Report Details</h2>
          <button className="btn-cancel" onClick={onClose} style={{ padding: "6px 10px", fontSize: 12 }}>
            Close
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 16px", marginTop: 8 }}>
          <div><strong>ID:</strong> {report.id}</div>
          <div><strong>Date:</strong> {report.date}</div>
          <div><strong>Reporter:</strong> {report.reporter}</div>
          <div><strong>Reported User:</strong> {report.reportedUser}</div>
          <div><strong>Type:</strong> {report.type}</div>
          <div style={{ gridColumn: "1 / -1" }}><strong>Subject:</strong> {report.subject}</div>
          <div style={{ gridColumn: "1 / -1" }}>
            <strong>Details:</strong>
            <div style={{ marginTop: 6, padding: "10px 12px", border: "1px solid rgba(0,0,0,0.06)", borderRadius: 8, background: "#f9fafb", whiteSpace: "pre-wrap" }}>
              {report.details}
            </div>
          </div>
          <div style={{ gridColumn: "1 / -1" }}>
            <strong>Status:</strong> <span style={{ marginLeft: 6 }}>{report.status}</span>
          </div>
        </div>

        <div className="btn-row" style={{ marginTop: 16 }}>
          {report.status !== "Resolved" && (
            <button className="btn-login" onClick={() => onResolve?.(report.id)}>
              Mark as Resolved
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modal, document.body);
}
