import React, { useState } from "react";

export default function AddEditPassenger({ open, onClose, onSave, initialData }) {
  const [form, setForm] = useState(
    initialData || {
      name: "",
      registrationNo: "",
      contact: "",
      email: "",
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
        <h2>Register New Passenger</h2>
        <label>Name:</label>
        <input name="name" value={form.name} onChange={handleChange} required />
        <label>Registration No.:</label>
        <input name="registrationNo" value={form.registrationNo} onChange={handleChange} required />
        <label>Contact:</label>
        <input name="contact" value={form.contact} onChange={handleChange} required />
        <label>Email:</label>
        <input name="email" value={form.email} onChange={handleChange} required />
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
