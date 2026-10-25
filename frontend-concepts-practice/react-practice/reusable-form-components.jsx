import { useState } from "react";

/**
 * Reusable Form Field Wrapper:
 * Standardizes labels, helper text, and validation error messages across all inputs.
 */
function FormField({ label, error, touched, required, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "4px", marginBottom: "14px" }}>
      <label style={{ fontSize: "14px", fontWeight: 600, color: "#334155" }}>
        {label} {required && <span style={{ color: "#ef4444" }}>*</span>}
      </label>
      {children}
      {touched && error && (
        <span style={{ fontSize: "12px", color: "#dc2626", marginTop: "2px" }}>
          ⚠️ {error}
        </span>
      )}
    </div>
  );
}

/**
 * Reusable Input Component
 */
function TextInput({ name, type = "text", placeholder, value, onChange, onBlur, hasError }) {
  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      style={{
        padding: "8px 12px",
        borderRadius: "6px",
        border: hasError ? "1.5px solid #ef4444" : "1px solid #cbd5e1",
        outline: "none",
        fontSize: "14px"
      }}
    />
  );
}

/**
 * Reusable Select Dropdown Component
 */
function SelectInput({ name, options, value, onChange, onBlur, hasError }) {
  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      style={{
        padding: "8px 12px",
        borderRadius: "6px",
        border: hasError ? "1.5px solid #ef4444" : "1px solid #cbd5e1",
        outline: "none",
        fontSize: "14px",
        background: "#fff"
      }}
    >
      <option value="">-- Please Select --</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

// Validation strategy rules
const validationRules = {
  fullName: (val) => (!val?.trim() ? "Full name is required" : null),
  email: (val) => {
    if (!val?.trim()) return "Email address is required";
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(val)) return "Please enter a valid email address";
    return null;
  },
  role: (val) => (!val ? "Please select a developer role" : null),
  experience: (val) => {
    if (val === "" || val === undefined) return "Years of experience is required";
    if (Number(val) < 0) return "Experience cannot be negative";
    return null;
  }
};

export default function ReusableFormDemo() {
  const [values, setValues] = useState({
    fullName: "",
    email: "",
    role: "",
    experience: ""
  });

  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(null);

  const validateField = (name, value) => {
    const validator = validationRules[name];
    return validator ? validator(value) : null;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));

    // Revalidate on change if already touched
    if (touched[name]) {
      const fieldError = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: fieldError }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const fieldError = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: fieldError }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Mark all as touched
    const touchedAll = Object.keys(values).reduce((acc, key) => ({ ...acc, [key]: true }), {});
    setTouched(touchedAll);

    // Validate all fields
    const currentErrors = {};
    let hasAnyError = false;
    for (const key of Object.keys(values)) {
      const err = validateField(key, values[key]);
      if (err) {
        currentErrors[key] = err;
        hasAnyError = true;
      }
    }
    setErrors(currentErrors);

    if (!hasAnyError) {
      setSubmitted({ ...values });
    }
  };

  const roleOptions = [
    { value: "frontend", label: "Frontend Engineer" },
    { value: "fullstack", label: "Fullstack Engineer" },
    { value: "mobile", label: "Mobile Developer" }
  ];

  return (
    <div style={{ maxWidth: "480px", margin: "24px auto", fontFamily: "sans-serif", padding: "20px", border: "1px solid #cbd5e1", borderRadius: "8px" }}>
      <h2 style={{ marginTop: 0 }}>Reusable Form Components & Validation</h2>
      <p style={{ color: "#64748b", fontSize: "14px" }}>
        Modular inputs with unified error handling and blur/submit validation strategies.
      </p>

      <form onSubmit={handleSubmit} noValidate>
        <FormField label="Full Name" error={errors.fullName} touched={touched.fullName} required>
          <TextInput
            name="fullName"
            placeholder="Ada Lovelace"
            value={values.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
            hasError={touched.fullName && Boolean(errors.fullName)}
          />
        </FormField>

        <FormField label="Work Email" error={errors.email} touched={touched.email} required>
          <TextInput
            name="email"
            type="email"
            placeholder="ada@example.com"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            hasError={touched.email && Boolean(errors.email)}
          />
        </FormField>

        <FormField label="Primary Role" error={errors.role} touched={touched.role} required>
          <SelectInput
            name="role"
            options={roleOptions}
            value={values.role}
            onChange={handleChange}
            onBlur={handleBlur}
            hasError={touched.role && Boolean(errors.role)}
          />
        </FormField>

        <FormField label="Years of Experience" error={errors.experience} touched={touched.experience} required>
          <TextInput
            name="experience"
            type="number"
            placeholder="3"
            value={values.experience}
            onChange={handleChange}
            onBlur={handleBlur}
            hasError={touched.experience && Boolean(errors.experience)}
          />
        </FormField>

        <button
          type="submit"
          style={{ width: "100%", padding: "10px", background: "#2563eb", color: "#fff", border: "none", borderRadius: "6px", fontWeight: 600, cursor: "pointer", marginTop: "8px" }}
        >
          Submit Application
        </button>
      </form>

      {submitted && (
        <div style={{ marginTop: "20px", padding: "12px", background: "#f0fdf4", border: "1px solid #86efac", borderRadius: "6px" }}>
          <h4 style={{ margin: "0 0 8px", color: "#166534" }}>Form Successfully Validated & Submitted:</h4>
          <pre style={{ margin: 0, fontSize: "12px", color: "#14532d" }}>
            {JSON.stringify(submitted, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
