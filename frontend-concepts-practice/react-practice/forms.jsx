import { useState } from "react";

export default function FormsDemo() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState(null);

  const validate = (name, value) => {
    let error = "";
    if (name === "name" && !value.trim()) {
      error = "Name is required";
    }
    if (name === "email") {
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      if (!isValidEmail) error = "Invalid email address";
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    const errorMsg = validate(name, value);
    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nameErr = validate("name", formData.name);
    const emailErr = validate("email", formData.email);

    if (nameErr || emailErr) {
      setErrors({ name: nameErr, email: emailErr });
      return;
    }

    setSubmittedData(formData);
    setErrors({});
  };

  return (
    <div style={{ maxWidth: "440px", margin: "20px auto", fontFamily: "sans-serif" }}>
      <h2>React Forms & Validation</h2>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <div>
          <label htmlFor="name" style={{ display: "block", marginBottom: "4px" }}>Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
          {errors.name && <small style={{ color: "red" }}>{errors.name}</small>}
        </div>

        <div>
          <label htmlFor="email" style={{ display: "block", marginBottom: "4px" }}>Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
          {errors.email && <small style={{ color: "red" }}>{errors.email}</small>}
        </div>

        <div>
          <label htmlFor="message" style={{ display: "block", marginBottom: "4px" }}>Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="3"
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
        </div>

        <button type="submit" style={{ padding: "10px", background: "#2563eb", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
          Submit Form
        </button>
      </form>

      {submittedData && (
        <div style={{ marginTop: "16px", padding: "12px", background: "#f0fdf4", border: "1px solid #86efac", borderRadius: "6px" }}>
          <h4>Submitted Data:</h4>
          <p><strong>Name:</strong> {submittedData.name}</p>
          <p><strong>Email:</strong> {submittedData.email}</p>
          <p><strong>Message:</strong> {submittedData.message || "None"}</p>
        </div>
      )}
    </div>
  );
}