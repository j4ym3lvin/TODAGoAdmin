import React, { useState } from "react";

export default function AddEditDriver({ open, onClose, onSave, initialData }) {
  const [form, setForm] = useState(
    initialData || {
      name: "",
      registrationNo: "",
      plateNo: "",
      toda: "",
      status: "Active"
    }
  );

  if (!open) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
    onClose();
  };

  return (
    <div className="modal-bg">
      <form className="modal-box" onSubmit={handleSubmit}>
        <h2>Register New Driver</h2>
        <label>Name:</label>
        <input name="name" value={form.name} onChange={handleChange} required />
        <label>Registration No.:</label>
        <input name="registrationNo" value={form.registrationNo} onChange={handleChange} required />
        <label>Plate No.:</label>
        <input name="plateNo" value={form.plateNo} onChange={handleChange} required />
        <label>TODA:</label>
        <input name="toda" value={form.toda} onChange={handleChange} required />
        <label>Status:</label>
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <div className="btn-row" style={{ marginTop: 20 }}>
          <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn-login">Save</button>
        </div>
      </form>
    </div>
  );
}
