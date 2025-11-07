import React, { useEffect, useState, useCallback } from "react";
import ReactDOM from "react-dom";
import "../App.css";

export default function AddEditDriver({ open, onClose, onSave, initial }) {
  const [form, setForm] = useState({
    name: "",
    registrationNo: "",
    plateNo: "",
    toda: "",
    status: "Pending",
    ...initial,
  });

  // esc to close + lock scroll
  const onKey = useCallback((e) => { if (e.key === "Escape") onClose?.(); }, [onClose]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev || "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onKey]);

  if (!open) return null;

  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const f = {
      ...form,
      name: form.name.trim(),
      registrationNo: form.registrationNo.trim(),
      plateNo: form.plateNo.trim(),
      toda: form.toda.trim(),
      status: (form.status || "Pending").trim(),
    };
    if (!f.name || !f.registrationNo || !f.plateNo || !f.toda) return;
    onSave?.(f);
  };

  const modal = (
    <div className="modal-bg" onClick={onClose}>
      <form
        className="modal-box modal-solid"
        onClick={(e) => e.stopPropagation()}
        onSubmit={submit}
        style={{ width: "min(92vw, 560px)" }}  // compact width
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <h2 style={{ margin: 0 }}>{initial ? "Edit Driver" : "Register New Driver"}</h2>
          <button type="button" className="btn-cancel" onClick={onClose} style={{ padding: "6px 10px", fontSize: 12 }}>
            Close
          </button>
        </div>

        {/* Two-column grid */}
        <div className="form-grid-2" style={{ marginTop: 8 }}>
          <div>
            <label>Name:</label>
            <input value={form.name} onChange={set("name")} placeholder="e.g. Juan Dela Cruz" />
          </div>
          <div>
            <label>Registration No.:</label>
            <input value={form.registrationNo} onChange={set("registrationNo")} placeholder="e.g. DR-001" />
          </div>

          <div>
            <label>Plate No.:</label>
            <input value={form.plateNo} onChange={set("plateNo")} placeholder="e.g. ABC-1234" />
          </div>
          <div>
            <label>TODA:</label>
            <input value={form.toda} onChange={set("toda")} placeholder="e.g. San Roque" />
          </div>

          <div className="full">
            <label>Status:</label>
            <select value={form.status} onChange={set("status")}>
              <option>Pending</option>
              <option>Verified</option>
              <option>Rejected</option>
              <option>Active</option>
            </select>
          </div>
        </div>

        <div className="btn-row" style={{ marginTop: 14 }}>
          <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn-login">Save</button>
        </div>
      </form>
    </div>
  );

  return ReactDOM.createPortal(modal, document.body);
}
