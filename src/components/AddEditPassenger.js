import React, { useEffect, useState, useCallback } from "react";
import ReactDOM from "react-dom";

export default function AddEditPassenger({ open, onClose, onSave, initialData }) {
  const [form, setForm] = useState({
    name: "", registrationNo: "", contact: "", email: "", status: "Active", ...initialData,
  });

  const onKey = useCallback((e) => { if (e.key === "Escape") onClose?.(); }, [onClose]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev || ""; window.removeEventListener("keydown", onKey); };
  }, [open, onKey]);

  if (!open) return null;

  const change = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const submit = (e) => {
    e.preventDefault();
    const f = { ...form };
    if (!f.name || !f.registrationNo || !f.contact || !f.email) return;
    onSave?.(f);
    onClose?.();
  };

  const modal = (
    <div className="modal-bg" onClick={onClose}>
      <form
        className="modal-box modal-solid"
        onClick={(e) => e.stopPropagation()}
        onSubmit={submit}
        style={{ width: "min(92vw, 560px)" }}
      >
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom: 8 }}>
          <h2 style={{ margin: 0 }}>Register New Passenger</h2>
          <button type="button" className="btn-cancel" onClick={onClose} style={{ padding:"6px 10px", fontSize:12 }}>
            Close
          </button>
        </div>

        <div className="form-grid-2" style={{ marginTop: 8 }}>
          <div>
            <label>Name:</label>
            <input name="name" value={form.name} onChange={change} placeholder="e.g. Pedro Santos" required />
          </div>
          <div>
            <label>Registration No.:</label>
            <input name="registrationNo" value={form.registrationNo} onChange={change} placeholder="e.g. PS-001" required />
          </div>
          <div>
            <label>Contact:</label>
            <input name="contact" value={form.contact} onChange={change} placeholder="09xxxxxxxxx" required />
          </div>
          <div>
            <label>Email:</label>
            <input name="email" value={form.email} onChange={change} placeholder="name@email.com" required />
          </div>
          <div className="full">
            <label>Status:</label>
            <select name="status" value={form.status} onChange={change}>
              <option>Active</option>
              <option>Inactive</option>
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
